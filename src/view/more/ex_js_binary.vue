<template>
    <div class="vue-page">
        <el-tabs v-model="activeName" class="xing-tabs" type="card" style="flex-grow:1">
            <el-tab-pane name="ex_relational">
                <template #label>
                    <span class="custom-tabs-label">
                        <span :class="getPanelLabelClass('ex_relational')">对象关系</span>
                    </span>
                </template>
                <el-image :src="img_js_binary" class="img_js_binary" fit="scale-down" />
                <div class="panel-warn">
                    <div class="item">1.详情查看<a href="javascript:void(0)"
                            @click="onClickOpenWindowByUrl('https://zhuanlan.zhihu.com/p/568915443')">谈谈JS二进制：File、Blob、FileReader、ArrayBuffer、Base64</a>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane name="ex_blob">
                <template #label>
                    <span class="custom-tabs-label">
                        <span :class="getPanelLabelClass('ex_blob')">Blob</span>
                    </span>
                </template>
                <div class="panel-content ex_blob_content">
                    <div>
                        <el-button type="primary" @click="onClickBlobBasic()">Blob:初始化</el-button>
                        <el-button type="primary" @click="onClickBlobSlice()">Blob:Slice</el-button>
                    </div>
                    <iframe :src="iframe_src" class="el-image"></iframe>
                </div>
                <div class="panel-warn">
                    <div class="item">1.Blob 全称为 binary large object ，即二进制大对象，它是 JavaScript 中的一个对象，表示原始的类似文件的数据。</div>
                    <div class="item">2.实际上，Blob 对象是包含有只读原始数据的类文件对象。简单来说，Blob 对象就是一个不可修改的二进制文件。</div>
                </div>
            </el-tab-pane>
            <el-tab-pane name="ex_file">
                <template #label>
                    <span class="custom-tabs-label">
                        <span :class="getPanelLabelClass('ex_file')">File和FileReader</span>
                    </span>
                </template>
                <div class="panel-content drag-region" style="flex-direction:column;"
                    :class="draging?'drag-region-active':'drag-region-normal'" @dragover="onFileDragover"
                    @drop="onFileDrop">
                    <el-button type="primary" @click="onClickChooseFile()" style="width:100%">选择文件</el-button>
                    <input ref="vInputFile" type="file" id="fileInput" :multiple="true" @change="fileOnChange" hidden>
                    <el-table :data="tableFiles" border height="520">
                        <el-table-column prop="name" label="文件名" width="320" />
                        <el-table-column prop="sizeStr" label="文件大小" width="120" />
                        <el-table-column prop="type" label="MIME" width="280" />
                        <el-table-column prop="lastModifiedStr" label="文件最后修改日期" width="220" />
                        <el-table-column label="操作">
                            <template #default="scoped">
                                <div class="ctrl">
                                    <el-select v-model="scoped.row.readFun" placeholder="请选择" size="large">
                                        <el-option v-for="item in readFunOptions" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                    </el-select>
                                    <el-button type="primary" size="small" @click="onClickReadFile(scoped.row)">读取文件...
                                    </el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="panel-warn">
                    <div class="item">1.File 对象中只存在于浏览器环境中，在 Node.js 环境中不存在。</div>
                    <div class="item">2.File 对象是特殊类型的 Blob，且可以用在任意的 Blob 类型的 context 中。Blob 的属性和方法都可以用于 File 对象。</div>
                    <div class="item">3.input组件使用请查看<a href="javascript:void(0)"
                            @click="onClickOpenWindowByUrl('https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file')">{{inputLinkDesc}}</a>
                    </div>
                    <div class="item">4.浏览器环境读取文件MD5可以使用SparkMD5。<a href="javascript:void(0)"
                            @click="onClickOpenWindowByUrl('https://segmentfault.com/a/1190000022920399')">前端使用js计算文件的MD5值</a>
                    </div>
                    <div class="item">5.读取大文件MD5,若是electron建议使用主进程读取。<a href="javascript:void(0)"
                            @click="onClickOpenWindowByUrl('https://segmentfault.com/a/1190000022924958')">Node.js计算文件的MD5值</a>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane name="ex_arraybuffer">
                <template #label>
                    <span class="custom-tabs-label">
                        <span :class="getPanelLabelClass('ex_arraybuffer')">ArrayBuffer</span>
                    </span>
                </template>
                <div class="panel-content ex_blob_content">
                    <el-button type="primary" @click="onClickArrayBufferTest()">测试</el-button>
                </div>
                <div class="panel-warn">
                    <div class="item">1.ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区。</div>
                    <div class="item">2.ArrayBuffer 的内容不能直接操作，只能通过 DataView 对象或 TypedArrray 对象来访问。这些对象用于读取和写入缓冲区内容。
                    </div>
                    <div class="item">3.详情查看<a href="javascript:void(0)"
                            @click="onClickOpenWindowByUrl('https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer')">ArrayBuffer</a>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane name="ex_format_convert">
                <template #label>
                    <span class="custom-tabs-label">
                        <span :class="getPanelLabelClass('ex_format_convert')">格式转换</span>
                    </span>
                </template>
                <div class="panel-content ex_blob_content">
                    待完善...
                </div>
                <div class="panel-warn">

                </div>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ComponentInternalInstance, ref } from 'vue'
import ModalTool from '@/common/ui/ModalTool';
import img_js_binary from '@/assets/images/js_binary.jpg'
import utils from '@/common/utils/utils'
import time from '@/common/utils/time'
import SparkMD5 from "spark-md5"
const activeName = ref("ex_relational")
const iframe_src = ref("")
const { proxy } = getCurrentInstance() as ComponentInternalInstance
function getPanelLabelClass(lableName: string) {
    if (activeName.value == lableName) {
        return 'panel-active'
    }
    return 'system-text'
}
function onClickOpenWindowByUrl(url: string) {
    window.EPre.openChildWin("...", url)
}
//#region blob

function onClickBlobBasic() {
    const msg = "Hello World"
    const blob = new Blob([msg], { type: "text/plain" })
    iframe_src.value = URL.createObjectURL(blob);
    ModalTool.ShowToast(`size:${blob.size};\ntype:${blob.type}`, "success")
}
function onClickBlobSlice() {
    const blob = new Blob(["Hello World"], { type: "text/plain" });
    const subBlob = blob.slice(0, 5);
    iframe_src.value = URL.createObjectURL(subBlob);
}
//#endregion

//#region file
const tableFiles = ref(new Array())
const inputLinkDesc = ref("<input type=\"file\">")
const vInputFile = ref()

function onClickChooseFile() {
    vInputFile.value.click()
}
function fileOnChange(e) {
    listChooseFiles(e.target.files)
    //input组件选择之后把其value清空,保证下次选择同样的文件还可以触发change事件
    e.target.value = ""
}
const draging = ref(false)
function onFileDragover(e) {
    e.preventDefault();
    draging.value = true
}
function onFileDrop(e) {
    e.preventDefault();
    draging.value = false
    listChooseFiles(e.dataTransfer.files)
}
function listChooseFiles(targetFiles) {
    if (targetFiles == undefined || targetFiles == null || targetFiles.length == 0) {
        ModalTool.ShowToast("未选择任何文件", "info")
        return
    }
    let tempFiles = []
    //e.target.files不可以使用map,forEach
    for (let i = 0; i < targetFiles.length; i++) {
        const file = targetFiles[i]
        tempFiles.push({
            readFun: 'readAsText',
            file: file,
            name: file.name,
            size: file.size,
            sizeStr: utils.computeFileSize(file.size),
            type: file.type,
            webkitRelativePath: file.webkitRelativePath,
            lastModified: file.lastModified,
            lastModifiedStr: time.timestamp2Str(file.lastModified, "yyyy-MM-dd hh:mm:ss")
        })
    }
    tableFiles.value = tempFiles
}
// const readFun = ref("readAsDataURL")
const readFunOptions = ref([
    {
        value: 'readAsText',
        label: "读取文本内容"
    },

    {
        value: 'readAsDataURL',
        label: "读取Base64"
    },
    {
        value: 'readMD5',
        label: "读取文件MD5"
    },
    {
        value: 'readAsArrayBuffer',
        label: "读文件的ArrayBuffer数据对象"
    },
    {
        value: 'readAsBinaryString',
        label: "读文件原始二进制数据"
    },

])
/*以下方法，都是读取指定 Blob ，区别在于读取完成后result中返回的信息
1.readAsArrayBuffer 读取完成之后，result 属性中保存的将是被读取文件的 ArrayBuffer 数据对象；
2.readAsBinaryString 读取完成之后，result 属性中将包含所读取文件的原始二进制数据；
3.readAsDataURL 读取完成之后，result 属性中将包含一个data: URL 格式的 Base64 字符串以表示所读取文件的内容。
4.readAsText 读取完成之后，result 属性中将包含一个字符串以表示所读取的文件内容。
*/
function onClickReadFile(item) {
    console.log(item.name, item.readFun)
    if (item.readFun != "readMD5") {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (item.readFun == "readMD5") {
                //e.target.result.toString() d41d8cd98f00b204e9800998ecf8427e d41d8cd98f00b204e9800998ecf8427e
                const md5 = SparkMD5.hashBinary(e.target.result.toString());
                ModalTool.ShowDialogSuccess(item.name, md5)
            } else {

            }
            console.log(item.name, "读取完成\n", e.target.result)
            ModalTool.ShowDialogSuccess(item.name, e.target.result.toString())
        }
        reader.onerror = (e) => {
            console.log(item.name, "读取发生错误", e)
        }
        reader.onabort = (e) => {
            console.log(item.name, "操作中断", e)
        }
        reader.onprogress = (e) => {
            if (e.loaded && e.total) {
                const percent = (e.loaded / e.total) * 100;
                console.log(`读取进度: ${Math.round(percent)} %`);
            }
        }
        if (item.readFun == "readAsText") {
            reader.readAsText(item.file)
        } else if (item.readFun == "readAsDataURL") {
            reader.readAsDataURL(item.file)
        } else if (item.readFun == "readAsArrayBuffer") {
            reader.readAsArrayBuffer(item.file)
        } else if (item.readFun == "readAsBinaryString" || item.readFun == "readMD5") {
            reader.readAsBinaryString(item.file)
        }
    } else {
        if (item.size < 10485760) {//如果小于10MB，就使用普通方式读取
            readMd5SmallFile(item)
        } else {
            readMd5BigFile(item)
        }
    }

}
//读取小文件MD5的方法
function readMd5SmallFile(item) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const md5 = SparkMD5.hashBinary(e.target.result.toString());
        ModalTool.ShowDialogSuccess(item.name, md5)
    }
    reader.readAsBinaryString(item.file)
}
//读取大文件MD5的方法
function readMd5BigFile(item) {
    const sliceLength = 10;//此处分十片进行读取
    const chunkSize = Math.ceil(item.file.size / sliceLength);
    const fileReader = new FileReader();
    const md5 = new SparkMD5();
    let index = 0;
    fileReader.onload = e => {
        md5.appendBinary(e.target.result.toString());
        if (index < item.file.size) {
            index += chunkSize;
            loadFile();
        } else {
            ModalTool.ShowDialogSuccess(item.name, md5.end())
        }
    };
    const loadFile = () => {
        const slice = item.file.slice(index, index + chunkSize);
        fileReader.readAsBinaryString(slice);
    }
    loadFile();    
}
//#endregion 

//#region ArrayBuffer
function onClickArrayBufferTest() {
    const buffer = new ArrayBuffer(16)
    console.log("buffer.byteLength", buffer.byteLength)
    console.log("buffer.slice(0, 8)", buffer.slice(0, 8));  // 16


    const isView01 = ArrayBuffer.isView(buffer)   // false
    console.log("buffer isView", isView01);
    const view = new Uint32Array(buffer);
    const isView02 = ArrayBuffer.isView(view)     // true
    console.log("view isView", isView02);
}
//#endregion
</script>

<style lang="scss" scoped>
.vue-page {
    display: flex;
    flex-direction: column;
    height: 95%;
    padding: 5px;
}

.page-content {
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    flex-grow: 1;
    height: 0;
}

.el-image {
    width: 620px;
    height: 200px;
    margin: 5px;
}

.img_js_binary {
    width: 620px;
    height: 620px;
}

.ex_blob_content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-height: 620px;
}

.drag-region-normal {
    border: 1px solid #383b3b;
}

.drag-region-active {
    border: 1px solid #1eb2a8;
}
</style>