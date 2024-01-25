// JavaScript file (script.js)

let xInput = document.getElementById('x');
let yInput = document.getElementById('y');
let calculateButton = document.getElementById('calculate');

let points = [];

calculateButton.addEventListener('click', function() {
    try {
        let xValues = xInput.value.split(',').map(Number);
        let yValues = yInput.value.split(',').map(Number);

        if (xValues.length !== yValues.length) {
            throw new Error('Number of x values must match number of y values');
        }

        points = xValues.map((x, i) => [x, yValues[i]]);
        updateChart();
    } catch (error) {
        console.error('Error:', error.message);
    }
});

xInput.addEventListener('change', updateChart);
yInput.addEventListener('change', updateChart);

function lagrangeInterpolation(x, y) {
    let result = 0;
    let n = points.length;

    for (let i = 0; i < n; i++) {
        let term = points[i][1];
        for (let j = 0; j < n; j++) {
            if (j !== i) {
                term *= (x - points[j][0]) / (points[i][0] - points[j][0]);
            }
        }
        result += term;
    }

    return result;
}

function clearChart() {
    let chartCanvas = document.getElementById('myChart');
    chartCanvas.getContext('2d').clearRect(0, 0, chartCanvas.width, chartCanvas.height);
}

function updateChart() {
    let ctx = document.getElementById('myChart').getContext('2d');

    let xValues = [];
    for (let i = Math.min(...points.map(point => point[0])); i <= Math.max(...points.map(point => point[0])); i += 1) {
        xValues.push(i);
    }

    let yValues = xValues.map((x) => lagrangeInterpolation(x));

    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xValues,
            datasets: [
                {
                    label: 'Lagrange Interpolation Polynomial',
                    data: yValues,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    fill: false,
                },
                {
                    label: 'Points',
                    data: points.map(point => ({x: point[0], y: point[1]})),
                    borderColor: 'red',
                    backgroundColor: 'red',
                    pointRadius: 5,
                    fill: false,
                    showLine: false // no line for this dataset
                }
            ],
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Lagrange Polynomial Interpolation',
            },
            scales: {
                xAxes: [
                    {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'x',
                        },
                    },
                ],
                yAxes: [
                    {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'y',
                        },
                    },
                ],
            },
        },
    });
}

updateChart();