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

### Main

##### jssdk.config

> function(params)

完成jssdk的配置

##### jssdk.ready

> function(cb)

添加一个ready回调

##### jssdk.error

> function(cb)

添加一个error回调

### Module

使用store.registerModule的方式向store中添加了名为jssdk的module
```javascript
store.registerModule('jssdk', jssdkModule);
```

#### State

##### _cacheJSSDKParams

> boolean

当前是否已经缓存了jssdkParams

##### jssdkParams

> 参数信息

服务器返回的jssdk参数数据

##### jssdkConfig

> boolean

是否已经调用过jssdk.config

##### jssdkReady

> boolean

jssdk是否ready

##### jssdkReadyCallbacks

> array

所有等待中的ready回调

##### jssdkError

> boolean

jssdk是否error

##### jssdkErrorRes

> 

错误信息

##### jssdkErrorCallbacks: [],

> array

所有等待中的error回调

#### Mutations

##### cacheJSSDKParams

> function(state, cache)

标记jssdk参数是否经过了缓存

##### setJSSDKParams

> function(state, params)

设置jssdk参数

##### setJSSDKConfig

> function(state, config)

设置jssdk是否已经经过了wx.config

##### setJSSDKReady

> function(state, ready)

设置jssdk是否已经ready

##### addJSSDKReadyCallback

> function(state, cb)

添加jssdk的ready回调

##### cleanJSSDKReadyCallbacks

> function(state)

清空ready的callbacks

##### setJSSDKError

> function(state, error)

设置jssdk是否已经error

##### setJSSDKErrorRes

> function(state, res)

设置错误信息的res

##### addJSSDKErrorCallback

> function(state, cb)

添加jssdk的error回调

##### cleanJSSDKErrorCallbacks

> function(state)

清空error的callbacks
