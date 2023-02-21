function preloading (imageArray) {

	let n = imageArray.length;

	for (let i = 0; i < n; i++) {

		let img = new Image();

		img.src = imageArray[i];

	}

};



preloading([
	"./img/bg7.png",
	"./img/comma.jpg",
    "./img/scribbler2.jpg",
    "./img/canon.jpg",
    "./img/olympic1.jpg",
    "./img/me.jpg"
]);

