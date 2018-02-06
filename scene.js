// Create scene
var scene = new THREE.Scene();

// Create camera
var camera = new THREE.PerspectiveCamera(
	75, // fov — Camera frustum vertical field of view.
	window.innerWidth/window.innerHeight, // aspect — Camera frustum aspect ratio.
	0.1, // near — Camera frustum near plane.
	1000); // far — Camera frustum far plane. 

	camera.position.x = 0;
	camera.position.y = 20;
	camera.position.z = 10;

// Create renderer
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light.
var sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.x = 1;
sun.position.y = 1;
sun.position.z = 0.5;
scene.add(sun);

// Models.
var smallSphere = new THREE.SphereGeometry(1, 10, 10);
var treeTrunkCylinder = new THREE.CylinderGeometry(0.4, 0.6, 10);
var leavesSphere = new THREE.SphereGeometry(3, 10, 10);
var benchBox = new THREE.BoxGeometry(6, 2, 2);
var bushBox1 = new THREE.BoxGeometry(8, 2, 2);
var bushBox2 = new THREE.BoxGeometry(2, 2, 14);

var houseMainBox = new THREE.BoxGeometry(30, 20, 20);
var houseFrontBox = new THREE.BoxGeometry(15, 10, 10);
var houseGarageBox = new THREE.BoxGeometry(10, 10, 20);
var houseMainTriangle = new THREE.BoxGeometry();
var houseFrontTriangle = new THREE.BoxGeometry();
var houseGarageTriangle = new THREE.BoxGeometry();

var parkGround = new THREE.BoxGeometry(30, 0.1, 20);
var ground = new THREE.BoxGeometry(100, 0.1, 100);

// Materials.
var stoneGrey = new THREE.MeshLambertMaterial({color:0x888888});
var logBrown = new THREE.MeshLambertMaterial({color:0x663300});
var treeLeaves = new THREE.MeshLambertMaterial({color:0x1e932d});
var wood = new THREE.MeshNormalMaterial();
var bushLeaves = new THREE.MeshLambertMaterial({color:0x1e932d});

var houseBricks = new THREE.MeshNormalMaterial();
var houseRoofTiles = new THREE.MeshNormalMaterial();

var dirt = new THREE.MeshLambertMaterial({color:0xddccbb});
var streetBricks = new THREE.MeshLambertMaterial({color:0xbbbbbb});

// Meshes.

// Grey shperes.
var greySphere = new THREE.Mesh(smallSphere, stoneGrey);
greySphere.position.x = -1;
greySphere.position.y = 1;
greySphere.position.z = -4;
scene.add(greySphere);

var greySphere2 = new THREE.Mesh(smallSphere, stoneGrey);
greySphere2.position.x = 3;
greySphere2.position.y = 1;
greySphere2.position.z = -4;
scene.add(greySphere2);

var greySphere3 = new THREE.Mesh(smallSphere, stoneGrey);
greySphere3.position.x = 14;
greySphere3.position.y = 1;
greySphere3.position.z = -7;
scene.add(greySphere3);

// Trees.
var brownCylinder = new THREE.Mesh(treeTrunkCylinder, logBrown);
brownCylinder.position.x = 8;
brownCylinder.position.y = 5;
brownCylinder.position.z = -7;
scene.add(brownCylinder);

var greenSphere = new THREE.Mesh(leavesSphere, treeLeaves);
greenSphere.position.x = 8;
greenSphere.position.y = 10;
greenSphere.position.z = -7;
scene.add(greenSphere);

var brownCylinder2 = new THREE.Mesh(treeTrunkCylinder, logBrown);
brownCylinder2.position.x = -14;
brownCylinder2.position.y = 5;
brownCylinder2.position.z = -18;
scene.add(brownCylinder2);

var greenSphere2 = new THREE.Mesh(leavesSphere, treeLeaves);
greenSphere2.position.x = -14;
greenSphere2.position.y = 10;
greenSphere2.position.z = -18;
scene.add(greenSphere2);

// Bench.
var bench = new THREE.Mesh(benchBox, wood);
bench.position.x = -6;
bench.position.y = 1;
bench.position.z = -16;
scene.add(bench);

// Bushes.
var bush1 = new THREE.Mesh(bushBox1, bushLeaves);
bush1.position.x = -9;
bush1.position.y = 1;
bush1.position.z = -3;
scene.add(bush1);

var bush2 = new THREE.Mesh(bushBox2, bushLeaves);
bush2.position.x = -12;
bush2.position.y = 1;
bush2.position.z = -9;
scene.add(bush2);

// Houses.
var houseMainBlock = new THREE.Mesh(houseMainBox, houseBricks);
houseMainBlock.position.x = 0;
houseMainBlock.position.y = 10;
houseMainBlock.position.z = 40;
scene.add(houseMainBlock);

var houseFrontBlock = new THREE.Mesh(houseFrontBox, houseBricks);
houseFrontBlock.position.x = -7.5;
houseFrontBlock.position.y = 5;
houseFrontBlock.position.z = 25;
scene.add(houseFrontBlock);

var houseGarageBlock = new THREE.Mesh(houseGarageBox, houseBricks);
houseGarageBlock.position.x = -20;
houseGarageBlock.position.y = 5;
houseGarageBlock.position.z = 50;
scene.add(houseGarageBlock);

// Dirt ground.
var dirtGround = new THREE.Mesh(parkGround, dirt);
dirtGround.position.x = 2;
dirtGround.position.y = 0;
dirtGround.position.z = -12;
scene.add(dirtGround);

// Brick ground.
var brickGround = new THREE.Mesh(ground, streetBricks);
brickGround.position.x = 2;
brickGround.position.y = -0.1;
brickGround.position.z = -12;
scene.add(brickGround);


controls = new THREE.OrbitControls(camera);
controls.autoRotate = 0;
controls.noKeys = false;

var render = function () {
	requestAnimationFrame(render);

	controls.update();
	renderer.render(scene, camera);
};

render();