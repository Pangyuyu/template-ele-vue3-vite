import Logger from "@/common/logger/logger";
import stgLogin from "@/common/storage/login";
import stgProject from "@/common/storage/project";
import ApiBase from "@/common/net/public/ApiBase";
const log = new Logger("store/moudles/login.ts");

interface LOGIN {
  isLogin: boolean; //是否登录
  isRoot: boolean; //是否是root用户
}

const state: LOGIN = {
  isLogin: false,
  isRoot: false,
};

const mutations = {
  LOGIN: (state: any, data: any) => {
    log.debug("Login", data);
    state.isLogin = true;
    state.isRoot = false;
  },
  LOGINOUT: (state: any) => {
    log.debug("Login out");
    state.isLogin = false;
    state.isRoot = false;
  },
  LOGIN_KEEP: (state: any) => {
    state.isLogin = true;
  },
};

const actions = {
  /**
   * 登录：账号密码登录成功之后调用
   */
  LOGIN({ commit }: any, loginData: any) {
    return new Promise((resolve: any, __) => {
      stgLogin.saveLoginInfo(loginData);
      ApiBase.setupSessionId(loginData.sessionId);
      commit("LOGIN", { isRoot: loginData.isRoot });
      resolve();
    });
  },
  /**
   * 登录：已经有Session之后自动登录
   */
  LOGINAUTO({ commit }: any, data: any) {
    return new Promise((resolve: any, __) => {
      //TODO 此处尚未完成
      resolve();
    });
  },
  LOGINOUT({ commit }: any) {
    return new Promise((resolve: any, __) => {
      commit("LOGINOUT");
      stgProject.clear();
      stgLogin.clear();
      resolve();
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
