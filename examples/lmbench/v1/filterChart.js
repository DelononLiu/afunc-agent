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