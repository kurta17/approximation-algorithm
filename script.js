function lagrangeInterpolation(points, x) {
    let result = 0
    let n = points.length

    for (let i = 0; i < n; i++) {
        let term = points[i][1]
        for (let j = 0; j < n; j++) {
            if (j != i) {
                term *= (x - points[j][0]) / (points[i][0] - points[j][0])
            }
        }
        result += term
    }

    return result
}

let points = [
    [0, 1],
    [1, 2],
    [2, 5],
]
let xValue = 3
let result = lagrangeInterpolation(points, xValue)
console.log(`Lagrange Polynomial value at x=${xValue}: ${result}`)

let ctx = document.getElementById('myChart').getContext('2d')

let xValues = []
for (let i = -9; i <= 9; i += 0.1) {
    xValues.push(i)
}

let yValues = xValues.map((x) => lagrangeInterpolation(points, x))

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
})
