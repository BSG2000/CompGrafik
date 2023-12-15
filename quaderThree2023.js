// Szene, Kamera und Renderer einrichten
let camera, scene, renderer;
let geometry, material, cube;

const init = function () {
    renderer = new THREE.WebGLRenderer({antialias: true}); // WebGLRenderer oder CanvasRenderer
    renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.5);
    document.body.appendChild(renderer.domElement);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    // Kamera positionieren
    camera.position.z = 500;
    scene = new THREE.Scene();

    // Quader erstellen
    geometry = new THREE.BoxGeometry(100, 200, 300);
    material = new THREE.MeshBasicMaterial({color: 0xff0000});  // change to MeshBasicMaterial
    cube = new THREE.Mesh(geometry, material);

    // Create an EdgesGeometry and LineSegments to highlight the edges
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 0x000000}));
    cube.add(line);  // add the lineSegments to your cube

    scene.add(cube);

    // Punktlichtquelle hinzufügen
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);
}

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.5);  // adjust to a fraction of window size
}, false);

let clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    cube.rotation.x += delta * 0.75;  // adjust the multiplier to control the speed
    cube.rotation.y += delta * 0.75;  // adjust the multiplier to control the speed
    renderer.render(scene, camera);
}

init();
animate();
