var linkElements = getLinks();
function startup(){
    document.getElementById("footer").innerHTML = "Page last modified on " + document.lastModified;
    var linkChoices;
    if (getCookie() != ""){
        linkChoices = stringToArray(getCookie());
    }
    else{
        linkChoice =[0, 1, 2, 3, 4, 5, 6, 7];
    }
    populateLinks(linkChoices);
    addLinksToChanger();
    updateClock();
    addStyle();
}

function updateClock(){
    var currentTime = new Date ();
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();
    var currentSeconds = currentTime.getSeconds();
    currentHours   + ( currentHours   < 10 ? "0" : "" ) + currentHours;
    currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
    currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
    var currentTimeString = "The time is " + currentHours + ":" + currentMinutes + ":" + currentSeconds;
    document.getElementById("clock").innerHTML = "<h6>" + currentTimeString + "</h6>";
}

function populateLinks(linkChoices){
    /*
    if (window.XMLHttpRequest){
        xmlhttp=new XMLHttpRequest();
    }
    else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET","links.xml",false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;
    var links = xmlDoc.getElementsByTagName("link"); 
    */
    var linkSpots = document.getElementsByTagName("td");
    for (var i = 0; i < 8; i++){
        //linkName = linkElements[linkChoices[i]].getElementsByTagName("name")[0].childNodes[0].nodeValue;
        console.log(linkElements);
        linkName = linkElements.links[linkChoices[i]].name;
        console.log(linkName);
        //linkURL = linkElements[linkChoices[i]].getElementsByTagName("url")[0].childNodes[0].nodeValue;
        linkURL = linkElements.links[linkChoices[i]].url;
        console.log(linkURL);
        linkSpots[i].innerHTML =
            "<a href=" + linkURL + ">" +
                "<div class='quicklink transp'>" +
                    "<img src=\"images/" + linkName + ".png\" title=\"" + linkName + "\"/>" + 
                "</div>" +
            "</a>";
        //linkElements[i].style.backgroundImage= "url(images/" + linkName + ".png)";
        //linkElements[i].style.backgroundSize = "100% 100%";
    }
}

function addStyle(){
    var stylesheet = document.createElement('link');
    stylesheet.href = 'style.css';
    stylesheet.rel = 'stylesheet';
    stylesheet.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(stylesheet);
}

function createLinkChanger(){
    //window.open('linkChanger.html', 'pop', 'width=200,height=280,toolbar=no,menubar=no,titlebar=no,scrollbars=no,status=no').focus();
    var el = document.getElementById('popup');
    /*
    if (window.event) {
        console.log("it's an event");
        x = window.event.clientX + document.documentElement.scrollLeft
        + document.body.scrollLeft;
        y = window.event.clientY + document.documentElement.scrollTop +
        + document.body.scrollTop;
    }
    */
    //else {
        x = event.clientX + window.scrollX;
        y = event.clientY + window.scrollY;
    //}
    x -= 140; y -= 300;
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.display = "block";
    el.style.opacity = "1";
}

function closeLinkChanger(){
    var el = document.getElementById('popup');
    el.style.display = "none";
}

function loadJSON(){
    if (window.XMLHttpRequest){
        xobj=new XMLHttpRequest();
    }
    else{
        xobj = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xobj.overrideMimeType("application/json");
    xobj.open("GET","links.json",false);
    xobj.send();
    if (xobj.status==200){
        return xobj.responseText;
    }
    /*
    else{
        return null;
    }
    */
    
    /*
    xobj.onreadystatechange = function (){
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    }
    */
}

function getLinks(){
    var json = loadJSON();
    return JSON.parse(json);
    /*
    xmlDoc2=xmlhttp2.responseXML;
    console.log(xmlDoc2);
    var linkChoice;
    linkChoice = xmlDoc2.getElementsByTagName("link");
    return linkChoice;
    */
}

function addLinksToChanger(){
    var linkChoice;
    linkChoice = linkElements;
    console.log(linkChoice);
    var innerHTMLtemp;
    innerHTMLtemp = "";
    var checkedLinks = stringToArray(getCookie());
    for (var i = 0; i < linkChoice.links.length; i++) {
        var name;
        //name = el.getElementsByTagName("name")[0].childNodes[0].nodeValue;
        name = linkChoice.links[i].name;
        console.log("name is " + name);
        innerHTMLtemp = innerHTMLtemp + "<div style=\"margin-top: " +
         ((i != 0) ? "-10px": "0px") + "; margin-bottom: -10px; background-color: " +
         ((i % 2) ? "#ffffff" : "#d9f8b0") + ";\">" + name +
        "<input style=\"float: right;\" name=\"Chk"
         + i + "\" type = \"checkbox\" id=\"Chk" + i +
          "\" value=\"" + name + "\" onclick=\"updateLinkCount()\" " +
           (checkedp(i, checkedLinks) ? "checked" : "") + "></div> <br>";
    } 
    console.log(innerHTMLtemp);
    document.getElementsByTagName("form")[0].innerHTML = innerHTMLtemp;
    updateLinkCount();
}

function updateLinkCount(){
    console.log("updatinglinkcount");
    console.log("applyingchanges");
    var val = [];
    var sum = 0;
    var loc = 0;
    for (i = 0; i < linkElements.links.length; i++){
        if (eval("links.Chk"+i+".checked")==true){
            val[loc++] = i;
            sum++;
        }
    }
    console.log(document);
    document.getElementById("linkcount").innerHTML = sum;
    applyLinkChanges();
}

function checkedp(num, vals){
    for (var i = 0; i < vals.length; i++){
        if (num == vals[i]){
            return true;
        }
    }
    return false;
}

function applyLinkChanges(){
    console.log("applyingchanges");
    var val = [];
    var sum = 0;
    var loc = 0;
    for (i = 0; i < linkElements.links.length; i++){
        console.log(sum);
        if (eval("links.Chk"+i+".checked")==true){
            val[loc++] = i;
            sum++;
        }
    }
    if (sum != 8){
        //alert("Need 8 choices!");
        return;
    }
    else{
        setCookie(val, 1000);
        populateLinks(val);
    }
}

function setCookie(values, exdays){
    var d =  new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString() + ";";
    document.cookie = "links=" + values + "; " + expires;
}

function getCookie(){
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++){
        var c = ca[i].trim();
        if (c.indexOf("links=")==0) return c.substring("links=".length, c.length);
    }
    return "";
}

function stringToArray(str){
    var nums = str.split(',');
    var array = [];
    for (var i = 0; i < nums.length; i++){
        array[i] = parseInt(nums[i]);
    }
    return array;
}