import axios from 'axios';

interface errMap {
    [errcode: number]: string;
}

const errorCode_ZH: errMap = {
    1: "未知内部错误",
    2: "验证码不存在",
    14: "验证码或通信密钥不正确",
    20: "参数错误"
}

const errCode_EN: errMap = {
    1: "Unknown Inner Error",
    2: "Captcha non-existant",
    14: "Phrase is incorrect",
    20: "Parameter Error"
}

const DefaultAPIURL = "https://sso-captcha.interactiveplus.org";


interface CaptchaError {
    errorCode: number;
    errorDescription?: string;
}

interface APIReturnData<Data>{
    errorCode: number,
    data?: Data
}

interface CaptchaInfo{
    captcha_id: String,
    expire_time: number,
    captcha_data: {
        width: 150,
        height: 40,
        jpegBase64: String,
        phraseLen: number
    }
}

interface CheckCaptchaStatusInfo{
    scope: String
}

class SSOCaptchaServerSDK {
    public serverUrl;
    constructor(serverUrl : String = DefaultAPIURL){
        if(!serverUrl.endsWith('/')){
            this.serverUrl = serverUrl;
        }else{
            this.serverUrl = serverUrl.substring(0,serverUrl.length - 1);
        }
    }

    async getCaptcha(scope: string, lang : 'zh' | 'en' = 'en') : Promise<CaptchaInfo> {
        
        let response = await axios.get<APIReturnData<CaptchaInfo>>(
            this.serverUrl + '/captcha', 
            {
                params:{
                    scope:scope
                }
            }
        );
        
        if (response.data.errorCode != 0 || response.status != 201) {
            let errO : CaptchaError = {
                errorCode: response.data.errorCode
            };

            if (lang == "zh") errO.errorDescription = errorCode_ZH[response.data.errorCode];
            else if (lang == 'en') errO.errorDescription = errCode_EN[response.data.errorCode];
            throw errO;
        }
        return response.data.data as CaptchaInfo;
    }

    async submitCaptcha(captchaID: string, phrase: string, lang : 'zh' | 'en' = 'en'): Promise<void> {
        let response = await axios.get<APIReturnData<void>>(
            this.serverUrl + '/captcha/' + captchaID + '/submitResult',
            {
                params: {
                    'phrase': phrase
                }
            }
        );
        if (response.data && response.data.errorCode != undefined && response.data.errorCode != 0) {
            let errO : CaptchaError = {
                errorCode: response.data.errorCode
            };

            if (lang == "zh") errO.errorDescription = errorCode_ZH[response.data.errorCode];
            else if (lang == 'en') errO.errorDescription = errCode_EN[response.data.errorCode];
            throw errO;
        }else if(response.status != 200 || response.data.errorCode == undefined){
            let errO : CaptchaError = {
                errorCode: 1 //unknown inner error
            };

            if (lang == "zh") errO.errorDescription = errorCode_ZH[1];
            else if (lang == 'en') errO.errorDescription = errCode_EN[1];
            throw errO;
        } else {
            return;
        }
    }

    async getSubmitStatus(captchaID: string, secretPhrase: string, lang : 'zh' | 'en' = 'en'): Promise<CheckCaptchaStatusInfo> {
        
        let response = await axios.get<APIReturnData<CheckCaptchaStatusInfo>>(
            this.serverUrl + '/captcha/' + captchaID + '/submitStatus',
            {
                params:{
                    secret_phrase: secretPhrase
                }
            }
        );
        
        
        if (response.data && response.data.errorCode != undefined && response.data.errorCode != 0) {
            let errO : CaptchaError = {
                errorCode: response.data.errorCode
            };

            if (lang == "zh") errO.errorDescription = errorCode_ZH[response.data.errorCode];
            else if (lang == 'en') errO.errorDescription = errCode_EN[response.data.errorCode];
            throw errO;
        }else if(response.status != 200 || response.data.errorCode == undefined){
            let errO : CaptchaError = {
                errorCode: 1 //unknown inner error
            };

            if (lang == "zh") errO.errorDescription = errorCode_ZH[1];
            else if (lang == 'en') errO.errorDescription = errCode_EN[1];
            throw errO;
        }else{
            return response.data.data as CheckCaptchaStatusInfo;
        }
    }
}

export default SSOCaptchaServerSDK;