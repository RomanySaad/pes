$(document).ready(function () {
    window.setInterval(ForceControlInjection, 50);
});

function ForceControlInjection() {
    if ($("#trackInfo").length > 0 && $("#downloadLink").length == 0) {
        var fullArtistName = $("#trackInfo .trackinfo-p ").first().text();
        var byArtistText = $("#trackInfo .trackinfo-p span").first().text();

        var artistName = fullArtistName.replace(byArtistText, '').trim().replace(/[\\/:*?:/"<>|]/, '');
        var trackName = $("#trackInfo h3").text().trim().replace(/[\\/:*?/"<>|]/, '');
        var mp3Link = $("#jp_audio_0")[0].currentSrc;
        var mp3ID = mp3Link.substring(mp3Link.lastIndexOf(".mp3"), mp3Link.lastIndexOf("/") + 1);

        //Optional formatting comment out what you don't like
        //artistName = artistName.toLowerCase() 
        //artistName = artistName.replace(/[\s]/g, '_') // Replace spaces with underscores
        //trackName = trackName.toLowerCase() 
        //trackName = trackName.replace(/[\s]/g, '_') // Replace spaces with underscores

        var prettyMp3Link = mp3Link.replace(mp3ID, escape(artistName) + ' - ' + escape(trackName));

        $("#trackInfo").append("<span id='downloadLink' class='p-fontHighlight trackinfo-p__span'>&#x25BC</span> <a href='" + prettyMp3Link + "' download>Download this song</a>");

        $("#skipButton").unbind();
        $("#skipButton").click(function (event) {
            $("#jp_audio_0")[0].currentTime = 999;
        });

        $(".progressRow__progressBar").click(function (e) {
            var trackDuration = $("#jp_audio_0")[0].duration;

            var posX = $(this).offset().left;
            var x = e.pageX - posX;
            var progressBarWidth = $(".progressRow__progressBar").width();

            var currentTime = x / progressBarWidth * trackDuration;

            $("#jp_audio_0")[0].currentTime = currentTime;
        });
    }
}