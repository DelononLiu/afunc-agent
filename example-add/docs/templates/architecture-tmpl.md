# Architecture - 函数名 / 模块名

## 模块划分

- 核心模块：描述主要的逻辑单元和它们的功能。
  - 例如：src/ 用于核心功能实现。
  - 例如：include/ 用于接口声明。
- 测试模块：描述测试代码的组织方式。
  - 例如：tests/ 用于单元测试。
- 构建与文档：描述项目构建和文档相关的组织。
  - 例如：Makefile 或 CMakeLists.txt 用于构建脚本。
  - 例如：README.md 提供使用说明。
- 说明：详细的目录结构和文件命名规范请参考 docs/cpp-project-standards.md。

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
- 构建工具选择：明确项目使用的主要构建工具（如 Make、CMake、setup.py 等）。
- 构建产物：描述构建过程会生成哪些类型的产物（如静态库、动态库、可执行文件、模块包等）。
- 说明：具体的构建配置和命令请参考 docs/cpp-project-standards.md。
