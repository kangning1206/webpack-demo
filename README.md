# 安装


```
$npm install
```

> 使用最新 bable7，webpack4；


# 运行


```
$npm run start
```
> 访问 http://127.0.0.1:8080/ 查看

# 编译


```
$npm run build
```



## 扩展 antd 组件

外部公司，在使用antd组件时，如果遇到功能不足时怎么办？大家想到的方法可能是：

1. 自己全新设计一个组件；
2. 提issues给设计者，满足需求；
3. 修改组件源码
4. 扩展组件


优缺点：

1. 开发和设计风格技能要求高，难度大，迫不得已可以这样做；
2. issues的接纳程度，触发是通用性，否则作者不一定接受，而且响应周期长;
3. 可以组件源码基础上进行修改，然后发布为一个新的npm包，进行版本控制，需要记录源码的版本，因为已脱离了原有组件的升级；
4. 继承扩展，是否可以扩展与组件本身和业务目标有关系；

## 继承扩展

### 场景1

step1: 原始组件
```
<SommeComponent />
```

step2: 目标原型

```html
<div>
	<header />
	<SommeComponent />
	<footer />
</div>
```
> 也就是说，我们以组件SommeComponent为UI核心，在其他周围组装


step3: 新组件

```
<NewComponent />
```

### 场景2


step1: 原始组件
```
<SommeComponent />
```

step2: 内嵌式原因

```html
<NewComponent />
```

> 这种组件需要改变组件内部UI，是否可以扩展与被扩展组件本身有关系；

## 穿梭框

[穿梭框 官网演示]https://ant.design/components/transfer-cn/

[github 地址](https://github.com/ant-design/ant-design/blob/master/components/transfer/index.tsx)

1. antd在github上开源的语法typescript，增加了修改成本。
2. 是多个子组件符合而成。
3. 右侧显示数据是内部逻辑处理，类型是数组，对数组重新排序，排序规则业务控制；




需求：对于右侧已选择项目进行排序。


分析：这种需求是场景二，必须修改原有组件UI，



```
const ComponentContainer = (ComposedComponent) => {
  class TempComponent extends Component {

    // 在此生命过程中，获取到 rootNode 属性、dom动态新增ui和事件
    componentDidMount(){


    }

    render() {
      return (
        <ComposedComponent {...this.props} ref='rootNode' />
      );
    }
  }
  return TempComponent;
};

export default ComponentContainer(SommeComponent);

```



方案思路: 

1. 包装组件，给`新组件`设置的props将会全部传递给`原始组件`，保持API的使用一致性；

2. 在新组的相关生命周期过程中，获取`原始组件`的dom或者数据，动态插入UI以及绑定事件。

3. 由于步骤2依赖了组件的UI和数据，请将pageage.json中组件版本，防止升级导致的不兼容；


[预览](https://kangning1206.github.io/webpack-demo/)