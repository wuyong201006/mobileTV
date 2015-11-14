/**
 * Created by testt on 2015/11/10.
 */

//电影分类
const AFFECTIONAL = "爱情";
const ACTION = "动作";
const COMEDY = "喜剧";
const ADVENTURE = "冒险";
const DRACULA = "恐怖";
const SUSPENSE = "悬疑";
const CARTOON = "动画"
const FRIGHTENED = "惊悚";
const SCIENCE = "科幻";
const FEATURE = "剧情";
const WAR = "战争";

const PREVUE = "特辑";

const PATH = "";
const STARURL = PATH+"images/star.png";

var NEWRESLENGTH = 5;
var HOTRESLENGTH = 3;
var FUTURERESLENGTH = 3;
//电影一排长度
if(IsPhone){
    NEWRESLENGTH = 5;
    HOTRESLENGTH = 3;
    FUTURERESLENGTH = 3;
}else{
    NEWRESLENGTH = 8;
    HOTRESLENGTH = 3;
    FUTURERESLENGTH = 6;
}

const MOREFILMLENGTH = 6

var filmlist = [];
var headlist = [];//滚动展示
var newlist = [];//最新电影
var hotlist = [];//最热电影
var futurelist = [];//即将上映
var affectionalList = [];//爱情片
var actionList = [];//动作片
var comedyList = [];//喜剧片
var adventureList = [];//冒险
var draculaList = [];//恐怖片
var suspenseList = [];//悬疑片
var cartoonList = [];//动画片

var featureList = [];//剧情片
var warList = [];//战争片
var scienceList = [];//科幻片

var $myCarousel = $("#myCarousel");
var $preBtn = $("#preBtn");
var $nextBtn = $("nextBtn");

var $banner = $("#banner");
var $bannerTitle = $("#bannerTitle");
var $bannerDetail = $("#bannerDetail");
var $bannerActor = $("#bannerActor");
var $bannerStar = $("#bannerStar");
var $bannerPraise = $("#bannerPraise");
var $bannerBrief = $("#bannerBrief");

var $newLeftBg = $("#leftBox").children("div").eq(0).find("img");
var $newTitle = $("#newTitle");
var $newDetail = $("#newDetail");
var $newStarLevel = $("#newStarLevel");
var $newPraise = $("#newPraise");

var $newBox = $("#newBox");
var $newBox2 = $("#newBox2");
var $hotBox = $("#hotBox");
var $futureBox = $("#futureBox");
var $calssifyBox = $("#calssifyBox");

var $newMoreBox = $("#newMoreBox");
var $hotMoreBox = $("#hotMoreBox");
var $futureMoreBox = $("#futureMoreBox");

var $newBtn = $("#newBtn");
var $hotBtn = $("#hotBtn");
var $futureBtn = $("#futureBtn");

var $calssifyTabNav = $("#calssifyTabNav");

var newResList = [];
var hotResList = [];
var futureResList = [];
var calssifyResList = [];

function init() {
    initElement();
    addEvent();
    loadConfig();
}

function addEvent() {
    //$preBtn.click(function (e) {
    //});
    //$nextBtn.click(function (e) {
    //});

    $newBtn.click(clickMoreBtn);
    $hotBtn.click(clickMoreBtn);
    $futureBtn.click(clickMoreBtn);

    var ress = $calssifyTabNav.children("li");
    for(var i=0;i<ress.length;i++)
    {
        var re = ress.eq(i);
        re.click(function(data){
            clickCalssify($(this))
        })
    }

    $myCarousel.on('slide.bs.carousel', function(e){
        var res = $(e.relatedTarget);
        headSwitch(res.data("data"));
    })
}

function clickCalssify($re)
{
    if(IsPhone){
        $calssifyTabNav.find(".cur").removeClass("cur");
        $($re).addClass("cur");
    }else{
        $calssifyTabNav.find(".bg").removeClass("bg");
        $($re).addClass("bg");
    }


    $calssifyBox.html("");
    var index = $("#calssifyTabNav li").index($re);
    moreRefres(getListByIndex(index), $calssifyBox, getNameByIndex(index));
}

function getListByIndex(index)
{
    switch(index)
    {
        case 0:
            return affectionalList;
        case 1:
            return actionList;
        case 2:
            return comedyList;
        case 3:
            return adventureList;
        case 4:
            return draculaList;
        case 5:
            return suspenseList;
        case 6:
            return cartoonList;
    }
}

function getNameByIndex(index)
{
    switch(index)
    {
        case 0:
            return "affectional";
        case 1:
            return "action";
        case 2:
            return "comedy";
        case 3:
            return "adventure";
        case 4:
            return "dracula";
        case 5:
            return "suspense";
        case 6:
            return "cartoon";
    }
}

function initElement() {

    addElementToList($newBox, newResList);
    addElementToList($hotBox, hotResList);
    addElementToList($futureBox, futureResList);
    addElementToList($calssifyBox, calssifyResList);

    addElementToList($newBox2, newResList);
}

var IsNewVisible = false;
var IsHotVisible = false;
var IsFutureVisible = false;

function clickMoreBtn(data) {
    if(!IsConfigComplete)return;

    var tarString = data.target.id;
    switch (tarString) {
        case "newBtn":
            visibleMore(IsNewVisible, $newMoreBox, newlist, NEWRESLENGTH, "newMore");
            return false;
        case "hotBtn":
            visibleMore(IsHotVisible, $hotMoreBox, hotlist, HOTRESLENGTH, "hotMore");
            return false;
        case "futureBtn":
            visibleMore(IsFutureVisible, $futureMoreBox, futurelist, FUTURERESLENGTH, "future");
            return false;
    }
}

function visibleMore(IsVisible, resBox, dataList, dataLen, name) {
    if (IsVisible)return;

    IsVisible = true;

    //if (resBox.find("ul") != undefined)
    //    resBox.style.display = "block";
    //else {
        moreRefres(getDesignatedArray(dataList, 0, dataLen), resBox, name);
    //}
}

//获取指定数组
function getDesignatedArray(list, len, startIndex) {
    if (len > 0) {
        return list.length >= len ? list.slice(0, len) : list;
    }
    else {
        return list.length >= startIndex ? list.slice(startIndex, list.length - startIndex) : null;
    }
}

function initRefres() {

    bannerRefres();
    if(headlist.length > 0)
        headSwitch(headlist[0]);

    newRefresLeft();

    filmRefres(newResList, getDesignatedArray(newlist, NEWRESLENGTH));
    filmRefres(hotResList, getDesignatedArray(hotlist, HOTRESLENGTH));
    filmRefres(futureResList, getDesignatedArray(futurelist, FUTURERESLENGTH));
    filmRefres(calssifyResList, getDesignatedArray(affectionalList, affectionalList.length));
}

function addElementToList($res, resList) {
    if($res === undefined || resList === undefined)
        return;
    var $ress;
    if(IsPhone){
        $ress = $res.children("ul").eq(0).children("li");
    }else{
        $ress = $res.children("div").eq(0).children("ul").eq(0).children("li");
    }

    for (var i = 0; i < $ress.length; i++) {
        resList.push($ress.eq(i).children("div").eq(0));
    }
}

var IsConfigComplete = false;
function loadConfig() {
    $.getJSON(PATH+"config/out.json", function (data) {
        filmlist = data;
        for (var i = 0; i < filmlist.length; i++) {
            calssifyFilm(filmlist[i]);
        }

        printf();
        initRefres();
        IsConfigComplete = true;
    });
}

function printf()
{
    for(var i=0;i<affectionalList.length;i++)
    {
        var data = affectionalList[i];
        console.info(data.resInfo.title+"\n");
        console.info(data.resFileList[0].resFileInfo.localFileName+"\n");
        console.info(data.resInfo.remoteImgNormal);
    }
}

function validate(data)
{
    if(data.resFileList === undefined
        || data.resFileList.length <= 0
        || data.resFileList[0].resFileInfo === undefined
        || data.resFileList[0].resFileInfo.localFileName === undefined){
        return "";
    }

    var url = data.resFileList[0].resFileInfo.localFileName;
    url = url.split(".")[0]+".mp4";
    return url;
}
function filmPlay(data) {
    console.info(data.resFileList[0].resFileInfo.localFileName);
    var url = "video/prevue/ChQoM1XMeoeALpBDCcjwAGRau3U8450.mp4";
    if(IsPhone){
        location.href = "player/mobilePlayer.html?url="+validate(data);
            //validate(data);
    }else{
        location.href = "player/player.html?url="+validate(data);
            //validate(data);
    }
}

var dataObject = {};
function moreRefres(list, parent, name) {
    if (list == null || parent == null)return;
    dataObject.name = list;
    var box;
    if(IsPhone){
        box = '<ul class="movies-list">';
    }else{
        box = '<div class="list"><ul class="show">';
    }
    for (var i = 0; i < list.length; i++) {
        var data = list[i];
        if (data.resInfo === undefined || data.resInfo.remoteImgSmall === undefined)
            continue;
        var idString = i+","+name;
        if(IsPhone){
            box += '<li><div class="item" onclick="function(e){filmPlay(dataObject[filmMore($(this).attr("id")])}"><a href="">' +
                '<div class="pic"><img src="'+PATH+data.resInfo.remoteImgSmall+'"/><div class="pic-rating">' +
                '<span class="rating">"'+getStarLevel()+'"</span><span class="bg"></span></div></div><div class="info">' +
                '<h3 class="title">"'+data.resInfo.title+'"</h3><p>"'+getDetail(data)+'"</p> </div></a></div></li>';
        }else {
            box += '<li><div class="item"  onclick="function(e){filmPlay(dataObject[filmMore($(this).attr("id")])}">' +
                '<a href=""><img src="' + PATH + data.resInfo.remoteImgSmall + '"/><div class="mark">"'+getStarLevel()+'"</div></a>' +
                '<div class="info"><h4>"' + data.resInfo.title + '"</h4><h6>"' + getDetail(data) + '"</h6></div></div></li>';
        }
    }

    if(IsPhone){
        box += '</ul>'
    }else{
        box += "</ul></div>"
    }

    parent.html(box);
}

function filmMore(str)
{
    var ar = str.split(",");
    return ar[1][ar[0]];
}

//清除显示
function removeResList(resList) {
    for (var i = 0; i < resList.length; i++) {
        var res = resList[i];
        res[0].style.display = 'none';
    }
}

//显示
function addResList(resList) {
    for (var i = 0; i < resList.length; i++) {
        var res = resList[i];
        res[0].style.display = 'block';
    }
}

//刷新滚动
function bannerRefres() {
    var ress = $banner.children("div");
    for(var i=0;i<ress.length;i++)
    {
        var res = ress.eq(i);
        var data = headlist[i];
        res.data("data", data);
        if(res === undefined || data.resInfo === undefined || data.resInfo.remoteImgNormal === undefined)
            return;
        //res.find("img").attr("src", PATH+data.resInfo.remoteImgNormal);

        res.click(function(e){
            filmPlay($(this).data("data"));
        })
    }
}

function headSwitch(data)
{
    if(data === undefined || data.resInfo === undefined)
        return;

    $bannerTitle.html(data.resInfo.title);
    $bannerDetail.html(data.resInfo.description);
    $bannerActor.html(data.resInfo.actor);
    filmStar($bannerStar, getStarLevel());
    $bannerPraise.html(getPraise());
    $bannerBrief.html(getDetail(data));
}

//最新上映左边刷新
function newRefresLeft() {

    $newPraise.html(getPraise());
    filmStar($newStarLevel, getStarLevel())

    var data = newlist.shift();
    if (data == null || data.resInfo === undefined || data.resInfo.remoteImgNormal === undefined)
        return;
    $newLeftBg.attr("src", PATH+data.resInfo.remoteImgNormal);
    $newTitle.html(data.resInfo.title);
    $newDetail.html(getDetail(data));
}

//电影刷新
function filmRefres(resList, dataList) {
    if(resList === undefined || dataList === undefined)
        return;
    for (var i = 0; i < resList.length; i++) {
        if (i >= dataList.length)break;
        var res = resList[i];
        var data = dataList[i];
        if (data.resInfo === undefined || data.resInfo.remoteImgSmall === undefined)
            continue;
        res.data("data", data);
        res.find("img").attr("src", PATH+data.resInfo.remoteImgSmall);
        res.find("a").attr("href", "player.html?url="+validate(data));
        if(IsPhone){
            res.find("h3").html(data.resInfo.title);
            res.find("p").html(getDetail(data));
            res.find(".rating").text(getStarLevel()*2);

        }else{

            res.find("h4").html(data.resInfo.title);
            res.find("h6").html(getDetail(data));
            res.find(".mark").text(getStarLevel()*2);
        }


        res.click(function (e) {
            filmPlay($(this).data("data"));
        });
    }
}

function getDetail(data)
{
    var des = data.resInfo.description;
    if(des.length > 15) {
        des = des.slice(0, 15)+"...";
    }

    return des;
}

function getPraise()
{
    return parseInt(Math.random()*30000+20000);
}

function getStarLevel()
{
    return (Math.random()*3+2).toFixed(1);
}

function filmStar(res, level)
{

    len = parseInt(level);
    var html = "";
    for(var i=0;i<level;i++){
        html += '<img width=39 height=37 src="'+STARURL+'">';
    }

    html += '<span>  "'+level*2+'"</span>';
    res.html(html);
}

//电影分类
function calssifyFilm(data) {
    if (data.resInfo === undefined || data.resInfo.tag === undefined)
        return;

    var tag = data.resInfo.tag;
    var year = data.resInfo.year;
    if (year != undefined && year == "2015") {
        newlist.push(data);
    }

    if(tag.indexOf(PREVUE) > 0){
        futurelist.push(data);
        headlist.push(data);
    }

    if (tag.indexOf(AFFECTIONAL) > 0) {
        affectionalList.push(data);
        hotlist.push(data);
        //headlist.push(data);
        return;
    }
    if (tag.indexOf(ACTION) > 0) {
        actionList.push(data);
        return;
    }
    if (tag.indexOf(COMEDY) > 0) {
        comedyList.push(data);
        return;
    }
    if (tag.indexOf(ADVENTURE) > 0) {
        adventureList.push(data);
        return;
    }
    if (tag.indexOf(DRACULA) > 0 || tag.indexOf(FRIGHTENED)) {
        draculaList.push(data);
        return;
    }
    if (tag.indexOf(SUSPENSE) > 0) {
        suspenseList.push(data);
        return;
    }
    if (tag.indexOf(CARTOON) > 0) {
        cartoonList.push(data);
        return;
    }
    if (tag.indexOf(SCIENCE) > 0) {
        scienceList.push(data);
        return;
    }

    if (tag.indexOf(WAR) > 0) {
        warList.push(data);
        return;
    }

    if (tag.indexOf(FEATURE) > 0) {
        featureList.push(data);
        return;
    }
}

