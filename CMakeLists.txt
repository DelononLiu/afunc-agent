cmake_minimum_required(VERSION 2.20)
project(func-add)

# 设置编译选项
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -Wextra")

# 包含头文件目录
include_directories(include)

# 添加静态库
add_library(add STATIC src/addi.cpp src/addf.cpp src/unified_api.cpp)

# 添加测试程序
add_executable(test_addi tests/test_addi.cpp)
target_link_libraries(test_addi add)

add_executable(test_addf tests/test_addf.cpp)
target_link_libraries(test_addf add m)  # 链接数学库

# 添加测试目标
enable_testing()
add_test(NAME test_addi COMMAND test_addi)
add_test(NAME test_addf COMMAND test_addf)