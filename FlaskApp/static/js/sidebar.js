    
	/*Menu-toggle*/
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("active");
    offset = $('#my_canvas').offset();
  
});