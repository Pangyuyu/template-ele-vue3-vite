<template>
    <el-dialog v-model="vis" :title="title" width="560px">
        <el-form ref="formAreaEdit" label-width="120px" :model="formData" :rules="formRules">
            <el-form-item label="区" prop="name">
                <div class="formItem">
                    <el-input v-model="formData.name" placeholder="请输入客户姓名" class="input"></el-input>
                </div>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <div class="formItem">
                    <el-input v-model="formData.phone" placeholder="请输入客户手机号" class="input"></el-input>
                </div>
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <div class="formItem">
                    <el-input v-model="formData.address" placeholder="请输入客户客户地址" class="input"></el-input>
                </div>
            </el-form-item>
        </el-form>
        <div class="footer">
            <div class="empty"></div>
            <el-button class="btn" type="info" @click="onClickCancel()">取消</el-button>
            <el-button class="btn" type="success" @click="onClickConfirm()">确定</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref} from "vue";
const vis = ref(false)
const title = ref("修改/添加客户")
const isAdd = ref(true)
const formData = ref({
    id: '',
    name: "",
    address: "",
    phone: ""
})
const formRules = ref<any>({
    name: [
        {
            required: true,
            message: "客户姓名不可为空!",
            trigger: "blur",
        }
    ]
})
function open(args: any) {
    isAdd.value = args == undefined || args == null || args.id == undefined || args.id == null || args.id.length == 0
    if (isAdd.value) {
        formData.value = {
            id: "",
            name: "",
            address: "",
            phone: ""
        }
    } else {
        formData.value = {
            id: isAdd.value ? "" : args.id,
            name: args.name,
            address: args.address,
            phone: args.phone
        }
    }

    vis.value = true
}
function onClickCancel() {
    vis.value = false
}
function onClickConfirm() {

}
defineExpose({
    open
})
</script>
<style lang="scss" scoped>
.formItem {
    display: flex;
    align-items: center;
    width: 100%;

    .input {
        margin-right: 10px;
        width: 100%;
        display: flex;
    }
}
</style>