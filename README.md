### Usage

```javascript
import jssdk from '@forzoom/jssdk'
Vue.use(jssdk, {
	store: store,
});
jssdk.ready(fn)
jssdk.error(fn)
jssdk.config({
	...params,
})
```

### Version

#### 0.0.3

1. 修复错误

#### 0.1.0

1. 使用rollup构建，发布cjs和esm两个版本内容