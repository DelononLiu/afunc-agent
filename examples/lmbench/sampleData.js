// 加载示例数据
function loadSampleData() {
    const sampleData = {
        metadata: {
            version: "1.0",
            created_at: "2024-01-15T10:00:00Z",
            description: "大模型性能基准测试数据"
        },
        benchmarks: [
            {
                id: "benchmark_001",
                model_name: "GPT-4",
                model_version: "4.0",
                framework: "TensorRT",
                framework_version: "8.6",
                hardware: "NVIDIA A100",
                input_sequence: 1024,
                output_sequence: 512,
                metrics: {
                    prefill_time_ms: 45.2,
                    decode_time_ms: 12.8,
                    total_time_ms: 58.0,
                    tokens_per_second: 88.3,
                    memory_usage_mb: 2450,
                    throughput: 92.1
                },
                timestamp: "2024-01-15T09:30:00Z",
                environment: {
                    cuda_version: "11.8",
                    python_version: "3.9",
                    os: "Ubuntu 20.04"
                }
            },
            {
                id: "benchmark_002",
                model_name: "GPT-4",
                model_version: "4.0",
                framework: "ONNX",
                framework_version: "1.14",
                hardware: "NVIDIA A100",
                input_sequence: 1024,
                output_sequence: 512,
                metrics: {
                    prefill_time_ms: 52.3,
                    decode_time_ms: 15.6,
                    total_time_ms: 67.9,
                    tokens_per_second: 82.1,
                    memory_usage_mb: 2680,
                    throughput: 87.5
                },
                timestamp: "2024-01-15T09:45:00Z",
                environment: {
                    cuda_version: "11.8",
                    python_version: "3.9",
                    os: "Ubuntu 20.04"
                }
            },
            {
                id: "benchmark_003",
                model_name: "Llama2-7B",
                model_version: "2.0",
                framework: "TensorRT",
                framework_version: "8.6",
                hardware: "NVIDIA A100",
                input_sequence: 1024,
                output_sequence: 512,
                metrics: {
                    prefill_time_ms: 28.5,
                    decode_time_ms: 8.2,
                    total_time_ms: 36.7,
                    tokens_per_second: 124.5,
                    memory_usage_mb: 1890,
                    throughput: 118.3
                },
                timestamp: "2024-01-15T10:00:00Z",
                environment: {
                    cuda_version: "11.8",
                    python_version: "3.9",
                    os: "Ubuntu 20.04"
                }
            },
            {
                id: "benchmark_004",
                model_name: "Llama2-7B",
                model_version: "2.0",
                framework: "PyTorch",
                framework_version: "2.1",
                hardware: "NVIDIA A100",
                input_sequence: 1024,
                output_sequence: 512,
                metrics: {
                    prefill_time_ms: 35.8,
                    decode_time_ms: 11.2,
                    total_time_ms: 47.0,
                    tokens_per_second: 108.9,
                    memory_usage_mb: 2150,
                    throughput: 105.2
                },
                timestamp: "2024-01-15T10:15:00Z",
                environment: {
                    cuda_version: "11.8",
                    python_version: "3.9",
                    os: "Ubuntu 20.04"
                }
            },
            {
                id: "benchmark_005",
                model_name: "Claude-2",
                model_version: "2.0",
                framework: "TensorRT",
                framework_version: "8.6",
                hardware: "NVIDIA A100",
                input_sequence: 1024,
                output_sequence: 512,
                metrics: {
                    prefill_time_ms: 38.2,
                    decode_time_ms: 9.8,
                    total_time_ms: 48.0,
                    tokens_per_second: 115.6,
                    memory_usage_mb: 2230,
                    throughput: 112.1
                },
                timestamp: "2024-01-15T10:30:00Z",
                environment: {
                    cuda_version: "11.8",
                    python_version: "3.9",
                    os: "Ubuntu 20.04"
                }
            }
        ]
    };
    
    processData(sampleData);
}