## react-hooks-blog-h5

一款简约的移动端博客。前端项目主要是采用`React17.0`及`Hooks`语法和`Antd-mobile5.0`来搭建的；采用`Webpack4.44`来构建、打包。后端项目主要采用`Node`框架`Koa2`以及`MongoDB`数据库来设计的。

1. PC 版本线上预览地址：[http://www.rasblog.com](http://www.rasblog.com)
2. Vue2 Node PC 版本仓库地址：[https://github.com/Sujb-sus/vue-node-mongodb-blog](https://github.com/Sujb-sus/vue-node-mongodb-blog)
3. Vue3 Vite2 H5 版本仓库地址：[https://github.com/Sujb-sus/vue3-vite2-ts-blog-h5](https://github.com/Sujb-sus/vue3-vite2-ts-blog-h5)

## 项目预览

<img src="./public/index.jpg" height="500px"><img src="./public/label.jpg" height="500px">

<img src="./public/detail.jpg" height="500px"><img src="./public/message.jpg" height="500px">

## 项目结构

<img src="./public/wall-blog-h5.png">

## 技术运用

### 一、rem 适配

1. 安装插件`yarn add amfe-flexible postcss-px2rem-exclude -S`

- `amfe-flexible`是配置可伸缩布局方案，主要是将 1 rem 设为 viewWidth / 10
- `postcss-px2rem-exclude`插件用于将像素（px）单元生成 rem 单位，且可通过配置`exclude`属性忽略 node_modules 目录下的文件转为 rem 单位

2. 在 index.js 导入`amfe-flexible`

```javascript
import "amfe-flexible";
```

3. 在`config/webpack.config.js`配置`postcss-px2rem-exclude`

- 引入`postcss-px2rem-exclude`
- 找到`getStyleLoaders`函数配置`postcss-loader`的地方
- 在`plugins`配置项里添加`px2rem`的配置内容

```javascript
const px2rem = require('postcss-px2rem-exclude');

const getStyleLoaders = (cssOptions, preProcessor) => {
   {
      loader: require.resolve('postcss-loader'),
      options: {
         ident: 'postcss',
         plugins: () => [
         postcssNormalize(),
         px2rem({ remUnit: 37.5, exclude: /node_modules/i }),
         ],
      },
   },
}
```

- remUnit 属性是根据设计稿宽度除以 10 进行设置，假设设计稿为 375，即 remUnit 设为 37.5
- exclude 属性是忽略 node_modules 目录下的文件转为 rem

### 二、`Hooks`运用

1. useState hook

```jsx
const [state, setState] = useState(initialState);
```

- useState()传入 state 的初始值 initialState
- 通过数组解构出 state, setState（更新 state 的方法）

### 三、组件通信

#### 1. 父组件传值给子组件

```jsx
// 父组件
<List hideTitle={true} params={params}></List>
```

```javascript
// 子组件
const List = (props) => {
  // ...
};
```

- 父组件通过属性传值给子组件
- 子组件通过 props 接收父组件的数据

#### 2. 子组件传值给父组件

```jsx
// 父组件
let [params, setParams] = useState({ type: "" });
<LabelSelect params={params} setParams={setParams} />;
```

```javascript
// 子组件
const LabelSelect = (props) => {
  let { params, setParams } = props;

  const handleLabel = () => {
    params.type = "javascript";
    setParams({ ...params });
  };
};
```

- 父组件定义好要传给子组件的方法`setParams`，通过 props 传给子组件
- 子组件接收 props，解构出`setParams`方法
- 通过在子组件中调用该方法，并传入参数`{ ...params }`
- 父组件就能接收子组件传入的参数，更新父组件的`params`数据

**注意：**在 vue 中，子组件接收父组件的 props，是不允许子组件直接修改 props 里面的数据，而 react 是可以的。

## 后端服务

必须得先开启后端服务接口，连接上`MongoDB`数据库，不然前端项目没法预览。这边的服务接口其实是复用了 PC 端`wall-blog`项目的接口。所以如果想要在管理后台添加数据的，需要移至该仓库：[https://github.com/Sujb-sus/vue-node-mongodb-blog](https://github.com/Sujb-sus/vue-node-mongodb-blog)。

该仓库下共有三个项目，PC 管理端（admin）、PC 客户端（client）、后台服务端（server）。`server`项目其实就是本项目的`server`目录，为了方便大家的预览，我 Copy 了一份过来。

- client：博客的 PC 端
- admin：博客的管理端，就是用来添加文章数据、标签数据等等
- server：给博客提供接口服务数据

### 开启后端接口服务

#### 方式一、移至上述所说的仓库地址

该仓库下有详细的描述，主要流程如下：

1. 查看注意事项，先安装、连接好本地的`MongoDB`数据库，开启服务
2. 启动`admin`项目，就可以通过管理后台手动添加数据了

#### 方式二、直接在本项目连接`MongoDB`数据库

1. 项目启动前，需要在本地安装好`MongoDB`数据库；

2. 在`server/config.js`文件配置数据库名、用户以及密码等一些必要的信息；这些信息都可以自定义，但是需要跟`步骤3`同步起来；

```js
// server/config.js
export default {
  env: process.env.NODE_ENV,
  port,
  auth,
  log,
  mongodb: {
    username: "wall", // 数据库用户
    pwd: 123456, // 数据库密码
    address: "localhost:27017",
    db: "wallBlog", // 数据库名
  },
};
```

3. 启动本地的`mongo`服务，给数据库初始化在`server/config.js`配置的一些必要信息；

```js
> mongo // 开启mongo服务
> show dbs // 显示数据库列表
> use wallBlog // 新建一个wallBlog数据库
> db.createUser({user:"wall",pwd:"123456",roles:[{role:"readWrite",db:'wallBlog'}]}) // 在wallBlog数据库创建一个wall用户，密码为123456
> show users // 展示该库有哪些用户
> db.auth("wall", "123456"); // 数据库认证一下用户、密码，返回 1 认证成功
```

4. 进入`server`目录，安装依赖，并开启服务

```js
cd server // 进入server目录
yarn // 安装依赖包
yarn server // 开启后端接口，成功了便会提示数据库连接成功
```

## 注意事项

1. `env.d.ts`文件：用 ts 写的模块在发布的时候仍然是用 js 发布，所以需要一个 d.ts 文件来标记某个 js 库里面对象的类型
2. `models/index.ts`文件：用来定义接口返回的数据的类型，每个数据的类型都需要定义，不然在打包 vue 文件的 html 渲染数据时会有问题；导出需要用`export type {...}`格式导出
3. `components/noData.tsx`文件：引用静态图片时，需要用模块导入的形式导入进来，直接在 html 使用图片路径在打包时，不会自动解析该图片路径
4. `styles/common/iphone_x.scss`文件：提供了适配 iPhonex 全面屏系列的底部间距
5. `tsconfig.json`文件：strict：true 开启所有严格类型检查

## 参考文档

1. ts 中文文档：[https://www.tslang.cn/docs/handbook/compiler-options.html](https://www.tslang.cn/docs/handbook/compiler-options.html)
2. vite 中文文档：[https://cn.vitejs.dev/config/](https://cn.vitejs.dev/config/)
