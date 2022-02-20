export default class time {
    static unixNow(): number {
        return time.unixTime(new Date().getTime());
    }
    static unixTime(timestampMs: number): number {
        return Math.round(timestampMs / 1000);
    }
    static timestamp2Str(timestamp:number, fmt:string = 'yyyy-MM-dd'):string {
        if (timestamp == undefined || timestamp == null) {
            return ''
        }
        let date = new Date(this.getMillisecondStamp(timestamp))
        let o:any = {
            "M+": date.getMonth() + 1, //月份 
            "d+": date.getDate(), //日 
            "h+": date.getHours(), //小时 
            "m+": date.getMinutes(), //分 
            "s+": date.getSeconds(), //秒 
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (let k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k])
                    .length)));
            }
        }
        return fmt;
    }
    static getMillisecondStamp(timestamp:number) {
        let millSecondStamp = timestamp;
        if ((millSecondStamp + '').length < 13) {
            millSecondStamp = millSecondStamp * 1000
        }
        return millSecondStamp
    }
    static unixTodayTime(hour:number, min:number, sec:number):number {
        let now = new Date();
        let theTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            hour,
            min,
            sec)
        return time.unixTime(theTime.getTime())
    }
    /**
     * 当天的开始时间
     */
    static unixCurDayStartTime() {
        let now = new Date();
        let afterDatetime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            0, 0, 0
        )
        return time.unixTime(afterDatetime.getTime())
    }
    /**
     * 获取次日12点
     */
    static unixNextDay12Oclock() {
        let now = new Date();
        let afterDatetime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1,
            12, 0, 0
        )
        return time.unixTime(afterDatetime.getTime())
    }
    /**
     * 获取当年的最后一天
     */
    static getYearLastDay(){
        let now = new Date();
        return new Date(now.getFullYear(),11,31,23,59,59);
    }
}
