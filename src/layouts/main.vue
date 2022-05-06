<template>
  <div style="overflow: hidden">
    <!-- main主体 -->
    <div class="main">
      <!-- menu左侧菜单 -->
      <div class="menu">
        <el-menu :default-active="menuDefaultActive" background-color="#00000000" text-color="#F0FFFF"
          :collapse="isCollapse" class="el-menu-vertical-demo" active-text-color="#98FB98"
          :router="true"
          @select="elMenuSelect">
          <template v-for="item in menuList" :key="item.index">
            <el-menu-item v-if="!item.hide && !item.hasSubs" :index="item.index" :route="item.path" style="background-color: transparent;">
              <el-icon color="#ffffff" class="no-inherit">
                 <component class="comp_icon" :is="item.icon"></component>
              </el-icon>
              <span>{{ item.title }}</span>
            </el-menu-item>
            <el-sub-menu v-else-if="!item.hide" :index="item.index" style="background-color: transparent;">
              <template #title>
                <el-icon color="#ffffff" class="no-inherit">
                  <component class="comp_icon" :is="item.icon"></component>
                </el-icon>
                <span>{{ item.title }}</span>
              </template>
              <template v-for="itemSub in item.subs" :key="itemSub.index">
                <el-menu-item v-if="!itemSub.hide" :index="itemSub.index" :route="itemSub.path" style="background-color: transparent;">
                  <el-icon>
                    <component class="comp_icon" :is="itemSub.icon"></component>
                  </el-icon>
                  <span>{{ itemSub.title }}</span>
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>
        </el-menu>
      </div>
      <!-- content页面内容 -->
      <div class="content">
        <Header></Header>
        <div class="pagec">
          <router-view v-slot="{ Component }">
            <transition>
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
  ref,
  onMounted,
  onBeforeMount,
  watch,
} from "vue";
import {useMenuStore} from "@/store/menu"
import Header from "@/layouts/components/header.vue";
import Logger from "@/common/logger/logger";
import localDataMenus from '@/common/data/menus.json';
export default defineComponent({
  name: "Main",
  components: {
    Header,
  },
  setup() {
    const log = new Logger("main.vue");
    const active = ref<string>(""); // 左侧菜单默认选中项
    const menuStore=useMenuStore()
    const isCollapse = ref<boolean>(false) //是否水平折叠菜单
    const menuList = ref(new Array())
    const menuDefaultActive=ref("home")
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
      () => menuStore.isCollapse,
      (newValue, oldValue) => {
        isCollapse.value = menuStore.isCollapse;
      }
    );
    function elMenuSelect(index:string,indexPath:string,item:any,routeResult:any) {
      // log.debug("elMenuSelect::index",index)
      // log.debug("elMenuSelect::indexPath",indexPath)
      // menuDefaultActive.value=index
    }
    // 返回数据
    return {
      active,
      isCollapse,
      menuList,
      menuDefaultActive,
      elMenuSelect
    };
  },
});
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 210px;
}
</style>
<style lang="scss" scoped>
@import "@/styles/var.scss";
@import "@/styles/color.scss";
.child-rootview {
  height: calc(100% - #{$titleBarHeight});
  max-height: cacl(100% - #{$titleBarHeight});
  padding: 5px;
  overflow: hidden;
}

.main {
  height: 100vh;
  display: flex;
  background-color: #f5f7fd;
  .menu{
    // background-color:#4169E1
    width: auto;
    background-image: linear-gradient(to bottom, $color_DarkSlateBlue, $color_CornflowerBlue);
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
.comp_icon{
  width: 18px;
  height: 18px;
}
</style>
