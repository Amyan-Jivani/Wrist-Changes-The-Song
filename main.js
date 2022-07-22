rightwristx=0;
leftwristx=0;
rightwristy=0;
leftwristy=0;

leftwrist_score=0;
rightWrist_score=0;

songstatus="";
songstatusr="";

Music1="music.mp3";
Music2="music2.mp3";

function preload(){
    Music1 = loadSound("music.mp3");
    Music2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("Congrats, The Model Has Successfully Loaded");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightwristx + "Right Wrist Y = " + rightwristy);
       
        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftwristx + "Left Wrist Y = " + leftwristy);

        leftwrist_score = results[0].pose.keypoints[9].score;
        console.log("Left wrist score = " + leftwrist_score);
        rightWrist_score = results[0].pose.keypoints[10].score;
        console.log("Right wrist score = " + rightWrist_score);

    }
}

function draw(){
    image(video, 0, 0, 600, 500);
    
    songstatusr = Music1.isPlaying();
    if(rightWrist_score>0.2){
        Music2.stop();
        fill("green");
        stroke("green");
        circle(rightwristx, rightwristy, 20);
        
    }

    if(songstatusr==false){
        
        Music1.play();
        document.getElementById("song_name").innerHTML = "Song = Left Hand Wrist - Peter Pan Song"; 
    }
    songstatus = Music2.isPlaying();
    if(leftwrist_score>0.2){
        Music1.stop();
        fill("red");
        stroke("red");
        circle(leftwristx, leftwristy, 20);

    }
 
    if(songstatus==false){
     
        Music2.play();
        document.getElementById("song_name").innerHTML = "Song = Right Hand Wrist - Harry Potter Theme Song Song"; 
    }

}