# Func-Add Library

一个简单高效的加法运算库，提供整数和浮点数的加法功能。

## 项目概述

Func-Add 是一个用 C++ 实现的轻量级数学运算库，专注于提供高效的加法运算功能。该库支持整数和浮点数的加法运算，并提供了统一的 API 接口，方便开发者使用。

## 功能特性

- **整数加法**：提供 32 位整数的加法运算功能
- **浮点数加法**：提供单精度浮点数的加法运算功能
- **统一 API**：通过模板函数提供统一的接口，支持多种数据类型
- **C 语言兼容**：提供 C 语言接口，方便与其他语言集成
- **跨平台支持**：使用 CMake 构建系统，支持多种操作系统和编译器
- **单元测试**：包含完整的单元测试，确保功能的正确性

## 构建和使用指南

### 系统要求

- CMake 3.10 或更高版本
- C++11 兼容的编译器（如 GCC、Clang、MSVC）
- GTest 测试框架（如果系统未安装，构建时会自动下载）

### 构建步骤

1. 克隆项目到本地：
   ```bash
   git clone <repository-url>
   cd func-add
   ```

2. 创建构建目录：
   ```bash
   mkdir build
   cd build
   ```

3. 运行 CMake 配置项目：
   ```bash
   cmake ..
   ```

4. 编译项目：
   ```bash
   make
   ```

### 运行测试

在构建目录中运行以下命令执行单元测试：

```bash
ctest --output-on-failure
```

或者直接运行测试可执行文件：

```bash
./test_addi
./test_addf
```

### 使用库

#### C++ 使用示例

```cpp
#include <iostream>
#include "add.h"
#include "unified_api.h"

int main() {
    // 使用基本接口
    int32_t int_result = addi(5, 3);
    std::cout << "5 + 3 = " << int_result << std::endl;
    
    float float_result = addf(2.5f, 3.7f);
    std::cout << "2.5 + 3.7 = " << float_result << std::endl;
    
    // 使用统一接口
    int32_t unified_int_result = unified_add<int32_t>(10, 20);
    std::cout << "10 + 20 = " << unified_int_result << std::endl;
    
    float unified_float_result = unified_add<float>(1.5f, 2.5f);
    std::cout << "1.5 + 2.5 = " << unified_float_result << std::endl;
    
    return 0;
}
```

#### C 语言使用示例

```c
#include <stdio.h>
#include "export/api.h"

int main() {
    // 使用 C 语言接口
    int32_t int_result = fa_addi(5, 3);
    printf("5 + 3 = %d\n", int_result);
    
    float float_result = fa_addf(2.5f, 3.7f);
    printf("2.5 + 3.7 = %f\n", float_result);
    
    return 0;
}
```

### 链接静态库

在您的 CMake 项目中使用此库：

```cmake
# 添加 func-add 库
add_subdirectory(path/to/func-add)

# 链接到您的目标
target_link_libraries(your_target PRIVATE func-add)
```

或者使用已构建的静态库：

```cmake
# 包含头文件目录
include_directories(path/to/func-add/include)

# 链接静态库
target_link_libraries(your_target PRIVATE path/to/func-add/build/libfunc-add.a)
```

## API 参考

### C++ 接口

#### 基本接口

- `int32_t addi(int32_t a, int32_t b)`：整数加法
- `float addf(float a, float b)`：浮点数加法

#### 统一接口

- `template<typename T> T unified_add(T a, T b)`：统一加法接口，支持 int32_t 和 float 类型

### C 语言接口

- `int32_t fa_addi(int32_t a, int32_t b)`：整数加法
- `float fa_addf(float a, float b)`：浮点数加法

## 许可证

本项目采用 MIT 许可证。详情请参阅 LICENSE 文件。

## 贡献

欢迎提交问题和拉取请求。在贡献之前，请确保：

1. 代码符合项目的编码规范
2. 所有测试通过
3. 提供适当的文档和测试用例

## 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 Issue
- 发送邮件至：<email@example.com>