---
pageTitle: Zig - 功能特色
description: 通用的编程语言和工具链.
---

{% article i18n="zh-CN" %}

# 功能特色

## Why use Zig

从本质上看，Zig 是一门 low level 的高级语言，它和 C 很像，但改善旧问题并提供了完善的工具链，并且它可选支持 `libc`。

一切都是强制显式声明式，这使得代码阅读很轻松！

如果你是嵌入式开发，亦或者对速度有很高的要求，还不想使用心智负担太高的其他高级语言，或许 Zig 很适合你。

## Features

- 类型是一等公民
- 无隐式执行
- 手动内存控制，精确的内存泄漏跟踪
- 完善的堆栈跟踪（在裸机器上也可以）
- 对交叉编译的一流支持
- 标准库集成 `libc` ，但不依赖它
- 可选类型代替 `null`，详见 计算机科学中最严重的错误
- 编译期（可以简单看作在编译时执行的函数）执行实现泛型和反射
- 无需 `FFI/bindings` 的 C 库集成
- 非常强大的构建系统

有几点是非常值得单独拿出来说明一下的：

Zig 会要求你显式传递和管理你的内存，并且编译时就会跟踪你的内存是否发生泄漏， 高明的可选类型（这和 rust 的 `option` 有异曲同工之妙），强大的编译期运行，你可实现很多花哨的操作，而构建系统则被很多 C 项目拿去作为工具链使用。

{% /article %}

{% article i18n="en" %}

# Features

## Why use Zig

In essence, Zig is a low-level high-level language, which is very similar to C, but improves old problems and provides a complete tool chain, and it optionally supports `libc`.

Everything is mandatory and explicit, which makes code reading easy!

If you are doing embedded development, or have high requirements for speed, and don’t want to use other high-level languages ​​that are too mentally taxing, maybe Zig is suitable for you.

## Features

- Types are first-class citizens
- No implicit execution
- Manual memory control, accurate memory leak tracking
- Complete stack traces (also on bare metal)
- First-class support for cross-compilation
- The standard library integrates `libc`, but does not depend on it
- Optional types replace `null`, see The Worst Mistakes in Computer Science
- Compile-time (which can be simply regarded as functions executed at compile time) execution to implement generics and reflection
- C library integration without `FFI/bindings`
- Very powerful build system

There are a few points that are worth explaining separately:

Zig will require you to explicitly pass and manage your memory, and will track whether your memory leaks at compile time, smart optional types (this is similar to rust's `option`), powerful compile-time operation, you can achieve a lot of fancy operations, and the build system is used as a tool chain by many C projects.

{% /article %}