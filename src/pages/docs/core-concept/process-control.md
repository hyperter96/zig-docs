{% article i18n="zh-CN" %}

# 流程控制

## Conditions

> 在 zig 中，`if` 这个语法的作用可就大了！

像基础的 `if`，`if else`，`else if` 我们就不说了，直接看例子：

```zig
const num: u8 = 1;
if (num == 1) {
    print("num is 1\n", .{});
} else if (num == 2) {
    print("num is 2\n", .{});
} else {
    print("num is other\n", .{});
}
```

### Enum Type Matching

`if` 可以用于枚举类型的匹配，判断是否相等：

```zig
const Small = enum {
    one,
    two,
    three,
    four,
};

const demo = Small.one;
if (demo == Small.one) {
    std.debug.print("{}\n", .{demo});
}
```

### Ternary Expression

zig 中的三元表达式是通过 `if else` 来实现的：

```zig
const a: u32 = 5;
const b: u32 = 4;
// 下方 result 的值应该是47
const result = if (a != b) 47 else 3089;

print("result is {}\n", .{result});
```

### Destructuring Types

以下内容涉及到了联合类型和可选类型，你可以在阅读完这两章节后再回来学习。

#### Destructuring Option Type

事实上，解构可选类型操作很简单：

```zig
const val: ?u32 = null;
if (val) |real_b| {
    _ = real_b;
} else {
    try expect(true);
}
```
以上代码的 `else` 分支并非必要，我们结构后获得 `real_b` 就是 `u32` 类型，但是注意我们获得的捕获是只读的！

如果我们想操纵值的内容，可以选择捕获对应的指针：

```zig
var c: ?u32 = 3;
if (c) |*value| {
    value.* = 2;
}
```

- 运算符就表示我们选择捕获这个值对应的指针，因此我们可以通过操控指针来修改其值。

#### Destructuring Error Union Type

解构错误联合类型类似于解构可选类型：

```zig
const val: anyerror!u32 = 0;
if (val) |value| {
    try expect(value == 0);
} else |err| {
    _ = err;
    unreachable;
}
```

以上代码中 `value` 类型为 `u32`，`else` 分支捕获的是错误，即 `err` 的类型将会是 `anyerror`，这是由我们之前显式声明的，否则将会是由编译器推导的。

为了仅检测错误，我们可以这样做：

```zig
if (val) |_| {} else |err| {
    try expect(err == error.BadValue);
}
```

同样支持捕获指针来操作值：

```zig
var val: anyerror!u32 = 3;
if (val) |*value| {
    value.* = 9;
} else |_| {
    unreachable;
}
```
{% callout type="warning" title="提示" %}
那么 `if` 是如何解构 错误联合可选类型 的呢？

答案是 `if` 会先尝试解构错误联合类型，再解构可选类型：

```zig
const a: anyerror!?u32 = 0;
if (a) |optional_value| {
    try expect(optional_value.? == 0);
} else |err| {
    _ = err;
}
```
以上代码中的 `optional_value` 就是可选类型 `?u32`，我们可以在内部继续使用 `if` 来解构它。

在错误联合可选类型上也可以使用指针捕获：

```zig
var d: anyerror!?u32 = 3;
if (d) |*optional_value| {
    if (optional_value.*) |*value| {
        value.* = 9;
    }
} else |_| {
    // nothing
}
```

以上代码中，`*optional_value` 捕获的是可选类型的指针，我们在内部尝试解引用后再一次捕获指针来进行操作。
{% /callout %}

{% /article %}


{% article i18n="en" %}

# Process Control

{% /article %}
