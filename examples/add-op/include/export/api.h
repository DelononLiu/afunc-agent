#ifndef FUNC_ADD_EXPORT_API_H
#define FUNC_ADD_EXPORT_API_H

#include <cstdint>

#ifdef __cplusplus
extern "C" {
#endif

/**
 * @brief 导出的整数加法函数
 * 
 * @param a 第一个整数
 * @param b 第二个整数
 * @return int32_t 两个整数的和
 */
int32_t fa_addi(int32_t a, int32_t b);

/**
 * @brief 导出的浮点数加法函数
 * 
 * @param a 第一个浮点数
 * @param b 第二个浮点数
 * @return float 两个浮点数的和
 */
float fa_addf(float a, float b);

#ifdef __cplusplus
}
#endif

#endif // FUNC_ADD_EXPORT_API_H