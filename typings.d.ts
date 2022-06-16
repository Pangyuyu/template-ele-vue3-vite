
import PreLoadApi from './electron/PreloadApi'
export { };
declare global {
  interface Window {
    /**
     * Electron主进程方法，具体实现在"electron/preload.js"中
     */
    EPre: PreLoadApi;
  }
  interface Navigator{
    serial:any
  }
}