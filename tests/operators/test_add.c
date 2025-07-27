#include <assert.h>
#include <limits.h>
#include <float.h>
#include "operators/add.h"

void test_add_int_normal() {
    assert(add_int(2, 3) == 5);
    assert(add_int(-5, 10) == 5);
    assert(add_int(0, 0) == 0);
}

void test_add_int_boundary() {
    assert(add_int(INT_MAX, 0) == INT_MAX);
    assert(add_int(INT_MIN, 0) == INT_MIN);
    assert(add_int(INT_MAX, 1) == INT_MIN); // 测试溢出
}

void test_add_float_normal() {
    assert(add_float(2.5f, 3.5f) == 6.0f);
    assert(add_float(-1.5f, 1.5f) == 0.0f);
}

void test_add_float_boundary() {
    assert(add_float(FLT_MAX, 0.0f) == FLT_MAX);
    assert(add_float(FLT_MIN, 0.0f) == FLT_MIN);
}

int main() {
    test_add_int_normal();
    test_add_int_boundary();
    test_add_float_normal();
    test_add_float_boundary();
    return 0;
}