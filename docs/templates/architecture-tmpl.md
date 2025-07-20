# Architecture - 函数名 / 模块名

## 模块划分
- src/xxx.c（或 .cpp/.py）: 核心功能实现
- include/xxx.h（或无）: 接口声明（C/C++）
- test/test_xxx.c（或 unittest）: 单元测试
- CMakeLists.txt / setup.py: 构建脚本
- README.md: 使用说明

## 接口定义
用语言原生语法描述接口，如：
```language
// C 示例
int add(int a, int b);

// C++ 示例
namespace math {
int add(int a, int b);
}

# Python 示例
def add(a: int, b: int) -> int:
    ...
```

## 依赖关系
- 外部依赖：如第三方库、系统库
- 内部依赖：如其他模块、工具函数

## 构建方式
- 构建工具：CMake、Makefile、setup.py等
- 构建输出：静态库、动态库、可执行文件、模块包等
