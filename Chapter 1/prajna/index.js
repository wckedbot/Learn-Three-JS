
var camera;
var scene;
var renderer;

function init() {
    window.addEventListener('resize', onResize, false);
    function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    var stats = initStats();

    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    var axes = new THREE.AxisHelper(20);
    scene.add(axes);

    var planeMaterial =new THREE.MeshLambertMaterial({
        color: 0x777777});
    var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);

    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xff9766});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    scene.add(cube);

    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0x7777ff});
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;

    scene.add(sphere);

    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( -40, 60, -10 );
    scene.add( spotLight );
    spotLight.castShadow = true;
    
    var step = 0;
    function renderScene() {
        stats.update();

        cube.rotation.x += controls.rotatingSpeed;
        cube.rotation.y += controls.rotatingSpeed;
        cube.rotation.z += controls.rotatingSpeed;

        step += controls.bouncingSpeed;
        sphere.position.x = 20 + ( 10*(Math.cos(step)));
        sphere.position.y = 2 + ( 10*Math.abs(Math.sin(step)));
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }

    var controls = new function() {
        this.rotatingSpeed = 0.02;
        this.bouncingSpeed = 0.03;
    }
    var gui = new dat.GUI();
    gui.add(controls, 'rotatingSpeed', 0, 0.5);
    gui.add(controls, 'bouncingSpeed', 0, 0.05);

    document.getElementById("WebGL-output").appendChild(renderer.domElement);
    renderScene();

    function initStats() {
        var stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.getElementById("Stats-output")
        .appendChild( stats.domElement );
        return stats;
        }
    
};
window.onload = init;