
export default {
    //提取出字符串中两个字的汉字词，返回一个数组
    segmentationChinese: function (str) {
        return str.match(/[\u4e00-\u9fa5]{2}/g)
    }

}



