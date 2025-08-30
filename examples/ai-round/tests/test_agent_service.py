#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI圆桌会服务测试脚本
此脚本用于测试 agent.py 服务的启动、健康检查和 API 端点。
"""

import os
import sys
import time
import subprocess
import requests
from dotenv import load_dotenv

# 加载 .env 文件中的环境变量
load_dotenv()

# 配置
SERVICE_FILE = "/home/long2015/Code/afunc-agent/examples/ai-round/agent.py"
SERVICE_PORT = 8000
HEALTH_ENDPOINT = "/health"
TEST_ENDPOINT = "/v1/chat/completions"
TEST_PAYLOAD = {
    "model": "deepseek-chat",
    "messages": [{"role": "user", "content": "你好，请介绍一下你自己"}]
}

# 全局变量
service_process = None

def start_service():
    """启动服务"""
    global service_process
    print("正在启动服务...")
    
    # 构建命令
    command = [sys.executable, SERVICE_FILE]
    
    # 启动服务进程，传递环境变量
    try:
        service_process = subprocess.Popen(
            command,
            env=os.environ.copy(),  # 传递当前环境变量
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        print(f"服务进程已启动，PID: {service_process.pid}")
        return True
    except Exception as e:
        print(f"启动服务失败: {e}")
        return False

def wait_for_service(timeout=30):
    """等待服务启动并响应健康检查"""
    print("正在等待服务启动...")
    start_time = time.time()
    
    while time.time() - start_time < timeout:
        if service_process and service_process.poll() is not None:
            # 进程已退出
            stdout, stderr = service_process.communicate()
            print(f"服务进程已退出，退出码: {service_process.returncode}")
            print(f"标准输出: {stdout.decode()}")
            print(f"错误输出: {stderr.decode()}")
            return False
            
        try:
            response = requests.get(
                f"http://localhost:{SERVICE_PORT}{HEALTH_ENDPOINT}",
                timeout=5
            )
            if response.status_code == 200:
                print("服务已启动并响应健康检查")
                return True
        except requests.exceptions.RequestException:
            pass
            
        time.sleep(1)
        
    print(f"服务在 {timeout} 秒内未响应健康检查")
    return False

def health_check():
    """执行健康检查"""
    print("正在执行健康检查...")
    try:
        response = requests.get(
            f"http://localhost:{SERVICE_PORT}{HEALTH_ENDPOINT}",
            timeout=10
        )
        if response.status_code == 200:
            print("健康检查通过")
            return True
        else:
            print(f"健康检查失败，状态码: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"健康检查请求失败: {e}")
        return False

def test_api_endpoint():
    """测试 API 端点"""
    print("正在测试 API 端点...")
    try:
        response = requests.post(
            f"http://localhost:{SERVICE_PORT}{TEST_ENDPOINT}",
            json=TEST_PAYLOAD,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        if response.status_code == 200:
            print("API 端点测试通过")
            print(f"响应内容预览: {response.text[:200]}...")
            return True
        else:
            print(f"API 端点测试失败，状态码: {response.status_code}")
            print(f"响应内容: {response.text}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"API 端点测试请求失败: {e}")
        return False

def stop_service():
    """停止服务"""
    global service_process
    if service_process and service_process.poll() is None:
        print("正在停止服务...")
        service_process.terminate()
        try:
            service_process.wait(timeout=10)
            print("服务已停止")
        except subprocess.TimeoutExpired:
            service_process.kill()
            service_process.wait()
            print("服务已被强制终止")
    else:
        print("服务未运行或已停止")

def main():
    """主函数"""
    print("开始执行服务测试")
    
    # 启动服务
    if not start_service():
        print("无法启动服务，测试终止")
        return 1
        
    # 等待服务启动
    if not wait_for_service():
        print("服务未在预期时间内启动，测试终止")
        stop_service()
        return 1
    
    # 健康检查
    if not health_check():
        print("健康检查失败，测试终止")
        stop_service()
        return 1
        
    # 测试 API 端点
    if not test_api_endpoint():
        print("API 端点测试失败，测试终止")
        stop_service()
        return 1
        
    print("所有测试通过")
    stop_service()
    return 0

if __name__ == "__main__":
    sys.exit(main())