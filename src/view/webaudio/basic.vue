<template>
  <div class="vue-page">
    <div class="ctrl-row">
      <el-button class="btn-normal" type="primary" @click="onClickAudioInit()"
        >初始化Audio</el-button
      >
      <el-button
        class="btn-normal"
        type="primary"
        @click="onClickWhiteNoisePlay()"
        >播放白噪音</el-button
      >
      <el-button
        class="btn-normal"
        type="primary"
        @click="onClickWhiteNoiseStop()"
        >停止白噪音</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
//@ts-nocheck
function onClickAudioInit() {
    GlobalAudioInit()
}
function onClickWhiteNoisePlay() {    
    GloablWhiteNoiseNode.connect(GlobalAudioContext.destination);
}
function onClickWhiteNoiseStop(){
    GloablWhiteNoiseNode.disconnect()
}
</script>

<style lang="scss" scoped>
.vue-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px;
}
.ctrl-row {
  display: flex;
}
.btn-normal {
  width: 200px;
  height: 55px;
}
</style>
