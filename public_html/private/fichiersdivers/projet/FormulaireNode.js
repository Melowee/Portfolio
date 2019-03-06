$( function() {
  $( "#draggable" ).draggable();
} );

var  clients = []; // Array [{ label : Value }]


function test(params) {
  document.getElementById('slidecontainer').style.display = 'block';
  document.getElementById('idNodeClick').innerHTML = params.nodes;
}

network.on("click", function (params) {
  test(params);
  var x = nodes[params.nodes].label;
  if (clients.includes(x)==false){
    var t = {[x]:params.nodes[0]};
    clients.push(t);
  }
});

// Display the default slider value
var slider = document.getElementById("myRange");
var output = document.getElementById("valueNodeClick");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}
