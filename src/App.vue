<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
    <!-- <div class="versionstyle">{{ version }}</div> -->
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import config from "../package.json";
import { useLoginStore } from '@/store/login'
import CheckUtil from "@/common/utils/CheckUtil";
import sysConst from '@/common/model/SysConst'
import {
  ElConfigProvider,
  ElTabs,
  ElOverlay,
  ElTabPane,
  ElButton,
  ElForm,
  ElFormItem,
  ElDatePicker,
  ElTable,
  ElTableColumn,
  ElDivider,
  ElRadio,
  ElRadioGroup,
  ElCheckbox,
  ElDialog,
  ElCascaderPanel,
  ElRadioButton,

} from "element-plus";
export default defineComponent({
  name: "App",
  components: {
    ElConfigProvider,
    ElOverlay,
    ElTabs,
    ElTabPane,
    ElButton,
    ElForm,
    ElFormItem,
    ElDatePicker,
    ElTable,
    ElTableColumn,
    ElDivider,
    ElRadio,
    ElRadioGroup,
    ElCheckbox,
    ElDialog,
    ElCascaderPanel,
    ElRadioButton,
  },
  setup() {
    const version = ref("");
    const loginStore = useLoginStore()
    onMounted(() => {
      version.value =`${sysConst.APP_TITLE} v${config.version}`;
      if (CheckUtil.session()) {
        loginStore.loginKeep()
      }
    });

    return {
      locale: zhCn,
      version,
    };
  },
});
</script>
<style>
.xing-tabs>.el-tabs__content {
    padding: 32px;
    font-size: 32px;
    font-weight: 600;
}

.xing-tabs .custom-tabs-label .el-icon {
    vertical-align: middle;
}

.xing-tabs .custom-tabs-label span {
    vertical-align: middle;
    margin-left: 4px;
}
</style>
<style lang="scss">
@import "@/styles/scrollbar.scss";
.versionstyle {
  position: fixed;
  right: 10px;
  bottom: 10px;
  color: black;
  height: 25px;
  z-index: 10;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
