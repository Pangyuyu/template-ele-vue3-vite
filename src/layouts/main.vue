<template>
  <div style="overflow: hidden">
    <!-- main主体 -->
    <div class="main">
      <!-- menu左侧菜单 -->
      <div class="menu">
        <el-menu
          :uniqueOpened="true"
          :default-active="active"
          background-color="#323a5f"
          text-color="#848BAD"
          active-text-color="#fff"
          :router="true"
          :collapse="isCollapse"
          class="el-menu-vertical-demo"
        >
          <template v-for="(item, index) in menuList" :key="index">
            <el-menu-item :index="item.path">
              <el-icon>
                <img class="menu-icon" :src="item.icon" />
              </el-icon>
              <template #title style="flex-grow: 1">{{ item.name }}</template>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
      <!-- content页面内容 -->
      <div class="content">
        <!-- header头部 -->
        <Header></Header>
        <!-- 面包屑 注释掉的原因：当前菜单没有多级-->
        <!-- <Crumbs></Crumbs> -->
        <div class="pagec">
          <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  onMounted,
  onBeforeMount,
  watch,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import "./Interface/main";
import Header from "@/layouts/components/header.vue";
import Crumbs from "@/layouts/components/crumbs.vue";
import { HomeFilled } from "@element-plus/icons-vue";
import Logger from "@/common/logger/logger";
import stgProject from "@/common/storage/project";
import stgLogin from '@/common/storage/login'
import SysConst from "@/common/model/SysConst";
import utils from "@/common/utils/utils";
export default defineComponent({
  name: "Main",
  components: {
    Header,
    Crumbs,
    HomeFilled,
  },
  setup() {
    const log = new Logger("main.vue");
    const active = ref<string>(""); // 左侧菜单默认选中项
    const store = useStore<any>(); // 使用vuex
    const data: MainDataType = reactive({
      router: useRouter(),
      route: useRoute(),
      menuList: [], //菜单列表
    });
    const isCollapse = ref<boolean>(false);
    const refData = toRefs(data); // 包裹data数据
    watch(
      () => active.value,
      (newValue: string, oldValue: string) => {
        log.debug("菜单选项改变", newValue);
      }
    );
    // 判断是否有菜单
    async function displayMenuList() {
      active.value = data.route.path;
      if (data.menuList.length == 0) {
        let menuList = filterUserMenus()
        data.menuList = menuList.map((item: any) => {
          return {
            ...item
          }
        })
      } else {
        data.menuList = [];
      }
      if (active.value.indexOf("home") > -1) {
        active.value = data.menuList[0].path;
      }
    }

    onBeforeMount(() => {
      displayMenuList();
    });
    onMounted(() => {
      displayTabTitle();
    });
    watch(
      () => store.getters.menuIsCollapse,
      (newValue, oldValue) => {
        isCollapse.value = store.getters.menuIsCollapse;
      }
    );
    watch(
      () => store.getters.owenProjectId,
      (newValue: string, oldValue: string) => {
        log.debug("watch owenProjectId", newValue);
        displayTabTitle();
      }
    );
    watch(
      () => store.getters.isLogin,
      (newValue: string, oldValue: string) => {
        displayTabTitle();
      }
    );
    function displayTabTitle() {
      let tabTitle = SysConst.APP_TITLE;
      if (store.getters.login.isLogin) {
        const project = stgProject.getProject();
        log.debug("owenProject", project);
        if (project && utils.isNotEmpty(project.id)) {
          tabTitle = project.name;
        }
      }
      document.title = tabTitle;
    }
    function filterUserMenus() {
      let menuList = store.state.menu.menus.filter((menu: any) => {
        let has = false;
        const menuRoles = menu.roles
        if (stgLogin.isRoot() || menuRoles.length == 0) {
          has = true
        } else {
          const userRoles = stgProject.getProject().roles
          for (let i = 0; i < menuRoles.length; i++) {
            has = userRoles.indexOf(menuRoles[i]) > -1
            if (has) {
              break
            }
          }
        }
        return has;
      })
      return menuList
    }
    // 返回数据
    return {
      ...refData,
      active,
      isCollapse,
    };
  },
});
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
<style lang="scss">
@import "@/styles/var.scss";
.main {
  // height: calc(100vh - $headerHeight);
  height: 100vh;
  display: flex;
  background-color: #f5f7fd;
  .menu {
    .el-menu {
      height: 100%;
      overflow-y: auto;
      .el-menu-item {
        padding: 0 45px 0 10px !important;
        height: $headerHeight;
      }
      .is-active {
        font-weight: 500;
        background-color: #5473e8 !important;
        border-right: 0px solid #5473e8;
      }
      .menu-icon {
        width: 18px;
        height: 18px;
        margin-right: 5px;
      }
    }
  }
  .content {
    width: 100%;
    background-color: #fff;
    .pagec {
      overflow-y: auto;
      height: calc(100vh - $headerHeight); //模块主显示区域的高度
      margin: 0;
      border-radius: 4px;
    }
  }
}
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.4s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
