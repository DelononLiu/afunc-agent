#include <stdint.h>
#include "../include/unified_api.h"
#include "../include/export/api.h"

// 32位整数加法特化实现
template<>
int32_t unified_add<int32_t>(int32_t a, int32_t b) {
    return fa_addi(a, b);
}

// 单精度浮点数加法特化实现
template<>
float unified_add<float>(float a, float b) {
    return fa_addf(a, b);
}