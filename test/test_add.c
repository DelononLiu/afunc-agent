#include <assert.h>
#include "add.h"

int main() {
    // 正数+正数
    assert(add(2, 3) == 5);
    assert(add(100, 200) == 300);
    
    // 负数+负数
    assert(add(-1, -1) == -2);
    assert(add(-100, -200) == -300);
    
    // 正数+负数
    assert(add(-1, 1) == 0);
    assert(add(100, -50) == 50);
    
    // 零+零
    assert(add(0, 0) == 0);
    
    // 零+正数
    assert(add(0, 5) == 5);
    
    // 零+负数
    assert(add(0, -5) == -5);
    
    return 0;
}