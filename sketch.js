let classifier;
let sentences;
let label = ' ';
let img;
let title;
let date;
let sec = 0;
let soundModel = 
'https://teachablemachine.withgoogle.com/models/zJ6Epklry/';

function preload() {
  classifier = ml5.soundClassifier(soundModel + 'model.json');
  txtStorm = loadStrings("storm.txt");
  txtSun = loadStrings("sun.txt");
  txtRain = loadStrings("rain.txt");
  txtSnow = loadStrings("snow.txt");
  txtLow = loadStrings("low.txt");
  txtHurricane = loadStrings("hurricane.txt");
  txtPollution = loadStrings("pollution.txt");
  txtTyphoon = loadStrings("typhoon.txt");
  
  imgStorm = loadImage("storm.jpg");
  imgSun = loadImage("drought.jpg");
  imgRain = loadImage("rain.jpg");
  imgSnow = loadImage("snow.jpg");
  imgLow = loadImage("low.jpg");
  imgHurricane = loadImage("hurricane.jpg");
  imgPollution = loadImage("pollution.jpg");
  imgTyphoon = loadImage("tornado.jpg");
  
}

function setup() {
  frameRate(1);
  createCanvas(1000, 2000);
  classifier.classify(gotResult);
  rm = RiTa.markov(4);
}

function draw() {
  background(250);
  textFont('times');
  textAlign(LEFT, TOP);
  imageMode(CENTER);
  
  if(label == 'Background Noise'){
    textSize(12);
    textAlign(CENTER);
    text(' ', width / 2, 600); 
  }
  else if(label == 'sunny' || label == 'cloudy' ){
    rm.addText(txtSun);
    sentences = rm.generate(25);
    img = imgSun;
    title = 'Extreme drought threatening parts of the Prairies, says Agriculture Canada'; 
    date = '2020/07/' + floor(random(2, 30));
    sec = 0;
  }
  else if(label == 'rainy' || label == 'overcast' ){
    rm.addText(txtRain);
    sentences = rm.generate(25);
    img = imgRain;
    title = 'Heavy rains lead to rescues, road closures in Appalachia';
    date = '2020/03/' + floor(random(2, 30));
    sec = 0;
  }
  else if(label == 'snowy'){
    rm.addText(txtSnow);
    sentences = rm.generate(25);
    img = imgSnow;
    title = 'Winter storm prompts closures, cancellations across Nova Scotia'; 
    date = '2020/01/' + floor(random(2, 30));
    sec = 0;
  }
  else if(label == 'stormy' || label == 'thunder' ){
    rm.addText(txtStorm);
    sentences = rm.generate(25);
    im = imgStorm;
    title = 'First severe storm of the season brings hail, lightning to central Alberta'; 
    date = '2020/06/' + floor(random(2, 30));
    sec = 0;
  }
  else if(label == 'tornado' || label == 'hurricane' ){
    rm.addText(txtHurricane);
    sentences = rm.generate(25);
    img = imgHurricane;
    title = 'Hurricanes leave Hondurans homeless and destitute'; 
    date = '2020/08/' + floor(random(2, 30));
    sec = 0;
  }
  else if(label == 'sandstorm' ){
    rm.addText(txtPollution);
    sentences = rm.generate(25);
    img = imgPollution;
    title = 'Apocalyptic skies as Beijing hit by worst sandstorm in a decade';
    date = '2020/04/' + floor(random(2, 30));
    sec = 0;
  }
  else if(label == 'typhoon' ){
    rm.addText(txtTyphoon);
    sentences = rm.generate(25);
    img = imgTyphoon;
    title = '1 dead, 100,000 displaced as typhoon blows near Philippines';
    date = '2020/07/' + floor(random(2, 30));
    sec = 0;
  }
  else if(label == 'drizzle' || 'fog' ){
    rm.addText(txtLow);
    sentences = rm.generate(25);
    img = imgLow;
    title = 'Freezing drizzle advisory in effect as roads and sidewalks become icy: Environment Canada';
    date = '2020/12/' + floor(random(2, 30));
    sec = 0;
  }
  else if(label == 'loading...'){
    text(' ', 0, 0);
  }
  console.log(img.name);
  
  fill(50);  
  textSize(32);
  textAlign(LEFT, TOP);
  text(title, 120, 500, 750, 800);
  
  fill(100);
  textSize(12);
  textAlign(LEFT, TOP);
  text(date, 120, 600);
  image(img, width/2, 200, 800, 500);
  fill(100);
  textSize(18);
  textLeading(36);
  text('       ' + sentences, 120, 650, 750, height);
  
  
  for (let i = 0; i < 36 - sec; i++){
    fill(250);
    noStroke();
    rect(100, (36 - i) * 36 + 614, 800, 34);
  }  
  sec ++;
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  else{
    let confidence = results[0].confidence;
    if(confidence > 0.75){
      label = results[0].label;
    }
  }
}
