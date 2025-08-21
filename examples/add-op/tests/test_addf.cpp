#include <gtest/gtest.h>
#include "add.h"

// 测试正常值加法
TEST(AddfTest, PositiveNumbers) {
    EXPECT_FLOAT_EQ(addf(2.0f, 3.0f), 5.0f);
    EXPECT_FLOAT_EQ(addf(10.5f, 20.5f), 31.0f);
    EXPECT_FLOAT_EQ(addf(100.25f, 200.75f), 301.0f);
}

// 测试负数加法
TEST(AddfTest, NegativeNumbers) {
    EXPECT_FLOAT_EQ(addf(-2.0f, -3.0f), -5.0f);
    EXPECT_FLOAT_EQ(addf(-10.5f, -20.5f), -31.0f);
    EXPECT_FLOAT_EQ(addf(-100.25f, -200.75f), -301.0f);
}

// 测试正负数混合加法
TEST(AddfTest, MixedNumbers) {
    EXPECT_FLOAT_EQ(addf(5.0f, -3.0f), 2.0f);
    EXPECT_FLOAT_EQ(addf(-5.0f, 3.0f), -2.0f);
    EXPECT_FLOAT_EQ(addf(10.5f, -20.5f), -10.0f);
    EXPECT_FLOAT_EQ(addf(-10.5f, 20.5f), 10.0f);
}

// 测试零值加法
TEST(AddfTest, ZeroValues) {
    EXPECT_FLOAT_EQ(addf(0.0f, 0.0f), 0.0f);
    EXPECT_FLOAT_EQ(addf(5.0f, 0.0f), 5.0f);
    EXPECT_FLOAT_EQ(addf(0.0f, 5.0f), 5.0f);
    EXPECT_FLOAT_EQ(addf(-5.0f, 0.0f), -5.0f);
    EXPECT_FLOAT_EQ(addf(0.0f, -5.0f), -5.0f);
}

// 测试边界值
TEST(AddfTest, BoundaryValues) {
    EXPECT_FLOAT_EQ(addf(FLT_MAX, 0.0f), FLT_MAX);
    EXPECT_FLOAT_EQ(addf(0.0f, FLT_MAX), FLT_MAX);
    EXPECT_FLOAT_EQ(addf(FLT_MIN, 0.0f), FLT_MIN);
    EXPECT_FLOAT_EQ(addf(0.0f, FLT_MIN), FLT_MIN);
    EXPECT_FLOAT_EQ(addf(-FLT_MAX, FLT_MAX), 0.0f);
    EXPECT_FLOAT_EQ(addf(FLT_MAX, -FLT_MAX), 0.0f);
}

// 测试小数精度
TEST(AddfTest, Precision) {
    EXPECT_NEAR(addf(0.1f, 0.2f), 0.3f, 0.0001f);
    EXPECT_NEAR(addf(1.0f, 0.0001f), 1.0001f, 0.00001f);
    EXPECT_NEAR(addf(0.9999f, 0.0001f), 1.0f, 0.0001f);
}

// 测试大数加法
TEST(AddfTest, LargeNumbers) {
    EXPECT_FLOAT_EQ(addf(1000000.0f, 2000000.0f), 3000000.0f);
    EXPECT_FLOAT_EQ(addf(-1000000.0f, -2000000.0f), -3000000.0f);
    EXPECT_FLOAT_EQ(addf(1000000.0f, -2000000.0f), -1000000.0f);
    EXPECT_FLOAT_EQ(addf(-1000000.0f, 2000000.0f), 1000000.0f);
}

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}