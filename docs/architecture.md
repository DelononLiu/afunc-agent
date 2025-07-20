# Architecture - add函数

## 模块划分
- src/add.cpp: 核心功能实现
- include/add.h: 接口声明
- tests/test_add.cpp: 单元测试
- Makefile: 构建脚本

## 接口定义
```c
// add.h 中定义的接口
int add(int a, int b);
```

## 依赖关系
- 外部依赖：无
- 内部依赖：无

## 构建方式
- 构建工具：Makefile
- 构建输出：可执行测试程序
- 测试执行：通过Makefile运行单元测试