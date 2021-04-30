//"auto";
//setScreenMetrics(1080, 1920);

auto.waitFor()
var appName = "钉钉";
launchApp(appName);

//寻找按钮并点击
//var homeTab = desc("工作台").findOne(5000);
//console.show();
//var mWidth = device.width / 2;
//var mHeight = device.height - 50;
//click(mWidth, mHeight);

var recycle = id("home_app_recycler_view").findOne(8000).children();
var item = recycle[2];
if (item) {
    toast("找到工作台");
    item.click();
} else {
    toast("未找到工作台");
    exit();
}

// 中间
//click(540, 1915);
//sleep(3000);


// 智能填表
var smartFill = className("android.view.View").text("智能填表")
    .findOne(8000).parent();
if (smartFill) {
    toast("找到智能填表");
    smartFill.click();
    //sleep(3000);
} else {
    toast("未找到智能填表");
    exit();
}

// 中间“填写”
//click(540, 1832);
//sleep(300);
var tx = text("填写").findOne(8000).parent();
if (tx) { 
    toast("找到填写");
    tx.click();
    //sleep(300);
} else {
    toast("未找到填写");
    exit();
}


// 右上角“已完成”
//click(811, 241);
//sleep(500);
var ywc = className("android.view.View").text("已完成")
    .findOne(8000);
if (ywc) {
    toast("找到已完成");
    ywc.click();
    //sleep(500);
} else {
    toast("未找到已完成");
    exit();
}

// “高校每日打卡”cardview
sleep(800);
//click(540, 960);
var mrdk = text("查看").find();
if (mrdk.empty) {
    toast("找到每日打卡");
    // 点击最后一个
    mrdk[mrdk.length - 1].click();
} else {
    toast("未找到每日打卡");
    exit();
}

// “今天”日历
//click(145,1461);
//sleep(2000);
var jt = className("android.view.View").text("今天")
    .findOne(8000).parent();
if (jt) {
    toast("找到今天");
    jt.click();
} else {
    toast("未找到今天");
    exit();
}

// 如果有修改，重新提交
var xg = className("android.view.View").text("修改")
    .findOne(2000);
if (xg) {
    toast("找到修改");
    xg.click();
    sleep(500);
} else {
    toast("未找到修改");
}


// 找到获取定位
//gesture(1000, [540, 1500], [540, 1011]);
sleep(1000);
var hq = text("获取").findOne(5000);
if (hq) {
    toast("找到获取");
    hq.click();
    // 定位耗时
    sleep(2000);
} else {
    toast("未找到获取");
    exit();
}
//lick(1035, 1680);
//sleep(800);

// 提交
var tj = text("提交").findOne(2000);
if (tj) {
    toast("找到提交");
    tj.click();
} else {
    toast("未找到提交");
}
//gesture(500, [540, 1900], [540, 100]);
//gesture(500, [540, 1900], [540, 100]);
//sleep(300);
//click(540, 1777);
exit();
