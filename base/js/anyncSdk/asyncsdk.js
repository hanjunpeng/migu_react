(function(win,doc){
    /*
     * @method startReader 唤起客户端阅读页
     * @*param contentID 内容id
     * @*param chapterID 章节ID，contendType=6 电台，章节id同内容ID
     * @*param contentType 内容类型, 1图书, 2漫画, 3杂志, 5听书6、电台,7、点播电台
     * @*param offset 内容相对章首的偏移量（图书时为字数，漫画/杂志为页码，听书为时长单位为秒）
     * @*param contentName 书名或电台名
     * @*param bigLogo 封面图片url（请获取尺寸为180*240的图片）或电台logo的url
     * @param recentlyTime 最近的阅读时间
     * @param isCompare 是否需要根据时间戳进行比较
                true : 需要与客户端数据库比较
                false: 不需要与客户端数据库比较
     * @*param chargeMode 收费类型（0：免费1：按本计费2：按章计费）
     * @*param authorName 作家名
     * @param chapterName 章节名，内容类型为听书时必填
     * @param bookLevel 图书等级，1 免费带广告、2、3、4 10、ugc图书
     */
    cmrsdk.startReader = function (json) {
        var needArr=['contentID','chapterID','contentType','contentName','bigLogo','chargeMode','offset'];//必填项
        if (this.isNeed(needArr,json) != true) {
            return;//非空判断
        }
        CmreadJsBridge.invoke('startCommonReader', json);
    }
    /*
     * @method startCatalog 唤起目录页
     * @*param contentID 内容id
     * @*param contentType 内容类型（1图书，2漫画，5听书）
     * @*param contentName 内容名称
     * @*param chargeMode 收费类型（0：免费1：按本计费2：按章计费）
     * @param bigLogo 封面图片url（请获取尺寸为180*240的图片）
     * @param authorName 作家名
     * @param speakerName 听书主播名，进入听书目录页时必选
     * @param description 听书内容长简介，进入听书目录页时必选
     * @param bookLevel 图书等级，1 免费带广告、2、3、4
     ***booklevel为了兼容老IOS接口必传***
     */
    cmrsdk.startCatalog = function (json) {
        var needArr=['contentID','contentType','contentName','chargeMode'];
        if (this.isNeed(needArr,json) != true) {
            return;//非空判断
        }
        CmreadJsBridge.invoke('startChapterList', json);
    }
    /*
     * @method startPicReader 启动带缩略图的阅读页(IOS无此方法)
     * @*param contentID 内容id
     * @*param chapterID 章节ID
     * @*param contentName 书名
     * @*param bigLogo 封面图片url（请获取尺寸为180*240的图片）
     * @*param count 缩略图张数
     * @*param imageUrl  缩略图对应url（图片url之间使用：“;PicUrl:”做分割）
     * @param offset 图片第几张
     */
    cmrsdk.startPicReader = function (json) {

        var needArr=['contentID','chapterID','contentName','bigLogo','count','imageUrl'];
        if (this.isNeed(needArr,json) != true) {
            return;//非空判断
        }
        CmreadJsBridge.invoke('startPictureShortReader', json);
    }
    /*
     * @method startTTSReader 以TTS朗读方式启动图书阅读页
     * @*param contentID 内容id
     * @*param chapterID 章节ID
     * @param contentType 暂无处理
     * @*param offset 内容相对章首的偏移量（字数）
     * @*param contentName 书名
     * @*param bigLogo 封面图片url（请获取尺寸为180*240的图片）
     * @*param chargeMode 收费类型（0：免费1：按本计费2：按章计费）
     * @param authorName 作者
     * @param chapterName  章节名，内容类型为听书时必填
     * @param description 为了兼容老版ios方法
     * @param recentlyTime 为了兼容老版ios方法
     * @param isCompare 为了兼容老版ios方法
     contentID, chapterID, contentType, offset,
        contentName, bigLogo, chargeMode, authorName, chapterName, description, recentlyTime, isCompare
     */
    cmrsdk.startTTSReader=function (json) {
        var needArr=['contentID','chapterID','offset','contentName','bigLogo','chargeMode'];
        if (this.isNeed(needArr,json) != true) {
            return;//非空判断
        }
        CmreadJsBridge.invoke('startTTSReader', json);
    }
    /*
     * @method authenticate 登录鉴权
     * @*param action 登录成功后进行的动作，如果是URL，则跳转，如果是”function”则执行
     */
    cmrsdk.authenticate = function (action) {
        action = action || '';
        if (typeof action == 'function') {
            action = "javascript:(" + action.toString() + ")()";
        }
        CmreadJsBridge.invoke('authenticate', {
            successAction: action
        });
    }
    /*
     * @method startDownload 下载(兼容老版安卓和ios)
     * @param URL {string} 下载地址
     * @*param contentID {String} 下载的内容id
     * @*param contentType {Interger} 下载内容类型（1：图书2：漫画3：杂志 5：听书 7：手机报）
     * @*param contentName {String} 内容名称
     * @param chapterID {String} 下载章节ID （漫画，杂志，听书下载时必选，）
     * @param chapterName {String} 下载章节名称 （漫画，杂志，听书下载时必选，）
     * @*param chargeMode {Integer} 收费类型（0：免费1：按本计费2：按章计费）
     * @*param bigLogo {String} 封面图片（下载时请获取尺寸为180*240的图片）
     * @param authorName {String} 作家名
     * @param speakerName {String} 听书主播名，听书下载时必选
     * @param description {String} 听书内容长简介，听书下载时必选
     * @param isSerial {String} contentType字段为”1”时，该字段有效是否为连载书：0连载书1非连载书(旧版ios必填)
     * @*param canBatchDownload {Boolean} 是否允许批量下载连载未完本的分册内容
     * @*param jsMethodName {function} 客户端回调用此方法
     * @*param bookLevel {String} 图书等级，1 免费带广告、2、3、4
     * @*param isPrePackFinished {String} isSerial字段为”0”时，该字段有效：连载书是否预打包完成：1已打包0 未打包 旧版IOS必填。
     URL, contentID, contentType, contentName, chapterID, chapterName, chargeMode, bigLogo, authorName, speakerName, description, isSerial, canBatchDownload, jsMethodName, bookLevel, isPrePackFinished
     *
     */
     cmrsdk.startDownload=function (json) {
         var needArr=['contentID','contentType','contentName','chargeMode','chargeMode','bigLogo','canBatchDownload','bookLevel']
         if (this.isNeed(needArr,json) != true) {
             return;//非空判断
         }
         var funname = 'download' + new Date().getTime();
         b2cFun[funname] = json.jsMethodName;
         json.jsMethodName="b2cFun['" + funname + "']";
         var action="download";
         if(CmreadJsBridge.system=="ios"){
             action="downloadContent";
         }
         CmreadJsBridge.invoke(action, json);
     }
    /*
     * @method refresh 刷新
     */
    cmrsdk.refresh = function () {
        CmreadJsBridge.invoke('viewRefresh', {});
    }
    /*
     * @method goBack 后退
     */
    cmrsdk.goBack = function () {
        CmreadJsBridge.invoke('goBack', {});
    }
    /*
     * @method addshelf 加入书架
     * @*param contentType 要加入书架的书的类型：1、图书 2、漫画 3、杂志 5、听书
     * @*param contentID 要加入书架的书的contentid
     * @*param contentName 要加入书架的书的第一章的ID
     * @*param chapterID 要加入书架的书的书名
     * @param chapterName 要加入书架的书的第一章的名字
     * @*param bigLogo 要加入书架的书的封面URL
     * @param isSerial contentType字段为”1”时，该字段有效 是否为连载书：0连载书 1非连载书
     * @param isPrePackFinished isSerial字段为”0”时，该字段有效：| 连载书是否预打包完成：1已打包 0 未打包
     * @param bookLevel 要加入书架图书的等级：1 看广告免费 2 会员级别免费 3 会员级别免费 4 所有用户都需要点播付费其他(如传空或其他值) 客户端不作处理，非书籍类型，前端传参为空，客户端默认不处理
     * @*param c_downloadAttribute 0：不可下载 1：连载书下载 2：完本书下载
     * @*param chargeMode 收费类型（0：免费1：按本计费2：按章计费）
     * @param authorName 作家名
     * @*param jsMethodName {Function} 加入书架成功后的回调
     * @param description 书籍简介
     */
    cmrsdk.addShelf = function (json) {
        var needArr=['contentType','contentID','contentName','chapterID','bigLogo','c_downloadAttribute','jsMethodName','chargeMode']
        if (this.isNeed(needArr,json) != true) {
            return;//非空判断
        }
        var oname = 'addShelf_' + new Date().getTime();
        b2cFun[oname] = json.jsMethodName;
        json.jsMethodName='b2cFun[\"' + oname + '\"]';
        CmreadJsBridge.invoke('addToBookshelf', json);
    }
    /*
     * @method batchDownload 批量下载图书分册(IOS没有该方法)
     * @*param contentID 内容名称
     * @*param contentName 下载章节ID（漫画，杂志，听书下载时必选，）
     * @*param chargeMode {Number} 收费类型（0：免费1：按本计费2：按章计费）
     * @*param bigLogo 封面图片（下载时请获取尺寸为180*240的图片）
     * @param authorName 作家名
     * @param isSerial contentType字段为”1”时，该字段有效
     * @param isPrePackFinished 暂未处理
     contentID, contentName, chargeMode, bigLogo, authorName, isSerial, isPrePackFinished
     */
    cmrsdk.batchDownload = function (json) {
        var needArr=['contentID','contentName','chargeMode','bigLogo'];
        if (this.isNeed(needArr,json) != true) {
            return;//非空判断
        }
        CmreadJsBridge.invoke('batchDownloadFascicle', json);
    }
    /*
    * @method closePage 关闭页面
    */
    cmrsdk.closePage=function(json){
        CmreadJsBridge.invoke('closePage',json||{});
    }
})(window,document);
