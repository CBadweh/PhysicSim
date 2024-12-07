
import * as chart from './functionHelper.js';

// ==================================================================
//                            THREEjs SETUP 
// ==================================================================
// Create the scene, camera, and renderer
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the box geometry
let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
let box = new THREE.Mesh(geometry, material);
scene.add(box);

// Position the camera
camera.position.z = 80;


// ==================================================================
//                             dat.GUI 
// ==================================================================
// Control variables
let params = {
    initialPosition: 0,
    initialVelocity: 1,
    play: function() { playing = true; },
    stop: function() { 
        playing = false; 
        console.log(box.position.x, parseFloat(chart.positionData[chart.positionData.length-1]));
        console.log(chart.positionData.length)
    },
    reset: function() {
        // Reset the animation to the initial values
        time = 0;
        simulationTime = 0;
        box.position.x = initialPosition;
        params.playback = 0;
        playing = false;
        chart.resetChart();
    },
    playback: 0
};

let initialPosition = params.initialPosition;
let initialVelocity = params.initialVelocity;
let time = 0;
let playing = false;
let simulationTime = 0;

// Create a dat.GUI interface
let gui = new dat.GUI();
gui.add(params, 'initialPosition', 0, 40).name('Initial Position').onChange(value => {
    initialPosition = value;
    if (!playing) {
        box.position.x = value;
        time = 0;
        simulationTime = 0;
    }
});
gui.add(params, 'initialVelocity', -5, 5).name('Initial Velocity').onChange(value => {
    initialVelocity = value;
});
gui.add(params, 'play').name('Play');
gui.add(params, 'stop').name('Stop');
gui.add(params, 'reset').name('Reset');
gui.add(params, 'playback', 0, 100, 1).name('Playback').listen().onChange(value => {
    if (!playing) {
        box.position.x = chart.positionData[value*10];
        simulationTime = value*10; // *10 is to match time += 0.1;
        // console.log(value)
        chart.slider(value); // send slider value to functionHelper.js file
        
    }
});

// ==================================================================
//                              ANIMATE 
// ==================================================================
// Update function
function animate() {
    requestAnimationFrame(animate);

    if (playing) {
        time += 0.1;
        // let currentPosition = initialPosition + initialVelocity * time;
        let currentPosition = 20*Math.sin(0.1*time);
        let velPosition = 2*Math.cos(0.1*time);

        box.position.x = currentPosition;
        params.playback = time;
        chart.updateChart(time, currentPosition, velPosition);  // Update chart
    }

    renderer.render(scene, camera);
}

animate();
