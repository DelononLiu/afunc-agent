#define DOCTEST_CONFIG_IMPLEMENT_WITH_MAIN
#include "../include/doctest.h"
#include "../include/add.h"

TEST_CASE("Basic addition") {
    CHECK(add(1, 2) == 3);
    CHECK(add(0, 0) == 0);
    CHECK(add(-1, 1) == 0);
}

TEST_CASE("Edge cases") {
    CHECK(add(INT_MAX, 0) == INT_MAX);
    CHECK(add(INT_MIN, 0) == INT_MIN);
}