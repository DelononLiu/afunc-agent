# Add 算子库

> **注意：本 README 文档描述的是由 Func Agent AI 生成的 C 语言算子库。如需了解 Func Agent AI 项目（即本 AI Agent 自身）的详细信息，请查阅 [AGENT_README.md](AGENT_README.md)。**


## 项目概述

本仓库包含一个轻量级的 C 语言算子库，当前版本主要提供加法运算功能。该库旨在为需要基本数学运算的嵌入式系统或高性能计算场景提供简洁、高效的接口。

## 功能特性

- **整数加法**: 提供 `addi` 函数，支持两个整数的加法运算。
- **浮点数加法**: 提供 `addf` 函数，支持两个浮点数的加法运算。
- **统一API接口**: 提供清晰、易于集成的函数接口。
- **单元测试**: 所有算子函数均附带单元测试，确保功能正确性。

## 快速开始

### 1、克隆仓库

```bash
git clone [你的仓库地址]
cd add-library
````

### 2、构建项目

本项目使用 CMake 构建系统。

```bash
mkdir build && cd build
cmake .. # 生成构建系统
make # 编译生成静态库 libadd.a
```

成功编译后，将在 build 目录生成 `libadd.a` 静态库文件。

### 3、运行测试

```bash
cd build
ctest # 运行所有单元测试
```

测试结果将直接在控制台输出。

### 4、集成到你的项目

将 `libadd.a` 静态库和 `include/add.h` 头文件包含到你的项目中。

**示例:**

假设你的项目文件 `main.c` 如下：

```c
#include "add.h" // 确保你的编译器头文件搜索路径包含 'include' 目录
#include <stdio.h>

int main() {
    int sum_int = addi(10, 20);
    float sum_float = addf(10.5f, 20.3f);

    printf("Integer sum: %d\n", sum_int);
    printf("Float sum: %.2f\n", sum_float);

    return 0;
}
```

编译你的项目时，需要链接 `libadd.a`：

```bash
gcc main.c -L. -ladd -o my_app # 假设 libadd.a 在当前目录
```

## 目录结构

```
.
├── include/            # 公共头文件目录
│   └── add.h           # add 算子库的公共接口
├── src/                # 源代码实现目录
│   ├── addi.c          # 整数加法实现
│   └── addf.c          # 浮点数加法实现
├── tests/              # 单元测试文件目录
│   ├── test_addi.cpp   # addi 单元测试
│   └── test_addf.cpp   # addf 单元测试
└── README.md           # 本说明文档
```

## 版本历史

查看 [CHANGELOG.md](CHANGELOG.md) 了解本算子库的详细版本变更信息。

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](https://www.google.com/search?q=LICENSE) 文件了解详情。
