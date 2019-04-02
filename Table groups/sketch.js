
let names_ = ['apple', 'pear', 'orange', 'banana', 'iphone', 'android', 'burner', 'Nokia','Fitbit', 'watch', 'rolex', 'clock', 'laptop', 'desktop', 'pc', 'tablet']
let name_arr = random_sets(shuffle(names_)); // this is where the name array is randomized and set up as a 2D array for later

var squareButton;
var rectButton;
var vertButton;
var boxes = [];
var button;

function setup() {
    // createCanvas(displayWidth,displayHeight);
    createCanvas(windowWidth, windowHeight);

        boxes.push(new Box(windowWidth/4, windowHeight/4, 125, 125)); //bottom left
        boxes.push(new Box(windowWidth/4, (windowHeight/4)*3, 125, 125)); // top left
        boxes.push(new Box((windowWidth/4)*3, windowHeight/4, 125, 125)); // bottom right
        boxes.push(new Box((windowWidth/4)*3, (windowHeight/4)*3, 125, 125)); // top right

        button = createButton('randomize');
        button.position(10, 19);
        button.mousePressed(function(){name_arr = random_sets(shuffle(names_))});
        squareButton = createButton('New Square Table');
        squareButton.position(19, 19);
        squareButton.mousePressed(addNewSquareBox);
        rectButton = createButton('New Horizaontal Rectangle Table');
        rectButton.position(19, 40);
        rectButton.mousePressed(addNewRectBox);
        vertButton = createButton('New Vertical Rectangle Table');
        vertButton.position(19, 60 );
        vertButton.mousePressed(addNewVertRectBox);

}

function addNewSquareBox() {
  boxes.push(new Box(random(windowWidth), random(windowHeight), 125, 125));
}

function addNewRectBox() {
  boxes.push(new Box(random(windowWidth), random(windowHeight), 125, 62.5));
}

function addNewVertRectBox() {
  boxes.push(new Box(random(windowWidth), random(windowHeight), 62.5, 125));
}

function draw() {
    background(200, 200, 200); // background
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].show();
        boxes[i].text(name_arr[i%name_arr.length]); //

    }
}



function mousePressed() {
    for (var i = 0; i < boxes.length; i++) {
        //checking to see if the mouse is over the box and turning it white if it is
        if (boxes[i].boxover == true) {
            boxes[i].locked = true;
            print("mouse is pressed")
        } else {

            boxes[i].locked = false;
            print("mouse isn't pressed")
        }
        boxes[i].xoffset = mouseX - boxes[i].xpos;
        boxes[i].yoffset = mouseY - boxes[i].ypos
        print(boxes[i].locked);
    }
    return false;
}

function mouseDragged() {
    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].locked) {
            boxes[i].xpos = mouseX - boxes[i].xoffset;
            boxes[i].ypos = mouseY - boxes[i].yoffset;
        }
    }
}

function mouseReleased() {
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].locked = false;
    }
}

function Box(xpos, ypos, boxsizex, boxsizey) {

    this.xpos = xpos; // starting x
    this.ypos = ypos; // starting y
    this.boxsizex = boxsizex; // size of square
    this.boxsizey = boxsizey;
    this.boxover = false;
    this.locked = false;
    this.xoffset = 0;
    this.yoffset = 0;
    rectMode(RADIUS);


    this.show = function() {

        if (mouseX > this.xpos - this.boxsizex && mouseX < this.xpos + this.boxsizex &&
            mouseY > this.ypos - this.boxsizey && mouseY < this.ypos + this.boxsizey) {
            this.boxover = true;
              fill(121, 157, 216); //box color when mouse hovers
          //  fill(0); // color when dragged
          stroke(0, 0, 0); // color of border when dragged
          strokeWeight(3); // thickness of border when dragged

            if (mouseIsPressed && this.boxover == true) {
                fill(121, 157, 216);//box color when mouse preseed
                stroke(0, 0, 0); // color of border when dragged
                strokeWeight(3); // thickness of border when dragged
            } else {
              stroke(0, 0, 0); // color of border when dragged
              strokeWeight(3); // thickness of border when dragged
            }

        } else {
            this.boxover = false;
            noStroke();
            fill(121, 157, 216); // color of boxes when mouse not over box
        }
        rect(this.xpos, this.ypos, this.boxsizex, this.boxsizey, 7);

        stroke(2);
        strokeWeight(3);
        stroke(0,0,0)
        stroke

      //  var words = [ "apple", "bear", "cat", "dog" ];
      //  text(words[0],xpos+50,ypos+50);
    };

    this.text = function (text_arr) {
      push();
      strokeWeight(0);
      fill(0,0,0)
      text(text_arr[0], this.xpos-boxsizex-45, this.ypos);
      text(text_arr[1], this.xpos+boxsizex+5, this.ypos);
      text(text_arr[2], this.xpos-20, this.ypos-boxsizey-10);
      text(text_arr[3], this.xpos-20, this.ypos+boxsizey+15);
      pop();
    };

}

function shuffle(a) { // this just shuffles an array i got it off of Stack Overflow
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function random_sets(name_arr) { // name_arr is a normal array of strings ['s1', 's2'...]
    var master_arr = [];
    for (i = 0; i < name_arr.length; i+=4) { // this 4 is for the number of tables if you want to rewrite the function (please do)
        var temp = [];
        for (j = i; j < i+4; j++) { // only 4 ppl allowed per table
            temp.push(name_arr[j]);
        }
        master_arr.push(temp)
    } // this is a 2 dimensional for loop (used when you have to navigate or build a 2D array
    // this particular set of for loops is meant to build a 2D array
    return master_arr; // returns the 2D array (a 2D array is and array of arrays [[items],[more, items],...]
}// try writing your own version of this, what wrote is frankly not great (there is a story tho)
