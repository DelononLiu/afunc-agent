#include <assert.h>
#include "../include/add.h"

void test_add_positive_numbers() {
    assert(add(2, 3) == 5);
    assert(add(10, 20) == 30);
}

void test_add_negative_numbers() {
    assert(add(-1, -1) == -2);
    assert(add(-5, -3) == -8);
}

void test_add_mixed_numbers() {
    assert(add(-1, 1) == 0);
    assert(add(10, -5) == 5);
}

void test_add_with_zero() {
    assert(add(0, 0) == 0);
    assert(add(0, 5) == 5);
    assert(add(-3, 0) == -3);
}

int main() {
    test_add_positive_numbers();
    test_add_negative_numbers();
    test_add_mixed_numbers();
    test_add_with_zero();
    return 0;
}