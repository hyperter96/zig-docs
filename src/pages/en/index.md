---
title: Introduction
pageTitle: Zig - Introduction
description: Common programming languages ​​and toolchains.
---

Zig is a general-purpose programming language and toolchain for maintaining **robust**, **optimal**, and **reusable** software. {% .lead %}

{% link-grid %}

{% link-grid-link title="Zig Installation" icon="installation" href="/docs/get-started/installation" description="A step-by-step guide to system configuration and installation of Zig" /%}

{% link-grid-link title="High-level Overview" icon="plugins" href="/docs/core-concept/high-level-overview" description="A high-level overview of the Zig program" /%}

{% link-grid-link title="Type Conversion" icon="presets" href="/docs/advanced/type-cast" description="In advanced learning, we will explain three types of conversion" /%}

{% link-grid-link title="Build System" icon="theming" href="/docs/engineering/build-system" description="Using Zig for build system" /%}

{% /link-grid %}

---

## What is Zig

⚡ **A Simple Language**

Focus on debugging your application rather than debugging your programming language knowledge.

- No hidden control flow.
- No hidden memory allocations.
- No preprocessor, no macros.

⚡ **Comptime**

A fresh approach to metaprogramming based on compile-time code execution and lazy evaluation.

Call any function at compile-time.
Manipulate types as values without runtime overhead.
Comptime emulates the target architecture.

⚡ **Maintain it with Zig**

Incrementally improve your C/C++/Zig codebase.

- Use Zig as a zero-dependency, drop-in C/C++ compiler that supports cross-compilation out-of-the-box.
- Leverage `zig build` to create a consistent development environment across all platforms.
- Add a Zig compilation unit to C/C++ projects, exposing the rich standard library to your C/C++ code.