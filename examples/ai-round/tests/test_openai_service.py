#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI圆桌会服务测试脚本
自动生成的测试脚本，用于测试 multiagent.py 服务
"""

import os
import sys
import time
import subprocess
import requests
import json
import signal

# 从 .env 文件加载环境变量
def load_env():
    env_file = '.env'
    if os.path.exists(env_file):
        with open(env_file, 'r') as f:
            for line in f:
                if '=' in line and not line.startswith('#'):
                    key, value = line.strip().split('=', 1)
                    os.environ[key] = value

def start_service():
    """启动服务"""
    load_env()
    print('正在启动服务...')
    
    # 使用 venv 中的 Python
    venv_python = os.path.join('.venv', 'bin', 'python')
    if not os.path.exists(venv_python):
        venv_python = sys.executable if sys.executable else 'python3'
    
    cmd = [venv_python, 'multiagent.py']
    process = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    return process

def wait_for_service(port=8000, timeout=30):
    """等待服务启动"""
    start_time = time.time()
    while time.time() - start_time < timeout:
        try:
            response = requests.get(f'http://localhost:{port}/health', timeout=5)
            if response.status_code == 200:
                print('服务已启动')
                return True
        except requests.exceptions.RequestException:
            pass
        time.sleep(1)
    return False

def test_health_endpoint(port=8000):
    """测试健康检查端点"""
    print('测试健康检查端点...')
    try:
        response = requests.get(f'http://localhost:{port}/health', timeout=10)
        if response.status_code == 200:
            print('健康检查通过')
            return True
        else:
            print(f'健康检查失败，状态码: {response.status_code}')
            return False
    except Exception as e:
        print(f'健康检查异常: {e}')
        return False

def test_chat_completions_endpoint(port=8000):
    """测试聊天完成端点"""
    print('测试聊天完成端点...')
    try:
        payload = {
            'model': 'gpt-3.5-turbo',
            'messages': [
                {'role': 'user', 'content': '你好，请介绍一下你自己'}
            ]
        }
        response = requests.post(
            f'http://localhost:{port}/v1/chat/completions',
            json=payload,
            headers={'Content-Type': 'application/json'},
            timeout=180
        )
        if response.status_code == 200:
            print('聊天完成端点测试通过')
            print('响应内容预览:')
            response_data = response.json()
            print(json.dumps(response_data, ensure_ascii=False, indent=2)[:500] + '...')
            return True
        else:
            print(f'聊天完成端点测试失败，状态码: {response.status_code}')
            print('响应内容:', response.text)
            return False
    except Exception as e:
        print(f'聊天完成端点测试异常: {e}')
        return False

def test_models_endpoint(port=8000):
    """测试模型列表端点"""
    print('测试模型列表端点...')
    try:
        response = requests.get(f'http://localhost:{port}/v1/models', timeout=10)
        if response.status_code == 200:
            print('模型列表端点测试通过')
            print('响应内容预览:')
            response_data = response.json()
            print(json.dumps(response_data, ensure_ascii=False, indent=2)[:500] + '...')
            return True
        else:
            print(f'模型列表端点测试失败，状态码: {response.status_code}')
            print('响应内容:', response.text)
            return False
    except Exception as e:
        print(f'模型列表端点测试异常: {e}')
        return False

def stop_service(process):
    """停止服务"""
    print('正在停止服务...')
    if process.poll() is None:  # 如果进程仍在运行
        process.terminate()
        try:
            process.wait(timeout=10)
            print('服务已停止')
        except subprocess.TimeoutExpired:
            process.kill()
            print('服务强制终止')

def main():
    """主函数"""
    service_process = None
    try:
        # 启动服务
        service_process = start_service()
        time.sleep(2)  # 等待进程启动
        
        # 等待服务就绪
        if not wait_for_service():
            print('服务启动超时')
            return False
        
        # 测试各个端点
        success = True
        success &= test_health_endpoint()
        success &= test_chat_completions_endpoint()
        success &= test_models_endpoint()
        
        if success:
            print('\n所有测试通过!')
            return True
        else:
            print('\n部分测试失败!')
            return False
            
    except Exception as e:
        print(f'测试过程中发生异常: {e}')
        return False
    finally:
        # 停止服务
        if service_process:
            stop_service(service_process)

if __name__ == '__main__':
    success = main()
    sys.exit(0 if success else 1)
