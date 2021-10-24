console.show();
console.info("开始运行脚本");
auto.waitFor();

// 等待进入任务页面

while(!isMainMenu())
{
    console.error("请打开任务页面");
    sleep1s(1);
}
    
// 进入任务页面
var i = 0;
var small_detail = textMatches(".*(8s|8秒).*").find(); // 找到任务的小字
while(i < small_detail.size())
{
    small_detail.get(i).parent().child(3).click();  // 进入任务
    console.info("开始做任务");

    sleep1s(10); // 等待任务完成
    
    
    // ********************* 判断是否完成任务 *************************
    var j = 0;
    // 切换下一个任务
    if(textContains("任务已达上限").find().size() > 0)
    {
        i = i + 1;
        j = 10;
    }
    var taskComplete = textMatches("获得.*汪汪币").find().size() == 0;
    while(taskComplete && j < 10)
    {
        sleep1s(1);
        j = j + 1;
        taskComplete = textMatches("获得.*汪汪币").find().size() == 0;
    }
    console.info("任务完成");

    // ******************** 判断是否回到主页面 *************************
    back();
    sleep1s(3);
    if(!isMainMenu())
    {
        back();
        sleep1s(3);
    }
    if(!isMainMenu())
    {
        console.error("未能回到任务页面，退出")
        exit();
    }

    // *********************** 回到主页面后 ****************************
    console.info("回到任务页面");
    // 重新查找任务
    small_detail = textMatches(".*(8s|8秒).*").find();
    // 防止未消失的已完成任务（无效，黑色的也能点）
    if(!small_detail.get(i).parent().child(3).clickable()) {
        i = i + 1;
    }
}

// 结束脚本
console.hide();


function sleep1s(seconds){
    for(var i = 0;i < seconds;i++){
        sleep(1000);
    }
}

function isMainMenu() // 返回主页面
{
    var mainmenu_flag = textMatches(".*(8s|8秒).*").find();
    return mainmenu_flag.size() > 0;
}