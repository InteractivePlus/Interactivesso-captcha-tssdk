interface CaptchaInfo {
    captcha_id: String;
    expire_time: number;
    captcha_data: {
        width: 150;
        height: 40;
        jpegBase64: String;
    };
    phraseLen: number;
}
interface CheckCaptchaStatusInfo {
    scope: String;
}
declare class SSOCaptchaServerSDK {
    serverUrl: string | String;
    constructor(serverUrl?: String);
    GetCaptcha(scope: string, lang?: 'zh' | 'en'): Promise<CaptchaInfo>;
    submitCaptcha(captchaID: string, phrase: string, lang?: 'zh' | 'en'): Promise<void>;
    getSubmitStatus(captchaID: string, secretPhrase: string, lang?: 'zh' | 'en'): Promise<CheckCaptchaStatusInfo>;
}
export { SSOCaptchaServerSDK };
