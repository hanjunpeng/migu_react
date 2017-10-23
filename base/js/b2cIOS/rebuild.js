;
(function(win, doc) {
    var cmrsdk=win.cmrsdk||{};
    var CmreadJsBridge=win.CmreadJsBridge||{};
    cmrsdk.toast = function(msg, isClose) {
        if(CmreadJsBridge&&CmreadJsBridge.ua.indexOf('cmread')<0){
            try{
                coToast&&coToast.show(msg);
            }catch(e){
                	console.log({"toast":msg});
            }
            return;
        }
        notifyResultToast(msg, isClose, "");
    }
    /*此为验证方法*/
    cmrsdk.authenticate = function(action) {
        action = action || "";
        if (typeof action == "function") {
            action = "javascript:(" + action.toString().replace(/[\n,\s]/g, "").replace(/'/g, "\\\'").replace(/"/g, '\\\"') + ")()";
        }
        authenticate(action, "", "");
    }
    /*启动阅读页*/
    cmrsdk.startReader = function(json) {
        json=json||{};
        switch (CmreadJsBridge.system) {
            case "ios":
                startCommonReader(json.contentID, json.chapterID, json.contentType, json.offset, json.contentName, json.bigLogo, json.chargeMode, json.authorName, json.chapterName, json.description, json.bookLevel, json.recentlyTime, json.isCompare,json.downMaxVersion||"",json.token||"");
                break;
            case "android":
                startCommonReader(json.contentID, json.chapterID, json.contentType, json.offset,
                    json.contentName, json.bigLogo, json.authorName, json.recentlyTime, json.isCompare, json.downMaxVersion||"", json.token||"");
                break;
        }
    }
    /*启动目录页*/
    cmrsdk.startCatalog = function(json) {
        json=json||{};
        /*安卓下老方法午bookLevel*/
        switch (CmreadJsBridge.system) {
            case "ios":startChapterList(json.contentID, json.contentType, json.contentName, json.chargeMode, json.bigLogo, json.authorName, json.speakerName, json.description, json.bookLevel ,json.downMaxVersion||"");break;
            case "android":startChapterList(json.contentID, json.contentType, json.contentName, json.chargeMode, json.bigLogo, json.authorName, json.speakerName, json.description ,json.downMaxVersion||"");break;
        }

    }
    /*启动tts语音朗读*/
    cmrsdk.startTTSReader = function(json) {
        json=json||{};
        switch (CmreadJsBridge.system) {
            case "ios":
                startTTSReader(json.contentID, json.chapterID, json.contentType, json.offset,
                    json.contentName, json.bigLogo, json.chargeMode, json.authorName, json.chapterName, json.description, json.recentlyTime, json.isCompare);
                break;
            case "android":
                startTTSReader(json.contentID, json.chapterID, json.contentType, json.offset, json.contentName, json.bigLogo, json.authorName, json.recentlyTime, json.isCompare);
                break;
        }
    }
    /*下载兼容处理*/
    cmrsdk.startDownload = function(json) {
        json=json||{};
        var oname = 'download_' + new Date().getTime();
        b2cFun[oname] = json.jsMethodName;
        json.jsMethodName = 'b2cFun[\"' + oname + '\"]';
        switch (CmreadJsBridge.system) {
            case "ios":
                downloadContent(json.url, json.contentID, json.contentType, json.contentName, json.chapterID, json.chapterName, json.chargeMode, json.bigLogo, json.authorName, json.speakerName, json.description, json.isSerial, json.canBatchDownload, json.jsMethodName, json.chargeMode, json.authorName, json.isPrePackFinished,json.downMaxVersion);
                break;
            case "android":
                downloadContent(json.url, json.contentID, json.contentType, json.contentName, json.chapterID, json.chapterName, json.chargeMode, json.bigLogo, json.authorName, json.speakerName, json.description, json.isSerial, json.isPrePackFinished,json.downMaxVersion);
                break;
        }
    }
    /*刷新*/
    cmrsdk.refresh = function() {
        viewRefresh();
    }
    /*后退*/
    cmrsdk.goBack = function() {
        goBack();
    }
    /*加入书架兼容*/
    cmrsdk.addShelf = function(json) {
        json=json||{};
        if(json.jsMethodName&&typeof json.jsMethodName=="function"){
            var oname = 'addShelf_' + new Date().getTime();
            b2cFun[oname] = json.jsMethodName;
            json.jsMethodName = 'b2cFun[\"' + oname + '\"]';
        }
        switch (CmreadJsBridge.system) {
            case "ios":
                addToBookshelf(json.contentType, json.contentID, json.contentName, json.bigLogo, json.chapterID, json.chapterName, json.isSerial, json.jsMethodName, json.chargeMode, json.authorName, json.speakerName, json.description, json.bookLevel, json.isPrePackFinished, json.c_downloadAttribute,json.downMaxVersion);
                break;
            case "android":
                addToBookshelf(json.contentType, json.contentID, json.contentName, json.bigLogo, json.chapterID, json.chapterName, json.isSerial, json.isPrePackFinished, json.bookLevel, json.authorName, json.c_downloadAttribute, json.chargeMode,json.downMaxVersion)
                break;
        }
    }
    /*批量下载兼容*/
    cmrsdk.batchDownload = function(json) {
        json=json||{};
        switch (CmreadJsBridge.system) {
            case "android":
                batchDownloadFascicle(json.contentID, json.contentName, json.chargeMode, json.bigLogo, json.authorName, json.isSerial, json.isPrePackFinished);
                break;
        }
    }
    /*打开外站链接*/
    cmrsdk.startExPage=function(json){
        json=json||{};
        switch (CmreadJsBridge.system) {
            case "android":startExPage(json.url, json.needCache, json.token||'');break;
            case "ios":startExPage(json.url, json.needCache, json.pullRefresh, json.hideClientNavigationBar||"",json.noCustomRequest||"", json.token||'');break;
        }
    }
    /*分享 安卓ios一样，不需要区分ua*/
    cmrsdk.share=function(json){
        json=json||{};
        shareContent(json.title||"", json.URL||"", json.bigLogo||"", json.description||"", json.type||"", json.token||'');
    }
    /*分享强化版*/
    cmrsdk.shareEx=function(json){
        json=json||{};
        switch (CmreadJsBridge.system) {
            case "android":
                shareContentEx(json.shareType||"", json.detailType||"", json.contentType||"", json.bookType||"", json.contentId||"", json.chapterId||"", json.rtid||"", json.ppid||"", json.std||"", json.title||"", json.description||"", json.bigLogo||"", json.URL||"", json.imgUrl||"", json.extend||"", json.token||"", json.code||"", json.successAction||"",json.scene||"");
            break;
            case "ios":
                shareContentEx2(json.contentType||"", json.bookType||"", json.contentId||"", json.chapterId||"", json.rtid||"", json.ppid||"", json.std||"", json.title||"", json.description||"", json.bigLogo||"", json.URL||"", json.extend||"", json.scene||"", json.imgUrl||"", json.token||"");
            break;
        }
    }
    /*关闭页面*/
    cmrsdk.closePage=function(json){
        json=json||{};
        closePage(json.token||"");
    }
    /*频道哦跳转*/
    cmrsdk.jumpCatalog=function(json){
        json=json||{};
        switch (CmreadJsBridge.system) {
            case "android":
                jumpCatalog(json.jumpURL, json.ChannelID, json.CatalogID,json.token||"");
            break;
        }
    }
    /*注销*/
    cmrsdk.logout=function(json){
        json=json||{};
        logout(json.token||"");
    }
    /*页面应用防火墙*/
    cmrsdk.startIEForDownload=function(json){
        json=json||{};
        startIEForDownload(json.url, json.token||"");
    }
    /*启动绑定页面*/
    cmrsdk.startBindPaymentNumber=function(json){
        json=json||{};
        switch (CmreadJsBridge.system) {
            case "android":
                startBindPaymentNumber(json.token||"");
            break;
        }
    }
    /*解除绑定页面*/
    cmrsdk.startUnbindPaymentNumber=function(json){
        json=json||{};
        switch (CmreadJsBridge.system) {
            case "android":
                startUnbindPaymentNumber(json.token||"");
            break;
        }
    }
    /*启动修改密码*/
    cmrsdk.startChangePassword=function(json){
        json=json||{};
        startChangePassword(json.token||"");
    }
    /*startSetSecurityQuestion 启动设置密保页面（IOS无）*/
    cmrsdk.startSetSecurityQuestion=function(json){
        json=json||{};
        switch (CmreadJsBridge.system) {
            case "android":
                startSetSecurityQuestion(json.token||"");
            break;
        }
    }
    /*startUserNotes 启动个人笔记*/
    cmrsdk.startUserNotes=function(json){
        json=json||{};
        startUserNotes(json.token||"");
    }
    /*startSimplePage 重新开启一个webview*/
    cmrsdk.startSimplePage=function(json){
        json=json||{};
        switch (CmreadJsBridge.system) {
            case "android":
                startSimplePage(json.url,json.token||"");
            break;
            case "ios":
                startSimplePage(json.url,json.flag,json.operateUrl,json.token||"");
            break;
        }
    }
    /*startVoiceSearch 启动语音搜索*/
    cmrsdk.startVoiceSearchpage=function(json){
        json=json||{};
        switch (CmreadJsBridge.system) {
            case "android":
                startVoiceSearchpage(json.url,json.token||"");
            break;
        }
    }
    /*startRechargePage 启动充值页*/
    cmrsdk.startRecharge=function(json){
        json=json||{};
        startRechargePage(json.url,json.token||"");
    }
    /*closeRecharge 关闭充值页*/
    cmrsdk.closeRecharge=function(json){
        json=json||{};
        closeRechargePage(json.fsrc,json.token||"");
    }
    /*startShake 启动摇一摇*/
    cmrsdk.startShake=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?startShakepage(json.dURL,json.rURL,json.pURL,json.sURL,json.token||""):null;
    }
    /*startShake 启动摇一摇*/
    cmrsdk.closeShakeResultDialog=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?closeShakeResultDialog(json.token||""):null;
    }
    /*startShakeResultDetailPage 启动摇一摇结果详情页*/
    cmrsdk.startShakeResultDetailPage=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?startShakeResultDetailPage(json.URL,json.token||""):null;
    }
    /*BackToShelf 回到书架*/
    cmrsdk.BackToShelf=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?goBacktoBookshelf(json.token||""):null;
    }
    /*shareApp 分享客户端*/
    cmrsdk.shareApp=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?shareApp(json.shareType, json.detailType, json.title, json.description, json.bigLogo, json.URL, json.extend,json.token||""):null;
    }
    /*shareApp 分享客户端*/
    cmrsdk.startSMSReceiver=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?startSMSReceiver(json.callingNum, json.calledNum, json.featureStr,json.token||""):null;
    }
    /*EnCliAndDown 分享回流*/
    cmrsdk.EnCliAndDown=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?EnCliAndDown(json.forwardUrl, json.bookDownUrlStr, json.BookIDStr):null;
    }
    /*sendSMSForUNICOMChargeAck  2.1.25	客户端增加联通充值的发短信方法*/
    cmrsdk.sendSMSForUNICOMChargeAck=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?sendSMSForUNICOMChargeAck(json.receiver, json.content, json.token||""):null;
    }
    /*payToAlipay  客户端传送给支付宝sdk方法*/
    cmrsdk.payToAlipay=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?payToAlipay(json.subject, json.total_fee, json.body, json.notify_url, json.result_url, json.orderId):null;
    }
    /*getAbstractParams 摘要页滑动阅读页*/
    cmrsdk.getAbstractParams=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?getAbstractParams(json.contentID, json.chapterID, json.contentType, json.offset,
            json.contentName,json.bigLogo, json.recentlyTime, json.isCompare, json.authorName, json.token||""):null;
    }
    /*refreshPersonal 刷新个人中心昵称（IOS无）*/
    cmrsdk.refreshPersonal=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?refreshPersonal(json.token||""):null;
    }
    /*startCommonMainPage 启动听书/漫画/杂志-图片首页*/
    cmrsdk.startCommonMainPage=function(json){
        json=json||{};
        switch (CmreadJsBridge.system) {
            case "android":
                startCommonMainPage(json.channelTag ,json.token||"");
            break;
            case "ios":
                startCommonMainPage(json.channelTag, json.url,json.token||"");
                break;
        }
    }
    /*startMoreWonderfulPage 启动不一样的精彩页面(IOS无)*/
    cmrsdk.startMoreWonderfulPage=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?startMoreWonderfulPage(json.token||""):null;
    }
    /*startStealBookPage 启动偷书页面 (IOS无)*/
    cmrsdk.startStealBookPage=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?startStealBookPage(json.token||""):null;
    }
    /*startOfferWall 个人页面中启动客户端支付绑定页面（IOS无）*/
    cmrsdk.startOfferWall=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?startOfferWall(json.token||""):null;
    }
    /*payToWX 启动微信支付（IOS无）*/
    cmrsdk.payToWX=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?payToWX(json.appid, json.noncestr, json.partnerid, json.prepayid, json.timestamp, json.sign, json.result_url,json.token||""):null;
    }
    /*startBindAccount 我、设置、资费等页面 启动随机用户绑定手机号码页面*/
    cmrsdk.startBindAccount=function(json){
        json=json||{};
        startBindAccount(json.jumpURL,json.token||"");
    }
    /*startEventWebPage 配合前端页面，优化特殊的webview样式(IOS无)*/
    cmrsdk.startEventWebPage=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?startEventWebPage(json.URL,json.token||""):null;
    }
    /*sendSMSForChargeAck 送三网融合确认短信（IOS无)*/
    cmrsdk.sendSMSForChargeAck=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?sendSMSForChargeAck(json.receiver, json.content, json.operator, json.orderId,json.token||""):null;
    }
    /*notifyDownload 在咪咕星页面,单机包下载管理*/
    cmrsdk.notifyDownload=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?notifyDownload(json.state, json.productID, json.url, json.packageName,json.token||""):null;
    }
    /*sendDonwloadList 在咪咕星页面,通知客户端需下载单机包列表*/
    cmrsdk.sendDonwloadList=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?sendDonwloadList(json):null;
    }
    /*notifyFcode 通知F码（IOS无）*/
    cmrsdk.notifyFcode=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?notifyFcode(json.Fcode, json.contentId,json.token||""):null;
    }
    /*closeExPage 关闭充值/悦读中国等外部页面并刷新之前的页面*/
    cmrsdk.closeExPage=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?closeExPage(json.token||""):null;
    }
    /*getCatalogPayResult 通知包月订购状态（IOS无）*/
    cmrsdk.getCatalogPayResult=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?getCatalogPayResult(json.resultCode,json.token||""):null;
    }
    /*startBindAlipay 向客户端唤起签约支付宝钱包功能（IOS无）*/
    cmrsdk.startBindAlipay=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?startBindAlipay(json.token||""):null;
    }
    /*getBindNumberState 非移用户获取绑定支付号码状态（IOS无）*/
    cmrsdk.getBindNumberState=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?getBindNumberState(json.token||""):null;
    }
    /*c_sendApkDownloadList 在应用墙,通知客户端需下载单机包列表（IOS无）*/
    cmrsdk.c_sendApkDownloadList=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?c_sendApkDownloadList(json.c_downloadListJson,json.token||""):null;
    }
    /*c_notifyApkDownload 在应用墙,单机包下载管理（IOS无）*/
    cmrsdk.c_notifyApkDownload=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?c_notifyApkDownload(json.c_state, json.c_url, json.c_packageName,json.token||""):null;
    }
    /*relateAccountSuccess 登录成功后进行的动作（IOS无）*/
    cmrsdk.relateAccountSuccess=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?relateAccountSuccess(json.successAction, json.relatedMobile,json.token||""):null;
    }
    /*startMobileRelateAccount 启动账号关联页面*/
    cmrsdk.startMobileRelateAccount=function(json){
        json=json||{};
        startMobileRelateAccount(json.sceneId, json.successAction,json.token||"");
    }
    /*startMobileRelateAccount 启动账号关联页面*/
    /*cmrsdk.c_queryWeChatAppId=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?c_queryWeChatAppId(json.token||""):null;
    }*/
    /*c_startBindWeChatPay 启动微信绑定签约状态（IOS无）*/
    cmrsdk.c_startBindWeChatPay=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?c_startBindWeChatPay(json.url,json.token||""):null;
    }
    /*c_startMiguAccountUpgrade 启动SDK账号升级界面页面（IOS无）*/
    cmrsdk.c_startMiguAccountUpgrade=function(json){
        json=json||{};
        c_startMiguAccountUpgrade(json.token||"");
    }
    /*startMiguCoinsPage 启动SDK账号升级界面页面（IOS无）*/
    cmrsdk.startMiguCoinsPage=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?startMiguCoinsPage(json.token||""):null;
    }
    /*miguAdExposured 新增广告曝光和点击（IOS无）*/
    cmrsdk.miguAdExposured=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?miguAdExposured(json.key, json.adUnitId,json.token||""):null;
    }
    /*miguAdExposured 前端对广告页进行点击、曝光等操作（IOS无）*/
    cmrsdk.miguAdOperation=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?miguAdOperation(json.operateId, json.adUnitId,json.token||""):null;
    }
    /*c_publishComment 客户端图片评论*/
    cmrsdk.c_publishComment=function(json){
        json=json||{};
        c_publishComment(json.pageId,json.token||"");
    }
    /*startMiguClient 客户端用户策反活动优化（IOS无）*/
    cmrsdk.startMiguClient=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?startMiguClient(json.invokeSource,json.token||""):null;
    }
    /*startResetPassword 重置密码*/
    cmrsdk.startResetPassword=function(json){
        json=json||{};
        CmreadJsBridge.system=="ios"?startResetPassword(json.token||""):null;
    }
    /*clientRecharg 客户端充值*/
    cmrsdk.clientRecharge=function(json){
        json=json||{};
        CmreadJsBridge.system=="ios"?clientRecharge(json.token||""):null;
    }
    /*startStoreCharge 跳转到苹果充值页*/
    cmrsdk.startStoreCharge=function(json){
        json=json||{};
        CmreadJsBridge.system=="ios"?startStoreCharge(json.money,json.token||""):null;
    }
    /*isDownload 是否已下载*/
    /*cmrsdk.isDownload=function(json){
        json=json||{};
        CmreadJsBridge.system=="ios"?isDownload(json.jsMethodName, json.contentId, json.contentType, json.chapterID,json.token||""):null;
    }*/
    /*isAddToBookshelf 是否已在书架*/
    /*cmrsdk.isAddToBookshelf=function(json){
        json=json||{};
        if(json.jsMethodName&&typeof json.jsMethodName=="function"){
            var oname = 'isaddtoShelf_' + new Date().getTime();
            b2cFun[oname] = json.jsMethodName;
            json.jsMethodName = 'b2cFun[\"' + oname + '\"]';
        }
        CmreadJsBridge.system=="ios"?isAddToBookshelf(json.jsMethodName, json.contentId, json.contentType, json.chapterID,json.token||""):null;
    }*/
    /*goBookStore 去书城*/
    cmrsdk.goBookStore=function(json){
        json=json||{};
        CmreadJsBridge.system=="ios"?goBookStore(json.token||""):null;
    }
    /*startAudioBookDetailPage 加载听书详情页面*/
    cmrsdk.startAudioBookDetailPage=function(json){
        json=json||{};
        CmreadJsBridge.system=="ios"?startAudioBookDetailPage(json.url,json.token||""):null;
    }
    /*readGeneChange 阅读基因推荐*/
    cmrsdk.readGeneChange=function(json){
        json=json||{};
        CmreadJsBridge.system=="ios"?readGeneChange(json.token||""):null;
    }
    /*subscribeCatalog IOS包月*/
    cmrsdk.subscribeCatalog=function(json){
        json=json||{};
        CmreadJsBridge.system=="ios"?subscribeCatalog(json.catalogId||"", json.subCircle||"", json.isRecharge||"", json.subType||"", json.productId||"", json.isPlatCatalogId||"", json.token||""):null;
    }
    /*unsubscribeCatalog 包月退订*/
    cmrsdk.unsubscribeCatalog=function(json){
        json=json||{};
        CmreadJsBridge.system=="ios"?unsubscribeCatalog(json.token||""):null;
    }
    /*goBack2Location 浏览器返回重定向*/
    cmrsdk.goBack2Location=function(json){
        json=json||{};
        CmreadJsBridge.system=="ios"?goBack2Location(json.url,json.token||""):null;
    }
    /*JumpMiguReadClient 跳转咪咕阅读详情页*/
    cmrsdk.JumpMiguReadClient=function(json){
        json=json||{};
        CmreadJsBridge.system=="ios"?JumpMiguReadClient(json.invokeSource,json.token||""):null;
    }
    /*refreshBookShelf 前端批量加入书架成功后告知客户端刷新书架*/
    cmrsdk.refreshBookShelf=function(json){
        json=json||{};
        refreshBookShelf(json.token||"");
    }
    /*启动Video Player 7.0及以上版本可用*/
    cmrsdk.playVideo=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?playVideo(json.urlId||"",json.videoTitle||"",json.token||""):null;
    }
    /*全站包订购成功后，给客户端一个通知刷新会员页 7.0以上支持*/
    cmrsdk.c_refresh_member_page=function(json){
        json=json||{};
        c_refresh_member_page(json.token||"");
    }
    /*
    *@method c_startmiguunionpay 页面触发一级支付sdk
    */
    cmrsdk.c_startmiguunionpay=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?JumpMiguReadClient(json.version||"",json.transactionCode||"",json.idValue||"",json.productID||"",json.TotalPrice||"",json.productInfo||"",json.preferential||"",json.token||""):null;
    }
    /*调用getScrollableArea客户端方法*/
    /*cmrsdk.getScrollableArea=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?getScrollableArea(json):null;
    }*/
    /*7.0新增启动聊天界面*/
    cmrsdk.c_startChatPage=function(json){
        json=json||{};
        c_startChatPage(json.sendMsisdn,json.avatar,json.nickName,json.token||"");
    }
    /*框架准备完毕，写在前面sdk文件里了*/
    /*cmrsdk.documentReady=function(json){
        json=json||{};
        CmreadJsBridge.system=="ios"?documentReady(json.token||""):null;
    }*/
    /*开始定位 偷书*/
    cmrsdk.startLocation=function(json){
        json=json||{};
        startLocation(json.token||"");
    }
    /*c_startAccountAndSafe 唤起账号安全页*/
    cmrsdk.c_startAccountAndSafe=function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?c_startAccountAndSafe(json.token||""):startAccountAndSafe(json.token||"");
    }
    cmrsdk.getClientValue=function(key,token){
        getClientValue(key,token||"");
    }
    cmrsdk.sendCommonSMS=function(json){
        json=json||{};
        sendCommonSMS(json.receiver, json.content,json.token||"");
    }
    cmrsdk.startInfoCenter=function(json){
        json=json||{};
        startInfoCenter(json.token||"");
    }
    cmrsdk.StartMarkContentDialog=function(json){
        json=json||{};
        StartMarkContentDialog(json.contentId,json.token||"");
    }
    cmrsdk.startResetPassword=function(json){
        json=json||{};
        startResetPassword(json.token||"");
    }
    cmrsdk.switchLogin=function(json){
        json=json||{};
        switchAccountLogin(json.token||"");
    }
    cmrsdk.stealBookSuccess=function(json){
        json=json||{};
        stealBookSuccess(json.contentID||"",json.contentName||"",json.contentType||"",json.bigLogo||"",json.authorName||"",json.bookLevel||"",json.chapterID||"",json.chapterName||"",json.remainDay||"",json.isSerial||"",json.token||"")
    }
    cmrsdk.modifyPersonInfo=function(json){
        json=json||{};
        CmreadJsBridge.system=="ios"?modifyPersonInfo(json.infoUrl||"",json.token||""):null;
    }
    cmrsdk.modifyPersonInfo=function(json){
        json=json||{};
        CmreadJsBridge.system=="ios"?modifyPersonInfo(json.infoUrl||"",json.token||""):null;
    }
    cmrsdk.personActionResponse=function(token){
        json=json||{};
        CmreadJsBridge.system=="ios"?personActionResponse(json.actionType, json.actionUrl,json.token||""):null;
    }
    cmrsdk.saveReadGene=function(json){
        json=json||{};
        CmreadJsBridge.system=="ios"?saveReadGene(json,""):null;
    }
    cmrsdk.restoreAppStoreCatalogProduct=function(json){
        json=json||{};
        CmreadJsBridge.system=="ios"?restoreAppStoreCatalogProduct(json.token||""):null;
    }
    //普通二级B页面展示
    cmrsdk.c_startCommonWebPage = function(json){
        json = json||{};
       CmreadJsBridge.system =="android"?c_startCommonWebPage(json.URL||"",json.needHideTitleBar,json.needQuitRefresh,json.needCache,json.forbiddenRefresh,json.token||""):null;
    }
    //广播通知普通二级B页面刷新当前页面
    cmrsdk.cityRefresh = function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?cityRefresh(json.token||""):null
    }
    //弹出C侧一个按钮的Dialog对话框
    cmrsdk.notifyAlert = function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?notifyAlert(json.responseInfo,json.buttonText,json.token||""):null;
    }
    //弹出C侧两个按钮的Dialog对话框
    cmrsdk.notifyConfirm = function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?notifyConfirm(json.responseInfo,json.positiveText,json.nagativeText,json.token||""):null;
    }
    //弹出C侧PopupWidiw控件
    cmrsdk.notifyPopup = function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?notifyPopup(json.responseInfo,json.closeSelf,json.token||""):null
    }
    //跳转没有Titlebar的webview页面
    cmrsdk.startEventWebPage = function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?startEventWebPage(json.URL,json.token||""):null
    }
    //唤起杂志阅读页
    cmrsdk.startMagazineReader = function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?startMagazineReader(json.contentID,json.offset,json.contentName,json.bigLogo||""):null;
    }
    //跳转手机设置界面
    cmrsdk.startNetSetting = function(json){
        json=json||{};
        CmreadJsBridge.system=="android"?startNetSetting(json.token||""):null
    }
    //一键充值+订购或投票
    cmrsdk.continueTasksAfterCharge = function(json){
        json=json||{};
        CmreadJsBridge.system =="android"?continueTasksAfterCharge(json.token||""):null
    }
    //跳转笔记详情页面
    cmrsdk.startNoteDetailPage = function(json){
        json = json||{};
        startNoteDetailPage(json.noteId,json.msisdn,json.token||"")
    }
    //打开最近阅读页
    cmrsdk.startRecentlyReadMoreActivity = function(json){
        json = json||{};
        startRecentlyReadMoreActivity(json.token||"");
    }
    /*BR004351 咪咕币*/
    cmrsdk.startMiguCoinsRechargePage = function(json){
        json=json||{};
        CmreadJsBridge.system =="android"?startMiguCoinsRechargePage(json.token||""):null
    }
})(window, document);
