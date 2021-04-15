video="";
status="";
objects=[];
function preload(){
    video=createVideo("video.mp4");
    video.hide();
}
function setup(){
    canvas=createCanvas(640,480);
    canvas.center();
}
function start(){
    object_identifier=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}
function modelLoaded(){
    console.log("Model is Loaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function draw(){
    image(video,0,0,640,480);
    if(status!=""){
        object_identifier.detect(video,gotResult);
        for(var i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status:Detected Objects";
            document.getElementById("num").innerHTML="Number of Objects Detected "+objects.length;
            percent=floor(objects[i].confidence*100);
            fill("gold");
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("darkcyan");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}