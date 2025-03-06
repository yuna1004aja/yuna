$(document).ready(function() {
    // Click handler for piece-2
    $("#piece-2").click(function() {
        console.log("clicked");
        $(this).css("height", "200%");
    });
    
    // Click handler for the main container
    $("#img-container").click(function(e) {
        if (e.target.id !== "piece-2") {
            $("[class^='piece-container-']").each(function() {
                $(this).css({
                    "left": `${Math.random() * 80}%`,
                    "top": `${Math.random() * 80}%`
                });
            });
        }
    });
});