{% article i18n="zh-CN" %}

# 可选类型

Zig 在不损害效率和可读性的前提下提高代码安全性的一个方案就是可选类型，`?` 是可选类型的标志，你可以将它放在类型的前面，代表它的值是`null`或者这个类型。

```zig
// 一个普通的i32整数
const normal_int: i32 = 1234;

// i32的可选类型，现在它的值可以是 i32 或者 null
const optional_int: ?i32 = 5678;
```

Zig 会将 `null` 特殊看待，并且保证你不会将一个可能为 `null` 的值赋值给一个不可能是 `null` 的变量。

首先我们和 zig 的目标：C 对比一下，看一下两者在处理 `null` 上的区别，在接下来的代码中，我们尝试调用 `malloc`，并且申请一块内存：



{% /article %}

{% article i18n="en" %}

# Optional Type

{% /article %}
