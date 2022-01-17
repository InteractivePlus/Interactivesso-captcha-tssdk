import CaptchaSDK from '../src/index'

const submitCaptchaId = "";
const submitCaptchaPhrase = "";

//Can omit the parameter to the SDK constructor since the default API address is also sso-captcha.interactiveplus.org
let sdkCaller = new CaptchaSDK("https://sso-captcha.interactiveplus.org");

test("Get CaptchaAPI",async () => {
    let getCaptchaInfo = await sdkCaller.getCaptcha('test','zh');
    expect(getCaptchaInfo).toHaveProperty('captcha_id');
    expect(getCaptchaInfo).toHaveProperty('expire_time');
    expect(getCaptchaInfo).toHaveProperty('captcha_data');
    expect(getCaptchaInfo.captcha_data).toHaveProperty('height');
    expect(getCaptchaInfo.captcha_data).toHaveProperty('width');
    expect(getCaptchaInfo.captcha_data).toHaveProperty('jpegBase64');
    expect(getCaptchaInfo.captcha_data).toHaveProperty('phraseLen');
    console.log(getCaptchaInfo);
});

//Initialize a failed case test for the "get defaults and results" api
test("Submit Captcha",async () => {
    let submitCaptchaInfo = await sdkCaller.submitCaptcha(submitCaptchaId, submitCaptchaPhrase, 'zh');
    console.log(submitCaptchaInfo);
})