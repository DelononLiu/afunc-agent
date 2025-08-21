cmake_minimum_required(VERSION 3.10)

# 项目名称
project(func-add VERSION 0.1.0 LANGUAGES CXX)

# 设置 C++ 标准
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 添加头文件包含目录
include_directories(include)

# 收集源文件
set(LIB_SOURCES
    src/addi.cpp
    src/addf.cpp
    src/unified_api.cpp
    src/export_api.cpp
)

# 创建静态库
add_library(func-add STATIC ${LIB_SOURCES})

# 收集测试源文件
set(TEST_SOURCES
    tests/test_addi.cpp
    tests/test_addf.cpp
)

# 启用测试
enable_testing()

# 查找 GTest 包
find_package(GTest QUIET)
if(NOT GTest_FOUND)
    # 如果找不到 GTest，尝试使用 FetchContent 下载
    include(FetchContent)
    FetchContent_Declare(
        googletest
        URL https://github.com/google/googletest/archive/refs/tags/v1.13.0.zip
    )
    # 对于旧版本 CMake，可能需要手动设置变量
    set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
    FetchContent_MakeAvailable(googletest)
    include_directories(${googletest_SOURCE_DIR}/include ${googletest_SOURCE_DIR}/googlemock/include)
else()
    include_directories(${GTEST_INCLUDE_DIRS})
endif()

# 创建测试可执行文件
add_executable(test_addi tests/test_addi.cpp)
if(GTest_FOUND)
    target_link_libraries(test_addi func-add ${GTEST_LIBRARIES} pthread)
else()
    target_link_libraries(test_addi func-add gtest gtest_main pthread)
endif()

add_executable(test_addf tests/test_addf.cpp)
if(GTest_FOUND)
    target_link_libraries(test_addf func-add ${GTEST_LIBRARIES} pthread)
else()
    target_link_libraries(test_addf func-add gtest gtest_main pthread)
endif()

# 添加测试到 CTest
add_test(NAME test_addi COMMAND test_addi)
add_test(NAME test_addf COMMAND test_addf)

# 设置编译选项
if(CMAKE_CXX_COMPILER_ID STREQUAL "GNU" OR CMAKE_CXX_COMPILER_ID STREQUAL "Clang")
    target_compile_options(func-add PRIVATE -Wall -Wextra)
    target_compile_options(test_addi PRIVATE -Wall -Wextra)
    target_compile_options(test_addf PRIVATE -Wall -Wextra)
endif()

# 设置 MSVC 编译选项
if(MSVC)
    target_compile_options(func-add PRIVATE /W4)
    target_compile_options(test_addi PRIVATE /W4)
    target_compile_options(test_addf PRIVATE /W4)
endif()