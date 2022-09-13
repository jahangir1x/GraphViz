const normal_point_color = "rgb(0, 164, 255)";
const marked_point_color = "rgb(0, 0, 0)";
const visited_point_color = "rgb(0, 186, 3)";
var isLeftDown = false;
var isRightDown = false;
var total_row = 10;
var total_col = 10;
var point_width = 0.5;
var point_height = 0.5;
var steps = [];


const pathSVG = document.getElementById("path");
var points = Array.from(Array(total_row), () => new Array(total_col));

for (let row = 0; row < total_row; row++) {
    for (let col = 0; col < total_col; col++) {
        pathSVG.innerHTML += `<rect class="point" id="point_${row}_${col}" width="${point_width}" height="${point_height}" x="${point_width * row}" y="${point_height * col}" />`
    }
}

document.getElementById("start-traverse-btn").addEventListener("click", startTraverse);

function startTraverse() {
    console.log("traverse");
    let visited = new Set();
    let source = [1, 1];
    const queue = [source];
    while (queue.length > 0) {
        const current = queue.shift();

        let identical = false;
        for (let item of visited) {
            if (item.every((val, idx) => val === current[idx])) {
                identical = true;
                break;
            }
        }
        if (identical) {
            continue;
        }
        visited.add(current);

        console.log(current);
        steps.push(current);

        const neighbors = [];
        if (current[0] - 1 >= 0) {
            neighbors.push([current[0] - 1, current[1]]);
        }
        if (current[1] - 1 >= 0) {
            neighbors.push([current[0], current[1] - 1]);
        }


        if (current[0] + 1 < total_row) {
            neighbors.push([current[0] + 1, current[1]])
        }
        if (current[1] + 1 < total_col) {
            neighbors.push([current[0], current[1] + 1]);
        }

        for (let neighbor of neighbors) {
            queue.push(neighbor);
        }
    }
    visualizeGraph();
}

var intervalObject;

function visualizeGraph() {
    intervalObject = setInterval(() => {
        if (steps.length > 0) {
            const current = steps.shift();
            points[current[0]][current[1]].style.fill = visited_point_color;
        } else {
            clearInterval(intervalObject);
        }
    }, 500);
}

document.onmousedown = (eventData) => {
    switch (eventData.button) {
        case 0: isLeftDown = true; break;
        case 2: isRightDown = true; break;
    }
}

document.onmouseup = (eventData) => {
    switch (eventData.button) {
        case 0: isLeftDown = false; break;
        case 2: isRightDown = false; break;
    }
}

// document.addEventListener('mousedown', () => {
//     console.log("mousedown");
//     isDown = true;
// });

// document.addEventListener('mouseup', () => {
//     console.log("mouseup");
//     isDown = false;
// });

for (let row = 0; row < total_row; row++) {
    for (let col = 0; col < total_col; col++) {
        points[row][col] = document.getElementById(`point_${row}_${col}`);
        points[row][col].style.fill = normal_point_color;
        points[row][col].addEventListener('mouseover', () => {
            if (isLeftDown) {
                // if (points[row][col].style.fill == marked_point_color) {
                // points[row][col].style.fill = normal_point_color;
                // } else {
                points[row][col].style.fill = marked_point_color;
                // }
            }
            if (isRightDown) {
                points[row][col].style.fill = normal_point_color;
            }
        });

        points[row][col].onmousedown = (eventData) => {
            switch (eventData.button) {
                case 0: points[row][col].style.fill = marked_point_color; break;
                case 2: points[row][col].style.fill = normal_point_color; break;
            }
            // if (points[row][col].style.fill == marked_point_color) {
            //     points[row][col].style.fill = normal_point_color;
            // } else {
            // }
        }
    }
}

document.addEventListener('contextmenu', event => event.preventDefault());

/*

points[1].getAttribute('fill')



*/
