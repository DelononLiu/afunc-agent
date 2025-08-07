# Architecture - add算子库

## 模块划分

- 核心模块：
  - src/addi.cpp：实现32位整数加法
  - src/addf.cpp：实现单精度浮点数加法
  - include/add.h：声明所有算子接口

- 测试模块：
  - tests/test_addi.cpp：整数加法单元测试
  - tests/test_addf.cpp：浮点数加法单元测试

- 构建与文档：
  - Makefile/CMakeLists.txt：构建脚本
  - README.md：使用说明文档

## 接口定义
```c
// 整数加法
int32_t addi(int32_t a, int32_t b);

// 浮点数加法  
float addf(float a, float b);
```

## 依赖关系
- 外部依赖：无
- 内部依赖：无

## 构建方式
- 构建工具：Make 或 CMake
- 构建产物：静态库libfunc-add.a
- Make 构建命令：
  - make：构建库和测试
  - make test：运行单元测试
  - make clean：清理构建文件
- CMake 构建命令：
  - mkdir build && cd build
  - cmake ..：生成构建系统
  - make：构建库和测试
  - ctest：运行单元测试
  - make clean：清理构建文件
