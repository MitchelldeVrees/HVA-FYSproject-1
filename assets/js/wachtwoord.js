//Stuurt gebruiker een e-mail met het wachtwoord
function onSubmit() {
    //Zorgt ervoor dat de e-mail niet in een form wordt verstuurd
    event.preventDefault();
    //Haalt de ingevulde e-mail op
    var adres = document.getElementById("email").value;

    //Haalt de voornaam, achternaam en het wachtwoord op van de ingevulde e-mail
    FYSCloud.API.queryDatabase(
        "SELECT firstname, lastname, password FROM userprofile WHERE emailUser=?", [adres]
    ).done(function (data) {
        var wachtwoord = data[0].password;
        var voornaam = data[0].firstname;
        var achternaam = data[0].lastname;

        //Decrypt het opgehaalde wachtwoord
        wachtwoord = Decrypt(wachtwoord);

        //Zet de gegevens bij het goede deel van de e-mail
        FYSCloud.API.sendEmail({
            from: {
                name: "TravelBuddy",
                address: "group@fys.cloud"
            },
            to: [{
                address: adres
            }],
            subject: "Wachtwoord vergeten",
            html: "Beste " + voornaam + " " + achternaam + "," + "<br><br>U heeft uw wachtwoord opgevraagd op onze website. Uw wachtwoord is: <B>" + wachtwoord + "</B><br>U kunt nu weer inloggen met uw account. Wij wensen u veel reisplezier. <br><br>Met vriendelijke groet, <br><br>TravelBuddy"
        }).done(function (data) {
            //Haalt alle ingevulde gegevens weer weg, nadat de e-mail is verstuurd
            console.log(data);
            document.getElementById("email").value = "";
        }).fail(function (reason) {
            console.log(reason);
        });
    }).fail(function (reason) {
        console.log(reason);
    });
}

//Decrypt het gecrypte wachtwoord om het in de email te zetten
function Decrypt(str) {
    if (!str) str = "";
    str = (str == "undefined" || str == "null") ? "" : str;
    try {
        var key = 146;
        var pos = 0;
        ostr = '';
        while (pos < str.length) {
            ostr = ostr + String.fromCharCode(key ^ str.charCodeAt(pos));
            pos += 1;
        }

        return ostr;
    } catch (ex) {
        return '';
    }
}