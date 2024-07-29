{% article i18n="zh-CN" %}

# Union类型

联合类型(*union*)，它实际上用户定义的一种特殊的类型，划分出一块内存空间用来存储多种类型，但同一时间只能存储一个类型。

## Basic Use

联合类型的基本使用：

```zig
const Payload = union {
    int: i64,
    float: f64,
    boolean: bool,
};

pub fn main() !void {
    var payload = Payload{ .int = 1234 };
    payload = Payload{ .int = 9 };
    // var payload_1: Payload = .{ .int = 1234 };

    print("{}\n", .{payload.int});
}
```
{% callout type="note" title="提示" %}
需要注意的是，zig 不保证普通联合类型在内存中的表现形式！如果有需要，可以使用 `extern union` 或者 `packed union` 来保证它遵守 c 的规则。

{% /callout %}

如果要初始化一个在编译期已知的字段名的联合类型，可以使用 `@unionInit`：

`@unionInit(comptime Union: type, comptime active_field_name: []const u8, init_expr) Union`

```zig
const Payload = union {
    int: i64,
    float: f64,
    boolean: bool,
};
// 通过 @unionInit 初始化一个联合类型
const payload = @unionInit(Payload, "int", 666);
```

## Tag Union

联合类型可以在定义时使用枚举进行标记，并且可以通过 `@as` 函数将联合类型直接看作声明的枚举来使用（或比较）。

换种说法，`union` 是普通的联合类型，它可以存储多种值，但它无法跟踪当前值的类型。而 `tag union` 则在 `union` 的基础上可以跟踪当前值的类型，更加安全。

{% callout type="note" title="提示" %}
简单来说，就是标记联合可以辨别当前存储的类型，易于使用。

而普通的联合类型在 `ReleaseSmall` 和 `ReleaseFast` 的构建模式下，将无法检测出普通的联合类型的读取错误，例如将一个 `u64` 存储在一个 `union` 中，然后尝试将其读取为一个 `f64`，这程序员的角度看是非法的，但运行确实正常的！

{% /callout %}

```zig
// 一个枚举，用于给联合类型挂上标记
const ComplexTypeTag = enum {
    ok,
    not_ok,
};

// 带标记的联合类型
const ComplexType = union(ComplexTypeTag) {
    ok: u8,
    not_ok: void,
};

const c = ComplexType{ .ok = 42 };
// 可以直接将标记联合类型作为枚举来使用，这是合法的
try expect(@as(ComplexTypeTag, c) == ComplexTypeTag.ok);

// 使用 switch 进行匹配
switch (c) {
    ComplexTypeTag.ok => |value| try expect(value == 42),
    ComplexTypeTag.not_ok => unreachable,
}

// 使用 zig 的 meta 库获取对应的 tag
try expect(std.meta.Tag(ComplexType) == ComplexTypeTag);
```

如果要修改实际的载荷（即标记联合中的值），你可以使用 `*` 语法捕获指针类型：

```zig
// 枚举，用于给联合类型打上标记
const ComplexTypeTag = enum {
    ok,
    not_ok,
};

// 带标记的联合类型
const ComplexType = union(ComplexTypeTag) {
    ok: u8,
    not_ok: void,
};

var c = ComplexType{ .ok = 42 };

// 使用 switch 进行匹配
switch (c) {
    // 捕获了标记联合值的指针，用于修改值
    ComplexTypeTag.ok => |*value| value.* += 1,
    ComplexTypeTag.not_ok => unreachable,
}

try expect(c.ok == 43);
```

还支持使用 `@tagName` 来获取到对应的 `name`（返回的是一个 `comptime` 的 `[:0]const u8`，也就是字符串）：

```zig
const Small2 = union(enum) {
    a: i32,
    b: bool,
    c: u8,
};

const name = @tagName(Small2.a);
// 这个返回值将会是 a
```

{% callout type="note" title="提示" %}

上面的 `Small2` 也是一个标记联合类型，不过它的标记是一个匿名的枚举类型，并且该枚举类型成员为：`a`, `b`, `c`。

{% /callout %}

## Auto Infer

zig 也支持自动推断联合类型：

```zig
const Number = union {
    int: i32,
    float: f64,
};

// 自动推断
const i: Number = .{ .int = 42 };
```

{% /article %}

{% article i18n="en" %}

# Union Type

{% /article %}
