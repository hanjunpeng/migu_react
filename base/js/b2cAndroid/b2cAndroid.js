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
    /* 以下为连接字符串，用本方法传进来的两个参数拼接jsonStr */
    if (successAction != null) {
        jsonStr = '{"successAction":"' + successAction;
    }
    if (background != null) {
        if (jsonStr != null) {
            jsonStr = jsonStr + '", "background":"' + background;
        } else {
            jsonStr = '{"background":"' + background;
        }
    }

    if (jsonStr != null) {
        jsonStr += '"}';
    }

    cmread.callBackClient(action, jsonStr, token);
}

/* 2.1.2 频道跳转 */
function jumpCatalog(jumpURL, ChannelID, CatalogID, token) {
    if (jumpURL == null) {
        alert('第一个参数是必填参数');
        return;
    }

    if (ChannelID == null) {
        alert('第二个参数是必填参数');
        return;
    }

    var action = 'jumpCatalog';
    var jsonStr = null;
    jumpURL = populateUrl(jumpURL);

    /* 以下为连接字符串，用本方法传进来的两个参数拼接jsonStr */
    jsonStr = '{"jumpURL":"' + jumpURL + '", "ChannelID":"' + ChannelID;

    if (CatalogID != null) {
        jsonStr = jsonStr + '", "CatalogID":"' + CatalogID;
    }

    jsonStr += '"}';

    cmread.callBackClient(action, jsonStr, token);
}

/* 2.1.3 下载  uesftl-4351、蔡红、20150520 4.4版本 下载 */
function downloadContent(URL, contentID, contentType, contentName, chapterID,
    chapterName, chargeMode, bigLogo, authorName, speakerName, description, isSerial, isPrePackFinished,downMaxVersion,token) {
    if (URL == null) {
        alert('第一个参数是必填参数');
        return;
    }

    if (contentID == null) {
        alert('第二个参数是必填参数');
        return;
    }

    if (contentType == null) {
        alert('第三个参数是必填参数');
        return;
    }

    if (contentName == null) {
        alert('第四个参数是必填参数');
        return;
    }
    if (chargeMode == null) {
        alert('第七个参数是必填参数');
        return;
    }
    if (bigLogo == null) {
        alert('第八个参数是必填参数');
        return;
    }
    var action = 'download';
    var jsonStr = null;
    URL = populateUrl(URL);
    bigLogo = populateUrl(bigLogo);

    /* 以下为连接字符串，用本方法传进来的两个参数拼接jsonStr */
    jsonStr = '{"URL":"' + URL + '", "contentID":"' + contentID +
        '", "contentType":"' + contentType + '", "contentName":"' +
        contentName + '", "chargeMode":"' + chargeMode + '", "bigLogo":"' +
        bigLogo;

    if (chapterID != null) {
        jsonStr = jsonStr + '", "chapterID":"' + chapterID;
    }
    if (chapterName != null) {
        jsonStr = jsonStr + '", "chapterName":"' + chapterName;
    }
    if (authorName != null) {
        jsonStr = jsonStr + '", "authorName":"' + authorName;
    }
    if (speakerName != null) {
        jsonStr = jsonStr + '", "speakerName":"' + speakerName;
    }
    if (description != null) {
        jsonStr = jsonStr + '", "description":"' + description;
    }
    if (isSerial != null) {
        jsonStr = jsonStr + '", "isSerial":"' + isSerial;
    }
    if (isPrePackFinished != null) {
        jsonStr = jsonStr + '", "isPrePackFinished":"' + isPrePackFinished;
    }
    if (downMaxVersion != null) {
        jsonStr = jsonStr + '", "downMaxVersion":"' + downMaxVersion;
    }
    jsonStr += '"}';

    cmread.callBackClient(action, jsonStr, token);
}

/* 2.1.4 关闭页面 */
function closePage(token) {
    var action = 'closePage';
    var jsonStr = '{}';

    cmread.callBackClient(action, jsonStr, token);
}

/* 2.1.5 后退 */
function goBack(token) {
    var action = 'goBack';
    var jsonStr = '{"close": true}';

    cmread.callBackClient(action, jsonStr, token);
}

/* 2.1.6 刷新 */
function viewRefresh(token) {
    var action = 'viewRefresh';
    var jsonStr = '{}';
    cmread.callBackClient(action, jsonStr, token);
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
    cmread.callBackClient(action, jsonStr, token);
}

/* 2.1.8 批量下载图书分册  uesftl-4351、蔡红、20150520 4.4版本 批量下载图书分册 */
function batchDownloadFascicle(contentID, contentName, chargeMode, bigLogo, authorName, isSerial, isPrePackFinished, token) {
    if (contentID == null) {
        alert('第一个参数是必填参数');
        return;
    }
    if (contentName == null) {
        alert('第二个参数是必填参数');
        return;
    }
    if (chargeMode == null) {
        alert('第三个参数是必填参数');
        return;
    }
    if (bigLogo == null) {
        alert('第四个参数是必填参数');
        return;
    }
    var action = 'batchDownloadFascicle';
    var jsonStr = null;
    bigLogo = populateUrl(bigLogo);

    /* 以下为连接字符串，用本方法传进来的两个参数拼接jsonStr */
    jsonStr = '{"contentID":"' + contentID + '", "contentName":"' + contentName +
        '", "chargeMode":"' + chargeMode + '", "bigLogo":"' + bigLogo;

    if (authorName != null) {
        jsonStr = jsonStr + '", "authorName":"' + authorName;
    }
    if (isSerial != null) {
        jsonStr = jsonStr + '", "isSerial":"' + isSerial;
    }
    if (isPrePackFinished != null) {
        jsonStr = jsonStr + '", "isPrePackFinished":"' + isPrePackFinished;
    }
    jsonStr += '"}';

    cmread.callBackClient(action, jsonStr, token);
}

/* 2.1.9 注销 */
function logout(token) {
    var action = 'logout';
    var jsonStr = '{}';

    cmread.callBackClient(action, jsonStr, token);
}

/* 2.1.11 B页面应用防火墙 */
function startIEForDownload(jumpURL, token) {
    if (jumpURL == null) {
        alert('第一个参数是必填参数');
        return;
    }

    var action = 'startIEForDownload';
    var jsonStr = null;
    jumpURL = populateUrl(jumpURL);

    jsonStr = '{"URL":"' + jumpURL + '"}';

    cmread.callBackClient(action, jsonStr, token);
}

/* 2.2.1 启动阅读中国等页面  */
/*20151023 添加needCache参数 false为不缓存,true为缓存,此参数为空默认缓存*/
function startExPage(URL, needCache, token) {
    if (URL == null) {
        alert('第一个参数是必填参数');
        return;
    }
    var action = 'startExPage';
    var jsonStr = null;
    var jsonStr = '{"URL":"' + populateUrl(URL);
    if (needCache != null) {
        jsonStr = jsonStr + '", "needCache":"' + needCache + '"}';
    } else {
        jsonStr += '"}';
    }
    cmread.callBackClient(action, jsonStr, token);
}

/* 2.2.2 启动绑定页面 */
function startBindPaymentNumber(token) {
    var action = 'startBindPaymentNumber';
    var jsonStr = '{}';

    cmread.callBackClient(action, jsonStr, token);
}

/* 2.2.3 启动修改密码页面 */
function startChangePassword(token) {
    var action = 'startChangePassword';
    var jsonStr = '{}';

    cmread.callBackClient(action, jsonStr, token);
}

/* 2.2.4 启动设置密保页面 */
function startSetSecurityQuestion(token) {
    var action = 'startSetSecurityQuestion';
    var jsonStr = '{}';

    cmread.callBackClient(action, jsonStr, token);
}

/* 2.2.5 解除支付绑定 */
function startUnbindPaymentNumber(token) {
    var action = 'startUnbindPaymentNumber';
    var jsonStr = '{}';

    cmread.callBackClient(action, jsonStr, token);
}

/* 3.2.2 启动个人笔记 */
function startUserNotes(token) {
    var action = 'startUserNotes';
    var jsonStr = '{}';

    cmread.callBackClient(action, jsonStr, token);
}

/* 2.3.1启动图书/漫画/杂志/听书阅读页 */
/* UESFTL-5563、马晓娜、20160106增加两个参数 */
/* BR001497、shenxiafei、20160818增加authorName */
function startCommonReader(contentID, chapterID, contentType, offset,
    contentName, bigLogo, authorName, recentlyTime, isCompare, downMaxVersion, token) {

    //alert(contentID+","+ chapterID+","+ contentType+","+ offset+","+contentName+","+ bigLogo+","+recentlyTime+","+isCompare)
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

    bigLogo = populateUrl(bigLogo);
    downMaxVersion=downMaxVersion||"";
    var action = 'startCommonReader';
    var jsonStr = null;
    jsonStr = '{"contentID":"' + contentID + '","chapterID":"' + chapterID +
        '","contentType":"' + contentType + '","offset":"' + offset +
        '","contentName":"' + contentName + '","bigLogo":"' + bigLogo +
        '","recentlyTime":"' + recentlyTime + '","isCompare":"' + isCompare +
        '","authorName":"' + authorName + '","downMaxVersion":"'+downMaxVersion+'"}';

    cmread.callBackClient(action, jsonStr, token);
}

/* 2.3.2 启动目录页 */
function startChapterList(contentID, contentType, contentName, chargeMode,
    bigLogo, authorName, speakerName, description, downMaxVersion,token) {
    if (contentID == null) {
        alert('第一个参数是必填参数');
        return;
    }
    if (contentType == null) {
        alert('第二个参数是必填参数');
        return;
    }
    if (contentName == null) {
        alert('第三个参数是必填参数');
        return;
    }
    if (chargeMode == null) {
        alert('第四个参数是必填参数');
        return;
    }
    if (bigLogo == null) {
        alert('第五个参数是必填参数');
        return;
    }
    var action = 'startChapterList';
    var jsonStr = null;
    bigLogo = populateUrl(bigLogo);
    downMaxVersion=downMaxVersion||"";

    /* 以下为连接字符串，用本方法传进来的两个参数拼接jsonStr */
    jsonStr = '{"contentID":"' + contentID +
        '", "contentType":"' + contentType + '", "contentName":"' +
        contentName + '", "chargeMode":"' + chargeMode + '", "bigLogo":"' +
        bigLogo;

    if (authorName != null) {
        jsonStr = jsonStr + '", "authorName":"' + authorName;
    }
    if (speakerName != null) {
        jsonStr = jsonStr + '", "speakerName":"' + speakerName;
    }
    if (description != null) {
        jsonStr = jsonStr + '", "description":"' + description;
    }
    if (downMaxVersion != null||downMaxVersion!="") {
        jsonStr = jsonStr + '", "downMaxVersion":"' + downMaxVersion;
    }
    jsonStr += '"}';

    cmread.callBackClient(action, jsonStr, token);
}

/* 2.4.1 设置会员专享封页 */
function setMemberOnlyCover(URL, token) {
    if (URL == null) {
        alert('第一个参数是必填参数');
        return;
    }
    var action = 'setMemberOnlyCover';
    var jsonStr = null;
    if (URL != null) {
        jsonStr = '{"URL":"' + populateUrl(URL) + '"}';
    }

    cmread.callBackClient(action, jsonStr, token);
}


/* 一键充值+订购或投票 */
/*function sendSMSForChargeAck(receiver, content, token)
{
    if (receiver == null)
    {
        alert('第一个参数是必填参数');
        return;
    }
    if (content == null)
    {
        alert('第二个参数是必填参数');
        return;
    }
    var action = 'sendSMSForChargeAck';
    var jsonStr = null;
    jsonStr = '{"receiver":"' + receiver+ '", "content":"' + content + '"}';
    cmread.callBackClient(action, jsonStr, token);
}*/

/* 一键充值+订购或投票 */
function continueTasksAfterCharge(token) {
    var action = 'continueTasksAfterCharge';
    var jsonStr = '{}';

    cmread.callBackClient(action, jsonStr, token);
}

/* shijing for the third part login*/
function startTpLogin(tokenid1) {
    var action = 'startTpLogin';
    var jsonStr = '{}';

    cmread.callBackClient(action, jsonStr, tokenid1);
}

/* 启动二级页面 */
function startSimplePage(URL, token) {
    if (URL == null) {
        alert('第一个参数是必填参数');
        return;
    }
    var action = 'startSimplePage';
    var jsonStr = null;
    if (URL != null) {
        jsonStr = '{"URL":"' + populateUrl(URL) + '"}';
    }

    cmread.callBackClient(action, jsonStr, token);
}

/*启动语音搜索*/
function startVoiceSearchpage(URL, token) {

    var action = 'startVoiceSearchpage';
    jsonStr = '{}';
    if (URL != null) {
        jsonStr = '{"URL":"' + populateUrl(URL) + '"}';
    }

    cmread.callBackClient(action, jsonStr, token);
}

/*2.1.10 加入书架 uesftl-4351、蔡红、20150520  4.4版本 加入书架 在原有的方法中多加了两个参数*/
/*2.1.10 加入书架 uesftl-5227、王吉、20151016  3.5+版本 加入书架 在原有的方法中多加了一个参数bookLevel*/
/* BR001497、shenxiafei、20160818增加authorName */
/*BR001651 吴海瑞 20160910 加入书架 增加 c_downloadAttribute,chargeMode*/
function addToBookshelf(contentType, contentID, contentName, bigLogo, chapterID, chapterName, isSerial, isPrePackFinished, bookLevel, authorName, c_downloadAttribute, chargeMode,downMaxVersion, token) {
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

    var action = 'addToBookshelf';
    var jsonStr = null;

    jsonStr = '{"contentType":"' + contentType;

    jsonStr = jsonStr + '", "contentID":"' + contentID;


    jsonStr = jsonStr + '", "contentName":"' + contentName;

    if (bigLogo != null) {
        jsonStr = jsonStr + '", "bigLogo":"' + bigLogo;
    }

    jsonStr = jsonStr + '", "chapterID":"' + chapterID;

    if (chapterName != null) {
        jsonStr = jsonStr + '", "chapterName":"' + chapterName;
    }
    if (isSerial != null) {
        jsonStr = jsonStr + '", "isSerial":"' + isSerial;
    }
    if (isPrePackFinished != null) {
        jsonStr = jsonStr + '", "isPrePackFinished":"' + isPrePackFinished;
    }
    if (bookLevel != null) {
        jsonStr = jsonStr + '", "bookLevel":"' + bookLevel;
    }
    if (authorName != null) {
        jsonStr = jsonStr + '", "authorName":"' + authorName;
    }
    if (c_downloadAttribute != null) {
        jsonStr = jsonStr + '", "c_downloadAttribute":"' + c_downloadAttribute;
    }
    if (chargeMode != null) {
        jsonStr = jsonStr + '", "chargeMode":"' + chargeMode;
    }
    if (downMaxVersion != null) {
        jsonStr = jsonStr + '", "downMaxVersion":"' + downMaxVersion;
    }
    jsonStr += '"}';

    cmread.callBackClient(action, jsonStr, token);

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

    cmread.callBackClient(action, jsonStr, token);
}

/* start RecentlyReadMoreActivity */
function startRecentlyReadMoreActivity(token) {
    var action = 'startRecentlyReadMoreActivity';
    var jsonStr = '{}';

    cmread.callBackClient(action, jsonStr, token);
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
    cmread.callBackClient(action, jsonStr, token);
}

/* 2.4.1 启动摇一摇 */
function startShakepage(dURL, rURL, pURL, sURL, token) {
    if (dURL == null) {
        alert('第一个参数是必填参数');
        return;
    }
    if (rURL == null) {
        alert('第二个参数是必填参数');
        return;
    }
    if (pURL == null) {
        alert('第三个参数是必填参数');
        return;
    }
    if (sURL == null) {
        alert('第四个参数是必填参数');
        return;
    }
    var action = 'startShakepage';
    var jsonStr = null;
    dURL = populateUrl(dURL);
    rURL = populateUrl(rURL);
    pURL = populateUrl(pURL);
    sURL = populateUrl(sURL);
    jsonStr = '{"dURL":"' + dURL + '", "rURL":"' + rURL + '", "pURL":"' + pURL + '", "sURL":"' + sURL;
    if (dURL != null) {
        jsonStr = jsonStr + '", "dURL":"' + dURL;
    }
    if (rURL != null) {
        jsonStr = jsonStr + '", "rURL":"' + rURL;
    }
    if (pURL != null) {
        jsonStr = jsonStr + '", "pURL":"' + pURL;
    }
    if (sURL != null) {
        jsonStr = jsonStr + '", "sURL":"' + sURL;
    }
    jsonStr += '"}';
    cmread.callBackClient(action, jsonStr, token);
}


/* 2.1.15 分享*/
function shareContent(title, URL, bigLogo, description, type, token) {
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

    if (type == null) {
        alert('type是必填参数');
        return;
    }

    var action = 'shareContent';
    var jsonStr = null;

    jsonStr = '{"title":"' + title;

    jsonStr = jsonStr + '", "URL":"' + URL;

    if (bigLogo != null) {
        jsonStr = jsonStr + '", "bigLogo":"' + bigLogo;
    }

    jsonStr = jsonStr + '", "description":"' + description;



    jsonStr = jsonStr + '", "type":"' + type;


    jsonStr += '"}';

    cmread.callBackClient(action, jsonStr, token);
    $(".pop").hide();



}

/* recommend this client application */
function startRecommendApp(token) {
    var action = 'startRecommendApp';
    var jsonStr = '{}';

    cmread.callBackClient(action, jsonStr, token);
}



/* 关闭摇一摇结果框 */
function closeShakeResultDialog(token) {
    var action = 'closeShakeResultDialog';
    var jsonStr = '{}';

    cmread.callBackClient(action, jsonStr, token);
}


/* 2.2.6 启动摇一摇结果详情页 */
function startShakeResultDetailPage(URL, token) {
    if (URL == null) {
        alert('第一个参数是必填参数');
        return;
    }
    var action = 'startShakeResultDetailPage';
    var jsonStr = null;
    if (URL != null) {
        jsonStr = '{"URL":"' + populateUrl(URL) + '"}';
    }

    cmread.callBackClient(action, jsonStr, token);
}

//语音传值
$(function() {
    $(".icon_voice").click(function() {
        var voiceUrl = $(this).attr("url");
        startVoiceSearchpage(voiceUrl + '&st=' + $("label[class=checked]").prev("input").val());
    });
});


/* go back to bookshelf from bookstore page */
function goBacktoBookshelf(token) {
    var action = 'goBacktoBookshelf';
    var jsonStr = '{}';

    cmread.callBackClient(action, jsonStr, token);
}





/*********评分 2014年5月23号新增***************/
function StartMarkContentDialog(contentId, token) {
    if (contentId == null) {
        alert('第一个参数是必填参数，个人中心传--0，包月详情页传--2');
        return;
    }
    var action = 'StartMarkContentDialog';
    var jsonStr = null;
    jsonStr = '{"contentId":"' + contentId + '"}';
    cmread.callBackClient(action, jsonStr, token);
}

/* 客户端增加短信发送能力发送通用短信*/
function sendCommonSMS(receiver, content, token) {
    if (receiver == null) {
        alert('第一个参数是必填参数');
        return;
    }
    if (content == null) {
        alert('第二个参数是必填参数');
        return;
    }
    var action = 'sendCommonSMS';
    var jsonStr = null;
    jsonStr = '{"receiver":"' + receiver + '", "content":"' + content + '"}';
    cmread.callBackClient(action, jsonStr, token);
}

/* Start MM Client */
function startMMClient(URL, callerid, phone, token) {
    if (URL == null) {
        alert('第一个参数是必填参数');
        return;
    }
    if (callerid == null) {
        alert('第二个参数是必填参数');
        return;
    }
    var action = 'startMMClient';
    var jsonStr = null;
    if (URL != null) {
        jsonStr = '{"URL":"' + URL + '", "callerid":"' + callerid + '", "phone":"' + phone + '"}';
    }

    cmread.callBackClient(action, jsonStr, token);
}





/* 2.1.19 分享扩展接口*/
function shareContentEx(shareType, detailType, contentType, bookType, contentId, chapterId, rtid, ppid, std, title, description, bigLogo, URL, imgUrl, extend, token, code, successAction,scene) {
    window.ontouchmove = "";
    if (shareType == null) {
        alert('shareType是必填参数');
        return;
    }

    if (contentType == null) {
        alert('contentType是必填参数');
        return;
    }

    var action = 'shareContentEx';
    var jsonStr = null;

    jsonStr = '{"shareType":"' + shareType;

    jsonStr = jsonStr + '", "contentType":"' + contentType;

    if (detailType != null) {
        jsonStr = jsonStr + '", "detailType":"' + detailType;
    } else if (shareType == 4) {
        alert('shareType为4时，detailType是必填参数')
        return;
    }

    if (bookType != null) {
        jsonStr = jsonStr + '", "bookType":"' + bookType;
    }

    if (contentId != null) {
        jsonStr = jsonStr + '", "contentId":"' + contentId;
    }

    if (chapterId != null) {
        jsonStr = jsonStr + '", "chapterId":"' + chapterId;
    }

    if (rtid != null) {
        jsonStr = jsonStr + '", "rtid":"' + rtid;
    }

    if (ppid != null) {
        jsonStr = jsonStr + '", "ppid":"' + ppid;
    }

    if (std != null) {
        jsonStr = jsonStr + '", "std":"' + std;
    }

    if (title != null) {
        jsonStr = jsonStr + '", "title":"' + title;
    }

    if (description != null) {
        jsonStr = jsonStr + '", "description":"' + description;
    } else if (shareType != 2) {
        alert('shareType不为2时，description是必填参数')
        return;
    }

    if (bigLogo != null) {
        jsonStr = jsonStr + '", "bigLogo":"' + bigLogo;
    }

    if (contentType == 10 && URL == null) {
        alert('contentType为10时，URL是必填参数')
        return;
    }

    if (contentType == 8 && (code == null || contentId == null)) {
        if (code == null) {
            alert('contentType为8时，code是必填参数')
        } else {
            alert('contentType为8时，contentId是单机包id，是必填参数')
        }

        return;
    }

    if (contentType == 9 && code == null) {
        alert('contentType为9时，code是必填参数')
        return;
    }

    if (URL != null) {
        jsonStr = jsonStr + '", "URL":"' + URL;
    }
    if (imgUrl != null) {
        jsonStr = jsonStr + '", "imgUrl":"' + imgUrl;
    }
    if (extend != null) {
        jsonStr = jsonStr + '", "extend":"' + extend;
    }

    if (code != null) {
        jsonStr = jsonStr + '", "code":"' + code;
    }

    if (successAction != null) {
        jsonStr = jsonStr + '", "successAction":"' + successAction;
    }
    if (scene != null) {
        jsonStr = jsonStr + '", "scene":"' + scene;
    }

    jsonStr += '"}';
    cmread.callBackClient(action, jsonStr, token);
    $(".pop").hide();


    if (contentType == 13 && imgUrl == null) {
        alert('contentType为13时，imgUrl是必填参数')
        return;
    }
}



/* 2.1.20 分享客户端*/
function shareApp(shareType, detailType, title, description, bigLogo, URL, extend, token) {

    if (shareType == null) {
        alert('shareType是必填参数');
        return;
    }

    var action = 'shareApp';
    var jsonStr = null;

    jsonStr = '{"shareType":"' + shareType;

    if (detailType != null) {
        jsonStr = jsonStr + '", "detailType":"' + detailType;
    } else if (shareType == 4) {
        alert('shareType为4时，detailType是必填参数')
        return;
    }

    if (title != null) {
        jsonStr = jsonStr + '", "title":"' + title;
    }

    if (description != null) {
        jsonStr = jsonStr + '", "description":"' + description;
    }

    if (bigLogo != null) {
        jsonStr = jsonStr + '", "bigLogo":"' + bigLogo;
    }

    if (URL != null) {
        jsonStr = jsonStr + '", "URL":"' + URL;
    }

    if (extend != null) {
        jsonStr = jsonStr + '", "extend":"' + extend;
    }

    jsonStr += '"}';

    cmread.callBackClient(action, jsonStr, token);
    $(".pop").hide();
}






/* 2.3.3 启动图书阅读页进入朗读模式 */
/* UESFTL-5563、马晓娜、20160106增加两个参数 */
/* BR001497、shenxiafei、20160818增加authorName */
function startTTSReader(contentID, chapterID, contentType, offset,
    contentName, bigLogo, authorName, recentlyTime, isCompare, token) {
    if (contentID == null) {
        alert('第一个参数是必填参数');
        return;
    }
    if (chapterID == null) {
        alert('第二个参数是必填参数');
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

    bigLogo = populateUrl(bigLogo);
    var action = 'startTTSReader';
    var jsonStr = null;
    jsonStr = '{"contentID":"' + contentID + '","chapterID":"' + chapterID +
        '","contentType":"' + contentType + '","offset":"' + offset +
        '","contentName":"' + contentName + '","bigLogo":"' + bigLogo +
        '","recentlyTime":"' + recentlyTime + '","isCompare":"' + isCompare +
        '","authorName":"' + authorName + '"}';

    cmread.callBackClient(action, jsonStr, token);
}


//充值二次确认页面
function startSMSReceiver(callingNum, calledNum, featureStr, token) {
    if (callingNum == null) {
        alert('第一个参数是必填参数');
        return;
    }
    if (calledNum == null) {
        alert('第二个参数是必填参数');
        return;
    }
    if (featureStr == null) {
        alert('第三个参数是必填参数');
        return;
    }

    var action = 'startSMSReceiver';
    var jsonStr = null;

    jsonStr = '{"callingNum":"' + callingNum + '", "calledNum":"' + calledNum + '", "featureStr":"' + featureStr + '"}';

    cmread.callBackClient(action, jsonStr, token);
}


/*分享回流*/
function EnCliAndDown(forwardUrl, bookDownUrlStr, BookIDStr) {
    var ifrSrc = forwardUrl;
    var androidIOS_Down_Url = bookDownUrlStr;

    var ua = window.navigator.userAgent;
    var UA_widowToLower = ua.toLowerCase();
    var ifr = document.createElement('iframe');
    if (UA_widowToLower.indexOf("android") != -1) {
        document.location = bookDownUrlStr;
    }
    /*else if(UA_widowToLower.indexOf("iphone")!=-1){
    	   document.location = "http://wap.cmread.com/r/t/dliPhone.jsp?vt=3";
    	}*/
    if (UA_widowToLower.indexOf("android") != -1) {

        //  ifr.src = "cmreadlisten://cmread.com/client?url="+encodeURIComponent(ifrSrc);
        ifr.src = "cmread://cmread.com/client?url=" + encodeURIComponent(ifrSrc); //新修改的听书回流只能唤起听书专版客户端，专版客户端没有发出版本，暂时改回去IREAD-29950
    }
    /*else if(UA_widowToLower.indexOf("iphone")!=-1){
    	  ifr.src = "cmread://cmread.com/client?detail:contentId="+BookIDStr;

    	}*/
    ifr.style.display = 'none';
    document.body.appendChild(ifr);
    setTimeout(function() {
        document.body.removeChild(ifr);

    }, 200);
}


$(function() {
    $("#OpenForOther").click(function() {
        $(".sharebackpop").hide();
    })
});


/* start SendSMS for UNICOM charge  2015-1-8号新增*/
function sendSMSForUNICOMChargeAck(receiver, content, token) {
    if (receiver == null) {
        alert('第一个参数是必填参数');
        return;
    }
    if (content == null) {
        alert('第二个参数是必填参数');
        return;
    }
    var action = 'sendSMSForUNICOMChargeAck';
    var jsonStr = null;
    jsonStr = '{"receiver":"' + receiver + '", "content":"' + content + '"}';
    cmread.callBackClient(action, jsonStr, token);
}



/* 启动下金币雨页面3.6及以上版本可用 */
function startGoldRainPage(URL, refreshURL, token) {
    if (URL == null) {
        alert('第一个参数是必填参数');
        return;
    }
    if (refreshURL == null) {
        alert('第二个参数是必填参数');
        return;
    }
    var action = 'startGoldRainPage';
    var jsonStr = null;

    jsonStr = '{"URL":"' + URL + '", "refreshURL":"' + refreshURL + '"}';
    cmread.callBackClient(action, jsonStr, token);
}








/*
* @method startRecharge
* @param subject 商品名称
* @param total_fee 金额
* @param body 商品详情
* @param notify_url 自动跳转商户地址
* @param result_url 结果页地址
* @param orderId  订单号
2015/4/17号新增，修改人：zhaohuan
*/
function payToAlipay(subject, total_fee, body, notify_url, result_url, orderId) {
    if (subject == null) {
        alert("缺少参数 subject");
        return;
    }
    if (total_fee == null) {
        alert("缺少参数 total_fee");
        return;
    }
    if (body == null) {
        alert("缺少参数 body");
        return;
    }
    if (result_url == null) {
        alert("缺少参数 result_url");
        return;
    }
    if (orderId == null) {
        alert("缺少参数 orderId");
        return;
    }

    var resulturl = location.protocol + "//" + location.hostname + result_url;
    var action = "payToAlipay";
    var jsonStr = "";
    jsonStr = '{"subject":"' + subject + '"' + ',"total_fee":"' + total_fee + '"' + ',"body":"' + body + '"' + ',"result_url":"' + resulturl + '"' + ',"orderId":"' + orderId + '"';
    if (notify_url != null) {
        jsonStr += ',"notify_url":"' + notify_url + '"';
    }
    jsonStr += '}';
    console.log(jsonStr); //吴海瑞 20161206 测试数据
    cmread.callBackClient(action, jsonStr, "");
}


/* 2.4.15 摘要页滑动阅读页  uesftl-4501 鲍魏 20150609*/
/* UESFTL-5563、马晓娜、20160106增加两个参数 */
/* BR001497、shenxiafei、20160818增加authorName */
function getAbstractParams(contentID, chapterID, contentType, offset,
    contentName, bigLogo, recentlyTime, isCompare, authorName, token)


{
    /*alert(contentID +","+chapterID+","+contentType+","+ offset +","+ contentName +","+ bigLogo+","+ token+","+recentlyTime +","+ isCompare);*/
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

    bigLogo = populateUrl(bigLogo);
    var action = 'getAbstractParams';
    var jsonStr = null;
    jsonStr = '{"contentID":"' + contentID + '","chapterID":"' + chapterID +
        '","contentType":"' + contentType + '","offset":"' + offset +
        '","contentName":"' + contentName + '","bigLogo":"' + bigLogo +
        '","recentlyTime":"' + recentlyTime + '","isCompare":"' + isCompare +
        '","authorName":"' + authorName + '"}';
    cmread.callBackClient(action, jsonStr, token);
}
/*UESFTL-4544 刷新个人中心昵称 王文斌 20150611*/
function refreshPersonal(token) {
    var action = 'refreshPersonal';
    var jsonStr = '{}';

    cmread.callBackClient(action, jsonStr, token);
}


/* uesftl-4467、20150610、王吉 */
/**
 * 前端向客户端请求参数
 */
function getClientValue(key, token) {
    if (key == null) {
        alert('key参数是必填参数');
        return;
    }
    var action = 'getClientValue';
    var jsonStr = null;
    jsonStr = '{"key":"' + key + '"}';
    cmread.callBackClient(action, jsonStr, token);
}

/* uesftl-4467、20150610、王吉 */
/**
 * 启动听书/漫画/杂志-图片首页
 */
function startCommonMainPage(channelTag, token) {
    if (channelTag == null) {
        alert('channelTag参数是必填参数');
        return;
    }
    var action = 'startCommonMainPage';
    var jsonStr = null;
    jsonStr = '{"channelTag":"' + channelTag + '"}';

    cmread.callBackClient(action, jsonStr, token);
}


/* uesftl-4467、20150610、王吉 */
/**
 * 启动不一样的精彩页面
 */
function startMoreWonderfulPage(token) {
    var action = 'startMoreWonderfulPage';
    var jsonStr = '{}';

    cmread.callBackClient(action, jsonStr, token);
}

/* uesftl-4467、20150610、王吉 */
/**
 * 启动偷书页面
 */
function startStealBookPage(token) {
    var action = 'startStealBookPage';
    var jsonStr = '{}';

    cmread.callBackClient(action, jsonStr, token);
}

/* uesftl-4467、20150610、王吉 */
function startOfferWall(token) {
    var action = 'startOfferWall';
    var jsonStr = '{}';
    cmread.callBackClient(action, jsonStr, token);
}




/** 2015/6/29  zhaohuan
 * @method payToWX
 * @param appid 开放平台账号
 * @param noncestr 随机字符串
 * @param partnerid 注册时分配的财付通账号
 * @param prepayid 预支付订单号
 * @param timestamp 时间戳
 * @param sign  签名
 * @param result_url  回调地址
 */
function payToWX(appid, noncestr, partnerid, prepayid, timestamp, sign, result_url, token) {
    if (appid == null) {
        alert("缺少参数 appid");
        return;
    }
    if (noncestr == null) {
        alert("缺少参数 noncestr");
        return;
    }
    if (partnerid == null) {
        alert("缺少参数 partnerid");
        return;
    }
    if (prepayid == null) {
        alert("缺少参数 prepayid");
        return;
    }
    if (timestamp == null) {
        alert("缺少参数 timestamp");
        return;
    }
    if (sign == null) {
        alert("缺少参数 sign");
        return;
    }
    if (result_url == null) {
        alert("缺少参数 result_url");
        return;
    }

    var action = "payToWX";
    var jsonStr = null;

    jsonStr = '{"appid":"' + appid + '", "noncestr":"' + noncestr + '", "partnerid":"' + partnerid + '", "prepayid":"' + prepayid + '", "timestamp":"' + timestamp + '", "sign":"' + sign + '", "result_url":"' + result_url + '"}';
    //alert(action +"===="+jsonStr );
    cmread.callBackClient(action, jsonStr, token);
}

/* 我、设置、资费等页面 启动随机用户绑定手机号码页面 uesftl-4506*/
function startBindAccount(token) {
    var action = 'startBindAccount';
    var jsonStr = '{}';

    cmread.callBackClient(action, jsonStr, token);
}



/* uesftl-4631、20150730、wwb */
/* 2.1.35	切换账号登录 */
function switchAccountLogin(successAction, token) {
    var action = 'switchAccountLogin';
    var jsonStr = null;
    if (successAction.indexOf('javascript:') != 0) {
        successAction = populateUrl(successAction);
    }
    if (successAction != null) {
        jsonStr = '{"successAction":"' + successAction + '"}';
    }

    cmread.callBackClient(action, jsonStr, token);
}


/* 2.4.19 配合前端页面，优化特殊的webview样式 */
/*20150804 baowei UESFTL-4807*/
function startEventWebPage(jumpURL, token) {
    if (jumpURL == null) {
        alert('缺少必要参数jumpURL');
        return;
    }

    var action = 'startEventWebPage';
    var jsonStr = null;
    jumpURL = populateUrl(jumpURL);

    jsonStr = '{"URL":"' + jumpURL + '"}';

    cmread.callBackClient(action, jsonStr, token);
}


/* 2.1.12	发送三网融合确认短信*/
/*20150805 baowei UESFTL-4753*/
function sendSMSForChargeAck(receiver, content, operator, orderId, token) {
    if (receiver == null) {
        alert('第一个参数是必填参数');
        return;
    }
    if (content == null) {
        alert('第二个参数是必填参数');
        return;
    }
    /*if (operator == null)
    {
        alert('第三个参数是必填参数');
        return;
    }
    if (orderId == null)
    {
        alert('第四个参数是必填参数');
        return;
    }*/
    var action = 'sendSMSForChargeAck';
    var jsonStr = null;
    jsonStr = '{"receiver":"' + receiver + '", "content":"' + content + '", "operator":"' + operator + '", "orderId":"' + orderId + '"}';
    cmread.callBackClient(action, jsonStr, token);
}

/*2.4.16 在咪咕星页面,单机包下载管理*/
function notifyDownload(state, productID, url, packageName, token) {
    var action = 'notifyDownload';
    var jsonStr = null;
    if (state == null) {
        alert('缺少必要参数state');
        return;
    }
    if (productID == null) {
        alert('缺少必要参数productID');
        return;
    }
    if (((state.indexOf("0") == 0) || (state.indexOf("3") == 0)) && url == null) {
        alert('当启动或继续下载时需要传url');
        return;
    }
    if (((state.indexOf("0") == 0) || (state.indexOf("3") == 0)) && packageName == null) {
        alert('当启动或继续下载时需要传packageName');
        return;
    }
    jsonStr = '{"state":"' + state + '", "productID":"' + productID;

    if (url != null) {
        jsonStr = jsonStr + '", "url":"' + url;
    }
    if (packageName != null) {
        jsonStr = jsonStr + '", "packageName":"' + packageName;
    }
    jsonStr += '"}';

    cmread.callBackClient(action, jsonStr, token);
}
/*2.4.17 在咪咕星页面,通知客户端需下载单机包列表*/
function sendDonwloadList(downloadListJson, token) {
    var action = 'sendDonwloadList';
    if (downloadListJson == null) {
        alert('缺少必要参数downloadListJson');
        return;
    }
    cmread.callBackClient(action, downloadListJson, token);
}
/* 2.4.18 通知F码*/
function notifyFcode(Fcode, contentId, token) {
    var action = "notifyFcode";
    var jsonStr = null;
    if (Fcode == null) {
        alert("缺少参数 Fcode");
    }
    if (contentId == null) {
        alert("缺少参数 contentId");
    }
    jsonStr = '{"Fcode":"' + Fcode + '", "contentId":"' + contentId + '"}';

    cmread.callBackClient(action, jsonStr, token);
}

/*2.1.37	关闭充值/悦读中国等外部页面并刷新之前的页面*/
function closeExPage(token) {
    var action = 'closeExPage';
    var jsonStr = '{}';

    cmread.callBackClient(action, jsonStr, token);
}


/* 通知包月订购状态*/
function getCatalogPayResult(resultCode, token) {
    var action = 'getCatalogPayResult';
    var jsonStr = null;
    if (resultCode == null) {
        alert('缺少必要参数resultCode');
        return;
    }

    jsonStr = '{"resultCode":"' + resultCode + '"}';

    cmread.callBackClient(action, jsonStr, token);
}

/* 用于向客户端唤起签约支付宝钱包功能 */
function startBindAlipay(token) {
    var action = 'startBindAlipay';
    var jsonStr = '{}';

    cmread.callBackClient(action, jsonStr, token);
}

/* 非移用户获取绑定支付号码状态*/
function getBindNumberState(uid, token) {
    var action = 'getBindNumberState';
    var jsonStr = null;
    if (uid == null) {
        alert('缺少必要参数uid');
        return;
    }

    jsonStr = '{"uid":"' + uid + '"}';

    cmread.callBackClient(action, jsonStr, token);
}


/* 在应用墙,通知客户端需下载单机包列表    UESFTL-5812 李奉 2016.03.30 */
function c_sendApkDownloadList(c_downloadListJson, token) {
    var action = 'c_sendApkDownloadList';
    if (c_downloadListJson == null) {
        alert('缺少必要参数c_downloadListJson');
        return;
    }
    cmread.callBackClient(action, c_downloadListJson, token);
}



/* 在应用墙,单机包下载管理   UESFTL-5812 李奉 2016.03.30 */
function c_notifyApkDownload(c_state, c_url, c_packageName, token) {
    var action = 'c_notifyApkDownload';
    var jsonStr = null;
    if (c_state == null) {
        alert('缺少必要参数c_state');
        return;
    }

    if (((c_state.indexOf("0") == 0) || (c_state.indexOf("3") == 0)) && c_url == null) {
        alert('当启动或继续下载时需要传c_url');
        return;
    }
    if (((c_state.indexOf("0") == 0) || (c_state.indexOf("3") == 0)) && c_packageName == null) {
        alert('当启动或继续下载时需要传c_packageName');
        return;
    }
    jsonStr = '{"c_state":"' + c_state;

    if (c_url != null) {
        jsonStr = jsonStr + '", "c_url":"' + c_url;
    }
    if (c_packageName != null) {
        jsonStr = jsonStr + '", "c_packageName":"' + c_packageName;
    }
    jsonStr += '"}';

    cmread.callBackClient(action, jsonStr, token);
}

/*UESFTL-5772 start 吴海瑞 20160718*/
/**
relateAccountSuccess(登录成功后进行的动作,二级账号成功关联的手机号码)
用于升级账号成功后把号码传给客户端
*/
function relateAccountSuccess(successAction, relatedMobile, token) {
    if (relatedMobile == null) {
        alert("relatedMobile参数不能为空");
        return;
    }
    var action = 'relateAccountSuccess';
    var jsonStr = '{"relatedMobile":"' + relatedMobile + '"}';
    cmread.callBackClient(action, jsonStr, token);
}

/* 2.2.12 启动账号关联页面 */
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

    cmread.callBackClient(action, jsonStr, token);
}
/*UESFTL-5772 end 吴海瑞 20160718*/




/*2.1.38 启动查询微信appid是否支持微信微支付*/
function c_queryWeChatAppId(token) {
    var action = 'c_queryWeChatAppId';
    var jsonStr = '{}';
    cmread.callBackClient(action, jsonStr, token);
}

/*2.1.39 启动微信绑定签约状态*/
function c_startBindWeChatPay(url, token) {
    var action = 'c_startBindWeChatPay';
    if (url == null) {
        alert('缺少必要参数URL');
        return;
    }

    jsonStr = '{"c_url":"' + url + '"}';

    cmread.callBackClient(action, jsonStr, token);
}

/* 2.4.26 启动SDK账号升级界面页面 */
function c_startMiguAccountUpgrade(token) {

    var action = 'c_startMiguAccountUpgrade';
    var jsonStr = '{}';

    cmread.callBackClient(action, jsonStr, token);
}


/*新增启动我的咪咕币页面*/
function startMiguCoinsPage(token) {
    var action = 'startMiguCoinsPage';
    var jsonStr = '{}';

    cmread.callBackClient(action, jsonStr, token);
}

/*新增广告曝光和点击*/
function miguAdExposured(key, adUnitId, token) {
    if (key == null) {
        alert('key参数是必填参数');
        return;
    }
    if (adUnitId == null) {
        alert('adUnitId参数是必填参数');
        return;
    }
    var action = 'miguAdExposured';
    var jsonStr = null;
    jsonStr = '{"key":"' + key + '","adUnitId":"' + adUnitId + '"}';

    cmread.callBackClient(action, jsonStr, token);
}

/*2.1.37前端向客户端请求广告信息参数*/
function getAdJson(adUnitId, token) {
    if (adUnitId == null) {
        alert('adUnitId参数是必填参数');
        return;
    }

    var action = 'getAdJson';
    var jsonStr = null;
    jsonStr = '{"adUnitId":"' + adUnitId + '"}';

    cmread.callBackClient(action, jsonStr, token);
}
/*2.1.38前端对广告页进行点击、曝光等操作*/
function miguAdOperation(operateId, adUnitId, token) {
    if (operateId == null) {
        alert('operateId参数是必填参数');
        return;
    }
    if (adUnitId == null) {
        alert('adUnitId参数是必填参数');
        return;
    }
    var action = 'miguAdOperation';
    var jsonStr = null;
    jsonStr = '{"operateId":"' + operateId + '","adUnitId":"' + adUnitId + '"}';
    cmread.callBackClient(action, jsonStr, token);
}


/*dyb BR001921 客户端图片评论*/

function c_publishComment(pageId, token) {
    var action = 'c_publishComment';
    var jsonStr = null;
    if (pageId == null) {
        alert('缺少必要参数pageId');
        return;
    }
    jsonStr = '{"pageId":"' + pageId + '"}';

    cmread.callBackClient(action, jsonStr, token);
}

/*dyb BR001921 客户端图片评论*/

/*hanjunpeng BR002714 客户端用户策反活动优化 start*/
/* android安卓3.2去咪咕图书详情页 */
function startMiguClient(invokeSource, token) {
    var action = 'startMiguClient';
    var jsonStr = null;
    jsonStr = '{"invokeSource":"' + invokeSource + '"}';
    cmread.callBackClient(action, jsonStr, token);
}
/*hanjunpeng BR002714 客户端用户策反活动优化 end*/
/*前端批量加入书架成功后告知客户端刷新书架*/
function refreshBookShelf(token)
{
    var action = 'refreshBookShelf';
    var jsonStr = '{}';

    cmread.callBackClient(action, jsonStr, token);
}

/* 启动Video Player 7.0及以上版本可用 */
function playVideo(urlId, videoTitle, token)
{
    if (urlId == null)
    {
        alert('第一个参数是必填参数');
        return;
    }
    if (videoTitle == null)
    {
        alert('第二个参数是必填参数');
        return;
    }
    var action = 'playVideo';
    var jsonStr = null;

    jsonStr = '{"urlId":"' + urlId + '", "videoTitle":"' + videoTitle + '"}';
    cmread.callBackClient(action, jsonStr, token);
}
/*全站包订购成功后，给客户端一个通知刷新会员页 7.0以上支持*/
function c_refresh_member_page(token)
{
    var action = 'c_refresh_member_page';
    cmread.callBackClient(action, null, token);
}
/*2.1.42 触发一级支付SDK发起订购*/
function c_startmiguunionpay(version,transactionCode,idValue,productID,TotalPrice,productInfo,preferential,token)
{
    var action = 'c_startmiguunionpay';
   jsonStr = '{"version":"' + version
                    + '","transactionCode":"' + transactionCode
                    + '","token":"' + token
                    + '","idValue":"' + idValue
                    + '","productID":"' + productID
                    + '","TotalPrice":"' + TotalPrice
                    + '","productInfo":"' + productInfo
                    + '","preferential":"' + preferential
                    +'"}';

    cmread.callBackClient(action, jsonStr, token);
}
/*调用getScrollableArea客户端方法*/
function getScrollableArea(swiperRegionArrStr){
	try{
		console.log(swiperRegionArrStr);
		cmread.callBackClient('getScrollableArea',swiperRegionArrStr,'');
	}catch(err){
		//console.log(swiperRegionArrStr);
	}
}
/*2.4.37 启动聊天页面*/
function c_startChatPage(sendMsisdn,avatar,nickName,token)
{
    var action = 'c_startChatPage';
    var jsonStr = '{';
	if(sendMsisdn != null)
	{
		jsonStr = jsonStr + '"sendMsisdn":"' + sendMsisdn;
	}
	if(avatar != null)
	{
		jsonStr = jsonStr + '", "avatar":"' + avatar;
	}
	if(nickName != null)
	{
		jsonStr = jsonStr + '", "nickName":"' + nickName;
	}
  	jsonStr += '"}';

    cmread.callBackClient(action, jsonStr, token);
}
/*框架准备完毕*/
function documentReady(token)
{
    var action = 'documentReady';
    var jsonStr = '{}';
    cmread.callBackClient(action, jsonStr, token);
}
/*UESFTL-6075 lyf  20160708*/
/**
上传位置信息
startLocation()
*/
function startLocation(token){
	var action = 'startLocation';
	var jsonStr = '{}';
	cmread.callBackClient(action, jsonStr, token);
}
/*唤起账号安全页*/
function c_startAccountAndSafe(token){
	var action = 'c_startAccountAndSafe';
	var jsonStr = '{}';
	cmread.callBackClient(action, jsonStr, token);
}
/*启动消息中心*/
function startInfoCenter(token){
	var action = 'startInfoCenter';
	var jsonStr = '{}';
	cmread.callBackClient(action, jsonStr, token);
}
/*重置密码*/
function startResetPassword(token){
	var action = 'startResetPassword';
	var jsonStr = '{}';
	cmread.callBackClient(action, jsonStr, token);
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
	cmread.callBackClient(action, jsonStr, token);
}

/*新启普通二级B页面展示（新增，兼容新老两套框架） url链接地址*/
function c_startCommonWebPage(URL,token){
    if(URL==null){
        alert("url是必填项");
        return
    }
    var action ="c_startCommonWebPage";
    var jsonStr ='{"URL":"' + URL + '"}';
    cmread.callBackClient(action, jsonStr, token)
}

/*广播通知普通二级B页面刷新当前页面*/
function cityRefresh(token){
    var action="cityRefresh";
    var jsonStr ="{}";
    cmread.callBackClient(action, jsonStr, token)
}

/*弹出C侧一个按钮的Dialog对话框*/
function notifyAlert(buttonText,responseInfo,token){
    var action ="notifyAlert";
    if(buttonText==null){
        alert("buttonText是必填项");
        return
    }
    if(responseInfo==null){
        alter("responseInfo是必填项");
        return
    }
    var jsonStr='{"buttonText":"' + buttonText +'","responseInfo":"'+responseInfo + '"}';
    cmread.callBackClient(action,jsonStr,token)
}
/*弹出C侧两个按钮的Dialog对话框*/
function notifyConfirm(responseInfo,positiveText,nagativeText,token){
    if(responseInfo==null){
        alert("responseInfo是必填项");
        return
    }
    if(positiveText==null){
        alert("positiveText是必填项");
        return
    }
    if(nagativeText==null){
        alert("nagativeText是必填项");
        return
    }
    var action ="notifyConfirm";
    var jsonStr='{"responseInfo":"' + responseInfo +'","positiveText":"'+positiveText + '","nagativeText":"'+nagativeText +'"}';
    cmread.callBackClient(action,jsonStr,token)
}
/*弹出C侧PopupWidiw控件*/
function notifyPopup(responseInfo,closeSelf,token){
    if(responseInfo==null){
        alert("responseInfo是必填项");
        return
    }
    if(closeSelf==null){
        alert("closeSelf是必填项");
        return
    }
    var action ="notifyPopup";
    var jsonStr= '{"responseInfo":"' + responseInfo +'","closeSelf":"'+closeSelf +'"}';
    cmread.callBackClient(action,jsonStr,token)
}
/*跳转没有Titlebar的webview页面*/
function startEventWebPage(URL,token){
    if(URL==null){
        alert("URL是必填项");
        return
    }
    var action = "startEventWebPage";
    var jsonStr ='{"URL":"' + URL + '"}';
    cmread.callBackClient(action,jsonStr,token)
}
/*唤起杂志阅读页*/
function startMagazineReader(contentID,offset,contentName,bigLogo,token){
    if(contentID==null){
        alert("contentID是必填项");
        return
    }
     if(offset==null){
        alert("offset是必填项");
        return
    }
     if(contentName==null){
        alert("contentName是必填项");
        return
    }
     if(bigLogo==null){
        alert("bigLogo是必填项");
        return
    }
    var action ="startMagazineReader";
    var jsonStr='{"contentID":"' + contentID +'","offset":"'+offset + '","contentName":"'+contentName + '","bigLogo":"'+bigLogo +'"}';
    cmread.callBackClient(action,jsonStr,token)
}

//跳转手机设置界面
function startNetSetting(token){
    var action ="startNetSetting";
    var jsonStr='{}';
    cmread.callBackClient(action,jsonStr,token)
}

/*跳转笔记详情页面
noteId笔记ID、msisdn笔记作者阅读号
*/
function startNoteDetailPage(noteId, msisdn,token){
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
    cmread.callBackClient(action,jsonStr,token);
}
/*UESFTL-6075 lyf  20160708 end*/
/*BR004351 咪咕币*/
function startMiguCoinsRechargePage(token){
    var action ="startMiguCoinsRechargePage";
    var jsonStr='{}';
    cmread.callBackClient(action,jsonStr,token)
}
