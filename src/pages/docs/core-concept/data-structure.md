{% article i18n="zh-CN" %}

# 数据结构

## Know about Array

数组是日常敲代码使用相当频繁的类型之一，在 zig 中，数组的分配和 C 类似，均是在内存中连续分配且固定数量的相同类型元素。

因此数组有以下三点特性：

- 长度固定
- 元素必须有相同的类型
- 依次线性排列

在 zig 中，你可以使用以下的方法，来声明并定义一个数组：

```zig
const print = @import("std").debug.print;

pub fn main() void {
    const message = [5]u8{ 'h', 'e', 'l', 'l', 'o' };
    // const message = [_]u8{ 'h', 'e', 'l', 'l', 'o' };
    print("{s}\n", .{message}); // hello
    print("{c}\n", .{message[0]}); // h
}
```

以上代码展示了定义一个字面量数组的方式，其中你可以选择指明数组的大小或者使用 `_` 代替。使用 `_` 时，zig 会尝试自动计算数组的长度。

数组元素是连续放置的，故我们可以使用下标来访问数组的元素，下标索引从 `0` 开始！

关于[越界问题](https://ziglang.org/documentation/master/#Index-out-of-Bounds)，zig 在编译期和运行时均有完整的越界保护和完善的堆栈错误跟踪。

### Multidimensional Arrays

多维数组（矩阵）实际上就是嵌套数组，我们很容易就可以创建一个多维数组出来：

```zig
const print = @import("std").debug.print;

pub fn main() void {
    const matrix_4x4 = [4][4]f32{
        [_]f32{ 1.0, 0.0, 0.0, 0.0 },
        [_]f32{ 0.0, 1.0, 0.0, 1.0 },
        [_]f32{ 0.0, 0.0, 1.0, 0.0 },
        [_]f32{ 0.0, 0.0, 0.0, 1.0 },
    };

    for (matrix_4x4, 0..) |arr_val, arr_index| {
        for (arr_val, 0..) |val, index| {
            print("元素{}-{}是: {}\n", .{ arr_index, index, val });
        }
    }
}
```

在以上的示例中，我们使用了 `for` 循环，来进行矩阵的打印。

### Sentinel-Terminated Arrays

我们使用语法 `[N:x]T` 来描述一个元素为类型 `T`，长度为 `N` 的数组，在它对应 `N` 的索引处的值应该是 `x`。就是这个语法表示数组的长度索引处的元素应该是 `x`，具体可以看下面的示例：

```zig
const print = @import("std").debug.print;

pub fn main() void {
    const array = [_:0]u8{ 1, 2, 3, 4 };
    print("数组长度为: {}\n", .{array.len}); // 4
    print("数组最后一个元素值: {}\n", .{array[array.len - 1]}); // 4
    print("哨兵值为: {}\n", .{array[array.len]}); // 0
}
```

{% callout type="note" title="提示" %}

只有在使用 Sentinel Termination 时，数组才会有索引为数组长度的元素！

{% /callout %}

### Operation

#### Multiplication

可以使用 `**` 对数组做乘法操作，运算符左侧是数组，右侧是倍数，进行矩阵的叠加。

```zig
const print = @import("std").debug.print;

pub fn main() void {
    const small = [3]i8{ 1, 2, 3 };
    const big: [9]i8 = small ** 3;
    print("{any}\n", .{big}); // [9]i8{ 1, 2, 3, 1, 2, 3, 1, 2, 3 }
}
```

#### Series

数组之间可以使用 `++` 进行串联操作（编译期），只要两个数组类型（长度、元素类型）相同，它们就可以串联！

```zig
const print = @import("std").debug.print;

pub fn main() void {
    const part_one = [_]i32{ 1, 2, 3, 4 };
    const part_two = [_]i32{ 5, 6, 7, 8 };
    const all_of_it = part_one ++ part_two; // [_]i32{ 1, 2, 3, 4, 5, 6, 7, 8 }

    _ = all_of_it;
}
```

## String

Zig 会将字符串假定为 UTF-8 编码，这是由于 zig 的源文件本身就是 UTF-8 编码的，任何的非 ASCII 字节均会被作为 UTF-8 字符看待。编译器还不会对字节进行修改，因此如果想把非 UTF-8 字节放入字符串中，可以使用转义 `\xNN`。

Unicode 码点字面量类型是 `comptime_int`，所有的转义字符均可以在字符串和 Unicode 码点中使用。

为了方便处理 UTF-8 和 Unicode ，zig 的标准库 `std.unicode` 中实现了相关的函数来处理它们。

可以参照以下示例：

```zig
const print = @import("std").debug.print;
const mem = @import("std").mem; // 用于比较字节

pub fn main() void {
    const bytes = "hello";
    print("{}\n", .{@TypeOf(bytes)}); // *const [5:0]u8
    print("{d}\n", .{bytes.len}); // 5
    print("{c}\n", .{bytes[1]}); // 'e'
    print("{d}\n", .{bytes[5]}); // 0
    print("{}\n", .{'e' == '\x65'}); // true
    print("{d}\n", .{'\u{1f4a9}'}); // 128169
    print("{d}\n", .{'💯'}); // 128175
    print("{u}\n", .{'⚡'});
    print("{}\n", .{mem.eql(u8, "hello", "h\x65llo")}); // true
    print("{}\n", .{mem.eql(u8, "💯", "\xf0\x9f\x92\xaf")}); // true
    const invalid_utf8 = "\xff\xfe"; // 非UTF-8 字符串可以使用\xNN.
    print("0x{x}\n", .{invalid_utf8[1]}); // 索引它们会返回独立的字节
    print("0x{x}\n", .{"💯"[1]});
}
```

### Multiple Lines of String

如果要使用多行字符串，可以使用 `\\`，多行字符串没有转义，最后一行行尾的换行符号不会包含在字符串中。示例如下：

```zig
const print = @import("std").debug.print;

pub fn main() void {
    const hello_world_in_c =
        \\#include <stdio.h>
        \\
        \\int main(int argc, char **argv) {
        \\    printf("hello world\n");
        \\    return 0;
        \\}
    ;
    print("{s}\n", .{hello_world_in_c});
}
```

## Initialize Array

### By Function

可以使用函数来初始化数组，函数要求返回一个数组的元素或者一个数组。

```zig
const print = @import("std").debug.print;

pub fn main() void {
    const array = [_]i32{make(3)} ** 10;
    print("{any}\n", .{array});
}

fn make(x: i32) i32 {
    return x + 1;
}
```

### By Compile Time

通过编译期来初始化数组，以此来抵消运行时的开销！

```zig
const print = @import("std").debug.print;

pub fn main() void {
    const fancy_array = init: {
        var initial_value: [10]usize = undefined;
        for (&initial_value, 0..) |*pt, i| {
            pt.* = i;
        }
        break :init initial_value;
    };
    print("{any}\n", .{fancy_array});
}
```

这个示例中，我们使用了编译期的功能，来帮助我们实现这个数组的初始化，同时还利用了 `blocks` 和 `break` 的性质。

## Vector

> 向量（Vector）为我们提供了并行操纵一组同类型（布尔、整型、浮点、指针）的值的方法，它尽可能使用 `SIMD` 指令。

### Basic Use

向量支持与底层基本类型相同的内置运算符。这些操作是按元素执行，并返回与输入向量长度相同的向量，包括：

- 算术运算符 (`+`, `-`, `/`, `*`, `@divFloor`, `@sqrt`, `@ceil`, `@log`, ... )
- 位操作符 (`>>`, `<<`, `&`, `|`,`~`, ... )
- 比较远算符 (`<`, `>`, `==`, ...)

禁止对标量（单个数字）和向量的混合使用数学运算符，Zig 提供了 `@splat` 内建函数来轻松从标量转换为向量，并且它支持 `@reduce` 和数组索引语法以从向量转换为标量，向量还支持对具有已知长度的固定长度数组进行赋值，如果需要重新排列元素，可以使用 `@shuffle` 和 `@select` 函数。

{% callout type="note" title="提示" %}
可以使用 `@as` 将向量转为数组。

比目标机器的 `SIMD`大小短的向量的操作通常会编译为单个 `SIMD` 指令，而比目标机器 `SIMD` 大小长的向量将编译为多个 `SIMD` 指令。

如果给定的目标体系架构上不支持 `SIMD`，则编译器将默认依次对每个向量元素进行操作。

Zig 支持任何已知的最大 {% inlineMath %} 2^{32}-1 {% /inlineMath %} 向量长度。请注意，过长的向量长度（例如 {% inlineMath %} 2^{20} {% /inlineMath %}）可能会导致当前版本的 Zig 上的编译器崩溃。
{% /callout %}

### `@splat`

`@splat(scalar: anytype) anytype`

生成一个向量，向量的每个元素均是传入的参数 `scalar`，向量的类型和长度由编译器推断。

```zig
const scalar: u32 = 5;
const result: @Vector(4, u32) = @splat(scalar);
```

### `@reduce`

`@reduce(comptime op: std.builtin.ReduceOp, value: anytype) E`

使用传入的运算符对向量进行水平按顺序合并（_sequential horizontal reduction_），最终得到一个标量。

```zig
const V = @Vector(4, i32);
const value = V{ 1, -1, 1, -1 };

const result = value > @as(V, @splat(0));
// result 是 { true, false, true, false };

const is_all_true = @reduce(.And, result);
// is_all_true 是 false
```

### `@shuffle`

`@shuffle(comptime E: type, a: @Vector(a_len, E), b: @Vector(b_len, E), comptime mask: @Vector(mask_len, i32)) @Vector(mask_len, E)`

根据掩码`mask`（一个向量 Vector），返回向量 `a` 或者向量 `b` 的值，组成一个新的向量，`mask`的长度决定返回的向量的长度，并且逐个根据 `mask` 中的值，来从 `a` 或 `b`选出值，正数是从 `a` 选出指定索引的值（从 `0` 开始，变大），负数是从 b 选出指定索引的值（从 `-1` 开始，变小）。

{% callout type="note" title="提示" %}

- 建议对 b 中的索引使用 `~` 运算符，以便两个索引都可以从 0 开始（即 `~@as(i32, 0)` 为 `-1`）。
- 对于每个 `mask` 挑选出来的元素，如果它从 `A` 或 `B` 中的选出的值是 `undefined`，则结果元素也是 `undefined`。
- `mask` 中的元素索引越界会产生编译错误。
- 如果 `a` 或 `b` 是 `undefined`，该变量长度相当于另一个非 `undefined` 变量的长度。如果两个向量均是 `undefined`，则 `@shuffle` 返回所有元素是 `undefined` 的向量

{% /callout %}

```zig
const a = @Vector(7, u8){ 'o', 'l', 'h', 'e', 'r', 'z', 'w' };
const b = @Vector(4, u8){ 'w', 'd', '!', 'x' };

const mask1 = @Vector(5, i32){ 2, 3, 1, 1, 0 };
const res1: @Vector(5, u8) = @shuffle(u8, a, undefined, mask1);
// res的值是 hello

// Combining two vectors
const mask2 = @Vector(6, i32){ -1, 0, 4, 1, -2, -3 };
const res2: @Vector(6, u8) = @shuffle(u8, a, b, mask2);
// res2 的值是 world!
```

### `@select`

`@select(comptime T: type, pred: @Vector(len, bool), a: @Vector(len, T), b: @Vector(len, T)) @Vector(len, T)`

根据 `pred`（一个元素全为布尔类型的向量）从 `a` 或 `b` 中按元素选择值。如果 `pred[i]` 为 `true`，则结果中的相应元素将为 `a[i]`，否则为 `b[i]`。

```zig
const ele_4 = @Vector(4, i32);

// 向量必须拥有编译期已知的长度和类型
const a = ele_4{ 1, 2, 3, 4 };
const b = ele_4{ 5, 6, 7, 8 };

const pred = @Vector(4, bool){
    true,
    false,
    false,
    true,
};

const c = @select(i32, pred, a, b);
// c 是 { 1, 6, 7, 4 }
```

## Pointer

> zig 作为一门 low level 语言，那肯定要有指针的。

指针是指向一块内存区域地址的变量，它存储了一个地址，我们可以通过指针来操作其指向内存区域。

取地址：通过 & 符号来获取某个变量所对应的内存地址，如 &integer 就是获取变量 integer 的内存地址。

Zig 的指针和 C 的指针略有不同，包含两种指针，一种单项（_single-item_）指针，一种是多项（_many-item_）指针，它们的解引用的方式也略有不同。

{% callout type="note" title="指针运算" %}

Zig 本身支持指针运算（加减操作），但有一点需要注意：最好将指针分配给 `[*]T` 类型后再进行计算。

尤其是在切片中，不可直接对其指针进行更改，这会破坏切片的内部结构！
{% /callout %}

### Single Pointer

单项指针指向单个元素。

单项指针的类型为：`*T`，`T`是所指向内存区域的类型，解引用方法是 `ptr.*`。

```zig
const print = @import("std").debug.print;

pub fn main() !void {
    var integer: i16 = 666;
    const ptr = &integer;
    ptr.* = ptr.* + 1;

    print("{}\n", .{integer}); // 667
}
```

### Multiple Pointers

多项指针指向位置数量的多个元素。

多项指针的类型为：`[*]T`，`T`是所指向内存区域的类型，且该类型必须具有明确的大小（这意味着它不能是 anyopaque 和其他任意不透明类型）。

解引用方法支持以下几种：

- 索引语法 `ptr[i]`
- 切片语法 `ptr[start..end]`
- 指针运算 `ptr + x`，`ptr - x`

```zig
const print = @import("std").debug.print;

pub fn main() !void {
    const array = [_]i32{ 1, 2, 3, 4 };
    const ptr: [*]const i32 = &array;

    print("第一个元素：{}\n", .{ptr[0]});
}
```

{% callout type="note" title="提示" %}
对于数组和切片，它们也有对应的指针类型。

数组：`*[N]T`，`N`是数组的长度，它相当于一个指向数组的单项指针。

切片：`[]T`，它相当于一个胖指针，包含了一个 指针类型 `[*]T` 和 长度。

数组和切片的指针都存储了长度，因此它们除了指针默认的语法外，还有一个额外的语法 `ptr.len`，用来获取它们的长度。

```zig
const print = @import("std").debug.print;

pub fn main() !void {
    const array = [_]i32{ 1, 2, 3, 4 };
    const ptr: [*]const i32 = &array;

    print("第一个元素：{}\n", .{ptr[0]});
}
```

{% /callout %}

#### Sentinel Pointer

哨兵指针就和哨兵数组类似，我们使用语法 `[*:x]T`，这个指针标记了边界的值，故称为“哨兵”。

它的长度有标记值 `x` 来确定，这样做的好处就是提供了针对缓冲区溢出和过度读取的保护。

{% callout type="book" title="例子" %}
我们接下来演示一个示例，该示例中使用了 zig 可以无缝与 C 交互的特性，故你可以暂时略过这里！

```zig
const std = @import("std");

// 我们也可以用 std.c.printf 代替
pub extern "c" fn printf(format: [*:0]const u8, ...) c_int;

pub fn main() anyerror!void {
    _ = printf("Hello, world!\n"); // OK
}
```

以上代码编译需要额外连接 `libc` ，你只需要在你的 `build.zig` 中添加 `exe.linkLibC();` 即可。
{% /callout %}

### Difference between Multiple Pointers and Single Pointer

本部分专门用于解释并区别单向指针和多项指针！

先列出以下类型：

{% table %}

- 类型
- 解释

---

- `[4] const u8`
- 该类型代表的是一个长度为 `4` 的数组，数组内的元素类型为 `const u8`

---

- `[] const u8`
- 该类型代表的是一个切片，切片内元素类型为 `const u8`

---

- `*[4] const u8`
- 该类型代表的是一个指针，它指向一个内存地址，内存中该地址存储着一个长度为 `4` 的数组，数组内的元素类型为 `const u8`

---

- `*[] const u8`
- 该类型代表的是一个指针，它指向一个内存地址，内存中该地址存储着一个切片

---

- `[*] const u8`
- 该类型代表的是一个指针，它指向一个内存地址，内存中该地址存储着一个数组，但长度未知！

{% /table %}

其中 `[*] const u8` 可以看作是 C 中的 `* const char`，这是因为在 C 语言中一个普通的指针也可以指向一个数组，zig 仅仅是单独把这种令人迷惑的行为单独作为一个语法而已！

### Extra Pointer Features

#### volatile

对指针的操作应假定为没有副作用。如果存在副作用，例如使用内存映射输入输出（_Memory Mapped Input/Output_），则需要使用 `volatile` 关键字来修饰。

在以下代码中，保证使用 `mmio_ptr` 的值进行操作（这里你看起来可能会感到迷惑，在编译代码时，编译器可以能会让值在实际运行过程中进行缓存，这里保证每次都使用 `mmio_ptr` 的值，以避免无法正确触发 “副作用”），并保证了代码执行的顺序。

```zig
// expect 是单元测试的断言函数
const expect = @import("std").testing.expect;

pub fn main() !void {
    const mmio_ptr: *volatile u8 = @ptrFromInt(0x12345678);
    try expect(@TypeOf(mmio_ptr) == *volatile u8);
}
```

#### Memory Alignment

每种类型都有一个对齐方式——数个字节，这样，当从内存加载或存储该类型的值时，内存地址必须能被该数字整除。我们可以使用 `@alignOf` 找出任何类型的内存对齐大小。

内存对齐大小取决于 CPU 架构，但始终是 `2` 的幂，并且小于 `1 << 29`。

在 Zig 中，指针类型具有对齐值。如果该值等于基础类型的对齐方式，则可以从类型中省略它：

```zig
const std = @import("std");
const builtin = @import("builtin");
const expect = std.testing.expect;

pub fn main() !void {
    var x: i32 = 1234;
    // 获取内存对齐信息
    const align_of_i32 = @alignOf(@TypeOf(x));
    // 尝试比较类型
    try expect(@TypeOf(&x) == *i32);
    // 尝试在设置内存对齐后再进行类型比较
    try expect(*i32 == *align(align_of_i32) i32);

    if (builtin.target.cpu.arch == .x86_64) {
        // 获取了 x86_64 架构的指针对齐大小
        try expect(@typeInfo(*i32).Pointer.alignment == 4);
    }
}
```

{% callout type="note" title="提示" %}
和 `*i32` 类型可以强制转换为 `*const i32` 类型类似，具有较大对齐大小的指针可以隐式转换为具有较小对齐大小的指针，但反之则不然。

如果有一个指针或切片的对齐方式较小，但知道它实际上具有较大的对齐方式，请使用 `@alignCast` 将指针更改为更对齐的指针，例如：`@as([]align(4) u8, @alignCast(slice4))`，这在运行时无操作，但插入了安全检查。

```zig
const expect = @import("std").testing.expect;

// 全局变量
var foo: u8 align(4) = 100;

fn derp() align(@sizeOf(usize) * 2) i32 {
    return 1234;
}

// 以下是两个函数
fn noop1() align(1) void {}
fn noop4() align(4) void {}

pub fn main() !void {
    // 全局变量对齐
    try expect(@typeInfo(@TypeOf(&foo)).Pointer.alignment == 4);
    try expect(@TypeOf(&foo) == *align(4) u8);
    const as_pointer_to_array: *align(4) [1]u8 = &foo;
    const as_slice: []align(4) u8 = as_pointer_to_array;
    const as_unaligned_slice: []u8 = as_slice;
    try expect(as_unaligned_slice[0] == 100);

    // 函数对齐
    try expect(derp() == 1234);
    try expect(@TypeOf(derp) == fn () i32);
    try expect(@TypeOf(&derp) == *align(@sizeOf(usize) * 2) const fn () i32);

    noop1();
    try expect(@TypeOf(noop1) == fn () void);
    try expect(@TypeOf(&noop1) == *align(1) const fn () void);

    noop4();
    try expect(@TypeOf(noop4) == fn () void);
    try expect(@TypeOf(&noop4) == *align(4) const fn () void);
}
```

{% /callout %}

#### Zero Pointer

零指针实际上是一个未定义的错误行为（_Pointer Cast Invalid Null_），但是当我们给指针增加上 `allowzero` 修饰符后，它就变成合法的行为了！

{% callout type="note" title="零指针的使用" %}

请只在目标 OS 为 `freestanding` 时使用零指针，如果想表示 `null` 指针，请使用可选类型！

{% /callout %}

```zig
// 本示例中仅仅是构建了一个零指针
// 并未使用，故可以在所有平台运行
const std = @import("std");
const expect = std.testing.expect;

pub fn main() !void {
    const zero: usize = 0;
    const ptr: *allowzero i32 = @ptrFromInt(zero);
    try expect(@intFromPtr(ptr) == 0);
}
```

#### Compile Time

只要代码不依赖于未定义的内存布局，那么指针也可以在编译期发挥作用！

```zig
const expect = @import("std").testing.expect;

pub fn main() void {
    comptime {
        // 在这个 comptime 块中，可以正常使用pointer
        // 不依赖于编译结果的内存布局，即在编译期时不依赖于未定义的内存布局
        var x: i32 = 1;
        const ptr = &x;
        ptr.* += 1;
        x += 1;
        try expect(ptr.* == 3);
    }
}
```

## Slices

切片和数组看起来上很像，在实际使用时，你可能会想要使用切片，因为它相对数组来说，要更加灵活！

你可以对数组、切片、数组指针进行切片操作！

接下来我们演示切片的使用方式：

```zig
var array = [_]i32{ 1, 2, 3, 4 };

const len: usize = 3;
const slice: []i32 = array[0..len];

for (slice, 0..) |ele, index| {
    print("第{}个元素为：{}\n", .{ index + 1, ele });
}
print("slice 类型为{}\n", .{@TypeOf(slice)});

const slice_2: []i32 = array[0..array.len];
print("slice_2 类型为{}\n", .{@TypeOf(slice_2)});
```

打印结果：

```text
第1个元素为：1
第2个元素为：2
第3个元素为：3
slice 类型为[]i32
slice_2 类型为[]i32
```

切片的使用方式就是类似数组，不过`[]`中的是索引的边界值，遵循“左闭右开”规则。

以上我们对数组取切片，左边界值为`0`,右边界值为 `len` 变量。

注意，这里说的是边界值有一个是变量（运行时可知），如果两个边界值均是编译期可知的话，编译器会直接将切片优化为数组指针。

{% callout type="note" title="切片的本质" %}
它本质是一个胖指针，包含了一个 指针类型 `[*]T` 和 长度。

同时，它的指针 `slice.ptr` 和长度 `slice.len` 均是可以操作的，但在实践中，请不要操作它们，这容易破坏切片的内部结构（除非你有把握每次都能正确的处理它们）。
{% /callout %}

### Slices Pointer

切片本身除了具有 `len` 属性外，还具有 `ptr` 属性，这意味着我们可以通过语法 `slice.ptr` 来操作切片的指针，它是一个多项指针！

当我们对切片元素取地址（`&`）时，得到的是单项指针。

同时，切片本身还有边界检查，但是对切片指针做操作则不会有边界检查！

```zig
var array = [_]i32{ 1, 2, 3, 4 };

// 边界使用变量，保证切片不会被优化为数组指针
const len: usize = 3;

var slice: []i32 = array[0..len];

print("slice.ptr 类型为{}\n", .{@TypeOf(slice.ptr)});
print("slice 的索引 0 取地址，得到指针类型为{}\n", .{@TypeOf(&slice[0])});
```

打印结果如下：

```text
slice.ptr 类型为[*]i32
slice 的索引 0 取地址，得到指针类型为*i32
```

### Sentinel Slices

语法 `[:x]T` 是一个切片，它具有运行时已知的长度，并且还保证由该长度索引的元素的标记值。该类型不保证在此之前不存在哨兵元素，哨兵终止的切片允许元素访问 `len` 索引。

哨兵切片也可以使用切片语法 `data[start..end :x]` 的变体来创建，其中 `data` 是多项指针、数组或切片，`x` 是哨兵值。

哨兵切片认定哨兵位置处的元素是哨兵值，如果不是这种情况，则会触发安全保护中的未定义问题。

```zig
// 显式声明切片类型
const str_slice: [:0]const u8 = "hello";
print("str_slice类型：{}\n", .{@TypeOf(str_slice)});

var array = [_]u8{ 3, 2, 1, 0, 3, 2, 1, 0 };
const runtime_length: usize = 3;
const slice: [:0]u8 = array[0..runtime_length :0];
print("slice类型：{}\n", .{@TypeOf(slice)});
```

打印结果：

```text
str_slice类型：[:0]const u8
slice类型：[:0]u8
```

## Structure

> 结构体本身是一个高级的数据结构，用于将多个数据表示为一个整体。

### Basic Use

结构体的组成：

- 首部关键字 `struct`
- 和变量定义一样的结构体名字
- 多个字段
- 方法
- 多个声明

以下是一个简短的结构体声明：

```zig
const Circle = struct {
    radius: u8,

    const PI: f16 = 3.14;

    pub fn init(radius: u8) Circle {
        return Circle{ .radius = radius };
    }

    fn area(self: *Circle) f16 {
        return @as(f16, @floatFromInt(self.radius * self.radius)) * PI;
    }
};
```

上方的代码的内容：

- 定义了一个结构体 `Circle`，用于表示一个圆
- 包含字段 `radius`
- 一个声明 `PI`
- 包含两个方法 `init` 和 `area`

{% callout type="note" title="提示" %}
值得注意的是，结构体的方法除了使用 `.` 语法来使用外，和其他的函数没有任何区别！这意味着你可以在任何你用普通函数的地方使用结构体的方法。
{% /callout %}

### Self-reference

常见的自引用方式是函数第一个参数为结构体指针类型，例如：

```zig
const TT = struct {
    pub fn print(self: *TT) void {
        _ = self; // _ 表示不使用变量
        std.debug.print("Hello, world!\n", .{});
    }
};
```

{% /article %}

{% article i18n="en" %}

# Data Structure

{% /article %}
