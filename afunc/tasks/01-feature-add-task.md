# 任务名称：实现add算子功能

## 任务描述
实现add算子库的核心功能，包括整数加法(addi)和浮点数加法(addf)，遵循TDD流程完成开发。

## 父任务
/afunc/tasks/00-root-task.md

## 产物交付件
- include/add.h：算子接口声明
- src/addi.cpp：整数加法实现
- src/addf.cpp：浮点数加法实现  
- tests/test_addi.cpp：整数加法测试
- tests/test_addf.cpp：浮点数加法测试
- Makefile：构建脚本更新

## 任务 TODO List
- [ ] 调用 implement-cpp-function AFunc 实现 addi 函数（包含头文件声明、源文件实现和测试用例）
- [ ] 调用 implement-cpp-function AFunc 实现 addf 函数（包含头文件声明、源文件实现和测试用例）
- [ ] 调用 configure-build-system AFunc 更新 Makefile 支持新增文件的编译和测试

## 验证与反馈
### 自动化测试报告 (可选)
- 状态：全部通过
- 详细信息：
    - 整数加法测试：覆盖正数、负数、边界值(INT32_MAX/MIN)和零值测试
    - 浮点数加法测试：覆盖常规值、边界值(FLT_MAX/MIN)、特殊值(NaN, INFINITY)和零值测试
    - 构建系统：Makefile支持完整编译、测试和清理流程

### 人工审查意见 (可选)
- 状态：通过
- 详细描述：编译测试正常，测试通过，TODO List更新有偏差
