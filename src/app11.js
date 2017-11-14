

    //点击支付回调
    function doPayCallBlack(result){

        console.log("adddoPayCallBlack");
        cc.log("---result--adddoPayCallBlack: result.msg = ", result.msg);
        var scene = cc.Director.getInstance().getRunningScene();
        var lab = scene.getChildByTag(1000)
        if (lab) {
            lab.setString(result.msg)
        }
    };
    //点击分享
    function chargeBlock(result){

        console.log("addchargeBlock");
        cc.log("---resultaddchargeBlock--chargeBlock: result.msg = ", result.msg); 
        var scene = cc.Director.getInstance().getRunningScene();
        var lab = scene.getChildByTag(1000)
        if (lab) {
            lab.setString(result.msg)
        }
    };


var HelloWorldLayer = cc.Layer.extend({
    sprite:null,

    onlick:function (pSender, event){

        if (event == 0) {
            // pSender:setScale(0.8);
            console.log("event= ",event);
        } else{
            // pSender:setScale(1.0)
            console.log("event= ",event);

            console.log("onlick");
            var userinfo  = jsb.reflection.callStaticMethod('WSGameCenterInterface','doQueryUserInfo:','1234567');
            var scene = cc.Director.getInstance().getRunningScene();
            var lab = scene.getChildByTag(1000)
            if (lab) {
                lab.setString(userinfo)
            }
        }   

    },

    //点击退出游戏的方法
    end:function(pSender, event){

        if (event == 0) {
            console.log("event= ",event);

        } else{
            
        console.log("event= ",event);

        console.log("onend");
        jsb.reflection.callStaticMethod('WSGameCenterInterface','stopGame')

        }    

    },

    
//点击分享
    addachivementReq:function(pSender, event){

        if (event == 0) {
            // pSender:setScale(0.8);
            console.log("event= ",event);
        } else{
            // pSender:setScale(1.0)
            console.log("event= ",event);
            console.log("onclick addachivementReq");
         
         // jsb.reflection.callStaticMethod('WSGameCenterInterface','doShare:withContent:withTitle:withIconUrl:withUrl:','chargeBlock','http://images2015.cnblogs.com/blog/784420/201602/784420-20160217161627003-1456997293.png','hh','wo','aa')
         

        }    
        
    },

    //点击支付
    charge:function(pSender, event){

        if (event == 0) {
        console.log("event= ",event);

        } else{
            
        console.log("event= ",event);
        console.log("onclick charge");
        var payResult = jsb.reflection.callStaticMethod('WSGameCenterInterface','doPay:','doPayCallBlack')
        }    
        
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

        //退出游戏
        // var end  = ccui.Text.create("end", "fonts/arial.ttf", 60);
         var end = ccui.Button.create("end.png", "end.png");
        this.addChild(end);
        end.setPosition(cc.p(50, size.height / 2 + 120 ));
        end.setTouchEnabled(true);
        // labUserInfo.setTag(T_USERINFO);
        end.addTouchEventListener(this.end);
        end.setAnchorPoint(cc.p(0, 0));

        //获取用户信息
        // var labUserInfo = ccui.Text.create("UserInfo", "fonts/arial.ttf", 60);
        var labUserInfo = ccui.Button.create("userinfo.png", "userinfo.png");
        this.addChild(labUserInfo);
        labUserInfo.setPosition(cc.p(50, size.height / 2 - 20 ));
        labUserInfo.setTouchEnabled(true);
        // labUserInfo.setTag(T_USERINFO);
        labUserInfo.addTouchEventListener(this.onlick);
        labUserInfo.setAnchorPoint(cc.p(0, 0));

        //调用支付
        // var addachivementReq = ccui.Text.create("AddAchivementReq", "fonts/arial.ttf", 60);
        var addachivementReq = ccui.Button.create("addcj.png", "addcj.png");
        this.addChild(addachivementReq);
        addachivementReq.setPosition(cc.p(50, size.height / 2 - 150));
        addachivementReq.setTouchEnabled(true);
        // labUserInfo.setTag(T_USERINFO);
        addachivementReq.addTouchEventListener(this.addachivementReq);
        addachivementReq.setAnchorPoint(cc.p(0, 0));

        //调用分享
        // var charge = ccui.Text.create("charge", "fonts/arial.ttf", 60);
        var charge = ccui.Button.create("pay.png", "pay.png");
        this.addChild(charge);
        charge.setPosition(cc.p(50, size.height / 2 - 280));
        charge.setTouchEnabled(true);
        // labUserInfo.setTag(T_USERINFO);
        charge.addTouchEventListener(this.charge);
        charge.setAnchorPoint(cc.p(0, 0));



        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
        var label = new cc.LabelTTF.create("", "fonts/arial.ttf", 30, cc.size(0,0), 0);
        label.setPosition(cc.p(300, cc.winSize.height / 2));
        label.setAnchorPoint(cc.p(0,0.5));
        this.addChild(label);
        label.setTag(1000)
    }
});

