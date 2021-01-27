var mod = {};

//path:坚果云项目路径
mod.getJgyProjectName = function (path) {
    if (path.indexOf('/') == -1) {
        return path;
    } else {
        s_name = path.split('/');
        return s_name[s_name.length - 2];
    }
}

module.exports = mod;