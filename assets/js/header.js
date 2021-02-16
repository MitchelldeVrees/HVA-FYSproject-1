$(function () {
    main();
    $('.formErrorLogin').hide();
    var userId = FYSCloud.Session.get("userId");
    $.ajax({
        url: 'https://is102-2.fys.cloud/uploads/' + userId + '.dat',
        type: 'HEAD',
        error: function () {
            document.getElementById("navProfileImage").src = "assets/images/profile.svg";

        },
        success: function () {


            imageUrl = "https://is102-2.fys.cloud/uploads/" + userId + ".dat";
            document.getElementById("navProfileImage").style.backgroundImage = `url('${imageUrl}')`;

        }
    });
});

function main() {
    var userId = FYSCloud.Session.get("userId");

    if (userId >= 1) {
        $("#loginText").html("");
        $("#loginLogout").html("Uitloggen");

        showName();

        $(".loggedIn").show();
        $(".loggedOut").hide();

    } else {
        $("#loginText").html("Inloggen");
        $(".loggedOut").show();
        $(".loggedIn").hide();
    }
}

function showName() {
    var userId = FYSCloud.Session.get("userId");
    FYSCloud.API.queryDatabase(
        "SELECT firstname, lastname FROM userprofile WHERE idUser=?", [userId]
    ).done(function (data) {
        var naam = data[0].firstname + " " + data[0].lastname;
        $("#naamNav").html(naam);

    }).fail(function (reason) {
        console.log(reason);
    });
}

var logindisplay = document.getElementById('id01');
window.onclick = function (event) {
    if (event.target === logindisplay) {
        logindisplay.style.display = "none";
    }
}

function onLogout() {
    FYSCloud.Session.remove("userId");
    window.location = 'index.html';
}

function onLogin() {

    var loginEmail = document.getElementById("loginEmail").value;
    var loginPassword = document.getElementById("loginPassword").value;

    var decryptPassword = Encrypt(loginPassword);

    FYSCloud.API.queryDatabase(
        "SELECT idUser, emailUser, password FROM userprofile WHERE emailUser=? and password=?",
        [loginEmail, decryptPassword]
    ).done(function (data) {

        // checks if result is zero
        if(data.length == 0) $('.formErrorLogin').show().attr("style", "color: red;");


        for (let i = 0; i < data.length; i++) {

            if (data[i].emailUser === loginEmail && data[i].password === decryptPassword) {
                FYSCloud.Session.set("userId", data[i].idUser);
                location.reload();
            }

        }
    }).fail(function (reason) {
        console.log(reason);
    });
}

function Encrypt(str) {
    if (!str) str = "";
    str = (str == "undefined" || str == "null") ? "" : str;
    try {
        var key = 146;
        var pos = 0;
        ostr = '';
        while (pos < str.length) {
            ostr = ostr + String.fromCharCode(str.charCodeAt(pos) ^ key);
            pos += 1;
        }

        return ostr;
    } catch (ex) {
        return '';
    }
}
