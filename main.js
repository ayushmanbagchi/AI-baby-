img = "";
status = "";
objects = [];

function preload() {
    img = loadImage("dog_cat.jpg");

}

function setup() {
    canvas = createCanvas(380,360);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,360);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
   
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw() {
    image(video, 0, 0, 380, 360);
    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_object").innerHTML = "number of Object Detected"+objects.length;
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }


}

function modelLoaded() {
    console.log("modelLoaded");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);

    }
    console.log(results);
    objects = results;
}