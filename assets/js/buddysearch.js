$(function () {
    main();
});

function main() {
    //Ingelogde user ID
    const userId = FYSCloud.Session.get("userId");

    //URL omzetten naar een variable
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    const queries = queryString.split("&");
    const best = queries[0];
    const leav = queries[1];

    //inserten/updaten van destination filter search
    FYSCloud.API.queryDatabase("INSERT INTO destination (country, departuredate, userprofile_idUser) VALUES (?, ?, ?);", [best, leav, userId]
    ).done(function(data1) {
    }).fail(function(reason1) {
        FYSCloud.API.queryDatabase("UPDATE destination SET country=?, departuredate=? WHERE userprofile_idUser=?;", [best, leav, userId]
        ).done(function(data) {
        }).fail(function(reason) {
        });
    });

    //alle data opvragen van de filter search
    FYSCloud.API.queryDatabase("SELECT * FROM destination WHERE country=? AND departuredate=?", [best, leav]
    ).done(function(data) {
        for (let i = 0; i < data.length; i++) {

            //data van profiel opvragen
                FYSCloud.API.queryDatabase("SELECT * FROM userprofile WHERE idUser=?;", [data[i].userprofile_idUser]
                ).done(function(data1) {
                        if (data1[0].idUser !== userId) {
                            FYSCloud.API.queryDatabase("SELECT matchIdUser FROM matches WHERE userprofile_idUser=?;", [userId]
                            ).done(function(data2) {

                                //als er helemaal geen buddys zijn de aanbevolen laten zien
                                if (data2.length === 0){
                                    var naam = data1[0].firstname + " " + data1[0].lastname;
                                    var leeftijd = data1[0].age;
                                    var bio = data1[0].information;
                                    var matchID = data1[0].idUser;
                                    var url = FYSCloud.Utils.createUrl("profielView.html", {
                                        id: matchID
                                    });

                                    $(".lijst1").append("<li>" +
                                        "        <div id=\"div" + matchID + "\" class=\"profileBox\">" +
                                        "            <a href=\"" + url + "\">\n" +
                                        "            <img id=\"topPic" + matchID + "\" class=\"profilePic\" src=\"assets/images/profile.svg\">" +
                                        "            <h2 class='profiel-titel'>" + naam + "</h2>\n" +
                                        "            <h3>Leeftijd: " + leeftijd + "</h3>\n" +
                                        "            <h3>Bio:</h3><p>\n " + bio + "</p>\n" +
                                        "            <a onclick=\"makeMatch(" + matchID + ")\">\n" +
                                        "                <img  src=\"assets/images/account-plus.svg\" class='makeMatch'>\n" +
                                        "            </a>\n" +
                                        "            </a>\n" +
                                        "        </div>\n" +
                                        "    </li>");
                                    $.ajax({
                                        url: 'https://is102-2.fys.cloud/uploads/' + matchID + '.dat',
                                        type: 'HEAD',
                                        success: function () {
                                            document.getElementById("topPic" + matchID).src = "https://is102-2.fys.cloud/uploads/" + matchID + ".dat";
                                        },
                                        error: function () {
                                            document.getElementById("topPic" + matchID).src = "assets/images/profile.svg";

                                        }

                                    });
                                    return;
                                }

                                const match = data2[i].matchIdUser;
                                const cardMatch = data1[0].idUser;

                                //kijken of ze al gematched zijn anders laten zien
                                if (match != cardMatch) {

                                    var naam = data1[0].firstname + " " + data1[0].lastname;
                                    var leeftijd = data1[0].age;
                                    var bio = data1[0].information;
                                    var matchID = data1[0].idUser;
                                    var url = FYSCloud.Utils.createUrl("profielView.html", {
                                        id: matchID
                                    });

                                    $(".lijst1").append("<li>" +
                                        "        <div id=\"div" + matchID + "\" class=\"profileBox\">" +
                                        "            <a href=\"" + url + "\">\n" +
                                        "            <img id=\"topPic" + matchID + "\" class=\"profilePic\" src=\"assets/images/profile.svg\">" +
                                        "            <h2 class='profiel-titel'>" + naam + "</h2>\n" +
                                        "            <h3>Leeftijd: " + leeftijd + "</h3>\n" +
                                        "            <h3>Bio:</h3><p>\n " + bio + "</p>\n" +
                                        "            <a onclick=\"makeMatch(" + matchID + ")\">\n" +
                                        "                <img  src=\"assets/images/account-plus.svg\" class='makeMatch'>\n" +
                                        "            </a>\n" +
                                        "            </a>\n" +
                                        "        </div>\n" +
                                        "    </li>");
                                    $.ajax({
                                        url: 'https://is102-2.fys.cloud/uploads/' + matchID + '.dat',
                                        type: 'HEAD',
                                        success: function () {
                                            document.getElementById("topPic" + matchID).src = "https://is102-2.fys.cloud/uploads/" + matchID + ".dat";
                                        },
                                        error: function () {
                                            document.getElementById("topPic" + matchID).src = "assets/images/profile.svg";

                                        }

                                    });
                                }

                            }).fail(function(reason2) {
                                console.log(reason2)
                            });

                        }
                }).fail(function(reason) {
                    console.log(reason)
                });

            }

    }).fail(function(reason) {
        console.log(reason);
    });

}
//match aanmaken
function makeMatch(matchID) {
    const userId = FYSCloud.Session.get("userId");

    FYSCloud.API.queryDatabase(
        "INSERT INTO matches (matchIdUser, userprofile_idUser) VALUES (?, ?)", [matchID, userId]
    ).done(function (insertdata) {
        location.reload();
    }).fail(function (reason) {
        console.log(reason)
    });
}