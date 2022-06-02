//调试
let log = function (i) {
  console.log(i);
};

//切换背景
let imgNum = 0;
let img = ["yun", "sun", "woman", "deng", "sky", "yanhuo"];
function change() {
  let anNiu = document.getElementById("bgimg");
  imgNum = imgNum + 1;
  imgNum = imgNum % img.length;
  anNiu.src = "images/" + img[imgNum] + ".jpg";
  let clock = document.querySelector(".clock");
  if (imgNum > 2) {
    clock.classList.add("dark");
  } else {
    clock.classList.remove("dark");
  }
}

//显示时钟
let hourStyle = document.querySelector(".hour");
let minuteStyle = document.querySelector(".minute");
let secondStyle = document.querySelector(".second");
let times = document.querySelector(".time");
let timeMonth = document.querySelector(".time-month");
let timeWeek = document.querySelector(".time-week");

let days = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];

function setTime() {
  const time = new Date();
  let month = time.getMonth() + 1;
  let date = time.getDate();
  let day = time.getDay();
  let hour = time.getHours();
  let hours = hour >= 13 ? hour % 12 : hour;
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();

  hourStyle.style.transform = `translate(-50%, -100%) rotate(${scale(
    hours,
    0,
    12,
    0,
    360
  )}deg)`;

  minuteStyle.style.transform = `translate(-50%, -100%) rotate(${scale(
    minutes,
    0,
    60,
    0,
    360
  )}deg)`;
  secondStyle.style.transform = `translate(-50%, -100%) rotate(${scale(
    seconds,
    0,
    60,
    0,
    360
  )}deg)`;

  times.innerHTML = `${hour}:${minutes < 10 ? `0${minutes}` : minutes}`;
  timeMonth.innerHTML = `${month}月${date}日`;
  timeWeek.innerHTML = `${days[day]}`;
}

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

setTime();
setInterval(setTime, 1000);

//背景毛玻璃特效
let input = document.querySelector(".input-box");
let mao = document.getElementById("mao");
//input获得焦点
input.onfocus = function () {
  mao.classList.add("on");
};
let body = document.getElementById("body");
//监听鼠标点击事件，焦点不在input中则清除样式
let delOn = 0;
body.addEventListener("click", function (event) {
  if (document.activeElement.id != "input-word") {
    mao.classList.remove("on");
    list.innerHTML = "";
    input.value = "";
  }
  //第二个条件，判断鼠标是否点击到app上
  let ulClick = document.getElementById("app-gird").contains(event.target);
  if (!ulClick && delOn === 1) {
    document.body.classList.toggle("active-del");
    delOn = 0;
    log(delOn);
  }
});

let liNum;
input.onkeydown = function (event) {
  let code = event.keyCode;
  //按回车搜索
  if (code == 13) {
    let lis = list.getElementsByTagName("li");
    //如果选中第一项就翻译
    if (liNum % lis.length === 0) {
      let sou = `https://fanyi.baidu.com/#en/zh/${input.value}`;
      window.open(sou);
    } else {
      souSuo();
    }
    //input失去焦点
    input.blur();
    mao.classList.remove("on");
    list.innerHTML = "";
    input.value = "";
    //按上下键选择
  } else if (code === 40) {
    let lis = list.getElementsByTagName("li");
    liNum += 1;
    let lisx = lis[liNum % lis.length];
    input.value = lisx.getElementsByTagName("a")[0].innerHTML;
    if (liNum === 0) {
      lisx.classList.add("on");
    } else {
      lis[(liNum - 1) % lis.length].classList.remove("on");
      lisx.classList.add("on");
    }
  } else if (code === 38) {
    let lis = list.getElementsByTagName("li");
    liNum -= 1;
    if (liNum < 0) {
      liNum = 0;
    } else {
      let lisx = lis[liNum % lis.length];
      input.value = lisx.getElementsByTagName("a")[0].innerHTML;
      lis[(liNum + 1) % lis.length].classList.remove("on");
      lisx.classList.add("on");
    }
  }
};

function souSuo() {
  let word = document.getElementById("input-word").value;
  if (word.length != 0) {
    let sou = `https://www.baidu.com/s?word=${word}`;
    window.open(sou);
  } else {
    log("请输入信息");
  }
}

//input失焦清理
function cl() {
  input.blur();
  list.innerHTML = "";
  input.value = "";
}

//联想搜索功能
let btn = document.getElementById("input-word");
let list = document.getElementById("list");

btn.onkeyup = function (event) {
  let val = this.value;
  let code = event.keyCode;
  if (val && code !== 40 && code !== 38) {
    let oScript = document.createElement("script");
    oScript.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${val}&cb=callback`;
    document.body.appendChild(oScript);
    document.body.removeChild(oScript);
    liNum = -1;
  } else if (code === 40 || code === 38) {
  } else {
    list.style.display = "none";
  }
};

function callback(data) {
  list.style.display = "block";
  let str = "";
  if (data.s.length > 0) {
    str = `<li class="list-li"><a class="aSou" href = "https://fanyi.baidu.com/#en/zh/${input.value}" target="_blank" rel="noopener noreferrer" onclick="cl()">翻译：${input.value}</a></li>`;
    data.s.forEach(function (val) {
      str += `<li class="list-li"><i class="fa fa-search"></i><a class="aSou" href = "https://www.baidu.com/s?wd=${val}" target="_blank" rel="noopener noreferrer" onclick="cl()">${val}</a></li>`;
    });
    list.innerHTML = str;
  } else {
    list.style.display = "none";
  }
}
//打开、关闭添加app窗口
function appAdd() {
  let appUrl = document.getElementById("app-add-url");
  let appName = document.getElementById("app-add-name");
  appUrl.value = "";
  appName.value = "";
  document.body.classList.toggle("active");
}
//点击确认，加入网址
function appAdds() {
  //抓取 两个input.value
  let appUrl = document.getElementById("app-add-url");
  let appName = document.getElementById("app-add-name");
  //在ul中尾部插入innerhtml
  // 备用获取图标api接口：https://api.qqsuu.cn/api/get?url=
  let ulGird = document.querySelector(".app-gird");
  if (appUrl.value !== "" && appName.value !== "") {
    ulGird.innerHTML =
      `<li class="app-li">
              <div class="app-div">
                <a
                  href="${appUrl.value}"
                  class="app-a"
                  target="_blank"
                  rel="noopener noreferrer"
                  ><img
                    class="app-img"
                    src="https://api.xinac.net/icon/?url=${appUrl.value}"
                    alt="${appName.value}"
                /></a>
                <div class="app-del" onclick="appDelMine(this)"><i class="fa fa-close" style="font-size:48px;color: rgba(255, 4, 4, 0.8)"></i></div>
              </div>
              <p class="app-title">${appName.value}</p>
            </li>` + ulGird.innerHTML;
    appAdd();
  } else {
    alert("请填写网址或名称！");
  }
}
//打开、关闭删除app
function appDel() {
  if (delOn === 0) {
    delOn = 1;
  } else {
    delOn = 0;
  }
  document.body.classList.toggle("active-del");
}

function appDelMine(e) {
  let foo = e.parentNode.parentNode;
  foo.remove();
}

// function appDel() {
//   let ulGird = document.querySelector(".app-gird");
//   let delMenu = document.querySelector(".app-del-lists");
//   delMenu.innerHTML = "";
//从最后开始需要保留的系统icon数量
//   let baoliu = 2;
//   for (
//     let index = ulGird.getElementsByTagName("p").length - (baoliu + 1);
//     index >= 0;
//     index--
//   ) {
//     delMenu.innerHTML =
//       `<div class="app-del-list"><img class="app-del-img" src="${
//         ulGird.getElementsByTagName("img")[index].src
//       }" /><span class="app-del-text">${
//         ulGird.getElementsByTagName("p")[index].innerHTML
//       }</span><button onclick="appDelOne(this)">删除</button></div>` +
//       delMenu.innerHTML;
//   }
//   document.body.classList.toggle("active-del");
// }

// let delLiNum = [];

// function appDelOne(e) {
//   var a = e.parentNode.getElementsByTagName("span")[0];
//   a.classList.add("del");
//   log(e.parentNode);
// }
