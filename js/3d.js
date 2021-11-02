var scene, renderer;
var camera;
var mesh;

var isMouseDown = false;

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 45;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.setClearColor(0xdddddd);
    renderer.gammaOutput = true;


    var light = new THREE.DirectionalLight("#c1582d", 1);
    var ambient = new THREE.AmbientLight("#85b2cd");
    light.position.set(0, -70, 100).normalize();
    scene.add(light);
    scene.add(ambient);

    var texture = new THREE.Texture();
    var manager = new THREE.LoadingManager();
    manager.onProgress = function (item, loaded, total) { };
    var onProgress = function (xhr) { };
    var onError = function (xhr) { };

    var loader = new THREE.GLTFLoader();

    loader.load(
        '3d/ironman.gltf',
        function (gltf) {

            mesh = gltf.scene;
            mesh.scale.set(0.2, 0.2, 0.2);
            scene.add(mesh);
        },
        function (xhr) {

            console.log((xhr.loaded / xhr.total * 100) + '% loaded');

        }

    );

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("touchstart", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchend", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchmove", onMouseMove);

    render();
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}


function onMouseDown(event) {
    isMouseDown = true;
}

function onMouseMove(event) {
    if (isMouseDown) {
        if (mesh) {
            mesh.rotation.y = getMouseX(event) / 100;
            mesh.rotation.x = getMouseY(event) / 100;

        }
    }
}

function onMouseUp(event) {
    isMouseDown = false;
}

function getMouseX(event) {
    if (event.type.indexOf("touch") == -1)
        return event.clientX;
    else
        return event.touches[0].clientX * 3;
}

function getMouseY(event) {
    if (event.type.indexOf("touch") == -1)
        return event.clientY;
    else
        return event.touches[0].clientY * 3;
}

window.addEventListener('DOMContentLoaded', init);