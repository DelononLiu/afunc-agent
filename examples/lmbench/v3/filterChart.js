/**
 * 筛选和图表模块
 */

class FilterChart {
    constructor() {
        this.frameworkChart = null;
        this.modelChart = null;
    }

    /**
     * 初始化图表
     */
    initCharts() {
        // 初始化框架对比图表
        const frameworkCtx = document.getElementById('framework-chart');
        if (frameworkCtx) {
            this.frameworkChart = new Chart(frameworkCtx, {
                type: 'bar',
                data: {
                    labels: [],
                    datasets: []
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // 初始化模型对比图表
        const modelCtx = document.getElementById('model-chart');
        if (modelCtx) {
            this.modelChart = new Chart(modelCtx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: []
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }

    /**
     * 更新框架对比图表
     * @param {Array} benchmarks - 基准测试数据
     * @param {Object} displayOptions - 显示选项
     */
    updateFrameworkChart(benchmarks, displayOptions) {
        if (!this.frameworkChart || benchmarks.length === 0) return;

        // 按框架分组数据
        const frameworkData = {};
        benchmarks.forEach(benchmark => {
            const framework = benchmark.framework;
            if (!frameworkData[framework]) {
                frameworkData[framework] = {
                    prefillTimes: [],
                    decodeTimes: [],
                    totalTimes: [],
                    tokensPerSecond: []
                };
            }
            
            if (displayOptions.showPrefillTime) {
                frameworkData[framework].prefillTimes.push(benchmark.metrics.prefill_time_ms);
            }
            if (displayOptions.showDecodeTime) {
                frameworkData[framework].decodeTimes.push(benchmark.metrics.decode_time_ms);
            }
            if (displayOptions.showTotalTime) {
                frameworkData[framework].totalTimes.push(benchmark.metrics.total_time_ms);
            }
            if (displayOptions.showTokensPerSecond) {
                frameworkData[framework].tokensPerSecond.push(benchmark.metrics.tokens_per_second);
            }
        });

        // 计算平均值
        const labels = Object.keys(frameworkData);
        const datasets = [];

        if (displayOptions.showPrefillTime) {
            const prefillData = labels.map(framework => {
                const times = frameworkData[framework].prefillTimes;
                return times.reduce((sum, time) => sum + time, 0) / times.length;
            });
            
            datasets.push({
                label: 'Prefill耗时(ms)',
                data: prefillData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            });
        }

        if (displayOptions.showDecodeTime) {
            const decodeData = labels.map(framework => {
                const times = frameworkData[framework].decodeTimes;
                return times.reduce((sum, time) => sum + time, 0) / times.length;
            });
            
            datasets.push({
                label: 'Decode耗时(ms)',
                data: decodeData,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            });
        }

        if (displayOptions.showTotalTime) {
            const totalData = labels.map(framework => {
                const times = frameworkData[framework].totalTimes;
                return times.reduce((sum, time) => sum + time, 0) / times.length;
            });
            
            datasets.push({
                label: '总耗时(ms)',
                data: totalData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            });
        }

        if (displayOptions.showTokensPerSecond) {
            const tokensData = labels.map(framework => {
                const tokens = frameworkData[framework].tokensPerSecond;
                return tokens.reduce((sum, token) => sum + token, 0) / tokens.length;
            });
            
            datasets.push({
                label: 'Token/s',
                data: tokensData,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            });
        }

        // 更新图表数据
        this.frameworkChart.data.labels = labels;
        this.frameworkChart.data.datasets = datasets;
        this.frameworkChart.update();
    }

    /**
     * 更新模型对比图表
     * @param {Array} benchmarks - 基准测试数据
     * @param {Object} displayOptions - 显示选项
     */
    updateModelChart(benchmarks, displayOptions) {
        if (!this.modelChart || benchmarks.length === 0) return;

        // 按模型分组数据
        const modelData = {};
        benchmarks.forEach(benchmark => {
            const model = benchmark.model_name;
            if (!modelData[model]) {
                modelData[model] = {
                    prefillTimes: [],
                    decodeTimes: [],
                    totalTimes: [],
                    tokensPerSecond: []
                };
            }
            
            if (displayOptions.showPrefillTime) {
                modelData[model].prefillTimes.push(benchmark.metrics.prefill_time_ms);
            }
            if (displayOptions.showDecodeTime) {
                modelData[model].decodeTimes.push(benchmark.metrics.decode_time_ms);
            }
            if (displayOptions.showTotalTime) {
                modelData[model].totalTimes.push(benchmark.metrics.total_time_ms);
            }
            if (displayOptions.showTokensPerSecond) {
                modelData[model].tokensPerSecond.push(benchmark.metrics.tokens_per_second);
            }
        });

        // 计算平均值
        const labels = Object.keys(modelData);
        const datasets = [];

        if (displayOptions.showPrefillTime) {
            const prefillData = labels.map(model => {
                const times = modelData[model].prefillTimes;
                return times.reduce((sum, time) => sum + time, 0) / times.length;
            });
            
            datasets.push({
                label: 'Prefill耗时(ms)',
                data: prefillData,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.1
            });
        }

        if (displayOptions.showDecodeTime) {
            const decodeData = labels.map(model => {
                const times = modelData[model].decodeTimes;
                return times.reduce((sum, time) => sum + time, 0) / times.length;
            });
            
            datasets.push({
                label: 'Decode耗时(ms)',
                data: decodeData,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                tension: 0.1
            });
        }

        if (displayOptions.showTotalTime) {
            const totalData = labels.map(model => {
                const times = modelData[model].totalTimes;
                return times.reduce((sum, time) => sum + time, 0) / times.length;
            });
            
            datasets.push({
                label: '总耗时(ms)',
                data: totalData,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1
            });
        }

        if (displayOptions.showTokensPerSecond) {
            const tokensData = labels.map(model => {
                const tokens = modelData[model].tokensPerSecond;
                return tokens.reduce((sum, token) => sum + token, 0) / tokens.length;
            });
            
            datasets.push({
                label: 'Token/s',
                data: tokensData,
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                tension: 0.1
            });
        }

        // 更新图表数据
        this.modelChart.data.labels = labels;
        this.modelChart.data.datasets = datasets;
        this.modelChart.update();
    }

    /**
     * 销毁图表
     */
    destroyCharts() {
        if (this.frameworkChart) {
            this.frameworkChart.destroy();
            this.frameworkChart = null;
        }
        
        if (this.modelChart) {
            this.modelChart.destroy();
            this.modelChart = null;
        }
    }
}

// 导出FilterChart类
window.FilterChart = FilterChart;