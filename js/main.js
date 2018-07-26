
//封装的函数
//初始化数据函数
var generateData = function () {
    var keys = [
            ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
            ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
            ['z', 'x', 'c', 'v', 'b', 'n', 'm']
        ],
        hash = {
            q: "qq.com",
            w: "weibo.com",
            e: "ele.com",
            r: "renren.com",
            t: "tianya.com",
            y: "youtube.com",
            u: "uc.com",
            i: "iqiyi.com",
            o: "opra.com",
            p: "ppt.com",
            b: "baidu.com"
        }
    //更新hash
    var hashLocalStorage = getLocalStorage('myKey');
    if (hashLocalStorage) {
        hash = hashLocalStorage;
    }

    return {
        "key": keys,
        "hashA": hash
    }
}
    //读取本地的localStorage
    var getLocalStorage = function (name) {
        //JSON.parse()将JSON字符串解析成数组或者对象
        return JSON.parse(localStorage.getItem(name) || "null");
    };
    //创建标签
    var creatTag = function (tagName, attribute) {
        var element = document.createElement(tagName);
        for (var key in attribute) {
            element[key] = attribute[key];
        }
        return element;
    }
    //img函数
    var creatImg = function (index1) {
        var img = creatTag('img');
        //监听请求失败事件
        img.onerror = function (event) {
            event.target.src = "./img/dot.png";
        }
        if (hash[index1]) {
            img.src = "http://" + hash[index1] + "/favicon.ico";
        } else {
            img.src = "./img/dot.png";
        }

        return img;
    }
    //button函数
    var creatButton = function (index2, hash) {
        var buttonE = creatTag("button");
        buttonE.textContent = "编辑";
        buttonE.id = index2;
        /* 编辑网址点击事件 */
        buttonE.onclick = function (event) {
            hash[event.target.id] = prompt("输入您自定义的网址");
            localStorage.setItem(`myKey`, JSON.stringify(hash)); //将hash解析成字符串并存入localStorage，JSON.stringify()将一个数组或者对象转换成JSON字符串。

            var index = event.target.id;
            event.target.previousSibling.src = "http://" + hash[index] + "/favicon.ico";
            img.onerror = function (event) {
                this.src = "./img/dot.png";
            }
        }
        
        return buttonE;
    }
    //kbd函数
    var creatKbd = function (index3) {
        var kbd1 = creatTag('kbd', {
            className: "keyboardStyle"
        });
        kbd1.textContent = index3;
        kbd1.appendChild(img);
        kbd1.appendChild(button);
        /* 添加键盘监听事件*/
        document.onkeypress = function (event) {
            var key = event.key,
                url = hash[key];
            if (url != undefined) {
                window.open("http://" + url, "_blank");
                //location.href = "https://" + url;  
            }

        }
        return kbd1;
    }
    
//1.初始化数据
var keys = generateData()["key"];
var hash = generateData()["hashA"];



//2.生成键盘
//遍历keys生成kbd
var main = document.getElementById("keyWrapper");
for (var i = 0; i < keys.length;i++){

    var div = creatTag('div');
    div.className="row";
    var row=keys[i];
    keyWrapper.appendChild(div);
    for (var j = 0; j < row.length; j++) {
        var img=creatImg([row[j]]);
        var button = creatButton(row[j],hash);
        var kbd = creatKbd(row[j]);
        div.appendChild(kbd);   
    }
}



