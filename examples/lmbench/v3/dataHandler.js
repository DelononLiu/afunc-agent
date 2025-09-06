/**
 * 数据处理模块
 */

// 全局变量存储基准测试数据
let benchmarkData = [];
let filteredData = [];

/**
 * 加载JSON数据文件
 * @param {File} file - 要加载的文件
 * @returns {Promise} 解析后的数据
 */
function loadJSONFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                resolve(data);
            } catch (error) {
                reject(new Error('JSON文件格式错误: ' + error.message));
            }
        };
        reader.onerror = function() {
            reject(new Error('文件读取失败'));
        };
        reader.readAsText(file);
    });
}

/**
 * 加载示例数据
 * @returns {Promise} 示例数据
 */
function loadSampleData() {
    return new Promise((resolve) => {
        // 模拟异步加载
        setTimeout(() => {
            resolve(getSampleData());
        }, 500);
    });
}

/**
 * 处理基准测试数据
 * @param {object} data - 原始数据
 * @returns {array} 处理后的基准测试数据数组
 */
function processBenchmarkData(data) {
    if (!data || !data.benchmarks || !Array.isArray(data.benchmarks)) {
        throw new Error('无效的数据格式');
    }
    
    // 处理每个基准测试记录
    return data.benchmarks.map(benchmark => {
        return {
            id: benchmark.id || generateId(),
            model_name: benchmark.model_name || '',
            model_version: benchmark.model_version || '',
            framework: benchmark.framework || '',
            framework_version: benchmark.framework_version || '',
            hardware: benchmark.hardware || '',
            input_sequence: benchmark.input_sequence || 0,
            output_sequence: benchmark.output_sequence || 0,
            prefill_time_ms: benchmark.metrics ? benchmark.metrics.prefill_time_ms : 0,
            decode_time_ms: benchmark.metrics ? benchmark.metrics.decode_time_ms : 0,
            total_time_ms: benchmark.metrics ? benchmark.metrics.total_time_ms : 0,
            tokens_per_second: benchmark.metrics ? benchmark.metrics.tokens_per_second : 0,
            memory_usage_mb: benchmark.metrics ? benchmark.metrics.memory_usage_mb : 0,
            throughput: benchmark.metrics ? benchmark.metrics.throughput : 0,
            timestamp: benchmark.timestamp || '',
            environment: benchmark.environment || {}
        };
    });
}

/**
 * 获取所有唯一的模型名称
 * @param {array} data - 基准测试数据
 * @returns {array} 唯一的模型名称数组
 */
function getUniqueModelNames(data) {
    const modelNames = data.map(item => item.model_name);
    return [...new Set(modelNames)].filter(name => name !== '');
}

/**
 * 获取所有唯一的推理框架
 * @param {array} data - 基准测试数据
 * @returns {array} 唯一的推理框架数组
 */
function getUniqueFrameworks(data) {
    const frameworks = data.map(item => item.framework);
    return [...new Set(frameworks)].filter(framework => framework !== '');
}

/**
 * 根据筛选条件过滤数据
 * @param {array} data - 原始数据
 * @param {object} filters - 筛选条件
 * @returns {array} 过滤后的数据
 */
function filterData(data, filters) {
    return data.filter(item => {
        // 模型名称筛选
        if (filters.model && item.model_name !== filters.model) {
            return false;
        }
        
        // 推理框架筛选
        if (filters.framework && item.framework !== filters.framework) {
            return false;
        }
        
        // 输入序列长度筛选
        if (filters.inputSequence > 0 && item.input_sequence < filters.inputSequence) {
            return false;
        }
        
        // 输出序列长度筛选
        if (filters.outputSequence > 0 && item.output_sequence < filters.outputSequence) {
            return false;
        }
        
        return true;
    });
}

/**
 * 计算统计数据
 * @param {array} data - 基准测试数据
 * @returns {object} 统计数据
 */
function calculateStatistics(data) {
    if (!data || data.length === 0) {
        return {
            totalTests: 0,
            avgPrefillTime: 0,
            avgDecodeTime: 0,
            avgTokenPerSecond: 0
        };
    }
    
    const totalTests = data.length;
    const sumPrefillTime = data.reduce((sum, item) => sum + (item.prefill_time_ms || 0), 0);
    const sumDecodeTime = data.reduce((sum, item) => sum + (item.decode_time_ms || 0), 0);
    const sumTokenPerSecond = data.reduce((sum, item) => sum + (item.tokens_per_second || 0), 0);
    
    return {
        totalTests: totalTests,
        avgPrefillTime: sumPrefillTime / totalTests,
        avgDecodeTime: sumDecodeTime / totalTests,
        avgTokenPerSecond: sumTokenPerSecond / totalTests
    };
}

/**
 * 设置基准测试数据
 * @param {array} data - 基准测试数据
 */
function setBenchmarkData(data) {
    benchmarkData = data;
    filteredData = data;
}

/**
 * 获取基准测试数据
 * @returns {array} 基准测试数据
 */
function getBenchmarkData() {
    return benchmarkData;
}

/**
 * 获取过滤后的数据
 * @returns {array} 过滤后的数据
 */
function getFilteredData() {
    return filteredData;
}

/**
 * 设置过滤后的数据
 * @param {array} data - 过滤后的数据
 */
function setFilteredData(data) {
    filteredData = data;
}

/**
 * 重置数据
 */
function resetData() {
    benchmarkData = [];
    filteredData = [];
}

// 导出函数（如果在模块环境中）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadJSONFile,
        loadSampleData,
        processBenchmarkData,
        getUniqueModelNames,
        getUniqueFrameworks,
        filterData,
        calculateStatistics,
        setBenchmarkData,
        getBenchmarkData,
        getFilteredData,
        setFilteredData,
        resetData
    };
}