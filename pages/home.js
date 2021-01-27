<frame>
    <vertical>
        {/* 脚本公告配置区域 */}
        <card cardCornerRadius='15dp' margin='10dp' cardElevation='15dp' padding='5dp'>
            <vertical>
                <text gravity='center' text='{{o_pagesJson.style.notice.title}}' w='*' h='auto' textSize='18sp' textColor='#ffffff' padding='10dp' bg='{{o_pagesJson.style.background}}'></text>
                <text padding='8dp' text='{{o_pagesJson.style.notice.content}}'></text>
            </vertical>
        </card>
        {/* 脚本功能UI配置区域 */}
        <card cardCornerRadius='15dp' margin='10 0 10 10' cardElevation='15dp' padding='5dp'>
            <vertical>
                <text gravity='center' text='脚本功能' w='*' h='auto' textSize='18sp' textColor='#ffffff' padding='10dp' bg='{{o_pagesJson.style.background}}'></text>
                <vertical padding='8dp'>
                    <horizontal>
                        <text text='账号：'></text>
                        <input w='*' id='bh_user' hint='请输入账号'></input>
                    </horizontal>
                    <horizontal>
                        <text text='密码：'></text>
                        <input w='*' id='bh_user' hint='请输入密码' inputType='textPassword'></input>
                    </horizontal>
                    <horizontal>
                        <text text='性别：'></text>
                        <spinner w='*' id='bh_sp1' entries='男生|女生|人妖'></spinner>
                    </horizontal>
                    <horizontal>
                        <text text='职业：'></text>
                        <checkbox id='bh_xs' text='学生'></checkbox>
                        <checkbox id='bh_sbz' text='上班族'></checkbox>
                        <checkbox id='bh_bm' text='宝妈'></checkbox>
                        <checkbox id='bh_lb' text='老板'></checkbox>
                    </horizontal>
                    <radiogroup orientation='horizontal'>
                        <text text='伴侣：'></text>
                        <radio id='bh_ra1' text='迪丽热巴'></radio>
                        <radio id='bh_ra2' text='郑爽'></radio>
                        <radio id='bh_ra3' text='张靓颖'></radio>
                    </radiogroup>
                </vertical>
            </vertical>
        </card>
    </vertical>
</frame>


