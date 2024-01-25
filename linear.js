let xValues = [];
let yValues = [];

function addData() {
    const xInput = document.getElementById('x');
    const yInput = document.getElementById('y');

    const x = parseFloat(xInput.value);
    const y = parseFloat(yInput.value);

    if (!isNaN(x) && !isNaN(y)) {
        xValues.push(x);
        yValues.push(y);
        updateChart();
    }

    xInput.value = '';
    yInput.value = '';
}

function linearApproximation(xValues, yValues) {
    const n = xValues.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    for (let i = 0; i < n; i++) {
        sumX += xValues[i];
        sumY += yValues[i];
        sumXY += xValues[i] * yValues[i];
        sumXX += xValues[i] * xValues[i];
    }
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    return [intercept, slope];
}

function updateChart() {
    const ctx = document.getElementById('myChart').getContext('2d');
    const originalData = {
        label: 'Original Data',
        data: xValues.map((x, i) => ({ x, y: yValues[i] })),
        borderColor: 'blue',
        backgroundColor: 'transparent',
        showLine: false,
        fill: false
    };

    const coefficients = linearApproximation(xValues, yValues);

    // Generate points for the linear approximation line
    const xValuesApprox = Array.from({ length: 2 }, (_, i) => i === 0 ? Math.min(...xValues) : Math.max(...xValues));
    const yValuesApprox = xValuesApprox.map(x => coefficients[0] + coefficients[1] * x);

    const linearApproximationData = {
        label: 'Linear Approximation',
        data: xValuesApprox.map((x, i) => ({ x, y: yValuesApprox[i] })),
        borderColor: 'red',
        backgroundColor: 'transparent',
        showLine: true,
        fill: false
    };

    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [originalData, linearApproximationData]
        },
        options: {
            scales: {
                x: {type: 'linear', position: 'bottom'}
            }
        }
    });
}