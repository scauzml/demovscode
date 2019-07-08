/**
 * 每个函数都都是特定的对象，接收的函数都保留在arguments数组中
 */
function test(){
    console.log("hello "+arguments[0],arguments[1])
}
test("name","i love you");

// 一行定义多个变量
var message="hi",found=false,age=29;

//RegExp对象
var pattern= new RegExp("[bc]a","i");
var sum = function(sum1,sum2){
    return sum1+sum2;
};
function callSomeFunction(sumddd,sum3,sum4){
    return sumddd(sum3,sum4);
}
console.log(callSomeFunction(sum,10,10));

//解除紧密耦合的现象，把对象赋给其他都可以调用
function factorial(num){
    if(num<=1){
        return 1;
    }else{
        return num * arguments.callee(num-1);
    }
}
var changeNameOfFactorial=factorial;
window.color="red";
var o={color:"blue"};
function sayColor(){
    console.log(this.color)
}
sayColor();
sayColor.call(this);//red 调用全局变量window
sayColor.call(o);//blue this指向了o对象
//uri的编码，与解码
var uri="http://www.bai.du.com? dd=name  gg";
console.log(encodeURI(uri));
console.log(encodeURIComponent(uri));

//求得数组最大，最小值，使用Math对象，内置
var values=[1,2,3,4,5];
var max=Math.max.apply(Math,values);
var min = Math.min.apply(Math,values);
console.log(max+" "+ min);
/**
 * 对象创建的各种模式，与利弊，继承
 * @param {*} name 
 * @param {*} age 
 * @param {*} job 
 */

//动态原型创建对象
function Person(name,age,job){
    this.name=name;
    this.age=age;
    this.job=job;
    this.friends=["a","b"];
    //方法，公用，添加到原型中,初次调用构造函数时，才会调用执行，后，对原型的修改能够立即反映到所有的实例
    if(typeof this.sayName != "function"){
        Person.prototype.sayName=function(){
           return this.name;
        }
        Person.prototype.sayAge=function(){
           return this.age;
        }
    }
}
var personone=new Person("hi1",10,"hi1");
var personone1=new Person("hi2",12,"hi2");
console.log("personone:"+personone.name);
console.log("personone1:"+personone1.name);
console.log("personone:"+personone.sayAge());
console.log("personone1:"+personone1.sayAge());

// function SuperType(){
//     this.property=true;
// }
// SuperType.prototype.getSuperValue=function(){
//     return this.property;
// }
// function SubType(){
//     this.subProperty=false;
// }
// //继承了SuperType
// SubType.prototype=new SuperType();
// SubType.prototype.getSubValue=function(){
//     return this.subProperty;
// }
// var instance=new SubType();
// console.log(instance.getSuperValue())

//借用构造函数
function SuperType(name){
    this.colors=["red"];
    this.name=name;
}

function SubType(){
    //继承了SuperType
    SuperType.call(this,"hello");
    //实例属性
    this.age=29;
}
var instance1=new SubType();
instance1.colors.push("black");
console.log(instance1.colors);
console.log(instance1.name);

var instance2=new SubType();
console.log(instance2.colors);

//组合式继承，原型链+构造函数
function SuperType1(){
    this.name=name;
    this.colors=['red','blue'];

}
SuperType1.prototype.sayName=function(){
    console.log(this.name);
}
function SubType1(name,age){
    //继承属性
    SuperType1.call(this,name);
    this.age=age;
}
//继承方法
SubType1.prototype=new SuperType1();
SubType1.prototype.constructor=SubType1;
SubType1.prototype.sayAge=function(){
    console.log(this.age);
}

var instance3=new SubType1("hi",20);
instance3.colors.push("black");
console.log(instance3.colors);
instance3.sayName();
instance3.sayAge();

var instance4=new SubType1("yes",230);
instance4.colors.push("blue");
console.log(instance4.colors);
instance4.sayName();
instance4.sayAge();

//寄生组合式继承 最理想的继承范式
//原型式继承
function object(o){
    function F(){}
    F.prototype=o;
    return new F();
}
//基本模式
function inheritPrototype(subType1,superType1){
    var prototype=object(superType1.prototype);//创建父对象的副本
    prototype.constructor=SubType1;//副本的构造函数指向子构造函数
    subType1.prototype=prototype;//指定子对象的原型为父对象的副本，实现继承父对象原型上的属性或者方法

}
function SuperTypey(name){
    this.name=name;
    this.colors=['red','blue'];

}
SuperTypey.prototype.sayName=function(){
    console.log(this.name);
}
function SubTypey(name,age){
    //继承属性
    SuperTypey.call(this,name);
    this.age=age;
} 
inheritPrototype(SubTypey,SuperTypey);
SubTypey.prototype.sayAge=function(){
    console.log(this.age);
}
var instancey=new SubTypey("ddd",333);
console.log(instancey.name);
//递归使用命名函数式表达式来
var digui=(function f(num){
    if(num<1){
        return 1;
    }else{
        return num*f(num-1);
    }
});
//私有变量
/**
 * 特权方法,getName,setName
 */
function Person1(name){
    this.getName=function(){
        return name;
    }
    this.setName=function(value){
        name=value;
    }

}
var personexp=new Person1("name1");
console.log(personexp.getName());

//模块模式，单例创建，感觉挺重要的
// var application=function(){

//     //私有变量和函数
//     var components=new Array();
//     //初始化
//     components.push(new BaseComponent());
//     //公共
//     return{
//         getComponentCount:function(){
//             return components.length;
//         },
//         registerComponent:function(conponent){
//             if(typeof component =="object"){
//                 components.push(component);
//             }
//         }
//     };
// }();

//增强模块模式，可以设定单例必须是某种类型的实例
// var application1=function(){

//     //私有变量和函数
//     var components=new Array();
//     //初始化
//     components.push(new BaseComponent());
//     //创建application的一个局部副本
//     var app =new BaseComponent();

//     //公共接口
    
//         app.getComponentCount=function(){
//             return components.length;
//         };
//         app.registerComponent=function(conponent){
//             if(typeof component =="object"){
//                 components.push(component);
//             }
//         };
//         //返回这个副本
//         return app;
    
// }();

//window对象
console.log(window.innerWidth);
console.log(window.innerHeight);

//navigator 对象，检测插件
function hasPlusgin(name){
    name=name.toLowerCase();
    for(var i=0;i<navigator.plugins.length;i++){
        if(navigator.plugins[i].name.toLowerCase().indexOf(name)>-1){
            return true;
        }
    }
    return false;
}

//检查Flash
console.log(hasPlusgin("Flash"));
/**
 * 客户端检测
 */

//document对象
var html=document.documentElement;//取得对<html>的引用
console.log(document.childNodes[0]);
var originalTitle=document.title;
console.log(originalTitle);
document.title="new page title";
var url=document.URL;
console.log(url);
var domain=document.domain;

//来源页页面的url
var referrer=document.referrer;
console.log(domain);
console.log(referrer);
var image=document.getElementsByTagName("img");
var myImage=image.namedItem("myImage");
var myImage1=image["myImage"];
console.log(myImage);
console.log(myImage1);

var div1 = document.getElementById("divdemo");
console.log(div1.className);
console.log(div1.id)
var div = document.createElement("div");
digui.id="myNewDiv";
div.className="box";
document.body.appendChild(div);
//Text 类型
// var element=document.createElement("div");
// element.className="message";
// var textNode=document.createTextNode("hello wold");
// element.appendChild(textNode);
// document.body.appendChild(element);
var arr=new Array(5);
arr[1]=1;
arr[5]=2;
console.log(arr.length);
//Comment类型 注释在DOM中使用这个类型来表现
/**
 * DOM操作技术
 */
//1.动态脚本 （1）插入外部文件，（2）直接插入JavaScprit
function loadScript(url){
    var script=document.createElement("script");
    script.type="text/javascript";
    script.src=url;
    document.body.appendChild(script);
}
loadScript("studyjs2.js");
//拼接script字符串
function loadScriptString(code){
    var script=document.createElement("script");
    script.type="text/javascript";
    try{
      script.appendChild(document.createTextNode(code));
    }catch(ex){
     script.text=code;
    }
    document.body.appendChild(script);
}

//操作表格
var table=document.createElement("table");
table.border=1;
table.width="100%";
//创建tbody
var tbody=document.createElement("tbody");
table.appendChild(tbody);
//创建第一行
var row1=document.createElement("tr");
tbody.appendChild(row1);
var cell_1=document.createElement("td");
cell_1.appendChild(document.createTextNode("Cell,1,1"));
row1.appendChild(cell_1);
var cell_2=document.createElement("td");
cell_2.appendChild(document.createTextNode("Cell2,1,1"));
row1.appendChild(cell_2);
//表格添加到文档主体中
document.body.appendChild(table);
//第11章
//1.querySelector()方法，返回模式匹配的第一个元素，没有返回null
var body=document.querySelector("body");
var body=document.querySelector(".class");
var body=document.querySelector("#ID");
//类为button的第一个图像元素
var img=document.body.querySelector("img.button");
//querySelectorAll()返回所有的元素
// var ems=document.getElementById("myDiv").querySelectorAll("em");
// var strong=document.querySelectorAll("p strong");
//matchesSelector(css选择符)判断调用元素与该选择符匹配，则返回true;否则，返回false;
if(document.body.webkitMatchesSelector("body.page1")){

}
//getElementsByClassName()方法，HTML5新增，返回一个或多个类名的所有元素的NodeList
//取得包含username 和 current的元素，类名的先后顺序无所谓
var allCurrentUsernames =document.getElementsByClassName("username current");

//html5操作类名的方式
//删除a类
div.classList.remove("a");
div.classList.add("a");
div.classList.toggle("user");

//3.2 焦点管理 document.activeElement属性引用的是DOM中当前获得焦点的元素
var button=document.getElementById("myButton");
// button.focus();
// console(document.activeElement===button);
//字符集属性
document.charset="UTF-8";
//html5添加的自定义属性，以data-开头
var datadiv=document.getElementById("myDiv");
//取得自定义属性的值
var appid=div.dataset.appid;
//设置值
div.dataset.appid=222;

//3.6插入标记
//innerHTML属性
var testdiv=document.createElement("div");
testdiv.innerHTML="hello world";
document.body.appendChild(testdiv);
var testdiv1=document.createElement("div");
testdiv1.innerHTML="hello &world,<b>\"reader\"!</b>";
document.body.appendChild(testdiv1);
//insertAdjacentHTML插入根据位置 297
//html5 控制滚动 scrollIntoView();
// childern 孩子属性
//判断节点是不是后代 contains()
//插入文本 innerText

/**
 * 第12章 dom2,dom3
 */
//dom2 确定浏览器是否支持dom2的css能力
var supportDOM2CSS=document.implementation.hasFeature("css","2.0");
var supportDOM2CSS2=document.implementation.hasFeature("css2","2.0");
console.log(supportDOM2CSS);
console.log(supportDOM2CSS2);
var changeCss=document.getElementById("changecss");
changeCss.style.backgroundColor="red";
changeCss.style.width="100px";
changeCss.style.height="200px";
//取得不同浏览器的样式表对象
function getStyleSheet(element){
    return element.sheet || element.styleSheet;
}

//取得第一个<link>元素引入的样式表
var link=document.getElementsByTagName("link")[0];
var sheet=getStyleSheet(link);
console.log(sheet);

//确定视口的大小
// function getViewport(){
//     //检查浏览器是否运行在混杂模式
//     if(document.compatMode== "BackCompat"){
//         return {
//             width:document.body.clientWidth;
//             height: document.body.clientHeight;
//         }
//     }else{
//         return{
//             width:document.documentElement.clientWidth;
//             height:document.documentElement.clientHeight;
//         }
//     }
// }

//NodeIterator 遍历
var div1=document.getElementById("div1");
//增加过滤器
// var filter=function(node){
//     return node.tagName.toLowerCase()=="li"?
//            NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP;
// }
var iterator=document.createNodeIterator(div1,NodeFilter.SHOW_ELEMENT,null,false);
var node =iterator.nextNode();//第一次访问是根节点
while(node!=null){
    console.log(node.tagName);
    node=iterator.nextNode();
}
//TreeWalker 比NodeIterator 更高级版本
var valker=document.createTreeWalker(div1,NodeFilter.SHOW_ELEMENT,null,false);
valker.firstChild();//转到p
valker.nextSibling();//转到第一个ul
var node =valker.firstChild();//第一个li
while(node!=null){
    console.log(node.tagName);
    node=valker.nextSibling();
};
//跨浏览器处理事件
var EventUtil={
    addHandler:function(element,type,handler){
        //Dom2
        if(element.addEventListener){
            element.addEventListener(type,handler,false);

        }else if(element.attachEvent){//ie
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type]=handler;
        }
    },
    removeHandler:function(element,type,handler){
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
            element.detachEvent("on"+type,handler);
        }else{
            element["on"+type]=null;
        }
    }
}
var btn=document.createElement("button");
btn.value="button";
var handler=function(){
    console.log("button");
}
EventUtil.addHandler(btn,"click",handler);

document.body.appendChild(btn);