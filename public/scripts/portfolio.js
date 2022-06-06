// Getting the modal

var modal = document.getElementById("myModal");

// Modal variables

var img = $(".portfolio-img");
var modalImg = document.getElementById("img01");

// Getting the clicked image and putting it in the modal

img.click(function (event) {
	console.log(this);
	modal.style.display = "block";
	modalImg.src = this.src;
});

// Get the <span> element that closes the modal
var span = $(".close");

// When the user clicks on <span> (x), close the modal
span.click(function (event) {
	console.log(this);
	modal.style.display = "none";
});
