/*
 * @Author: BanHua
 * @Date: 2021-01-12 23:10:12
 * @LastEditors: BanHua
 * @LastEditTime: 2021-01-12 23:32:13
 * @Description: file content
 */

//新的脚本环境所有变量不与main.js mainActivity.js共享
/**
 * 这个地方就填你在main.js中CONFIG.storageName的参数就行
 * 同setViewContent第二个参数
 */
let storage = storages.create('BanHua');

/**
 * 这个地方注意，因为变量不共享，如果需要获取界面配置信息
 * 只需要get setViewContent中第三个参数的值就行了，如果没有填写，就默认为viewDataArr
 */
let UI变量 = storage.get('viewDataArr');

log(UI变量['bh_xx_pass']);

