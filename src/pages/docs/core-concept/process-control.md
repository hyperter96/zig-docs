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

Zig 中的三元表达式是通过 `if else` 来实现的：

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
i (val) |value| {
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

## Loops

在 zig 中，循环分为两种，一种是 `while`，一种是 `for`。

### `for`

`for` 循环是另一种循环处理方式，主要用于迭代数组和切片。

它支持 `continue` 和 `break`。

迭代数组和切片：

```zig
const items = [_]i32{ 4, 5, 3, 4, 0 };
var sum: i32 = 0;

for (items) |value| {
    if (value == 0) {
        continue;
    }
    sum += value;
}
```

以上代码中的 `value`，我们称之为对 数组（切片）迭代的值捕获，注意它是只读的。

在迭代时操作数组（切片）：

```zig
var items = [_]i32{ 3, 4, 2 };

for (&items) |*value| {
    value.* += 1;
}
```

以上代码中的 value 是一个指针，我们称之为对 数组（切片）迭代的指针捕获，注意它也是只读的，不过我们可以通过借引用指针来操作数组（切片）的值。

#### Iterate on Numbers

迭代连续的整数很简单，以下是示例：

```zig
for (0..5) |i| {
    _ = i;
    // do something
}
```

#### Iterate on Indices

如果你想在迭代数组（切片）时，也可以访问索引，可以这样做：

```zig
const items = [_]i32{ 4, 5, 3, 4, 0 };
for (items, 0..) |value, i| {
    _ = value;
    _ = i;
    // do something
}
```

以上代码中，其中 `value` 是值，而 `i` 是索引。

#### Multi-objective Iteration

当然，你也可以同时迭代多个目标（数组或者切片），当然这两个迭代的目标要长度一致防止出现未定义的行为。

```zig
const items = [_]usize{ 1, 2, 3 };
const items2 = [_]usize{ 4, 5, 6 };

for (items, items2) |i, j| {
    _ = i;
    _ = j;
    // do something
}
```

#### Use as an Expression

当然，`for` 也可以作为表达式来使用，它的行为和 `while` 一模一样。

```zig
const items = [_]?i32{ 3, 4, null, 5 };

const result = for (items) |value| {
    if (value == 5) {
        break value;
    }
} else 0;
```

#### Mark

`continue` 的效果类似于 `goto`，并不推荐使用，因为它和 `goto` 一样难以把控，以下示例中，`outer` 就是标记。

`break` 的效果就是在标记处的 `while` 执行 `break` 操作，当然，同样不推荐使用。

它们只会增加你的代码复杂性，非必要不使用！

```zig
var count: usize = 0;
outer: for (1..6) |_| {
    for (1..6) |_| {
        count += 1;
        break :outer;
    }
}
```

#### inline

`inline` 关键字会将 `for` 循环展开，这允许代码执行一些一些仅在编译时有效的操作。

需要注意，内联 `for` 循环要求迭代的值和捕获的值均是编译期已知的。

```zig
pub fn main() !void {
    const nums = [_]i32{ 2, 4, 6 };
    var sum: usize = 0;
    inline for (nums) |i| {
        const T = switch (i) {
            2 => f32,
            4 => i8,
            6 => bool,
            else => unreachable,
        };
        sum += typeNameLength(T);
    }
    try expect(sum == 9);
}

fn typeNameLength(comptime T: type) usize {
    return @typeName(T).len;
}
```

### `While`

`while` 循环用于重复执行表达式，直到某些条件不再成立.

基本使用：

```zig
var i: usize = 0;
while (i < 10) {
    if (i == 5) {
        continue;
    }
    std.debug.print("i is {}\n", .{i});
    i += 1;
}
```

#### `continue` Expression

`while` 还支持一个被称为 `continue` 表达式的方法来便于我们控制循环，其内部可以是一个语句或者是一个作用域（`{}` 包裹）

{% /article %}

{% article i18n="en" %}

# Process Control

{% /article %}
