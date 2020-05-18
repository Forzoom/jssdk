import jssdkModule from './jssdk-module.js';

const jssdk = {
    install: install,
    config: config,
    error: error,
    ready: ready,
};
// 默认的options
let _options = null;
// Vue对象
let _Vue = null;

/**
 * 钩子函数
 */
function config(param) {
    if (!jssdk.install.installed) {
        console.log('[jssdk][fail] invoke Vue.use(jssdk, options) first');
        return;
    }
    if (!_options || !_options.store) {
        console.log('[jssdk][fail] lost options.store');
        return;
    }
    const store = _options.store;
    const commit = store.commit;
    if (typeof wx === 'undefined') {
        const callbacks = store.state.jssdk.jssdkErrorCallbacks;
        commit('setJSSDKError', true);
        commit('setJSSDKErrorRes', {
            errMsg: '缺少wx',
        });
        callbacks.forEach(function(cb) {
            cb && cb(res);
        });
        commit('cleanJSSDKErrorCallbacks');
        return;
    }
    // 配置正确存在
    // if (store.state.jssdk.jssdkConfig) {
    //     return;
    // }
    wx.config({
        beta: param.beta || false,
        debug: param.debug || false,
        appId: param.appId, // 必填，公众号的唯一标识
        timestamp: param.timestamp, // 必填，生成签名的时间戳
        nonceStr: param.nonceStr, // 必填，生成签名的随机串
        signature: param.signature, // 必填，签名，见附录1
        jsApiList: param.jsApiList,
    });
    wx.ready(function() {
        const callbacks = store.state.jssdk.jssdkReadyCallbacks;
        commit('setJSSDKReady', true);
        callbacks.forEach(function(cb) {
            cb && cb();
        });
        commit('cleanJSSDKReadyCallbacks');
    });
    wx.error(function(res) {
        const callbacks = store.state.jssdk.jssdkErrorCallbacks;
        commit('setJSSDKError', true);
        commit('setJSSDKErrorRes', res);
        callbacks.forEach(function(cb) {
            cb && cb(res);
        });
        commit('cleanJSSDKErrorCallbacks');
    });
    // todo: 如果jssdk的config失败，但是该变量被设置成true，那么将不会再尝试jssdk的配置
    commit('setJSSDKConfig', true);
}

/**
 * Vue插件install函数
 *
 * @param {} Vue
 * @param {} options
 *  - store
 *  - 
 */
function install(Vue, options) {
    // 很想知道这里的install是什么
    if (install.installed) {
        return;
    }
    install.installed = true;

    if (!options.store) {
        console.log('[jssdk][fail] lost options.store');
        return;
    }
    if (options.store.state.jssdk) {
        console.log('[jssdk][fail] options.store.state.jssdk already exist');
        return;
    }

    _Vue = Vue;
    _options = options;

    // 注册module
    options.store.registerModule('jssdk', jssdkModule);
}

/**
 * ready回调函数
 *
 * @param {} cb 回调函数
 */
function ready(cb) {
    _options.store.commit('addJSSDKReadyCallback', cb);
}

/**
 * error回调函数
 *
 * @param {} 
 */
function error(cb) {
    _options.store.commit('addJSSDKErrorCallback', cb);
}

export default jssdk;