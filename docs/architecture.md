# Architecture - add 函数 / 模块

## 模块划分
- `src/add.c`: 核心功能实现，包含 `add` 函数的实现代码。
- `include/add.h`: 接口声明，包含 `add` 函数的声明。
- `test/test_add.c`: 单元测试，包含对 `add` 函数的测试用例。
- `Makefile`: 构建脚本，使用 make 工具进行编译和测试。
- `README.md`: 使用说明，描述如何构建和运行测试。

## 接口定义
```c
// C 示例
int add(int a, int b);
```

## 依赖关系
- 外部依赖：无
- 内部依赖：无

## 构建方式
- 构建工具：Makefile
- 构建输出：静态库、动态库、可执行文件

## 测试框架
- 使用 `assert` 作为测试工具
- 不使用 catch2、CUnit、Check 等其他框架