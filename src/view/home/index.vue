<template>
  <div class="home">
    <el-card class="box-card" v-for="(item,index) in cardList" :key="index">
      <template #header>
        <div class="card-header">
          <span>{{item.name}}</span>
        </div>
      </template>
      <div></div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from "vue";
export default defineComponent({
  components: {},
  setup() {
    const cardList=ref([
      {
        name:'Element',
      },
      {
        name:'Vite',
      },
      {
        name:'Vue3',
      },
      {
        name:'Element Plus',
      }
    ])
    return {
      cardList
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
