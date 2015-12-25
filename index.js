var main = document.querySelector("#main");
var oLis = document.querySelectorAll(".slide>li");
var oLis2 = document.querySelectorAll(".a2ul>li");
var oPs = document.querySelectorAll(".a2ul>p");


var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var desW = 640;
var desH = 960;
//缩放页面适配各个移动设备
main.style.webkitTransform = "scale(" + winH / desH + ")";
[].forEach.call(oLis, function () {
    arguments[0].index = arguments[1];
    arguments[0].addEventListener("touchstart", start, false);
    arguments[0].addEventListener('touchmove', move, false);
    arguments[0].addEventListener('touchend', end, false);
});
[].forEach.call(oLis2,function(){
    var index = arguments[1];
    arguments[0].addEventListener('click',function(){

        show(index);
    },false);
});

oLis[0].id="a1";

function show(index){
    this.flag=false;

    [].forEach.call(oPs,function(){
        if(arguments[1]!=index){
            oPs[arguments[1]].className="pp2";
        }else{
            var className = oPs[index].className;
            if(className=="pp"){
                oPs[index].className="pp2";
            }else{
                oPs[index].className="pp";
            }

        }

    });

}

function start(e) {
    oLis[0].id="";
    this.start = e.changedTouches[0].pageY;
}
function move(e) {
    e.preventDefault();
    this.flag = true;
    var moveTouch = e.changedTouches[0].pageY;
    var changePos = moveTouch - this.start;
    var cur = this.index;
    var step = 1/2;

    [].forEach.call(oLis,function(){
        if(arguments[1]!=cur){
            arguments[0].style.display="none";
        }
        arguments[0].className = "";
        arguments[0].firstElementChild.id="";
        oPs[arguments[1]].className="";
    })
    if (changePos > 0) {/*往下滑*/
        var pos = -winH+changePos;
        this.prevSIndex = cur == 0 ? oLis.length - 1 : cur - 1;

    } else if (changePos < 0) {/*往上滑*/
        this.prevSIndex = cur == oLis.length - 1 ? 0 : cur + 1;
        var pos =winH+changePos;

    }
    oLis[this.prevSIndex].style.webkitTransform = "translate(0,"+pos+"px)";
    oLis[this.prevSIndex].className = 'zIndex';
    oLis[this.prevSIndex].style.display ="block";
    oLis[cur].style.webkitTransform ="scale("+(1-Math.abs(changePos)/winH*step)+") translate(0,"+changePos+"px)";
}
function end(e) {
    if(this.flag){
        oLis[this.prevSIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevSIndex].style.webkitTransition = "0.5s";
        oLis[this.prevSIndex].addEventListener("webkitTransitionEnd",function(){
            this.style.webkitTransition = "";
            this.firstElementChild.id="a"+(this.index+1);
        },false)
    }

}



