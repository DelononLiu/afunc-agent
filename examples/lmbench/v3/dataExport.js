/**
 * 数据导出模块
 */

class DataExport {
    /**
     * 导出数据为CSV格式
     * @param {Array} data - 要导出的数据
     * @param {string} filename - 导出文件名
     */
    static exportToCSV(data, filename = 'benchmark_data.csv') {
        if (!data || data.length === 0) {
            console.warn('没有数据可导出');
            return;
        }

        try {
            // 生成CSV内容
            const csvContent = this.generateCSVContent(data);
            
            // 下载文件
            CommonUtils.downloadFile(csvContent, filename, 'text/csv;charset=utf-8;');
            
            console.log('数据导出成功');
        } catch (error) {
            console.error('数据导出失败:', error);
            throw new Error('数据导出失败: ' + error.message);
        }
    }

    /**
     * 生成CSV内容
     * @param {Array} data - 数据数组
     * @returns {string} CSV格式的内容
     */
    static generateCSVContent(data) {
        // 定义CSV列头
        const headers = [
            'ID', '模型名称', '模型版本', '框架', '框架版本', '硬件',
            '输入序列', '输出序列', 'Prefill耗时(ms)', 'Decode耗时(ms)',
            '总耗时(ms)', 'Token/s', '内存使用(MB)', '吞吐量'
        ];

        // 创建CSV内容
        let csvContent = '\uFEFF' + headers.join(',') + '\n'; // 添加BOM以支持中文

        // 添加数据行
        data.forEach(benchmark => {
            const row = [
                this.escapeCSVField(benchmark.id || ''),
                this.escapeCSVField(benchmark.model_name || ''),
                this.escapeCSVField(benchmark.model_version || ''),
                this.escapeCSVField(benchmark.framework || ''),
                this.escapeCSVField(benchmark.framework_version || ''),
                this.escapeCSVField(benchmark.hardware || ''),
                benchmark.input_sequence || '',
                benchmark.output_sequence || '',
                benchmark.metrics?.prefill_time_ms || '',
                benchmark.metrics?.decode_time_ms || '',
                benchmark.metrics?.total_time_ms || '',
                benchmark.metrics?.tokens_per_second || '',
                benchmark.metrics?.memory_usage_mb || '',
                benchmark.metrics?.throughput || ''
            ].join(',');
            csvContent += row + '\n';
        });

        return csvContent;
    }

    /**
     * 转义CSV字段
     * @param {string} field - 要转义的字段
     * @returns {string} 转义后的字段
     */
    static escapeCSVField(field) {
        // 如果字段包含逗号、双引号或换行符，需要用双引号包围并转义双引号
        if (field.toString().includes(',') || field.toString().includes('"') || field.toString().includes('\n')) {
            return '"' + field.toString().replace(/"/g, '""') + '"';
        }
        return field.toString();
    }

    /**
     * 导出数据为JSON格式
     * @param {Array} data - 要导出的数据
     * @param {string} filename - 导出文件名
     */
    static exportToJSON(data, filename = 'benchmark_data.json') {
        if (!data || data.length === 0) {
            console.warn('没有数据可导出');
            return;
        }

        try {
            // 创建数据对象
            const exportData = {
                metadata: {
                    version: "1.0",
                    exported_at: new Date().toISOString(),
                    total_records: data.length
                },
                benchmarks: data
            };

            // 转换为JSON字符串
            const jsonContent = JSON.stringify(exportData, null, 2);
            
            // 下载文件
            CommonUtils.downloadFile(jsonContent, filename, 'application/json;charset=utf-8;');
            
            console.log('JSON数据导出成功');
        } catch (error) {
            console.error('JSON数据导出失败:', error);
            throw new Error('JSON数据导出失败: ' + error.message);
        }
    }

    /**
     * 导出图表为图片
     * @param {string} chartId - 图表元素ID
     * @param {string} filename - 导出文件名
     */
    static exportChartToImage(chartId, filename = 'chart.png') {
        try {
            const chartElement = document.getElementById(chartId);
            if (!chartElement) {
                throw new Error('未找到图表元素');
            }

            // 获取图表的Canvas元素
            const canvas = chartElement.querySelector('canvas');
            if (!canvas) {
                throw new Error('未找到图表Canvas元素');
            }

            // 将Canvas转换为图片并下载
            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = image;
            link.download = filename;
            link.click();
            
            console.log('图表导出成功');
        } catch (error) {
            console.error('图表导出失败:', error);
            throw new Error('图表导出失败: ' + error.message);
        }
    }
}

// 导出DataExport类
window.DataExport = DataExport;