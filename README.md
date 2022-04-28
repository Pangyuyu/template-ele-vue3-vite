# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

## 注意事项

- 不可使用 yarn v2，因为yarn v2无法下载electron。此问题暂时未解决!
- windows环境下，请使用git bash来运行命令，因为windows本身不识别bash脚本!

## 未解决异常

- [Manifest version 2 is deprecated](https://techdows.com/2021/09/chrome-manifest-v2-extensions.html)  
  浏览器插件Manifest V2 扩展程序将停止工作，异常信息如下：

  ```error
  Manifest version 2 is deprecated, and support will be removed in 2023. See https://developer.chrome.com/blog/mv2-transition/ for more details. 
  ```

- Electron sandbox_bundle.js script failed to run
  - 异常提醒  

  ```error
  [1] [22184:0428/161237.882:ERROR:CONSOLE(160)] "Electron sandbox_bundle.js script failed to run", source: node:electron/js2c/sandbox_bundle (160)
  [1] [22184:0428/161237.882:ERROR:CONSOLE(160)] "TypeError: object null is not iterable (cannot read property Symbol(Symbol.iterator))", source: node:electron/js2c/sandbox_bundle (160)
  ```

  - 相关链接
    - [Electron sandbox_bundle.js script failed to run](https://github.com/electron/electron/issues/32133)
