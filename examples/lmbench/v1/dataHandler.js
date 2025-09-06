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
    
    // 根据列索引切换列的显示
    // DataTables API可以用来控制列的显示
    dataTable.column(4).visible(showPrefill);
    dataTable.column(5).visible(showDecode);
    dataTable.column(6).visible(showTotal);
    dataTable.column(7).visible(showTPS);
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