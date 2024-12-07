// Chart.js setup


let positionData = [];
let velocityData = [];
const positionCtx = document.getElementById('positionChart').getContext('2d');
const velocityCtx = document.getElementById('velocityChart').getContext('2d');

// ==================================================================
//                            CHART JS 
// ==================================================================
// Initial position of the vertical line (as a percentage)
let verticalLinePosition = 50;

// ============================ POSITION =============================
// Position Plugin to draw a vertical line and display intersection values
const verticalLinePlugin = {
    id: 'verticalLine',
    afterDraw: (chart) => {
        const ctx = chart.ctx;
        const xValue = Number(verticalLinePosition);
        const xPixel = chart.scales.x.getPixelForValue(xValue);
        console.log('xPixel: %d', xPixel);
        console.log('xValue: %d', xValue);

        // Draw the vertical line
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(xPixel, chart.chartArea.top);
        ctx.lineTo(xPixel, chart.chartArea.bottom);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.stroke();
        ctx.restore();
        
        // Display the value on cursor intersection
        const yValue = positionChart.data.datasets[0].data[xValue*10]; // get the y value
        const yPixel = chart.scales.y.getPixelForValue(yValue);        // get the correct scale for displaying y value
        ctx.fillStyle = 'red';
        ctx.font = '15px Arial';
        ctx.fillText(`(${xValue}, ${yValue})`,xPixel + 5, yPixel -5 ); // Display x and y values on the cursor 

    }
};

// Position Chart Init
let positionChart = new Chart(positionCtx, {
    type: 'line',
    data: {
        labels: [], // Time values
        datasets: [{
            label: 'Position',
            data: positionData, // Position values
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        responsive: true,
        plugins: {
            verticalLine: {}, // Activate the plugin
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true // Enable zooming with the mouse wheel
                    },
                    pinch: {
                        enabled: true // Enable zooming on mobile devices
                    },
                    mode: 'xy' // Allow zooming both axes
                },
                pan: {
                    enabled: true, // Enable panning
                    mode: 'x', // Allow panning both axes
                    // modifierKey: 'ctrl',
                    threshold: 5,
                }
            }
        },
        scales: {
            x: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Time (s)'
                }
            },
            y: {
                max: 20,
                min: -20,
                title: {
                    display: true,
                    text: 'Position (m)'
                }
            }
        }
    },
    plugins: [verticalLinePlugin] // to display vertical line with (x,y) values
});

// ============================ VELOCITY =============================
// Velocity Plugin to draw a vertical line and display intersection values
const velocityPlugin = {
    id: 'velVerticalLine',
    afterDraw: (chart) => {
        const ctx = chart.ctx;
        const xValue = Number(verticalLinePosition);
        const xPixel = chart.scales.x.getPixelForValue(xValue);
        console.log('xPixel: %d', xPixel);
        console.log('xValue: %d', xValue);

        // Draw the vertical line
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(xPixel, chart.chartArea.top);
        ctx.lineTo(xPixel, chart.chartArea.bottom);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.stroke();
        ctx.restore();
        
        // Display the value on cursor intersection
        const yValue = velocityChart.data.datasets[0].data[xValue*10]; // get the y value
        const yPixel = chart.scales.y.getPixelForValue(yValue);        // get the correct scale for displaying y value
        ctx.fillStyle = 'red';
        ctx.font = '15px Arial';
        ctx.fillText(`(${xValue}, ${yValue})`,xPixel + 5, yPixel -5 ); // Display x and y values on the cursor 

    }
};

// Velocity Chart Init
let velocityChart = new Chart(velocityCtx, {
    type: 'line',
    data: {
        labels: [], // Time values
        datasets: [{
            label: 'Velocity',
            data: velocityData, // Velocity values
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        responsive: true,
        plugins: {
            velVerticalLine: {}, // Activate the plugin
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true // Enable zooming with the mouse wheel
                    },
                    pinch: {
                        enabled: true // Enable zooming on mobile devices
                    },
                    mode: 'xy' // Allow zooming both axes
                },
                pan: {
                    enabled: true, // Enable panning
                    mode: 'x', // Allow panning both axes
                    // modifierKey: 'ctrl',
                    threshold: 5,
                }
            }
        },
        // graph window 
        scales: {    
            x: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Time (s)'
                }
            },
            y: {
                max: 20,
                min: -20,
                title: {
                    display: true,
                    text: 'Position (m)'
                }
            }
        }
    },
    plugins: [velocityPlugin] // to display vertical line with (x,y) values
});

// ==============================================================================
//                       FUNCTIONS: interface the two files 
// ==============================================================================
// Function to update the chart with the current time and position
function updateChart(time, position, velPosition) {
    positionChart.data.labels.push(time.toFixed(2));  // Add time to labels
    positionData.push(position.toFixed(2));  // Add position to data
    positionChart.update();  // Update the chart

    velocityChart.data.labels.push(time.toFixed(2));  // Add time to labels
    velocityData.push(velPosition.toFixed(2));  // Add position to data
    velocityChart.update();  // Update the chart
}

// Function to reset the chart when simulation is reset
function resetChart() {
    positionData = [];
    positionChart.data.labels = [];  // Clear time labels
    positionChart.data.datasets[0].data = positionData;  // Clear position data
    positionChart.update();  // Update the chart

    velocityData = [];
    velocityChart.data.labels = [];  // Clear time labels
    velocityChart.data.datasets[0].data = velocityData;  // Clear position data
    velocityChart.update();  // Update the chart
}

// Function to pass 'Playback' value from index.js to this file.
function slider(val) {
    console.log('val: %d',val);
    verticalLinePosition = val;
    positionChart.update();
    velocityChart.update();
}

export {resetChart, updateChart,  positionChart, positionData, slider };