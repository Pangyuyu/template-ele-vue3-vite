<template>
  <div style="overflow: hidden">
    <!-- main主体 -->
    <div class="main">
      <!-- menu左侧菜单 -->
      <div class="menu">
        <el-menu default-active="home" background-color="#323a5f" text-color="#848BAD" active-text-color="#fff"
          :collapse="isCollapse" class="el-menu-vertical-demo">
          <template v-for="item in menuList" :key="item.index">
            <el-menu-item v-if="!item.hide&&!item.hasSubs" :index="item.index">
              <el-icon color="#ffffff" class="no-inherit">
                <edit />
              </el-icon>
              <span>{{ item.title }}</span>
            </el-menu-item>
            <el-sub-menu v-else-if="!item.hide" :index="item.index">
              <template #title>
                <el-icon color="#ffffff" class="no-inherit">
                  <location />
                </el-icon>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item v-for="itemSub in item.subs" :key="itemSub.index" :index="itemSub.index">
                <el-icon>
                    <document />
                  </el-icon>
                  <span>{{ itemSub.title }}</span>
              </el-menu-item>
            </el-sub-menu>
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
            <transition>
              <!-- 此处的红色警告没法消除 -->
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
import { useStore } from "vuex";
import Header from "@/layouts/components/header.vue";
import Crumbs from "@/layouts/components/crumbs.vue";
import { HomeFilled } from "@element-plus/icons-vue";
import Logger from "@/common/logger/logger";
import stgProject from "@/common/storage/project";
import stgLogin from '@/common/storage/login'
import SysConst from "@/common/model/SysConst";
import utils from "@/common/utils/utils";
import localDataMenus from '@/common/data/menus.json';
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
    const isCollapse = ref<boolean>(false) //是否水平折叠菜单
    const menuList = ref(new Array())
    function displayMenus() {
      menuList.value = localDataMenus.map(item => {
        return {
          ...item,
          hasSubs: item.subs && item.subs.length > 0
        }
      })
    }

    onBeforeMount(() => {
      displayMenus()
    });
    onMounted(() => {
      displayMenus()
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
      active,
      isCollapse,
      menuList
    };
  },
});
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 800px;
  height: 100%;
}
</style>
<style lang="scss">
@import "@/styles/var.scss";

.child-rootview {
  height: calc(100% - #{$titleBarHeight});
  max-height: cacl(100%-#{$titleBarHeight});
  padding: 5px;
  overflow: hidden;
}

.main {
  // height: calc(100vh - $headerHeight);
  height: 100vh;
  display: flex;
  background-color: #f5f7fd;

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
