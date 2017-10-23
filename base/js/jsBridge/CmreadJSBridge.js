//BASE64
(function (global, doc, undef) {
    var BASE64_MAPPING = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
            'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
            'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '_',
        ];
    /**
     *ascii convert to binary
     */
    var _toBinary = function (ascii) {
        var binary = new Array();
        while (ascii > 0) {
            var b = ascii % 2;
            ascii = Math.floor(ascii / 2);
            binary.push(b);
        }
        /*
		var len = binary.length;
		if(6-len > 0){
			for(var i = 6-len ; i > 0 ; --i){
				binary.push(0);
			}
		}*/
        binary.reverse();
        return binary;
    };

    /**
     *binary convert to decimal
     */
    var _toDecimal = function (binary) {
        var dec = 0;
        var p = 0;
        for (var i = binary.length - 1; i >= 0; --i) {
            var b = binary[i];
            if (b == 1) {
                dec += Math.pow(2, p);
            }
            ++p;
        }
        return dec;
    };

    /**
     *unicode convert to utf-8
     */
    var _toUTF8Binary = function (c, binaryArray) {
        var mustLen = (8 - (c + 1)) + ((c - 1) * 6);
        var fatLen = binaryArray.length;
        var diff = mustLen - fatLen;
        while (--diff >= 0) {
            binaryArray.unshift(0);
        }
        var binary = [];
        var _c = c;
        while (--_c >= 0) {
            binary.push(1);
        }
        binary.push(0);
        var i = 0,
            len = 8 - (c + 1);
        for (; i < len; ++i) {
            binary.push(binaryArray[i]);
        }

        for (var j = 0; j < c - 1; ++j) {
            binary.push(1);
            binary.push(0);
            var sum = 6;
            while (--sum >= 0) {
                binary.push(binaryArray[i++]);
            }
        }
        return binary;
    };

    var __BASE64 = {
        /**
         *BASE64 Encode
         */
        encoder: function (str) {
            var base64_Index = [];
            var binaryArray = [];
            for (var i = 0, len = str.length; i < len; ++i) {
                var unicode = str.charCodeAt(i);
                var _tmpBinary = _toBinary(unicode);
                if (unicode < 0x80) {
                    var _tmpdiff = 8 - _tmpBinary.length;
                    while (--_tmpdiff >= 0) {
                        _tmpBinary.unshift(0);
                    }
                    binaryArray = binaryArray.concat(_tmpBinary);
                } else if (unicode >= 0x80 && unicode <= 0x7FF) {
                    binaryArray = binaryArray.concat(_toUTF8Binary(2, _tmpBinary));
                } else if (unicode >= 0x800 && unicode <= 0xFFFF) { //UTF-8 3byte
                    binaryArray = binaryArray.concat(_toUTF8Binary(3, _tmpBinary));
                } else if (unicode >= 0x10000 && unicode <= 0x1FFFFF) { //UTF-8 4byte
                    binaryArray = binaryArray.concat(_toUTF8Binary(4, _tmpBinary));
                } else if (unicode >= 0x200000 && unicode <= 0x3FFFFFF) { //UTF-8 5byte
                    binaryArray = binaryArray.concat(_toUTF8Binary(5, _tmpBinary));
                } else if (unicode >= 4000000 && unicode <= 0x7FFFFFFF) { //UTF-8 6byte
                    binaryArray = binaryArray.concat(_toUTF8Binary(6, _tmpBinary));
                }
            }

            var extra_Zero_Count = 0;
            for (var i = 0, len = binaryArray.length; i < len; i += 6) {
                var diff = (i + 6) - len;
                if (diff == 2) {
                    extra_Zero_Count = 2;
                } else if (diff == 4) {
                    extra_Zero_Count = 4;
                }
                //if(extra_Zero_Count > 0){
                //	len += extra_Zero_Count+1;
                //}
                var _tmpExtra_Zero_Count = extra_Zero_Count;
                while (--_tmpExtra_Zero_Count >= 0) {
                    binaryArray.push(0);
                }
                base64_Index.push(_toDecimal(binaryArray.slice(i, i + 6)));
            }

            var base64 = '';
            for (var i = 0, len = base64_Index.length; i < len; ++i) {
                base64 += BASE64_MAPPING[base64_Index[i]];
            }

            for (var i = 0, len = extra_Zero_Count / 2; i < len; ++i) {
                base64 += '=';
            }
            return base64;
        },
        /**
         *BASE64  Decode for UTF-8
         */
        decoder: function (_base64Str) {
            var _len = _base64Str.length;
            var extra_Zero_Count = 0;
            /**
             *计算在进行BASE64编码的时候，补了几个0
             */
            if (_base64Str.charAt(_len - 1) == '=') {
                //alert(_base64Str.charAt(_len-1));
                //alert(_base64Str.charAt(_len-2));
                if (_base64Str.charAt(_len - 2) == '=') { //两个等号说明补了4个0
                    extra_Zero_Count = 4;
                    _base64Str = _base64Str.substring(0, _len - 2);
                } else { //一个等号说明补了2个0
                    extra_Zero_Count = 2;
                    _base64Str = _base64Str.substring(0, _len - 1);
                }
            }

            var binaryArray = [];
            for (var i = 0, len = _base64Str.length; i < len; ++i) {
                var c = _base64Str.charAt(i);
                for (var j = 0, size = BASE64_MAPPING.length; j < size; ++j) {
                    if (c == BASE64_MAPPING[j]) {
                        var _tmp = _toBinary(j);
                        /*不足6位的补0*/
                        var _tmpLen = _tmp.length;
                        if (6 - _tmpLen > 0) {
                            for (var k = 6 - _tmpLen; k > 0; --k) {
                                _tmp.unshift(0);
                            }
                        }
                        binaryArray = binaryArray.concat(_tmp);
                        break;
                    }
                }
            }

            if (extra_Zero_Count > 0) {
                binaryArray = binaryArray.slice(0, binaryArray.length - extra_Zero_Count);
            }

            var unicode = [];
            var unicodeBinary = [];
            for (var i = 0, len = binaryArray.length; i < len;) {
                if (binaryArray[i] == 0) {
                    unicode = unicode.concat(_toDecimal(binaryArray.slice(i, i + 8)));
                    i += 8;
                } else {
                    var sum = 0;
                    while (i < len) {
                        if (binaryArray[i] == 1) {
                            ++sum;
                        } else {
                            break;
                        }
                        ++i;
                    }
                    unicodeBinary = unicodeBinary.concat(binaryArray.slice(i + 1, i + 8 - sum));
                    i += 8 - sum;
                    while (sum > 1) {
                        unicodeBinary = unicodeBinary.concat(binaryArray.slice(i + 2, i + 8));
                        i += 8;
                        --sum;
                    }
                    unicode = unicode.concat(_toDecimal(unicodeBinary));
                    unicodeBinary = [];
                }
            }
            return unicode;
        }
    };

    function urlsafe_b64encode(input) {
        /*
        return window.base64.encoder(input).replace(/\+/g, '-').replace('/', '_').replace(/=/g, '');
        */
        return window.base64.encoder(input).replace(/\+/g, '-').replace('/', '_').replace(/=/g, '');
    }
    window.urlsafe_b64encode = urlsafe_b64encode;
    window.base64 = __BASE64;
})(window, document);
//bridge
;
(function (global, doc) {
    var pub = {
        readyStr: "CmrJSBridgeReady", //ready的事件名
        initStr: "CmrJSBridgeInit", //init的事件名
        schema: "cmread://", //默认协议
        /*此处涉及gulp替换两个地址，请勿改动如下两个地址*/
        oldIOS:"//wap.cmread.com/rbc/t/content/repository/ues/js/s109/b2cIos.js",//bridge老版地址
        oldAnd:"//wap.cmread.com/rbc/t/content/repository/ues/js/s109/b2cAndroid.js",//bridge老版地址
        asyncSdk:'//wap.cmread.com/rbc/t/content/repository/ues/js/s109/asyncsdk.js',//bridge异步文件地址
        getQueryString:function(name){
             var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
             var r = window.location.search.substr(1).match(reg);
             if(r!=null)return  unescape(r[2]); return null;
        },
        /**
        @ method  _createElement | 创建一个iframe并传递地址
        @ param options | {Object} 根据options自动拼接url参数
            -method {String} 协议方法名如call/notifyResultToast
            -jsonData {Object} 传递的jsonData数据，需要对此参数进行单独加密
            -retMethod {String} 客户端接受消息后会执行的js方法，此方法需前端定义
            -cleanType {String} listen和broadcast时的清除功能。
        **/
        _createElement: function (options) {
            var src = pub.schema + options.method + "?";
            for (var i in options) {
                if (i != 'method') {
                    if (i == 'jsonData') {
                        var data = JSON.stringify(options.jsonData);
                        var json = urlsafe_b64encode(data);
                        src += "jsonData=" + json + "&";
                    } else {
                        options[i] ? src += i + "=" + options[i] + "&" : null;
                    }

                }
            }
            src = src.substring(0, src.length - 1);
            console.log(JSON.stringify(options) + "\n" + src);
            var iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = src;
            iframe.onload = function () {
                setTimeout(function () {
                    iframe.remove();
                }, 0);
            };
            doc.getElementsByTagName('body')[0].appendChild(iframe);
        },
        /**
        @ method _invoke | 执行方法（_invoke）
        @ param  method {String} 协议方法名如notifyResultToast
        @ param data | {Object} 传递的jsonData数据
        **/
        _invoke: function (method, data) {
            this._createElement({
                method: "call/" + method,
                jsonData: data
            });
        },
        /**
        @ method _fetch  执行fetch方法（_fetch）
        @ param method {String} 协议方法名如getClientValue
        @ param data  {Object} 传递的jsonData数据,有回调
        @ param retMethod {String} 执行的回调方法
        **/
        _fetch: function (method, data) {
            this._createElement({
                method: "fetch/" + method,
                jsonData: {
                    key: data.key
                },
                retMethod: data.retMethod
            });
        },
        /**
        @ method _listen  执行fetch方法（_createElement）
        @ param key {String} 存储的键值
        @ param data  {Object} 传递的jsonData数据,有回调
        @ param cleanType {String} 清理数据机制
        **/
        _listen: function (key, data, cleanType) {
            this._createElement({
                method: "listen/channel",
                jsonData: data,
                key: key,
                cleanType: cleanType || ""
            });
        },
        /**
        @ method _listen  执行fetch方法（_createElement）
        @ param key {String} 存储的键值
        @ param data  {Object} 传递的jsonData数据,有回调
        @ param cleanType {String} 清理数据机制
        **/
        _broadcast: function (key, retMethod, cleanType) {
            this._createElement({
                method: "broadcast/channel",
                retMethod: retMethod,
                key: key,
                cleanType: cleanType || ""
            });
        }
    };
    var bridge = global.CmreadJsBridge || {
        isReady: false,
        version: "0.0.1",
        ua:navigator.userAgent.toLocaleLowerCase(),
        /**
        @ method  GetSys | 判断客户端为IOS还是安卓，返回"ios"或者"android"
        **/
        GetSys:function(){
            var sys="";
            /android|adr/.test(this.ua)>=0?sys="android":null;
            /iphone|ipad|ipod/.test(this.ua)?sys="ios":null;
            return sys;
        },
        /*
        @ method  GetAppVersion | 判断客户端版本号，获取到为0或者-1时代表获取版本号失败（一般是不在客户端内）
        */
        GetAppVersion:function(){
            if(this.ua.indexOf("_v")<0){
                return "0";
            }else{
                try{
                    return this.ua.split("_v")[1].split("(")[0];
                }catch(e){
                    return "-1";
                }
            }
        },
        /*
        @method checkTimeSt | 判断当前时间和当前的时间戳对比，如果大于4小时，则更新时间戳
        */
        checkTimeSt:function(){
            var hourArr=[0,4,8,12,16,20,24];
            var now=new Date(),
            year=now.getFullYear(),
            month=now.getMonth()+1,
            day=now.getDate(),
            hour=now.getHours(),
            min=now.getMinutes(),
            sec=now.getSeconds(),
            st=now.getTime();
            var nowIndex=0;
            hourArr.forEach(function(v,k){
                if(hour>=v){
                    nowIndex=k;
                    return;
                }
            });
            var formatePast=year+"/"+month+"/"+day+" "+hourArr[nowIndex]+":00:00";//两小时前的时间
            var formatePastSec=new Date(formatePast).getTime();
            return formatePastSec;
        },
        isNewApp:function(){
            return this.ua.indexOf("jsbridge")>=0;
        },
        loadScript:function(src,callback){
            var scr=document.createElement('script');
            var timeStamp="";
            if(src.indexOf('?t=')<0){
                timeStamp="?t="+new Date().getTime();
            }
            scr.src=src+timeStamp;
            document.getElementsByTagName("head")[0].appendChild(scr);
            scr.onload=callback;
        },
        invoke: function (method, data) {
            pub._invoke(method, data);
        },
        fetch: function (method, data) {
            pub._fetch(method, data);
        },
        listen: function (key, data, cleanType) {
            pub._listen(key, data, cleanType);
        },
        broadcast: function (key, retMethod, cleanType) {
            pub._broadcast(key, retMethod, cleanType);
        },
        /**
        @ method  adaptation | 初始化判断客户端并兼容
        **/
        adaptation:function(){
            var self=this,
            timest=self.checkTimeSt(),
             isdebug=pub.getQueryString('isdebug');
            self.loadScript(pub.asyncSdk+"?t="+timest,function(){
                if(self.isNewApp()!=true){
                    switch (self.system){
                        case "android":
                            //console.log("这是安卓版本，此处build和dev后会删除毁掉方法里异步加载");
                            self.loadScript(pub.oldAnd+"?t="+timest,function(){
                                if(isdebug=="true"||isdebug==true){
                                    self.loadScript('js/rebuild.js',function(){});
                                }
                            });
                            break;
                        case "ios":
                            //console.log("这是IOS版本");
                            self.loadScript(pub.oldIOS+"?t="+timest,function(){
                                if(isdebug=="true"||isdebug==true){
                                    if(isdebug=="true"||isdebug==true){
                                        self.loadScript('js/rebuild.js',function(){});
                                    }
                                }
                            });
                            break;
                    }
                }
            });
        },
        /*
        @ method  debugCheck | 检查是否是测试环境
        */
        debugCheck:function(){
            var isdebug=pub.getQueryString('isdebug');
                if(isdebug=="true"||isdebug==true){
                pub.oldAnd='js/b2cAndroid/b2cAndroid.js';
                pub.oldIOS='js/b2cIOS/b2cIOS.js';
                pub.asyncSdk='js/anyncSdk/asyncsdk.js'
            }
        },
        /**
        @ method  init | 初始化bridge
        **/
        init: function () {
            var self=this;
            this.debugCheck();
            this.appVersion=this.GetAppVersion();
            this.appVersionNum=this.appVersion.replace(/\./g,"");
            this.system=this.GetSys();
            this.adaptation();//兼容新老版本的b2c
            var _initEvent = document.createEvent("Event");
            _initEvent.initEvent(pub.initStr);
            _initEvent.bridge = this;
            doc.dispatchEvent(_initEvent);
        },
        ready: function () {
            this.isReady = true;
            var _readyEvent = document.createEvent('Event');
            _readyEvent.initEvent(pub.readyStr);
            _readyEvent.bridge = bridge;
            doc.dispatchEvent(_readyEvent);
        }
    };
    doc.addEventListener(pub.readyStr, function (e) {
        //console.log("bridge ready");
    });
    doc.addEventListener(pub.initStr, function (e) {
        //console.log("bridge init");
    });
    bridge.ready();
    //全局暴露
    global.CmreadJsBridge = bridge;

})(window, document);
