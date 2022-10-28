// import * as echarts from "echarts";
//调试
let log = function (i) {
  const time = new Date();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  //显示时间
  // console.log(minutes + ":" + seconds);
  console.log(i);
};
//番茄钟计时开关
let fanqieON;
if (window.localStorage.getItem("fanqieEndTime")) {
  fanqieON = 1;
  document.getElementById("fanqieStart").disabled = true;
} else {
  fanqieON = 0;
  document.getElementById("fanqieStart").disabled = false;
}

//调用本地浏览器图标缓存信息
let data = window.localStorage.getItem("user");
let defaultLi = document.querySelectorAll(".default");
//保留有default class样式的li，添加至用户缓存最后
if (data) {
  let liStr = "";
  for (let index = 0; index < defaultLi.length; index++) {
    liStr += defaultLi[index].outerHTML;
  }
  data = data + liStr;
  document.getElementById("app-gird").innerHTML = data;
}
//调用本地背景图缓存
let bgImgSrc = window.localStorage.getItem("bg-img");
if (bgImgSrc) {
  let anNiu = document.getElementById("bgimg");
  anNiu.src = "images/" + bgImgSrc + ".jpg";
}
window.localStorage.getItem("bg-img");
//调用本地设置信息
let setupItem = [
  "--gird-column",
  "--icon-radius",
  "--app-fontsize",
  "--app-imgHeight",
  "--appImg-radius",
  "--search-width",
  "--search-radius",
  "--gird-row",
  "--app-imgWidth",
];
let setupData = [
  "gird-c",
  "icon-r",
  "app-f",
  "app-imgH",
  "appImg-r",
  "search-w",
  "search-r",
  "gird-r",
  "app-imgW",
  "daynight",
];
for (let index = 0; index < 10; index++) {
  let foo = window.localStorage.getItem(setupData[index]);
  let root = document.documentElement;
  if (foo && index < 9) {
    root.style.setProperty(setupItem[index], foo);
  } else if (foo === "day" && index === 9) {
    day();
  } else if (foo === "night" && index === 9) {
    night();
  }
}
//调用备忘录数据
let noteBookData = window.localStorage.getItem("notebook");
let noteBookShowData = window.localStorage.getItem("notebookshow");
if (noteBookData) {
  let txt = document.getElementById("noteBookTxt");
  txt.value = noteBookData;
}
if (noteBookShowData === "1") {
  let txt = document.getElementById("noteBookTxt");
  let show = document.getElementById("noteBookShowSpan");
  document.body.classList.toggle("active-noteBookShow");
  show.innerHTML = txt.value;
}
//调用番茄钟数据
let fanqieData = window.localStorage.getItem("fanqie");
let fanqieShowData = window.localStorage.getItem("fanqieshow");
if (fanqieData) {
  let txt = document.getElementById("fanqieTxt");
  txt.value = fanqieData;
}
if (fanqieShowData === "1") {
  let txt = document.getElementById("fanqieTxt");
  let show = document.getElementById("fanqieShowSpan");
  document.body.classList.toggle("active-fanqieShow");
  show.innerHTML = txt.value;
}

//切换背景
let imgNum = 0;
let img = ["yun", "sun", "woman", "deng", "sky", "yanhuo"];
function change() {
  let anNiu = document.getElementById("bgimg");
  imgNum = imgNum + 1;
  imgNum = imgNum % img.length;
  anNiu.src = "images/" + img[imgNum] + ".jpg";
  //保留用户缓存
  window.localStorage.setItem("bg-img", img[imgNum]);
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
body.addEventListener("click", function (event) {
  if (document.activeElement.id != "input-word") {
    mao.classList.remove("on");
    list.innerHTML = "";
    input.value = "";
  }
  //第二个条件，判断鼠标是否点击到app上
  let boxTime = document.getElementById("box-time").contains(event.target);
  let search = document.getElementById("search").contains(event.target);
  let x = document.getElementById("body").classList.contains("active-del");
  if ((search || boxTime) && x) {
    document.body.classList.toggle("active-del");
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
      let str = input.value;
      str = str.replace("翻译：", "");
      if (searchWeb === 1) {
        let sou = `https://fanyi.baidu.com/#en/zh/${str}`;
        window.open(sou);
      } else if (searchWeb === 2) {
        let sou = `https://www.bing.com/dict/search?q=${str}`;
        window.open(sou);
      } else if (searchWeb === 3) {
        let sou = `https://translate.google.cn/?sl=en&tl=zh-CN&text=${str}`;
        window.open(sou);
      } else if (searchWeb === 4) {
        let sou = `https://fanyi.baidu.com/#en/zh/${str}`;
        window.open(sou);
      }
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
  if (word.length != 0 && searchWeb === 1) {
    let sou = `https://www.baidu.com/s?word=${word}`;
    window.open(sou);
  } else if (word.length != 0 && searchWeb === 2) {
    let sou = `https://www.bing.com/search?q=${word}`;
    window.open(sou);
  } else if (word.length != 0 && searchWeb === 3) {
    let sou = `https://www.google.com/search?q=${word}`;
    window.open(sou);
  } else if (word.length != 0 && searchWeb === 4) {
    let sou = `https://fsoufsou.com/search?q=${word}`;
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
//选择搜索引擎(1.百度 2.必应 3.谷歌 4.f搜)
let searchWeb = 1;

function selectSearch() {
  document.body.classList.toggle("active-search");
}

function searchChange(e) {
  let foo = e.getElementsByTagName("i")[0];
  if (foo.classList.contains("fa-paw")) {
    document.getElementById("searchIcon").className = "fa fa-paw";
    searchWeb = 1;
  } else if (foo.classList.contains("fa-search")) {
    document.getElementById("searchIcon").className = "fa fa-search";
    searchWeb = 2;
  } else if (foo.classList.contains("fa-google")) {
    document.getElementById("searchIcon").className = "fa fa-google";
    searchWeb = 3;
  } else if (foo.classList.contains("fa-facebook")) {
    document.getElementById("searchIcon").className = "fa fa-facebook";
    searchWeb = 4;
  }
}

//联想搜索功能
let btn = document.getElementById("input-word");
let list = document.getElementById("list");

btn.onkeyup = function (event) {
  let val = this.value;
  let code = event.keyCode;
  if (val && code !== 40 && code !== 38) {
    let oScript = document.createElement("script");
    if (searchWeb === 1) {
      oScript.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${val}&cb=callback`;
    } else if (searchWeb === 2) {
      oScript.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${val}&cb=callback`;
    } else if (searchWeb === 3) {
      oScript.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${val}&cb=callback`;
    } else if (searchWeb === 4) {
      oScript.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${val}&cb=callback`;
    }
    document.body.appendChild(oScript);
    document.body.removeChild(oScript);
    liNum = -1;
  } else if (code === 40 || code === 38) {
  } else {
    list.style.display = "none";
  }
};
//联想搜索返回函数
function callback(data) {
  list.style.display = "block";
  let str = "";
  if (searchWeb === 1 && data.s.length > 0) {
    str = `<li class="list-li"><a class="aSou" href = "https://fanyi.baidu.com/#en/zh/${input.value}" target="_blank" rel="noopener noreferrer" onclick="cl()">翻译：${input.value}</a></li>`;
    data.s.forEach(function (val) {
      str += `<li class="list-li"><i class="fa fa-search"></i><a class="aSou" href = "https://www.baidu.com/s?wd=${val}" target="_blank" rel="noopener noreferrer" onclick="cl()">${val}</a></li>`;
    });
    list.innerHTML = str;
  } else if (searchWeb === 2 && data.s.length > 0) {
    str = `<li class="list-li"><a class="aSou" href = "https://www.bing.com/dict/search?q=${input.value}" target="_blank" rel="noopener noreferrer" onclick="cl()">翻译：${input.value}</a></li>`;
    data.s.forEach(function (val) {
      str += `<li class="list-li"><i class="fa fa-search"></i><a class="aSou" href = "https://www.bing.com/search?q=${val}" target="_blank" rel="noopener noreferrer" onclick="cl()">${val}</a></li>`;
    });
    list.innerHTML = str;
  } else if (searchWeb === 3 && data.s.length > 0) {
    str = `<li class="list-li"><a class="aSou" href = "https://translate.google.cn/?sl=en&tl=zh-CN&text=${input.value}" target="_blank" rel="noopener noreferrer" onclick="cl()">翻译：${input.value}</a></li>`;
    data.s.forEach(function (val) {
      str += `<li class="list-li"><i class="fa fa-search"></i><a class="aSou" href = "https://www.google.com/search?q=${val}" target="_blank" rel="noopener noreferrer" onclick="cl()">${val}</a></li>`;
    });
    list.innerHTML = str;
  } else if (searchWeb === 4 && data.s.length > 0) {
    str = `<li class="list-li"><a class="aSou" href = "https://fanyi.baidu.com/#en/zh/${input.value}" target="_blank" rel="noopener noreferrer" onclick="cl()">翻译：${input.value}</a></li>`;
    data.s.forEach(function (val) {
      str += `<li class="list-li"><i class="fa fa-search"></i><a class="aSou" href = "https://fsoufsou.com/search?q=${val}" target="_blank" rel="noopener noreferrer" onclick="cl()">${val}</a></li>`;
    });
    list.innerHTML = str;
  } else {
    list.style.display = "none";
  }
}

//打开、关闭 添加app窗口
function appAdd() {
  let appUrl = document.getElementById("app-add-url");
  let appName = document.getElementById("app-add-name");
  appUrl.value = "";
  appName.value = "";
  document.body.classList.toggle("active");
  //如果删除按钮开启则关闭
  let del = document.getElementById("body").classList.contains("active-del");
  if (del) {
    document.body.classList.toggle("active-del");
  }
  let appAddInput = document.querySelectorAll(".app-add-input");
  for (let index = 0; index < appAddInput.length; index++) {
    appAddInput[index].onkeydown = function (event) {
      let code = event.keyCode;
      //按回车添加
      if (code == 13) {
        appAdds();
      }
    };
  }
}

//保存数据到浏览器缓存
function save() {
  if (data) {
    window.localStorage.removeItem("user");
  }
  let userLi = document.querySelectorAll(".user");
  let liStr = "";
  for (let index = 0; index < userLi.length; index++) {
    liStr += userLi[index].outerHTML;
  }
  window.localStorage.setItem("user", liStr);
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
      `<li class="app-li user">
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
    //保存ul信息到浏览器缓存;
    save();
  } else {
    alert("请填写网址或名称！");
  }
}
//打开、关闭 删除app窗口
function appDel() {
  document.body.classList.toggle("active-del");
}
//删除自身
function appDelMine(e) {
  let foo = e.parentNode.parentNode;
  foo.remove();
  //保存ul信息到浏览器缓存
  save();
}

//设置
function setup() {
  document.body.classList.toggle("active-setup");
  let range = document.querySelectorAll(".range");
  let root = document.documentElement;
  let attribute = [
    "--gird-column",
    "--icon-radius",
    "--app-fontsize",
    "--app-imgHeight",
    "--appImg-radius",
    "--search-width",
    "--search-radius",
  ];
  let danwei = ["px", "px", "px", "%", "px", "px", "px"];
  for (let index = 0; index < range.length; index++) {
    range[index].addEventListener("input", (e) => {
      let val = e.target.value;
      let show = e.target.nextElementSibling;
      show.value = val;
      root.style.setProperty(attribute[index], val + danwei[index]);
      //保存配置
      window.localStorage.setItem(setupData[index], val + danwei[index]);
      if (index === 0) {
        root.style.setProperty("--gird-row", val + danwei[index]);
        //保存配置
        window.localStorage.setItem(setupData[7], val + danwei[index]);
      } else if (index === 3) {
        root.style.setProperty("--app-imgWidth", val + danwei[index]);
        //保存配置
        window.localStorage.setItem(setupData[8], val + danwei[index]);
      }
    });
  }
}

function setupClose() {
  document.body.classList.toggle("active-setup");
}
//重置setup值
function reset() {
  let range = document.querySelectorAll(".range");
  let root = document.documentElement;
  let attribute = [
    "--gird-column",
    "--icon-radius",
    "--app-fontsize",
    "--app-imgHeight",
    "--appImg-radius",
    "--search-width",
    "--search-radius",
  ];
  let val = ["100", "14", "14", "60", "14", "500", "25"];
  let danwei = ["px", "px", "px", "%", "px", "px", "px"];
  for (let index = 0; index < range.length; index++) {
    let show = range[index].nextElementSibling;
    show.value = val[index];
    root.style.setProperty(attribute[index], val[index] + danwei[index]);
    //保存配置
    window.localStorage.setItem(setupData[index], val[index] + danwei[index]);
    if (index === 0) {
      root.style.setProperty("--gird-row", val[index] + danwei[index]);
      //保存配置
      window.localStorage.setItem(setupData[7], val[index] + danwei[index]);
    } else if (index === 3) {
      root.style.setProperty("--app-imgWidth", val[index] + danwei[index]);
      //保存配置
      window.localStorage.setItem(setupData[8], val[index] + danwei[index]);
    }
  }
  day();
}
//导出缓存
function exportLocalStorage() {
  let localData = [];
  localData.push(window.localStorage.getItem("user"));
  let foo = document.createElement("a");
  foo.download = "马上起始页缓存" + ".data";
  foo.style.display = "none";
  let blob = new Blob([JSON.stringify(localData)]);
  foo.href = URL.createObjectURL(blob);
  foo.click();
}
//导入缓存
function importLocalStorage() {
  let newInput = document.createElement("input");
  newInput.type = "file";
  newInput.style.display = "none";
  newInput.click();
  newInput.onchange = function (e) {
    let file = e.target.files[0];
    let fileType = file.name.split(/[.;]/);
    if (fileType[fileType.length - 1] == "data") {
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function (e) {
        let contents = JSON.parse(e.target.result);
        userData = contents[0];
        localStorage.setItem("user", userData);
        window.location.href = window.location.href;
        location.reload();
      };
    } else {
      alert("文件类型错误(xxx.data)");
    }
  };
}
//重置所有数据
function resetAll() {
  let tips = window.confirm("重置会删除所有保存的网站数据，请谨慎确认！");
  if (tips) {
    localStorage.clear();
    window.open("https://youxianxiaolu.com/mashanggo", "_self");
  } else {
  }
}

//夜间模式
function oncheckbox(e) {
  if (e.checked == true) {
    night();
  } else {
    day();
  }
}
//白天
function day() {
  let root = document.documentElement;
  root.style.setProperty("--main-color", "rgb(255, 255, 255, 0.6)");
  root.style.setProperty("--main-colorHover", "rgb(255, 255, 255, 0.8)");
  root.style.setProperty("--main-colorUl", "rgb(255, 255, 255, 0.3)");
  root.style.setProperty("--main-colorUlHover", "rgb(255, 255, 255, 0.8)");
  root.style.setProperty("--main-colorApp", "rgb(255, 255, 255, 0.5)");
  root.style.setProperty("--main-colorAdd", "rgb(255, 255, 255)");
  root.style.setProperty("--main-colorSetup", "rgb(255, 255, 255, 0.8)");
  root.style.setProperty("--main-colorSearchList", "rgb(255, 255, 255, 0.6)");
  root.style.setProperty("--main-colorListHover", "rgb(255, 255, 255, 0.9)");
  root.style.setProperty("--main-colorFont", "black");
  root.style.setProperty("--main-colorSelectHover", "white");
  root.style.setProperty("--main-colorNotebook", "white");
  root.style.setProperty("--main-colorNbtool", "rgb(128, 128, 128, 0.3)");
  root.style.setProperty("--main-colorNbicon", "rgba(0, 0, 0, 0.836)");
  root.style.setProperty("--main-colornbshow", "rgba(255, 255, 255, 0.6)");
  document.getElementById("range").checked = false;
  //保存配置
  window.localStorage.setItem(setupData[9], "day");
}
//夜晚
function night() {
  let root = document.documentElement;
  let color = "rgb(12,12,12,0.85)";
  root.style.setProperty("--main-color", color);
  root.style.setProperty("--main-colorHover", color);
  root.style.setProperty("--main-colorUl", color);
  root.style.setProperty("--main-colorUlHover", color);
  root.style.setProperty("--main-colorApp", color);
  root.style.setProperty("--main-colorAdd", color);
  root.style.setProperty("--main-colorSetup", color);
  root.style.setProperty("--main-colorSearchList", color);
  root.style.setProperty("--main-colorListHover", color);
  root.style.setProperty("--main-colorFont", "white");
  root.style.setProperty("--main-colorSelectHover", "black");
  root.style.setProperty("--main-colorNotebook", color);
  root.style.setProperty("--main-colorNbtool", color);
  root.style.setProperty("--main-colorNbicon", color);
  root.style.setProperty("--main-colornbshow", color);
  document.getElementById("range").checked = true;
  //保存配置
  window.localStorage.setItem(setupData[9], "night");
}

//备忘录
function notebook() {
  document.body.classList.toggle("active-notebook");
}
function noteBookClose() {
  document.body.classList.toggle("active-notebook");
}
function noteBooShowkClose() {
  document.body.classList.toggle("active-noteBookShow");
  window.localStorage.removeItem("notebookshow");
}
//备忘录保存
function noteBookSave() {
  let txt = document.getElementById("noteBookTxt");
  let show = document.getElementById("noteBookShowSpan");
  show.innerHTML = txt.value;
  window.localStorage.setItem("notebook", txt.value);
}
//备忘录图钉
function noteBookShow() {
  let txt = document.getElementById("noteBookTxt");
  let show = document.getElementById("noteBookShowSpan");
  document.body.classList.toggle("active-noteBookShow");
  show.innerHTML = txt.value;
  if (window.localStorage.getItem("notebookshow") === "1") {
    window.localStorage.removeItem("notebookshow");
  } else {
    window.localStorage.setItem("notebookshow", "1");
  }
}
// 备忘录删除
function noteBookDel() {
  let txt = document.getElementById("noteBookTxt");
  txt.value = "";
  let show = document.getElementById("noteBookShowSpan");
  show.innerHTML = txt.value;
  window.localStorage.removeItem("notebook");
  window.localStorage.removeItem("notebookshow");
}

//番茄钟
function fanqie() {
  document.body.classList.toggle("active-fanqie");
  fanqieON = 1;
  fanqieDaojishi();
  let date = new Date();
  let day = date.getDate();
  let fanqieDay = window.localStorage.getItem("fanqieDay");
  if (day == fanqieDay) {
  } else {
    window.localStorage.setItem("fanqieDaySum", 0);
  }
  window.localStorage.setItem("fanqieDay", day);
  document.getElementById("fanqieDaySum").innerHTML =
    window.localStorage.getItem("fanqieDaySum");
}
function fanqieClose() {
  document.body.classList.toggle("active-fanqie");
  fanqieON = 0;
}
function fanqieShowkClose() {
  document.body.classList.toggle("active-fanqieShow");
  window.localStorage.removeItem("fanqieshow");
}
//番茄钟开始
function fanqieStart() {
  fanqieON = 1;
  fanqieSave();
  fanqieDaojishi();
  //开始计时是否激活
  document.getElementById("fanqieStart").disabled = true;
  document.getElementById("fanqieName").disabled = true;
}
//番茄钟保存结束时间戳
function fanqieSave() {
  let fanqieTime = document.getElementById("fanqieTime");
  let fanqieEndTime =
    parseInt(Date.parse(new Date()), 10) +
    parseInt(fanqieTime.value, 10) * 1000;
  // parseInt(fanqieTime.value, 10) * 1000 * 60;
  window.localStorage.setItem("fanqieEndTime", fanqieEndTime);
}
//番茄钟取消
function fanqieOff() {
  fanqieON = 0;
  window.localStorage.removeItem("fanqieEndTime");
  document.getElementById("fanqieStart").disabled = false;
  document.getElementById("fanqieName").disabled = false;
  let daojishi = document.getElementById("fanqieDaojishi");
  daojishi.innerHTML = "";
}

//番茄倒计时
function fanqieDaojishi() {
  let endTime = window.localStorage.getItem("fanqieEndTime");
  endTime = parseInt(endTime, 10);
  let times = setInterval(function () {
    let daojishi = document.getElementById("fanqieDaojishi");
    let nowTime = Date.parse(new Date());
    let time = endTime - nowTime; //剩余时间
    var minutes = Math.floor(time / 1000 / 60);
    var seconds = Math.floor((time / 1000) % 60);
    if (endTime) {
      if (time >= 0 && fanqieON == 1) {
        daojishi.innerHTML = minutes + ":" + seconds;
      } else if (time < 0) {
        fanqieON = 0;
        clearInterval(times);
        //加一个番茄
        //如果不存在名称就新增数据，保存。如果存在就数字+1
        let fanqieName = document.getElementById("fanqieName");
        fanqieName = fanqieName.value;
        let newData = { name: fanqieName, value: 1 };
        let arr = JSON.parse(window.localStorage.getItem("fanqieData"));
        let daySum = parseInt(window.localStorage.getItem("fanqieDaySum"));
        if (arr === null) {
          //数据为空
          let b = [newData];
          window.localStorage.setItem("fanqieData", JSON.stringify(b));
          window.localStorage.setItem("fanqieDaySum", daySum + 1);
          document.getElementById("fanqieDaySum").innerHTML =
            window.localStorage.getItem("fanqieDaySum");
        } else {
          let index = search(fanqieName, arr);
          if (index == -1) {
            //数据不为空，但是name为新增
            arr.push(newData);
            window.localStorage.setItem("fanqieData", JSON.stringify(arr));
            window.localStorage.setItem("fanqieDaySum", daySum + 1);
            document.getElementById("fanqieDaySum").innerHTML =
              window.localStorage.getItem("fanqieDaySum");
          } else {
            //找到相同的name，数量+1
            arr[index].value += 1;
            window.localStorage.setItem("fanqieData", JSON.stringify(arr));
            window.localStorage.setItem("fanqieDaySum", daySum + 1);
            document.getElementById("fanqieDaySum").innerHTML =
              window.localStorage.getItem("fanqieDaySum");
          }
        }
        window.localStorage.removeItem("fanqieEndTime");
        document.getElementById("fanqieStart").disabled = false;
        document.getElementById("fanqieName").disabled = false;
      } else if (fanqieON == 0) {
        clearInterval(times);
      }
    } else {
      fanqieON = 0;
      clearInterval(times);
    }
  }, 1000);
}
//查数组函数
function search(key, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].name == key) {
      return i;
    }
  }
  return -1;
}
//番茄钟图表

function fanqieEcharts() {
  document.body.classList.toggle("active-fanqieEcharts");

  var chartDom = document.getElementById("main");
  var myChart = echarts.init(chartDom);
  var option;
  let arr = JSON.parse(window.localStorage.getItem("fanqieData"));

  option = {
    title: {
      text: "番茄钟统计",
      subtext: "单位:1个番茄",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "图表",
        type: "pie",
        radius: "50%",
        data: arr,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  option && myChart.setOption(option);
}
function fanqieEchartsClose() {
  document.body.classList.toggle("active-fanqieEcharts");
}
//番茄钟图钉
function fanqieShow() {
  let txt = document.getElementById("fanqieTxt");
  let show = document.getElementById("fanqieShowSpan");
  document.body.classList.toggle("active-fanqieShow");
  show.innerHTML = txt.value;
  if (window.localStorage.getItem("fanqieshow") === "1") {
    window.localStorage.removeItem("fanqieshow");
  } else {
    window.localStorage.setItem("fanqieshow", "1");
  }
}
// 番茄钟删除
function fanqieDel() {
  let txt = document.getElementById("fanqieTxt");
  txt.value = "";
  let show = document.getElementById("fanqieShowSpan");
  show.innerHTML = txt.value;
  window.localStorage.removeItem("fanqie");
  window.localStorage.removeItem("fanqieshow");
}

//关于网站
function about() {
  document.body.classList.toggle("active-about");
}
function aboutClose() {
  document.body.classList.toggle("active-about");
}
