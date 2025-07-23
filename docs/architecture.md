# Architecture - add 函数

## 模块划分
- `src/add.c`: 核心功能实现
- `include/add.h`: 接口声明（C）
- `test/test_add.c`: 单元测试
- `Makefile`: 构建脚本
- `README.md`: 使用说明

## 接口定义
用 C 语言描述接口：
```c
// C 示例
int add(int a, int b);
```

## 依赖关系
- 外部依赖：无

## 构建方式
- 构建工具：Makefile
- 构建输出：可执行文件

## 测试框架
- 使用 assert 作为测试工具
- 不使用 catch2、CUnit、Check 等其他框架