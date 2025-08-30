#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI圆桌会多 Agent 服务测试脚本
此脚本用于测试 multiagent.py 服务的启动、健康检查和 API 端点功能。
"""

import os
import sys
import time
import subprocess
import requests
import json
import signal
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

# 配置
SERVICE_FILE = "multiagent.py"
SERVICE_PORT = 8000
HEALTH_ENDPOINT = "/health"
TEST_ENDPOINT = "/v1/chat/completions"
TEST_PAYLOAD = {
    "model": "gpt-3.5-turbo",
    "messages": [
        {"role": "user", "content": "你好，请介绍一下AI圆桌会的功能"}
    ]
}

# 全局变量
service_process = None

def start_service():
    """启动服务"""
    global service_process
    print("正在启动服务...")
    
    # 构建启动命令
    cmd = [sys.executable, SERVICE_FILE]
    
    # 启动服务进程，传递环境变量
    env = os.environ.copy()
    service_process = subprocess.Popen(cmd, env=env, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    
    # 等待服务启动
    time.sleep(5)
    
    # 检查进程是否仍在运行
    if service_process.poll() is not None:
        stdout, stderr = service_process.communicate()
        print(f"服务启动失败: {stderr.decode()}")
        return False
    
    print("服务启动成功")
    return True

def health_check():
    """健康检查"""
    print("正在进行健康检查...")
    try:
        response = requests.get(f"http://localhost:{SERVICE_PORT}{HEALTH_ENDPOINT}", timeout=5)
        if response.status_code == 200:
            print("健康检查通过")
            return True
        else:
            print(f"健康检查失败，状态码: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"健康检查请求失败: {e}")
        return False

def test_api():
    """测试 API 端点"""
    print("正在测试 API 端点...")
    try:
        response = requests.post(
            f"http://localhost:{SERVICE_PORT}{TEST_ENDPOINT}",
            json=TEST_PAYLOAD,
            headers={"Content-Type": "application/json"},
            timeout=180
        )
        if response.status_code == 200:
            print("API 测试通过")
            print("响应内容:")
            print(json.dumps(response.json(), ensure_ascii=False, indent=2))
            return True
        else:
            print(f"API 测试失败，状态码: {response.status_code}")
            print("响应内容:")
            print(response.text)
            return False
    except requests.exceptions.RequestException as e:
        print(f"API 测试请求失败: {e}")
        return False

def stop_service():
    """停止服务"""
    global service_process
    if service_process and service_process.poll() is None:
        print("正在停止服务...")
        service_process.terminate()
        try:
            service_process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            service_process.kill()
        print("服务已停止")

def main():
    """主函数"""
    print("开始测试 AI圆桌会多 Agent 服务")
    
    try:
        # 启动服务
        if not start_service():
            return 1
        
        # 健康检查
        if not health_check():
            stop_service()
            return 1
        
        # 测试 API
        if not test_api():
            stop_service()
            return 1
        
        print("所有测试通过")
        return 0
    
    except Exception as e:
        print(f"测试过程中发生错误: {e}")
        return 1
    
    finally:
        # 确保服务被停止
        stop_service()

if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)