var canvas, stage;
var images;
var picArray;
var currentImage;
var index;
var fadeTime;
var logo;
var applies;

function init() {
    canvas = document.getElementById("Canvas");
    //check to see if we are running in a browser with touch support
    stage = new createjs.Stage(canvas);
    createjs.Ticker.setFPS(31);
    createjs.Ticker.addEventListener("tick", tick);
    index = 1;
    images = images || [];
    var manifest = [{
            src: "./images/join.png",
            id: "join"
        },
        {
            src: "./images/mns.png",
            id: "mns"
        },
        {
            src: "./images/samsung.png",
            id: "samsung"
        },
        {
            src: "./images/choose.png",
            id: "choose"
        },
        {
            src: "./images/sky.png",
            id: "logo"
        },
        {
            src: "./images/stamp.png",
            id: "stamp"
        },
        {
            src: "./images/applies.png",
            id: "applies"
        },
        {
            src: "./images/button.png",
            id: "button"
        },
        {
            src: "./images/year.png",
            id: "year"
        },
        {
            src: "./images/when.png",
            id: "when"
        },
        {
            src: "./images/offer.png",
            id: "offer"
        },
        {
            src: "./images/rental.png",
            id: "rental"
        }


    ]
    queue = new createjs.LoadQueue(false);
    queue.onFileLoad = handleFileLoad;
    queue.onComplete = handleComplete;
    queue.loadManifest(manifest);


}

function handleFileLoad(event) {
    var item = event.item;
    if (item.type == createjs.LoadQueue.IMAGE) {
        images.push(event.result);
    }
}


function handleComplete(event) {
    frame1 = new createjs.Container();
    frame2 = new createjs.Container();
    frame3 = new createjs.Container();
    picArray = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for (var i = 0; i < 3; i++) { //frames
        var bmp = new createjs.Bitmap(images[i]);
        picArray.push(bmp);
    }

    logo = new createjs.Bitmap(queue.getResult("logo"));
    logo.x = 20;
    logo.y = 208;

    mns = new createjs.Bitmap(queue.getResult("mns"));
    mns.x = 163;
    mns.y = 115;
    mns.alpha = 1;

    samsung = new createjs.Bitmap(queue.getResult("samsung"));
    samsung.x = 56;
    samsung.y = 115;
    samsung.alpha = 1;

    choose = new createjs.Bitmap(queue.getResult("choose"));
    choose.x = 56;
    choose.y = 20;

    image2 = new createjs.Bitmap(queue.getResult("image2"));
    image2.x = 63;
    image2.y = 65;

    join = new createjs.Bitmap(queue.getResult("join"));
    join.x = 42;
    join.y = 27;


    stamp = new createjs.Bitmap(queue.getResult("stamp"));
    stamp.x = 63;
    stamp.y = 0;

    applies = new createjs.Bitmap(queue.getResult("applies"));
    applies.x = 126;
    applies.y = 220;

    button = new createjs.Bitmap(queue.getResult("button"));
    button.x = 146;
    button.y = 203;
    button.alpha = 0;
    
    year = new createjs.Bitmap(queue.getResult("year"));
    year.x = 10;
    year.y = 32;
    year.alpha = 0;
    
    when = new createjs.Bitmap(queue.getResult("when"));
    when.x = 41;
    when.y = 88;
    when.alpha = 0;
    
    offer = new createjs.Bitmap(queue.getResult("offer"));
    offer.x = 76;
    offer.y = 141;
    offer.alpha = 0;
    
    rental = new createjs.Bitmap(queue.getResult("rental"));
    rental.x = 84;
    rental.y = 181;
    rental.alpha = 0;
    
    
    createjs.Tween.get(button)
        .wait(10000)
    .to({alpha:1, visible:true}, 1)
    
    button.addEventListener("click", function(event) {alert("clicked");})
    
    createjs.Tween.get(year)
        .wait(10000)
    .to({alpha:1, visible:true}, 1000)
    
    createjs.Tween.get(when)
        .wait(10000)
    .to({alpha:1, visible:true}, 3000)
    
    createjs.Tween.get(offer)
        .wait(10000)
    .to({alpha:1, visible:true}, 5000)
    
    createjs.Tween.get(rental)
        .wait(10000)
    .to({alpha:1, visible:true}, 6000)



    fadeTime = 5;
    frame1.addChild(choose);
    frame2.addChild(stamp, join, applies);
    frame3.addChild(button, year, when, offer, rental);
    frame1.alpha = frame2.alpha = 0;
    currentImage = frame1;
    stage.addChild(frame1, frame2, frame3);
    stage.addChild(logo, mns, samsung);
    createjs.Tween.get(currentImage).wait(1000).to({
        alpha: 1
    }, 2000);
    createjs.Tween.get(stamp).wait(6000).call(bounce, {});

    createjs.Tween.get(this, {
        loop: false
    }).wait(fadeTime * 1000).call(fade, {}, this);

}

function fadeKill(tween) {
    currentImage.removeAllChildren();


}

function fade() {
    createjs.Tween.get((currentImage == frame1) ? frame2 : frame1).to({
        alpha: 1
    }, 5000);
    createjs.Tween.get((currentImage == frame1) ? frame1 : frame2).to({
        alpha: 0
    }, 500).call(fadeKill, {}, this);
    
    createjs.Tween.get(samsung).to({
        alpha: 0
    }, 1000).call(fadeKill);
    createjs.Tween.get(mns).to({
        alpha: 0
    }, 1000).call(fadeKill);
    createjs.Tween.get(applies).wait(3000).to({
        alpha: 0
    }, 2000).call(fadeKill);
    createjs.Tween.get(stamp).wait(3000).to({
        alpha: 0
    }, 2000).call(fadeKill);
    createjs.Tween.get(join).wait(3000).to({
        alpha: 0
    }, 2000).call(fadeKill);


};

function bounce() {
    createjs.Tween.get(stamp, {
            loop: false
        })
        .to({
            x: stamp.x,
            y: +60,
            rotation: 0
        }, 1500, createjs.Ease.bounceOut)
        .wait(3000).call(fadeKill);

    stage.addChild(stamp);
}


function tick() {
    stage.update();
}