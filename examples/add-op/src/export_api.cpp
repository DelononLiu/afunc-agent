#include "export/api.h"
#include "add.h"

// 导出的整数加法函数实现
int32_t fa_addi(int32_t a, int32_t b) {
    return addi(a, b);
}

// 导出的浮点数加法函数实现
float fa_addf(float a, float b) {
    return addf(a, b);
}