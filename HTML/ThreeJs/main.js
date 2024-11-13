import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(
  20,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
const renderer = new Three.WebGLRenderer();

//Set the cube
const geometry = new Three.BoxGeometry(1, 1, 1);
const material = new Three.MeshPhongMaterial({
  color: 0x44aa88,
});
const cube = new Three.Mesh(geometry, material);

//Add asome lights
const light = new Three.DirectionalLight(0xffffff, 3);
light.position.set(-1, 2, 4);

//scene.add(cube, light);

camera.position.z = 6;

renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
document.body.appendChild(renderer.domElement);

//add some controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = false;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.enableRotate = true;
controls.enablePan = false;

//draw a circle
const circle = new Three.CircleGeometry(7, 34);
const circleMaterial = new Three.MeshBasicMaterial({ color: 0x44aa88 });

const circleMesh = new Three.Mesh(circle, circleMaterial);
scene.add(circleMesh, light);

function animate() {
  controls.update();
  //   cube.rotation.x += 0.1;
  //   cube.rotation.y += 0.01;
  //   cube.rotation.z += 0.01;
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
