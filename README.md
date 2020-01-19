"proxy": "http://192.168.43.98:8080"
"proxy": "http://192.168.8.114:8080"

### Optional Chaining

- [来源](https://juejin.im/post/5dd4a4015188252a18737535)

> 在javaScript中，对象的属性链访问，很容易因为某一个属性不存在出现 Cannot read property 'xxx' of undefined的问题，那么Optional Chaining就添加了?.操作符，它会先判断前面的值，如果undefined或者null，就结束后面的调用，直接返回undefined;

##### 安装使用
- 安装：
```Node
npminstall--save-dev @babel/plugin-proposal-optional-chaining

yarn add @babel/plugin-proposal-optional-chaining --dev
```
- 配置.babelrc：
```babelrc
{
  "plugins": ["@babel/plugin-proposal-optional-chaining"]
}
```



### react-app-polyfill

- [react-app-polyfill](https://www.npmjs.com/package/react-app-polyfill)
- [React build项目部署后IE浏览器报错：对象不支持"assign"属性或方法的解决](https://www.w3h5.com/post/424.html)

### echarts-for-react

- [echarts-for-react](https://github.com/hustcc/echarts-for-react)
- [echarts-for-react events](https://git.hust.cc/echarts-for-react/#/echarts/events?_k=hb6rba)


### React项目报警告 Can't perform a React state update on an unmounted component
[React项目报警告 Can't perform a React state update on an unmounted component](https://blog.csdn.net/xiaocuizao/article/details/102906594)


### react封装简单的浏览器顶部加载进度条全局组件
[react封装简单的浏览器顶部加载进度条全局组件](https://www.cnblogs.com/leiting/p/10531548.html)
