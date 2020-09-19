//Create variables here
var dog, happyDog, database, foodStock,dogImage;
var foodS = 0;
function preload()
{
  //load images here
  dogImage = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
	createCanvas(500,500);
  
  dog = createSprite(250,250,50,50);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  database = firebase.database();

  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

  
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    if(foodS !== null){
     writeStock(foodS);
      dog.addImage(happyDog);
    }
     }
     textSize(12);
     fill("white");
     text("Note : Press UP_ARROW Key to feed Pet",100,20);

     textSize(20);
     fill("white");
     text("Food Remaining :" + foodS,150,150)
  drawSprites();
  //add styles here

}

function readStock(data){ 
  foodS=data.val();
}


 function writeStock(x){
   if(x<=0){
     x=0;  
     } else {
     x=x-1;
     }

 database.ref('/').update({ 
   Food:x
 })
}

