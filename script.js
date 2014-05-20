function startup(){
    document.getElementById("footer").innerHTML = "Page last modified on " + document.lastModified;
    var linkChoices =[0, 1, 2, 3, 4, 5, 6, 7];
    populateLinks(document, linkChoices);
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

function populateLinks(doc, linkChoices){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'savedata.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send('array=' + linkChoices);
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
    var linkElements = doc.getElementsByTagName("td");
    for (var i = 0; i < 8; i++){
        linkName = links[linkChoices[i]].getElementsByTagName("name")[0].childNodes[0].nodeValue;
        console.log(linkName);
        linkURL = links[linkChoices[i]].getElementsByTagName("url")[0].childNodes[0].nodeValue;
        console.log(linkURL);
        linkElements[i].innerHTML =
            "<a href=" + linkURL + ">" +
                "<div class='quicklink transp'>" +
                    "<img src=\"images/" + linkName + ".png\" />" + 
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
    window.open('linkChanger.html', 'pop', 'scrollbars=no,width=200,height=300').focus();
}

function getXMLPage(){
    if (window.XMLHttpRequest){
        xmlhttp2=new XMLHttpRequest();
    }
    else{
        xmlhttp2 = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp2.open("GET","links.xml",false);
    xmlhttp2.send();
    console.log(xmlhttp2);
    xmlDoc2=xmlhttp2.responseXML;
    console.log(xmlDoc2);
    var linkChoice;
    linkChoice = xmlDoc2.getElementsByTagName("link");
    return linkChoice;
}

function addLinksToChanger(){
    var linkChoice;
    linkChoice = getXMLPage();
    console.log(linkChoice);
    //var linkForm = document.getElementsByTagName("form")[0];
    var innerHTMLtemp;
    innerHTMLtemp = "";
    for (var i = 0; i < linkChoice.length; i++) {
        var el = linkChoice[i];
        console.log(el);
        var tagelements;
        tagelements = el.getElementsByTagName("name");
        var name;
        name = el.getElementsByTagName("name")[0].childNodes[0].nodeValue;
        console.log(name);
        innerHTMLtemp = innerHTMLtemp + name + "<input style=\"float: right;\" name=\"Chk" + i + "\" type = \"checkbox\" id=\"Chk" + i + "\" value=\"" + name + "\"> <br>";
    } 
    document.getElementsByTagName("form")[0].innerHTML = innerHTMLtemp;
}

function applyLinkChanges(){
    var linkChoice = getXMLPage();
    console.log("applyingchanges");
    var val = [];
    var sum = 0;
    var loc = 0;
    for (i = 0; i < linkChoice.length; i++){
        console.log(sum);
        if (eval("links.Chk"+i+".checked")==true){
            val[loc++] = i;
            sum++;
        }
    }
    if (sum != 8){
        alert("Need 8 choices!");
    }
    else{
        populateLinks(window.opener.document, val);
    }
}