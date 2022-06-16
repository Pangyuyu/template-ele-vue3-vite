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
     * 设置标题
     */
    setTitle(): void,
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
    themeChange: (themeName: string) => Promise<string>,
    /**
     * 拖动指定文件
     * @param fileName 文件名称
     */
    startDrag: (fileName: string) => void,
    progressStart: () => void,
    progressCancel: () => void,
    progressUnkown: () => void,
    dllMethod: (args: any) => Promise<any>,
    /**
     * 获取系统信息
     */
    querySystemInfo: () => Promise<any>,
    windowChangeBgColor: () => void,
    windowOpenLocalWeb: () => void,
    windowCloseLocalWeb: () => void,
    runApiPath: (apiName: string, apiParams: any) => Promise<any>,
    showDialog: (type: string, args: any) => Promise<any>,
    fileChooseRead: () => Promise<any>,
    fileChooseSave: (args: any) => Promise<any>,
    bleOnScanning: (callback: (args: any) => void) => void,
    bleSetSearchDeviceId: (args: any) => Promise<any>,
    /**
     * 启动本地可执行文件
     */
    localExeStart: (args: any) => void,
    /**
     * 停止本地可执行文件
     */
    localExeStop: (args: any) => Promise<any>,
}