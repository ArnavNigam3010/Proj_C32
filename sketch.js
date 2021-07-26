const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var backgroundImg;
var hour;



function preload() {
    getBackgroundImg();
    bg = "sunrise.png";
}

function setup(){
    var canvas = createCanvas(1200,700);
    engine = Engine.create();
    world = engine.world;

}

function draw(){
    if(backgroundImg)
        background(backgroundImg);

    Engine.update(engine);

    fill("black");
    textSize(30);
    
    if(hour>=12){
        text("Time : "+ hour%12 + " PM", 50,100);
    }else if(hour==0){
        text("Time : 12 AM",100,100);
    }else{
        text("Time : "+ hour%12 + " AM", 50,100);
    }

}

async function getBackgroundImg(){

    // write code to fetch time from API
    time_t = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
 
    //change the data in JSON format and store it in variable responseJSON
    responseJSON = await time_t.json();

    
    //fetch datetime from responseJSON
    time_r = responseJSON.datetime;
    

    // slice the datetime to extract hour
    hour = time_r.slice(11,13);

    
    if(hour>=0 && hour<18 ){
        bg = "sunrise.png";
    }
    else{
        bg="sunset.png"
    }
    
    backgroundImg = loadImage(bg);
}
