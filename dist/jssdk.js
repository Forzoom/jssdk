(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.jssdk = factory());
}(this, function () { 'use strict';

    var jssdkModule = {
      state: {
        // 当前是否已经缓存了jssdkParams
        _cacheJSSDKParams: false,
        // 服务器返回的jssdk参数数据
        jssdkParams: {},
        // 是否已经调用过jssdk.config
        jssdkConfig: false,
        // jssdk是否ready
        jssdkReady: false,
        // 所有等待中的ready回调
        jssdkReadyCallbacks: [],
        // jssdk是否error
        jssdkError: false,
        // 错误信息
        jssdkErrorRes: {},
        // 所有等待中的error回调
        jssdkErrorCallbacks: []
      },
      mutations: {
        /**
         * 标记jssdk参数是否经过了缓存
         *
         * @param {boolean} cache
         */
        cacheJSSDKParams: function cacheJSSDKParams(state, cache) {
          state._cacheJSSDKParams = cache;
        },

        /**
         * 设置jssdk参数
         *
         * @param {object} params
         */
        setJSSDKParams: function setJSSDKParams(state, params) {
          state.jssdkParams = params;
        },

        /**
         * 设置jssdk是否已经经过了wx.config
         *
         * @param {boolean} config 参数
         */
        setJSSDKConfig: function setJSSDKConfig(state, config) {
          state.jssdkConfig = config;
        },

        /**
         * 设置jssdk是否已经ready
         *
         * @param {boolean} ready
         */
        setJSSDKReady: function setJSSDKReady(state, ready) {
          state.jssdkReady = ready;
        },

        /**
         * 添加jssdk的ready回调
         *
         * @param {} cb 回调函数
         */
        addJSSDKReadyCallback: function addJSSDKReadyCallback(state, cb) {
          if (state.jssdkReady) {
            cb();
          } else {
            state.jssdkReadyCallbacks.push(cb);
          }
        },

        /**
         * 清空ready的callbacks
         */
        cleanJSSDKReadyCallbacks: function cleanJSSDKReadyCallbacks(state) {
          state.jssdkReadyCallbacks = [];
        },

        /**
         * 设置jssdk是否已经error
         *
         * @param {} error
         */
        setJSSDKError: function setJSSDKError(state, error) {
          state.jssdkError = error;
        },

        /**
         * 设置错误信息的res
         */
        setJSSDKErrorRes: function setJSSDKErrorRes(state, res) {
          state.jssdkErrorRes = res;
        },

        /**
         * 添加jssdk的error回到
         *
         * @param {} cb 回调函数
         */
        addJSSDKErrorCallback: function addJSSDKErrorCallback(state, cb) {
          if (state.jssdkError) {
            cb(state.jssdkErrorRes);
          } else {
            state.jssdkErrorCallbacks.push(cb);
          }
        },

        /**
         * 清空error的callbacks
         */
        cleanJSSDKErrorCallbacks: function cleanJSSDKErrorCallbacks(state) {
          state.jssdkErrorCallbacks = [];
        }
      }
    };

    var jssdk = {
      install: install,
      config: config,
      error: error,
      ready: ready
    }; // 默认的options

    var _options = null; // Vue对象
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

      var store = _options.store;
      var commit = store.commit;

      if (typeof wx === 'undefined') {
        var callbacks = store.state.jssdk.jssdkErrorCallbacks;
        commit('setJSSDKError', true);
        commit('setJSSDKErrorRes', {
          errMsg: '缺少wx'
        });
        callbacks.forEach(function (cb) {
          cb && cb(res);
        });
        commit('cleanJSSDKErrorCallbacks');
        return;
      } // 配置正确存在
      // if (store.state.jssdk.jssdkConfig) {
      //     return;
      // }


      wx.config({
        debug: param.debug || false,
        appId: param.appId,
        // 必填，公众号的唯一标识
        timestamp: param.timestamp,
        // 必填，生成签名的时间戳
        nonceStr: param.nonceStr,
        // 必填，生成签名的随机串
        signature: param.signature,
        // 必填，签名，见附录1
        jsApiList: param.jsApiList
      });
      wx.ready(function () {
        var callbacks = store.state.jssdk.jssdkReadyCallbacks;
        commit('setJSSDKReady', true);
        callbacks.forEach(function (cb) {
          cb && cb();
        });
        commit('cleanJSSDKReadyCallbacks');
      });
      wx.error(function (res) {
        var callbacks = store.state.jssdk.jssdkErrorCallbacks;
        commit('setJSSDKError', true);
        commit('setJSSDKErrorRes', res);
        callbacks.forEach(function (cb) {
          cb && cb(res);
        });
        commit('cleanJSSDKErrorCallbacks');
      }); // todo: 如果jssdk的config失败，但是该变量被设置成true，那么将不会再尝试jssdk的配置

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
      _options = options; // 注册module

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

    return jssdk;

}));
