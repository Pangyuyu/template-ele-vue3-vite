import Logger from "@/common/logger/logger";
const log = new Logger("store/moudles/menu.ts");
import icon_home from "@/assets/icons/home.png";
interface MENU {
  name: string;
  path: string;
  icon?: string;
  roles:Array<string>;
  children?: MENU[]; //定义数组类型1
}

interface STATE {
  menus: Array<MENU>; //定义数组类型2
  isCollapse: boolean; //菜单是否收缩
}
const state: STATE = {
  isCollapse: false,
  menus: [
    {
      name: "首页",
      path: "/home",
      icon: icon_home,
      roles:[]
    }
  ],
};
const mutations = {
  SET_MENU: (state: any, data: any) => {
    state.menu = data;
  },
  CHANGE_COLLOPSE_STATE: (state: any) => {
    log.debug("CHANGE_COLLOPSE_STATE");
    state.isCollapse = !state.isCollapse;
  },
};
const action = {};

export default {
  namespace: true,
  state,
  mutations,
  action,
};
