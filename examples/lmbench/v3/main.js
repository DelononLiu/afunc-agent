/**
 * 主逻辑模块
 */

// 导入所需的函数
// 注意：在浏览器环境中，这些函数已经在全局作用域中可用

// 全局变量
let table = null; // Tabulator表格实例
let rawData = []; // 原始数据
let currentData = []; // 当前显示的数据

/**
 * 初始化应用程序
 */
function initApp() {
    console.log('初始化应用程序...');
    
    // 初始化表格
    initTable();
    
    // 绑定事件监听器
    bindEventListeners();
    
    // 初始化滑块值显示
    updateSliderValues();
    
    console.log('应用程序初始化完成');
}

/**
 * 初始化Tabulator表格
 */
function initTable() {
    const tableElement = document.getElementById('data-table');
    if (!tableElement) {
        console.error('未找到表格元素');
        return;
    }
    
    table = new Tabulator("#data-table", {
        data: [], // 初始空数据
        layout: "fitColumns",
        pagination: "local",
        paginationSize: 10,
        paginationSizeSelector: [10, 25, 50, 100],
        movableColumns: true,
        resizableRows: true,
        columns: [
            { title: "ID", field: "id", visible: false },
            { title: "模型名称", field: "model_name" },
            { title: "模型版本", field: "model_version" },
            { title: "推理框架", field: "framework" },
            { title: "框架版本", field: "framework_version" },
            { title: "硬件", field: "hardware" },
            { title: "输入序列", field: "input_sequence", hozAlign: "right" },
            { title: "输出序列", field: "output_sequence", hozAlign: "right" },
            { title: "Prefill耗时(ms)", field: "prefill_time_ms", hozAlign: "right" },
            { title: "Decode耗时(ms)", field: "decode_time_ms", hozAlign: "right" },
            { title: "总耗时(ms)", field: "total_time_ms", hozAlign: "right" },
            { title: "Token/s", field: "tokens_per_second", hozAlign: "right" },
            { title: "内存使用(MB)", field: "memory_usage_mb", hozAlign: "right" },
            { title: "吞吐量", field: "throughput", hozAlign: "right" },
            { title: "时间戳", field: "timestamp" }
        ],
        locale: true,
        langs: {
            "zh-cn": {
                "columns": {
                    "id": "ID",
                    "model_name": "模型名称",
                    "model_version": "模型版本",
                    "framework": "推理框架",
                    "framework_version": "框架版本",
                    "hardware": "硬件",
                    "input_sequence": "输入序列",
                    "output_sequence": "输出序列",
                    "prefill_time_ms": "Prefill耗时(ms)",
                    "decode_time_ms": "Decode耗时(ms)",
                    "total_time_ms": "总耗时(ms)",
                    "tokens_per_second": "Token/s",
                    "memory_usage_mb": "内存使用(MB)",
                    "throughput": "吞吐量",
                    "timestamp": "时间戳"
                },
                "pagination": {
                    "first": "首页",
                    "first_title": "第一页",
                    "last": "末页",
                    "last_title": "最后一页",
                    "prev": "上一页",
                    "prev_title": "上一页",
                    "next": "下一页",
                    "next_title": "下一页"
                }
            }
        }
    });
}

/**
 * 绑定事件监听器
 */
function bindEventListeners() {
    // 数据加载按钮
    document.getElementById('loadBtn')?.addEventListener('click', handleLoadData);
    
    // 加载示例数据按钮
    document.getElementById('loadSampleBtn')?.addEventListener('click', handleLoadSampleData);
    
    // 导出数据按钮
    document.getElementById('exportBtn')?.addEventListener('click', handleExportData);
    
    // 对比分析按钮
    document.getElementById('compareBtn')?.addEventListener('click', handleCompareData);
    
    // 重置筛选按钮
    document.getElementById('resetFilterBtn')?.addEventListener('click', handleResetFilters);
    
    // 模型筛选下拉框
    document.getElementById('modelFilter')?.addEventListener('change', handleFilterChange);
    
    // 框架筛选下拉框
    document.getElementById('frameworkFilter')?.addEventListener('change', handleFilterChange);
    
    // 输入序列滑块
    document.getElementById('inputSeqSlider')?.addEventListener('input', handleSliderChange);
    
    // 输出序列滑块
    document.getElementById('outputSeqSlider')?.addEventListener('input', handleSliderChange);
    
    // 指标筛选复选框
    document.getElementById('prefillTimeCheck')?.addEventListener('change', handleMetricChange);
    document.getElementById('decodeTimeCheck')?.addEventListener('change', handleMetricChange);
    document.getElementById('totalTimeCheck')?.addEventListener('change', handleMetricChange);
    document.getElementById('tokenPerSecondCheck')?.addEventListener('change', handleMetricChange);
    
    // 表格搜索按钮
    document.getElementById('searchBtn')?.addEventListener('click', handleTableSearch);
    
    // 表格搜索输入框回车事件
    document.getElementById('tableSearch')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleTableSearch();
        }
    });
}

/**
 * 处理数据加载
 */
function handleLoadData() {
    const fileInput = document.getElementById('fileInput');
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        alert('请选择一个JSON文件');
        return;
    }
    
    const file = fileInput.files[0];
    loadJSONFile(file)
        .then(data => {
            processData(data);
        })
        .catch(error => {
            console.error('数据加载失败:', error);
            alert('数据加载失败: ' + error.message);
        });
}

/**
 * 处理加载示例数据
 */
function handleLoadSampleData() {
    loadSampleData()
        .then(data => {
            processData(data);
        })
        .catch(error => {
            console.error('加载示例数据失败:', error);
            alert('加载示例数据失败: ' + error.message);
        });
}

/**
 * 处理数据导出
 */
function handleExportData() {
    if (!currentData || currentData.length === 0) {
        alert('没有数据可导出');
        return;
    }
    
    exportCurrentData(currentData);
}

/**
 * 处理对比分析
 */
function handleCompareData() {
    if (!currentData || currentData.length === 0) {
        alert('没有数据可进行对比分析');
        return;
    }
    
    // 更新图表
    updateCharts(currentData);
    
    // 显示图表容器
    showCharts();
}

/**
 * 处理重置筛选
 */
function handleResetFilters() {
    // 重置筛选器
    document.getElementById('modelFilter').value = '';
    document.getElementById('frameworkFilter').value = '';
    document.getElementById('inputSeqSlider').value = 0;
    document.getElementById('outputSeqSlider').value = 0;
    
    // 更新滑块值显示
    updateSliderValues();
    
    // 应用筛选器（无筛选条件）
    applyCurrentFilters();
}

/**
 * 处理筛选器变化
 */
function handleFilterChange() {
    applyCurrentFilters();
}

/**
 * 处理滑块变化
 */
function handleSliderChange() {
    // 更新滑块值显示
    updateSliderValues();
    
    // 应用筛选器
    applyCurrentFilters();
}

/**
 * 处理指标变化
 */
function handleMetricChange() {
    // 重新加载表格以显示/隐藏列
    updateTableColumns();
}

/**
 * 处理表格搜索
 */
function handleTableSearch() {
    const searchTerm = document.getElementById('tableSearch').value.toLowerCase();
    
    if (!table) return;
    
    if (searchTerm === '') {
        // 如果搜索词为空，清除搜索
        table.clearFilter();
    } else {
        // 应用搜索过滤器
        table.setFilter(function(data) {
            // 检查所有字段是否包含搜索词
            for (let key in data) {
                if (data[key] && data[key].toString().toLowerCase().includes(searchTerm)) {
                    return true;
                }
            }
            return false;
        });
    }
}

/**
 * 应用当前筛选条件
 */
function applyCurrentFilters() {
    if (!rawData || rawData.length === 0) return;
    
    // 获取当前筛选条件
    const filters = getFilters();
    
    // 应用筛选
    currentData = applyFilters(rawData, filters);
    
    // 更新表格数据
    updateTableData(currentData);
    
    // 更新统计信息
    updateStatistics(currentData);
    
    // 更新筛选下拉框
    updateFilterDropdowns(currentData);
}

/**
 * 更新表格列显示
*/
function updateTableColumns() {
    if (!table) return;
    
    // 获取指标复选框状态
    const prefillTimeCheck = document.getElementById('prefillTimeCheck')?.checked ?? true;
    const decodeTimeCheck = document.getElementById('decodeTimeCheck')?.checked ?? true;
    const totalTimeCheck = document.getElementById('totalTimeCheck')?.checked ?? true;
    const tokenPerSecondCheck = document.getElementById('tokenPerSecondCheck')?.checked ?? true;
    
    // 更新列可见性
    const prefillCol = table.getColumn("prefill_time_ms");
    if (prefillCol) {
        if (prefillTimeCheck) {
            prefillCol.show();
        } else {
            prefillCol.hide();
        }
    }
    
    const decodeCol = table.getColumn("decode_time_ms");
    if (decodeCol) {
        if (decodeTimeCheck) {
            decodeCol.show();
        } else {
            decodeCol.hide();
        }
    }
    
    const totalCol = table.getColumn("total_time_ms");
    if (totalCol) {
        if (totalTimeCheck) {
            totalCol.show();
        } else {
            totalCol.hide();
        }
    }
    
    const tokenCol = table.getColumn("tokens_per_second");
    if (tokenCol) {
        if (tokenPerSecondCheck) {
            tokenCol.show();
        } else {
            tokenCol.hide();
        }
    }
    
    // 重新调整表格布局以填充宽度
    setTimeout(() => {
        if (table) {
            table.redraw();
        }
    }, 0);
}

/**
 * 更新表格数据
 * @param {array} data - 新数据
 */
function updateTableData(data) {
    if (!table) return;
    
    table.setData(data);
}

/**
 * 更新统计信息
 * @param {array} data - 当前数据
 */
function updateStatistics(data) {
    const stats = calculateStatistics(data);
    
    // 更新统计信息显示
    document.getElementById('totalTests').textContent = stats.totalTests;
    document.getElementById('avgPrefillTime').textContent = formatTime(stats.avgPrefillTime);
    document.getElementById('avgDecodeTime').textContent = formatTime(stats.avgDecodeTime);
    document.getElementById('avgTokenPerSecond').textContent = formatNumber(stats.avgTokenPerSecond);
}

/**
 * 更新筛选下拉框
 * @param {array} data - 当前数据
 */
function updateFilterDropdowns(data) {
    const modelNames = getUniqueModelNames(data);
    const frameworks = getUniqueFrameworks(data);
    
    updateModelFilter(modelNames);
    updateFrameworkFilter(frameworks);
}

/**
 * 处理数据
 * @param {object} data - 原始数据
 */
function processData(data) {
    try {
        // 处理基准测试数据
        rawData = processBenchmarkData(data);
        currentData = [...rawData];
        
        // 更新表格数据
        updateTableData(currentData);
        
        // 更新统计信息
        updateStatistics(currentData);
        
        // 更新筛选下拉框
        updateFilterDropdowns(currentData);
        
        // 更新图表
        updateCharts(currentData);
        
        console.log('数据处理完成，共加载', rawData.length, '条记录');
    } catch (error) {
        console.error('数据处理失败:', error);
        alert('数据处理失败: ' + error.message);
    }
}

/**
 * 页面加载完成后初始化应用程序
 */
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

// 导出函数（如果在模块环境中）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initApp,
        initTable,
        bindEventListeners,
        handleLoadData,
        handleLoadSampleData,
        handleExportData,
        handleCompareData,
        handleResetFilters,
        handleFilterChange,
        handleSliderChange,
        handleMetricChange,
        handleTableSearch,
        applyCurrentFilters,
        updateTableColumns,
        updateTableData,
        updateStatistics,
        updateFilterDropdowns,
        processData
    };
}