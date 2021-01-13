/*
 * @Author: BanHua
 * @Date: 2021-01-12 23:10:12
 * @LastEditors: BanHua
 * @LastEditTime: 2021-01-13 15:24:05
 * @Description: file content
 */

/**
 * 1.scipt.js的变量不与main.js mainActivity.js共享
 */
let storage = storages.create('BanHua');
let xx帐号 = storage.get('viewDataArr')['bh_xx_user'];
let xx密码 = storage.get('viewDataArr')['bh_xx_pass'];
let 功能1 = storage.get('viewDataArr')['bh_gn1'];

console.show();
console.info(xx帐号);
console.info(xx密码);
console.info(功能1);

