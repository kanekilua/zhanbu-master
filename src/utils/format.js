export default {
    // 去除html标签
    delHtmlTag : function (str){
        return str.replace(/<[^>]+>/g," ");//去掉所有的html标记
    },
    // 去除字符串所有空格
    removeAllSpace: function (str) {
        return str.replace(/\s+/g, "");
    },
    //去除前后空格
    Trim: function (str){ 
        if(str){
            return str.replace(/(^\s*)|(\s*$)/g, ""); 
        }
        else {
            return str;
        }
    },
    // 获取年月日
    getYearMonthDate: function () {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let date = now.getDate();
        console.log(year,month,date)
        return [year,month,date]
    }
}