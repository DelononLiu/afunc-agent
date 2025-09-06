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
        },
        columns: [
            { title: '模型' },
            { title: '框架' },
            { title: '输入序列' },
            { title: '输出序列' },
            { title: 'Prefill (ms)' },
            { title: 'Decode (ms)' },
            { title: '总耗时 (ms)' },
            { title: 'Token/s' },
            { title: '内存 (MB)' },
            { title: '吞吐量' }
        ]
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

// 处理文件选择
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        // 可以在这里添加文件预览功能
        console.log('选择的文件:', file.name);
    }
}