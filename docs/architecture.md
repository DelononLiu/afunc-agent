# Architecture - add函数

## 模块划分
- src/add.c: 核心功能实现
- include/add.h: 接口声明
- test/test_add.c: 单元测试
- Makefile: 构建脚本
- README.md: 使用说明

## 接口定义
```c
// add.h
int add(int a, int b);
```

## 依赖关系
- 外部依赖：无
- 内部依赖：无

## 构建方式
- 构建工具：Make
- 构建输出：静态库和测试可执行文件

## 测试框架
- 使用assert作为测试工具
- 不使用任何外部测试框架
- 测试用例示例：
```c
#include <assert.h>
#include "add.h"

void test_add() {
    assert(add(2, 3) == 5);
    assert(add(-1, 1) == 0);
    assert(add(0, 0) == 0);
    assert(add(-5, -3) == -8);
}