---
title: Zig 安装
pageTitle: Zig - 快速安装
description: 通用的编程语言和工具链.
---

## Mac

Mac 安装 zig 就很方便，但是如果要使用 `nightly` ，还是需要自行下载并添加环境变量

```bash
brew install zig
```

## Linux

Linux 安装的话， 由于发行版的不同，安装的方式五花八门，先列出通过包管理器安装 Zig 的方法，再说明如何手动安装 Zig 并设置环境变量。

### Install by Package Manager

以下列出了支持通过包管理器安装 Zig 的发行版和对应命令：

|发行版|命令|备注|
|:----:|:---:|:---:|
|Arch Linux|`pacman -S zig`|AUR: zig-dev-bin|
|Fedora|`dnf install zig`||	
|Fedora Silverblue|`rpm-ostree install zig`||	
|Gentoo|`emerge -av dev-lang/zig`|	|
|NixOS|`nix-env -i zig`||	
|Ubuntu (snap)|`snap install zig --classic`||	
|Void Linux|`xbps-install -Su zig`|	|

### Install Manually

通过官方的[发布页面](https://ziglang.org/zh/download/)下载对应的 Zig 版本，之后将包含 Zig 二进制的目录加入到 `PATH` 环境变量即可。

## Version Control

由于 Zig 还在快速开发迭代中，因此在使用社区已有类库时，有可能出现新版本 Zig 无法编译的情况，这时候一方面可以跟踪上游进展，看看是否有解决方案；另一个就是使用固定的版本来编译这个项目，显然这种方式更靠谱一些。

目前为止，Zig 的版本管理工具主要有如下几个：

- [marler8997/zigup](https://github.com/marler8997/zigup): Download and manage zig compilers
- [tristanisham/zvm](https://github.com/tristanisham/zvm): Lets you easily install/upgrade between different versions of Zig