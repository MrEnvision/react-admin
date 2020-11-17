# React项目实战

教程官网：http://www.web-jshtml.cn/#/   视频地址：https://www.bilibili.com/video/BV1Hg4y167v6  官方源码：[react-admin](https://github.com/bigbigtime/react-admin)

**学习内容**：React v16，react-router4，redux, react-redux，Provider和connect，redux-saga，Redux-thunk，PropTypes，组件之间的通讯，调试工具，生命周期，React Hooks，Ant Design UI，Axios路由拦截；

**学习成效**：快速掌握React技术开发，完全自主搭建后台管理系统，路由权限；



## 第1课时

略。

## 第2课时

### 2.1 构建项目

环境安装（如果全局已安装则不需要）

```shell
$npm install -g create-react-app
```

创建项目

```shell
$npx create-react-app react-admin
```

运行项目

```shell
$npm start
```

显示隐藏文件（Webpack 或 Babel 等），注意此操作不可逆

```shell
$npm run eject
```

## 第3课时

### 3.1 react-router-dom

由于 react-router 提供了 router 的核心 api，包括 Router、Route、Switch 等，但是它没有提供 dom 操作进行跳转的 api，因此建议直接使用 React-router-dom，详见[官方文档](https://reacttraining.com/react-router/web/guides/quick-start)。

```shell
$npm install react-router-dom --save-dev
```

### 3.2 路由模式

```jsx
import { Switch, Route, Router, HashRouter, Link } from 'react-router-dom';

class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route component={Home} exact path="/"/>
                    <Route component={About} path="/about"/>
                </Switch>
            </HashRouter>
        )
    }
}
```

解释说明：

1. Switch：在路径相同的情况下，只匹配第一个，这个可以避免重复匹配；例如上面的代码如果没有 Switch 来匹配 /about 的话， Home 和 About 都会显示，但是如果加上 Switch 来匹配 /about 的话，只会显示 Home 是因为第一个被匹配到了，这个时候就需要在 / 上添加 exact 精确匹配来避免了，/ 只有在完全匹配的时候才显示，部分匹配不显示。
2. exact：精准匹配。
3. 路由模式：
- HashRouter：使用 URL 中的 hash（#）部分去创建路由，举例来说，用户访问（简单的说就是URL上会带#号），访问地址会变成这种；http://www.example.com/#/xxxxxxxx
- BrowserRouter：URL 是指向真实 URL 的资源路径，当通过真实 URL 访问网站的时候。意思就是，不带 # 号的实际地址；项目上线后，需要后台处理 url 指向
- 其他模式略

### 3.3 sass 配置

```shell
$npm install node-sass@4.14.1 --save-dev
```

SASS全局变量

> SASS 全局变量的好处是不需要在每一份 scss 文件中使用都单独引入，项目中所有的scss文件均可使用变量和方法。

```shell
$npm install sass-resources-loader --D
```

在 node_modules/react-scripts/config/webpack.config.js 文件中进行配置：

<img src="./noteImg/scss全局变量.png" style="zoom:50%;" />

```json
use: getStyleLoaders(
  {
    importLoaders: 3,
    sourceMap: isEnvProduction && shouldUseSourceMap,
  },
  'sass-loader'
).concat({
  loader: 'sass-resources-loader',
  options: {
    resources: [
      // 这里按照项目的文件路径填写（具体看情况哦！）
      path.resolve(__dirname, './../../../src/styles/main.scss')
    ]
  }
}),
```

上述 main.scss 主要是全局性的公共内容，例如重置样式、全局变量等等：

```scss
// 主要是全局性的公共内容
@import "normalize.scss";  // reset css 文件
@import "scssConfig.scss"; // 全局性 scss 变量
```

## 第4课时

### 4.1 Ant Design

```shell
$npm install antd --save
$npm install babel-plugin-import --save-dev (按需加载包)
```

注意 Ant Design 是按需引用，不像 element UI 你可以选择直接引入全部内容：

```jsx
import React from 'react';
import { Button } from 'antd';
import './App.css';

const App = () => (
  <div className="App">
    <Button type="primary">Button</Button>
  </div>
);

export default App;
```

另外还需要引入样式文件，在初始 `src/App.css` 文件的顶部引入 `antd/dist/antd.css`，注意本项目中已使用全局变量，可以在 `styles/main.scss` 中引入 `@import '~antd/dist/antd.css';`

```scss
@import '~antd/dist/antd.css';
```

### 4.2 Fragment 包裹标签

使用 `<div></div>` 来包裹内容的话会渲染出div标签来，可能会产生冗余标签，如果既能包裹内容又能不渲染新的标签的话可以使用 ` <Fragment></Fragment>`（在vue中我们使用`<template></template>`来包裹内容）。

注意，使用Fragment时需要引入，或者使用React.Fragment：

```js
import {Fragment} from 'react'
```

## 第5课时

### 5.1 函数定义方法

1、箭头函数声明（常用）

```react
class Account extends React.Component {
    click = () => {
        alert('click')
    }

    render() {
        return (
            <div>
                <button onClick={this.click}>点击</button>
            </div>
        )
    }
}
```

2、构造器内声明 - bind绑定

```react
class Account extends React.Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this)
    }

    click() {
        alert('click')
    }

    render() {
        return (
            <div>
                <button onClick={this.click}>点击</button>
            </div>
        )
    }
}
```

3、直接bind绑定，与2的区别在于在使用处绑定this

```react
class Account extends React.Component {
    click() {
        alert('click')
    }

    render() {
        return (
            <div>
                <button onClick={this.click.bind(this)}>点击</button>
            </div>
        )
    }
}
```

4、使用时使用箭头函数

```react
class Account extends React.Component {
    click() {
        alert('click')
    }

    render() {
        return (
            <div>
                <button onClick={() => this.click()}>点击</button>
            </div>
        )
    }
}
```

## 第5课时

略。

