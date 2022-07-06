"ui";
"auto";
events.observeKey();
events.onKeyDown("volume_down",function(event){
            threads.shutDownAll();
        });
ui.layout(
    <vertical gravity="center_vertical" padding="16">
        <text margin="8" textSize="27sp" textStyle="bold" lines="3">
        欢迎使用AutoDailyClock
        </text>
        <text margin="8" textStyle="bold" textColor="red">
        本程序只适用于正常的健康日常打卡。如果身体发生异常状况请立即停止使用本程序，并及时向辅导员或其他负责人报告身体状况！
        </text>
        <button id="startButton"  text="开始打卡" style="Widget.AppCompat.Button.Colored" w="*"  h="70" margin="20"/>
        <button id="checkButton" text="检测权限" style="Widget.AppCompat.Button.Colored" w="*" h="70" margin="20"/>
        <text margin="8">
        使用本应用需要启用的权限：
        </text>
        <text margin="8">
        悬浮窗口、无障碍功能
        </text>
        <text margin="8" textColor="red">
        1.AutoDailyClock-GUT是一个开源项目，它是免费的。
        </text>
        <text margin="8" lines="5">
        2.本项目的源代码是公开的。如果对软件内容存在质疑，欢迎前往github下载源码。
        </text>
        <text marginBottom="5">
        反馈及咨询：natsukawa247@outlook.com
        </text>
        <text marginBottom="5">
        项目地址：
        </text>
        <text marginBottom="5">
        https://github.com/NtskwK/AutoDailyClock-GUT
        </text>
        <text marginBottom="5">
        Autojs相关文档:
        </text>
        <text marginBottom="5">
        https://pro.autojs.org/
        </text>
    </vertical>
);

ui.startButton.on("click", ()=>{
    threads.start(StartClock);
});
ui.checkButton.on("click", ()=>{
    threads.start(StartCheck);
});
// 加个GUI提醒启用权限

var StartCheck = function(){
    toast("启用悬浮窗口以显示日志")
    console.show();
    log("悬浮窗权限已开启");
    auto.waitFor();
    log("无障碍权限已开启");
}



var StartClock = function(){
    // 先存着，说不定盲点的时候要用
    setScreenMetrics(1080, 1920);

    toast("启用悬浮窗口以显示日志")
    console.show();
    if(auto.service == null){
        end("启动无障碍服务");
    }

    log("启动钉钉");
    var appName = "钉钉";
    if(launchApp(appName) == false){
        end("启动钉钉");
    }
    className("android.widget.ListView").findOne(5000);
    sleep(1000);
        

    //直接盲点，点不到再说
    var mWidth = device.width / 2;
    var mHeight = device.height - 150;
    click(mWidth, mHeight);
    sleep(500);

    // 确认所属组织
    // var member = id("dtv_arrow").findOne();
    // log("检测当前组织");
    // if(member.text != org){
    //     orgChange();
        
    //     end("识别到正确的组织");
    // }
    // 一堆bug，你们自己手动换组织吧。哼(╯‵□′)╯︵┻━┻

    var smartFill = className("android.view.View").text("高校每日健康打卡（学生健康码）2.0").findOne(8000);
    if (smartFill) {
        log("已找到打卡位置");
        smartFill.click();
        sleep(1000);
    } else {
        // 识别失误
        log("未找到快捷入口，尝试切换入口");
        enterSwitch();
    }
    
    var jt = className("android.view.View").text("今天").findOne(10000).parent();
    if (jt) {
        log("找到今天");
        jt.click();
    } else {
        end("找到“今天”");
    }
    sleep(2000);

    fillClock();   

    sleep(1000);
    log("任务结束");
    log("点击本窗口右上角的“ × ”方可关闭");
}

// 换一种写法以防搞错(￣_￣|||)
// 尝试切换组织
// function orgChange(){
//     // 在工作台左上角找到切换按钮
//     var switchBotton = id("rl_org_icon").findOne()
//     if (switchBotton) {
//         switchBotton.click();
//         sleep(2000);
//         className("android.support.v7.widget.RecyclerView").findOne().children().forEach(child => {
//                 var target = child.findOne(className("android.widget.TextView").text("桂林理工大学"));
//                 if(target){
//                     log("开始切换组织")
//                     target.click();
//                 }else{
//                     log("找不到设定的组织");
//                     log("请检查org的初始化值");
//                 }
//         });
//     }else{
//         end("识别工作台界面");
//     }
// }
// bug太多，不用这个了

function enterSwitch(){
    var smartFill = className("android.view.View").text("智能填表").findOne(5000).parent();
    if (smartFill) {
        log("打开填表入口");
        smartFill.click();
        sleep(500);
        var tx = text("填写").findOne(5000).parent();
        if (tx) { 
            log("进入填写入口");
            tx.click();
            sleep(500);
        } else {
            end("打开填写入口");
        }
    } else {
        end("打开填表入口");
    }
    
    // 点击右上角“已完成”
    //click(811, 241);
    //sleep(500);
    var ywc = className("android.view.View").text("已完成").findOne(5000);
    var zwsj = className("android.view.View").text("暂无数据").findOne(100);
    if (zwsj) {
        end("找到未完成的打卡任务");
    } 
    if (ywc) {
        log("打开“已完成”");
        ywc.click();
        sleep(500);
    } else {
        end("打开“已完成”");
    }

    // 找到“高校每日打卡”
    //click(540, 960);
    var mrdk = text("查看").find();
    if (mrdk.empty) {
        log("找到每日打卡");
        // 点击最后一个
        mrdk[mrdk.length - 1].click();
    } else {
        end("找到每日打卡");
    }
        
}

function fillClock(){
    // 如果有修改，重新提交
    log("检测填写状态");
    var xg = className("android.view.View").text("修改").findOne(2000);
    if (xg) {
        end("更改已经完成的打卡");
    }

    // 找到获取定位
    //gesture(1000, [540, 1500], [540, 1011]);
    var hq = className("android.view.View").text("获取").findOne();
    if (hq) {
        log("开始获取定位");
        click(hq.bounds().centerX(), hq.bounds().centerY());
        sleep(2000);
    } else {
        log("自动获取定位");
    }
    
    // 提交
    //lick(1035, 1680);
    //sleep(800);
    // var tj = className("android.widget.Button").findOne();
    //     if (tj) {
    //     log("开始提交");        
    // } else {
    //     end("自动提交");
    // }
    //没办法，点不了。只能手点 

    gesture(500, [540, 1900], [540, 100]);
    sleep(500);
    gesture(500, [540, 1900], [540, 100]);
    sleep(500);
    gesture(500, [540, 1900], [540, 100]);

    var mWidth = device.width / 2;
    var mHeight = device.height - 150;
    click(mWidth, mHeight);
    sleep(500);
}

function end(step){
    log("无法" + step);
    log("请手动完成本次工作");
    toast("任务失败！详情请看日志内容");
    exit();
}