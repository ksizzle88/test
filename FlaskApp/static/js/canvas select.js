
// Labeling some global variables
var ix = 0;
var iy = 0;
var height = 0
var width = 0
var drawing = false;
var button_wrapper = document.getElementById("field_buttons");
var active_field
var active_canvas

// Defining the Field Class 
class field 
{
  constructor(name, color)
  {
    this.name = name;
    this.coords = [0,0,0,0];
    this.color = color; // string inn the format of '(r,  g, b)'
    this.fill_alpha = .2; // value between 0 and 1
    this.stroke_alpha = .5; // value between 0 and 1
    this.fill_color = rgb_to_rgba(this.color, this.fill_alpha);
    this.border_color = rgb_to_rgba(this.color, this.stroke_alpha);
    this.text = " ";
    this.button = ""
  }


  update_color()
  {
  	this.fill_color = rgb_to_rgba(this.color, this.fill_alpha);
    this.border_color = rgb_to_rgba(this.color, this.stroke_alpha);
  }


  create_canvas()
  {
	var canvas_container = document.getElementById('canvas_container');
	var canvas = canvas_container.appendChild(document.createElement("canvas"));
	canvas.id = this.name;
	canvas.height = 550;
	canvas.width = 425;
	canvas.className = "field_canv";
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");
  }

  create_button()
  {
  	var button = button_wrapper.appendChild(document.createElement("span"));
	button.className = "btn field_button inactive";
	button.innerHTML = this.name;
	button.id = this.name + "_field_span"
	button.style.backgroundColor = this.fill_color;
	var field = this;
	console.log(field)
	button.addEventListener('click', function()
		{
			activate_canvas(field)
		})
	var input = button.appendChild(document.createElement("input"))
	input.className = "form-control input-number"
	input.value = "stuff"
	input.zIndex = 0
	button.zIndex = 1
	}

}


// some helper functions
function rgb_to_rgba(rgb, a)
{
	if (a >= 1) { a = "1.0";}
	else if (a <= 0) { a = ".0"}
	else{a = String(Math.round(a*10)/10)}
	return "rgba"+ rgb.slice(0,-1) +","+ a + ")"
}


function init_foreground(field)
{    
	active_canvas = field.canvas
	console.log(active_canvas)
	console.log(field.canvas)
	active_canvas.className = "active_field_canv"
	var ctx = active_canvas.getContext('2d');/*  document.getElementById('my_canvas').getContext('2d');*/
	
	ctx.strokeStyle=field.border_color;
    ctx.fillStyle = field.fill_color;


	// img = document.getElementById('image')
	// ctx.drawImage(img,200,200, 200, 200,200,200,200,200)	
	ctx.canvas.addEventListener("mousedown", function (event) {
		offset = $('#layer1').offset();
		drawing = true;
		ix = event.pageX-offset.left;
		iy = event.pageY- offset.top;
		ctx.strokeStyle=field.border_color;
    	ctx.fillStyle = field.fill_color;
		// var status = document.getElementById("status");
		// status.innerHTML = '('+ix+ " , " +iy+')';	
	});


	ctx.canvas.addEventListener("mousemove", function (event)
	{
		if (drawing == true)
		{
		var mousex = event.pageX-offset.left;
		var mousey = event.pageY-offset.top;
		var status = document.getElementById("status");
		width = mousex - ix;
		height = mousey - iy;
		
		// status.innerHTML = '('+ix+','+iy+'),('+mousex+ " , " +mousey+')' + width + " " + height;

		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
		ctx.strokeRect(ix,iy,width,height);
    	ctx.fillRect(ix,iy,width,height);
    	}
    });

	ctx.canvas.addEventListener("mouseup", function (event) 
	{
		drawing = false
		var mousex = event.pageX-offset.left;
		var mousey = event.pageY-offset.top;
		var status = document.getElementById("status");
		width = mousex - ix;
		height = mousey - iy;
		// status.innerHTML = '('+ix+','+iy+'),('+mousex+ " , " +mousey+')' + width + " " + height;
		ctx.strokeStyle=field.border_color;
    	ctx.fillStyle = field.fill_color;
		ctx.strokeRect(ix,iy,width,height);
    	ctx.fillRect(ix,iy,width,height);;
    	active_field.coords = [ix,iy,width,height];
	});

	// ctx.canvas.addEventListener("mouseout", function (event) 
	// {
	// 	drawing = false
	// 	var mousex = event.pageX-offset.left;
	// 	var mousey = event.pageY-offset.top;
	// 	var status = document.getElementById("status");
	// 	width = mousex - ix;
	// 	height = mousey - iy;
	// 	// status.innerHTML = '('+ix+','+iy+'),('+mousex+ " , " +mousey+')' + width + " " + height;
	// 	ctx.strokeStyle=field.border_color;
 //    	ctx.fillStyle = field.fill_color;
	// 	ctx.strokeRect(ix,iy,width,height);
 //    	ctx.fillRect(ix,iy,width,height);;
 //    	active_field.coords = [ix,iy,width,height];
	// });





}


function init_image()
{
	var ctx = document.getElementById("layer1").getContext('2d');
	img = document.getElementById('image');
	ctx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
                   0, 0, ctx.canvas.width, ctx.canvas.height);
}





function crop()
{
	let ix = active_field.coords[0]
	let iy = active_field.coords[1]
	let width = active_field.coords[2]
	let height = active_field.coords[3]

	var canv = document.createElement('canvas')
	canv.id = 'crop';
	canv.height = height;
	canv.width = width;

	var srccanv = document.getElementById("layer1");

	var crop_ctx = canv.getContext('2d');
	var crop_img = document.getElementById('image');
	crop_ctx.drawImage(srccanv, ix,iy,width,height,0,0,width,height);
	crop_url = crop_ctx.canvas.toDataURL();
	// crop_image = document.createElement('img');
	// crop_image.src = crop_url
	// document.body.appendChild(crop_image)
	// Tesseract.recognize(crop_url).then(function(result)
	// {
	// ocr_obj = result
	// })
	console.log(crop_url)
}


function deactivate_canvas(field)
{
	active_canvas.className = "field_canv";
	var	clone = active_canvas.cloneNode();
	while (active_canvas.firstChild) 
	{
  		clone.appendChild(active_canvas.lastChild);
	}
	clone.getContext("2d").drawImage(active_canvas,0,0)
	active_canvas.parentNode.replaceChild(clone, active_canvas);
	active_field.canvas = clone;
	active_field = field

}


function activate_canvas(field) 
{
	deactivate_canvas(field);
	init_foreground(field);
}


// Creating a dict of fields/ data to be sent from backend
fields = {}

fields["amount"] = new field("Amount","(200,0,0)");
fields["Invoice_date"] = new field("Invoice_Date","(0,200,0)");
fields["vendor"] = new field("Vendor","(200,200,0)");
fields["due_date"]= new field("Due Date","(0,200,200)");
fields["terms"] = new field("Terms","(0,0,200)");

// activating a field
// active_field = fields["amount"];

window.addEventListener('load', function(event)
{
for (var key in fields)
	{
		fields[key].create_canvas()
		fields[key].create_button()
	}

	init_image();
	active_field = fields.amount
	init_foreground(fields.amount);	
});

