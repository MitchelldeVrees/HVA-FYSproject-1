function main() {
    //Haalt id van de ingelogde user op
    var idUser = FYSCloud.Session.get("userId");

    //Zet alle namen van je matches neer in het lijstje van keuzes
    FYSCloud.API.queryDatabase(
        "SELECT firstname, lastname, emailUser \n" +
        "FROM matches\n" +
        "INNER JOIN userprofile ON matchIdUser = idUser\n" +
        "WHERE userprofile_idUser = ?",
        [idUser]
    ).done(function (data) {
        for (let i = 0; i < data.length; i++) {
            var option = $("<option>");
            option.html(data[i].firstname + " " + data[i].lastname);
            option.data("user-data", data[i]);
            $('.bar-input').append(option);
        }
        console.log(data);
    }).fail(function (reason) {
        console.log(reason);
    });
}

//Stuurt mail naar buddy met onderwerp en tekst
function onSubmit() {
    //Zorgt ervoor dat de e-mail niet in een form wordt verstuurd
    event.preventDefault();
    //Haalt id van ingelogde user op, onderwerp en tekst dat is ingevuld en de gegevens van de buddy die is geselecteerd
    var idUser = FYSCloud.Session.get("userId");
    var onderwerp = document.getElementById("onderwerp").value;
    var tekst = document.getElementById("tekst").value;
    var userData = $("#email").find(":selected").data("user-data");

    FYSCloud.API.queryDatabase(
        "SELECT firstname, lastname FROM userprofile WHERE idUser=?", [idUser]
    ).done(function (data) {
        var naam = data[0].firstname + " " + data[0].lastname;

        //Zet de gegevens bij het goede deel van de e-mail
        FYSCloud.API.sendEmail({
            from: {
                name: naam,
                address: "group@fys.cloud"
            },
            to: [{
                name: userData.firstname + " " + userData.lastname,
                address: userData.emailUser
            }],
            subject: onderwerp,
            html: "<pre>" + tekst + "</pre>"
        }).done(function (data) {
            //Haalt alle ingevulde gegevens weer weg, nadat de e-mail is verstuurd
            console.log(data);
            document.getElementById("email").value = "";
            document.getElementById("onderwerp").value = "";
            document.getElementById("tekst").value = "";
        }).fail(function (reason) {
            console.log(reason);
        });
    }).fail(function (reason) {
        console.log(reason);
    });
}

//Als de pagina geladen is, voert hij pas de main function uit
$(function () {
    main();
});


