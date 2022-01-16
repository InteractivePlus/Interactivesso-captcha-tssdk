import {Captcha} from './captcha';

let c = new Captcha()

c.GetCaptcha("dasdasdasd").then(
    (value: any) => {
        console.log(value.captcha_data.jpegBase64)

        c.SubmitStatus(value.captcha_id, "").then(
            (v: any) => {
                console.log(v)
            }
        ).catch(
            (reason: any) => {
                console.log(reason)
            }
        )
    }
)



