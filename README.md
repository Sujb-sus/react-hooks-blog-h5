## react-hooks-blog-h5

一款简约版本的移动端博客；主要是采用`React Hooks`和`Material-UI`来搭建的；采用`Webpack4`来构建、打包

#### 项目预览

需要后台接口数据的，请移至该仓库：[https://gitee.com/Sujb/wall-blog](https://gitee.com/Sujb/wall-blog)。

该仓库下共有三个项目，PC 管理端（admin）、PC 客户端（client）、后台服务端（server）。需要先连接本地`MongoDB`数据库，再启动管理端项目，就可以添加数据了。

#### 项目结构

#### 技术应用

##### 一、rem 适配

1. 安装插件`yarn add amfe-flexible postcss-pxtorem -S`

- `amfe-flexible`是配置可伸缩布局方案，主要是将 1 rem 设为 viewWidth / 10
- `postcss-pxtorem`是 postcss 的插件，用于将像素（px）单元生成 rem 单位

2. 在 main.ts 导入`amfe-flexible`

```lang=ts
import 'amfe-flexible';
```

3. 在`postcss.config.js`配置`postcss-pxtorem`

```
module.exports = {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 37.5,
      propList: ["*"],
    },
  },
};
```

- rootValue 根据设计稿宽度除以 10 进行设置，这边假设设计稿为 375，即 rootValue 设为 37.5
- propList 是设置需要转换的属性，这边\*意思就是为所有单位为（px）都进行转换

##### 二、添加 css 前缀

1. 安装插件`yarn add autoprefixer -D`
2. 在`postcss.config.js`配置`autoprefixer`

```
module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ["Android 4.1", "iOS 7.1"],
      grid: true,
    },
  },
};
```

- overrideBrowserslist：浏览器的兼容配置
- grid: true 为 IE 启用网格布局前缀

#### 注意事项
