var ix = 0;
var iy = 0;
var height = 0
var width = 0
var drawing = false;
var offset = $('#my_canvas').offset();

function rgb_to_rgba(rgb, a){
	
	if (a >= 1) { a = "1.0";}
	else if (a <= 0) { a = ".0"}
	else{a = String(Math.round(a*10)/10)}
	
	return "rgba"+ rgb.slice(0,-1) +","+ a + ")"}


class field {
  constructor(name, color) {
    this.name = name;
    this.value = '';
    this.coords = [0,0,0,0];
    this.color = color; // string inn the format of '(r,  g, b)'
    this.fill_alpha = .2; // value between 0 and 1
    this.stroke_alpha = .5; // value between 0 and 1
    this.fill_color = rgb_to_rgba(this.color, this.fill_alpha);
    this.border_color = rgb_to_rgba(this.color, this.stroke_alpha);
    this.text = " ";
  }


  update_color() {
  	this.fill_color = rgb_to_rgba(this.color, this.fill_alpha);
    this.border_color = rgb_to_rgba(this.color, this.stroke_alpha);
  }
}


function create_canvas(name) {
	var canvas_container = document.getElementById('canvas_container');
	var canvas = canvas_container.appendChild(document.createElement("canvas"));
	canvas.id = name;
	canvas.height = 550;
	canvas.width = 425;
	canvas.className = "field_canv";
	var canv_ctx = canvas.getContext("2d");
	// canv_ctx.fillRect(0,0,425,550);
	activate_canvas(document.getElementById("my_canvas"));
}

function activate_canvas(canvas) {
	canvas.style.zindex = 2;
}


/*creatint a dict of all fields*/
fields = {}

fields["amount"] = new field("Amount","(255,0,0)");
fields["date"] = new field("Date","(255,0,0)");
fields["vendor"] = new field("Vendor","(255,0,0)");
fields["due_date"]= new field("Due Date","(255,0,0)");
fields["terms"] = new field("Terms","(255,0,0)");


// activating a field





active_field = fields["amount"];

function init_foreground(){
    
	var ctx = document.getElementById('my_canvas').getContext('2d');
	// img = document.getElementById('image')
	// ctx.drawImage(img,200,200, 200, 200,200,200,200,200)	
	ctx.canvas.addEventListener("mousedown", function (event) {
		offset = $('#my_canvas').offset();
		drawing = true;
		ix = event.pageX-offset.left;
		iy = event.pageY- offset.top;
		// var status = document.getElementById("status");
		// status.innerHTML = '('+ix+ " , " +iy+')';	
	});


	ctx.canvas.addEventListener("mousemove", function (event) {
		if (drawing == true) {
		var mousex = event.pageX-offset.left;
		var mousey = event.pageY-offset.top;
		var status = document.getElementById("status");
		width = mousex - ix;
		height = mousey - iy;
		// status.innerHTML = '('+ix+','+iy+'),('+mousex+ " , " +mousey+')' + width + " " + height;
		

		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
		ctx.strokeStyle="rgba(200, 0, 0, 0.5)";
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
		ctx.strokeStyle="rgba(200, 0, 0, 0.7)";
    	ctx.fillStyle = "rgba(200, 0, 0, 0.1)";
		ctx.strokeRect(ix,iy,width,height);
    	ctx.fillRect(ix,iy,width,height);;
    	// active_field.coords = [ix,iy,width,height];
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
	// document.getElementById('my_canvas').getContext('2d').save()
	
	for (var key in fields){
		create_canvas(fields[key].name)
}
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

$(function () {
    $('.button-checkbox').each(function () {

        // Settings
        var $widget = $(this),
            $button = $widget.find('button'),
            $checkbox = $widget.find('input:checkbox'),
            color = $button.data('color'),
            settings = {
                on: {
                    icon: 'glyphicon glyphicon-check'
                },
                off: {
                    icon: 'fa fa-square-o'
                }
            };

        // Event Handlers
        $button.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $button.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $button.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$button.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $button
                    .removeClass('btn-default')
                    .addClass('btn-' + color + ' active');
            }
            else {
                $button
                    .removeClass('btn-' + color + ' active')
                    .addClass('btn-default');
            }
        }

        // Initialization
        function init() {

            updateDisplay();

            // Inject the icon if applicable
            if ($button.find('.state-icon').length == 0) {
                $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i> ');
            }
        }
        init();
    });
});