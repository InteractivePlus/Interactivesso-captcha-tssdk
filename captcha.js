"use strict";
exports.__esModule = true;
exports.Captcha = void 0;
var axios_1 = require("axios");
var errorCode_ZH = {
    1: "未知内部错误",
    2: "验证码不存在",
    14: "验证码或通信密钥不正确",
    20: "参数错误"
};
var APIServer = "https://sso-captcha.interactiveplus.org";
axios_1["default"].defaults.timeout = 3000;
var Captcha = /** @class */ (function () {
    function Captcha() {
    }
    Captcha.prototype.GetCaptcha = function (scope, lang) {
        return new Promise(function (resolve, reject) {
            axios_1["default"].get(APIServer + '/captcha?scope=' + scope).then(function (response) {
                if (response.data.errorCode != 0 || response.status != 201) {
                    if (lang == "zh")
                        response.data.errorDescription = errorCode_ZH[response.data.errorCode];
                    reject(response.data);
                }
                resolve(response.data.data);
            });
        });
    };
    Captcha.prototype.SubmitResult = function (captchaID, phrase, lang) {
        return new Promise(function (resolve, reject) {
            axios_1["default"].get(APIServer + '/captcha/' + captchaID + '/submitResult?phrase=' + phrase).then(function (response) {
                if (response.data && response.data.length) {
                    if (response.data.errorCode != 0) {
                        if (lang == "zh")
                            response.data.errorDescription = errorCode_ZH[response.data.errorCode];
                        reject(response.data);
                    }
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    Captcha.prototype.SubmitStatus = function (captchaID, secretPhrase, lang) {
        return new Promise(function (resolve, reject) {
            axios_1["default"].get(APIServer + '/captcha/' + captchaID + '/submitStatus?secret_phrase=' + secretPhrase).then(function (response) {
                if (response.data.errorCode != 0 || response.status != 201) {
                    if (lang == "zh")
                        response.data.errorDescription = errorCode_ZH[response.data.errorCode];
                    reject(response.data);
                }
                resolve(response.data.data);
            });
        });
    };
    return Captcha;
}());
exports.Captcha = Captcha;
