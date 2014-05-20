function startup(){
    document.getElementById("footer").innerHTML = "Page last modified on " + document.lastModified;
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

/*
function populateLinks(){
    var links = [
        ["Facebook", "https://facebook.com"],
        ["Gmail", "https://mail.google.com"],
        ["UMichEmail", "http://email.umich.edu"],
        ["Wikipedia", "https://en.wikipedia.org"],
        ["Google", "https://google.com"],
        ["ArchWiki", "https://wiki.archlinux.org"],
        ["Amazon", "https://amazon.com"],
        ["eBay", "http://ebay.com"]];
    var linkElements = document.getElementsByTagName("td");
    for (var i = 0; i < 8; i++){
        linkElements[i].innerHTML =
            "<a href=" + links[i][1] + ">" +
                "<div class='quicklink'>" +
               //     "<p>" + links[i][0] + "</p>" +
                "</div>" +
            "</a>";
        linkElements[i].style.backgroundImage= "url(images/" + links[i][0] + ".png)";
        linkElements[i].style.backgroundSize = "100% 100%";
        //linkElements[i].style.opacity = "0.5";
    }
}
*/
