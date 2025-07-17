# C++项目通用规范

## 目录结构
- `include/` - 头文件目录
- `src/` - 实现文件目录  
- `tests/` - 测试文件目录

## 文件命名
- 头文件: `[name].h`
- 实现文件: `[name].cpp`
- 测试文件: `test_[name].cpp`

## 头文件包含规范
1. **基本原则**
   - 所有头文件必须使用引号形式包含：`#include "filename.h"`
   - 禁止使用相对路径包含头文件（如`#include "../include/filename.h"`）

2. **包含顺序**  
   - 系统头文件在前
   - 第三方库头文件居中
   - 项目头文件在后

3. **示例**
```cpp
// 正确
#include "add.h"

// 错误 
#include "../include/add.h"  // 禁止相对路径
#include <add.h>             // 禁止尖括号
```

## 测试框架要求(doctest)
```cpp
// 必须在其中一个测试文件中定义
#define DOCTEST_CONFIG_IMPLEMENT_WITH_MAIN
#include "doctest.h"  // 必须放在宏定义之后
```

## 编码规范
1. **异常处理**
   - 禁止使用C++异常

2. **整数运算安全**  
```cpp
// 禁止
INT_MAX + 1  
// 正确做法  
static_cast<long long>(INT_MAX) + 1
```

## 构建系统
- 使用Make构建系统
- 必须设置头文件搜索路径：`CPPFLAGS += -Iinclude`