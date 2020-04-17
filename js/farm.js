
var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.gammaInput = true;
renderer.gammaOutput = true;
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

//create plane to use for ground
var groundGeometry = new THREE.PlaneBufferGeometry(20, 20);
var groundMaterial = new THREE.MeshBasicMaterial({ color: 0x27ae60, side: THREE.DoubleSide });
var ground = new THREE.Mesh(groundGeometry, groundMaterial);
//rotate the plane to look like its the ground
ground.rotation.x = Math.PI * -0.5;
ground.receiveShadow = true;

//Create rectangular structure (barnwalls)
var barnGeometry = new THREE.BoxGeometry(8, 4, 4);
//Add texture
var texture = new THREE.TextureLoader().load("js/plank.jpg");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(4, 4);
var barnMaterials = [
    new THREE.MeshBasicMaterial({ color: 0x5dade2, map: texture, side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ color: 0x922b21, map: texture, side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ color: 0x7d3c98, map: texture, side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ color: 0x239b56, map: texture, side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ color: 0xa04000, map: texture, side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ color: 0x283747, map: texture, side: THREE.DoubleSide }),
];

var barnWalls = new THREE.Mesh(barnGeometry, barnMaterials);
barnWalls.position.set(0, 2, -2);
barnWalls.castShadow = true;

//Add barn roof (prism)
var prism = new THREE.Shape();
prism.moveTo(0, 4);
prism.lineTo(-4, 4, -8);
prism.lineTo(-2, 6, -6);

var extrudeSettings = {
    steps: 2,
    depth: 8,
    bevelEnabled: true,
    bevelThickness: 0,
    bevelSize: 0,
    bevelOffset: 0,
    bevelSegments: 2,
};
var geometry = new THREE.ExtrudeGeometry(prism, extrudeSettings);
var material = new THREE.MeshBasicMaterial({ color: 0xff9999 });
var roof = new THREE.Mesh(geometry, material);
roof.translateZ(-0.2);
roof.translateX(4);
roof.rotateY(67.5);
roof.castShadow = true;

//Add Watertank (cylinder)
var watertankGeometry = new THREE.CylinderBufferGeometry(1, 1, 2, 32);
var watertankMaterial = new THREE.MeshBasicMaterial({ color: 0x0f317a });
var waterTank = new THREE.Mesh(watertankGeometry, watertankMaterial);
waterTank.position.set(9, 1, -2);
waterTank.castShadow = true;
//Add Trees (cylinders with cones)
//First Tree
var treeTrunkGeometry = new THREE.CylinderBufferGeometry(0.5, 0.5, 3, 32);
var treeTrunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
var treeTrunk = new THREE.Mesh(treeTrunkGeometry, treeTrunkMaterial);
treeTrunk.position.set(-3, 1.5, 6);
treeTrunk.castShadow = true;
var treeTopGeometry = new THREE.CylinderBufferGeometry(0, 2, 4, 32);
var treeTopMaterial = new THREE.MeshBasicMaterial({ color: 0x337850 });
var treeTop = new THREE.Mesh(treeTopGeometry, treeTopMaterial);
treeTop.position.set(-3, 4, 6);
treeTop.castShadow = true;
//Second Tree
var treeTrunkGeometry2 = new THREE.CylinderBufferGeometry(0.5, 0.5, 3, 32);
var treeTrunkMaterial2 = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
var treeTrunk2 = new THREE.Mesh(treeTrunkGeometry2, treeTrunkMaterial2);
treeTrunk2.position.set(2, 1.5, 6);
treeTrunk2.castShadow = true;
var treeTopGeometry2 = new THREE.CylinderBufferGeometry(0, 2, 4, 32);
var treeTopMaterial2 = new THREE.MeshBasicMaterial({ color: 0x337850 });
var treeTop2 = new THREE.Mesh(treeTopGeometry2, treeTopMaterial2);
treeTop2.position.set(2, 4, 6);
treeTop2.castShadow = true;

//Lights
//Sun
var sun = new THREE.DirectionalLight(0xFFFFFF, 0.5);
sun.castShadow = true; 
sun.shadow.mapSize.width = 20;
sun.shadow.mapSize.height = 20;
sun.shadow.camera.near = 0.5;
sun.shadow.camera.far = 500 
sun.shadow.camera.right = 5;
sun.shadow.camera.left = -5;
sun.shadow.camera.top = 5;
sun.shadow.camera.bottom = -5;
sun.target.position.set(-5, 0, 0);

//Three lamps
var lamp1 = new THREE.PointLight(0xFFFFFF, 2);
lamp1.position.set(-1, 4, 6);
lamp1.castShadow = true;

var lamp2 = new THREE.PointLight(0xFFFFFF, 2);
lamp2.position.set(-1, 4, 6);
lamp2.castShadow = true;

var lamp3 = new THREE.PointLight(0xFFFFFF, 2);
lamp3.position.set(-1, 4, 6);
lamp3.castShadow = true;

//moon and start
var skyGeo = new THREE.SphereGeometry(100000, 25, 25); 
var skyloader = new THREE.TextureLoader(),
    skytexture = loader.load("textures/night.jpg");
var skymaterial = new THREE.MeshPhongMaterial({
    map: skytexture,
});
var nightSky = new THREE.Mesh(skyGeo, skymaterial);
nightSky.material.side = THREE.BackSide;

//Add objects to scene
scene.add(sun);
scene.add(sun.target)
scene.add(barnWalls);
scene.add(waterTank);
scene.add(treeTrunk);
scene.add(treeTop);
scene.add(treeTrunk2);
scene.add(treeTop2);
scene.add(roof);
scene.add(ground);

//Position Camera
camera.position.set(15, 15, 15);
camera.lookAt(scene.position);
renderer.render(scene, camera);



//FUNCTIONS FOR ZOOM/PAN
function getCurrentScale() {
    var height = window.innerHeight;
    var updatefov = camera.fov * Math.PI / 180;
    var scale_height = 2 * Math.tan(updatefov / 2) * camera.position.z;
    var currentScale = height / scale_height
    return currentScale
}

var zoomIn = function () {
    camera.fov -= 1;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
};

var zoomOut = function () {
    camera.fov += 1;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
};

var rotateLeft = function () {
    var current_scale = getCurrentScale();

    camera.position.set(camera.position.x - 10 / current_scale, camera.position.y +
        0 / current_scale, camera.position.z);
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
};
var rotateRight = function () {
    var current_scale = getCurrentScale();

    camera.position.set(camera.position.x + 10 / current_scale, camera.position.y -
        0 / current_scale, camera.position.z);
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
};

var removeAndDisposeObjects = function () {
    //Remove all objects from scene
    scene.remove(ground);
    scene.remove(barnWalls);
    scene.remove(waterTank);
    scene.remove(treeTrunk);
    scene.remove(treeTop);
    scene.remove(treeTrunk2);
    scene.remove(treeTop2);
    scene.remove(sun);
    scene.remove(lamp1);
    scene.remove(lamp2);
    scene.remove(lamp3);
    scene.remove(nightSky);

    //Tell the renderer to remove items from memory
    scene.dispose();
    groundGeometry.dispose();
    groundMaterial.dispose();
    barnGeometry.dispose();
    watertankGeometry.dispose();
    watertankMaterial.dispose();
    treeTrunkGeometry.dispose();
    treeTrunkMaterial.dispose();
    treeTopGeometry.dispose();
    treeTopMaterial.dispose();
    treeTrunkGeometry2.dispose();
    treeTrunkMaterial2.dispose();
    treeTopGeometry2.dispose();
    treeTopMaterial2.dispose();
};

var terminateApp = function () {
    removeAndDisposeObjects();
    renderer.dispose();
    renderer.render(scene, camera);
    alert("Application terminated. Reload page to reset application.");
};

var day = function ()
{
    scene.remove(lamp1);
    scene.remove(lamp2);
    scene.remove(lamp3);
    scene.remove(nightSky);
    renderer.render(scene, camera);
}

var night = function ()
{
    scene.remove(sun);
    scene.add(lamp1);
    scene.add(lamp2);
    scene.add(lamp3);
    scene.add(nightSky);
    renderer.renderer(scene, camera);
}


//add arrow key events
//UP / DOWN = Zoom In / Zoom Out
document.onkeydown = function (event) {
    switch (event.keyCode)
    {
        case 27:    console.log("Terminate APP");
                    terminateApp();
                    break;
        case 37:    console.log("Left key pressed");
                    rotateLeft();
                    break;
        case 38:    console.log("Up key pressed");
                    zoomIn();
                    break;
        case 39:    console.log("Right key pressed");
                    rotateRight();
                    break;
        case 40:    console.log("Down key pressed");
                    zoomOut();
                    break;
        case 68:    console.log("D key pressed");
                    day();
                    break;
        case 78:    console.log("N key pressed");
                    night();
                    break;
    }
};

var verticalViewingAngle = function (event) {
    var scale = getCurrentScale();
    camera.position.set(camera.position.x - (event.pageX/100) / scale, camera.position.y +
        (event.pageY/100) /scale, camera.position.z);
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
    document.onmouseup = function () {
        document.removeEventListener("mouseover", verticalViewingAngle);
    }
};

//Mouse events
document.onmousedown = function (event) {
    if (event.button === 0) {
        document.addEventListener("mousemove", verticalViewingAngle);
    }

};