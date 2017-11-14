

    //点击支付回调
    function doPayCallBlack(result){

        console.log("adddoPayCallBlack");
        cc.log("---result--adddoPayCallBlack: result.msg = ", result.msg);
        var scene = cc.Director.getInstance().getRunningScene();
        var layer = scene.getChildByTag(10001);
        var lab = layer.getLab();
        if (lab) {
            lab.setString(result.msg);
        }
    };
    //点击分享
    function chargeBlock(result){

        console.log("addchargeBlock");
        cc.log("---resultaddchargeBlock--chargeBlock: result.msg = ", result.msg); 
        var scene = cc.Director.getInstance().getRunningScene();
        var layer = scene.getChildByTag(10001);
        var lab = layer.getLab();
        if (lab) {
            lab.setString(result.msg);
        }
    };


var apiArr = [
    "http://game.test.api.wesai.com/intra/virtualMedal",
    "http://game-pre.api.wesai.com/intra/virtualMedal",
    "http://game.api.wesai.com/intra/virtualMedal",
];

var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    labApi:null,
    labEvent:null,

    addachivementReq: function(Lab, pSender, event) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.open("POST", "http://game.test.api.wesai.com/intra/virtualMedal");
        // xhr.open("POST", "http://game-pre.api.wesai.com/intra/virtualMedal");
        // xhr.open("POST", "http://game.api.wesai.com/intra/virtualMedal");
        //set Content-Type "application/x-www-form-urlencoded" to post form data
        //mulipart/form-data for upload
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            var str = "";
            var httpStatus = xhr.statusText;
            var response = xhr.responseText.substring(0, 100) + "...";
            str =  "\nStatus: Got " + "POST" + " response! " + httpStatus;
            str = str + " Response (100 chars):\n" + response;
            cc.log("addachivementReq str = " + str);
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                cc.log("response:\n" + xhr.responseText);
            }
            if (labEvent) {
                labEvent.setString(str);
            }
        };
        xhr.onerror = function(){
            var str = "请求超时";
            if (labEvent) {
                labEvent.setString(str);
            }
        };
        /**
        form : {
            "a" : "hello",
            "b" : "world"
        }
        **/
        // var args = "a=hello&b=world";
        var uid = jsb.reflection.callStaticMethod('WSGameCenterInterface','getWesaiUid');
        var gameId = jsb.reflection.callStaticMethod('WSGameCenterInterface','getGameId');
        var args = "user_id="+uid+"&game_id="+gameId+"&medal_value=1"
        xhr.send(args);
        console.log(args)
    },

    getLab:function(){
        return this.labEvent;
    },

    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        // this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        // this.addChild(this.sprite, 0);

        var apiIndex = 0;

        //退出游戏
        // var end  = ccui.Text.create("end", "fonts/arial.ttf", 60);
        var end = ccui.Button.create("res/end.png", "res/end.png");
        // this.addChild(end);
        end.setPosition(cc.p(50, size.height / 2 + 120 ));
        end.setTouchEnabled(true);
        // labUserInfo.setTag(T_USERINFO);
        end.addTouchEventListener(this.end);
        end.setAnchorPoint(cc.p(0, 0));

        var root = ccs.csLoader.createNode("res/JsScene.json");
        this.addChild(root);
        labApi = root.getChildByName("lab_api");
        labEvent = root.getChildByName("lab_event");
        labApi.setString(apiArr[apiIndex]);
        var btn_changeApi = root.getChildByName("btn_changeApi");
        btn_changeApi.addTouchEventListener(function (pSender, event){
            if (event == 2) {
                console.log("click changeApi ...");
                apiIndex = (apiIndex+1) % 3;
                labApi.setString(apiArr[apiIndex]);
            }
        })

        var btn_charge = root.getChildByName("btn_charge");
        btn_charge.addTouchEventListener(function (pSender, event){
            if (event == 2) {                
                console.log("click charge ...");
                var timestamp1=new Date().getTime();
                var payResult = jsb.reflection.callStaticMethod('WSGameCenterInterface',
                    'doPay:withAmount:withDescription:withExtraContent:callBackFun:',
                    timestamp1.toString(),
                    "10",
                    "cocos-js 支付测试",
                    "",
                    'doPayCallBlack');
            }
        })

        var btn_quary = root.getChildByName("btn_quary");
        btn_quary.addTouchEventListener(function (pSender, event){
            if (event == 2) {
                console.log("click btn_quary ...");
                var userinfo  = jsb.reflection.callStaticMethod('WSGameCenterInterface','doQueryUserInfo:');
                labEvent.setString(userinfo);                
            }
        })

        var btn_addAchivement = root.getChildByName("btn_addAchivement");
        var addachivementReq = this.addachivementReq;
        btn_addAchivement.addTouchEventListener(function (pSender, event){
            if (event == 2) {
                console.log("click btn_addAchivement ...");
                addachivementReq(labEvent);
            }
        })

        var btn_share = root.getChildByName("btn_share");
        btn_share.addTouchEventListener(function (pSender, event){
            if (event == 2) {
                console.log("click btn_share ...");
                jsb.reflection.callStaticMethod('WSGameCenterInterface','doShare:withContent:withTitle:withIconUrl:withUrl:',
                    "cocos-js 分享测试",
                    "这是一条测试信息",
                    "https://static.wesai.com/ticketv2-product_static/pc/img/v2/logov2.png?v=819c55576907f5d888b19dce8b33326d",
                    "https://www.wesai.com/");
            }
        })

        var btn_getLocation = root.getChildByName("btn_getLocation");
        btn_getLocation.addTouchEventListener(function (pSender, event){
            if (event == 2) {
                console.log("click btn_getLocation ...");
                var location  = jsb.reflection.callStaticMethod('WSGameCenterInterface','getLocationInfo');
                labEvent.setString(location);  
            }
        })
       

        var btn_push = root.getChildByName("btn_push");
        btn_push.addTouchEventListener(function (pSender, event){
            if (event == 2) {
                console.log("click btn_push ...");
                var pushStr  = jsb.reflection.callStaticMethod('WSGameCenterInterface','getPushStr');
                labEvent.setString(pushStr); 
            }
        })


        var btn_quit = root.getChildByName("btn_quit");
        btn_quit.addTouchEventListener(function (pSender, event){
            if (event == 2) {
                console.log("click btn_quit ...");
                jsb.reflection.callStaticMethod('WSGameCenterInterface','stopGame');
            }
        })
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
        this.label = new cc.LabelTTF.create("js Game", "fonts/arial.ttf", 30, cc.size(0,0), 0);
        this.label.setPosition(cc.p(280, cc.winSize.height - 100));
        this.label.setAnchorPoint(cc.p(0,0.5));
        this.addChild(this.label);
        this.label.setTag(1000);
        layer.setTag(10001);
    },    
});

