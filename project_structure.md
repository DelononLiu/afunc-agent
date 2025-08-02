# 项目结构分析

## 关键配置文件
- Makefile (项目根目录)
- 未找到 CMakeLists.txt

## 源代码目录
- src/
  - addf.cpp
  - addi.cpp 
  - unified_api.cpp
- include/
  - add.h
  - unified_api.h
  - export/
    - api.h
- tests/
  - test_addf.cpp
  - test_addi.cpp

## 构建目录
- build/
  - CMake 缓存和临时文件
  - 编译输出: libadd.a, test_addf, test_addi