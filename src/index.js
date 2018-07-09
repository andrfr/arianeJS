import Matter from 'matter-js';
import $ from "jquery";

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
        showVelocity: true,
        showAngleIndicator: true,
    }
});

// create a rocket and a ground
var rocket = Bodies.rectangle(200, 555, 25, 50);
var ground = Bodies.rectangle(400, 610, 800, 60, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [rocket, ground]);

//$(window).on('click', function () {
//    // Body.setVelocity(rocket, {x: 1, y: -15});
//    rocket.angle = 5 * Math.PI / 180;
//    let angle = rocket.angle;
//    Body.applyForce(rocket, rocket.position, {
//        x: Math.sin(angle) * 0.1,
//        y: Math.cos(angle) * -0.1 
//    });
//});
// run the engine
//Engine.run(engine);

let shutdown = false;
function SRI(verticalVelocity, horizontalVelocity) {
    if (shutdown) {
        return -10101010;
    }
    try {
        let rocketAngle = rocket.angle;
        rocketAngle = radToDegree(rocketAngle);

        let horVel = (horizontalVelocity * 21479836470);
        horVel = horVel | 0;
        if (horVel < 0) {
            throw "FEHLER";
        }

        //Die Ursache war eine Variable, die aus Performance-Gründen nicht auf Bereichsüberschreitung kontrolliert wurde. Die Variable befand sich aber in einem ganzen Programmteil, der nicht mehr benötigt wurde und trotzdem ständig lief.
        //Es war also keine schlechtere Qualitätskontrolle nötig, um diese Fehler herbeizuführen. Die Qualitätskontrolle musste sich um immer mehr Funktionen in der Software kümmern, womit Fehler leichter durchkamen. Inzwischen hat sich in der Programmierung eine gewisse Askese durchgesetzt und die Testverfahren wurden verbessert.
        // => "smart enough"
        let vertVel = (verticalVelocity * 21479836470);



        let flightDirection = Matter.Vector.angle({ x: 0, y: 0 }, { x: horVel, y: vertVel }) + Math.PI / 2;
        flightDirection = radToDegree(flightDirection);

        // console.log(flightDirection - rocketAngle);
        // console.log('Flight Direction: ' + flightDirection);
        return flightDirection - rocketAngle;
    } catch (e) {
        shutdown = true;
    }
}


// gets angle offset returns nozzle deflection
let topAngle = 20 * Math.PI / 180;
let lowerAngle = 5 * Math.PI / 180;
var aimAngle = 25 * Math.PI / 180;

function OBC(offset) {
    if (offset > 20) {
        return "FULL LEFT";
    } else if (5 < offset && offset <= 20) {
        return "MEDIUM LEFT";
    } else if (-5 <= offset && offset <= 5) {
        return "STRAIGHT";
    } else if (-20 <= offset && offset < 5) {
        return "MEDIUM RIGHT";
    } else if (offset < -20) {
        return "FULL RIGHT";
    }
}

// react to nozzle deflection command 
function nozzles(command) {
    if (command == "MEDIUM LEFT") {
        Matter.Body.setAngularVelocity(rocket, 0.02);
    } else if (command == "FULL LEFT") {
        Matter.Body.setAngularVelocity(rocket, 0.04);
    } else if (command == "MEDIUM RIGHT") {
        Matter.Body.setAngularVelocity(rocket, -0.02);
    } else if (command == "FULL RIGHT") {
        Matter.Body.setAngularVelocity(rocket, -0.04);
    } else if (command == "STRAIGHT") {
        // Matter.Body.setAngularVelocity(rocket, 0);
    }
}

let takeOff = false;

function degreeToRad(degree) {
    return degree * Math.PI / 180;
}

function radToDegree(rad) {
    return rad / Math.PI * 180;
}
(function run() {
    window.requestAnimationFrame(run);

    let offset = SRI(rocket.velocity.y, rocket.velocity.x);
    if (takeOff) {



        if (rocket.position.y >= 550) {
            nozzles('STRAIGHT');
        } else if (rocket.position.y >= 547) {
            console.log('gravity init');
            nozzles("MEDIUM LEFT")
        } else {
            let command = OBC(offset);
            nozzles(command);
        }
        Matter.Body.applyForce(rocket, rocket.position, {
            x: Math.sin(rocket.angle) * 0.008,
            y: Math.cos(rocket.angle) * -0.008
        });
    }
    // console.log(rocket.velocity.x);
    // Engine.update(engine, 1000 / 60);
    Engine.update(engine, 1000 / 960);
})();

// run the renderer
Render.run(render);


document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
        console.log("TAKEOFF")
        takeOff = true;
    }
}