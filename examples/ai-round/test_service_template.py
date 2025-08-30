#!/usr/bin/env python3
"""
HTTP 服务测试脚本模板
这是一个通用的 HTTP 服务测试脚本，支持服务启动、健康检查、API测试和服务停止。
"""

import os
import sys
import subprocess
import time
import requests
import json
import signal
from typing import Dict, Any, Optional

class ServiceTester:
    def __init__(self, service_file: str, port: int = 8000):
        self.service_file = service_file
        self.port = port
        self.process = None
        self.base_url = f"http://localhost:{port}"
        
    def start_service(self) -> bool:
        """启动服务"""
        try:
            # 获取当前环境变量并添加 .env 文件中的变量
            env = os.environ.copy()
            
            # 加载 .env 文件中的环境变量
            if os.path.exists('.env'):
                with open('.env', 'r') as f:
                    for line in f:
                        line = line.strip()
                        if line and not line.startswith('#') and '=' in line:
                            key, value = line.split('=', 1)
                            env[key.strip()] = value.strip()
            
            self.process = subprocess.Popen(
                ["python", self.service_file],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                preexec_fn=os.setsid,
                env=env  # 传递包含 .env 变量的环境
            )
            print(f"服务已启动 (PID: {self.process.pid})")
            time.sleep(3)  # 等待服务启动
            return True
        except Exception as e:
            print(f"启动服务失败: {e}")
            return False
            
    def health_check(self, endpoint: str = "/health") -> bool:
        """健康检查"""
        try:
            response = requests.get(f"{self.base_url}{endpoint}", timeout=10)
            if response.status_code == 200:
                result = response.json()
                if result.get("status") == "ok":
                    print("✓ 健康检查成功")
                    return True
            print("✗ 健康检查失败")
            return False
        except Exception as e:
            print(f"健康检查错误: {e}")
            return False
            
    def test_endpoint(self, endpoint: str, payload: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """测试API端点"""
        try:
            response = requests.post(
                f"{self.base_url}{endpoint}",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=30
            )
            response.raise_for_status()
            result = response.json()
            print("✓ API测试成功")
            return result
        except Exception as e:
            print(f"API测试失败: {e}")
            return None
            
    def stop_service(self):
        """停止服务"""
        if self.process:
            try:
                os.killpg(os.getpgid(self.process.pid), signal.SIGTERM)
                self.process.wait(timeout=5)
                print("服务已停止")
            except:
                try:
                    self.process.terminate()
                    self.process.wait(timeout=3)
                except:
                    self.process.kill()
        self.process = None

def main():
    # 配置参数 - 这些将由 AFUNC 动态生成
    service_file = "agent.py"
    port = 8000
    health_endpoint = "/health"
    test_endpoint = "/v1/chat/completions"
    test_payload = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": "你好，请介绍一下你自己"}]
    }
    
    tester = ServiceTester(service_file, port)
    
    try:
        # 启动服务
        if not tester.start_service():
            sys.exit(1)
            
        # 健康检查
        if not tester.health_check(health_endpoint):
            sys.exit(1)
            
        # API测试
        result = tester.test_endpoint(test_endpoint, test_payload)
        if result is None:
            sys.exit(1)
            
        print("测试结果:")
        print(json.dumps(result, ensure_ascii=False, indent=2))
        
        sys.exit(0)
        
    except Exception as e:
        print(f"测试过程中发生错误: {e}")
        sys.exit(1)
    finally:
        tester.stop_service()

if __name__ == "__main__":
    main()
