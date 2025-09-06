/**
 * 示例数据模块
 */

/**
 * 获取示例数据
 * @returns {object} 示例数据
 */
function getSampleData() {
    return {
        "metadata": {
            "version": "1.0",
            "created_at": "2024-01-15T10:00:0Z",
            "description": "大模型性能基准测试数据"
        },
        "benchmarks": [
            {
                "id": "benchmark_001",
                "model_name": "GPT-4",
                "model_version": "4.0",
                "framework": "TensorRT",
                "framework_version": "8.6",
                "hardware": "NVIDIA A100",
                "input_sequence": 1024,
                "output_sequence": 512,
                "metrics": {
                    "prefill_time_ms": 45.2,
                    "decode_time_ms": 12.8,
                    "total_time_ms": 58.0,
                    "tokens_per_second": 88.3,
                    "memory_usage_mb": 2450,
                    "throughput": 92.1
                },
                "timestamp": "2024-01-15T09:30:00Z",
                "environment": {
                    "cuda_version": "11.8",
                    "python_version": "3.9",
                    "os": "Ubuntu 20.04"
                }
            },
            {
                "id": "benchmark_002",
                "model_name": "GPT-4",
                "model_version": "4.0",
                "framework": "vLLM",
                "framework_version": "0.1.5",
                "hardware": "NVIDIA A100",
                "input_sequence": 1024,
                "output_sequence": 512,
                "metrics": {
                    "prefill_time_ms": 38.5,
                    "decode_time_ms": 15.2,
                    "total_time_ms": 53.7,
                    "tokens_per_second": 95.6,
                    "memory_usage_mb": 2200,
                    "throughput": 89.7
                },
                "timestamp": "2024-01-15T10:00:00Z",
                "environment": {
                    "cuda_version": "11.8",
                    "python_version": "3.9",
                    "os": "Ubuntu 20.04"
                }
            },
            {
                "id": "benchmark_003",
                "model_name": "LLaMA-2",
                "model_version": "70B",
                "framework": "TensorRT",
                "framework_version": "8.6",
                "hardware": "NVIDIA A100",
                "input_sequence": 2048,
                "output_sequence": 1024,
                "metrics": {
                    "prefill_time_ms": 88.7,
                    "decode_time_ms": 25.4,
                    "total_time_ms": 114.1,
                    "tokens_per_second": 89.7,
                    "memory_usage_mb": 4800,
                    "throughput": 85.3
                },
                "timestamp": "2024-01-15T10:30:00Z",
                "environment": {
                    "cuda_version": "11.8",
                    "python_version": "3.9",
                    "os": "Ubuntu 20.04"
                }
            },
            {
                "id": "benchmark_004",
                "model_name": "LLaMA-2",
                "model_version": "70B",
                "framework": "vLLM",
                "framework_version": "0.1.5",
                "hardware": "NVIDIA A100",
                "input_sequence": 2048,
                "output_sequence": 1024,
                "metrics": {
                    "prefill_time_ms": 75.3,
                    "decode_time_ms": 22.1,
                    "total_time_ms": 97.4,
                    "tokens_per_second": 105.2,
                    "memory_usage_mb": 4200,
                    "throughput": 98.7
                },
                "timestamp": "2024-01-15T11:00:00Z",
                "environment": {
                    "cuda_version": "11.8",
                    "python_version": "3.9",
                    "os": "Ubuntu 20.04"
                }
            },
            {
                "id": "benchmark_005",
                "model_name": "PaLM-2",
                "model_version": "540B",
                "framework": "TensorRT",
                "framework_version": "8.6",
                "hardware": "NVIDIA A100",
                "input_sequence": 512,
                "output_sequence": 256,
                "metrics": {
                    "prefill_time_ms": 28.9,
                    "decode_time_ms": 8.7,
                    "total_time_ms": 37.6,
                    "tokens_per_second": 92.4,
                    "memory_usage_mb": 3200,
                    "throughput": 88.9
                },
                "timestamp": "2024-01-15T11:30:00Z",
                "environment": {
                    "cuda_version": "11.8",
                    "python_version": "3.9",
                    "os": "Ubuntu 20.04"
                }
            },
            {
                "id": "benchmark_006",
                "model_name": "PaLM-2",
                "model_version": "540B",
                "framework": "vLLM",
                "framework_version": "0.1.5",
                "hardware": "NVIDIA A100",
                "input_sequence": 512,
                "output_sequence": 256,
                "metrics": {
                    "prefill_time_ms": 24.6,
                    "decode_time_ms": 7.9,
                    "total_time_ms": 32.5,
                    "tokens_per_second": 101.3,
                    "memory_usage_mb": 2800,
                    "throughput": 95.6
                },
                "timestamp": "2024-01-15T12:00:00Z",
                "environment": {
                    "cuda_version": "11.8",
                    "python_version": "3.9",
                    "os": "Ubuntu 20.04"
                }
            },
            {
                "id": "benchmark_007",
                "model_name": "Claude-2",
                "model_version": "2.1",
                "framework": "TensorRT",
                "framework_version": "8.6",
                "hardware": "NVIDIA A100",
                "input_sequence": 1536,
                "output_sequence": 768,
                "metrics": {
                    "prefill_time_ms": 62.4,
                    "decode_time_ms": 18.3,
                    "total_time_ms": 80.7,
                    "tokens_per_second": 94.2,
                    "memory_usage_mb": 3800,
                    "throughput": 91.5
                },
                "timestamp": "2024-01-15T12:30:00Z",
                "environment": {
                    "cuda_version": "11.8",
                    "python_version": "3.9",
                    "os": "Ubuntu 20.04"
                }
            },
            {
                "id": "benchmark_008",
                "model_name": "Claude-2",
                "model_version": "2.1",
                "framework": "vLLM",
                "framework_version": "0.1.5",
                "hardware": "NVIDIA A100",
                "input_sequence": 1536,
                "output_sequence": 768,
                "metrics": {
                    "prefill_time_ms": 53.8,
                    "decode_time_ms": 16.7,
                    "total_time_ms": 70.5,
                    "tokens_per_second": 109.1,
                    "memory_usage_mb": 3400,
                    "throughput": 102.3
                },
                "timestamp": "2024-01-15T13:00:00Z",
                "environment": {
                    "cuda_version": "11.8",
                    "python_version": "3.9",
                    "os": "Ubuntu 20.04"
                }
            }
        ]
    };
}

// 导出函数（如果在模块环境中）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getSampleData
    };
}