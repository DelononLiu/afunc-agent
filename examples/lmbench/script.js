// 全局变量
let performanceData = [];
let dataTable;
let frameworkChart, modelChart;

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    initializeDataTable();
    initializeEventListeners();
    loadSampleData(); // 加载示例数据
});

// 初始化数据表格
function initializeDataTable() {
    dataTable = $('#performanceTable').DataTable({
        responsive: true,
        pageLength: 10,
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/zh.json'
        }
    });
}

// 初始化事件监听器
function initializeEventListeners() {
    // 文件选择
    document.getElementById('dataFile').addEventListener('change', handleFileSelect);
    
    // 滑块值更新
    document.getElementById('inputSeqFilter').addEventListener('input', function() {
        document.getElementById('inputSeqValue').textContent = this.value;
    });
    
    document.getElementById('outputSeqFilter').addEventListener('input', function() {
        document.getElementById('outputSeqValue').textContent = this.value;
    });
    
    // 筛选器变化
    ['modelFilter', 'frameworkFilter'].forEach(id => {
        document.getElementById(id).addEventListener('change', applyFilters);
    });
    
    // 指标显示切换
    ['showPrefill', 'showDecode', 'showTotal', 'showTPS'].forEach(id => {
        document.getElementById(id).addEventListener('change', toggleColumns);
    });
}

// 加载数据文件
function loadData() {
    const fileInput = document.getElementById('dataFile');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('请选择数据文件');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            processData(data);
        } catch (error) {
            alert('数据文件格式错误: ' + error.message);
        }
    };
    reader.readAsText(file);
}

// 处理数据
function processData(data) {
    if (!data.benchmarks || !Array.isArray(data.benchmarks)) {
        alert('数据格式不正确');
        return;
    }
    
    performanceData = data.benchmarks;
    updateTable();
    updateStatistics();
    updateFilters();
}

// 更新表格
function updateTable() {
    dataTable.clear();
    
    performanceData.forEach(item => {
        const row = [
            item.model_name,
            item.framework,
            item.input_sequence,
            item.output_sequence,
            item.metrics.prefill_time_ms.toFixed(2),
            item.metrics.decode_time_ms.toFixed(2),
            item.metrics.total_time_ms.toFixed(2),
            item.metrics.tokens_per_second.toFixed(2),
            item.metrics.memory_usage_mb,
            item.metrics.throughput
        ];
        dataTable.row.add(row);
    });
    
    dataTable.draw();
}

// 更新统计信息
function updateStatistics() {
    const total = performanceData.length;
    const avgPrefill = performanceData.reduce((sum, item) => sum + item.metrics.prefill_time_ms, 0) / total;
    const avgDecode = performanceData.reduce((sum, item) => sum + item.metrics.decode_time_ms, 0) / total;
    const avgTPS = performanceData.reduce((sum, item) => sum + item.metrics.tokens_per_second, 0) / total;
    
    document.getElementById('totalBenchmarks').textContent = total;
    document.getElementById('avgPrefill').textContent = avgPrefill.toFixed(2);
    document.getElementById('avgDecode').textContent = avgDecode.toFixed(2);
    document.getElementById('avgTPS').textContent = avgTPS.toFixed(2);
}

// 更新筛选器选项
function updateFilters() {
    const models = [...new Set(performanceData.map(item => item.model_name))];
    const frameworks = [...new Set(performanceData.map(item => item.framework))];
    
    updateSelectOptions('modelFilter', models);
    updateSelectOptions('frameworkFilter', frameworks);
}

// 更新选择器选项
function updateSelectOptions(selectId, options) {
    const select = document.getElementById(selectId);
    select.innerHTML = '<option value="">全部</option>';
    
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        select.appendChild(optionElement);
    });
}

// 应用筛选
function applyFilters() {
    const modelFilter = document.getElementById('modelFilter').value;
    const frameworkFilter = document.getElementById('frameworkFilter').value;
    const inputSeqFilter = parseInt(document.getElementById('inputSeqFilter').value);
    const outputSeqFilter = parseInt(document.getElementById('outputSeqFilter').value);
    
    dataTable.clear();
    
    performanceData.forEach(item => {
        let include = true;
        
        if (modelFilter && item.model_name !== modelFilter) include = false;
        if (frameworkFilter && item.framework !== frameworkFilter) include = false;
        if (inputSeqFilter > 0 && item.input_sequence > inputSeqFilter) include = false;
        if (outputSeqFilter > 0 && item.output_sequence > outputSeqFilter) include = false;
        
        if (include) {
            const row = [
                item.model_name,
                item.framework,
                item.input_sequence,
                item.output_sequence,
                item.metrics.prefill_time_ms.toFixed(2),
                item.metrics.decode_time_ms.toFixed(2),
                item.metrics.total_time_ms.toFixed(2),
                item.metrics.tokens_per_second.toFixed(2),
                item.metrics.memory_usage_mb,
                item.metrics.throughput
            ];
            dataTable.row.add(row);
        }
    });
    
    dataTable.draw();
}

// 切换列显示
function toggleColumns() {
    const showPrefill = document.getElementById('showPrefill').checked;
    const showDecode = document.getElementById('showDecode').checked;
    const showTotal = document.getElementById('showTotal').checked;
    const showTPS = document.getElementById('showTPS').checked;
    
    // 这里需要根据列索引来切换列的显示
    // DataTables API可以用来控制列的显示
}

// 重置筛选
function resetFilters() {
    document.getElementById('modelFilter').value = '';
    document.getElementById('frameworkFilter').value = '';
    document.getElementById('inputSeqFilter').value = 0;
    document.getElementById('outputSeqFilter').value = 0;
    document.getElementById('inputSeqValue').textContent = '0';
    document.getElementById('outputSeqValue').textContent = '0';
    
    updateTable();
}

// 显示对比分析
function showComparison() {
    const comparisonSection = document.getElementById('comparisonSection');
    comparisonSection.style.display = comparisonSection.style.display === 'none' ? 'block' : 'none';
    
    if (comparisonSection.style.display === 'block') {
        createComparisonCharts();
    }
}

// 创建对比图表
function createComparisonCharts() {
    // 框架对比图表
    const frameworkCtx = document.getElementById('frameworkComparisonChart').getContext('2d');
    const frameworkData = getFrameworkComparisonData();
    
    if (frameworkChart) {
        frameworkChart.destroy();
    }
    
    frameworkChart = new Chart(frameworkCtx, {
        type: 'bar',
        data: frameworkData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '不同框架性能对比'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '耗时 (ms)'
                    }
                }
            }
        }
    });
    
    // 模型对比图表
    const modelCtx = document.getElementById('modelComparisonChart').getContext('2d');
    const modelData = getModelComparisonData();
    
    if (modelChart) {
        modelChart.destroy();
    }
    
    modelChart = new Chart(modelCtx, {
        type: 'bar',
        data: modelData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '不同模型性能对比'
                }
            },
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

// 获取框架对比数据
function getFrameworkComparisonData() {
    const frameworks = [...new Set(performanceData.map(item => item.framework))];
    const datasets = [
        {
            label: 'Prefill耗时',
            data: frameworks.map(framework => {
                const items = performanceData.filter(item => item.framework === framework);
                return items.reduce((sum, item) => sum + item.metrics.prefill_time_ms, 0) / items.length;
            }),
            backgroundColor: 'rgba(54, 162, 235, 0.8)'
        },
        {
            label: 'Decode耗时',
            data: frameworks.map(framework => {
                const items = performanceData.filter(item => item.framework === framework);
                return items.reduce((sum, item) => sum + item.metrics.decode_time_ms, 0) / items.length;
            }),
            backgroundColor: 'rgba(255, 99, 132, 0.8)'
        }
    ];
    
    return {
        labels: frameworks,
        datasets: datasets
    };
}

// 获取模型对比数据
function getModelComparisonData() {
    const models = [...new Set(performanceData.map(item => item.model_name))];
    const datasets = [
        {
            label: 'Token/s',
            data: models.map(model => {
                const items = performanceData.filter(item => item.model_name === model);
                return items.reduce((sum, item) => sum + item.metrics.tokens_per_second, 0) / items.length;
            }),
            backgroundColor: 'rgba(75, 192, 192, 0.8)'
        }
    ];
    
    return {
        labels: models,
        datasets: datasets
    };
}

// 导出数据
function exportData() {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'performance_data.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 生成CSV内容
function generateCSV() {
    const headers = ['模型', '框架', '输入序列', '输出序列', 'Prefill耗时(ms)', 'Decode耗时(ms)', '总耗时(ms)', 'Token/s', '内存(MB)', '吞吐量'];
    const rows = performanceData.map(item => [
        item.model_name,
        item.framework,
        item.input_sequence,
        item.output_sequence,
        item.metrics.prefill_time_ms,
        item.metrics.decode_time_ms,
        item.metrics.total_time_ms,
        item.metrics.tokens_per_second,
        item.metrics.memory_usage_mb,
        item.metrics.throughput
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
}

// 加载示例数据
function loadSampleData() {
    const sampleData = {
        metadata: {
            version: "1.0",
            created_at: "2024-01-15T10:00:00Z",
            description: "大模型性能基准测试数据"
        },
        benchmarks: [
            {
                id: "benchmark_001",
                model_name: "GPT-4",
                model_version: "4.0",
                framework: "TensorRT",
                framework_version: "8.6",
                hardware: "NVIDIA A100",
                input_sequence: 1024,
                output_sequence: 512,
                metrics: {
                    prefill_time_ms: 45.2,
                    decode_time_ms: 12.8,
                    total_time_ms: 58.0,
                    tokens_per_second: 88.3,
                    memory_usage_mb: 2450,
                    throughput: 92.1
                },
                timestamp: "2024-01-15T09:30:00Z",
                environment: {
                    cuda_version: "11.8",
                    python_version: "3.9",
                    os: "Ubuntu 20.04"
                }
            },
            {
                id: "benchmark_002",
                model_name: "GPT-4",
                model_version: "4.0",
                framework: "ONNX",
                framework_version: "1.14",
                hardware: "NVIDIA A100",
                input_sequence: 1024,
                output_sequence: 512,
                metrics: {
                    prefill_time_ms: 52.3,
                    decode_time_ms: 15.6,
                    total_time_ms: 67.9,
                    tokens_per_second: 82.1,
                    memory_usage_mb: 2680,
                    throughput: 87.5
                },
                timestamp: "2024-01-15T09:45:00Z",
                environment: {
                    cuda_version: "11.8",
                    python_version: "3.9",
                    os: "Ubuntu 20.04"
                }
            },
            {
                id: "benchmark_003",
                model_name: "Llama2-7B",
                model_version: "2.0",
                framework: "TensorRT",
                framework_version: "8.6",
                hardware: "NVIDIA A100",
                input_sequence: 1024,
                output_sequence: 512,
                metrics: {
                    prefill_time_ms: 28.5,
                    decode_time_ms: 8.2,
                    total_time_ms: 36.7,
                    tokens_per_second: 124.5,
                    memory_usage_mb: 1890,
                    throughput: 118.3
                },
                timestamp: "2024-01-15T10:00:00Z",
                environment: {
                    cuda_version: "11.8",
                    python_version: "3.9",
                    os: "Ubuntu 20.04"
                }
            },
            {
                id: "benchmark_004",
                model_name: "Llama2-7B",
                model_version: "2.0",
                framework: "PyTorch",
                framework_version: "2.1",
                hardware: "NVIDIA A100",
                input_sequence: 1024,
                output_sequence: 512,
                metrics: {
                    prefill_time_ms: 35.8,
                    decode_time_ms: 11.2,
                    total_time_ms: 47.0,
                    tokens_per_second: 108.9,
                    memory_usage_mb: 2150,
                    throughput: 105.2
                },
                timestamp: "2024-01-15T10:15:00Z",
                environment: {
                    cuda_version: "11.8",
                    python_version: "3.9",
                    os: "Ubuntu 20.04"
                }
            },
            {
                id: "benchmark_005",
                model_name: "Claude-2",
                model_version: "2.0",
                framework: "TensorRT",
                framework_version: "8.6",
                hardware: "NVIDIA A100",
                input_sequence: 1024,
                output_sequence: 512,
                metrics: {
                    prefill_time_ms: 38.2,
                    decode_time_ms: 9.8,
                    total_time_ms: 48.0,
                    tokens_per_second: 115.6,
                    memory_usage_mb: 2230,
                    throughput: 112.1
                },
                timestamp: "2024-01-15T10:30:00Z",
                environment: {
                    cuda_version: "11.8",
                    python_version: "3.9",
                    os: "Ubuntu 20.04"
                }
            }
        ]
    };
    
    processData(sampleData);
}

// 处理文件选择
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        // 可以在这里添加文件预览功能
        console.log('选择的文件:', file.name);
    }
}