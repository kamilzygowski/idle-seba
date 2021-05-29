$(document).ready(function() {
    $("button.left_panel_button").click(function() {
        $("#main-game-panel").load($(this).val() + ".html");
    })
});
