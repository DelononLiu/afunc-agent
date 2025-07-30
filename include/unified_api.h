#ifndef UNIFIED_API_H
#define UNIFIED_API_H

#include <stdint.h>

/**
 * @brief 统一加法接口
 * 
 * 提供统一的加法操作，自动根据输入参数类型选择适当的底层实现
 * 
 * @param a 第一个操作数
 * @param b 第二个操作数
 * @return 返回计算结果
 */
template<typename T>
T unified_add(T a, T b) {
    static_assert(sizeof(T) == 0, "This function must be explicitly specialized");
}

// 显式特化声明
template<> int32_t unified_add<int32_t>(int32_t, int32_t);
template<> float unified_add<float>(float, float);

#endif // UNIFIED_API_H