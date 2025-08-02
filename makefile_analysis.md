# Makefile 解析报告

## 编译器配置
- 编译器: gcc
- 预处理选项: -Iinclude
- 编译选项: -Wall -Wextra

## 源文件
- src/addi.cpp
- src/addf.cpp

## 构建目标
### 主要目标
- all: 构建静态库 libadd.a
- test: 运行所有测试程序
- clean: 清理构建产物

### 库构建
- 目标文件: src/addi.o, src/addf.o
- 静态库: libadd.a (通过 ar 命令打包)

### 测试程序
- tests/test_addi: 依赖 tests/test_addi.cpp 和 src/addi.o
- tests/test_addf: 依赖 tests/test_addf.cpp 和 src/addf.o (额外链接数学库 -lm)

## 构建规则
- 通用规则: %.o: %.cpp
  ```makefile
  $(CC) $(CPPFLAGS) $(CFLAGS) -c $< -o $@
  ```
- 静态库规则:
  ```makefile
  ar rcs $@ $^