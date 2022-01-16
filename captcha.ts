import axios,{AxiosResponse} from 'axios';



const errorCode_ZH = {
    1: "未知内部错误",
    2: "验证码不存在",
    14: "验证码或通信密钥不正确",
    20: "参数错误"
}

const APIServer = "https://sso-captcha.interactiveplus.org"

interface CaptchaInfo {
    width: number;
    height: number;
    jpegBase64: string;
    phraseLen: number;
}

interface CaptchaScope {
    scope:  string;
}


interface CaptchaPayload<T> {
    errorCode: number;
    errorDescription?:   string;
    credential?:         string;
    errorParam?:         string;
    data?:   T;
}

interface CaptchaFunc {
    GetCaptcha(scope: string, lang?: string): Promise<CaptchaPayload<CaptchaInfo>>
    SubmitStatus(captchaID: string, secretPhrase: string, lang?: string): Promise<CaptchaPayload<CaptchaScope>>
    SubmitResult(captchaID: string, phrase: string, lang?: string): Promise<any>
}
class Captcha implements CaptchaFunc { 
    GetCaptcha(scope: string, lang?: string): Promise<CaptchaPayload<CaptchaInfo>> {
        return new Promise<CaptchaPayload<CaptchaInfo>>((resolve, reject) => {
            axios.get(APIServer+'/captcha?scope='+scope).then(
                (response: AxiosResponse<string>)=> {
                    let ret: CaptchaPayload<CaptchaInfo> = JSON.parse(response.data);
                    if (response.status != 201 || ret.errorCode != 0) {
                        if (lang == "zh") ret.errorDescription = errorCode_ZH[ret.errorCode]
                        reject(ret)
                    }
                    resolve(ret)
                }
            )
        })
    }
    SubmitResult(captchaID: string, phrase: string, lang?: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            axios.get(APIServer+'/captcha/'+captchaID+'/submitResult?phrase='+phrase).then(
                (response: AxiosResponse<string>)=> {
                    let ret: CaptchaPayload<string> = JSON.parse(response.data);
                    if (ret.errorCode != 0) {
                        if (lang == "zh") ret.errorDescription = errorCode_ZH[ret.errorCode]
                        reject(ret)
                    }
                    resolve(true)
                }
            )
        })
    }

    SubmitStatus(captchaID: string, secretPhrase: string, lang?: string): Promise<CaptchaPayload<CaptchaScope>> {
        return new Promise<CaptchaPayload<CaptchaScope>>((resolve, reject) => {
            axios.get(APIServer+'/captcha/'+captchaID+'/submitStatus?secret_phrase='+secretPhrase).then(
                (response: AxiosResponse<string>)=> {
                    let ret: CaptchaPayload<CaptchaScope> = JSON.parse(response.data);
                    if (ret.errorCode != 0) {
                        if (lang == "zh") ret.errorDescription = errorCode_ZH[ret.errorCode]
                        reject(ret)
                    }
                    resolve(ret)
                }
            )
        })
    }

}

export { Captcha };