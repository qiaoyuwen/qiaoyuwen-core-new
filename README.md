# Qiaoyuwen Core

## Utils

常用工具实现

## React Hooks

一些常用的 hooks 的实现

## 文档地址

https://qiaoyuwen.github.io/qiaoyuwen-core/

## 初始化
```bash
rush install #安装依赖
rush build #打包
```

## 常用命令

| yarn | rush | 描述 |
| :-- | :-- | :-- |
| yarn install | rush install | 安装依赖 |
| yarn upgrade | rush update | rush update 安装依赖，基于 lock 文件<br> rush update --full 全量更新到符合 package.json 的最新版本 |
| yarn add package-name | rush add -p package-name | yarn add 默认安装版本号为 ^ 开头，可接受小版本更新<br>rush add 默认安装版本号为 ~ 开头，仅接受补丁更新<br>rush add 可通过增加 --caret 参数达到与 yarn add 效果一致<br>rush add 不可一次性安装多个 package |
| yarn add package-name --dev | rush add -p package-name --dev | - |
| yarn remove package-name | - | rush 不提供 remove 命令 |
| - | rush build | 执行文件存在变更（基于 git）的项目的 build 脚本<br>rush build -t @monorepo/app1 表示只构建 @monorepo/app1 及其依赖的 package<br>rush build -T @monorepo/app1 表示只构建 @monorepo/app1 依赖的 package，不包含其本身 |
| - | rush rebuild | 默认执行所有项目的 build 脚本 |
| yarn xxx(自定义脚本) | rushx xxx(自定义脚本) | yarn xxx 执行当前目录下 package.json 中的 xxx 脚本(npm scripts)<br>rushx xxx 同理。可以直接执行 rushx 查看当前项目所支持的脚本命令。 |

## 自定义命令

```bash
rush start-docs #启动本地文档服务
```
