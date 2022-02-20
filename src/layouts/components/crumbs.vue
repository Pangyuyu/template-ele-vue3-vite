<template>
  <div class="crumbs">
    <div class="full">
      <template v-for="(item, index) in children" :key="item">
        <span>
          <span v-if="index != 0">/</span>
          <span
            class="ove"
            @click="jumpRouter(item.path)"
            v-if="index != children.length - 1"
          >{{ item.title }}</span>
          <span v-if="index === children.length - 1" class="ove bu">
            {{
              item.title
            }}
          </span>
        </span>
      </template>
    </div>
    <!-- <el-button class="ctrlbtn" type="success" size="medium">操作</el-button> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import "@/layouts/Interface/crumbs";
export default defineComponent({
  name: "Crumbs",
  setup() {
    // const store = useStore<any>();
    const data: CrumbsDataType = reactive({
      router: useRouter(),
      route: useRoute(),
      routerList: [], //所有路由数组
      children: [], //子路由数组
      // 跳转路由 ind路由索引
      jumpRouter: (path: string) => {
        data.router.push({ path: path });
      },
    });
    const refData = toRefs(data);
    // 处理路由列表
    function getRouterList(list: Array<ROUTER_LIST>) {
      list.forEach((item: any) => {
        if (item && item.meta && item.meta.title) {
          data.routerList.push({
            path: item.path,
            title: item.meta.title,
          });
        }
        if (item.children && item.children.length > 0) {
          getRouterList(item.children);
        }
      });
    }
    // 处理面包屑需要的路由
    function getCrumbsList() {
      let thisRouterList: string[] = []; //当前路由数组
      thisRouterList = data.route.path.split("/");
      let arr: Array<ROUTER_LIST> = [];
      thisRouterList.forEach((item: string, index: number) => {
        let paths = thisRouterList.slice(0, index + 1).join("/"); // 获取当前路由 以及 当前路由的父级路由
        data.routerList.forEach((val: any) => {
          if (paths === val.path) {
            arr.push(val);
          }
        });
      });
      data.children = arr;
    }
    const allList: Array<ROUTER_LIST> = data.router.options.routes; //全部路由

    getRouterList(allList);
    getCrumbsList();
    // 监听当前路由变化
    watch(
      () => data.route.path,
      () => {
        getCrumbsList();
      }
    );
    return {
      ...refData,
    };
  },
})
</script>

<style lang="scss" scoped>
@import "@/styles/var.scss";
.crumbs {
  height: $headerHeight;
  font-size: 14px;
  line-height: $headerHeight;
  padding-right: 14px;
  padding-left: 14px;
  color: #778ca2;
  border-bottom: 1px solid $lineColor;
  display: flex;
  align-items: center;
  .full {
    flex-grow: 1;
  }
  .ove {
    cursor: pointer;
  }
  .bu {
    color: #252631;
  }
  .ctrlbtn {
    width: 135px;
    height: 35px !important;
  }
}
</style>
