/*测试缓存专用2*/
/*修改密码*/
function startChangePassword(token) {
    var action = 'startChangePassword';
    jsonStr = '{}';
    ios_bCallC(action, jsonStr, token);
}

/*重置密码*/
function startResetPassword(token) {
    var action = 'startResetPassword';
    jsonStr = '{}';
    ios_bCallC(action, jsonStr, token);
}
/*UESFTL-5772 账号体系相关IOS JS 方法   2016.04.01 新增   颜鹏  END*/

/**
 * ios通用JS方法
 */
function ios_bCallC(action, json, token) {
    var url = 'cmread-objc://' + action + '.' + token + '#' + json;
    //window.location ="http://www.baidu.com";
    window.location = url;
}

/**
 * 拼接完整路径
 */
function populateUrl(URL) {
    if (URL && URL.indexOf("http") != 0) {
        return document.location.protocol + '//' + document.location.host + URL;
    } else {
        return URL;
    }
}

/**
 * 转义jsonvalue中的反斜杠和单引号
 */
function escapeJsonValue(value) {
    value = value.toString();
    value = value.replace(/\\/g, '\\\\');
    return value.replace(/\"/g, '\\"');
}

/**
 * 将一个object生成jsonstring
 */
function toJsonString(obj) {
    var jsonArray = [];
    for (var i in obj) {
        jsonArray.push(i.toString() + ":" + "\"" + escapeJsonValue(obj[i]) + "\"");
    }
    return "{" + jsonArray.join(",") + "}";
}

/* ==========B2C方法========== */

/* 2.1.1 登录 */
function authenticate(successAction, background, token) {
    var action = 'authenticate';
    var jsonStr = null;
    if (successAction.indexOf('javascript:') != 0) {
        successAction = populateUrl(successAction);
    }

    var myJSONObject = new Object();
    if (successAction != null && successAction.length>0) {
        myJSONObject.successAction = successAction;
    }
    if (background != null) {
        myJSONObject.background = background;
    }

    var jsonStr = JSON.stringify(myJSONObject);
    ios_bCallC(action, jsonStr, token);
}


/* 2.1.3 下载 */
/*BR001651 吴海瑞 20160911 新增参数 isPrePackFinished*/
function downloadContent(URL, contentID, contentType, contentName, chapterID, chapterName, chargeMode, bigLogo, authorName, speakerName, description, isSerial, canBatchDownload, jsMethodName, chargeMode, authorName, isPrePackFinished,downMaxVersion, token) {
    if (URL == null) {
        alert('URL是必填参数');
        return;
    }

    if (contentID == null) {
        alert('contentID是必填参数');
        return;
    }

    if (contentType == null) {
        alert('contentType是必填参数');
        return;
    }

    if (contentName == null) {
        alert('contentName是必填参数');
        return;
    }
    if (chargeMode == null) {
        alert('chargeMode是必填参数');
        return;
    }
    if (bigLogo == null) {
        alert('bigLogo是必填参数');
        return;
    }

    if (isSerial == null) {
        alert('isSerial参数是必填参数');
        return;
    }

    if (canBatchDownload == null) {
        alert('canBatchDownload参数是必填参数');
        return;
    }

    if (jsMethodName == null) {
        alert('jsMethodName参数是必填参数');
        return;
    }
    if (chargeMode == null) {
        alert('chargeMode是必填参数');
        return;
    }

    if (authorName == null) {
        alert('authorName是必填参数');
        return;
    }
    if (isPrePackFinished == null) {
        alert('isPrePackFinished是必填参数');
        return;
    }


    var action = 'downloadContent';
    URL = populateUrl(URL);
    bigLogo = populateUrl(bigLogo);

    var myJSONObject = new Object();
    myJSONObject.URL = URL;
    myJSONObject.contentID = contentID;
    myJSONObject.contentType = contentType;
    myJSONObject.contentName = contentName;
    myJSONObject.chargeMode = chargeMode;
    myJSONObject.bigLogo = bigLogo;
    myJSONObject.isSerial = isSerial;
    myJSONObject.canBatchDownload = canBatchDownload;
    myJSONObject.jsMethodName = jsMethodName;
    myJSONObject.chargeMode = chargeMode;
    myJSONObject.authorName = authorName;
    myJSONObject.isPrePackFinished = isPrePackFinished;

    if (chapterID != null) {
        myJSONObject.chapterID = chapterID;
    }
    if (chapterName != null) {
        myJSONObject.chapterName = chapterName;
    }
    if (authorName != null) {
        myJSONObject.authorName = authorName;
    }
    if (isPrePackFinished != null) {
        myJSONObject.isPrePackFinished = isPrePackFinished;
    }
    if (speakerName != null) {
        myJSONObject.speakerName = speakerName;
    }
    if (description != null) {
        myJSONObject.description = description;
    }
    if (downMaxVersion != null) {
        myJSONObject.downMaxVersion = downMaxVersion;
    }

    var jsonStr = JSON.stringify(myJSONObject);
    ios_bCallC(action, jsonStr, token);
}

/* 2.1.4 关闭页面 */
function closePage(token) {
    var action = 'closePage';
    var jsonStr = '{}';

    ios_bCallC(action, jsonStr, token);
}

/* 2.1.5 后退 */
function goBack(token) {
    var action = 'goBack';
    var jsonStr = '{"close": true}';

    ios_bCallC(action, jsonStr, token);
}

/* 2.1.6 刷新 */
function viewRefresh(token) {
    var action = 'viewRefresh';
    var jsonStr = '{}';
    ios_bCallC(action, jsonStr, token);
}

/* 2.1.7 弹出Toast */
function notifyResultToast(responseInfo, closeSelf, token) {
    if (responseInfo == null) {
        alert('第一个参数是必填参数');
        return;
    }
    var action = 'notifyResultToast';
    /* 以下为连接字符串，用本方法传进来的两个参数拼接jsonStr */
    var jsonStr = '{"responseInfo":"' + responseInfo;
    if (closeSelf != null) {
        jsonStr = jsonStr + '", "closeSelf":"' + closeSelf + '"}';
    } else {
        jsonStr += '"}';
    }
    ios_bCallC(action, jsonStr, token);
}



/* 2.1.9 注销 */
function logout(token) {
    var action = 'logout';
    var jsonStr = '{}';

    ios_bCallC(action, jsonStr, token);
}



/* 2.3.1启动图书/漫画/杂志/听书阅读页 */
/*UESFTL-5272 蔡红 20151027 添加bookLevel参数*/
/* UESFTL-5654、马晓娜、20160129增加两个参数 */
function startCommonReader(contentID, chapterID, contentType, offset,
    contentName, bigLogo, chargeMode, authorName, chapterName, description, bookLevel, recentlyTime, isCompare,downMaxVersion, token) {

    if (contentID == null) {
        alert('第一个参数是必填参数');
        return;
    }
    if (chapterID == null) {
        alert('第二个参数是必填参数');
        return;
    }
    if (contentType == null) {
        alert('第三个参数是必填参数');
        return;
    }
    if (offset == null) {
        alert('第四个参数是必填参数');
        return;
    }
    if (contentName == null) {
        alert('第五个参数是必填参数');
        return;
    }
    if (bigLogo == null) {
        alert('第六个参数是必填参数');
        return;
    }
    if (chargeMode == null) {
        alert('chargeMode是必填参数');
        return;
    }
    if (authorName == null) {
        alert('authorName是必填参数');
        return;
    }
    if (bookLevel == null) {
        alert('bookLevel是必填参数');
        return;
    }
    bigLogo = populateUrl(bigLogo);
    var action = 'startCommonReader';
    var myJSONObject = new Object();
    myJSONObject.contentType = contentType;
    myJSONObject.contentID = contentID;
    myJSONObject.contentName = contentName;
    myJSONObject.bigLogo = bigLogo;
    myJSONObject.offset = offset;
    myJSONObject.chapterID = chapterID;
    myJSONObject.chargeMode = chargeMode;
    myJSONObject.authorName = authorName;
    myJSONObject.chapterName = chapterName;
    if (description != null) {
        myJSONObject.description = description;
    }
    myJSONObject.bookLevel = bookLevel;
    myJSONObject.recentlyTime = recentlyTime;
    myJSONObject.isCompare = true;
    myJSONObject.downMaxVersion = downMaxVersion||"";
    var jsonStr = JSON.stringify(myJSONObject);
    ios_bCallC(action, jsonStr, token);
}

/* 2.3.2 启动目录页 */
/*UESFTL-5272 蔡红 20151027 添加bookLevel参数*/
function startChapterList(contentID, contentType, contentName, chargeMode,
    bigLogo, authorName, speakerName, description, bookLevel,downMaxVersion, token) {
    if (contentID == null) {
        alert('contentID是必填参数');
        return;
    }
    if (contentType == null) {
        alert('contentType是必填参数');
        return;
    }
    if (contentName == null) {
        alert('contentName是必填参数');
        return;
    }
    if (chargeMode == null) {
        alert('chargeMode是必填参数');
        return;
    }
    if (bigLogo == null) {
        alert('bigLogo是必填参数');
        return;
    }
    if (bookLevel == null) {
        alert('bookLevel是必填参数');
        return;
    }
    var action = 'startChapterList';
    bigLogo = populateUrl(bigLogo);
    var myJSONObject = new Object();
    myJSONObject.contentType = contentType;
    myJSONObject.contentID = contentID;
    myJSONObject.contentName = contentName;
    myJSONObject.chargeMode = chargeMode;
    myJSONObject.bigLogo = bigLogo;
    myJSONObject.authorName = authorName;
    myJSONObject.speakerName = speakerName;
    myJSONObject.description = description;
    myJSONObject.bookLevel = bookLevel;
    myJSONObject.downMaxVersion = downMaxVersion||"";

    var jsonStr = JSON.stringify(myJSONObject);
    ios_bCallC(action, jsonStr, token);
}



/* 第三方登录 */
function startTpLogin(tokenid1) {
    var action = 'startTpLogin';
    var jsonStr = '{}';

    ios_bCallC(action, jsonStr, tokenid1);
}



/* 2.1.10 加入书架*/
/*UESFTL-5272 蔡红 20151027 添加bookLevel参数*/
/*BR001651 吴海瑞 20160910 加入书架 增加 isPrePackFinished,c_downloadAttribute*/
function addToBookshelf(contentType, contentID, contentName, bigLogo, chapterID, chapterName, isSerial, jsMethodName, chargeMode, authorName, speakerName, description, bookLevel, isPrePackFinished, c_downloadAttribute, downMaxVersion, token) {
    if (contentType == null) {
        alert('contentType是必填参数');
        return;
    }
    if (contentID == null) {
        alert('contentID是必填参数');
        return;
    }
    if (contentName == null) {
        alert('contentName是必填参数');
        return;
    }
    if (chapterID == null) {
        alert('chapterID是必填参数');
        return;
    }
    if (isSerial == null) {
        alert('isSerial是必填参数');
        return;
    }
    if (jsMethodName == null) {
        alert('jsMethodName是必填参数');
        return;
    }
    if (chargeMode == null) {
        alert('chargeMode是必填参数');
        return;
    }
    if (authorName == null) {
        alert('authorName是必填参数');
        return;
    }
    if (bookLevel == null) {
        alert('bookLevel是必填参数');
        return;
    }
    if (isPrePackFinished == null) {
        alert('isPrePackFinished是必填参数');
        return;
    }
    if (c_downloadAttribute == null) {
        alert('c_downloadAttribute是必填参数');
        return;
    }
    var action = 'addToBookshelf';
    var myJSONObject = new Object();
    myJSONObject.contentType = contentType;
    myJSONObject.contentID = contentID;
    myJSONObject.contentName = contentName;
    myJSONObject.isSerial = isSerial;
    myJSONObject.bigLogo = bigLogo;
    myJSONObject.chapterID = chapterID;
    myJSONObject.chapterName = chapterName;
    myJSONObject.jsMethodName = jsMethodName;
    myJSONObject.chargeMode = chargeMode;
    myJSONObject.authorName = authorName;
    if (speakerName != null) {
        myJSONObject.speakerName = speakerName;
    }
    if (description != null) {
        myJSONObject.description = description;
    }
    if (downMaxVersion != null) {
        myJSONObject.downMaxVersion = downMaxVersion;
    }
    myJSONObject.bookLevel = bookLevel;
    myJSONObject.isPrePackFinished = isPrePackFinished;
    myJSONObject.c_downloadAttribute = c_downloadAttribute;
    var jsonStr = JSON.stringify(myJSONObject);
    ios_bCallC(action, jsonStr, token);
}



/* 启动充值页*/
function startRechargePage(URL, token) {
    if (URL == null) {
        alert('第一个参数是必填参数');
        return;
    }

    var action = 'startRechargePage';
    var jsonStr = null;
    if (URL != null) {
        jsonStr = '{"URL":"' + populateUrl(URL) + '"}';
    }

    ios_bCallC(action, jsonStr, token);
}



/* 关闭充值页并刷新启充值页之前的页面--个人中心或包月详情页*/
function closeRechargePage(fsrc, token) {
    //alert("已调用closeRechargePage 传入的参数为："+fsrc);
    if (fsrc == null) {
        alert('第一个参数是必填参数，个人中心传--0，包月详情页传--2');
        return;
    }
    var action = 'closeRechargePage';
    var jsonStr = null;
    jsonStr = '{"fsrc":"' + fsrc + '"}';
    ios_bCallC(action, jsonStr, token);
}




/* 2.1.15 分享*/
function shareContent(title, URL, bigLogo, description, token) {
    if (title == null) {
        alert('title是必填参数');
        return;
    }

    if (URL == null) {
        alert('URL是必填参数');
        return;
    }

    if (bigLogo == null) {
        alert('bigLogo是必填参数');
        return;
    }

    if (description == null) {
        alert('description是必填参数');
        return;
    }


    var action = 'shareContent';


    var myJSONObject = new Object();
    myJSONObject.title = title;
    myJSONObject.bigLogo = bigLogo;
    myJSONObject.description = description;
    myJSONObject.URL = URL;

    var jsonStr = JSON.stringify(myJSONObject);



    ios_bCallC(action, jsonStr, token);
    $(".pop").hide();



}





/*  客户端充值 */
function clientRecharge(token) {
    var action = 'clientRecharge';
    var jsonStr = '{}';

    ios_bCallC(action, jsonStr, token);
    $(".pop").hide();
}

/* 跳转到苹果充值*/
function startStoreCharge(money, token) {
    var action = 'startStoreCharge';

    var myJSONObject = new Object();
    myJSONObject.money = money;

    var jsonStr = JSON.stringify(myJSONObject);


    ios_bCallC(action, jsonStr, token);
    $(".pop").hide();
}

/* 是否已下载*/
function isDownload(jsMethodName, contentId, contentType, chapterID, token) {
    var action = 'isDownload';

    var myJSONObject = new Object();
    myJSONObject.jsMethodName = jsMethodName;
    myJSONObject.chapterID = chapterID;
    myJSONObject.contentType = contentType;
    myJSONObject.contentId = contentId;

    var jsonStr = JSON.stringify(myJSONObject);
    ios_bCallC(action, jsonStr, token);
    $(".pop").hide();
}

/* 是否已加入书架*/
function isAddToBookshelf(jsMethodName, contentId, contentType, chapterID, token) {
    var action = 'isAddToBookshelf';
    var myJSONObject = new Object();
    myJSONObject.jsMethodName = jsMethodName;
    myJSONObject.chapterID = chapterID;
    myJSONObject.contentType = contentType;
    myJSONObject.contentId = contentId;

    var jsonStr = JSON.stringify(myJSONObject);

    ios_bCallC(action, jsonStr, token);
    $(".pop").hide();
}

/*分享图书*/

/*BR001562 吴海瑞 20160829 ios分享传参问题*/
//extend中存在&但是不存在&amp;
/* 分享扩展 */

function shareContentEx2(contentType, bookType, contentId, chapterId, rtid, ppid, std, title, description, bigLogo, URL, extend, scene, imgUrl, token) {
    var action = 'shareContentEx2';
    var myJSONObject = new Object();
    myJSONObject.contentType = contentType;
    myJSONObject.bookType = bookType;
    myJSONObject.contentId = contentId;
    myJSONObject.chapterId = chapterId;

    myJSONObject.rtid = rtid;
    myJSONObject.ppid = ppid;
    myJSONObject.std = std;
    myJSONObject.title = title;
    myJSONObject.description = description;
    myJSONObject.bigLogo = bigLogo;
    myJSONObject.URL = URL;
    myJSONObject.extend = extend;
    myJSONObject.scene = scene;
    myJSONObject.imgUrl = imgUrl;

    var jsonStr = JSON.stringify(myJSONObject);

    ios_bCallC(action, jsonStr, token);
    $(".pop").hide();
}

function shareContentEx(contentType, bookType, contentId, chapterId, rtid, ppid, std, title, description, bigLogo, URL, extend, scene, token) {
    if (extend.indexOf('&') != -1 && extend.indexOf('&amp;') == -1) {
        extend = extend.replace('&', '&amp;');
    }
    var action = 'shareContentEx';
    var myJSONObject = new Object();
    myJSONObject.contentType = contentType;
    myJSONObject.bookType = bookType;
    myJSONObject.contentId = contentId;
    myJSONObject.chapterId = chapterId;

    myJSONObject.rtid = rtid;
    myJSONObject.ppid = ppid;
    myJSONObject.std = std;
    myJSONObject.title = title;
    myJSONObject.description = description;
    myJSONObject.bigLogo = bigLogo;
    myJSONObject.URL = URL;
    myJSONObject.extend = extend;
    myJSONObject.scene = scene;

    var jsonStr = JSON.stringify(myJSONObject);

    ios_bCallC(action, jsonStr, token);
    $(".pop").hide();
}

/* 2.1.8 去书城UESFTL-3965 */
function goBookStore(token) {
    var action = 'goBookStore';
    var jsonStr = '{}';

    ios_bCallC(action, jsonStr, token);
}



/*UESFTL-4501 20150615 baowei*/
/*UESFTL-5272 蔡红 20151027 添加bookLevel参数*/
/* UESFTL-5654、马晓娜、20160129增加两个参数 */
/* 2.1.16 详情页加载完成时，调些方法，把进阅读页要用的数据传给C,此方法与进阅读页参数完全一致 */
function pushDataWhenLoaded(contentID, chapterID, contentType, offset,
    contentName, bigLogo, chargeMode, authorName, chapterName, description, bookLevel, recentlyTime, isCompare, token) {

    if (contentID == null) {
        alert('第一个参数是必填参数');
        return;
    }
    if (chapterID == null) {
        alert('第二个参数是必填参数');
        return;
    }
    if (contentType == null) {
        alert('第三个参数是必填参数');
        return;
    }
    if (offset == null) {
        alert('第四个参数是必填参数');
        return;
    }
    if (contentName == null) {
        alert('第五个参数是必填参数');
        return;
    }
    if (bigLogo == null) {
        alert('第六个参数是必填参数');
        return;
    }

    if (chargeMode == null) {
        alert('chargeMode是必填参数');
        return;
    }

    // if (authorName == null) {
    //     alert('authorName是必填参数');
    //     return;
    // }
    if (bookLevel == null) {
        alert('bookLevel是必填参数');
        return;
    }
    bigLogo = populateUrl(bigLogo);
    var action = 'pushDataWhenLoaded';

    var myJSONObject = new Object();
    myJSONObject.contentType = contentType;
    myJSONObject.contentID = contentID;
    myJSONObject.contentName = contentName;
    myJSONObject.bigLogo = bigLogo;
    myJSONObject.offset = offset;
    myJSONObject.chapterID = chapterID;
    myJSONObject.chargeMode = chargeMode;
    myJSONObject.authorName = authorName;
    myJSONObject.chapterName = chapterName;
    myJSONObject.recentlyTime = recentlyTime;
    myJSONObject.isCompare = true;

    if (description != null) {
        myJSONObject.description = description;
    }
    myJSONObject.bookLevel = bookLevel;
    var jsonStr = JSON.stringify(myJSONObject);
    ios_bCallC(action, jsonStr, token);
}



/* 我、设置、资费等页面 启动随机用户绑定手机号码页面 */
function startBindAccount(token) {
    var action = 'startBindAccount';
    var jsonStr = '{}';

    ios_bCallC(action, jsonStr, token);
}


/* uesftl-5009、蔡红、20150906、启动TTS朗读页 */
/* UESFTL-5654、马晓娜、20160129增加两个参数 */
function startTTSReader(contentID, chapterID, contentType, offset,
    contentName, bigLogo, chargeMode, authorName, chapterName, description, recentlyTime, isCompare, token) {
    if (contentID == null) {
        alert('第一个参数是必填参数');
        return;
    }
    if (chapterID == null) {
        alert('第二个参数是必填参数');
        return;
    }
    if (contentType == null) {
        alert('第三个参数是必填参数');
        return;
    }
    if (offset == null) {
        alert('第四个参数是必填参数');
        return;
    }
    if (contentName == null) {
        alert('第五个参数是必填参数');
        return;
    }
    if (bigLogo == null) {
        alert('第六个参数是必填参数');
        return;
    }
    if (chargeMode == null) {
        alert('chargeMode是必填参数');
        return;
    }
    if (authorName == null) {
        alert('authorName是必填参数');
        return;
    }


    bigLogo = populateUrl(bigLogo);
    var action = 'startTTSReader';

    var myJSONObject = new Object();
    myJSONObject.contentType = contentType;
    myJSONObject.contentID = contentID;
    myJSONObject.contentName = contentName;
    myJSONObject.bigLogo = bigLogo;
    myJSONObject.offset = offset;
    myJSONObject.chapterID = chapterID;

    myJSONObject.chargeMode = chargeMode;
    myJSONObject.authorName = authorName;
    myJSONObject.chapterName = chapterName;
    myJSONObject.recentlyTime = recentlyTime;
    myJSONObject.isCompare = true;

    if (description != null) {
        myJSONObject.description = description;
    }

    var jsonStr = JSON.stringify(myJSONObject);
    ios_bCallC(action, jsonStr, token);
}


/****ftl5288发现导航,20151102,车宏亮********/
function startCommonMainPage(channelTag, url, token) {
    if (channelTag == null) {
        alert('channelTag参数是必填参数');
        return;
    }
    var action = 'startCommonMainPage';
    var myJSONObject = new Object();
    myJSONObject.channelTag = channelTag;
    myJSONObject.url = url;
    var jsonStr = JSON.stringify(myJSONObject)
    ios_bCallC(action, jsonStr, token);
    $(".pop").hide();
}
/****ftl5288发现导航，20151102，车宏亮****/

/****uesftl-5615，20160122，马广程，加载听书详情页面****/
function startAudioBookDetailPage(url, token) {
    if (url == null) {
        alert('url参数是必填参数');
        return;
    }
    var action = 'startAudioBookDetailPage';
    var myJSONObject = new Object();
    myJSONObject.url = url;

    var jsonStr = JSON.stringify(myJSONObject);
    ios_bCallC(action, jsonStr, token);
}
/****uesftl-5615，20160122，马广程，加载听书详情页面****/

/*启动外部页面   2016.01.12 增加   李奉  联调测试客服页面*/
/*UESFTL5726、王吉、20160302、新增*/
function startExPage(url, needCache, forbiddenPullRefresh,hideClientNavigationBar,noCustomRequest
,token) {
    if (url == null) {
        alert('第一个参数是必填参数');
        return;
    }

    var action = 'startExPage';
    var myJSONObject = new Object();
    myJSONObject.url = url;
    myJSONObject.needCache = needCache;
    myJSONObject.forbiddenPullRefresh = forbiddenPullRefresh;
    if(hideClientNavigationBar!=""&&hideClientNavigationBar!=null){myJSONObject.hideClientNavigationBar = hideClientNavigationBar;}
    if(noCustomRequest!=""&&noCustomRequest!=null){myJSONObject.noCustomRequest = noCustomRequest;}

    var jsonStr = JSON.stringify(myJSONObject);
    ios_bCallC(action, jsonStr, token);
}
/*启动外部页面   2016.01.12 增加   李奉  联调测试客服页面   END*/

/* UESFTL-5772 start 吴海瑞 20160719 启动账号关联页面 */
/**
startMobileRelateAccount(场景id,关联成功后的进入地址[可空],'')
*/
function startMobileRelateAccount(sceneId, successAction, token) {
    var action = 'startMobileRelateAccount';
    var jsonStr = '{}';
    if (sceneId == null) {
        alert("缺少参数 sceneId");
    }
    jsonStr = '{"sceneId":"' + sceneId + '", "successAction":"' + successAction + '"}';

    ios_bCallC(action, jsonStr, token);
}
/* UESFTL-5772 end 吴海瑞 20160719 启动账号关联页面 */

/*跳转到手机浏览器下载应用 uesftl-6217*/
function startIEForDownload(url, token) {
    if (url == null) {
        alert('第一个参数是必填参数');
        return;
    }

    var action = 'startIEForDownload';
    var myJSONObject = new Object();
    myJSONObject.url = url;

    var jsonStr = JSON.stringify(myJSONObject);
    ios_bCallC(action, jsonStr, token);
}

/*阅读基因推荐*/
function readGeneChange(token) {
    var action = 'readGeneChange';
    var jsonStr = '{}';
    ios_bCallC(action, jsonStr, token);
}


/*包月订购*/
function subscribeCatalog(catalogId, subCircle, isRecharge, subType, productId, isPlatCatalogId, token) {
    if (catalogId == null) {
        alert('第一个参数是必填参数');
        return;
    }

    if (subCircle == null) {
        alert('第二个参数是必填参数');
        return;
    }

    if (isRecharge == null) {
        alert('第三个参数是必填参数');
        return;
    }

    if (subType == null) {
        alert('第四个参数是必填参数');
        return;
    }

    if (productId == null) {
        alert('第五个参数是必填参数');
        return;
    }

    if (isPlatCatalogId == null) {
        alert('第六个参数是必填参数');
        return;
    }

    var action = 'subscribeCatalog';
    var myJSONObject = new Object();
    myJSONObject.catalogId = catalogId;
    myJSONObject.subCircle = subCircle;
    myJSONObject.isRecharge = isRecharge;
    myJSONObject.subType = subType;
    myJSONObject.productId = productId;
    myJSONObject.isPlatCatalogId = isPlatCatalogId;
    var jsonStr = JSON.stringify(myJSONObject);
    ios_bCallC(action, jsonStr, token);
}

/*iOS包月退订*/
function unsubscribeCatalog(token) {
    var action = 'unsubscribeCatalog';
    var jsonStr = '{}';
    ios_bCallC(action, jsonStr, token);
}

/* BR002021 吴海瑞 20161124*/
/**
 * 前端向客户端请求参数
 */
/*
function getClientValue(adJson,token){
	var action = 'getClientValue';
	var myJSONObject = new Object();
	myJSONObject.adJson = adJson;
	var jsonStr = JSON.stringify(myJSONObject);
	ios_bCallC(action,jsonStr,token);
}
*/
function getClientValue(key, token) {
    var action = 'getClientValue';
    var myJSONObject = new Object();
    myJSONObject.key = key;
    var jsonStr = JSON.stringify(myJSONObject);
    ios_bCallC(action, jsonStr, token);
}

/*浏览器返回重定向 充值并打赏*/
function goBack2Location(url, token) {
    var action = 'goBack2Location';
    var myJSONObject = new Object();
    myJSONObject.url = url;
    var jsonStr = JSON.stringify(myJSONObject);
    ios_bCallC(action, jsonStr, token);
}


/*BR001921 DYB  start */
/*
	function c_publishComment(pageId,token){
			var action = 'c_publishComment';
			var jsonStr = null;
                         alert( "pageId="+ pageId+"token="+token);
			if (pageId == null)
			   {
				   alert('缺少必要参数pageId');
				   return;
			   }
			jsonStr = '{"pageId":"' + pageId + '"}';

			ios_bCallC(action, jsonStr, token);
		}
*/

function c_publishComment(c_pageId, token) {
    var action = 'c_publishComment';
    var myJSONObject = new Object();
    myJSONObject.c_pageId = c_pageId;
    var jsonStr = JSON.stringify(myJSONObject);
    ios_bCallC(action, jsonStr, token);
}

/*BR001921 DYB  end */

/*hanjunpeng BR002714 客户端用户策反活动优化 start*/
/*iosV3.2跳转咪咕阅读详情页*/
function JumpMiguReadClient(invokeSource, token) {
    var action = 'JumpMiguReadClient';
    var myJSONObject = new Object();
    myJSONObject.invokeSource = invokeSource;
    var jsonStr = JSON.stringify(myJSONObject);
    ios_bCallC(action, jsonStr, token);
}
/*拼接完整路径*/
function populateUrl(URL) {
    if (URL && URL.indexOf("http") != 0) {
        return document.location.protocol + '//' + document.location.host + URL;
    } else {
        return URL;
    }
}
/*ios通用JS方法*/
function ios_bCallC(action, json, token) {
    var url = 'cmread-objc://' + action + '.' + token + '#' + json;
    window.location = url;
}
/*hanjunpeng BR002714 客户端用户策反活动优化 end*/
/*lyf 打开个人私信页面 偷书二期*/
function startSimplePage(URL,flag,operateUrl,token)
{
	if(URL == null)
	{
        alert('第一个参数是必填参数');
        return;
	}
	var action = 'startSimplePage';
	var myJSONObject = new Object();
	myJSONObject.URL = URL;
	myJSONObject.flag = flag;
	myJSONObject.operateUrl = operateUrl;
	var jsonStr = JSON.stringify(myJSONObject);
	ios_bCallC(action,jsonStr,token);
}
/*前端批量加入书架成功后告知客户端刷新书架*/
function refreshBookShelf(token)
{
    var action = 'refreshBookShelf';
    var jsonStr = '{}';
    ios_bCallC(action,jsonStr,token);
}
/*启动用户笔记*/
function startUserNotes(token)
{
	var action = 'startUserNotes';
	var jsonStr = '{}';
	ios_bCallC(action,jsonStr,token);
}

/*框架准备完毕*/
function documentReady(token)
{
	var action = 'documentReady';
	var jsonStr = '{}';
	ios_bCallC(action,jsonStr,token);
}
/*启动客户端定位*/
function startLocation(token)
{
	var action = 'startLocation';
	var jsonStr = '{}';
	ios_bCallC(action,jsonStr,token);
}

/**
前端通知客户端将书签信息加入书架，如果已在书架，需要提醒用户“该书已在书架”
stealBookSuccess(书项ID,书名,内容类型{1235},封面大URL,作者名,图书等级{1234},章节ID,章节名称,偷书免费剩余几天)
*/
function stealBookSuccess(contentID,contentName,contentType,bigLogo,authorName,bookLevel,chapterID,chapterName,remainDay,isSerial,token){
	if(contentID==null){
	 	alert('contentID是必填参数');
        return;
	}
	if(contentName==null){
	 	alert('contentName是必填参数');
        return;
	}
	if(contentType==null){
	 	alert('contentType是必填参数');
        return;
	}
	if(bigLogo==null){
	 	alert('bigLogo是必填参数');
        return;
	}
	if(authorName==null){
	 	alert('authorName是必填参数');
        return;
	}
	if(bookLevel==null){
	 	alert('bookLevel是必填参数');
        return;
	}
	if(chapterID==null){
	 	alert('chapterID是必填参数');
        return;
	}
	if(chapterName==null){
	 	alert('chapterName是必填参数');
        return;
	}
	if(remainDay==null){
	 	alert('remainDay是必填参数');
        return;
	}
	if(isSerial==null){
	 	alert('isSerial是必填参数');
        return;
	}
	var action = 'stealBookSuccess';
	var jsonStr = '';
	jsonStr = '{"contentID":"' + contentID;
	jsonStr = jsonStr + '", "contentID":"' + contentID;
	jsonStr = jsonStr + '", "contentName":"' + contentName;
	jsonStr = jsonStr + '", "contentType":"' + contentType;
	jsonStr = jsonStr + '", "bigLogo":"' + bigLogo;
	jsonStr = jsonStr + '", "authorName":"' + authorName;
	jsonStr = jsonStr + '", "bookLevel":"' + bookLevel;
	jsonStr = jsonStr + '", "chapterID":"' + chapterID;
	jsonStr = jsonStr + '", "chapterName":"' + chapterName;
	jsonStr = jsonStr + '", "remainDay":"' + remainDay;
	jsonStr = jsonStr + '", "isSerial":"' + isSerial;
	jsonStr = jsonStr + '"}';
	ios_bCallC(action, jsonStr, token);
}
/*UESFTL5395 20151127马晓娜修改个人信息*/
function modifyPersonInfo(infoUrl,token)
{
    if (infoUrl == null)
    {
    alert('第一个参数是必填参数');
    return;
    }
    var action ='modifyPersonInfo';
    var myJSONObject = new Object();
    myJSONObject.infoUrl =infoUrl;

    var jsonStr =JSON.stringify(myJSONObject);
    ios_bCallC(action,jsonStr,token);
}
/* 个人主页用户操作 20151027 baowei UESFTL-5223*/
function personActionResponse(actionType, actionUrl, token)
{
        if (actionType == null)
        {
           alert('第一个参数是必填参数');
           return;
        }

        var action ='personActionResponse';
        var myJSONObject = new Object();
        myJSONObject.actionType =actionType;
        myJSONObject.actionUrl =actionUrl;

        var jsonStr =JSON.stringify(myJSONObject);
        ios_bCallC(action,jsonStr,token);
}

/*mfq 个人信息基因开始 20161214*/
function saveReadGene(readGeneListJson, token)
{
    var action = 'saveReadGene';
    if (readGeneListJson == null)
    {
       alert('缺少必要参数readGeneListJson');
       return;
    }
  ios_bCallC(action, readGeneListJson, token);
}

/* BR001530 sxf 20160817 账号安全页 start*/
function startAccountAndSafe(token)
{
    var action = 'startAccountAndSafe';
    var jsonStr = '{}';
    ios_bCallC(action,jsonStr,token);
}
/*启动聊天页面*/
function c_startChatPage(sendMsisdn,avatar,nickName,token)
{
	if(sendMsisdn == null){
        alert('第一个参数是必填参数');
        return;
	}
	if(avatar == null){
        alert('第二个参数是必填参数');
        return;
	}
	if(nickName == null){
        alert('第三个参数是必填参数');
        return;
	}
	var action = 'c_startChatPage';
	var myJSONObject = new Object();
	myJSONObject.sendMsisdn = sendMsisdn;
	myJSONObject.avatar = avatar;
	myJSONObject.nickName = nickName;
	var jsonStr = JSON.stringify(myJSONObject);
	ios_bCallC(action,jsonStr,token);
}


/* BR001530 sxf 20160817 启动SDK账号升级界面页面 start*/
function c_startMiguAccountUpgrade(token)
{
    var action = 'c_startMiguAccountUpgrade';
    var jsonStr = '{}';
    ios_bCallC(action,jsonStr,token);
}
/*恢复购买*/
function restoreAppStoreCatalogProduct(token)
{
var action = 'restoreAppStoreCatalogProduct';
jsonStr = '{}';
cmrsdk.ios_bCallC(action,jsonStr,token);
}
/*跳转笔记详情页面
noteId笔记ID、msisdn笔记作者阅读号
*/
function startNoteDetailPage(noteId,msisdn,token){
    if (noteId == null) {
        alert('noteId是必填项');
        return
    }
    if (msisdn == null) {
        alert('msisdn是必填项');
        return
    }
    var action = "startNoteDetailPage";
    var jsonStr = '{"noteId":"'+noteId+'","msisdn":"'+msisdn+'"}';
    ios_bCallC(action,jsonStr,token);
}
/*打开最近阅读页*/
function startRecentlyReadMoreActivity(token) {
    var action = 'startRecentlyReadMoreActivity';
    var jsonStr = '{}';

    ios_bCallC(action, jsonStr, token);
}
