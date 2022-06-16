/**
 * preLoad.js中使用方法的TS定义
 */
export default interface PreLoadApi {
    /**
       * 打开子窗体
       * @param title 窗体标题
       * @param url 要加载的网页地址
       */
    openChildWin(title: string, url: string): void,
    /**
     * 设置主窗体标题
     * @param title 标题
     */
    setTitle(title:string): void,
    /**
     * 打开文件
     */
    openFile(): Promise<any>,
    /**
     * 响应主进程命令（+1,-1）
     */
    onUpdateCounter(callback: (_event: any, value: number) => void): void,
    /**
     * 更改主题
     * @param themeName 主题名称
     */
    themeChange(themeName: string): Promise<string>,
    /**
     * 拖动指定文件
     * @param fileName 文件名称
     */
    startDrag(fileName: string): void,
    /**
     * 开始进度条
     */
    progressStart: () => void,
    /**
     * 取消进度条
     */
    progressCancel: () => void,
    /**
     * 设置进度条为未知状态
     */
    progressUnkown: () => void,
    /**
     * 调用DLL
     * @param args 参数
     */
    dllMethod(args: any): Promise<any>,
    /**
     * 获取系统信息
     */
    querySystemInfo: () => Promise<any>,
    /**
     * 改变背景色
     */
    windowChangeBgColor: () => void,
    /**
     * 渲染进程打开子窗体并显示本地网页
     */
    windowOpenLocalWeb: () => void,
    /**
     * 渲染进程关闭子窗体
     */
    windowCloseLocalWeb: () => void,
    /**
     * 执行指定的API
     * @param apiName api名称 
     * @param apiParams api参数
     */
    runApiPath(apiName: string, apiParams: any): Promise<any>,
    /**
     * 显示主进程的弹窗
     * @param type 窗体类型
     * @param args 参数
     */
    showDialog(type: string, args: any): Promise<any>,
    /**
     * 文件操作：读取
     */
    fileChooseRead(): Promise<any>,
    /**
     * 文件操作：保存
     * @param args 参数
     */
    fileChooseSave(args: any): Promise<any>,
    /**
     * 蓝牙搜索
     * @param callback 搜索结果
     */
    bleOnScanning(callback: (args: any) => void): void,
    /**
     * 根据DeviceId选择蓝牙
     * @param args 参数 
     */
    bleSetSearchDeviceId(args: any): Promise<any>,
    /**
     * 启动本地可执行文件
     */
    localExeStart(args: any): void,
    /**
     * 停止本地可执行文件
     */
    localExeStop(args: any): Promise<any>,
}