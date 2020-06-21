// 武将类
/**
 * width: 武将宽度  1 2 4
 * height: 武将高度 1 2 4
 * left: this.left / 100 = x(武将横坐标)
 * top: this.top / 100 = x(武将纵坐标)
 * dom: 插入到网页中的元素
 * classname: 武将伪类(pesron_type: classname)
 * parentDon: 父级元素(用于渲染到父级上)
 * url: 武将图片地址
 */
let aniOver = true;
class Wujiang {
    constructor(width, height, left, top, dom, className, parentDom, url, timer) {
        this.width = width;
        this.height = height;
        this.top = top;
        this.left = left;
        this.dom = dom;
        this.className = className;
        this.parentDom = parentDom;
        this.url = url;

        // 获取x,y轴坐标
        this.x = this.left / 100;
        this.y = this.top / 100;
        this.render();
        // 定时器
        this.timer = timer;
        this.nameWord;
        this.directionWord;
    }
    render() {
        // 元素的宽高，定位，图片的初始化
        this.dom.style.width = this.width + 'px';
        this.dom.style.height = this.height + 'px';
        this.dom.style.left = this.left + 'px';
        this.dom.style.top = this.top + 'px';
        this.dom.style.position = 'absolute'
        this.dom.classList.add(this.className);
        this.dom.style.backgroundImage = this.url;
        this.dom.style.backgroundRepeat = 'no-repeat';
        this.dom.style.backgroundSize = 'auto 100%';
        this.dom.style.backgroundPosition = '50%';
        this.parentDom.appendChild(this.dom);

        // 改变黄忠的中心位置
        if (this.className == 'huangzhong') {
            this.dom.style.backgroundPosition = '80%';
        }
        // 改变赵云的中心位置
        if (this.className == 'zhaoyun') {
            this.dom.style.backgroundPosition = '40%';
        }
    }

    // 确定移动方向和移动距离
    move(wujiangArray, optimal, direction, i) {
        switch (direction) {
            case 'up':
                this.top -= 100;
                this.directionWord = '上';
                this.uniform(direction, this.top, wujiangArray, optimal, i);
                break;
            case 'down':
                this.top += 100;
                this.directionWord = '下';
                this.uniform(direction, this.top, wujiangArray, optimal, i);
                break;
            case 'left':
                this.left -= 100;
                this.directionWord = '左';
                this.uniform(direction, this.left, wujiangArray, optimal, i);
                break;
            case 'right':
                this.left += 100;
                this.directionWord = '右';
                this.uniform(direction, this.left, wujiangArray, optimal, i);
                break;
            default:
                console.log('移动方向发生错误');
                break;
        }
    }

    //匀速运动
    uniform(direction, distance, wujiangArray, optimal, i) {
        let f = i + 1;
        let bStop = false;
        clearInterval(this.timer);
        if (direction == 'up' || direction == 'down') {
            direction = 'top';
            this.__movingDirection(bStop, direction, distance, 'offsetTop', f, wujiangArray, optimal);
        } else {
            direction = 'left';
            this.__movingDirection(bStop, direction, distance, 'offsetLeft', f, wujiangArray, optimal);
        }
    }

    // 除去冗余代码 + 递归调用(实现动画一层一层播放)
    __movingDirection(bStop, direction, distance, offsetDir, f, wujiangArray, optimal) {
        let isPeed = distance - this.dom[offsetDir] > 0 ? 3 : -3;
        this.timer = setInterval(() => {
            if (Math.abs(distance - this.dom[offsetDir]) < Math.abs(isPeed)) {
                clearInterval(this.timer);
                this.dom.style[direction] = distance + 'px';
                bStop = true;
            } else {
                this.dom.style[direction] = this.dom[offsetDir] + isPeed + 'px';
            }
            if (bStop) {
                if (f == optimal.length) {
                    aniOver = true;
                    alert('共花费' + optimal.length + '步');
                    $('.stepsWord').append(`<button type="button" class="btn btn-default">共花费${optimal.length}步</button>`);
                }
                if (f < optimal.length) {
                    aniOver = false;
                    $('.stepsWord').append(`<button type="button" class="btn btn-default">第${f+1}步：${optimal[f].person_type}：${optimal[f].direction}</button>`);
                    wujiangArray[optimal[f].person_type].move(wujiangArray, optimal, optimal[f].direction, f);
                }
            }
        }, 10)
    }
}