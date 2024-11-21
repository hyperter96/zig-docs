{% article i18n="zh-CN" %}

# 高层次概述

Zig 是一种系统编程语言，旨在提供简单、可预测和高效的编程体验。以下是 Zig 的一些高层次概述和特点：

## Design Goals
- 简单性: Zig 的语法和设计理念都追求简洁，避免复杂的特性，降低学习曲线。
- 可预测性: Zig 的行为可预测，避免了许多现代语言中的隐式转换和复杂的内存管理。
- 高效性: 旨在与 C 和 C++ 等语言竞争，能够生成高效的机器代码，同时保留开发效率。

## Memory Management
- Zig 不使用垃圾回收（GC），而是采用手动内存管理策略，开发者可以精确控制内存分配和释放。
- 提供了安全的内存管理工具，如可选的运行时检查和内存分配器接口。

## Compile-time Execution
- Zig 支持编译时执行代码，这意味着你可以在编译阶段计算值，从而减少运行时开销。
- 可以使用编译时功能生成高效的代码，而不需要在运行时进行复杂的计算。

## Type System
- Zig 的类型系统设计简洁，支持强类型和静态类型检查。
- 支持自定义类型和复合类型，便于组织复杂的数据结构。

## Error Handling
- Zig 采用显式的错误处理机制，通过返回错误代码和使用 error 类型来处理错误，避免异常机制的复杂性。

## Cross-platform
- Zig 支持多种操作系统和架构，可以轻松生成跨平台的二进制文件。
- 提供了良好的编译器选项，以支持不同的目标平台。

## Toolchain
- Zig 自带编译器和构建系统，可以轻松集成到现有的构建流程中。
- 还提供了用于生成文档、测试和调试的工具。

## Community & Ecosystem
- Zig 仍在不断发展，社区活跃，提供了多种库和工具支持。
- Zig 是一个适合系统级编程的语言，尤其适合需要高效内存管理和性能的应用程序，如操作系统、嵌入式系统和游戏开发。随着其生态系统的成长，Zig 可能会吸引更多的开发者关注。

{% /article %}

{% article i18n="en" %}

# High-level Overview

Zig is a systems programming language that aims to provide a simple, predictable, and efficient programming experience. Here are some high-level overviews and features of Zig:

## Design Goals
- Simplicity: Zig's syntax and design philosophy are designed to be concise, avoid complex features, and reduce the learning curve.
- Predictability: Zig's behavior is predictable, avoiding implicit conversions and complex memory management in many modern languages.
- Efficiency: Designed to compete with languages such as C and C++, it is able to generate efficient machine code while retaining development efficiency.

## Memory Management
- Zig does not use garbage collection (GC), but instead adopts a manual memory management strategy that allows developers to precisely control memory allocation and deallocation.
- Provides safe memory management tools such as optional runtime checks and memory allocator interfaces.

## Compile-time Execution
- Zig supports compile-time execution of code, which means that you can calculate values at the compile stage, thereby reducing runtime overhead.
- Compile-time features can be used to generate efficient code without complex calculations at runtime.

## Type System
- Zig's type system is designed to be concise, supporting strong typing and static type checking.
- Supports custom types and composite types, making it easy to organize complex data structures.

## Error Handling
- Zig uses an explicit error handling mechanism to handle errors by returning error codes and using error types, avoiding the complexity of exception mechanisms.

## Cross-platform
- Zig supports multiple operating systems and architectures, and can easily generate cross-platform binaries.
- Provides good compiler options to support different target platforms.

## Toolchain
- Zig comes with its own compiler and build system, which can be easily integrated into the existing build process.
- Tools for generating documentation, testing, and debugging are also provided.

## Community & Ecosystem
- Zig is still under development, with an active community and a variety of libraries and tool support.
- Zig is a language suitable for system-level programming, especially for applications that require efficient memory management and performance, such as operating systems, embedded systems, and game development. As its ecosystem grows, Zig may attract more developer attention.

{% /article %}
