<template>
  <div class="header">
    <div class="menuStateOuter">
      <el-image @click="onClickMenuState" fit="scale-down" class="stateImg" :src="menuImgState"></el-image>
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
          <el-button type="text" @click="signOut">退出登录</el-button>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref, onMounted, watch,computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ArrowDown } from "@element-plus/icons-vue";
import Logger from "@/common/logger/logger";
import sysConst from "@/common/model/SysConst";
import modalTool from "@/common/ui/ModalTool";
import imgLoginout from "@/assets/images/loginout.png";
import imgSwitch from "@/assets/images/swich.png";
import defaultavatar from '@/assets/images/defaultavatar.png'
export default defineComponent({
  name: "Header",
  components: {
    ArrowDown,
  },
  setup() {
    const log = new Logger("header.vue");
    const store = useStore<any>(); // 使用vuex
    const router: any = useRouter();
    const menuImgState = ref("");
    const title = ref("");
    onMounted(() => {
      title.value = sysConst.APP_TITLE;
      setMenuImgState();
      title.value = "Vue3+vite+(Electron)模板";
    });
    watch(
      () => store.getters.menuIsCollapse,
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
      await store.dispatch("LOGINOUT");
      router.push({ path: "/login" });
    }
    async function setMenuImgState() {
      let tempImg: any = await import("@/assets/images/logo.png");
      if (store.getters.menuIsCollapse) {
        tempImg = await import("@/assets/images/menu_expand.png");
      } else {
        tempImg = await import("@/assets/images/menu_shrink.png");
      }
      menuImgState.value = tempImg.default;
    }
    function onClickMenuState() {
      store.commit("CHANGE_COLLOPSE_STATE");
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
