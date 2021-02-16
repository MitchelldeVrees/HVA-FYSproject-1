$(function () {
    // Pakt de userID van de sessie en checkt of de persoon is ingelogt.
    var idUser = FYSCloud.Session.get("userId");
    if (idUser >= 1) {
        showName();
        $.ajax({
            // Profielfoto wordt opgehaald van de fys.cloud.
            // Er wordt ajax gebruikt om al een preview te laten zien zonder de pagina opnieuw te laden.
            url: 'https://is102-2.fys.cloud/uploads/' + idUser + '.dat',
            // HEAD laat de foto zien maar download deze niet.
            type: 'HEAD',
            error: function () {
                document.getElementById("imagePreviewSmall").src = "assets/images/profile.svg";
            },
            success: function () {
                document.getElementById("imagePreviewSmall").src = "https://is102-2.fys.cloud/uploads/" + idUser + ".dat";
                document.getElementById("imagePreviewMedium").src = "https://is102-2.fys.cloud/uploads/" + idUser + ".dat";
                document.getElementById("imagePreviewBig").src = "https://is102-2.fys.cloud/uploads/" + idUser + ".dat";
            }
        });

    } else {
        window.location = 'index.html';
    }

    //De file wordt gelezen en als het een foto is zullen er 3 voorbeelden worden laten zien
    $("#fileUpload").on("change", function () {
        FYSCloud.Utils
            .getDataUrl($(this))
            .done(function (data) {
                if (data.isImage) {
                    $("#imagePreviewSmall").attr("src", data.url);
                    $("#imagePreviewMedium").attr("src", data.url);
                    $("#imagePreviewBig").attr("src", data.url);
                }
            })
            .fail(function (reason) {
                console.log(reason);
            });
    });

    // De file die is geupload wordt opgeslagen met behulp van de FYSCloud API
    $(".submitButton").on("click", function () {
        FYSCloud.Utils
            .getDataUrl($("#fileUpload"))
            .done(function (data) {
                var idUser = FYSCloud.Session.get("userId");
                FYSCloud.API.uploadFile(idUser + ".dat", data.url, true)

            })
            .fail(function (reason) {
                console.log(reason);
            });
    });
});

var idUser = FYSCloud.Session.get("userId");

//Haalt de alle informatie van userprofile op en geeft het mee zodat het kan worden opgevraagt vanuit de HTML
FYSCloud.API.queryDatabase(
    "SELECT firstname, lastname , age, gender, information FROM userprofile WHERE idUser = ?", [idUser]
).done(function (data) {    
    for (let i = 0; i < data.length; i++) {
        $("#firstNameProfile").val(data[i].firstname);

        $("#lastNameProfile").val(data[i].lastname);

        $("#ageProfile").val(data[i].age);

        // Vanwege verschillende talen vanuit de website, database wordt de selectie goed veranderd.
        if (data[i].gender === "Male") {
            data[i].gender = "Man";
            $("#genderProfile").val(data[i].gender);
        } else if (data[i].gender === "Female") {
            data[i].gender = "Vrouw";
            $("#genderProfile").val(data[i].gender);
        } else $("#genderProfile").val(data[i].gender);

        $("#informationProfile").val(data[i].information);
    }

}).fail(function (reason) {
    console.log(reason);
});

//Haalt de alle informatie van interest op en geeft het mee zodat het kan worden opgevraagt vanuit de HTML
FYSCloud.API.queryDatabase(
    "SELECT interest1, interest2, favDest FROM interest WHERE userprofile_idUser = ?", [idUser]
).done(function (data) {

    for (let i = 0; i < data.length; i++) {
        $("#interest1Profile").val(data[i].interest1);
        $("#interest2Profile").val(data[i].interest2);
        $("#favDestProfile").val(data[i].favDest);
    }

}).fail(function (reason) {
    console.log(reason);
});


function onSubmit() {
    //pakt alle informatie van alle SQL scripts hierboven
    var idUser = FYSCloud.Session.get("userId");
    var firstname = $('#firstNameProfile').val();
    var lastname = $('#lastNameProfile').val();
    var age = $('#ageProfile').val();
    var gender = $('#genderProfile').val();
    var information = $('#informationProfile').val();
    var interest1 = $('#interest1Profile').val();
    var interest2 = $('#interest2Profile').val();
    var favDest = $('#favDestProfile').val();

    // Als op de button wordt gedrukt Bind het UserID vast aan de interest database zodat dit ook weer opgehaald kan worden.
    FYSCloud.API.queryDatabase("INSERT INTO interest (userprofile_idUser) VALUES (?)",
        [idUser])
        .done(function (data) {

        }).fail(function (reason) {
        console.log(reason);

    });
    // Als er op de button wordt geklikt komen de gegevens die zichbevinden in de tabel interest in de database te staan.
    FYSCloud.API.queryDatabase("UPDATE interest SET interest1 = ?, interest2 = ?, favDest = ? WHERE userprofile_idUser = ?",
        [interest1, interest2, favDest, idUser])
        .done(function (data) {

        }).fail(function (reason) {
        console.log(reason);

    });

    // Als er op de button wordt geklikt komen de gegevens die zichbevinden in de tabel userprofile in de database te staan.
    FYSCloud.API.queryDatabase("UPDATE userprofile SET firstname = ?, lastname = ?, age = ?, gender = ?, information = ? WHERE idUser = ?",
        [firstname, lastname, age, gender, information, idUser])
        .done(function (data) {
            var processing = "Gegevens opgeslagen";
            $("#processing").html(processing);

        }).fail(function (reason) {
        console.log(reason);

    });

}

// Haalt de naam en achternaam op en geeft het mee aan #name.
function showName() {
    var userId = FYSCloud.Session.get("userId");
    FYSCloud.API.queryDatabase(
        "SELECT firstname, lastname FROM userprofile WHERE idUser=?", [userId]
    ).done(function (data) {
        var name = data[0].firstname + " " + data[0].lastname;
        $("#name").html(name);

    }).fail(function (reason) {
        console.log(reason);
    });
}

