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

#### 0.0.1(deprecated)

1. 添加基础功能

#### 0.0.3

1. 修复错误