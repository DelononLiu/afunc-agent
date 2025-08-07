#include "add.h"
#include <assert.h>
#include <stdint.h>
#include <stdio.h>

void test_addi_positive_numbers() {
    assert(addi(1, 2) == 3);
    assert(addi(100, 200) == 300);
}

void test_addi_negative_numbers() {
    assert(addi(-1, -2) == -3);
    assert(addi(-100, -200) == -300);
}

void test_addi_boundary_values() {
    assert(addi(INT32_MAX, 0) == INT32_MAX);
    assert(addi(INT32_MIN, 0) == INT32_MIN);
    // 注意：INT32_MAX + 1 是未定义行为，暂不测试
}

void test_addi_zero() {
    assert(addi(0, 0) == 0);
    assert(addi(5, 0) == 5);
    assert(addi(0, -5) == -5);
}

int main() {
    test_addi_positive_numbers();
    test_addi_negative_numbers();
    test_addi_boundary_values();
    test_addi_zero();

    printf("All test_addi tests passed!\n");
    return 0;
}