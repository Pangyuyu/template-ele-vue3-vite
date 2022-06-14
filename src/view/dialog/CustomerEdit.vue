<template>
    <el-dialog v-model="vis" :title="title" width="560px">
        <el-form ref="formEdit" label-width="120px" :model="formData" :rules="formRules">
            <el-form-item label="客户姓名" prop="name">
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
import { getCurrentInstance, ref, ComponentInternalInstance,defineEmits } from "vue";
import ModalTool from "@/common/ui/ModalTool";
const { proxy } = getCurrentInstance() as ComponentInternalInstance
const emit = defineEmits(['onEditEnd'])
const vis = ref(false)
const title = ref("修改/添加客户")
const isAdd = ref(true)
const formEdit = ref()
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
/**
 * 打开弹窗
 */
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
    formEdit.value?.validate((valid: boolean) => {
        if (valid) {
            if (isAdd.value) {
                onCustomerAdd()
            } else {
                onCustomerUpdate()
            }
        } else {
            return false;
        }
    });
}
async function onCustomerAdd() {
    ModalTool.ShowLoading("保存中...")
    const addRes = await proxy?.$APILOCAL.customerAdd(
        formData.value.name,
        formData.value.address,
        formData.value.phone).exec()
    ModalTool.HideLoading()
    if (addRes.isFail) {
        ModalTool.ShowDialog("提醒",addRes.message)
        return
    }
    emit('onEditEnd',{
        isAdd:isAdd.value,
        data:addRes.body.data
    })
    ModalTool.ShowToast("操作成功","success")
    vis.value = false

}
async function onCustomerUpdate() {
    ModalTool.ShowLoading("保存中...")
    const upadteRes = await proxy?.$APILOCAL.customerUpdate(
        formData.value.id,
        formData.value.name,
        formData.value.address,
        formData.value.phone).exec()
    ModalTool.HideLoading()
    if (upadteRes.isFail) {
        ModalTool.ShowDialog("提醒", upadteRes.isFail)
        return
    }
    emit('onEditEnd',{
        isAdd:isAdd.value,
        data:{
            ...formData.value
        }
    })
    ModalTool.ShowToast("操作成功","success")
    vis.value = false
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