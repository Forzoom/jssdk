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

### Type

```javascript
import { JSSDKState, } from '@forzoom/jssdk';

interface RootState {
	jssdk: JSSDKState;
}
```