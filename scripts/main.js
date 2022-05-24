let imgNum = 0;
let img = ["dog", "guang", "winter", "yun", "dao"];
function change() {
  let anNiu = document.getElementById("bgimg");
  imgNum = imgNum + 1;
  imgNum = imgNum % img.length;
  anNiu.src = "images/" + img[imgNum] + ".jpg";
}
