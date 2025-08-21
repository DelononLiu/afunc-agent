#include "unified_api.h"
#include "add.h"

// int32_t 类型的特化实现
template <>
int32_t unified_add<int32_t>(int32_t a, int32_t b) {
    return addi(a, b);
}

// float 类型的特化实现
template <>
float unified_add<float>(float a, float b) {
    return addf(a, b);
}