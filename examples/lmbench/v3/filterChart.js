/**
 * 筛选和图表模块
 */

// 全局变量存储图表实例
let frameworkChart = null;
let modelChart = null;

/**
 * 更新模型筛选下拉框
 * @param {array} modelNames - 模型名称数组
 */
function updateModelFilter(modelNames) {
    const modelFilter = document.getElementById('modelFilter');
    if (!modelFilter) return;
    
    // 清空现有选项
    modelFilter.innerHTML = '<option value="">所有模型</option>';
    
    // 添加模型选项
    modelNames.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        modelFilter.appendChild(option);
    });
}

/**
 * 更新框架筛选下拉框
 * @param {array} frameworks - 框架数组
 */
function updateFrameworkFilter(frameworks) {
    const frameworkFilter = document.getElementById('frameworkFilter');
    if (!frameworkFilter) return;
    
    // 清空现有选项
    frameworkFilter.innerHTML = '<option value="">所有框架</option>';
    
    // 添加框架选项
    frameworks.forEach(framework => {
        const option = document.createElement('option');
        option.value = framework;
        option.textContent = framework;
        frameworkFilter.appendChild(option);
    });
}

/**
 * 获取当前筛选条件
 * @returns {object} 筛选条件对象
 */
function getFilters() {
    return {
        model: document.getElementById('modelFilter').value,
        framework: document.getElementById('frameworkFilter').value,
        inputSequence: parseInt(document.getElementById('inputSeqSlider').value) || 0,
        outputSequence: parseInt(document.getElementById('outputSeqSlider').value) || 0
    };
}

/**
 * 应用筛选条件
 * @param {array} data - 原始数据
 * @param {object} filters - 筛选条件
 * @returns {array} 筛选后的数据
 */
function applyFilters(data, filters) {
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
 * 更新滑块值显示
 */
function updateSliderValues() {
    const inputSeqSlider = document.getElementById('inputSeqSlider');
    const outputSeqSlider = document.getElementById('outputSeqSlider');
    const inputSeqValue = document.getElementById('inputSeqValue');
    const outputSeqValue = document.getElementById('outputSeqValue');
    
    if (inputSeqSlider && inputSeqValue) {
        inputSeqValue.textContent = inputSeqSlider.value;
    }
    
    if (outputSeqSlider && outputSeqValue) {
        outputSeqValue.textContent = outputSeqSlider.value;
    }
}

/**
 * 创建框架性能对比图表
 * @param {array} data - 基准测试数据
 */
function createFrameworkChart(data) {
    const ctx = document.getElementById('frameworkChart');
    if (!ctx) return;
    
    // 销毁现有图表
    if (frameworkChart) {
        frameworkChart.destroy();
    }
    
    // 按框架分组数据
    const frameworkData = {};
    data.forEach(item => {
        if (!frameworkData[item.framework]) {
            frameworkData[item.framework] = {
                count: 0,
                totalPrefillTime: 0,
                totalDecodeTime: 0,
                totalTokensPerSecond: 0
            };
        }
        
        frameworkData[item.framework].count++;
        frameworkData[item.framework].totalPrefillTime += item.prefill_time_ms || 0;
        frameworkData[item.framework].totalDecodeTime += item.decode_time_ms || 0;
        frameworkData[item.framework].totalTokensPerSecond += item.tokens_per_second || 0;
    });
    
    // 准备图表数据
    const labels = Object.keys(frameworkData);
    const prefillTimes = labels.map(label => 
        frameworkData[label].totalPrefillTime / frameworkData[label].count);
    const decodeTimes = labels.map(label => 
        frameworkData[label].totalDecodeTime / frameworkData[label].count);
    const tokensPerSecond = labels.map(label => 
        frameworkData[label].totalTokensPerSecond / frameworkData[label].count);
    
    // 创建图表
    // 检查Chart对象是否存在
    if (typeof Chart === 'undefined') {
        console.error('Chart.js库未正确加载');
        return;
    }
    
    frameworkChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: '平均Prefill耗时 (ms)',
                    data: prefillTimes,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: '平均Decode耗时 (ms)',
                    data: decodeTimes,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: '平均Token/s',
                    data: tokensPerSecond,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

/**
 * 创建模型性能对比图表
 * @param {array} data - 基准测试数据
 */
function createModelChart(data) {
    const ctx = document.getElementById('modelChart');
    if (!ctx) return;
    
    // 销毁现有图表
    if (modelChart) {
        modelChart.destroy();
    }
    
    // 按模型分组数据
    const modelData = {};
    data.forEach(item => {
        if (!modelData[item.model_name]) {
            modelData[item.model_name] = {
                count: 0,
                totalPrefillTime: 0,
                totalDecodeTime: 0,
                totalTokensPerSecond: 0
            };
        }
        
        modelData[item.model_name].count++;
        modelData[item.model_name].totalPrefillTime += item.prefill_time_ms || 0;
        modelData[item.model_name].totalDecodeTime += item.decode_time_ms || 0;
        modelData[item.model_name].totalTokensPerSecond += item.tokens_per_second || 0;
    });
    
    // 准备图表数据
    const labels = Object.keys(modelData);
    const prefillTimes = labels.map(label => 
        modelData[label].totalPrefillTime / modelData[label].count);
    const decodeTimes = labels.map(label => 
        modelData[label].totalDecodeTime / modelData[label].count);
    const tokensPerSecond = labels.map(label => 
        modelData[label].totalTokensPerSecond / modelData[label].count);
    
    // 创建图表
    // 检查Chart对象是否存在
    if (typeof Chart === 'undefined') {
        console.error('Chart.js库未正确加载');
        return;
    }
    
    modelChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: '平均Prefill耗时 (ms)',
                    data: prefillTimes,
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: '平均Decode耗时 (ms)',
                    data: decodeTimes,
                    backgroundColor: 'rgba(255, 159, 64, 0.6)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1
                },
                {
                    label: '平均Token/s',
                    data: tokensPerSecond,
                    backgroundColor: 'rgba(255, 205, 86, 0.6)',
                    borderColor: 'rgba(255, 205, 86, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

/**
 * 更新所有图表
 * @param {array} data - 基准测试数据
 */
function updateCharts(data) {
    createFrameworkChart(data);
    createModelChart(data);
}

/**
 * 显示图表容器
 */
function showCharts() {
    const chartsContainer = document.getElementById('chartsContainer');
    if (chartsContainer) {
        chartsContainer.classList.remove('hidden');
    }
}

/**
 * 隐藏图表容器
 */
function hideCharts() {
    const chartsContainer = document.getElementById('chartsContainer');
    if (chartsContainer) {
        chartsContainer.classList.add('hidden');
    }
}

/**
 * 切换图表显示状态
 */
function toggleCharts() {
    const chartsContainer = document.getElementById('chartsContainer');
    if (chartsContainer) {
        chartsContainer.classList.toggle('hidden');
    }
}

// 导出函数（如果在模块环境中）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateModelFilter,
        updateFrameworkFilter,
        getFilters,
        applyFilters,
        updateSliderValues,
        createFrameworkChart,
        createModelChart,
        updateCharts,
        showCharts,
        hideCharts,
        toggleCharts
    };
}