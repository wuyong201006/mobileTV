/**
 * Created by testt on 2015/11/10.
 */
const AFFECTIONAL = "����";
const ACTION = "����";
const COMEDY = "ϲ��";
const ADVENTURE = "ð��";
const DRACULA = "�ֲ�";
const SUSPENSE = "����";
const CARTOON = "����"
const FRIGHTENED = "���";
const SCIENCE = "�ƻ�";
const PREVUE = "Ԥ��";
const FEATURE = "����";
const WAR = "ս��";

var $preBtn = $("#preBtn");
var $nextBtn = $("nextBtn");
$preBtn.click(function(){});
$nextBtn.click(function(){});

var $list = [];
var $newlist = [];//���µ�Ӱ
var $hotlist = [];//���ȵ�Ӱ
var $futurelist = [];//������ӳ

var affectionalList = [];//����Ƭ
var actionList = [];//����Ƭ
var comedyList = []//ϲ��Ƭ
var adventureList = [];//ð��
var draculaList = []//�ֲ�Ƭ
var suspenseList = []//����Ƭ
var cartoonList = [];//����Ƭ

var featureList = [];//����Ƭ
var warList = [];//ս��Ƭ
var scienceList = [];//�ƻ�Ƭ
var prevueList = []//Ԥ��Ƭ

function loadConfig()
{
    $.getJSON("config/out.json", function(data){
        $list = data;
        for(var i=0;i<$list.length;i++)
        {
            calssifyFilm($list[i]);
        }
    })
}

function calssifyFilm(data)
{
    if(data.resInfo === undefined || data.resInfo.tag === undefined)
        return;

    var tag=data.resInfo.tag;
    var year = data.resInfo.year;
    if(year != undefined && year == 2015)
    {
        $newlist.push(data);
    }

    if(tag.indexOf(AFFECTIONAL) > 0)
    {
        affectionalList.push(data);
        $hotlist.push(data);
        return;
    }
    if(tag.indexOf(ACTION) > 0)
    {
        actionList.push(data);
        return;
    }
    if(tag.indexOf(COMEDY) > 0)
    {
        comedyList.push(data);
        return;
    }
    if(tag.indexOf(ADVENTURE) > 0)
    {
        adventureList.push(data);
        return;
    }
    if(tag.indexOf(DRACULA) > 0 || tag.indexOf(FRIGHTENED))
    {
        draculaList.push(data);
        return;
    }
    if(tag.indexOf(SUSPENSE) > 0)
    {
        suspenseList.push(data);
        return;
    }
    if(tag.indexOf(CARTOON) > 0)
    {
        cartoonList.push(data);
        return;
    }
    if(tag.indexOf(SCIENCE) > 0)
    {
        scienceList.push(data);
        return;
    }
    if(tag.indexOf(PREVUE) > 0)
    {
        prevueList.push(data);
        $futurelist.push(data)
        return;
    }
    if(tag.indexOf(WAR) > 0)
    {
        warList.push(data);
        return;
    }

    if(tag.indexOf(FEATURE) > 0)
    {
        featureList.push(data);
        return;
    }
}

