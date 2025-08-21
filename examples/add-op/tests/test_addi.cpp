#include <gtest/gtest.h>
#include "add.h"

// 测试正常值加法
TEST(AddiTest, PositiveNumbers) {
    EXPECT_EQ(addi(2, 3), 5);
    EXPECT_EQ(addi(10, 20), 30);
    EXPECT_EQ(addi(100, 200), 300);
}

// 测试负数加法
TEST(AddiTest, NegativeNumbers) {
    EXPECT_EQ(addi(-2, -3), -5);
    EXPECT_EQ(addi(-10, -20), -30);
    EXPECT_EQ(addi(-100, -200), -300);
}

// 测试正负数混合加法
TEST(AddiTest, MixedNumbers) {
    EXPECT_EQ(addi(5, -3), 2);
    EXPECT_EQ(addi(-5, 3), -2);
    EXPECT_EQ(addi(10, -20), -10);
    EXPECT_EQ(addi(-10, 20), 10);
}

// 测试零值加法
TEST(AddiTest, ZeroValues) {
    EXPECT_EQ(addi(0, 0), 0);
    EXPECT_EQ(addi(5, 0), 5);
    EXPECT_EQ(addi(0, 5), 5);
    EXPECT_EQ(addi(-5, 0), -5);
    EXPECT_EQ(addi(0, -5), -5);
}

// 测试边界值
TEST(AddiTest, BoundaryValues) {
    EXPECT_EQ(addi(INT32_MAX, 0), INT32_MAX);
    EXPECT_EQ(addi(0, INT32_MAX), INT32_MAX);
    EXPECT_EQ(addi(INT32_MIN, 0), INT32_MIN);
    EXPECT_EQ(addi(0, INT32_MIN), INT32_MIN);
    EXPECT_EQ(addi(INT32_MAX, INT32_MIN), -1);
    EXPECT_EQ(addi(INT32_MIN, INT32_MAX), -1);
}

// 测试大数加法
TEST(AddiTest, LargeNumbers) {
    EXPECT_EQ(addi(1000000, 2000000), 3000000);
    EXPECT_EQ(addi(-1000000, -2000000), -3000000);
    EXPECT_EQ(addi(1000000, -2000000), -1000000);
    EXPECT_EQ(addi(-1000000, 2000000), 1000000);
}

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}