#ifndef UNIFIED_API_H
#define UNIFIED_API_H

#include <cstdint>
#include <type_traits>

// 前向声明
int32_t addi(int32_t a, int32_t b);
float addf(float a, float b);

/**
 * @brief 统一加法API模板
 * 
 * @tparam T 数值类型（int32_t 或 float）
 * @param a 第一个操作数
 * @param b 第二个操作数
 * @return T 两个操作数的和
 */
template <typename T>
T unified_add(T a, T b);

// int32_t 类型的特化
template <>
int32_t unified_add<int32_t>(int32_t a, int32_t b);

// float 类型的特化
template <>
float unified_add<float>(float a, float b);

// 编译时类型检查
template <typename T>
struct is_supported_type : std::false_type {};

template <>
struct is_supported_type<int32_t> : std::true_type {};

template <>
struct is_supported_type<float> : std::true_type {};

// 静态断言确保只使用支持的类型
template <typename T>
using check_supported_type = typename std::enable_if<is_supported_type<T>::value, T>::type;

#endif // UNIFIED_API_H