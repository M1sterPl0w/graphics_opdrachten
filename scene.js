/*
*	Default setup
*/

// Create scene
var scene = new THREE.Scene();

// Create camera
var camera = new THREE.PerspectiveCamera(
	75, // fov — Camera frustum vertical field of view.
	window.innerWidth/window.innerHeight, // aspect — Camera frustum aspect ratio.
	0.1, // near — Camera frustum near plane.
	25000); // far — Camera frustum far plane. 

	camera.position.x = 0;
	camera.position.y = 20;
	camera.position.z = 10;

// Create renderer
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/*
* Object loader
*/
var oLoader = new THREE.ObjectLoader();

/*
* Light.
*/
var sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.x = -0.5;
sun.position.y = 1;
sun.position.z = -0.25;
scene.add(sun);

/*
* Models
*/
var smallSphere = new THREE.SphereGeometry(1, 10, 10);
var treeTrunkCylinder = new THREE.CylinderGeometry(0.4, 0.6, 8);
var leavesSphere = new THREE.SphereGeometry(3, 10, 10);
var bushBox1 = new THREE.BoxGeometry(8, 2, 2);
var bushBox2 = new THREE.BoxGeometry(2, 2, 14);

// House models.
var houseMainBox = new THREE.BoxGeometry(30, 20, 20);
var houseFrontBox = new THREE.BoxGeometry(15, 10, 10);
var houseGarageBox = new THREE.BoxGeometry(10, 10, 20);

var houseMainSideTriangle = new THREE.Geometry();
houseMainSideTriangle.vertices.push(new THREE.Vector3(0, 0, 0));
houseMainSideTriangle.vertices.push(new THREE.Vector3(0, 0, 10));
houseMainSideTriangle.vertices.push(new THREE.Vector3(0, 0, 20));
houseMainSideTriangle.vertices.push(new THREE.Vector3(0, 10, 10));
houseMainSideTriangle.vertices.push(new THREE.Vector3(30, 0, 0));
houseMainSideTriangle.vertices.push(new THREE.Vector3(30, 0, 10));
houseMainSideTriangle.vertices.push(new THREE.Vector3(30, 0, 20));
houseMainSideTriangle.vertices.push(new THREE.Vector3(30, 10, 10));
houseMainSideTriangle.faces.push(new THREE.Face3(0, 1, 3));
houseMainSideTriangle.faces.push(new THREE.Face3(1, 2, 3));
houseMainSideTriangle.faces.push(new THREE.Face3(4, 7, 5));
houseMainSideTriangle.faces.push(new THREE.Face3(5, 7, 6));
houseMainSideTriangle.computeFaceNormals();

var houseFrontSideTriangle = new THREE.Geometry();
houseFrontSideTriangle.vertices.push(new THREE.Vector3(0, 0, 0));
houseFrontSideTriangle.vertices.push(new THREE.Vector3(0, 0, 10));
houseFrontSideTriangle.vertices.push(new THREE.Vector3(0, 10, 10));
houseFrontSideTriangle.vertices.push(new THREE.Vector3(15, 0, 0));
houseFrontSideTriangle.vertices.push(new THREE.Vector3(15, 0, 10));
houseFrontSideTriangle.vertices.push(new THREE.Vector3(15, 10, 10));
houseFrontSideTriangle.faces.push(new THREE.Face3(0, 1, 2));
houseFrontSideTriangle.faces.push(new THREE.Face3(3, 5, 4));
houseFrontSideTriangle.computeFaceNormals();

var houseGarageSideTriangle = new THREE.Geometry();
houseGarageSideTriangle.vertices.push(new THREE.Vector3(0, 0, 0));
houseGarageSideTriangle.vertices.push(new THREE.Vector3(0, 0, 10));
houseGarageSideTriangle.vertices.push(new THREE.Vector3(0, 0, 20));
houseGarageSideTriangle.vertices.push(new THREE.Vector3(0, 10, 10));
houseGarageSideTriangle.vertices.push(new THREE.Vector3(10, 0, 0));
houseGarageSideTriangle.vertices.push(new THREE.Vector3(10, 0, 10));
houseGarageSideTriangle.vertices.push(new THREE.Vector3(10, 0, 20));
houseGarageSideTriangle.vertices.push(new THREE.Vector3(10, 10, 10));
houseGarageSideTriangle.faces.push(new THREE.Face3(0, 1, 3));
houseGarageSideTriangle.faces.push(new THREE.Face3(1, 2, 3));
houseGarageSideTriangle.faces.push(new THREE.Face3(4, 7, 5));
houseGarageSideTriangle.faces.push(new THREE.Face3(5, 7, 6));
houseGarageSideTriangle.computeFaceNormals();

var houseMainTriangle = new THREE.Geometry();
houseMainTriangle.vertices.push(new THREE.Vector3(0, 0, 0));
houseMainTriangle.vertices.push(new THREE.Vector3(0, 0, 10));
houseMainTriangle.vertices.push(new THREE.Vector3(0, 0, 20));
houseMainTriangle.vertices.push(new THREE.Vector3(0, 10, 10));
houseMainTriangle.vertices.push(new THREE.Vector3(30, 0, 0));
houseMainTriangle.vertices.push(new THREE.Vector3(30, 0, 10));
houseMainTriangle.vertices.push(new THREE.Vector3(30, 0, 20));
houseMainTriangle.vertices.push(new THREE.Vector3(30, 10, 10));
houseMainTriangle.faces.push(new THREE.Face3(0, 7, 4));
houseMainTriangle.faces.push(new THREE.Face3(0, 3, 7));
houseMainTriangle.faces.push(new THREE.Face3(3, 6, 7));
houseMainTriangle.faces.push(new THREE.Face3(2, 6, 3));
houseMainTriangle.computeFaceNormals();

var houseFrontTriangle = new THREE.Geometry();
houseFrontTriangle.vertices.push(new THREE.Vector3(0, 0, 0));
houseFrontTriangle.vertices.push(new THREE.Vector3(0, 0, 10));
houseFrontTriangle.vertices.push(new THREE.Vector3(0, 10, 10));
houseFrontTriangle.vertices.push(new THREE.Vector3(15, 0, 0));
houseFrontTriangle.vertices.push(new THREE.Vector3(15, 0, 10));
houseFrontTriangle.vertices.push(new THREE.Vector3(15, 10, 10));
houseFrontTriangle.faces.push(new THREE.Face3(0, 2, 5));
houseFrontTriangle.faces.push(new THREE.Face3(0, 5, 3));
houseFrontTriangle.computeFaceNormals();

var houseGarageTriangle = new THREE.Geometry();
houseGarageTriangle.vertices.push(new THREE.Vector3(0, 0, 0));
houseGarageTriangle.vertices.push(new THREE.Vector3(0, 0, 10));
houseGarageTriangle.vertices.push(new THREE.Vector3(0, 0, 20));
houseGarageTriangle.vertices.push(new THREE.Vector3(0, 10, 10));
houseGarageTriangle.vertices.push(new THREE.Vector3(10, 0, 0));
houseGarageTriangle.vertices.push(new THREE.Vector3(10, 0, 10));
houseGarageTriangle.vertices.push(new THREE.Vector3(10, 0, 20));
houseGarageTriangle.vertices.push(new THREE.Vector3(10, 10, 10));
houseGarageTriangle.faces.push(new THREE.Face3(0, 7, 4));
houseGarageTriangle.faces.push(new THREE.Face3(0, 3, 7));
houseGarageTriangle.faces.push(new THREE.Face3(3, 6, 7));
houseGarageTriangle.faces.push(new THREE.Face3(2, 6, 3));
houseGarageTriangle.computeFaceNormals();

// Ground models "planes".
var parkGround = new THREE.BoxGeometry(30, 0.1, 24);
var ground = new THREE.BoxGeometry(100, 0.1, 100);
var parkingLotGround = new THREE.BoxGeometry(10, 0.1, 10);

// Materials.
var stoneGrey = new THREE.MeshLambertMaterial({color:0x888888});
var logBrown = new THREE.MeshLambertMaterial({color:0x663300});
var treeLeaves = new THREE.MeshLambertMaterial({color:0x1e932d, opacity: 0.8, transparent: true});
var wood = new THREE.MeshNormalMaterial();
var bushLeaves = new THREE.MeshLambertMaterial({color:0x1e932d});

var houseBricks = new THREE.MeshLambertMaterial({color:0x998476});
var houseRoofTiles = new THREE.MeshLambertMaterial({color:0x887884});

var dirt = new THREE.MeshLambertMaterial({color:0x573b0d});

var streetTexture = new THREE.TextureLoader().load('asset/texture/street.jpg');
streetTexture.wrapS = THREE.RepeatWrapping;
streetTexture.wrapT = THREE.RepeatWrapping;
streetTexture.repeat.set(20, 20);
var streetBricks = new THREE.MeshLambertMaterial({map:streetTexture});

// Grey spheres.

// Grey sphere 1.
var greySphere = new THREE.Object3D();

var greySphereMesh = new THREE.Mesh(smallSphere, stoneGrey);
greySphere.add(greySphereMesh);

greySphere.position.x = -1;
greySphere.position.y = 1;
greySphere.position.z = -4;

scene.add(greySphere);

// Grey sphere 2.
var greySphere2 = new THREE.Object3D();

var greySphereMesh = new THREE.Mesh(smallSphere, stoneGrey);
greySphere2.add(greySphereMesh);

greySphere2.position.x = 3;
greySphere2.position.y = 1;
greySphere2.position.z = -4;

scene.add(greySphere2);

// Grey sphere 3.
var greySphere3 = new THREE.Object3D();

var greySphereMesh = new THREE.Mesh(smallSphere, stoneGrey);
greySphere3.add(greySphereMesh);

greySphere3.position.x = 14;
greySphere3.position.y = 1;
greySphere3.position.z = -7;

scene.add(greySphere3);

// Trees.

// Tree 1.
var tree1 = new THREE.Object3D();

var brownCylinderMesh = new THREE.Mesh(treeTrunkCylinder, logBrown);
brownCylinderMesh.position.x = 0;
brownCylinderMesh.position.y = 2.5;
brownCylinderMesh.position.z = 0;
tree1.add(brownCylinderMesh);

var greenSphereMesh = new THREE.Mesh(leavesSphere, treeLeaves);
greenSphereMesh.position.x = 0;
greenSphereMesh.position.y = 9;
greenSphereMesh.position.z = 0;
tree1.add(greenSphereMesh);

tree1.position.x = 8;
tree1.position.y = 1;
tree1.position.z = -7;

scene.add(tree1);

// Tree 2.
var tree2 = new THREE.Object3D();

var brownCylinder2Mesh = new THREE.Mesh(treeTrunkCylinder, logBrown);
brownCylinder2Mesh.position.x = 0;
brownCylinder2Mesh.position.y = 2.5;
brownCylinder2Mesh.position.z = 0;
tree2.add(brownCylinder2Mesh);

var greenSphere2Mesh = new THREE.Mesh(leavesSphere, treeLeaves);
greenSphere2Mesh.position.x = 0;
greenSphere2Mesh.position.y = 9;
greenSphere2Mesh.position.z = 0;
tree2.add(greenSphere2Mesh);

tree2.position.x = -14;
tree2.position.y = 1;
tree2.position.z = -20;

scene.add(tree2);

// Bushes.

// Bush 1.
var bush1 = new THREE.Object3D();

var bush1Mesh = new THREE.Mesh(bushBox1, bushLeaves);
bush1.add(bush1Mesh);

bush1.position.x = -9;
bush1.position.y = 1;
bush1.position.z = -3;

scene.add(bush1);

// Bush 2.
var bush2 = new THREE.Object3D();

var bush2Mesh = new THREE.Mesh(bushBox2, bushLeaves);
bush2.add(bush2Mesh);

bush2.position.x = -12;
bush2.position.y = 1;
bush2.position.z = -11;

scene.add(bush2);

// Bush 3.
var bush3 = new THREE.Object3D();

var bush3Mesh = new THREE.Mesh(bushBox2, bushLeaves);
bush3.add(bush3Mesh);

bush3.position.x = -6;
bush3.position.y = 1;
bush3.position.z = -26;
bush3.rotation.y = Math.PI/4;

scene.add(bush3);

// Bush 4.
var bush4 = new THREE.Object3D();

var bush4Mesh = new THREE.Mesh(bushBox1, bushLeaves);
bush4.add(bush4Mesh);

bush4.position.x = 0.5;
bush4.position.y = 1;
bush4.position.z = -24;
bush4.rotation.y = Math.PI/4;

scene.add(bush4);

// Bush 5.
var bush5 = new THREE.Object3D();

var bush5Mesh = new THREE.Mesh(bushBox2, bushLeaves);
bush5.add(bush5Mesh);

bush5.position.x = 7;
bush5.position.y = 1;
bush5.position.z = -22;
bush5.rotation.y = Math.PI/4;

scene.add(bush5);

// Bush 6.
var bush6 = new THREE.Object3D();

var bush6Mesh = new THREE.Mesh(bushBox1, bushLeaves);
bush6.add(bush6Mesh);

bush6.position.x = 14.5;
bush6.position.y = 1;
bush6.position.z = -14.5;
bush6.rotation.y = Math.PI * 0.75;

scene.add(bush6);

// Bush 7.
var bush7 = new THREE.Object3D();

var bush7Mesh = new THREE.Mesh(bushBox1, bushLeaves);
bush7.add(bush7Mesh);

bush7.position.x = 19.75;
bush7.position.y = 1;
bush7.position.z = -15.5;
bush7.rotation.y = Math.PI/4;

scene.add(bush7);

// Houses.
var house = new THREE.Object3D();

var houseMainBlockMesh = new THREE.Mesh(houseMainBox, houseBricks);
houseMainBlockMesh.position.x = 0;
houseMainBlockMesh.position.y = 10;
houseMainBlockMesh.position.z = 0;
house.add(houseMainBlockMesh);

var houseFrontBlockMesh = new THREE.Mesh(houseFrontBox, houseBricks);
houseFrontBlockMesh.position.x = -7.5;
houseFrontBlockMesh.position.y = 5;
houseFrontBlockMesh.position.z = -15;
house.add(houseFrontBlockMesh);

var houseGarageBlockMesh = new THREE.Mesh(houseGarageBox, houseBricks);
houseGarageBlockMesh.position.x = -20;
houseGarageBlockMesh.position.y = 5;
houseGarageBlockMesh.position.z = 5;
house.add(houseGarageBlockMesh);

var houseMainSideRoofMesh = new THREE.Mesh(houseMainSideTriangle, houseBricks);
houseMainSideRoofMesh.position.x = -15;
houseMainSideRoofMesh.position.y = 20;
houseMainSideRoofMesh.position.z = -10;
house.add(houseMainSideRoofMesh);

var houseFrontSideRoofMesh = new THREE.Mesh(houseFrontSideTriangle, houseBricks);
houseFrontSideRoofMesh.position.x = -15;
houseFrontSideRoofMesh.position.y = 10;
houseFrontSideRoofMesh.position.z = -20;
house.add(houseFrontSideRoofMesh);

var houseGarageSideRoofMesh = new THREE.Mesh(houseGarageSideTriangle, houseBricks);
houseGarageSideRoofMesh.position.x = -25;
houseGarageSideRoofMesh.position.y = 10;
houseGarageSideRoofMesh.position.z = -5;
house.add(houseGarageSideRoofMesh);

var houseMainRoofMesh = new THREE.Mesh(houseMainTriangle, houseRoofTiles);
houseMainRoofMesh.position.x = -15;
houseMainRoofMesh.position.y = 20;
houseMainRoofMesh.position.z = -10;
house.add(houseMainRoofMesh);

var houseFrontRoofMesh = new THREE.Mesh(houseFrontTriangle, houseRoofTiles);
houseFrontRoofMesh.position.x = -15;
houseFrontRoofMesh.position.y = 10;
houseFrontRoofMesh.position.z = -20;
house.add(houseFrontRoofMesh);

var houseGarageRoofMesh = new THREE.Mesh(houseGarageTriangle, houseRoofTiles);
houseGarageRoofMesh.position.x = -25;
houseGarageRoofMesh.position.y = 10;
houseGarageRoofMesh.position.z = -5;
house.add(houseGarageRoofMesh);

house.position.x = 0;
house.position.y = 0;
house.position.z = 50;

scene.add(house);

// Dirt ground.
var dirtGround = new THREE.Object3D();

var dirtGroundMesh = new THREE.Mesh(parkGround, dirt);
dirtGround.add(dirtGroundMesh);

dirtGround.position.x = 2;
dirtGround.position.y = 0;
dirtGround.position.z = -14;

scene.add(dirtGround);

var dirtGround2 = new THREE.Object3D();

var dirtGroundMesh = new THREE.Mesh(parkGround, dirt);
dirtGround2.add(dirtGroundMesh);

var dirtGroundMesh = new THREE.Mesh(parkGround, dirt);
dirtGroundMesh.position.x = -10;
dirtGroundMesh.position.y = 0;
dirtGroundMesh.position.z = 10;
dirtGround2.add(dirtGroundMesh);

var dirtGroundMesh = new THREE.Mesh(parkGround, dirt);
dirtGroundMesh.position.x = -10;
dirtGroundMesh.position.y = 0;
dirtGroundMesh.position.z = 0;
dirtGround2.add(dirtGroundMesh);

dirtGround2.position.x = 0;
dirtGround2.position.y = 0;
dirtGround2.position.z = 30;

scene.add(dirtGround2);

// Brick ground.
var brickGround = new THREE.Object3D();

var brickGroundMesh = new THREE.Mesh(ground, streetBricks);
brickGround.add(brickGroundMesh);
brickGround.position.x = 2;
brickGround.position.y = -0.1;
brickGround.position.z = -12;

scene.add(brickGround);

// Parking lots.
var parkingLot1 = new THREE.Object3D();

var parkingLotMesh = new THREE.Mesh(parkingLotGround, streetBricks);
parkingLot1.add(parkingLotMesh);

parkingLot1.position.x = -2;
parkingLot1.position.y = 0.01;
parkingLot1.position.z = -30;
parkingLot1.rotation.y = Math.PI / 4;

scene.add(parkingLot1);

var parkingLot2 = new THREE.Object3D();

var parkingLotMesh = new THREE.Mesh(parkingLotGround, streetBricks);
parkingLot2.add(parkingLotMesh);

parkingLot2.position.x = 16.5;
parkingLot2.position.y = 0.01;
parkingLot2.position.z = -20.5;
parkingLot2.rotation.y = Math.PI / 4;

scene.add(parkingLot2);

var parkingLot3 = new THREE.Object3D();

var parkingLotMesh = new THREE.Mesh(parkingLotGround, streetBricks);
parkingLot3.add(parkingLotMesh);

parkingLot3.position.x = 9.5;
parkingLot3.position.y = 0.01;
parkingLot3.position.z = -27.5;
parkingLot3.rotation.y = Math.PI / 4;

scene.add(parkingLot3);

/*
* Imported car
*/
var importedCar;
oLoader.load(
	'/asset/car/1967-shelby-ford-mustang.json',
	function(obj){
		importedCar = obj;
		importedCar.position.z = -40; 
		importedCar.position.x = 30;
		//importedCar.rotation.y += Math.PI / 2;
		scene.add(obj);
	}
);

/*
* Imported bench
*/

oLoader.load(
	'/asset/wood-bench-2.json',
	function(obj){
		scene.add(obj);
		obj.scale.set(0.015,0.015,0.015);
		obj.position.x = -6;
		//obj.position.y = 1;
		obj.position.z = -18;
		obj.rotation.y = Math.PI * 1.25;
	}
);

/*
*  Imported house 
*/ 
jLoader = new THREE.ObjectLoader();
jLoader.load(
	'/asset/house2/tim-sips-brokenhurst.json',
	function ( obj) {
		obj.position.x = 25;
		obj.position.z = 31;
		obj.scale.set(2.5, 2.5, 2.5);
		scene.add( obj );
	},
);

/*
* Orbit controls
*/

controls = new THREE.OrbitControls(camera);
controls.autoRotate = 0;
controls.noKeys = false;

/*
* Skybox 
*/
var directions = ["asset/skybox/posx.jpg", "asset/skybox/negx.jpg", "asset/skybox/posy.jpg", "asset/skybox/negy.jpg", "asset/skybox/posz.jpg", "asset/skybox/negz.jpg"]
var materialArray = [];
for(var i = 0; i < 6; i++)
{
	materialArray.push(new THREE.MeshBasicMaterial({
		map: THREE.ImageUtils.loadTexture(directions[i]),
		side: THREE.BackSide
	}));
}

var skyGeometry = new THREE.CubeGeometry(5000, 5000, 5000);
var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(skyBox);

/*
*  Renderer
*/
var render = function () {
	requestAnimationFrame(render);

	// Render car
	// Car movement script
	if (importedCar.position.z < 10){
		importedCar.position.z += 0.2;
	}
	else{
		importedCar.rotation.y = Math.PI * 1.5;
		if (importedCar.position.x > -19){
			importedCar.position.x -=0.2;
		}
		else {
			importedCar.rotation.y = 0;
			if (importedCar.position.z < 35)
			importedCar.position.z += 0.2;
		}
	}
	controls.update();
	renderer.render(scene, camera);
};

render();