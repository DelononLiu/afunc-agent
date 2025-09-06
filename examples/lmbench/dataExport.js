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