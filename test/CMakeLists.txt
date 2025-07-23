# 添加测试源文件
add_executable(test_add test_add.c)

# 链接静态库
target_link_libraries(test_add funcagent)

# 包含头文件路径
target_include_directories(test_add PRIVATE ${CMAKE_SOURCE_DIR}/include)