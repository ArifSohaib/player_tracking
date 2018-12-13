
// All the paths
var paths = [];
// Are we painting?
var painting = false;
// How long until the next circle
var next = 0;
// Where are we now and where were we?
var current;
var previous;
var count = 0;
var positions;
var min_x_position=Number.MAX_SAFE_INTEGER;
var min_y_position=Number.MAX_SAFE_INTEGER;
var max_x_position=Number.MIN_SAFE_INTEGER;
var max_y_position=Number.MAX_SAFE_INTEGER;
var done = false;

function setup() {
  createCanvas(720, 400);
  current = createVector(0,0);
  previous = createVector(0,0);
  let url = "http://localhost:8000/parsed_loc.json"
  loadJSON(url,loadData);
  console.log(positions)
};
function loadData(data){
    console.log("loading data")
    positions = data;
    for(var i; i<positions.length;i++){
        if(positions[i].x>max_x_position){
            max_x_position = positions[i].x;
        }
        if(positions[i].x<min_x_position){
            min_x_position = positions[i].x;
        }
        if(positions[i].y>max_y_position){
            max_y_position = positions[i].y;
        }
        if(positions[i].y<min_y_position){
            min_y_position = positions[i].y;
        }
    }
    done = true;
}


function draw() {
    background(200);
    if(done){
        console.log("positions["+count+"].x="+positions[count].x+", positions["+count+"].y="+positions[count].y);
        fill(0,0,0)
        if(positions[count].Sensor == "0724"){
            //console.log(positions[count].Sensor)
            fill(0,0,255);
            ellipse(map(positions[count].x,0,9999,0,400), map(positions[count].y,0,9999,0,720),50);
        }
        if(positions[count].Sensor == "8B86"){
            //console.log(positions[count].Sensor)
            fill(0,255,0);
            ellipse(map(positions[count].x,0,9999,0,400), map(positions[count].y,0,9999,0,720),50);
        }
        count = count + 1;

        
        if(count >= positions.length){
            count = 0;
        }
    }
}