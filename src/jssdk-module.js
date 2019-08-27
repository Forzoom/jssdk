export default {
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
        jssdkErrorCallbacks: [],
    },
    mutations: {
        /**
         * 标记jssdk参数是否经过了缓存
         *
         * @param {boolean} cache
         */
        cacheJSSDKParams(state, cache) {
            state._cacheJSSDKParams = cache;
        },
        /**
         * 设置jssdk参数
         *
         * @param {object} params
         */
        setJSSDKParams(state, params) {
            state.jssdkParams = params;
        },
        /**
         * 设置jssdk是否已经经过了wx.config
         *
         * @param {boolean} config 参数
         */
        setJSSDKConfig(state, config) {
            state.jssdkConfig = config;
        },
        /**
         * 设置jssdk是否已经ready
         *
         * @param {boolean} ready
         */
        setJSSDKReady(state, ready) {
            state.jssdkReady = ready;
        },
        /**
         * 添加jssdk的ready回调
         *
         * @param {} cb 回调函数
         */
        addJSSDKReadyCallback(state, cb) {
            if (state.jssdkReady) {
                cb();
            } else {
                state.jssdkReadyCallbacks.push(cb);
            }
        },
        /**
         * 清空ready的callbacks
         */
        cleanJSSDKReadyCallbacks(state) {
            state.jssdkReadyCallbacks = [];
        },
        /**
         * 设置jssdk是否已经error
         *
         * @param {} error
         */
        setJSSDKError(state, error) {
            state.jssdkError = error;
        },
        /**
         * 设置错误信息的res
         */
        setJSSDKErrorRes(state, res) {
            state.jssdkErrorRes = res;
        },
        /**
         * 添加jssdk的error回到
         *
         * @param {} cb 回调函数
         */
        addJSSDKErrorCallback(state, cb) {
            if (state.jssdkError) {
                cb(state.jssdkErrorRes);
            } else {
                state.jssdkErrorCallbacks.push(cb);
            }
        },
        /**
         * 清空error的callbacks
         */
        cleanJSSDKErrorCallbacks(state) {
            state.jssdkErrorCallbacks = [];
        },
    },
};