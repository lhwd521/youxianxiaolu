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
//获得焦点
input.onfocus = function () {
  mao.classList.add("on");
};

let body = document.getElementById("body");
//监听鼠标点击事件，焦点不在input中则清除样式
body.addEventListener("click", function () {
  if (document.activeElement.id != "input-word") {
    mao.classList.remove("on");
    list.innerHTML = "";
    input.value = "";
  }
});

//按回车搜索
input.onkeydown = function (event) {
  let code = event.keyCode;
  if (code == 13) {
    souSuo();
    //input失去焦点
    input.blur();
    mao.classList.remove("on");
    list.innerHTML = "";
    input.value = "";
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

function cl() {
  input.blur();
  list.innerHTML = "";
  input.value = "";
}

//联想搜索功能
let btn = document.getElementById("input-word");
let list = document.getElementById("list");

btn.onkeyup = function () {
  let val = this.value;
  if (val) {
    let oScript = document.createElement("script");
    oScript.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${val}&cb=callback`;
    document.body.appendChild(oScript);
    document.body.removeChild(oScript);
  } else {
    list.style.display = "none";
  }
};

function callback(data) {
  list.style.display = "block";
  let str = "";
  if (data.s.length > 0) {
    data.s.forEach(function (val) {
      str += `<li class="list-li"><a class="aSou" href = "https://www.baidu.com/s?wd=${val}" target="_blank" rel="noopener noreferrer" onclick="cl()">${val}</a></li>`;
    });
    list.innerHTML = str;
  } else {
    list.style.display = "none";
  }
}
