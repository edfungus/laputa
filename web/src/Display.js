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
		document.getElementById('root').appendChild(renderer.domElement);
		
		let grid = new THREE.GridHelper(5, 10, 0x696969, 0x696969);
		grid.position.y = -1;
		scene.add(grid);

		let geometry = new THREE.BoxGeometry(1,1,1);
		let material = new THREE.MeshBasicMaterial({color:0xf74d69});
		let cube = new THREE.Mesh(geometry, material);

		scene.add(cube);
		camera.position.z = 10; // close / far
		camera.position.y = 3; // up / down
		camera.rotateX(-.3);

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
