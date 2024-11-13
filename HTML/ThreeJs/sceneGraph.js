import * as Three from "three";
const objects = [];
const scene = new Three.Scene();
//add camera
const fov = 40;
const aspect = 2;
const near = 0.1;
const far = 1000;
const camera = new Three.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 50, 0);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

const renderer = new Three.WebGLRenderer();

//solar system
const solarSystem = new Three.Object3D();
scene.add(solarSystem);
objects.push(solarSystem);

//earths orbit
const earthOrbit = new Three.Object3D();
earthOrbit.position.x = 10;
solarSystem.add(earthOrbit);
objects.push(earthOrbit);

//moon orbit
const moonOrbit = new Three.Object3D();
moonOrbit.position.x = 2;
earthOrbit.add(moonOrbit);
//objects.push(moonOrbit);

//sphere
const radius = 1;
const width = 6;
const height = 6;

const sphere = new Three.SphereGeometry(radius, width, height);

//sun material
const sunMaterial = new Three.MeshPhongMaterial({
  emissive: 0xffff00,
});

const sunMesh = new Three.Mesh(sphere, sunMaterial);
sunMesh.scale.set(5, 5, 5);
solarSystem.add(sunMesh);
objects.push(sunMesh);

//add light to the sun
const color = 0xffffff;
const intensity = 3;
const light = new Three.PointLight(color, intensity);
scene.add(light);

//add earth
const earthMaterial = new Three.MeshPhongMaterial({
  color: 0x2233ff,
  emissive: 0x112244,
});
const earthMesh = new Three.Mesh(sphere, earthMaterial);
earthOrbit.add(earthMesh);
objects.push(earthMesh);

//moon
const moonMaterial = new Three.MeshPhongMaterial({
  color: 0x888888,
  emissive: 0x222222,
});
const moonMesh = new Three.Mesh(sphere, moonMaterial);
moonMesh.scale.set(0.5, 0.5, 0.5);
moonOrbit.add(moonMesh);
objects.push(moonMesh);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
function animate() {
  objects.forEach((obj) => {
    obj.rotation.y -= 0.01;
  });
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
