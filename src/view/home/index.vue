<template>
  <div class="home">
    <el-card class="box-card" v-for="(item, index) in cardList" :key="index">
      <template #header>
        <div class="card-header">
          <el-image class="icon" fit="scale-down" :src="item.icon"></el-image>
          <div class="title">{{ item.name }}</div>
        </div>
      </template>
      <div class="content">
        <div class="brief">{{ item.brief }}</div>
        <el-divider></el-divider>
        <div class="link-plat">
          <div class="link-item" v-for="(itemLink, linkIndex) in item.websites" :key="linkIndex">
            <el-button class="btn" type="default" plain  @click="onClickItemLink(itemLink)">{{ itemLink.desc }}</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import LocalDataHome from '@/common/data/home.json';
import IconElectron from '@/assets/osc/electron.png';
import IconElementPlus from '@/assets/osc/element-plus.png';
import IconVite from '@/assets/osc/vite.svg';
import IconVue from '@/assets/osc/vue.png';
export default defineComponent({
  components: {},
  setup() {
    const cardList = ref(new Array<any>())
    onMounted(() => {
      cardList.value = LocalDataHome.map((item: any) => {
        const icon = getCardIcon(item.name)
        return {
          ...item,
          icon
        }
      })
    })
    function getCardIcon(cardName: string) {
      if (cardName == 'Electron') return IconElectron
      if (cardName == 'ElementPlus') return IconElementPlus
      if (cardName == 'Vite') return IconVite
      if (cardName == 'Vue3') return IconVue
      return ""
    }
    function onClickItemLink(itemLink: any) {
      console.log("onClickItemLink", itemLink)
      window.EPre.openChildWin(itemLink.desc,itemLink.url)
    }
    return {
      cardList,
      onClickItemLink
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
  justify-content: space-between;
  justify-content: center;
  align-content: flex-start;

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    width: 45%;
    margin: 10px;

    .card-header {
      display: flex;
      flex-direction: row;
      align-items: center;

      .icon {
        width: 32px;
        height: 32px;
      }

      .title {
        padding-left: 10px;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      height: 320px;

      .brief {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 22px;
      }

      .link-plat {
        display: flex;
        height: 55px;

        .btn {
          margin-right: 15px;
        }
      }

    }
  }
}
</style>
