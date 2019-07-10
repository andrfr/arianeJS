import Matter from 'matter-js';
function radToDegree(rad) {
    let degree = rad / Math.PI * 180;
    return degree;
}
export let SRI = {
    shutdown: false,
    calculateOffset: function (verticalVelocity, horizontalVelocity, rocketAngle) {
        if (this.shutdown) {
            return -10101010;
        }
        try {
            //TODO: sensors should send angle info
            // let rocketAngle = this.rocket.angle;
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


            //TODO: would be nice, if this calculation comes from the sensors
            let flightDirection = Matter.Vector.angle({ x: 0, y: 0 }, { x: horVel, y: vertVel }) + Math.PI / 2;
            flightDirection = radToDegree(flightDirection);

            let offset = flightDirection - rocketAngle;

            return offset;
        } catch (e) {
            this.shutdown = true;
        }

    }
}


