import { Engine, Render, World, Bodies } from 'matter-js';
import { rocket } from './components/rocket'

// Set up physics engine
// create an engine
var engine = Engine.create();
// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        showVelocity: true,
        showAngleIndicator: true,
    }
});
// create a ground
var ground = Bodies.rectangle(400, 610, 800, 60, { isStatic: true });
// add all of the bodies to the world
World.add(engine.world, [rocket.body, ground]);



// run the simulation
(function run() {
    if (!rocket.destroyed) {
        if (rocket.takeOff) {
            rocket.fly()
        }

        Engine.update(engine, 1000 / 960);
        window.requestAnimationFrame(run);
    } else {
        World.remove(engine.world, rocket.body);
        alert("Puff!")
    }
})();

// run the renderer
Render.run(render);

// Events
document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
        rocket.takeOff = true;
    }
}