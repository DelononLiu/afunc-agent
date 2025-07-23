#include <assert.h>
#include "add.h"

void test_add() {
    // Test cases
    assert(add(3, 5) == 8);
    assert(add(-3, 5) == 2);
    assert(add(0, 0) == 0);
    assert(add(-3, -5) == -8);
    assert(add(100, -100) == 0);
    assert(add(-100, 100) == 0);
    assert(add(0, 5) == 5);
    assert(add(5, 0) == 5);
}

int main() {
    test_add();
    return 0;
}