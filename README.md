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