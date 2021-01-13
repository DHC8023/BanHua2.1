/*
 * @Author: BanHua
 * @Date: 2021-01-05 14:06:06
 * @LastEditors: BanHua
 * @LastEditTime: 2021-01-13 15:19:22
 * @Description: file content
 */
/**
 * 1.如果需要自定保存控件的值，需要将控件ID以bh_开口进行命名，如bh_delay
 * 
 */


importClass(android.content.Intent);
importClass(android.net.Uri);
importClass(android.provider.Settings);
//声明主体颜色
const COLOR = '#4169E1';
//声明脚本标题
const TITLE = '脚本标题';

//开始加载UI框架
ui.layout(this.drawUI.toString().replace(/#696969/g, COLOR).replace(/默认标题/g, TITLE));

//定义用户界面
var userUI = (function(){
    return (
        <vertical>
            <horizontal>
                <text text='xx帐号：'></text>
                <input hint='请输入xx帐号' w='*' id='bh_xx_user'></input>
            </horizontal>
            <horizontal>
                <text text='xx密码：'></text>
                <input hint='请输入xx密码' w='*' id='bh_xx_pass'></input>
            </horizontal>
            <horizontal>
                <text text='执行功能：'></text>
                <checkbox text='功能1' id='bh_gn1'></checkbox>
                <checkbox text='功能2' id='bh_gn2'></checkbox>
                <checkbox text='功能4(不保存)' id='bh_gn4'></checkbox>
            </horizontal>
        </vertical>
    )
})();


//                            _ooOoo_
//                           o8888888o
//                           88" . "88
//                           (| -_- |)
//                            O\ = /O
//                        ____/`---'\____
//                      .   ' \\| |// `.
//                       / \\||| : |||// \
//                     / _||||| -:- |||||- \
//                       | | \\\ - /// | |
//                     | \_| ''\---/'' | |
//                      \ .-\__ `-` ___/-. /
//                   ___`. .' /--.--\ `. . __
//                ."" '< `.___\_<|>_/___.' >'"".
//               | | : `- \`.;`\ _ /`;.`/ - ` : | |
//                 \ \ `-. \_ __\ /__ _/ .-` / /
//         ======`-.____`-.___\_____/___.-`____.-'======
//                            `=---='
//
//         .............................................
//                  佛祖镇楼                 BUG辟易
//          佛曰:
//                  写字楼里写字间，写字间里程序员；
//                  程序人员写程序，又拿程序换酒钱。
//                  酒醒只在网上坐，酒醉还来网下眠；
//                  酒醉酒醒日复日，网上网下年复年。
//                  但愿老死电脑间，不愿鞠躬老板前；
//                  奔驰宝马贵者趣，公交自行程序员。
//                  别人笑我忒疯癫，我笑自己命太贱；
//                  不见满街漂亮妹，哪个归得程序员？

//设置状态栏颜色
ui.statusBarColor(COLOR);

//把用户UI添加进UI模板
ui.inflate(userUI, ui.body, true);

//开始设置所有控件的值
setViewContent(xmlStringFindIdAddArray(userUI.toString(), 'bh_'));

//绑定无障碍服务单机事件
ui.autoService.on('click', () => {
    ui.autoService.isChecked() ? auto.service == null ? app.startActivity({action: "android.settings.ACCESSIBILITY_SETTINGS"}) : log('无障碍处于打开状态') : auto.service == null ? log('无障碍处于关闭状态') : auto.service.disableSelf();
});

//绑定悬浮窗权限单机事件
ui.windowService.on('click', () => {
    var intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
        Uri.parse("package:" + context.getPackageName()));
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    app.startActivity(intent);
});

//绑定调试服务单机事件
ui.deBugService.on('click', ()=> {
    if (ui.deBugService.isChecked()) {
        toastLog('开启调试模式');
        console.show();
    } else {
        toastLog('关闭调试模式');
        console.hide();
    }
});

//创建脚本进程变量
var execution = null;
var window = null
//绑定开始按钮单机事件
ui.start.on('click', ()=> {
    if (!window) {
            scriptThreads = threads.start(function(){
            auto.waitFor();
    
            //开始保存内容到本地储存
            getViewContent(xmlStringFindIdAddArray(userUI.toString(), 'bh_'));
            console.info('保存UI配置数据到本地储存成功！');
            home();
            
            window = floaty.window(
                <frame>
                    <img w="auto" h="auto" src="@drawable/ic_play_circle_outline_black_48dp" id='windowButton'/>
                    <text id='scriptState' text='开始' visibility='gone'></text>
                </frame>
            );
    
            //设置悬浮窗位置
            window.setPosition(0, device.height/2);
    
            //记录按键被按下时的触摸坐标
            var x = 0, y = 0;
            //记录按键被按下时的悬浮窗位置
            var windowX, windowY;
            //记录按键被按下的时间以便判断长按等动作
            var downTime;
    
            //监听滑动悬浮窗事件
            window.windowButton.setOnTouchListener(function(view, event){
                switch(event.getAction()){
                    case event.ACTION_DOWN:
                        x = event.getRawX();
                        y = event.getRawY();
                        windowX = window.getX();
                        windowY = window.getY();
                        downTime = new Date().getTime();
                        return true;
                    case event.ACTION_MOVE:
                        //移动手指时调整悬浮窗位置
                        window.setPosition(windowX + (event.getRawX() - x),
                            windowY + (event.getRawY() - y));
                        //如果按下的时间超过1.5秒判断为长按，退出脚本
                        if(new Date().getTime() - downTime > 1500){
                            toastLog('长按退出脚本！');
                            exit();
                        }
                        return true;
                    case event.ACTION_UP:
                        //手指弹起时如果偏移很小则判断为点击
                        if(Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5){
                            // toastLog('点击了按钮');
                            windowButtonClick();
                        }
                        return true;
                }
                return true;
            });
    
            function windowButtonClick () {
                if (window.scriptState.getText() == '开始') {
                    log('execution:' + execution);
                    //开始获取云端的脚本资源
                    let _jgyStr = GetJgyFile(CONFIG.jgyUser, CONFIG.jgyKey, CONFIG.jgyPath+"script.js");
                    // console.log(_jgyStr);
                
                    if (_jgyStr != null) {
                        // console.log('后端文件获取成功');
                        sJgyFile = _jgyStr;
                    } else {
                        toastLog('script脚本文件获取失败！');
                        exit();
                    }
                    execution = engines.execScript('BHscript', _jgyStr);
                    window.windowButton.setSource('@drawable/ic_pause_circle_outline_black_48dp');
                    window.scriptState.setText('停止');
    
    
                } else {
                    if (execution) {
                        execution.getEngine().forceStop();
                    }
                    window.windowButton.setSource('@drawable/ic_play_circle_outline_black_48dp');
                    window.scriptState.setText('开始');
                }
            }
        });
    } else {
        toastLog('哎呀，不要戳我!!!');
        home();
    }
});

//绑定退出按钮单机事件
ui.quit.on('click', () => {
    exit();
});


//回到本界面时，触发resume事件
ui.emitter.on('resume', ()=> {
    auto.service == null ? ui.autoService.setChecked(false) : ui.autoService.setChecked(true);
});