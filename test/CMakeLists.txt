# 添加可执行文件
add_executable(test_add test_add.c)

# 链接静态库
target_link_libraries(test_add PRIVATE funcagent)

# 设置可执行文件安装路径
install(TARGETS test_add
        RUNTIME DESTINATION bin)