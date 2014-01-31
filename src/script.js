$(document).ready(function () {
	var observer = new window.WebKitMutationObserver(function() {
		InjectControls()
	});

	observer.observe(document, {
		subtree: true, attributes: true
	});

	//Dynamically insert favicon
	$('head').append('<link href="http://pandora.com/favicon.ico" rel="shortcut icon" type="image/x-icon" />');
});

function InjectControls() {
	if ($("#trackInfo").length > 0 && $("#downloadLink").length == 0)
	{
		var fullArtistName = $("#trackInfo .trackinfo-p ").first().text();
		var byArtistText = $("#trackInfo .trackinfo-p span").first().text();

		var artistName = fullArtistName.replace(byArtistText, '').trim().replace(/[\\/:*?:/"<>|]/, '').replace(/'/g, '&#39;');
		var trackName = $("#trackInfo h3").text().trim().replace(/[\\/:*?/"<>|]/, '').replace(/'/g, '&#39;');
		var mp3Link = $("#jp_audio_0")[0].currentSrc;
		var prettyMp3Link = artistName + ' - ' + trackName + '.mp3';
		var prettyCoverArtLink = artistName + ' - ' + trackName + '.jpg';
		
		//Optional formatting comment out what you don't like
		//prettyMp3Link = prettyMp3Link.toLowerCase() 
		//prettyMp3Link = prettyMp3Link.replace(/[\s]/g, '_') // Replace spaces with underscores

		$("#trackInfo").append("<span id='downloadLink' class='p-fontHighlight trackinfo-p__span'>&#x25BC</span><a id='mp3Download' href='" + mp3Link + "' download='" + prettyMp3Link + "'>Download this song</a>");

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

		var albumArtUrl = $("#albumArtImage").attr("src");
		$("#albumArtImage").wrap("<a style='position: relative; z-index: 10; display: block;' href='" + albumArtUrl + "' download='" + prettyCoverArtLink + "'></a>");
	}
}
