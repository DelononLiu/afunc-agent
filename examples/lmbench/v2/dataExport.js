/**
 * 数据导出模块
 */

class DataExport {
    /**
     * 导出数据为CSV格式
     */
    exportToCSV() {
        if (!window.dataHandler) {
            console.error('数据处理器未初始化');
            alert('数据处理器未初始化');
            return;
        }
        
        const exportData = window.dataHandler.getExportData();
        
        if (!exportData || exportData.length === 0) {
            alert('没有数据可导出');
            return;
        }
        
        // 转换为CSV格式
        const csvContent = this.convertToCSV(exportData);
        
        // 创建下载链接
        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        link.setAttribute('href', url);
        link.setAttribute('download', `benchmark_data_${timestamp}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    /**
     * 将数据转换为CSV格式
     * @param {Array} data - 要转换的数据
     * @returns {string} CSV格式的字符串
     */
    convertToCSV(data) {
        if (!data || data.length === 0) return '';
        
        return data.map(row => {
            return row.map(field => {
                // 如果字段包含逗号、双引号或换行符，需要用双引号包围并转义双引号
                if (typeof field === 'string' && (field.includes(',') || field.includes('"') || field.includes('\n'))) {
                    return `"${field.replace(/"/g, '""')}"`;
                }
                return field;
            }).join(',');
        }).join('\n');
    }
    
    /**
     * 导出数据为JSON格式
     */
    exportToJSON() {
        if (!window.dataHandler) {
            console.error('数据处理器未初始化');
            alert('数据处理器未初始化');
            return;
        }
        
        const exportData = window.dataHandler.getExportData();
        
        if (!exportData || exportData.length === 0) {
            alert('没有数据可导出');
            return;
        }
        
        // 转换为对象数组格式
        const headers = exportData[0];
        const rows = exportData.slice(1);
        const jsonData = rows.map(row => {
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = row[index];
            });
            return obj;
        });
        
        // 创建JSON字符串
        const jsonString = JSON.stringify(jsonData, null, 2);
        
        // 创建下载链接
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        link.setAttribute('href', url);
        link.setAttribute('download', `benchmark_data_${timestamp}.json`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// 导出DataExport类
window.DataExport = DataExport;