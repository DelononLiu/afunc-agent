#include "add.h"
#include <assert.h>
#include <float.h>
#include <math.h>
#include <stdio.h>

void test_addf_positive_numbers() {
    float result = addf(1.5f, 2.5f);
    assert(fabs(result - 4.0f) < FLT_EPSILON);
    
    result = addf(0.1f, 0.2f);
    assert(fabs(result - 0.3f) < FLT_EPSILON);
}

void test_addf_negative_numbers() {
    float result = addf(-1.5f, -2.5f);
    assert(fabs(result - (-4.0f)) < FLT_EPSILON);
}

void test_addf_boundary_values() {
    float result = addf(FLT_MAX, 0.0f);
    assert(fabs(result - FLT_MAX) < FLT_EPSILON);
    
    result = addf(FLT_MIN, 0.0f);
    assert(fabs(result - FLT_MIN) < FLT_EPSILON);
}

void test_addf_special_values() {
    assert(isnan(addf(NAN, 1.0f)));
    assert(isinf(addf(INFINITY, 1.0f)));
    
    float result = addf(0.0f, 0.0f);
    assert(fabs(result) < FLT_EPSILON);
}

int main() {
    test_addf_positive_numbers();
    test_addf_negative_numbers();
    test_addf_boundary_values();
    test_addf_special_values();

    printf("All test_addf tests passed!\n");
    return 0;
}