<template>
  <div class="header">
    <div class="menuStateOuter">
      <el-image @click="onClickMenuState" @click.stop="" fit="scale-down" class="stateImg" :src="menuImgState"></el-image>
    </div>

    <div class="title">{{ title }}</div>
    <div class="empty"></div>
    <div>
      <el-popover placement="bottom-start" :width="60" trigger="click">
        <template #reference>
          <div class="loginUser">
            <div class="img">
              <img :src="defaultavatar" alt="userImg" />
            </div>
            <div class="userName">{{ displayUserName }}</div>
            <el-icon>
              <arrow-down />
            </el-icon>
          </div>
        </template>
        <div class="popoContent">
          <el-image class="img" fit="scale-down" :src="imgLoginout" />
          <el-button type="default" :text="true" @click="signOut">退出登录</el-button>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref, onMounted, watch,computed } from "vue";
import { useMenuStore } from "@/store/menu"
import { useRouter } from "vue-router";
import { ArrowDown } from "@element-plus/icons-vue";
import Logger from "@/common/logger/logger";
import sysConst from "@/common/model/SysConst";
import modalTool from "@/common/ui/ModalTool";
import imgLoginout from "@/assets/images/loginout.png";
import imgSwitch from "@/assets/images/swich.png";
import defaultavatar from '@/assets/images/defaultavatar.png'
import img_logo from "@/assets/images/logo.png"
import img_menu_expand from "@/assets/images/menu_expand.png"
import img_menu_shrink from "@/assets/images/menu_shrink.png"
export default defineComponent({
  name: "Header",
  components: {
    ArrowDown,
  },
  setup() {
    const log = new Logger("header.vue");
    const menuStore=useMenuStore()
    const router: any = useRouter();
    const menuImgState = ref("");
    const title = ref("");
    onMounted(() => {
      title.value = sysConst.APP_TITLE;
      setMenuImgState();
      title.value = "Electron+Vue3+vite+Element-Plus模板";
    });
    watch(
      () => menuStore.isCollapse,
      (newValue, oldValue) => {
        log.debug("watch menuIsCollapse", newValue);
        setMenuImgState();
      }
    );
    const displayUserName=computed(()=>{
      return 'admin'
    })
    // 退出登录
    function signOut() {
      modalTool.ShowAsk("提醒", "您确定要退出登录吗？", () => {
        runSignOut();
      });
    }
    async function runSignOut() {
      // await store.dispatch("LOGINOUT");
      // router.push({ path: "/login" });
    }
    async function setMenuImgState() {
      let tempImg = img_logo;
      if (menuStore.isCollapse) {
        tempImg = img_menu_expand;
      } else {
        tempImg = img_menu_shrink;
      }
      menuImgState.value = tempImg;
    }
    function onClickMenuState() {
      menuStore.changeCollopseState()
    }
    return {
      menuImgState,
      imgLoginout,
      imgSwitch,
      title,
      signOut,
      onClickMenuState,
      displayUserName,
      defaultavatar
    };
  },
})
</script>

<style lang="scss">
@import "@/styles/var.scss";
.header {
  width: 100%;
  height: $headerHeight;
  display: flex;
  align-items: center;
  justify-content: left;
  background-color: #fff;
  box-shadow: 0px 1px 4px 0px #e0dfdf;
  position: relative;
  z-index: 1;
  .menuStateOuter {
    display: flex;
    width: 64px;
    justify-content: center;
    align-items: center;
    .stateImg {
      width: 32px;
      height: 32px;
    }
  }
  .title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    letter-spacing: 4px;
  }
  .loginUser {
    display: flex;
    align-items: center;
    padding-right: 40px;
    cursor: pointer;
    .img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .userName {
      min-width: 40px;
      padding: 0 12px;
      font-size: 14px;
      color: #333;
    }
  }
}
.popoContent {
  display: flex;
  align-items: center;
  .img {
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }
}
</style>
