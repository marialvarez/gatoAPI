$(document).ready(init);

function init() {
    $("#button-init").on("click",enterPlayers);
}
function enterPlayers() {
    $("#welcome").hide();
    $("#playerNames").show();
}