#include <assert.h>
#include <limits.h>
#include <float.h>
#include "operators/operator.h"

void test_add_int_normal() {
    assert(add_int(2, 3) == 5);
    assert(add_int(-1, 1) == 0);
    assert(add_int(100, 200) == 300);
}

void test_add_int_boundary() {
    assert(add_int(INT_MAX, 0) == INT_MAX);
    assert(add_int(INT_MIN, 0) == INT_MIN);
    assert(add_int(INT_MAX, -1) == INT_MAX - 1);
}

void test_add_float_normal() {
    assert(add_float(1.5f, 2.5f) == 4.0f);
    assert(add_float(-1.0f, 1.0f) == 0.0f);
    assert(add_float(0.1f, 0.2f) == 0.3f);
}

void test_add_float_boundary() {
    assert(add_float(FLT_MAX, 0.0f) == FLT_MAX);
    assert(add_float(FLT_MIN, 0.0f) == FLT_MIN);
    assert(add_float(FLT_MAX, -FLT_MAX) == 0.0f);
}

int main() {
    test_add_int_normal();
    test_add_int_boundary();
    test_add_float_normal();
    test_add_float_boundary();
    return 0;
}