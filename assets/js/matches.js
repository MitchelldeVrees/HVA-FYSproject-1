$(function () {
    main();
    main2();
});

function main() {
    //Verkrijkgen van ingelogde user ID
    var userId = FYSCloud.Session.get("userId");

    //Ophalen van interesses van de ingelogde gebruiker
    FYSCloud.API.queryDatabase("SELECT * FROM interest WHERE userprofile_idUser = ?", [userId])
        .done(function (data) {
            var interest1 = data[0].interest1;
            var interest2 = data[0].interest2;
            var favLand = data[0].favDest;

            //Interesses vergelijken in database en kijken of er een aantal overeenkomen
            FYSCloud.API.queryDatabase(
                "SELECT * FROM interest WHERE (interest1 LIKE ? OR interest1 LIKE ? OR interest2 LIKE ? OR interest2 LIKE ? OR favDest LIKE ?)",
                [interest1, interest2, interest1, interest2, favLand]
            ).done(function (data) {

                //loop door de data
                for (let i = 0; i < data.length; i++) {

                    //ophalen van de gemaakte buddy gegevens
                    FYSCloud.API.queryDatabase("SELECT idUser, firstname, lastname, age FROM userprofile WHERE idUser = ?", [data[i].userprofile_idUser])
                        .done(function (data1) {
                            $("#topText").text("Aanbevolen Buddy's");


                            var naam = data1[0].firstname + " " + data1[0].lastname;
                            var leeftijd = data1[0].age;
                            var interesses = data[i].interest1 + ", " + data[i].interest2;
                            var land = data[i].favDest;
                            var matchID = data1[0].idUser;
                            var url = FYSCloud.Utils.createUrl("profielView.html", {
                                id: matchID
                            });

                            //ingelogde gebruiker eruit filteren
                            if (matchID !== userId) {

                                //alle buddys ophalen en eruit halen
                                FYSCloud.API.queryDatabase(
                                    "SELECT * FROM matches WHERE userprofile_idUser=?", [userId]
                                ).done(function (data2) {

                                    for (let j = 0; j < data2.length; j++) {
                                        if (data2[j].matchIdUser == matchID) {
                                            return;
                                        }
                                    }

                                    //aanbevolen buddy weergeven
                                    $(".list1").append("<li>" +
                                        "        <div id=\"div" + matchID + "\" class=\"profileBox\">" +
                                        "            <a href=\"" + url + "\">\n" +
                                        "            <img id=\"topPic1" + matchID + "\" class=\"profilePic\" src=\"assets/images/profile.svg\">" +
                                        "            <h2 class='profiel-titel'>" + naam + "</h2>\n" +
                                        "            <h3>Leeftijd: " + leeftijd + "</h3>\n" +
                                        "            <h4>Interesses:  " + interesses + "</h4>\n" +
                                        "            <h4>Favoriete land/stad:  " + land + "</h4>\n" +
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
                                            document.getElementById("topPic1" + matchID).src = "https://is102-2.fys.cloud/uploads/" + matchID + ".dat";
                                        },
                                        error: function () {
                                            document.getElementById("topPic1" + matchID).src = "assets/images/profile.svg";

                                        }
                                    });
                                }).fail(function (reason2) {
                                });
                            }
                        }).fail(function (reason) {
                    });
                }
            }).fail(function (reason) {
                console.log(reason);
            });
        }).fail(function (reason) {
        console.log(reason);
    });
}

function main2() {
    //Verkrijkgen van ingelogde user ID
    var userId = FYSCloud.Session.get("userId");
    $("#secondText").text("Geen opgeslagen Buddy's");

    //ophalen van buddys
    FYSCloud.API.queryDatabase(
        "SELECT * FROM matches WHERE userprofile_idUser=?", [userId]
    ).done(function (data) {
        for (let i = 0; i < data.length; i++) {
            var idu = data[i].matchIdUser;

            $("#secondText").text("Opgeslagen Buddy's");

            //ophalen van buddy profiel
            FYSCloud.API.queryDatabase("SELECT idUser, firstname, lastname, age FROM userprofile WHERE idUser = ?", [idu]).done(function (data1) {

                for (let j = 0; j < data1.length; j++) {
                    var naam = data1[j].firstname + " " + data1[j].lastname;
                    var leeftijd = data1[j].age;
                    var matchID = data1[j].idUser;
                    var url = FYSCloud.Utils.createUrl("profielView.html", {
                        id: matchID
                    });

                    //ophalen van interesses van de buddy
                    FYSCloud.API.queryDatabase("SELECT * FROM interest WHERE userprofile_idUser = ?", [data1[j].idUser]).done(function (data) {
                        for (let k = 0; k < data.length; k++) {
                            var interesses = data[k].interest1 + ", " + data[k].interest2;
                            var land = data[k].favDest;

                            //weergeven van buddy
                            if (userId !== data1[j].idUser) {
                                $(".list2").append("<li>" +
                                    "        <div id=\"divDown" + matchID + "\" class=\"profileBox\">" +
                                    "            <a href=\"" + url + "\">\n" +
                                    "            <img id=\"Pic" + matchID + "\" class=\"profilePic\" src=\"assets/images/profile.svg\">" +
                                    "            <h2 class='profiel-titel'>" + naam + "</h2>\n" +
                                    "            <h3>Leeftijd: " + leeftijd + "</h3>\n" +
                                    "            <h4>Interesses:  " + interesses + "</h4>\n" +
                                    "            <h4>Favoriete land/stad:  " + land + "</h4>\n" +
                                    "            <a href='/message.html'>\n" +
                                    "                <img src=\"assets/images/email-black.svg\" class='makeMatch'>\n" +
                                    "            </a>\n" +
                                    "            </a>\n" +
                                    "        </div>\n" +
                                    "    </li>");
                                $.ajax({
                                    url: 'https://is102-2.fys.cloud/uploads/' + matchID + '.dat',
                                    type: 'HEAD',
                                    success: function () {
                                        document.getElementById("Pic" + matchID).src = "https://is102-2.fys.cloud/uploads/" + matchID + ".dat";
                                    },
                                    error: function () {
                                        document.getElementById("Pic" + matchID).src = "assets/images/profile.svg";

                                    }
                                });
                            }

                        }

                    }).fail(function (reason) {
                        console.log(reason);
                    });

                }

            }).fail(function (reason) {
                console.log(reason);
            });
        }

        // Haalt het ID op van de persoon waar je op zoekt
        var id = FYSCloud.URL.queryString("id", 0);

        FYSCloud.API.queryDatabase(
            "SELECT firstname, lastname, age, gender, information FROM userprofile WHERE idUser = ?", [id]
        ).done(function (data) {

            // Laat de volgende gegevens zien van de persoon. Via HTML hieronder worden ze getoont op de website.
            var naam = data[0].firstname;
            var achternaam = data[0].lastname;
            var leeftijd = data[0].age;
            var geslacht = data[0].gender;
            var info = data[0].information;

            $("#profileFullname").html(" " + naam + " " + achternaam);

            $(".profileName").append(
                "<p>" + naam + "</p>");

            $(".profileLastName").append(
                "<p>" + achternaam + "</p>");

            $(".profileAge").append(
                "<p>" + leeftijd + "</p>");

            $(".profileGender").append(
                "<p>" + geslacht + "</p>");

            $(".profileInfo").append(
                "<p>" + info + "</p>");

            // Laat de profielfoto zien van de persoon waarvan je het profiel bekijkt.
            // Als dit faalt wordt het default profile.svg als profielfoto gebruikt
            $.ajax({
                url: 'https://is102-2.fys.cloud/uploads/' + id + '.dat',
                type: 'HEAD',
                success: function () {
                    document.getElementById("imagePreviewBig").src = "https://is102-2.fys.cloud/uploads/" + id + ".dat";
                },
                error: function () {
                    document.getElementById("imagePreviewBig").src = "assets/images/profile.svg";

                }
            });

            console.log(data);
        }).fail(function (reason) {
            console.log(reason);
        });


        FYSCloud.API.queryDatabase(
            "SELECT interest1, interest2, favDest FROM interest WHERE userprofile_idUser = ?", [id]
        ).done(function (data) {
            // Laat de volgende gegevens zien van de persoon. Via HTML hieronder worden ze getoont op de website.
            var interesse1 = data[0].interest1;
            var interesse2 = data[0].interest2;
            var land = data[0].favDest;

            $(".profileInterest1").append(
                "<p>" + interesse1 + "</p>");

            $(".profileInterest2").append(
                "<p>" + interesse2 + "</p>");

            $(".profileCountry").append(
                "<p>" + land + "</p>");


            console.log(data);
        }).fail(function (reason) {
            console.log(reason);
        });


    }).fail(function (reason) {
        console.log(reason);
    });
}

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