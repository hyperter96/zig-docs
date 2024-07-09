---
title: 基本类型
pageTitle: Zig - 基本类型
---

## Primitive Types

> 数值类型是语言运行时的基本类型，当它编译为机器码时，其中包含着许多的 CPU运算器 的操作指令。

### Integer

#### Type

在 zig 中，对整数的类型划分很详细，以下是类型表格：

|类型|对应C类型|描述|
|:----:|:--------:|:----:|
|`i8`|`int8_t`|有符号8位整数|
| `u8`|`uint8_t`|无符号8位整数|
|`i16`|`int16_t`|有符号16位整数|
|`u16`|`uint16_t`|无符号16位整数|
|`i32`|`int32_t`|有符号32位整数|
|`u32`|`uint32_t`|无符号32位整数|
|`i64`|`int64_t`|有符号64位整数|
|`u64`|`uint64_t`|无符号64位整数|
|`i128`|`__int128`|有符号128位整数|
|`u128`|`unsigned __int128`|无符号128位整数|
|`isize`|`intptr_t`|有符号指针大小的整数|
|`usize`|`uintptr_t` `size_t`|无符号指针大小的整数|
|`comptime_int`|无|编译期的整数，整数字面量的类型|

```c
// 下划线可以放在数字之间作为视觉分隔符
const one_billion = 1_000_000_000;
const binary_mask = 0b1_1111_1111;
const permissions = 0o7_5_5;
const big_address = 0xFF80_0000_0000_0000;
```