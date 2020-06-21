// 获取父级元素
let wrapper = document.getElementsByClassName('wrapper')[0];
// 获取点击按钮
let btn = document.getElementById('btn');

// 创建武将元素
let caocaoDiv = document.createElement('div');
let zhaoyunDiv = document.createElement('div');
let machaoDiv = document.createElement('div');
let guanyuDiv = document.createElement('div');
let huangzhongDiv = document.createElement('div');
let zhangfeiDiv = document.createElement('div');
let xb1Div = document.createElement('div');
let xb2Div = document.createElement('div');
let xb3Div = document.createElement('div');
let xb4Div = document.createElement('div');
let free1Div = document.createElement('div');
let free2Div = document.createElement('div');


// 创建武将实体类
let huangzhong = new Wujiang(100, 200, 300, 100, huangzhongDiv, 'huangzhong', wrapper, 'url(./src/img/huangzhong.jpg)'),
    caocao = new Wujiang(200, 200, 100, 100, caocaoDiv, 'caocao', wrapper, 'url(./src/img/caocao.jpg)'),
    zhaoyun = new Wujiang(100, 200, 0, 100, zhaoyunDiv, 'zhaoyun', wrapper, 'url(./src/img/zhaoyun.jpg)'),
    zhangfei = new Wujiang(100, 200, 300, 300, zhangfeiDiv, 'zhangfei', wrapper, 'url(./src/img/zhangfei.jpg)'),
    guanyu = new Wujiang(200, 100, 100, 0, guanyuDiv, 'guanyu', wrapper, 'url(./src/img/guanyu.jpg)'),
    bing1 = new Wujiang(100, 100, 100, 300, xb1Div, 'xb1', wrapper, 'url(./src/img/zu1.png)'),
    bing2 = new Wujiang(100, 100, 200, 300, xb2Div, 'xb2', wrapper, 'url(./src/img/zu2.jpg)'),
    machao = new Wujiang(100, 200, 0, 300, machaoDiv, 'machao', wrapper, 'url(./src/img/machao.jpg)'),
    bing3 = new Wujiang(100, 100, 0, 0, xb3Div, 'xb3', wrapper, 'url(./src/img/zu3.jpg)'),
    bing4 = new Wujiang(100, 100, 300, 0, xb4Div, 'xb4', wrapper, 'url(./src/img/zu4.jpg)'),
    free1 = new Wujiang(100, 100, 100, 400, free1Div, 'free1', wrapper),
    free2 = new Wujiang(100, 100, 100, 400, free2Div, 'free2', wrapper);
// 把武将放入对象
let wujiangArray = {
    huangzhong,
    caocao,
    zhaoyun,
    zhangfei,
    guanyu,
    bing1,
    bing2,
    machao,
    bing3,
    bing4,
    free1,
    free2
};
// 渲染按钮
let parentBtn = document.getElementsByClassName('btn-group')[0];
for (item in stepsData) {
    let sameBtn = document.createElement('button'),
        btnClass = document.createAttribute("class"); //创建属性
    btnClass.value = 'btn btn-default stepsBtn'; //设置属性值
    sameBtn.setAttributeNode(btnClass); //给div添加属性
    sameBtn.id = item;
    sameBtn.innerHTML = stepsData[item].name;
    parentBtn.appendChild(sameBtn);
}

// 给按钮添加绑定事件 + 渲染武将定位
let btnArray = document.getElementsByClassName('stepsBtn');

// 拿到steps, 发送给后端
let btnData;
for (let i = 0; i < btnArray.length; i++) {
    btnArray[i].onclick = function () {
        // 判断动画是否在执行
        if (!aniOver) {
            alert('请等待动画结束');
        } else {
            btnData = stepsData[this.id].steps;
            $('.title').html('关卡：' + stepsData[this.id].name);
            for (item in btnData) {
                wujiangArray[item].left = btnData[item].y * 100;
                wujiangArray[item].top = btnData[item].x * 100;
                wujiangArray[item].render();
            }
        }

    }
}

// 请求数据
function postData(url, data) {
    let returnPost;
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        type: 'POST',
        async: false, // 同步请求
        success: function (data) {
            console.log(data);
            returnPost = data.steps;
        },
        error: function (data) {
            console.log(data);
            returnPOst = data;
        }
    })
    return returnPost;
}


// 模仿移动
btn.onclick = () => {
    if (!aniOver) {
        alert('请等待动画结束');
    } else {
        // 拿到返回结果
        $('.stepsWord').html('');
        let optimal = postData('http://120.92.111.108:8003', btnData);
        $('.stepsWord').append(`<button type="button" class="btn btn-default">第${1}步：${optimal[0].person_type}：${optimal[0].direction}</button>`);
        wujiangArray[optimal[0].person_type].move(wujiangArray, optimal, optimal[0].direction, 0);
    }
}