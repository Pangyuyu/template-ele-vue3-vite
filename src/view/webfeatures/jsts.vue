<template>
  <div class="vue-page" style="overflow-y: hidden">
    <el-tabs
      v-model="activeName"
      class="xing-tabs"
      type="card"
      style="flex-grow: 1"
    >
      <el-tab-pane name="ex_proxy">
        <template #label>
          <span class="custom-tabs-label">
            <span :class="getPanelLabelClass('ex_proxy')">Proxy</span>
          </span>
        </template>
        <div style="overflow-y: hidden">
          <el-button type="primary" @click="onClickProxy()">测试</el-button>
        </div>
        <div class="panel-warn">
          <div class="item">
            1.<a
              href="javascript:void(0)"
              @click="
                onClickOpenWindowByUrl(
                  'https://juejin.cn/post/6975858843729264653'
                )
              "
              >一篇彻底理解Proxy</a
            >
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import ModalTool from "@/common/ui/ModalTool";
import { ref, onMounted } from "vue";
import ExProxy from "./ExProxy";
const activeName = ref("ex_proxy");
function getPanelLabelClass(lableName: string) {
  if (activeName.value == lableName) {
    return "panel-active";
  }
  return "system-text";
}
function onClickOpenWindowByUrl(url: string) {
  window.EPre.openChildWin("...", url);
}
function onClickProxy() {
  try {
    const info = ExProxy.showDebug();
    console.debug("info", info);
  } catch (ex: any) {
    console.warn(ex);
  }
}
</script>
<style lang="scss" scoped></style>
