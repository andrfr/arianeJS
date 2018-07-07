import Matter from 'matter-js';
import $ from "jquery";
console.log('laber');

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
    }
});

// create a rocket and a ground
var rocket = Bodies.rectangle(500, 200, 80, 80);
var ground = Bodies.rectangle(400, 610, 800, 60, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [rocket, ground]);

$(window).on('click', function () {
    // Body.setVelocity(rocket, {x: 1, y: -15});
    rocket.angle = 5 * Math.PI / 180;
    let angle = rocket.angle;
    Body.applyForce(rocket, rocket.position, {
        x: Math.sin(angle) * 0.1,
        y: Math.cos(angle) * -0.1 
    });
});
// run the engine
//Engine.run(engine);

(function run() {
    window.requestAnimationFrame(run); 

    let angle = rocket.angle;
    // Body.applyForce(rocket, rocket.position, {
        // 
    // });
    console.log(rocket.velocity);
    Engine.update(engine, 1000 / 60);
})();

// run the renderer
Render.run(render);