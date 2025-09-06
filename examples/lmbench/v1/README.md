# 大模型性能基准测试数据展示系统 - PC大屏版

## 项目简介

这是一个专为PC大屏设计的大模型性能基准测试数据展示系统，支持多种推理框架的性能数据对比分析，最大化数据展示空间。

## 功能特性

### 数据展示
- 显示不同大模型的性能数据
- 显示不同输入序列、输出序列的性能数据
- 包含Prefill耗时、decode耗时、平均耗时等指标
- 支持多种推理框架的性能数据展示
- 专为PC大屏优化，最大化数据展示空间

### 数据筛选
- 支持按模型名称筛选
- 支持按推理框架筛选
- 支持按序列长度范围筛选
- 支持按指标列筛选
- 左侧固定筛选面板，右侧主内容区域

### 数据对比
- 支持不同推理框架的性能对比
- 支持不同模型的性能对比
- 支持序列长度对性能的影响分析
- 可视化图表展示
- 大屏图表展示，更清晰的数据对比

### 数据加载
- 支持外部JSON数据文件加载
- 固定数据格式支持
- 示例数据预加载

## 技术架构

### 前端技术栈
- **HTML5**: 页面结构
- **CSS3**: 样式设计（专为PC大屏优化）
- **JavaScript**: 交互逻辑
- **Bootstrap 5**: UI框架
- **DataTables**: 数据表格组件
- **Chart.js**: 图表可视化
- **Font Awesome**: 图标库

### 布局设计
- **左右布局**: 左侧固定筛选面板（20%宽度），右侧主内容区域（80%宽度）
- **固定侧边栏**: 侧边栏固定在左侧，主内容区域可滚动
- **最大化数据展示**: 专为PC大屏设计，充分利用屏幕空间

### 数据格式
采用JSON格式存储性能数据，包含以下主要字段：
- `model_name`: 模型名称
- `framework`: 推理框架
- `input_sequence`: 输入序列长度
- `output_sequence`: 输出序列长度
- `metrics`: 性能指标（Prefill耗时、Decode耗时、Token/s等）

## 使用方法

### 1. 直接运行
由于项目使用纯前端技术，无需编译，直接在浏览器中打开 `index.html` 即可使用。

### 2. 加载数据
- 点击左侧"数据加载"区域的"选择数据文件"按钮
- 选择符合格式的JSON数据文件
- 点击"加载数据"按钮导入数据

### 3. 数据筛选
- 使用左侧筛选面板进行多维度筛选
- 支持多选筛选条件
- 点击"重置筛选"清除所有筛选条件

### 4. 对比分析
- 点击"对比分析"按钮显示对比图表
- 查看不同框架、不同模型的性能对比
- 图表支持交互式操作

### 5. 数据导出
- 点击"导出数据"按钮将当前数据导出为CSV格式
- 导出的数据包含当前筛选条件下的所有记录

## 项目结构

```
├── index.html          # 主页面文件
├── sample_data.json    # 示例数据文件
├── README.md          # 项目说明文档
└── (其他数据文件)
```

## 数据格式说明

### JSON数据结构
```json
{
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
    }
  ]
}
```

### 必需字段说明
- `model_name`: 模型名称（如GPT-4、Llama2、Claude等）
- `framework`: 推理框架（如TensorRT、ONNX、PyTorch等）
- `input_sequence`: 输入序列长度（整数）
- `output_sequence`: 输出序列长度（整数）
- `metrics`: 性能指标对象，包含：
  - `prefill_time_ms`: Prefill耗时（毫秒）
  - `decode_time_ms`: Decode耗时（毫秒）
  - `total_time_ms`: 总耗时（毫秒）
  - `tokens_per_second`: Token处理速度
  - `memory_usage_mb`: 内存使用量（MB）
  - `throughput`: 吞吐量

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 开发说明

### 添加新的性能指标
1. 在JSON数据格式中添加新的指标字段
2. 在HTML表格中添加对应的列
3. 在JavaScript中更新数据处理逻辑

### 自定义图表类型
1. 修改 `createComparisonCharts()` 函数
2. 使用Chart.js支持的图表类型
3. 根据数据特点选择合适的可视化方式

## 注意事项

1. 确保数据文件格式正确，否则可能导致加载失败
2. 大量数据时可能影响页面性能，建议分批处理
3. 图表显示需要浏览器支持Canvas API

## 许可证

本项目采用MIT许可证，详见LICENSE文件。