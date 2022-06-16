
export { };
declare global {
  interface Window {
    createObjcectURL: any;
    /**
     * Electron主进程方法，具体实现在"electron/preload.js"中
     */
    EPre: {
      openChildWin: () => void,
      setTitle: () => void,
      openFile: () => (args: any) => Promise<any>,
      /**
       * //响应主进程命令（+1,-1）
       */
      onUpdateCounter: (callback: (_event:any, value:number) => void) => void,
      themeChange: (themeName: string) => (args: any) => Promise<any>,
      startDrag: (fileName: string) => void,
      progressStart: () => void,
      progressCancel: () => void,
      progressUnkown: () => void,
      dllMethod: (args: any) => (args: any) => Promise<any>,
      querySystemInfo: () => (args: any) => Promise<any>,
      windowChangeBgColor: () => void,
      windowOpenLocalWeb: () => void,
      windowCloseLocalWeb: () => void,
      runApiPath: (apiName: string, apiParams: any) => Promise<any>,
      showDialog: (type: string, args: any) => Promise<any>,
      fileChooseRead: () => Promise<any>,
      fileChooseSave: (args: any) => Promise<any>,
      bleOnScanning: (callback: (args: any) => void) => void,
      bleSetSearchDeviceId:(args:any)=>Promise<any>,      
      /**
       * 启动本地可执行文件
       */
      localExeStart: (args: any) => void,
      /**
       * 停止本地可执行文件
       */
      localExeStop: (args: any) => Promise<any>,
    };
  }
}