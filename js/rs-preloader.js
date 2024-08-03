
function preloaderLoading() {
	const preloader = document.querySelector('.preloader');
	const images = document.images;
	const timeLoad = window.innerWidth>767?500:200;

	imagesTotalCount = images.length;
	imagesLoadedCount = 0;

	for (let i = 0; i < imagesTotalCount; i++) {
		document.body.classList.add('lock');

		imageClone = new Image();
		imageClone.onload = imagesLoaded;
		imageClone.onerror = imagesLoaded;

		imageClone.src = images[i].src;
	}

	function imagesLoaded() {
		imagesLoadedCount++;
		if (imagesLoadedCount >= imagesTotalCount) {
			setTimeout(function () {
				if (!preloader.classList.contains('_done')) {
					preloader.classList.add('_done');
					document.body.classList.remove('lock');
				}
			}, timeLoad );
		}
	}

    loop();
}

if (document.querySelector('.preloader')) {
	preloaderLoading()
}