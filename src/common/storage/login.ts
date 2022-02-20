import base from "./base";
import utils from "../utils/utils";
export default class login {
  /**
   * 保存登录缓存
   */
  static saveLoginInfo(loginInfo: any) {
    base.setSync("loginInfo", JSON.stringify(loginInfo));
  }
  /**
   * 获取登录缓存
   */
  static getLoginInfo() {
    const value = base.getSync("loginInfo");
    if (utils.isNotEmpty(value)) {
      return JSON.parse(value);
    }
    return {};
  }
  static isRoot() {
    let root = false
    const loginInfo = login.getLoginInfo()
    if (loginInfo && utils.isNotEmpty(loginInfo.permMask)) {
      root = loginInfo.permMask.indexOf("root") > -1
    }
    return root
  }
  static getSessionId(): any {
    const loginInfo = login.getLoginInfo();
    if (loginInfo && utils.isEmpty(loginInfo.sessionId)) {
      return "";
    }
    return loginInfo.sessionId;
  }
  /**
   * 获取用户手机号
   */
  static getPhoneNum(): string {
    let phoneNum = "";
    let loginInfo = login.getLoginInfo();
    if (loginInfo) {
      phoneNum = loginInfo.phone;
    }
    return phoneNum;
  }
  /**单独更改过期时间
   * @param {Object} expireAt 过期时间
   */
  static updateExpireAt(expireAt: number) {
    let loginInfo = login.getLoginInfo();
    loginInfo.sessionExpireAt = expireAt;
    login.saveLoginInfo(loginInfo);
  }

  static getExpireAt(): number {
    const loginInfo = login.getLoginInfo();
    if (loginInfo && utils.isNotEmpty(loginInfo.sessionExpireAt)) {
      return loginInfo.sessionExpireAt;
    }
    return -1;
  }

  /**
   * 清空缓存
   */
  static clear() {
    base.removeSync("loginInfo");
  }
}
