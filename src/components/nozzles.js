import Matter from 'matter-js';

export let nozzles = {
    state: "STRAIGHT",
    setState: function (newState) {
        this.state = newState;
    },
    push: function (rocket) {
        if (this.state == "MEDIUM LEFT") {
            Matter.Body.setAngularVelocity(rocket, 0.02);
        } else if (this.state == "FULL LEFT") {
            Matter.Body.setAngularVelocity(rocket, 0.04);
        } else if (this.state == "MEDIUM RIGHT") {
            Matter.Body.setAngularVelocity(rocket, -0.02);
        } else if (this.state == "FULL RIGHT") {
            Matter.Body.setAngularVelocity(rocket, -0.04);
        } else if (this.state == "STRAIGHT") {
            // Matter.Body.setAngularVelocity(rocket, 0);
        }
        Matter.Body.applyForce(rocket, rocket.position, {
            x: Math.sin(rocket.angle) * 0.008,
            y: Math.cos(rocket.angle) * -0.008
        });

    }

}