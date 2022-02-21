<template>
  <div class="home">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Electron</span>
        </div>
      </template>
      <div></div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>vite</span>
        </div>
      </template>
      <div></div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Vue3</span>
        </div>
      </template>
      <div></div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Element-plus</span>
        </div>
      </template>
      <div></div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  components: {},
  setup() {
    return {

    };
  },
});
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content:space-between;
  justify-content: center;
  align-content: flex-start;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    width: 45%;
    height: 480px;
    margin: 10px;

  }
}
</style>
