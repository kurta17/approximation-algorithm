// Get input fields
let xInput = document.getElementById('x');
let yInput = document.getElementById('y');

// Get calculate button
let calculateButton = document.getElementById('calculate');

let chart;

// Add event listener to calculate button
calculateButton.addEventListener('click', function() {
    // Get x and y values
    let xValues = xInput.value.split(',').map(Number);
    let yValues = yInput.value.split(',').map(Number);

    // Create points array
    let points = xValues.map((x, i) => [x, yValues[i]]);

    // Call updateChart function with points
    updateChart(points);
});

function lagrangeInterpolation(x, points) {
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

function updateChart(points) {
    let ctx = document.getElementById('myChart').getContext('2d');

    // If a chart already exists, destroy it
    if (chart) {
        chart.destroy();
    }

    let xValues = [];
    for (let i = Math.min(...points.map(point => point[0])); i <= Math.max(...points.map(point => point[0])); i += 1) {
        xValues.push(i);
    }

    let yValues = xValues.map((x) => lagrangeInterpolation(x, points));

    chart = new Chart(ctx, {
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
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'x',
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'y',
                    }
                }
            },
        },
    });
}
// Don't call updateChart here, call it inside the event listener for the calculate button
// updateChart();