const Engine = Matter.Engine;
const Composite= Matter.Composite;
const Bodies = Matter.Bodies;

var engine, world;
var particles = [];
var ground, player, backgroundImg;
var playerLife = 0;

function preload() {
    backgroundImg = loadImage("./images/bg1.jpg");
}

function setup() {
    canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;
    ground = new Ground(width/2, 390, width, 20);
    player = new Player(width/2, height-20, 100, 60);
}

function draw() {
    background(backgroundImg);
    Engine.update(engine);
    //score
    textSize(25)
    fill("white")
    text("Player Lifetime: " + playerLife, width-250, 50);
    playerLife = Math.round(frameCount/10);

    if(frameCount % 30 == 0){
        newParticle();
    }
    for(var i=0;i<particles.length;i++){
        particles[i].display();
        //remove particles that reaches ground
        if(particles[i].body.position.y > 370) {
            Matter.World.remove(world, particles[i].body);
            particles.splice(i,1);
        }
    }
    ground.display();
    player.display();
}

function newParticle() {
    var xPos = random(10, width-10);
    var radius = random(5, 10);
    var p = new Particle(xPos, 0, radius);
    particles.push(p);
}
