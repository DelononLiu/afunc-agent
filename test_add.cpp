#define DOCTEST_CONFIG_IMPLEMENT_WITH_MAIN
#include "doctest.h"
#include <climits>
#include "add.h"

TEST_CASE("Test add function") {
    CHECK(add(1, 2) == 3);
    CHECK(add(-1, 1) == 0);
    CHECK(add(0, 0) == 0);
    CHECK(add(INT_MAX, 1) == INT_MIN);
    CHECK(add(INT_MIN, -1) == INT_MAX);
}