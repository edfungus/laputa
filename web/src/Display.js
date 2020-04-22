import { useEffect } from 'react';
import * as THREE from "three";

function Display() {
	useEffect(()=>{
		let scene  = new THREE.Scene(); 
		let camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 1000);
		let renderer = new THREE.WebGLRenderer({
			antialiasing: true
		});

		renderer.setSize(window.innerWidth, window.innerHeight);
		window.addEventListener('resize', () => {
			renderer.setSize(window.innerWidth, window.innerHeight);
			camera.aspect = window.innerWidth / window.innerHeight;
    		camera.updateProjectionMatrix();	
		});
		renderer.setClearColor(0x404040)
		renderer.shadowMap.enabled = true;
		document.getElementById('root').appendChild(renderer.domElement);

		// camera.position.set(5,3,10);
		camera.position.set(-10,10,20);
		camera.lookAt(0,2,0);
		
		let grid = new THREE.GridHelper(10, 20, 0x696969, 0x696969);
		grid.position.y = 1;
		scene.add(grid);

		let geometry = new THREE.BoxGeometry(1,1,1);
		let material = new THREE.MeshLambertMaterial({color:0xf74d69});
		let cube = new THREE.Mesh(geometry, material);
		cube.castShadow = true
		cube.receiveShadow = true
		cube.position.set(0,2,0)
		scene.add(cube);

		var light = new THREE.HemisphereLight();
		light.intensity = 0.35;
		light.castShadow = true;
		scene.add(light);

		var light = new THREE.DirectionalLight();
		light.position.set(0,10,0);
		light.castShadow = true;
		light.shadow.radius = 8;
		// light.shadow.camera.zoom = 2;
		scene.add(light);

		var plane = new THREE.Mesh(
			new THREE.PlaneBufferGeometry( 5, 5 ),
			new THREE.ShadowMaterial( { color: 0x111111 } )
		);
		plane.rotation.x = - Math.PI / 2;
		plane.receiveShadow = true;
		scene.add(plane);

		// var geometry = new THREE.BoxBufferGeometry( 0.1, 0.1, 0.1 );
		// var material = new THREE.MeshLambertMaterial( /*{ vertexColors: true }*/ );
		// var mesh = new THREE.InstancedMesh( geometry, material, 200 );
		// mesh.castShadow = true;
		// mesh.receiveShadow = true;
		// scene.add( mesh );

		window.addEventListener('keydown', (e) => {
			switch ( e.keyCode ) {
				case 38: /*up*/
				case 87: /*W*/ cube.position.x += 1; break;

				case 37: /*left*/
				case 65: /*A*/ cube.position.z -= 1; break;

				case 40: /*down*/
				case 83: /*S*/ cube.position.x -= 1; break;

				case 39: /*right*/
				case 68: /*D*/ cube.position.z += 1; break;

				case 82: /*R*/ cube.position.y += 1; break;
				case 70: /*F*/ cube.position.y -= 1; break;

			}
		}, false);

		let animate = function() {
			requestAnimationFrame(animate);
			cube.rotation.x += 0.01;
			cube.rotation.y += 0.01;
			renderer.render(scene, camera);
		}
		animate();
    }, []); 
    return ("");
}

export default Display;
