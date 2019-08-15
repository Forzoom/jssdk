import { PluginFunction, } from 'vue';

declare module '@forzoom/jssdk' {
    const install: PluginFunction<{store: any}>
    function config(params: JSSDKParams): void;
    function ready(fn: jssdkReadyCallback): void;
    function error(fn: jssdkErrorCallback): void;
}

export interface JSSDKState {
    /** 当前是否已经缓存了jssdkParams */
    _cacheJSSDKParams: boolean;
    /** 服务器返回的jssdk参数数据 */
    jssdkParams: JSSDKParams;
    /** 是否已经调用过jssdk.config */
    jssdkConfig: boolean;
    /** jssdk是否ready */
    jssdkReady: boolean;
    /** 所有等待中的ready回调 */
    jssdkReadyCallbacks: jssdkReadyCallback[];
    /** jssdk是否error */
    jssdkError: boolean;
    /** 错误信息 */
    jssdkErrorRes: any;
    /** 所有等待中的error回调 */
    jssdkErrorCallbacks: jssdkErrorCallback[];
}

export interface JSSDKParams {
    debug?: boolean;
    /** 必填，公众号的唯一标识 */
    appId: string;
    /** 必填，生成签名的时间戳 */
    timestamp: number;
    /** 必填，生成签名的随机串 */
    nonceStr: string;
    /** 必填，签名，见附录1 */
    signature: string;
    jsApiList: string[];
}

export type jssdkReadyCallback = () => any;
export type jssdkErrorCallback = (res: any) => any;
