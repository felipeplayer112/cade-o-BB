song = "";
objects = [];
status = "";

function preload() {
    song = loadSound("alarm.mp3");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Detectando objetos.";
}

function modelLoaded() {
    console.log("modelo carregado");
    status = true;
}

function gotResult(results, error) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "objetos detectados";
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (object[i].label == "person") {
                document.getElementById("numberOfObjects").innerHTML = "BB encontrado";
                console.log("O BB esta ali");
                song.stop();
            }
        }
        if (objects.length == 0) {
            document.getElementById("numberOfObjects").innerHTML = "Não achei o BB";
            console.log("O BB não esta ali");
            song.play();
        }
    }
}