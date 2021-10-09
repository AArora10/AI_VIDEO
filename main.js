video = "";
status = "";
objects = [];

function preload(){
    video = createVideo('video.mp4');
    


}
function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    video.hide();
}

function draw(){

    image(video , 0,0, 480 , 380);

    if (status != ""){
        object_detector.detect( video , gotResult);

        for ( i = 0; i < objects.length; i++){

            document.getElementById("h2").innerHTML = "status : objects detected";
            document.getElementById("label").innerHTML = "number of objects detetcted :" + objects.legnth;

            fill("pink");
            confidence = floor(objects[i].confidence * 100);
            text( objects[i].label + "  " + confidence + "%", objects[i].x + 15 , objects[i].y) + 15;
            noFill();
            stroke("black");
            rect( objects[i].x , objects[i].y , objects[i].width , objects[i].height);



        }
    }

}

function start(){
    object_detector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("h2").innerHTML = "status : detecting objects";


}

function modelLoaded(){
    console.log ("model loaded")
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult( results, error){
    if(error){
        console.log (error);
    }
    else{
        console.log (results);
        objects = results;
    }
}