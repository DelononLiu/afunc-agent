#include "../include/add.h"
#include <cassert>
#include <iostream>

int main() {
    // 正数测试
    assert(add(2, 3) == 5);
    assert(add(10, 20) == 30);
    
    // 负数测试
    assert(add(-1, -1) == -2);
    assert(add(-5, -3) == -8);
    
    // 正负数混合测试
    assert(add(-1, 1) == 0);
    assert(add(5, -3) == 2);
    
    // 零值测试
    assert(add(0, 0) == 0);
    assert(add(0, 5) == 5);
    assert(add(-5, 0) == -5);
    
    std::cout << "All tests passed!" << std::endl;
    return 0;
}