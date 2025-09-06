/**
 * 数据处理模块
 */

class DataHandler {
    constructor() {
        this.rawData = null;
        this.filteredData = null;
        this.dataTable = null;
    }
    
    /**
     * 从文件加载数据
     * @param {File} file - JSON文件对象
     */
    loadFromFile(file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                this.processData(data);
                this.updateUI();
            } catch (error) {
                console.error('解析JSON文件时出错:', error);
                alert('文件格式错误，请确保是有效的JSON格式');
            }
        };
        reader.onerror = () => {
            console.error('读取文件时出错');
            alert('读取文件时出错');
        };
        reader.readAsText(file);
    }
    
    /**
     * 加载示例数据
     */
    loadSampleData() {
        const sampleData = SampleData.getSampleData();
        this.processData(sampleData);
        this.updateUI();
    }
    
    /**
     * 处理数据
     * @param {Object} data - 原始数据对象
     */
    processData(data) {
        this.rawData = data;
        this.filteredData = CommonUtils.deepClone(data.benchmarks);
        
        // 更新筛选器选项
        this.updateFilterOptions();
    }
    
    /**
     * 更新筛选器选项
     */
    updateFilterOptions() {
        if (!this.rawData || !this.rawData.benchmarks) return;
        
        // 获取唯一的模型名称和框架名称
        const modelNames = [...new Set(this.rawData.benchmarks.map(item => item.model_name))];
        const frameworks = [...new Set(this.rawData.benchmarks.map(item => item.framework))];
        
        // 更新模型筛选下拉框
        const modelFilter = document.getElementById('modelFilter');
        modelFilter.innerHTML = '<option value="">所有模型</option>';
        modelNames.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelFilter.appendChild(option);
        });
        
        // 更新框架筛选下拉框
        const frameworkFilter = document.getElementById('frameworkFilter');
        frameworkFilter.innerHTML = '<option value="">所有框架</option>';
        frameworks.forEach(framework => {
            const option = document.createElement('option');
            option.value = framework;
            option.textContent = framework;
            frameworkFilter.appendChild(option);
        });
        
        // 更新序列长度滑块范围
        this.updateSequenceRange();
    }
    
    /**
     * 更新序列长度滑块范围
     */
    updateSequenceRange() {
        if (!this.rawData || !this.rawData.benchmarks) return;
        
        const inputSeqValues = this.rawData.benchmarks.map(item => item.input_sequence);
        const outputSeqValues = this.rawData.benchmarks.map(item => item.output_sequence);
        
        const minInputSeq = Math.min(...inputSeqValues);
        const maxInputSeq = Math.max(...inputSeqValues);
        const minOutputSeq = Math.min(...outputSeqValues);
        const maxOutputSeq = Math.max(...outputSeqValues);
        
        // 更新输入序列滑块
        const inputSeqMin = document.getElementById('inputSeqMin');
        const inputSeqMax = document.getElementById('inputSeqMax');
        inputSeqMin.min = minInputSeq;
        inputSeqMin.max = maxInputSeq;
        inputSeqMax.min = minInputSeq;
        inputSeqMax.max = maxInputSeq;
        inputSeqMin.value = minInputSeq;
        inputSeqMax.value = maxInputSeq;
        document.getElementById('inputSeqMinValue').textContent = minInputSeq;
        document.getElementById('inputSeqMaxValue').textContent = maxInputSeq;
        
        // 更新输出序列滑块
        const outputSeqMin = document.getElementById('outputSeqMin');
        const outputSeqMax = document.getElementById('outputSeqMax');
        outputSeqMin.min = minOutputSeq;
        outputSeqMin.max = maxOutputSeq;
        outputSeqMax.min = minOutputSeq;
        outputSeqMax.max = maxOutputSeq;
        outputSeqMin.value = minOutputSeq;
        outputSeqMax.value = maxOutputSeq;
        document.getElementById('outputSeqMinValue').textContent = minOutputSeq;
        document.getElementById('outputSeqMaxValue').textContent = maxOutputSeq;
    }
    
    /**
     * 应用筛选条件
     * @returns {Array} 筛选后的数据
     */
    applyFilters() {
        if (!this.rawData || !this.rawData.benchmarks) return [];
        
        // 获取筛选条件
        const modelFilter = document.getElementById('modelFilter').value;
        const frameworkFilter = document.getElementById('frameworkFilter').value;
        const inputSeqMin = parseInt(document.getElementById('inputSeqMin').value);
        const inputSeqMax = parseInt(document.getElementById('inputSeqMax').value);
        const outputSeqMin = parseInt(document.getElementById('outputSeqMin').value);
        const outputSeqMax = parseInt(document.getElementById('outputSeqMax').value);
        
        // 应用筛选
        let filtered = this.rawData.benchmarks.filter(item => {
            // 模型筛选
            if (modelFilter && item.model_name !== modelFilter) {
                return false;
            }
            
            // 框架筛选
            if (frameworkFilter && item.framework !== frameworkFilter) {
                return false;
            }
            
            // 输入序列长度筛选
            if (item.input_sequence < inputSeqMin || item.input_sequence > inputSeqMax) {
                return false;
            }
            
            // 输出序列长度筛选
            if (item.output_sequence < outputSeqMin || item.output_sequence > outputSeqMax) {
                return false;
            }
            
            return true;
        });
        
        this.filteredData = filtered;
        return filtered;
    }
    
    /**
     * 获取统计数据
     * @returns {Object} 统计数据对象
     */
    getStatistics() {
        if (!this.filteredData || this.filteredData.length === 0) {
            return {
                totalTests: 0,
                avgPrefill: 0,
                avgDecode: 0,
                avgTokens: 0
            };
        }
        
        const prefillTimes = this.filteredData.map(item => item.metrics.prefill_time_ms);
        const decodeTimes = this.filteredData.map(item => item.metrics.decode_time_ms);
        const tokensPerSecond = this.filteredData.map(item => item.metrics.tokens_per_second);
        
        return {
            totalTests: this.filteredData.length,
            avgPrefill: CommonUtils.calculateAverage(prefillTimes),
            avgDecode: CommonUtils.calculateAverage(decodeTimes),
            avgTokens: CommonUtils.calculateAverage(tokensPerSecond)
        };
    }
    
    /**
     * 更新UI显示
     */
    updateUI() {
        // 更新表格数据
        this.updateTable();
        
        // 更新统计数据
        this.updateStatistics();
        
        // 更新图表
        if (window.filterChart) {
            window.filterChart.updateCharts();
        }
    }
    
    /**
     * 更新表格数据
     */
    updateTable() {
        if (!this.filteredData) return;
        
        // 清空现有数据
        if (window.dataTable) {
            window.dataTable.clear();
        }
        
        // 添加新数据
        const tableData = this.filteredData.map(item => [
            item.id,
            item.model_name,
            item.model_version,
            item.framework,
            item.framework_version,
            item.hardware,
            item.input_sequence,
            item.output_sequence,
            CommonUtils.formatNumber(item.metrics.prefill_time_ms),
            CommonUtils.formatNumber(item.metrics.decode_time_ms),
            CommonUtils.formatNumber(item.metrics.total_time_ms),
            CommonUtils.formatNumber(item.metrics.tokens_per_second),
            CommonUtils.formatNumber(item.metrics.memory_usage_mb),
            CommonUtils.formatNumber(item.metrics.throughput),
            CommonUtils.formatTimestamp(item.timestamp)
        ]);
        
        if (window.dataTable) {
            window.dataTable.rows.add(tableData);
            window.dataTable.draw();
        }
    }
    
    /**
     * 更新统计数据
     */
    updateStatistics() {
        const stats = this.getStatistics();
        
        document.getElementById('totalTests').textContent = stats.totalTests;
        document.getElementById('avgPrefill').textContent = `${CommonUtils.formatNumber(stats.avgPrefill)} ms`;
        document.getElementById('avgDecode').textContent = `${CommonUtils.formatNumber(stats.avgDecode)} ms`;
        document.getElementById('avgTokens').textContent = CommonUtils.formatNumber(stats.avgTokens);
    }
    
    /**
     * 获取用于导出的数据
     * @returns {Array} 用于导出的数据数组
     */
    getExportData() {
        if (!this.filteredData) return [];
        
        // 表头
        const headers = [
            'ID', '模型名称', '模型版本', '推理框架', '框架版本', '硬件',
            '输入序列', '输出序列', 'Prefill耗时(ms)', 'Decode耗时(ms)',
            '总耗时(ms)', 'Token/s', '内存使用(MB)', '吞吐量', '时间戳'
        ];
        
        // 数据行
        const rows = this.filteredData.map(item => [
            item.id,
            item.model_name,
            item.model_version,
            item.framework,
            item.framework_version,
            item.hardware,
            item.input_sequence,
            item.output_sequence,
            item.metrics.prefill_time_ms,
            item.metrics.decode_time_ms,
            item.metrics.total_time_ms,
            item.metrics.tokens_per_second,
            item.metrics.memory_usage_mb,
            item.metrics.throughput,
            item.timestamp
        ]);
        
        return [headers, ...rows];
    }
}

// 导出DataHandler类
window.DataHandler = DataHandler;