song_1 = "";
song_2 = "";
song1_status = "";
song2_status = "";
rightwristx = 0;
rightwristy = 0;
leftwristx = 0;
leftwristy = 0;
leftwristscore = 0;
rightwristscore = 0;
statussong = "";

function preload() {
    song_1 = loadSound("1.mp3");
    song_2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(500 , 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function modelLoaded() {
    console.log("poseNet is initialized!");
}

function gotPoses(results) {
    if (results.length > 0)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        leftwristscore = results[0].pose.keypoints[9].score;
        console.log("leftwristscore =" + leftwristscore + "rightwristscore = " +rightwristscore);
        rightwristscore = results[0].pose.keypoints[10].score;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

function draw() {
    image(video , 0 , 0 , 500 , 400);
    song1_status = song_1.isPlaying();
    song2_status = song_2.isPlaying();
    stroke(red);
    fill(red);

    if (leftwristscore > 0.2) 
    {
        circle(leftwristX , leftwristy , 20);
        song_1.stop();

        if(song2_status == false)
        {
            song_2.play()
            document.getElementById("song").innerHTML = "Playing- Peter Pan song"
        }
    }

    if (rightwristscore > 0.2) 
    {
        circle(rightwristX , rightwristy , 20);
        song_1.stop();

        if(song2_status == false)
        {
            song_2.play()
            document.getElementById("song").innerHTML = "Playing- Peter Pan song"
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}