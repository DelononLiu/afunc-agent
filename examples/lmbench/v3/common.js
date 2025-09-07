/**
 * 通用工具函数模块
 */

/**
 * 格式化数字，保留指定小数位数
 * @param {number} value - 要格式化的数值
 * @param {number} decimals - 保留的小数位数
 * @returns {string} 格式化后的字符串
 */
function formatNumber(value, decimals = 2) {
    if (value === null || value === undefined) return 'N/A';
    return value.toFixed(decimals);
}

/**
 * 获取数组中的唯一值
 * @param {Array} array - 输入数组
 * @returns {Array} 去重后的数组
 */
function getUniqueValues(array) {
    return [...new Set(array)];
}

/**
 * 根据条件过滤数组
 * @param {Array} array - 要过滤的数组
 * @param {Function} predicate - 过滤条件函数
 * @returns {Array} 过滤后的数组
 */
function filterArray(array, predicate) {
    return array.filter(predicate);
}

/**
 * 计算数组的平均值
 * @param {Array} array - 数值数组
 * @returns {number} 平均值
 */
function calculateAverage(array) {
    if (!array || array.length === 0) return 0;
    const sum = array.reduce((acc, val) => acc + val, 0);
    return sum / array.length;
}

/**
 * 检查字符串是否包含指定子串（不区分大小写）
 * @param {string} str - 要检查的字符串
 * @param {string} searchTerm - 搜索词
 * @returns {boolean} 是否包含
 */
function containsIgnoreCase(str, searchTerm) {
    if (!str || !searchTerm) return false;
    return str.toLowerCase().includes(searchTerm.toLowerCase());
}

/**
 * 防抖函数
 * @param {Function} func - 要防抖的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * 下载文件
 * @param {string} content - 文件内容
 * @param {string} filename - 文件名
 * @param {string} contentType - 内容类型
 */
function downloadFile(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * 解析JSON文件
 * @param {File} file - 要解析的文件
 * @returns {Promise} 解析结果的Promise
 */
function parseJSONFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                resolve(data);
            } catch (error) {
                reject(new Error('JSON格式错误: ' + error.message));
            }
        };
        reader.onerror = () => {
            reject(new Error('文件读取失败'));
        };
        reader.readAsText(file);
    });
}

// 导出所有函数
window.CommonUtils = {
    formatNumber,
    getUniqueValues,
    filterArray,
    calculateAverage,
    containsIgnoreCase,
    debounce,
    downloadFile,
    parseJSONFile
};