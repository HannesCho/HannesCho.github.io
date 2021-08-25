class Background {

    draw () {
        game.backgroundImages.forEach(function (img) {
			img.y += img.speed; //speed of the background
			//first image
            image(img.src, 0, img.y, width, height); 
			//second image to cover empty space
			image(img.src, 0, img.y - height, width, height);
			// if the image moves out of the screen then we need to reset it
			// to it's starting position
			if (img.y >= height) {
				img.y = 0;
			}
		})
    }
}