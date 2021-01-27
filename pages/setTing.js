<frame>
    <vertical>
        <card cardCornerRadius='15dp' margin='10dp' cardElevation='15dp' padding='5dp'>
            <vertical>
                <text gravity='center' text='权限服务' w='*' h='auto' textSize='18sp' textColor='#ffffff' padding='10dp' bg='{{o_pagesJson.style.background}}'></text>
                <Switch id='autoService' text='*无障碍服务' padding='8dp' textSize='15sp' checked='{{auto.service != null}}'></Switch>
                <Switch id='windowService' text='悬浮窗服务' padding='8dp' textSize='15sp'></Switch>
                <Switch id='rootService' text='Root服务' padding='8dp' textSize='15sp' checked='{{isSuEnable()}}'></Switch>
                <Switch id='deBugService' text='调试服务' padding='8dp' textSize='15sp'></Switch>
            </vertical>
        </card>
        <card cardCornerRadius='15dp' margin='10 0 10 10' cardElevation='15dp' padding='5dp'>
            <vertical>
                <text gravity='center' text='手机配置' w='*' h='auto' textSize='18sp' textColor='#ffffff' padding='10dp' bg='{{o_pagesJson.style.background}}'></text>
                <text id='deviceConfig' padding='8dp' text='{{getDeviceConfig()}}'></text>
            </vertical>
        </card>
    </vertical>
</frame>


