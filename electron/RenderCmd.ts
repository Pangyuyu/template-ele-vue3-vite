/*渲染进程命令集合，提供send和监听。这里之所以使用ts，是因为渲染进程是使用的ts方式*/
export default class RenderCmd {
    /**
     * 打开子窗体
     * @param {object} args 子窗体类型
     */
    static childWinSend(desc,url) {
        window.EPre.openChildWin({
            title: desc,
            url: url,
        })
    }
    /**
     * 设置主窗体标题
     * @param title 主窗体标题
     */
    static setWinTitle(title){
        window.EPre.setTitle({
            title: title
        })
    }
}