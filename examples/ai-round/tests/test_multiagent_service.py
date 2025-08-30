#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
多 Agent 服务测试脚本
此脚本用于测试 multiagent.py 服务的启动、健康检查和 API 端点。
"""

import os
import sys
import time
import subprocess
import requests
import json
import signal

# 服务配置
SERVICE_FILE = "multiagent.py"
SERVICE_PORT = 8000
HEALTH_ENDPOINT = "/health"
TEST_ENDPOINT = "/v1/chat/completions"
TEST_PAYLOAD = {
    "model": "deepseek-chat",
    "messages": [
        {"role": "user", "content": "你好，请介绍一下你自己"}
    ]
}

# 服务进程对象
service_process = None

def load_env():
    """加载 .env 文件中的环境变量"""
    env_file = ".env"
    if os.path.exists(env_file):
        with open(env_file, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#'):
                    key, value = line.split('=', 1)
                    os.environ[key] = value.strip()

def start_service():
    """启动服务"""
    global service_process
    print("正在启动服务...")
    
    # 加载环境变量
    load_env()
    
    # 构建服务启动命令
    command = [sys.executable, SERVICE_FILE]
    
    try:
        # 启动服务进程
        service_process = subprocess.Popen(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            preexec_fn=os.setsid  # 创建新的进程组
        )
        print(f"服务已启动，PID: {service_process.pid}")
        
        # 等待服务启动并响应健康检查
        start_time = time.time()
        while time.time() - start_time < 30:  # 最多等待30秒
            # 检查进程是否仍在运行
            if service_process.poll() is not None:
                stdout, stderr = service_process.communicate()
                print(f"服务启动失败: {stderr.decode()}")
                return False
                
            # 尝试健康检查
            try:
                response = requests.get(f"http://localhost:{SERVICE_PORT}{HEALTH_ENDPOINT}", timeout=5)
                if response.status_code == 200:
                    print("服务已启动并响应健康检查")
                    return True
            except requests.exceptions.RequestException:
                pass
                
            time.sleep(1)
            
        print(f"服务在 {30} 秒内未响应健康检查")
        return False
    except Exception as e:
        print(f"启动服务时发生错误: {e}")
        return False

def health_check():
    """健康检查"""
    print("正在进行健康检查...")
    try:
        response = requests.get(f"http://localhost:{SERVICE_PORT}{HEALTH_ENDPOINT}", timeout=10)
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
            timeout=30
        )
        if response.status_code == 200:
            print("API 测试通过")
            print("响应内容:")
            print(json.dumps(response.json(), indent=2, ensure_ascii=False))
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
        try:
            # 发送 SIGTERM 信号
            os.killpg(os.getpgid(service_process.pid), signal.SIGTERM)
            
            # 等待进程结束
            service_process.wait(timeout=10)
            print("服务已停止")
        except subprocess.TimeoutExpired:
            # 如果进程没有响应，发送 SIGKILL 信号强制终止
            print("服务没有响应，正在强制终止...")
            os.killpg(os.getpgid(service_process.pid), signal.SIGKILL)
            service_process.wait()
            print("服务已强制终止")
        except Exception as e:
            print(f"停止服务时发生错误: {e}")

def main():
    """主函数"""
    print("开始测试多 Agent 服务")
    
    try:
        # 启动服务
        if not start_service():
            print("服务启动失败，退出测试")
            sys.exit(1)
        
        # 健康检查
        if not health_check():
            print("健康检查失败，退出测试")
            stop_service()
            sys.exit(1)
        
        # 测试 API
        if not test_api():
            print("API 测试失败，退出测试")
            stop_service()
            sys.exit(1)
        
        print("所有测试通过")
        
    except KeyboardInterrupt:
        print("\n测试被用户中断")
    except Exception as e:
        print(f"测试过程中发生错误: {e}")
    finally:
        # 停止服务
        stop_service()

if __name__ == "__main__":
    main()