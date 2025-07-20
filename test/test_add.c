#include "add.h"
#include <assert.h>
#include <limits.h>

void test_add_positive_numbers() {
    assert(add(3, 5) == 8);
}

void test_add_negative_and_positive() {
    assert(add(-2, 4) == 2);
}

void test_add_zero_and_zero() {
    assert(add(0, 0) == 0);
}

void test_add_minimum_value() {
    assert(add(INT_MIN, 0) == INT_MIN);
}

void test_add_maximum_value() {
    assert(add(INT_MAX, 0) == INT_MAX);
}

void test_add_negative_numbers() {
    assert(add(-10, -5) == -15);
}

int main() {
    test_add_positive_numbers();
    test_add_negative_and_positive();
    test_add_zero_and_zero();
    test_add_minimum_value();
    test_add_maximum_value();
    test_add_negative_numbers();
    return 0;
}