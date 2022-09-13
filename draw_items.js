const pathSVG = document.getElementById("path");
// var points = Array.from(Array(10), () => new Array(10));
var points = [];

for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
        pathSVG.innerHTML += `<rect class="point" id="point_${row}_${col}" width="0.5" height="0.5" x="${0.5 * row}" y="${0.5 * col}" />`
    }
}

for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
        points[row * 10 + col] = document.getElementById(`point_${row}_${col}`);
        points[row * 10 + col].style.fill = "#00aaff";
        points[row * 10 + col].addEventListener('mouseover', () => {
            mouseover_point(row, col);
        });
        points[row * 10 + col].addEventListener('mouseleave', () => {
            mouseleave_point(row, col);
        });
        points[row * 10 + col].addEventListener('click', () => {
            mouseclick_point(row, col);
        });

    }
}

/*

points[1].getAttribute('fill')



*/

function mouseover_point(row, col) {
    console.log("over", row, col);
    console.log(points[row * 10 + col].style.fill = "#aaaa00");
}

function mouseleave_point(row, col) {
    console.log("leave", row, col);
    console.log(points[row * 10 + col].style.fill = "#00aaff");
}

function mouseclick_point(row, col) {
    console.log("click", row, col);
    console.log(points[row * 10 + col].style.fill = "#00aaff");
}
