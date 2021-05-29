$(document).ready(function() {
    $("button.left_panel_button").click(function() {
        $("#main-game-panel").html('<h1>' + $(this).text()+ '</h1>');
        console.log("siema");
    })
});
