/*
// IO HELPER INC! COPYRIGHT © SIZREX
*/
$(document).ready(function() {
    window.onLoadScript = setTimeout(function() {
        window.bPackage = null;
        window._IOplayer = {
            x: 0,
            y: 0,
            cellX: 0,
            cellY: 0,
            ip: 0,
            offX: 0,
            offY: 0,
            minimapOffsetX: 0,
            minimapOffsetY: 0,
            origin: window.location.origin,
            MoveInt: null,
            startBots: false
        };

        function initGUI() {
            window.guiOPEN = true;

            if (!localStorage.getItem("menuScroll")) {
                localStorage.setItem("menuScroll", 1);
            } else {
                (localStorage.menuScroll == 0) ? $(".optionsCB").toggleClass("optionsCB-disabled"): null;
            }
            if (localStorage.guiRender != null) {
                window.guiRender = localStorage.guiRender;

                if (localStorage.guiRender == 3) {
                    $(".selectOptions").val("3");
                } else if (localStorage.guiRender == 2) {
                    $(".selectOption").val("2");
                } else {
                    $(".selectOption").val("1");
                }
            } else {
                localStorage.guiRender = 3;
                window.guiRender = 3;
            }
        }
        initGUI();
        var games = [
            "agar.red",
            "cellcraft.io",
            "agar.bio",
            "play.agario0.com",
            "agar.pro",
            "qwoks.ga",
            "gaver.io",
            "agario.info"
        ];

        function initGames() {
            for (var n = 0; n < games.length; n++) {
                var i = document.createElement("div");
                i.innerHTML = games[n];
                i.className = "serverIp";
                document.getElementById("serversBox").appendChild(i);
            }
        }
        initGames();
        var ws = {};
        window.testgui = document.getElementById("selector");

        function connectToIO_Helper() {
            ws = io.connect("127.0.0.1:5000");
            ws.on("loginAccept", function(data) {
                swal({
                    "title": "Login done!",
                    "text": "Redirecting to shop",
                    "icon": "success",
                    "button": "Ok"
                })
                $(".form").animate({
                    height: "toggle",
                    opacity: "toggle"
                }, "slow");
                $("#descbots").text(`${data.datr.maxbots} bots`);
                $("#desctime").text(`${(data.datr.time / 86400 >> 0) +":"+ (data.datr.time / 3600 % 24 >> 0) +":"+ (data.datr.time / 60 % 60 >> 0)+":"+(data.datr.time % 60 >> 0)}`);
                $("#desccoins").text(`${data.datr.coins} coins`);
                setTimeout(function() {
                    $(".col-md-3").animate({
                        height: "toggle"
                    })
                }, 1000);
                $("#userstatus_io").text(data.text);
                $("#logintext").text("Shop | open/close");
            });
            ws.on("registerdone", function() {
                swal({
                    "title": "Register done!",
                    "text": "You can login!",
                    "icon": "success",
                    "button": "Ok"
                })
            });
            ws.on("receiveUserStatus", function(data) {
                if (window._IOplayer.startBots == false) return;
                $("#progress_bar_io").html('<div id="minions-bar-bots" style="width:' + Math.floor((data.status.bots / data.status.maxbots) * 100) + '%"> </div>');
                $("#botscounter").text(data.status.bots + ' / ' + data.status.maxbots);
                $("#timecounter").text((data.status.time / 86400 >> 0) + ":" + (data.status.time / 3600 % 24 >> 0) + ":" + (data.status.time / 60 % 60 >> 0) + ":" + (data.status.time % 60 >> 0));
            });
            ws.on("acceptbuyfreeplan", function() {
                swal({
                    "title": "Buy plan free done!",
                    "text": "You can start your bots!",
                    "icon": "success",
                    "button": "Ok"
                })
                $("#desctime").text("6:0:0:0");
                $("#descbots").text("15");
            });
            ws.on("acceptbuypremiumplan", function() {
                swal({
                    "title": "Buy plan premium done!",
                    "text": "You can start your bots!",
                    "icon": "success",
                    "button": "Ok"
                })
                $("#desctime").text("6:0:0:0");
                $("#descbots").text("100");
            });
            ws.on("acceptbuygoldplan", function() {
                swal({
                    "title": "Buy plan gold done!",
                    "text": "You can start your bots!",
                    "icon": "success",
                    "button": "Ok"
                })
                $("#desctime").text("6:0:0:0");
                $("#descbots").text("75");
            });
            ws.on("acceptbuymediumplan", function() {
                swal({
                    "title": "Buy plan medium done!",
                    "text": "You can start your bots!",
                    "icon": "success",
                    "button": "Ok"
                })
                $("#desctime").text("6:0:0:0");
                $("#descbots").text("50");
            });
            ws.on("loginfailed", function() {
                swal({
                    "title": "Login failed!",
                    "text": "try again!",
                    "icon": "warning",
                    "button": "Ok"
                })
            });
        }
        var hide_login = true;
        $(".optionText").click(function() {
            $(this).parent().find(".optionBox").animate({
                height: "toggle",
                opacity: "toggle"
            });
        });
        $("#sendlogin").click(function() {
            ws.emit("login", {
                username: $("#login_io").val(),
                password: $("#password_io").val()
            });
        });
        window.buyfree = function() {
            ws.emit("buyfree");
        }
        window.buypremium = function() {
            ws.emit("buypremium");
        };
        window.buygold = function() {
            ws.emit("buygold");
        }
        window.buymedium = function() {
            ws.emit("buymedium");
        }
        var sendregister_click = false;
        $("#sendregister").click(function() {
            if (sendregister_click == false) {
                ws.emit("register", {
                    username: $("#reg_login").val(),
                    password: $("#reg_pass").val(),
                    two_password: $("#reg_pass2").val(),
                    mail: $("#email").val()
                })
                sendregister_click = true;
            }
        });
        $('.msg a').click(function() {
            $('form').animate({
                height: "toggle",
                opacity: "toggle"
            }, "slow");
        })

        $(".customServer").keyup(function() {
            $(".customServer").parent().find(".serverIp").each(function(index, value) {
                if ($(this).html().indexOf($(".customServer").val()) > -1) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        });
        $(".customServer").parent().find(".serverIp").click(function() {

            var str = $(this).html();

            window.location.replace(`http://${str}`);
        });
        $('form').submit(function() {
            return false;
        });
        $("#loging_io").click(function() {
            if (hide_login == true) {
                hide_login = false;
            } else {
                hide_login = true;
            }
            $(".page_IO").animate({
                height: "toggle",
                opacity: "toggle"
            }, "slow");
        });
        var firstClick = false;
        $(".outBar").find("i").click(function() {
            $('.menu_IO').animate({
                width: "toggle",
                opacity: "toggle"
            }, "slow");
            if (firstClick === false) {
                firstClick = true;
                $('.outBar').animate({
                    left: "0px",
                }, "slow");
                $("#infobots_io").animate({
                    left: "0%"
                }, "slow");
            } else if (firstClick === true) {
                firstClick = false;
                $("#infobots_io").animate({
                    left: "11.8%"
                }, "slow");
                $('.outBar').animate({
                    left: "228px",
                }, "slow");
            }
            if (hide_login == false) {
                hide_login = true;
                $('.page_IO').animate({
                    height: "toggle",
                    opacity: "toggle"
                }, "slow");
            }
            window.guiOPEN = (window.guiOPEN) ? false : true;
        });

        $("#startbots").click(function() {
            window.debugGUI = false;
            if (window._IOplayer.startBots == true) {
                window._IOplayer.startBots = false;
                ws.emit("DataClose");
                clearInterval(window._IOplayer.MoveInt);
                window._IOplayer.MoveInt = null;
                $("#startbots").removeClass('optionsCB-disabled').addClass("optionsCB").text("Start Bots");
                $("#infobots_io").animate({
                    width: "toggle"
                })
            } else if (window._IOplayer.startBots == false) {
                window.bPackage = "CHECK";
                window.debugGUI = false;
                if (window._IOplayer.ip !== null && typeof window._IOplayer.ip == "string" && window._IOplayer.origin !== null && window._IOplayer.startBots == false) {
                    window._IOplayer.startBots = true;
                    ws.emit("DataServer", {
                        server: window._IOplayer.ip,
                        origin: window._IOplayer.origin
                    });
                    if (window._IOplayer.MoveInt == null) {
                        window._IOplayer.MoveInt = setInterval(function() {
                            ws.emit("DataPosition", {
                                x: window._IOplayer.x - window._IOplayer.offX,
                                y: window._IOplayer.y - window._IOplayer.offY,
                                mode: bots_mode
                            });
                        }, 100);
                    }
                    $("#startbots").removeClass('optionsCB').addClass("optionsCB-disabled").text("Stop Bots");
                    $("#infobots_io").animate({
                        width: "toggle"
                    })
                }
            }
        });
        setInterval(function() {
            if (ws.json.connected == false) {
                window._IOplayer.startBots = false;
                $("#startbots").removeClass('optionsCB-disabled').addClass("optionsCB").text("Start Bots");
            }
            ws.emit("getUserInfo");
        }, 100);



        var bots_mode = "Mouse";

        window.addEventListener("keydown", function(e) {
            switch (e.keyCode) {
                case 88:
                    {
                        ws.emit("splitbots");
                        $("#split").removeClass("disabled").addClass("enabled").text("Enable");
                    }
                    break;
                case 67:
                    {
                        ws.emit("ejectbots");
                        $("#eject").removeClass("disabled").addClass("enabled").text("Enable");
                    }
                    break;
                case 90:
                    {
                        if (bots_mode == "Mouse") {
                            $("#mode").text("AI");
                            bots_mode = "Collect";
                        } else if (bots_mode == "Collect") {
                            $("#mode").text("Default");
                            bots_mode = "Mouse";
                        }
                    }
                    break;
            }
        });
        window.addEventListener("keyup", function(e) {
            switch (e.keyCode) {
                case 88:
                    {
                        $("#split").removeClass("enabled").addClass("disabled").text("Disable");
                    }
                    break;
                case 67:
                    {
                        $("#eject").removeClass("enabled").addClass("disabled").text("Disable");
                    }
                    break;
            }
        });
        connectToIO_Helper();
        if (window.location.origin == "http://agar.bio") {
            window.WebSocket.prototype.prototype._FakeSend = window.WebSocket.prototype.prototype.send;
            window.WebSocket.prototype.prototype.send = function() {
                this._FakeSend.apply(this, arguments);
                var data = new DataView(arguments[0]);
                this.addEventListener("message", function() {
                    var buffer = new DataView(arguments[0].data);
                    if(buffer.getUint8(0, true) == 64) {
                        window._IOplayer.minimapOffsetX = (buffer.getFloat64(1, true) + buffer.getFloat64(17, true));
                        window._IOplayer.minimapOffsetY = (buffer.getFloat64(9, true) + buffer.getFloat64(25, true));
                    }
                });
                if($("#mini-map-pos").text().split(":")[1].split(",")[0].replace(/\s/g, ``)) {
                    window._IOplayer.cellX = $("#mini-map-pos").text().split(":")[1].split(",")[0].replace(/\s/g, ``);
                    window._IOplayer.cellY = $("#mini-map-pos").text().split(":")[2].split(",")[0].replace(/\s/g, ``);
                    $('#chv2_staticmap #pointer').css('left', 'calc(' + Math.floor((window._IOplayer.cellX) / 67) + 'px - 5px)');
                    $('#chv2_staticmap #pointer').css('top', 'calc(' + Math.floor((window._IOplayer.cellY) / 67) + 'px - 5px)');
        
                    $('#chv2_staticmap #pointer2').css('left', 'calc(' + Math.floor((window._IOplayer.x) / 67) + 'px - 3px)');
                    $('#chv2_staticmap #pointer2').css('top', 'calc(' + Math.floor((window._IOplayer.y) / 67) + 'px - 3px)');
                }
                if (data.getInt8(0, true) !== 16 || data.getUint8(0, true) !== 16) return;
                if (data.byteLength == 21) {
                    window._IOplayer.x = data.getFloat64(1, true);
                    window._IOplayer.y = data.getFloat64(9, true);
                } else if (data.byteLength == 13) {
                    window._IOplayer.x = data.getInt32(1, true);
                    window._IOplayer.y = data.getInt32(5, true);
                } else {
                    window._IOplayer.x = data.getInt16(1, true);
                    window._IOplayer.y = data.getInt16(5, true);
                }
                if (this.url.match('localhost') || this.url.match('127.0.0.1')) return;
                window._IOplayer.ip = this.url;
            }
        } else {
            window.WebSocket.prototype._FakeSend = window.WebSocket.prototype.send;
            window.WebSocket.prototype.send = function() {
                this._FakeSend.apply(this, arguments);
                var data;
                if (window.location.origin == "http://qwoks.ga" || window.location.origin == "http://agarix.ru") {
                    var data = new DataView(arguments[0].buffer);
                } else {
                    var data = new DataView(arguments[0]);
                }
                if ((data.byteLength > 0) && (data.getUint8(0) != 16)) {
                    var f = "";
                    for (var i = 0; i < data.byteLength; i++) {
                        var a = data.getUint8(i);
                        f = f + a + " ";
                    }
                    var realbuffers = f.split(' ');
                    var minusrealbuffermassiv = realbuffers.length;
                    var drr = realbuffers.splice(i, minusrealbuffermassiv);
                    console.log("Detected new package: " + realbuffers);
                }
                this.addEventListener("message", function() {
                    var buffer = new DataView(arguments[0].data);
                    if(window.location.origin == "http://agar.pro" || window.location.origin == "http://qwoks.ga") {
                        if(buffer.getUint8(0, true) == 64) {
                            window._IOplayer.offX = (buffer.getFloat64(1, true) + buffer.getFloat64(17, true)) / 2;
                            window._IOplayer.offY = (buffer.getFloat64(9, true) + buffer.getFloat64(25, true)) / 2;
                        }
                    }
                });
                if (data.getInt8(0, true) !== 16 || data.getUint8(0, true) !== 16) return;
                if (data.byteLength == 21) {
                    window._IOplayer.x = data.getFloat64(1, true);
                    window._IOplayer.y = data.getFloat64(9, true);
                } else if (data.byteLength == 13) {
                    window._IOplayer.x = data.getInt32(1, true);
                    window._IOplayer.y = data.getInt32(5, true);
                } else {
                    window._IOplayer.x = data.getInt16(1, true);
                    window._IOplayer.y = data.getInt16(5, true);
                }
                if (this.url.match('localhost') || this.url.match('127.0.0.1')) return;
                window._IOplayer.ip = this.url;
            }
        }
    }, 1000);
});