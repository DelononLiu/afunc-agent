/**
 * 数据导出模块
 */

/**
 * 将数据导出为CSV格式
 * @param {array} data - 要导出的数据
 * @param {string} filename - 文件名
 */
function exportToCSV(data, filename) {
    if (!data || data.length === 0) {
        console.warn('没有数据可导出');
        return;
    }
    
    // 定义CSV列标题
    const headers = [
        'ID',
        '模型名称',
        '模型版本',
        '推理框架',
        '框架版本',
        '硬件',
        '输入序列长度',
        '输出序列长度',
        'Prefill耗时(ms)',
        'Decode耗时(ms)',
        '总耗时(ms)',
        'Token/s',
        '内存使用量(MB)',
        '吞吐量',
        '时间戳'
    ];
    
    // 创建CSV内容
    let csvContent = headers.join(',') + '\n';
    
    // 添加数据行
    data.forEach(item => {
        const row = [
            item.id || '',
            item.model_name || '',
            item.model_version || '',
            item.framework || '',
            item.framework_version || '',
            item.hardware || '',
            item.input_sequence || 0,
            item.output_sequence || 0,
            item.prefill_time_ms || 0,
            item.decode_time_ms || 0,
            item.total_time_ms || 0,
            item.tokens_per_second || 0,
            item.memory_usage_mb || 0,
            item.throughput || 0,
            item.timestamp || ''
        ].join(',');
        
        csvContent += row + '\n';
    });
    
    // 创建并下载CSV文件
    downloadCSV(csvContent, filename);
}

/**
 * 下载CSV文件
 * @param {string} csvContent - CSV内容
 * @param {string} filename - 文件名
 */
function downloadCSV(csvContent, filename) {
    // 创建Blob对象
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // 创建下载链接
    const link = document.createElement('a');
    if (link.download !== undefined) {
        // 创建URL
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        
        // 添加到页面并点击下载
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // 释放URL对象
        URL.revokeObjectURL(url);
    } else {
        // 不支持download属性的浏览器
        alert('您的浏览器不支持直接下载文件，请复制以下内容并保存为CSV文件：\n\n' + csvContent);
    }
}

/**
 * 导出当前筛选结果
 * @param {array} data - 当前筛选的数据
 */
function exportCurrentData(data) {
    const filename = `benchmark_data_${new Date().toISOString().slice(0, 10)}.csv`;
    exportToCSV(data, filename);
}

/**
 * 导出所有数据
 * @param {array} data - 所有数据
 */
function exportAllData(data) {
    const filename = `all_benchmark_data_${new Date().toISOString().slice(0, 10)}.csv`;
    exportToCSV(data, filename);
}

// 导出函数（如果在模块环境中）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        exportToCSV,
        downloadCSV,
        exportCurrentData,
        exportAllData
    };
}