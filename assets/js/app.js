$(function() {
    $.get("_header.html", function (data) {
        var header = $(data);

        $("body").prepend(header);
    });

    $.get("_footer.html", function (data) {
        $("body").append($(data));
    });
});
