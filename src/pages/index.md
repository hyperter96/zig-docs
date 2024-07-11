---
title: 简单介绍
pageTitle: Zig - 简单介绍
description: 通用的编程语言和工具链.
---

Zig 是一种通用的编程语言和工具链，用于维护**健壮**、**最优**和**可重用**的软件。 {% .lead %}

{% link-grid %}

{% link-grid-link title="Zig 安装" icon="installation" href="/docs/get-started/installation" description="系统配置以及安装Zig的分步指南" /%}

{% link-grid-link title="高层次概述" icon="plugins" href="/docs/core-concept/high-level-overview" description="对Zig程序的高层次概述" /%}

{% link-grid-link title="类型转换" icon="presets" href="/docs/advanced/type-cast" description="在进阶学习中，我们将讲解三种类型转换" /%}

{% link-grid-link title="构建系统" icon="theming" href="/docs/engineering/build-system" description="使用Zig进行构建系统" /%}

{% /link-grid %}

---

## 什么是 Zig

⚡ **一种简单的语言**

专注于调试你的应用程序，而不是调试你的编程语言知识

- 没有隐式控制流
- 没有隐式内存分配
- 没有预处理器，没有宏

⚡ **编译期代码执行**

基于编译期代码执行和惰性求值的全新元编程方法

- 编译期调用任意函数
- 在没有运行时开销的情况下，将类型作为值进行操作
- 编译期模拟目标架构

⚡ **用 Zig 维护代码**

逐步改善你的 C/C++/Zig 代码库

- 将 Zig 作为一个零依赖的，支持开箱即用交叉编译的 C/C++ 编译器
- 利用`zig build`在所有平台上创建一个一致的开发环境
- 在 C/C++ 项目中添加一个 Zig 编译单元，跨语言 LTO 默认启用

