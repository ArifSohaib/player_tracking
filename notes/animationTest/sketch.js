x = 0.0
y = 3.0
z = 0;
height = 1280
width = 720
xspeed = 3
yspeed = 3
zspeed = 0.1
function setup(){
    //put setup code here
    createCanvas(1280,720)
}

function draw(){
    //put drawing code here
    if(x > width || x < 0){
        xspeed = xspeed * -1;
    }
    if(y > height || y < 0){
        yspeed = yspeed * -1;
    }
    if(z > 2*3.142 || z < 0){
        zspeed = zspeed * -1;
    }
    x += xspeed
    y += yspeed
    z += zspeed
    ellipse(x, y,50,50,z)
    background(255)
    stroke(0)
    strokeWeight(10)
    ellipse(x,y,50,50)
    
}