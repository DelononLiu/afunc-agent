cmake_minimum_required(VERSION 2.20)
project(func-add)

# 设置编译选项
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -Wextra")

# 包含目录
include_directories(include)

# 源文件
set(SRC_FILES 
    src/addi.cpp
    src/addf.cpp
)

# 创建静态库
add_library(add STATIC ${SRC_FILES})

# 测试程序
add_executable(test_addi tests/test_addi.cpp)
target_link_libraries(test_addi add)

add_executable(test_addf tests/test_addf.cpp)
target_link_libraries(test_addf add m)

# 添加测试
enable_testing()
add_test(NAME test_addi COMMAND test_addi)
add_test(NAME test_addf COMMAND test_addf)