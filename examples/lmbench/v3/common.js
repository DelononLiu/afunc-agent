/**
 * 通用工具函数模块
 */

/**
 * 格式化数字，保留两位小数
 * @param {number} num - 要格式化的数字
 * @returns {string} 格式化后的字符串
 */
function formatNumber(num) {
    if (typeof num !== 'number') return '0.00';
    return num.toFixed(2);
}

/**
 * 格式化时间显示
 * @param {number} ms - 毫秒数
 * @returns {string} 格式化后的时间字符串
 */
function formatTime(ms) {
    if (typeof ms !== 'number') return '0 ms';
    return `${formatNumber(ms)} ms`;
}

/**
 * 检查对象是否为空
 * @param {object} obj - 要检查的对象
 * @returns {boolean} 是否为空
 */
function isEmpty(obj) {
    return obj === null || obj === undefined || Object.keys(obj).length === 0;
}

/**
 * 深拷贝对象
 * @param {object} obj - 要拷贝的对象
 * @returns {object} 拷贝后的对象
 */
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (obj instanceof Object) {
        const clonedObj = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    }
    return obj;
}

/**
 * 防抖函数
 * @param {function} func - 要防抖的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {function} 防抖后的函数
 */
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * 节流函数
 * @param {function} func - 要节流的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {function} 节流后的函数
 */
function throttle(func, delay) {
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
 * 生成随机ID
 * @returns {string} 随机ID
 */
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

/**
 * 获取元素
 * @param {string} selector - CSS选择器
 * @returns {Element|null} 元素或null
 */
function getElement(selector) {
    return document.querySelector(selector);
}

/**
 * 获取所有匹配元素
 * @param {string} selector - CSS选择器
 * @returns {NodeList} 元素列表
 */
function getAllElements(selector) {
    return document.querySelectorAll(selector);
}

/**
 * 添加事件监听器
 * @param {string} selector - CSS选择器
 * @param {string} event - 事件类型
 * @param {function} handler - 事件处理函数
 */
function addEventListener(selector, event, handler) {
    const element = getElement(selector);
    if (element) {
        element.addEventListener(event, handler);
    }
}

/**
 * 设置元素文本内容
 * @param {string} selector - CSS选择器
 * @param {string} text - 文本内容
 */
function setText(selector, text) {
    const element = getElement(selector);
    if (element) {
        element.textContent = text;
    }
}

/**
 * 设置元素HTML内容
 * @param {string} selector - CSS选择器
 * @param {string} html - HTML内容
 */
function setHTML(selector, html) {
    const element = getElement(selector);
    if (element) {
        element.innerHTML = html;
    }
}

/**
 * 显示元素
 * @param {string} selector - CSS选择器
 */
function showElement(selector) {
    const element = getElement(selector);
    if (element) {
        element.classList.remove('hidden');
    }
}

/**
 * 隐藏元素
 * @param {string} selector - CSS选择器
 */
function hideElement(selector) {
    const element = getElement(selector);
    if (element) {
        element.classList.add('hidden');
    }
}

/**
 * 切换元素显示状态
 * @param {string} selector - CSS选择器
 */
function toggleElement(selector) {
    const element = getElement(selector);
    if (element) {
        element.classList.toggle('hidden');
    }
}

// 导出函数（如果在模块环境中）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatNumber,
        formatTime,
        isEmpty,
        deepClone,
        debounce,
        throttle,
        generateId,
        getElement,
        getAllElements,
        addEventListener,
        setText,
        setHTML,
        showElement,
        hideElement,
        toggleElement
    };
}