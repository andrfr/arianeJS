import { SRI } from './sri'
import { OBC } from './obc'
import { nozzles } from './nozzles'
import { Bodies } from 'matter-js';

export let rocket = {
    body: Bodies.rectangle(200, 555, 25, 50),

    takeOff: false,

    destroyed: false,
    fly: function() {
        if (!this.destroyed && this.takeOff) {
            // Safety check, destroy if the angle is dangerous
            if (this.body.angle < -3) {
                this.destroyed = true;
                return;
            }
            let offset = SRI.calculateOffset(rocket.body.velocity.y, rocket.body.velocity.x, rocket.body.angle);
            let command = OBC.flightProgram(offset, rocket.body.position.y);

            nozzles.setState(command);
            nozzles.push(rocket.body);
        }
    }
}