cmake_minimum_required(VERSION 3.10)
project(func-add)

set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 设置编译选项
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -Wextra")

# 包含目录
include_directories(include)

# 库文件源文件
set(LIB_SOURCES
    src/addi.cpp
    src/addf.cpp
    src/unified_api.cpp
)

# 创建静态库
add_library(func-add STATIC ${LIB_SOURCES})

# 测试文件源文件
set(TEST_ADDF_SOURCE tests/test_addf.cpp)
set(TEST_ADDI_SOURCE tests/test_addi.cpp)

# 测试可执行文件
add_executable(test_addf ${TEST_ADDF_SOURCE})
target_link_libraries(test_addf func-add m)

add_executable(test_addi ${TEST_ADDI_SOURCE})
target_link_libraries(test_addi func-add)

# 添加测试
enable_testing()
add_test(NAME test_addf COMMAND test_addf)
add_test(NAME test_addi COMMAND test_addi)
