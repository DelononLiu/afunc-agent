# Architecture - add算子

## 模块划分
- src/add.c：加法功能实现
- include/operator.h：接口声明
- tests/test_add.c：单元测试
- Makefile：构建脚本
- README.md：使用说明

## 接口定义
```c
// 整数加法
int add_int(int a, int b);

// 浮点数加法
float add_float(float a, float b);
```

## 依赖关系
- 外部依赖：无
- 内部依赖：标准数学库

## 构建方式
- 构建工具：Make
- 构建输出：静态库liboperator.a
- 构建目标：
  - all：构建库和测试
  - lib：仅构建静态库
  - test：构建并运行测试
  - clean：清理构建产物

## 测试框架
- 使用assert作为测试工具
- 测试用例覆盖：
  - 正常情况测试
  - 边界条件测试
  - 错误情况测试