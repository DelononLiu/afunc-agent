/**
 * 筛选和图表模块
 */

class FilterChart {
    constructor() {
        this.frameworkChart = null;
        this.modelChart = null;
    }
    
    /**
     * 应用筛选条件
     */
    applyFilters() {
        if (window.dataHandler) {
            const filteredData = window.dataHandler.applyFilters();
            window.dataHandler.updateUI();
        }
    }
    
    /**
     * 重置筛选条件
     */
    resetFilters() {
        // 重置模型筛选
        document.getElementById('modelFilter').value = '';
        
        // 重置框架筛选
        document.getElementById('frameworkFilter').value = '';
        
        // 重置序列长度滑块
        if (window.dataHandler && window.dataHandler.rawData && window.dataHandler.rawData.benchmarks) {
            const inputSeqValues = window.dataHandler.rawData.benchmarks.map(item => item.input_sequence);
            const outputSeqValues = window.dataHandler.rawData.benchmarks.map(item => item.output_sequence);
            
            const minInputSeq = Math.min(...inputSeqValues);
            const maxInputSeq = Math.max(...inputSeqValues);
            const minOutputSeq = Math.min(...outputSeqValues);
            const maxOutputSeq = Math.max(...outputSeqValues);
            
            document.getElementById('inputSeqMin').value = minInputSeq;
            document.getElementById('inputSeqMax').value = maxInputSeq;
            document.getElementById('inputSeqMinValue').textContent = minInputSeq;
            document.getElementById('inputSeqMaxValue').textContent = maxInputSeq;
            
            document.getElementById('outputSeqMin').value = minOutputSeq;
            document.getElementById('outputSeqMax').value = maxOutputSeq;
            document.getElementById('outputSeqMinValue').textContent = minOutputSeq;
            document.getElementById('outputSeqMaxValue').textContent = maxOutputSeq;
        }
        
        // 重新应用筛选
        this.applyFilters();
    }
    
    /**
     * 切换表格列显示/隐藏
     * @param {number} columnIndex - 列索引
     * @param {boolean} isVisible - 是否显示
     */
    toggleColumn(columnIndex, isVisible) {
        if (window.dataTable) {
            const column = window.dataTable.column(columnIndex);
            column.visible(isVisible);
        }
    }
    
    /**
     * 更新图表
     */
    updateCharts() {
        if (!window.dataHandler || !window.dataHandler.filteredData) return;
        
        // 销毁现有图表
        if (this.frameworkChart) {
            this.frameworkChart.destroy();
        }
        if (this.modelChart) {
            this.modelChart.destroy();
        }
        
        // 创建新图表
        this.createFrameworkChart();
        this.createModelChart();
    }
    
    /**
     * 创建框架性能对比图表
     */
    createFrameworkChart() {
        if (!window.dataHandler || !window.dataHandler.filteredData) return;
        
        const ctx = document.getElementById('frameworkChart').getContext('2d');
        
        // 按框架分组数据
        const frameworkData = {};
        window.dataHandler.filteredData.forEach(item => {
            if (!frameworkData[item.framework]) {
                frameworkData[item.framework] = {
                    prefill: [],
                    decode: [],
                    tokens: []
                };
            }
            frameworkData[item.framework].prefill.push(item.metrics.prefill_time_ms);
            frameworkData[item.framework].decode.push(item.metrics.decode_time_ms);
            frameworkData[item.framework].tokens.push(item.metrics.tokens_per_second);
        });
        
        // 计算平均值
        const labels = Object.keys(frameworkData);
        const prefillAvg = labels.map(label => CommonUtils.calculateAverage(frameworkData[label].prefill));
        const decodeAvg = labels.map(label => CommonUtils.calculateAverage(frameworkData[label].decode));
        const tokensAvg = labels.map(label => CommonUtils.calculateAverage(frameworkData[label].tokens));
        
        // 生成颜色
        const colors = CommonUtils.generateColors(labels.length);
        
        this.frameworkChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Prefill耗时(ms)',
                        data: prefillAvg,
                        backgroundColor: colors.map(c => c + '80'), // 添加透明度
                        borderColor: colors,
                        borderWidth: 1
                    },
                    {
                        label: 'Decode耗时(ms)',
                        data: decodeAvg,
                        backgroundColor: colors.map(c => c + '40'), // 更透明
                        borderColor: colors,
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: '耗时(ms)'
                        }
                    }
                }
            }
        });
    }
    
    /**
     * 创建模型性能对比图表
     */
    createModelChart() {
        if (!window.dataHandler || !window.dataHandler.filteredData) return;
        
        const ctx = document.getElementById('modelChart').getContext('2d');
        
        // 按模型分组数据
        const modelData = {};
        window.dataHandler.filteredData.forEach(item => {
            if (!modelData[item.model_name]) {
                modelData[item.model_name] = {
                    prefill: [],
                    decode: [],
                    tokens: []
                };
            }
            modelData[item.model_name].prefill.push(item.metrics.prefill_time_ms);
            modelData[item.model_name].decode.push(item.metrics.decode_time_ms);
            modelData[item.model_name].tokens.push(item.metrics.tokens_per_second);
        });
        
        // 计算平均值
        const labels = Object.keys(modelData);
        const prefillAvg = labels.map(label => CommonUtils.calculateAverage(modelData[label].prefill));
        const decodeAvg = labels.map(label => CommonUtils.calculateAverage(modelData[label].decode));
        const tokensAvg = labels.map(label => CommonUtils.calculateAverage(modelData[label].tokens));
        
        // 生成颜色
        const colors = CommonUtils.generateColors(labels.length);
        
        this.modelChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Token/s',
                        data: tokensAvg,
                        backgroundColor: colors.map(c => c + '80'), // 添加透明度
                        borderColor: colors,
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Token/s'
                        }
                    }
                }
            }
        });
    }
}

// 导出FilterChart类
window.FilterChart = FilterChart;