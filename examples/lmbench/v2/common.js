/**
 * 通用工具函数模块
 */

class CommonUtils {
    /**
     * 格式化数字，保留指定小数位数
     * @param {number} value - 要格式化的数值
     * @param {number} decimals - 保留的小数位数，默认为2
     * @returns {string} 格式化后的字符串
     */
    static formatNumber(value, decimals = 2) {
        if (value === null || value === undefined || isNaN(value)) {
            return 'N/A';
        }
        return parseFloat(value).toFixed(decimals);
    }
    
    /**
     * 格式化时间戳为本地时间字符串
     * @param {string} timestamp - ISO格式的时间戳
     * @returns {string} 格式化后的时间字符串
     */
    static formatTimestamp(timestamp) {
        if (!timestamp) return 'N/A';
        const date = new Date(timestamp);
        return date.toLocaleString('zh-CN');
    }
    
    /**
     * 计算数组平均值
     * @param {Array} array - 数值数组
     * @returns {number} 平均值
     */
    static calculateAverage(array) {
        if (!array || array.length === 0) return 0;
        const sum = array.reduce((acc, val) => acc + val, 0);
        return sum / array.length;
    }
    
    /**
     * 获取数组中的最大值
     * @param {Array} array - 数值数组
     * @returns {number} 最大值
     */
    static getMaxValue(array) {
        if (!array || array.length === 0) return 0;
        return Math.max(...array);
    }
    
    /**
     * 获取数组中的最小值
     * @param {Array} array - 数值数组
     * @returns {number} 最小值
     */
    static getMinValue(array) {
        if (!array || array.length === 0) return 0;
        return Math.min(...array);
    }
    
    /**
     * 深拷贝对象
     * @param {Object} obj - 要拷贝的对象
     * @returns {Object} 拷贝后的对象
     */
    static deepClone(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        
        if (obj instanceof Date) {
            return new Date(obj.getTime());
        }
        
        if (obj instanceof Array) {
            return obj.map(item => CommonUtils.deepClone(item));
        }
        
        if (typeof obj === 'object') {
            const clonedObj = {};
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    clonedObj[key] = CommonUtils.deepClone(obj[key]);
                }
            }
            return clonedObj;
        }
    }
    
    /**
     * 防抖函数
     * @param {Function} func - 要防抖的函数
     * @param {number} delay - 延迟时间（毫秒）
     * @returns {Function} 防抖后的函数
     */
    static debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }
    
    /**
     * 节流函数
     * @param {Function} func - 要节流的函数
     * @param {number} delay - 节流时间（毫秒）
     * @returns {Function} 节流后的函数
     */
    static throttle(func, delay) {
        let lastCall = 0;
        return function (...args) {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                func.apply(this, args);
            }
        };
    }
    
    /**
     * 生成随机颜色
     * @returns {string} 随机颜色值
     */
    static getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    /**
     * 生成颜色数组
     * @param {number} count - 颜色数量
     * @returns {Array} 颜色数组
     */
    static generateColors(count) {
        const colors = [];
        for (let i = 0; i < count; i++) {
            colors.push(CommonUtils.getRandomColor());
        }
        return colors;
    }
}

// 导出CommonUtils类
window.CommonUtils = CommonUtils;