export let OBC = {
    flightProgram: function (offset, height) {

        console.log(offset);
        
        if (height >= 550) {
            return "STRAIGHT";
        } else if (height >= 547) {
            return "MEDIUM LEFT";
        } else if (offset > 20) {
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
}