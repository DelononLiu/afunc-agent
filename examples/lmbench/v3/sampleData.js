/**
 * 示例数据模块
 */

// 示例数据
const sampleData = {
    "metadata": {
        "version": "1.0",
        "created_at": "2024-01-15T10:00:00Z",
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
            "model_name": "LLaMA-2",
            "model_version": "7B",
            "framework": "vLLM",
            "framework_version": "0.1.5",
            "hardware": "NVIDIA A100",
            "input_sequence": 1024,
            "output_sequence": 512,
            "metrics": {
                "prefill_time_ms": 38.5,
                "decode_time_ms": 15.2,
                "total_time_ms": 53.7,
                "tokens_per_second": 95.2,
                "memory_usage_mb": 2100,
                "throughput": 89.7
            },
            "timestamp": "2024-01-15T09:35:00Z",
            "environment": {
                "cuda_version": "11.8",
                "python_version": "3.9",
                "os": "Ubuntu 20.04"
            }
        },
        {
            "id": "benchmark_003",
            "model_name": "ChatGLM-3",
            "model_version": "6B",
            "framework": "TensorRT",
            "framework_version": "8.6",
            "hardware": "NVIDIA A100",
            "input_sequence": 1024,
            "output_sequence": 512,
            "metrics": {
                "prefill_time_ms": 42.1,
                "decode_time_ms": 14.3,
                "total_time_ms": 56.4,
                "tokens_per_second": 90.8,
                "memory_usage_mb": 2300,
                "throughput": 91.2
            },
            "timestamp": "2024-01-15T09:40:00Z",
            "environment": {
                "cuda_version": "11.8",
                "python_version": "3.9",
                "os": "Ubuntu 20.04"
            }
        },
        {
            "id": "benchmark_004",
            "model_name": "GPT-4",
            "model_version": "4.0",
            "framework": "vLLM",
            "framework_version": "0.1.5",
            "hardware": "NVIDIA A100",
            "input_sequence": 1024,
            "output_sequence": 512,
            "metrics": {
                "prefill_time_ms": 40.3,
                "decode_time_ms": 13.7,
                "total_time_ms": 54.0,
                "tokens_per_second": 94.8,
                "memory_usage_mb": 2400,
                "throughput": 93.5
            },
            "timestamp": "2024-01-15T09:45:00Z",
            "environment": {
                "cuda_version": "11.8",
                "python_version": "3.9",
                "os": "Ubuntu 20.04"
            }
        },
        {
            "id": "benchmark_005",
            "model_name": "LLaMA-2",
            "model_version": "7B",
            "framework": "TensorRT",
            "framework_version": "8.6",
            "hardware": "NVIDIA A100",
            "input_sequence": 1024,
            "output_sequence": 512,
            "metrics": {
                "prefill_time_ms": 41.8,
                "decode_time_ms": 16.1,
                "total_time_ms": 57.9,
                "tokens_per_second": 88.6,
                "memory_usage_mb": 2150,
                "throughput": 87.9
            },
            "timestamp": "2024-01-15T09:50:00Z",
            "environment": {
                "cuda_version": "11.8",
                "python_version": "3.9",
                "os": "Ubuntu 20.04"
            }
        },
        {
            "id": "benchmark_006",
            "model_name": "ChatGLM-3",
            "model_version": "6B",
            "framework": "vLLM",
            "framework_version": "0.1.5",
            "hardware": "NVIDIA A100",
            "input_sequence": 1024,
            "output_sequence": 512,
            "metrics": {
                "prefill_time_ms": 39.7,
                "decode_time_ms": 14.9,
                "total_time_ms": 54.6,
                "tokens_per_second": 93.6,
                "memory_usage_mb": 2250,
                "throughput": 90.3
            },
            "timestamp": "2024-01-15T09:55:00Z",
            "environment": {
                "cuda_version": "11.8",
                "python_version": "3.9",
                "os": "Ubuntu 20.04"
            }
        },
        {
            "id": "benchmark_007",
            "model_name": "GPT-3.5",
            "model_version": "3.5",
            "framework": "TensorRT",
            "framework_version": "8.6",
            "hardware": "NVIDIA A100",
            "input_sequence": 1024,
            "output_sequence": 512,
            "metrics": {
                "prefill_time_ms": 43.5,
                "decode_time_ms": 13.2,
                "total_time_ms": 56.7,
                "tokens_per_second": 90.3,
                "memory_usage_mb": 2350,
                "throughput": 91.8
            },
            "timestamp": "2024-01-15T10:00:00Z",
            "environment": {
                "cuda_version": "11.8",
                "python_version": "3.9",
                "os": "Ubuntu 20.04"
            }
        },
        {
            "id": "benchmark_008",
            "model_name": "GPT-3.5",
            "model_version": "3.5",
            "framework": "vLLM",
            "framework_version": "0.1.5",
            "hardware": "NVIDIA A100",
            "input_sequence": 1024,
            "output_sequence": 512,
            "metrics": {
                "prefill_time_ms": 41.2,
                "decode_time_ms": 14.1,
                "total_time_ms": 55.3,
                "tokens_per_second": 92.8,
                "memory_usage_mb": 2300,
                "throughput": 92.5
            },
            "timestamp": "2024-01-15T10:05:00Z",
            "environment": {
                "cuda_version": "11.8",
                "python_version": "3.9",
                "os": "Ubuntu 20.04"
            }
        }
    ]
};

// 导出示例数据
window.SampleData = sampleData;