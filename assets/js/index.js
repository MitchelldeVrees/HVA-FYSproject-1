$(function () {

});

function onclickZoek() {
    var userId = FYSCloud.Session.get("userId");

    if (!(userId >= 1)) {
        window.location.href = "register.html";
    }

    if (userId >= 1) {

       var bestem = $("#bestemming option:selected").text();
       var leave = $("#vertek option:selected").text();
       var queryString = "?" + bestem + "&" + leave;
       window.location.href = "buddysearch.html" + queryString;
    }
}


