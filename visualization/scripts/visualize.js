
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
var w=400
var h=1200;
var min_x_position;
var min_y_position;
var max_x_position;
var max_y_position;
var sensors = [];
var pos_x = [];
var pos_y = [];
var done = false;

function setup() {
  createCanvas(w, h);
  current = createVector(0,0);
  previous = createVector(0,0);
  let url = "../parsed_loc.json"
  loadJSON(url,loadData);

};
function loadData(data){
    console.log("loading data")
    console.log("data length" + data.length,'jsonp');
    positions = data;
    for(var i=0; i<data.length;i++){
        pos_x.push(data[i].x);
        pos_y.push(data[i].y);
        console.log("positions[" + i + "].x:" + positions[i].x);
        sensors.push(data[i].Sensor);
    }
    done = true;
    if(done==true){
        getMinMax();
    }
}
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
function getMinMax(){
    console.log("getting min and max position")
    min_x_position = min(pos_x);
    max_x_position = max(pos_x);
    min_y_position = min(pos_y);
    max_y_position = max(pos_y);
    console.log("min x:" + min_x_position);
    console.log("min y:" + min_y_position);
    console.log("max x:" + max_x_position);
    console.log("max y:" + max_y_position);
    sensors = sensors.filter( onlyUnique );
    console.log(sensors)
}
function draw() {
    background(200);
    if(done){
        //console.log("positions["+count+"].x="+positions[count].x+", positions["+count+"].y="+positions[count].y);
        fill(0,0,0)
        for(var x = 0; x<sensors.length;x++)
        {
            if(positions[count].Sensor == sensors[x]){
                //console.log(positions[count].Sensor)
                fill(x*10,0,x*100);
                ellipse(map(positions[count].x,min_x_position,max_x_position,0,w), map(positions[count].y,min_y_position,max_y_position,0,h),30);
            }
        }

        count = count + 1;

        
        if(count >= positions.length){
            count = 0;
        }
    }
}