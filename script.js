function startup(){
    document.getElementById("footer").innerHTML = "Page last modified on " + document.lastModified;
    populateLinks();
    updateClock();
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

function populateLinks(){
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
    var linkElements = document.getElementsByTagName("td");
    for (var i = 0; i < 8; i++){
        linkName = links[i].getElementsByTagName("name")[0].nodeValue;
        linkURL = links[i].getElementsByTagName("url")[0].nodeValue;
        linkElements[i].innerHTML =
            "<a href=" + linkURL + ">" +
                "<div class='quicklink'>" +
                "</div>" +
            "</a>";
        linkElements[i].style.backgroundImage= "url(images/" + linkName + ".png)";
        linkElements[i].style.backgroundSize = "100% 100%";
    }
}
