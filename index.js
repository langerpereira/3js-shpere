import * as THREE from 'three';
import { OrbitControls } from "jsm/controls/OrbitControls.js"
//  console.log(OrbitControls)

const w = window.innerWidth;
const h = window.innerHeight;

//renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
})
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement)

//camera
const fov = 75
const aspect = w/h
const near = 0.1
const far = 10
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.z = 2

//scene
const scene = new THREE.Scene();

//orbitcontrols
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;
controls.dampingFactor = 0.03 //the mesh rotates after u have rotated (transition)

//object
const geometry = new THREE.IcosahedronGeometry(1.0, 2)
const material = new THREE.MeshStandardMaterial({
    color:0xffffff,
    // wireframe:true,
    flatShading:true
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const wireMat = new THREE.MeshBasicMaterial({
    color:0xffffff,
    wireframe:true
})
const wireMash = new THREE.Mesh(geometry, wireMat)
wireMash.scale.setScalar(1.001)
mesh.add(wireMash)

const hemiLight = new THREE.HemisphereLight(0x5B51D8, 0xaa5500)
scene.add(hemiLight)

function animate(t = 0){
    requestAnimationFrame(animate)
    mesh.rotation.y = t * 0.0001
    renderer.render(scene, camera)
    controls.update()
}

animate();