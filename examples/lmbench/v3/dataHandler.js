/**
 * 数据处理模块
 */

class DataHandler {
    constructor() {
        this.allBenchmarks = [];
        this.filteredBenchmarks = [];
    }

    /**
     * 加载JSON数据
     * @param {Object} jsonData - JSON数据对象
     */
    loadData(jsonData) {
        if (jsonData && jsonData.benchmarks) {
            this.allBenchmarks = jsonData.benchmarks;
            this.filteredBenchmarks = [...this.allBenchmarks];
            return true;
        }
        return false;
    }

    /**
     * 从文件加载数据
     * @param {File} file - 要加载的文件
     * @returns {Promise} 加载结果的Promise
     */
    async loadFromFile(file) {
        try {
            const data = await CommonUtils.parseJSONFile(file);
            return this.loadData(data);
        } catch (error) {
            throw new Error('数据加载失败: ' + error.message);
        }
    }

    /**
     * 获取所有基准测试数据
     * @returns {Array} 基准测试数据数组
     */
    getAllBenchmarks() {
        return this.allBenchmarks;
    }

    /**
     * 获取过滤后的基准测试数据
     * @returns {Array} 过滤后的基准测试数据数组
     */
    getFilteredBenchmarks() {
        return this.filteredBenchmarks;
    }

    /**
     * 应用筛选条件
     * @param {Object} filters - 筛选条件对象
     */
    applyFilters(filters) {
        this.filteredBenchmarks = this.allBenchmarks.filter(benchmark => {
            // 模型筛选
            if (filters.model && benchmark.model_name !== filters.model) {
                return false;
            }

            // 框架筛选
            if (filters.framework && benchmark.framework !== filters.framework) {
                return false;
            }

            // 输入序列长度筛选
            if (filters.inputSequenceMax !== undefined && 
                benchmark.input_sequence > filters.inputSequenceMax) {
                return false;
            }

            // 输出序列长度筛选
            if (filters.outputSequenceMax !== undefined && 
                benchmark.output_sequence > filters.outputSequenceMax) {
                return false;
            }

            // 搜索筛选
            if (filters.searchTerm) {
                const term = filters.searchTerm.toLowerCase();
                const searchableFields = [
                    benchmark.id,
                    benchmark.model_name,
                    benchmark.model_version,
                    benchmark.framework,
                    benchmark.framework_version,
                    benchmark.hardware
                ];

                if (!searchableFields.some(field => 
                    field && field.toLowerCase().includes(term))) {
                    return false;
                }
            }

            return true;
        });
    }

    /**
     * 获取唯一的模型名称
     * @returns {Array} 唯一模型名称数组
     */
    getUniqueModels() {
        const models = this.allBenchmarks.map(b => b.model_name);
        return CommonUtils.getUniqueValues(models).filter(m => m);
    }

    /**
     * 获取唯一的框架名称
     * @returns {Array} 唯一框架名称数组
     */
    getUniqueFrameworks() {
        const frameworks = this.allBenchmarks.map(b => b.framework);
        return CommonUtils.getUniqueValues(frameworks).filter(f => f);
    }

    /**
     * 计算统计数据
     * @returns {Object} 统计数据对象
     */
    calculateStats() {
        const benchmarks = this.filteredBenchmarks;
        const stats = {
            totalTests: benchmarks.length,
            avgPrefillTime: 0,
            avgDecodeTime: 0,
            avgTokensPerSecond: 0
        };

        if (benchmarks.length > 0) {
            const prefillTimes = benchmarks.map(b => b.metrics.prefill_time_ms);
            const decodeTimes = benchmarks.map(b => b.metrics.decode_time_ms);
            const tokensPerSecond = benchmarks.map(b => b.metrics.tokens_per_second);

            stats.avgPrefillTime = CommonUtils.calculateAverage(prefillTimes);
            stats.avgDecodeTime = CommonUtils.calculateAverage(decodeTimes);
            stats.avgTokensPerSecond = CommonUtils.calculateAverage(tokensPerSecond);
        }

        return stats;
    }

    /**
     * 导出数据为CSV格式
     * @returns {string} CSV格式的数据字符串
     */
    exportToCSV() {
        if (this.filteredBenchmarks.length === 0) {
            return '';
        }

        // 定义CSV列头
        const headers = [
            'ID', '模型名称', '模型版本', '框架', '框架版本', '硬件',
            '输入序列', '输出序列', 'Prefill耗时(ms)', 'Decode耗时(ms)',
            '总耗时(ms)', 'Token/s', '内存使用(MB)', '吞吐量'
        ];

        // 创建CSV内容
        let csvContent = headers.join(',') + '\n';

        // 添加数据行
        this.filteredBenchmarks.forEach(benchmark => {
            const row = [
                benchmark.id,
                benchmark.model_name,
                benchmark.model_version,
                benchmark.framework,
                benchmark.framework_version,
                benchmark.hardware,
                benchmark.input_sequence,
                benchmark.output_sequence,
                benchmark.metrics.prefill_time_ms,
                benchmark.metrics.decode_time_ms,
                benchmark.metrics.total_time_ms,
                benchmark.metrics.tokens_per_second,
                benchmark.metrics.memory_usage_mb,
                benchmark.metrics.throughput
            ].join(',');
            csvContent += row + '\n';
        });

        return csvContent;
    }
}

// 导出DataHandler类
window.DataHandler = DataHandler;