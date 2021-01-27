importClass(android.content.Intent);
importClass(android.net.Uri);
importClass(android.provider.Settings);

//开始获取pages.json数据
var o_pagesJson = Config.f_getJgyFileString(Config.s_jgyUser, Config.s_jgyKey, Config.s_jgyPath, "pages.json");o_pagesJson = JSON.parse(o_pagesJson);

//设置状态颜色
ui.statusBarColor(o_pagesJson.style.background);
//开始绘制UI
ui.layout(
    <frame w='*' h='*'>
        <fab layout_gravity='right|bottom' id='fab' margin='15dp' layout_width='wrap_content' layout_height='wrap_content' backgroundTint='{{o_pagesJson.style.background}}' elevation='5dp' src="@drawable/ic_send_black_48dp" color='{{o_pagesJson.style.background}}'></fab>
        <fab layout_gravity='left|bottom' id='fab2' margin='15dp' layout_width='wrap_content' layout_height='wrap_content' backgroundTint='{{o_pagesJson.style.background}}' elevation='5dp' src="@drawable/ic_power_settings_new_black_48dp" color='{{o_pagesJson.style.background}}'></fab>
        {/* <fab layout_gravity='right' id='fab2' layout_width='wrap_content' layout_height='wrap_content' backgroundTint='{{o_pagesJson.style.background}}' elevation='5dp' src="@drawable/ic_power_settings_new_black_48dp" color='{{o_pagesJson.style.background}}'></fab> */}
        <vertical>
            <appbar bg='{{o_pagesJson.style.background}}'>
                <toolbar id='toolbar' title='{{o_pagesJson.style.title}}' subtitle='{{o_pagesJson.style.subtitle}}' bg='{{o_pagesJson.style.background}}'/>
                <tabs id='tabs'></tabs>
            </appbar>
            <viewpager id='viewpager'>
                <frame id='home'></frame>
                <frame id='setTing'></frame>
            </viewpager>
        </vertical>
    </frame>
);
//创建标签栏
ui.viewpager.setTitles(["首页", "设置"]);
//绑定标签栏
ui.tabs.setupWithViewPager(ui.viewpager);


let homeFs = null, setTingFs = null;
//UI加载线程
threads.start(function(){
    homeFs = Config.f_getJgyFileString(Config.s_jgyUser, Config.s_jgyKey, Config.s_jgyPath+"pages/", "home.js")
    setTingFs = Config.f_getJgyFileString(Config.s_jgyUser, Config.s_jgyKey, Config.s_jgyPath+"pages/", "setTing.js")

    ui.run(() => {
        //生成首页
        ui.inflate(homeFs, ui.home, true);
        //生成设置页
        ui.inflate(setTingFs, ui.setTing, true);
        //设置UI信息
        getUiConfig(Config.o_storage, getXmlOfId(homeFs));

        //无障碍服务单击事件
        ui.autoService.on('click', () => {
            ui.autoService.isChecked() ? auto.service == null ? app.startActivity({action: "android.settings.ACCESSIBILITY_SETTINGS"}) : log('无障碍处于打开状态') : auto.service == null ? log('无障碍处于关闭状态') : auto.service.disableSelf();
        });

        //悬浮窗服务单击事件
        ui.windowService.on('click', () => {
            if (ui.windowService.isChecked()) {
                log("打开悬浮窗服务");
                var intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                    Uri.parse("package:" + context.getPackageName()));
                    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                app.startActivity(intent);
            } else {
                log("关闭悬浮窗服务");
            }
        });

        //Root权限单击是你啊
        ui.rootService.on('click', () => {
            if (ui.rootService.isChecked()) {
                log("打开Root权限");
                shell("", true);
            } else {
                log("关闭Root权限");
            }
        });

        //调试服务单击事件
        ui.deBugService.on('click', () => {
            if (ui.deBugService.isChecked()) {
                log("开启调试窗口");
                console.show();
            } else {
                log("关闭调试窗口");
                console.hide();
            }
        })

        //回到本界面时，触发resume事件
        ui.emitter.on('resume', ()=> {
            auto.service == null ? ui.autoService.setChecked(false) : ui.autoService.setChecked(true);
        });
    });
});

//声明脚本线程变量
let scriptTh = null;

//监听fab的点击事件
ui.fab.on('click', ()=> {
    toastLog("开始运行脚本！");
    putUiConfig(Config.o_storage);
    if (scriptTh) scriptTh.interrupt();
    scriptTh = threads.start(function(){
        let s_script = Config.f_getJgyFileString(Config.s_jgyUser, Config.s_jgyKey, Config.s_jgyPath+"script/", "script.js");
        if (!s_script) return null;
        eval(s_script);
    });
});

ui.fab2.on('click', ()=> {
    toastLog("退出软件");
    ui.finish();
});