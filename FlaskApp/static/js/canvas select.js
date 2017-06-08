var ix = 0;
var iy = 0;
var height = 0
var width = 0
var drawing = false;
var offset = $('#my_canvas').offset();

function init_foreground(){
    
	var ctx = document.getElementById('my_canvas').getContext('2d');
	// img = document.getElementById('image')
	// ctx.drawImage(img,200,200, 200, 200,200,200,200,200)	
	ctx.canvas.addEventListener("mousedown", function (event) {
		offset = $('#my_canvas').offset();
		drawing = true;
		ix = event.pageX-offset.left;
		iy = event.pageY- offset.top;
		var status = document.getElementById("status");
		status.innerHTML = '('+ix+ " , " +iy+')';	
	});


	ctx.canvas.addEventListener("mousemove", function (event) {
		if (drawing == true) {
		var mousex = event.pageX-offset.left;
		var mousey = event.pageY-offset.top;
		var status = document.getElementById("status");
		width = mousex - ix;
		height = mousey - iy;
		status.innerHTML = '('+ix+','+iy+'),('+mousex+ " , " +mousey+')' + width + " " + height;
		

		ctx.clearRect(0,0,400,575);
		ctx.globalAlpha = .5
		ctx.strokeStyle="#FF0000";
    	ctx.fillStyle = "rgba(200, 0, 0, 0.2)";
		ctx.strokeRect(ix,iy,width,height);
    	ctx.fillRect(ix,iy,width,height);
    	
    	
		

	}});

	ctx.canvas.addEventListener("mouseup", function (event) {
		drawing = false
		var mousex = event.pageX-offset.left;
		var mousey = event.pageY-offset.top;
		var status = document.getElementById("status");
		width = mousex - ix;
		height = mousey - iy;
		status.innerHTML = '('+ix+','+iy+'),('+mousex+ " , " +mousey+')' + width + " " + height;
		ctx.rect(ix,iy,width,height);
		ctx.stroke();
	});

}

function init_image(){
	var ctx = document.getElementById("layer1").getContext('2d');
	img = document.getElementById('image');
	ctx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
                   0, 0, ctx.canvas.width, ctx.canvas.height);
}


window.addEventListener('load', function(event) {
	init_image();
	init_foreground();
	document.getElementById('my_canvas').getContext('2d').save()
	
	// body...
});

function crop(){
	var canv = document.createElement('canvas')
	canv.id = 'crop';
	canv.height = height;
	canv.width = width;

	var srccanv = document.getElementById("layer1");

	var crop_ctx = canv.getContext('2d');
	var crop_img = document.getElementById('image');
	crop_ctx.drawImage(srccanv, ix,iy,width,height,0,0,width,height);
	crop_url = crop_ctx.canvas.toDataURL();
	crop_image = document.createElement('img');
	crop_image.src = crop_url
	document.body.appendChild(crop_image)

}


function reset_canvas(){
	document.getElementById('my_canvas').getContext('2d').restore();
}


// var offset = $('#my_canvas').offset();
// // Then refer to 
// var x = evt.pageX - offset.left