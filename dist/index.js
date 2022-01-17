var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import axios from 'axios';
var errorCode_ZH = {
    1: "未知内部错误",
    2: "验证码不存在",
    14: "验证码或通信密钥不正确",
    20: "参数错误"
};
var errCode_EN = {
    1: "Unknown Inner Error",
    2: "Captcha non-existant",
    14: "Phrase is incorrect",
    20: "Parameter Error"
};
var DefaultAPIURL = "https://sso-captcha.interactiveplus.org";
var SSOCaptchaServerSDK = /** @class */ (function () {
    function SSOCaptchaServerSDK(serverUrl) {
        if (serverUrl === void 0) { serverUrl = DefaultAPIURL; }
        if (!serverUrl.endsWith('/')) {
            this.serverUrl = serverUrl;
        }
        else {
            this.serverUrl = serverUrl.substring(0, serverUrl.length - 1);
        }
    }
    SSOCaptchaServerSDK.prototype.GetCaptcha = function (scope, lang) {
        if (lang === void 0) { lang = 'en'; }
        return __awaiter(this, void 0, void 0, function () {
            var response, errO;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.get(this.serverUrl + '/captcha', {
                            params: {
                                scope: scope
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        if (response.data.errorCode != 0 || response.status != 201) {
                            errO = {
                                errorCode: response.data.errorCode
                            };
                            if (lang == "zh")
                                errO.errorDescription = errorCode_ZH[response.data.errorCode];
                            else if (lang == 'en')
                                errO.errorDescription = errCode_EN[response.data.errorCode];
                            throw errO;
                        }
                        return [2 /*return*/, response.data.data];
                }
            });
        });
    };
    SSOCaptchaServerSDK.prototype.submitCaptcha = function (captchaID, phrase, lang) {
        if (lang === void 0) { lang = 'en'; }
        return __awaiter(this, void 0, void 0, function () {
            var response, errO, errO;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.get(this.serverUrl + '/captcha/' + captchaID + '/submitResult', {
                            params: {
                                'phrase': phrase
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        if (response.status != 200) {
                            if (response.data && response.data.errorCode != undefined && response.data.errorCode != 0) {
                                errO = {
                                    errorCode: response.data.errorCode
                                };
                                if (lang == "zh")
                                    errO.errorDescription = errorCode_ZH[response.data.errorCode];
                                else if (lang == 'en')
                                    errO.errorDescription = errCode_EN[response.data.errorCode];
                                throw errO;
                            }
                            else {
                                errO = {
                                    errorCode: 1 //unknown inner error
                                };
                                if (lang == "zh")
                                    errO.errorDescription = errorCode_ZH[1];
                                else if (lang == 'en')
                                    errO.errorDescription = errCode_EN[1];
                                throw errO;
                            }
                        }
                        else {
                            return [2 /*return*/];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SSOCaptchaServerSDK.prototype.getSubmitStatus = function (captchaID, secretPhrase, lang) {
        if (lang === void 0) { lang = 'en'; }
        return __awaiter(this, void 0, void 0, function () {
            var response, errO, errO;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.get(this.serverUrl + '/captcha/' + captchaID + '/submitStatus', {
                            params: {
                                secret_phrase: secretPhrase
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        if (response.status != 200) {
                            if (response.data && response.data.errorCode != undefined && response.data.errorCode != 0) {
                                errO = {
                                    errorCode: response.data.errorCode
                                };
                                if (lang == "zh")
                                    errO.errorDescription = errorCode_ZH[response.data.errorCode];
                                else if (lang == 'en')
                                    errO.errorDescription = errCode_EN[response.data.errorCode];
                                throw errO;
                            }
                            else {
                                errO = {
                                    errorCode: 1 //unknown inner error
                                };
                                if (lang == "zh")
                                    errO.errorDescription = errorCode_ZH[1];
                                else if (lang == 'en')
                                    errO.errorDescription = errCode_EN[1];
                                throw errO;
                            }
                        }
                        else {
                            return [2 /*return*/, response.data.data];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return SSOCaptchaServerSDK;
}());
export { SSOCaptchaServerSDK };
//# sourceMappingURL=index.js.map