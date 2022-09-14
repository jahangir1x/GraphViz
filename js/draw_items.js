const normal_point_color = "rgb(0, 164, 255)";
const marked_point_color = "rgb(0, 0, 0)";
const visited_point_color = "rgb(0, 186, 3)";
var isLeftMouseDown = false;
var isRightMouseDown = false;
var totalRow = 20;
var totalCol = 20;
var pointWidth = 0.5;
var pointHeight = 0.5;
var traverseSpeed = 100;
var points;
var intervalObject = undefined;

document.getElementById("start-traverse-btn").addEventListener("click", startTraverse);
document.getElementById("stop-traverse-btn").addEventListener("click", stopTraverse);
document.getElementById("reset-graph-btn").addEventListener("click", resetGraph);
document.getElementById("row-text").addEventListener("input", updateGraph);
document.getElementById("col-text").addEventListener("input", updateGraph);
document.getElementById("speed-text").addEventListener("input", updateSpeed);

updateGraph();

function updateSpeed() {
    const speed_input_dom = document.querySelector("#speed-text");
    const speed_input = Number(speed_input_dom.value);

    if (speed_input < 0) {
        speed_input_dom.value = 0;
        traverseSpeed = 0;
    } else {
        traverseSpeed = speed_input;
    }
}

function updateGraph() {
    stopTraverse();
    const row_input_dom = document.querySelector("#row-text");
    const row_input = Number(row_input_dom.value);
    if (row_input < 0) {
        row_input_dom.value = 0;
        totalRow = 0;
    } else {
        totalRow = row_input;
    }

    const col_input_dom = document.querySelector("#col-text");
    const col_input = Number(col_input_dom.value);
    if (col_input < 0) {
        col_input_dom.value = 0;
        totalCol = 0;
    } else {
        totalCol = col_input;
    }

    const pathSVG = document.getElementById("path");
    pathSVG.setAttribute("viewBox", `0 0 ${totalRow / 2} ${totalCol / 2}`);

    drawGraph();
}

function drawGraph() {
    console.log(totalRow, totalCol);
    const pathSVG = document.getElementById("path");
    pathSVG.innerHTML = '';
    points = Array.from(Array(totalRow), () => new Array(totalCol));

    for (let row = 0; row < totalRow; row++) {
        for (let col = 0; col < totalCol; col++) {
            pathSVG.innerHTML += `<rect class="point" id="point_${row}_${col}" width="${pointWidth}" height="${pointHeight}" x="${pointWidth * row}" y="${pointHeight * col}" />`
        }
    }

    for (let row = 0; row < totalRow; row++) {
        for (let col = 0; col < totalCol; col++) {
            points[row][col] = document.getElementById(`point_${row}_${col}`);
            points[row][col].style.fill = normal_point_color;
            points[row][col].addEventListener('mouseover', () => {
                if (intervalObject == undefined) {
                    if (isLeftMouseDown) {
                        // if (points[row][col].style.fill == marked_point_color) {
                        // points[row][col].style.fill = normal_point_color;
                        // } else {
                        points[row][col].style.fill = marked_point_color;
                        // }
                    }
                    if (isRightMouseDown) {
                        points[row][col].style.fill = normal_point_color;
                    }
                }
            });

            points[row][col].onmousedown = (eventData) => {
                if (intervalObject == undefined) {
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
    }
}

function stopTraverse() {
    clearInterval(intervalObject);
    intervalObject = undefined;
}

function resetGraph() {
    stopTraverse()
    for (let row = 0; row < totalRow; row++) {
        for (let col = 0; col < totalCol; col++) {
            points[row][col].style.fill = normal_point_color;
        }
    }

    document.querySelector("#speed-text").removeAttribute("readonly");
    document.querySelector("#row-text").removeAttribute("readonly");
    document.querySelector("#col-text").removeAttribute("readonly");
    document.querySelector("#start-traverse-btn").removeAttribute("disabled");
}

function startTraverse() {
    if (intervalObject != undefined) {
        return;
    }

    document.querySelector("#speed-text").setAttribute("readonly", "");
    document.querySelector("#row-text").setAttribute("readonly", "");
    document.querySelector("#col-text").setAttribute("readonly", "");
    document.querySelector("#start-traverse-btn").setAttribute("disabled", "");


    console.log("traverse");
    let visited = new Set();
    let source = [1, 1];
    const queue = [source];
    const steps = [];
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
        const current_row = current[0];
        const current_col = current[1];
        if (current_row - 1 >= 0 && points[current_row - 1][current_col].style.fill != marked_point_color) {
            neighbors.push([current_row - 1, current_col]);
        }
        if (current_col - 1 >= 0 && points[current_row][current_col - 1].style.fill != marked_point_color) {
            neighbors.push([current_row, current_col - 1]);
        }


        if (current_row + 1 < totalRow && points[current_row + 1][current_col].style.fill != marked_point_color) {
            neighbors.push([current_row + 1, current_col])
        }
        if (current_col + 1 < totalCol && points[current_row][current_col + 1].style.fill != marked_point_color) {
            neighbors.push([current_row, current_col + 1]);
        }

        for (let neighbor of neighbors) {
            queue.push(neighbor);
        }
    }
    visualizeGraph(steps);
}



function visualizeGraph(steps) {
    intervalObject = setInterval(() => {
        if (steps.length > 0) {
            const current = steps.shift();
            points[current[0]][current[1]].style.fill = visited_point_color;
        } else {
            clearInterval(intervalObject);
        }
    }, traverseSpeed);
}

document.onmousedown = (eventData) => {
    switch (eventData.button) {
        case 0: isLeftMouseDown = true; break;
        case 2: isRightMouseDown = true; break;
    }
}

document.onmouseup = (eventData) => {
    switch (eventData.button) {
        case 0: isLeftMouseDown = false; break;
        case 2: isRightMouseDown = false; break;
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



document.addEventListener('contextmenu', event => event.preventDefault());

/*

points[1].getAttribute('fill')



*/
