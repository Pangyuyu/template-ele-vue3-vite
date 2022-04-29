<template>
  <div class="login login-bg">
    <div class="forms">
      <div class="title">{{ title }}</div>
      <el-form label-width="80px">
        <el-form-item label="用户名：">
          <el-input v-model="LoginData.user" placeholder="请输入用户名" @keyup.enter="loginWithAccount"></el-input>
        </el-form-item>
        <el-form-item label="密&nbsp;&nbsp;&nbsp;&nbsp;码：">
          <el-input
            v-model="LoginData.pwd"
            placeholder="请输入密码"
            show-password
            @keyup.enter="loginWithAccount"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button style="width: 100%" size="default" type="primary" @click="loginWithAccount">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useLoginStore } from '@/store/login'
import modalTool from "@/common/ui/ModalTool";
import sysConst from "@/common/model/SysConst";
import Logger from "@/common/logger/logger";
export default defineComponent({
  name: "Login",
  setup() {
    const log = new Logger("Login.vue");
    const { proxy }: any = getCurrentInstance(); //获取当前实例
    const loginStore = useLoginStore()
    const router = useRouter();
    const title = ref("");
    const LoginData = ref({
      user: "admin", //用户名
      pwd: "123456", //密码
    });
    onMounted(() => {
      title.value = sysConst.APP_TITLE;
      document.title = sysConst.APP_TITLE;
    });
    async function loginWithAccount() {
      modalTool.ShowLoading("登录中...", 0);
      setTimeout(() => {
        modalTool.HideLoading()
        loginSuccess();
      }, 1000)

    }
    async function loginSuccess() {
      router.push({ path: "/home", replace: true });
    }
    return {
      LoginData,
      title,
      loginWithAccount,
    };
  },
})
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .forms {
    width: 400px;
    height: auto;
    padding: 20px;
    background-color: #fff;
    overflow: hidden;
    border-radius: 8px;
    :deep() .el-form-item__label {
      padding: 0 2px 0 0;
    }
    :deep() .el-form-item {
      margin-bottom: 12px;
    }
    .title {
      padding: 10px 0 20px;
      font-size: 20px;
      font-weight: 600;
      text-align: center;
      color: #323a5f;
      letter-spacing: 4px;
    }
    .code {
      width: 120px;
      height: 40px;
      position: absolute;
      right: 0;
      top: 0;
    }
    .btn {
      padding-top: 10px;
    }
  }
}
</style>
