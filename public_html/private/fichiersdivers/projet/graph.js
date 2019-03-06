
var nodes = [];
var edges = [];
var jsonIssues = {};
var data = {nodes:nodes,edges:edges};
var options = {
  nodes:{
    color: {
      border: '#0f9854',
      background: '#17af97'
    },
    font:{
      color: 'yellow',
      size:20
    }
  },
  interaction:{
    dragNodes:false
  }
};

// parametre_fixes into js array (jsonIssues)

$.ajax({
    url: "./parametre_fixes.json",
    async: false,
    dataType: 'json',
    success: function(value) {
        jsonIssues = value;
        console.log(jsonIssues);
    }
});

/*
var request = new XMLHttpRequest();
request.open('GET', '../parametre_fixes.json');
request.responseType = 'json';
request.send();

request.onload = function() {
  var jsonIssues = request.response;
  console.log(request.response);
}
*/
// add nodes according to C.
function addNodes(){
  nodes.push({
    id:"d",
    label:"dépôt",
    x:150,
    y:150,
  });
  for (var i=1;i<jsonIssues.C+1;i++){
    nodes.push({
      id:i,
      label:"d_"+`${i}`,
      x:500,
      y:300
    });
  }
}

//return the x,y positions of the node.
function getPos(str){
  return network.getPositions(str);
}

function init(){
  addNodes();
  var container = document.getElementById('network');
  network = new vis.Network(container, data, options);
}

init();
