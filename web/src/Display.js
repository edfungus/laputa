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
		camera.position.set(0,10,20);
		camera.lookAt(0,2,0);
		
		let grid = new THREE.GridHelper(10, 20, 0x696969, 0x696969);
		// grid.position.y = 1;
		grid.receiveShadow = true;
		scene.add(grid);

		let cubeSize = 1.0;
		let geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
		let material = new THREE.MeshLambertMaterial({color:0xf74d69});
		let cube = new THREE.Mesh(geometry, material);
		cube.castShadow = true
		cube.receiveShadow = true
		cube.position.set(0,cubeSize/2,0)
		scene.add(cube);

		// var lighth = new THREE.HemisphereLight();
		// lighth.intensity = 0.35;
		// lighth.castShadow = true;
		// scene.add(lighth);

		var lightd = new THREE.DirectionalLight();
		lightd.position.set(5,10,5);
		lightd.castShadow = true;
		lightd.shadow.radius = 8;
		// lightd.shadow.camera.zoom = 2;
		scene.add(lightd);

		var plane = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(10, 10),
			// new THREE.ShadowMaterial( { color: 0x111111 } )
			new THREE.MeshLambertMaterial({color:0x32a852})
		);
		plane.rotation.x = - Math.PI / 2;
		plane.rotation.z = Math.PI;
		plane.position.y = -.01;
		plane.receiveShadow = true;
		// scene.add(plane);

		// var geometry = new THREE.BoxBufferGeometry( 0.1, 0.1, 0.1 );
		// var material = new THREE.MeshLambertMaterial( /*{ vertexColors: true }*/ );
		// var mesh = new THREE.InstancedMesh( geometry, material, 200 );
		// mesh.castShadow = true;
		// mesh.receiveShadow = true;
		// scene.add( mesh );

		// animate loop
		let animate = function() {
			requestAnimationFrame(animate);
			cube.rotation.y += 0.01;
			// cube.rotation.z += 0.01;
			renderer.render(scene, camera);
		}
		animate();
		
		const KEY_FORWARD = "foward"
		const KEY_BACKWARD = "backward"
		const KEY_LEFT = "left"
		const KEY_RIGHT = "right"
		const KEY_JUMP = "jump"
		var keystate = {}
		let setKeystate = (code, bool) => {
			switch (code) {
				case 38: /*up*/
				case 87: /*W*/ 
					keystate[KEY_FORWARD] = bool;
					break;

				case 40: /*down*/
				case 83: /*S*/ 
					keystate[KEY_BACKWARD] = bool;
					break;

				case 37: /*left*/
				case 65: /*A*/
					keystate[KEY_LEFT] = bool;
					break;
				
				case 39: /*right*/
				case 68: /*D*/	
					keystate[KEY_RIGHT] = bool;
					break;

				case 32:
					keystate[KEY_JUMP] = bool;
					break;
			}
		}
		window.addEventListener('keydown', (e) => {
			setKeystate(e.keyCode, true)
		}, false);
		window.addEventListener('keyup', (e) => {
			setKeystate(e.keyCode, false)
		}, false);

		// game loop
		let gameTick = 25;
		let step = .2;
		let jumpCurrentFrame = 0;
		let jumpHeight = cubeSize * 2;
		let jumpFrames = 8;
		let jumpHeightPerFrame = jumpHeight/(2* jumpFrames);
		let gameLoop = function () {
			let moved = false;
			if (keystate[KEY_FORWARD] && cube.position.z > -4.5) {
				cube.position.z -= step; 
				moved = true
			}
			if (keystate[KEY_BACKWARD] && cube.position.z < 4.5) {
				cube.position.z += step; 
				moved = true
			}
			if (keystate[KEY_LEFT] && cube.position.x > -4.5) {
				cube.position.x -= step; 
				moved = true
			}
			if (keystate[KEY_RIGHT] && cube.position.x < 4.5) {
				cube.position.x += step; 
				moved = true
			}
			if ((keystate[KEY_JUMP] && jumpCurrentFrame == 0) || jumpCurrentFrame != 0) {
				jumpCurrentFrame += 1;
				// check whether we are in first or second half of animation
				if (jumpCurrentFrame <= jumpFrames/2) {
					cube.position.y += jumpHeightPerFrame;
				} else if (jumpCurrentFrame <= jumpFrames) {
					cube.position.y -= jumpHeightPerFrame;
				}
				if (jumpCurrentFrame == jumpFrames) {
					cube.position.y = cubeSize/2; // in case of drift
				}
				// debounce
				if (jumpCurrentFrame > jumpFrames) {
					jumpCurrentFrame = 0;
				}
			}
			if (moved) {
				console.log(keystate, "x:", cube.position.x, ", y: ", cube.position.y, ", z: ", cube.position.z);
			}
			setTimeout(gameLoop, gameTick);
		}    
		gameLoop();
    }, []); 
    return ("");
}

export default Display;
