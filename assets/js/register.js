// verschuilt alle foutmeldingen
$(function () {
    $('.formErrorName').hide();
    $('.formErrorLastname').hide();
    $('.formErrorEmail').hide();
    $('.formErrorAge').hide();
    $('.formErrorPasswordMatch').hide();
    $('.formErrorPasswordControle').hide();

    var userId = FYSCloud.Session.get("userId");

    if (userId >= 1) {
        window.location = 'index.html';
    }
});

function onCheck() {
    var firstname = $('#firstname').val();
    var lastname = $('#lastname').val();
    var email = $('#email').val();
    var age = $('#age').val();
    var password = $('#password').val();
    var passwordControle = $('#passwordControle').val();
    var passwordSecond = $('#passwordSecond').val();

    // controle of voornaam een string is
    if (firstname === '') {
        $('#firstname').show();
    }
    // controle of achternaam een string is
    if (lastname === '') {
        $('#lastname').show();
    }

    if (email === '') {
        $('#email').show();
    }

// zet alles standaard op true tot er een fout zit
    var status = true;

    // als naam fout is geeft het een foutmelding
    if (isName(firstname) === false) {
        $('.formErrorName').show();
        status = false;
    }

    // als achternaam fout is geeft het een foutmelding
    if (isName(lastname) === false) {
        $('.formErrorLastname').show();
        status = false;
    }

    // controleert of je oudgenoeg bent, zo niet geeft het een error
    if (age < 18 || age > 99) {
        $('.formErrorAge').show();
        status = false;
    }

    // als e-mail fout is geeft het een foutmelding
    if (IsEmail(email) === false) {
        $('.formErrorEmail').show();
        return status = false;
    }

    // wachtwoord moet langer dan 8 zijn
    if (password.length <= 8 && passwordSecond.length <= 8) {
        status = false;
        $('.formErrorPasswordControle').show();
    }

    // controleert of wachtwoord kleine letters heeft
    if (password.search(/[a-z]/) < 0) {
        $('.formErrorPasswordControle').show();
        return status = false
    }

    // controleert of wachtwoord hoofdletters heeft
    if (password.search(/[A-Z]/) < 0 || password.search(/[0-9]/) < 0) {
        $('.formErrorPasswordControle').show();
        return status = false
    }

    // controleert of wachtwoord cijfers heeft
    if (password.search(/[0-9]/) < 0) {
        $('.formErrorPasswordControle').show();
        return status = false
    }

    // controleert of wacgtwoord 1 gelijk is aan 2
    if (password != passwordSecond) { // dit geeft een te kort wachtwoord aan of als het wachtwoord NIET hetzelde is als de andere wachtwoord
        $('.formErrorPasswordMatch').show();
        return status = false;
    }

    // als alle gegevens kloppen worden ze opgeslagen
    if (status == true) {
        onSubmit();
    }

    // controle structuur naam
    function isName(naam) {
        const regex = /^([a-zA-Z ])+$/;
        return regex.test(naam);
    }

    // controle structuur e-mail
    function IsEmail(email1) {
        const regex = /^([a-zA-Z0-9_.\-+])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email1);
    }
}

function onSubmit() {
    var gender = document.getElementById("gender").value;
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var age = document.getElementById("age").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var encryptPassword = Encrypt(password);

    // gegevens worden opgeslagen in de database
    FYSCloud.API.queryDatabase("INSERT INTO userprofile (emailUser, password, firstname, lastname, age, gender) VALUES (?, ?, ?, ?, ?, ?)",
        [email, encryptPassword, firstname, lastname, age, gender]).done(function (data) {
        console.log(data);
        location.reload();
        window.location = "index.html";
    }).fail(function (reason) {
        console.log(reason);
    });

}

// wachtwoord word opgeslagen in databases met andere code
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

