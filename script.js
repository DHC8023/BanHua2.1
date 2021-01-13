/*
 * @Author: BanHua
 * @Date: 2021-01-12 23:10:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-14 01:36:47
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

console.info(功能1);


while (1) {
    console.info(xx帐号);
    console.info(xx密码);
}
