import Logger from "@/common/logger/logger";
import stgProject from "@/common/storage/project";
const log = new Logger("store/modules/project.ts");

const state: any = {
  owenProjectId: "", //当前项目ID
};
const mutations = {
  CHANGED_OWEN_PROJECT: (state: any, data: any) => {
    state.owenProjectId = data.id;
  },
};
const actions = {
  CHANGED_OWEN_PROJECT({ commit }: any, project: any) {
    return new Promise((resolve: any, __) => {
      stgProject.saveProject(project);
      commit("CHANGED_OWEN_PROJECT", { id: project.id });
      resolve();
    });
  },
};
export default {
  state,
  mutations,
  actions,
};
