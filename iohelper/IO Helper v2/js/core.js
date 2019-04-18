/*
// IO HELPER INC! COPYRIGHT © SIZREX
*/

chrome.runtime.sendMessage("load", function(response) {
   applyCode(response.status);
});
function applyCode(status)
{
	if(status == 1) {
        var jquery = document.createElement("script");
        jquery.src = chrome.extension.getURL('../js/jquery-3.1.1.min.js');
        jquery.onload = function() {
            this.remove();
        };
        var socket = document.createElement("script");
        socket.src = chrome.extension.getURL('../js/socket.io.min.js');
        socket.onload = function() {
            this.remove();
        };
        var sweetalert = document.createElement("script");
        sweetalert.src = "https://unpkg.com/sweetalert/dist/sweetalert.min.js"
        sweetalert.onload = function() {
            this.remove();
        };
        var script = document.createElement("script");
        script.src = chrome.extension.getURL('../js/iohelper.js');
        script.onload = function() {
            this.remove();
        };
        setTimeout(function() {
            if(window.location.origin == "http://gaver.io" || window.location.origin == "http://cellcraft.io" || window.location.origin == "http://qwoks.ga") {
            } else {
                (document.head || document.documentElement).appendChild(jquery);
            }
            setTimeout(function() {
                $.get(chrome.extension.getURL('menu.html'), function(data) {
                    $(data).appendTo('body');
                });
                var i = 0;
                var progress = setInterval(function() {
                    i++;
                    $("#progress_loading").html('<div id="minions-bar-bots" style="width:' + i +'%"> </div>');
                    if(i == 100) return clearInterval(progress);
                },100);
                setTimeout(function() {
                    $("#load_status").text("Loading jQuery succesfull!");
                    setTimeout(function() {
                        (document.head || document.documentElement).appendChild(sweetalert);
                        $("#load_status").text("Loading SweetAlert succesfull!");
                        setTimeout(function() {
                            (document.head || document.documentElement).appendChild(socket);
                            $("#load_status").text("Loading Socket.io succesfull!");
                            setTimeout(function() {
                                (document.head || document.documentElement).appendChild(script);
                                $("#load_status").text("Loading IO_Client.js succesfull!");
                                console.log("%c IO HELPER INC! COPYRIGHT © SIZREX", "background-color: rgb(39, 46, 58); color: white;");
                                if(window.location.origin == "http://agar.bio") {
                                    $.get(chrome.extension.getURL('minimap.html'), function(data) {
                                        $(data).appendTo('body');
                                    });
                                }
                                setTimeout(function() {
                                    $("#loading").animate({
                                        opacity: "toggle"
                                    }, "slow");
                                },1000);
                            },2500);
                        },2500);
                    },2500);
                },2500);
            },10);
        },10);
	}
}