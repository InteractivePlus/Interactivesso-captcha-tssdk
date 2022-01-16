import axios, { AxiosResponse } from 'axios';





interface errMap {
    [errcode: number]: string;
}



const errorCode_ZH: errMap = {
    1: "未知内部错误",
    2: "验证码不存在",
    14: "验证码或通信密钥不正确",
    20: "参数错误"
}

const APIServer = "https://sso-captcha.interactiveplus.org"


interface CaptchaFunc {
    GetCaptcha(scope: string, lang?: string): Promise<void>
    SubmitStatus(captchaID: string, secretPhrase: string, lang?: string): Promise<void>
    SubmitResult(captchaID: string, phrase: string, lang?: string): Promise<void>
}
class Captcha implements CaptchaFunc {

    GetCaptcha(scope: string, lang?: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            axios.get(APIServer + '/captcha?scope=' + scope).then(
                (response: AxiosResponse<any>) => {
                    if (response.data.errorCode != 0 || response.status != 201){
                        if (lang == "zh") response.data.errorDescription = errorCode_ZH[response.data.errorCode]
                        reject(response.data)
                    } 
                    resolve(response.data.data)
                }
            )
        })

    }
   SubmitResult(captchaID: string, phrase: string, lang?: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            axios.get(APIServer + '/captcha/' + captchaID + '/submitResult?phrase=' + phrase).then(
                (response: AxiosResponse<any>) => {
                    if (response.data.errorCode != 0) {
                        if (lang == "zh") response.data.errorDescription = errorCode_ZH[response.data.errorCode]
                        reject(response.data)
                    }
                    resolve(true)
                }
            )
        })
    }

    SubmitStatus(captchaID: string, secretPhrase: string, lang?: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            axios.get(APIServer + '/captcha/' + captchaID + '/submitStatus?secret_phrase=' + secretPhrase).then(
                (response: AxiosResponse<any>) => {
                    if (response.data.errorCode != 0 || response.status != 201){
                        if (lang == "zh") response.data.errorDescription = errorCode_ZH[response.data.errorCode]
                        reject(response.data)
                    } 
                    resolve(response.data.data)
                }
            )
        })
    }


}

export { Captcha };