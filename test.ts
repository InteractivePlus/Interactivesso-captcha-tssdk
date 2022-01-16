import {Captcha} from './captcha';

let c = new Captcha()

c.GetCaptcha("dasdasdasd").then(
    (value: any) => {
        console.log(value.captcha_data.jpegBase64)

        c.SubmitResult("11271588-76f1-46e4-8766-7ce60bc980ba", "11078").then(
            (v: any) => {
               if (v == true) {
                   console.log("That's true")
               }
            }
        ).catch(
            (reason: any) => {
                if (reason == true) {
                    console.log("WDNMD")
                }
            }
        )
    }
)



