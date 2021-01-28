"ui";
var Config = new Object();
Config.s_jgyPath = "TaoBao/BanHua2.1/";
Config.s_jgyUser = "17685034710@163.com";
Config.s_jgyKey = "axtpjmwwx9w95fyk";
//-----上面是变量------
//获取坚果云服务器文件，返回为string类型
Config.f_getJgyFileString = function (user, key, path, name) {
    if (!user || !key || !path) {
        console.error("f_getJgyFileString：请填写相关参数！");
        return null;
    }
    name = name || "";
    let o_res = http.get("http://dav.jianguoyun.com/dav/"+path+name, {
        headers: {
            "Authorization": "Basic " + java.lang.String(android.util.Base64.encode(java.lang.String(user+':'+key).getBytes(), 2)),"Content-Type": "text/plain;charset=UTF-8","Connection": "Keep-Alive","Accept-Encoding": "gzip","User-Agent": "okhttp/3.12.1"
        }
    });
    if (o_res!= null && o_res.statusCode >=200 && o_res.statusCode <= 300) return o_res.body.string();
    return null;
}

//获取坚果云服务器文件，返回为二进制数据，一般用于下载文件
Config.f_getJgyFileBytes = function (user, key, path, name) {
    if (!user || !key || !path) {
        console.error("f_getJgyFileBytes：请填写相关参数！");
        return null;
    }
    name = name || "";
    let o_res = http.get("http://dav.jianguoyun.com/dav/"+path+name, {
        headers: {
            "Authorization": "Basic " + java.lang.String(android.util.Base64.encode(java.lang.String(user+':'+key).getBytes(), 2)),"Content-Type": "text/plain;charset=UTF-8","Connection": "Keep-Alive","Accept-Encoding": "gzip","User-Agent": "okhttp/3.12.1"
        }
    }); 
    if (o_res!= null && o_res.statusCode >=200 && o_res.statusCode <= 300) return o_res.body.bytes();
    return null;
}

//导入坚果云指定的模块函数
Config.f_require = function (user, key, path, name) {
    let s_script = Config.f_getJgyFileBytes(user, key, path, name);
    if (!s_script) {
        return null;
    }
    files.writeBytes("./"+name, s_script);
    return require(name);

}

//检测root函数
this.isSuEnable = function () {
    // var file = null;
    // var paths = ["/system/bin/", "/system/xbin/", "/system/sbin/", "/sbin/", "/vendor/bin/", "/su/bin/"];
    // try {
    //     for (let path in paths) {
    //         let file = new java.io.File(paths[path] + "su");
    //         if (file.exists() && file.canExecute()) return true;
    //     }
    // } catch (x) {
    //     toast("错误" + x)
    // }
    // return false;
    if (shell("", true).code == 0) {
        return true;
    } else {
        return false;
    }
    
}

//获取手机配置信息
this.getDeviceConfig = function () {
    let str = "";
    str += "屏幕宽度:" + device.width;
    str += "\n屏幕高度:" + device.height;
    str += "\nbuildId:" + device.buildId;
    str += "\n主板:" + device.board;
    str += "\n制造商:" + device.brand;
    str += "\n型号:" + device.model;
    str += "\n产品名称:" + device.product;
    str += "\nbootloader版本:" + device.bootloader;
    str += "\n硬件名称:" + device.hardware;
    str += "\n唯一标识码:" + device.fingerprint;
    str += "\nIMEI: " + device.getIMEI();
    str += "\nAndroidId: " + device.getAndroidId();
    str += "\nMac: " + device.getMacAddress();
    str += "\nAPI: " + device.sdkInt;
    str += "\n电量: " + device.getBattery();
    return str;
}

//获取xml文件所有id名称返回数组
this.getXmlOfId = function (_xmlStr) {
    let _arr = _xmlStr.match(/bh_[_0-9a-zA-Z]+['$"$]/g);_b = [];
    for (_a in _arr) {
        let _c = _arr[_a].replace(/['"]/g, "");
        _b.push(_c);
    }
    return _b;
}

//保存UI控件信息
this.putUiConfig = function (storage) {
    let ids = getXmlOfId(homeFs);
    // log(ids);
    ids.forEach((idName, index) => {
        // log(ui[idName].toString());
        if (ui[idName].toString().indexOf("EditText") > -1) {
            storage.put(idName, ui[idName].text());
        } else if (ui[idName].toString().indexOf("CheckBox") > -1) {
            storage.put(idName, ui[idName].isChecked());
        } else if (ui[idName].toString().indexOf("Spinner") > -1) {
            storage.put(idName, ui[idName].getSelectedItemPosition())
        } else if (ui[idName].toString().indexOf("Radio") > -1) {
            storage.put(idName, ui[idName].isChecked());
        } else {
            console.error("【%s】该类型的控件不支持保存", idName);
        }
    });
}

//设置控件信息
this.getUiConfig = function (storage, ids) {
    // log("storage:"+storage);
    // log("ids:"+ids);
    ids.forEach((idName) => {
        if (ui[idName].toString().indexOf("EditText") > -1) {
            ui[idName].setText(storage.get(idName)) || "";
        } else if (ui[idName].toString().indexOf("CheckBox") > -1) {
            ui[idName].checked = storage.get(idName) || false;
        } else if (ui[idName].toString().indexOf("Spinner") > -1) {
            ui[idName].setSelection(storage.get(idName) || 0);
        } else if (ui[idName].toString().indexOf("Radio") > -1) {
            ui[idName].checked = storage.get(idName) || false;
        } else {
            console.error("【%s】该类型的控件不支持设置控件信息", idName);
        }
    });
}

//script文件获取相关控件信息
this.getViewContent = function (name) {
    return this.Config.o_storage.get(name);
}

//导入mod
var mod = Config.f_require(Config.s_jgyUser, Config.s_jgyKey, Config.s_jgyPath+"mod/", "mod.js");

//声明本地存储
Config.o_storage = storages.create(mod.getJgyProjectName(Config.s_jgyPath));

//开始加载脚本
let o_loadingMainActivity = threads.start(function(){
    Config.s_mainActivity = Config.f_getJgyFileString(Config.s_jgyUser, Config.s_jgyKey, Config.s_jgyPath+"script/", "mainActivity.js");
    if (!Config.s_mainActivity) return null;
});while(o_loadingMainActivity.isAlive());if (!Config.s_mainActivity) {
    toastLog("加载【mainActivity】失败!");
    exit();
};

//开始运行脚本
eval(Config.s_mainActivity);
