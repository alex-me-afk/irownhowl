import fs from 'fs';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
globalThis.self=globalThis;
const l=new GLTFLoader();l.register(()=>({name:'KHR_texture_basisu',loadTexture:()=>Promise.resolve(null)}));l.setMeshoptDecoder(MeshoptDecoder);
const buf=fs.readFileSync(process.argv[2]);
l.parse(buf.buffer.slice(buf.byteOffset,buf.byteOffset+buf.byteLength),'',g=>{g.scene.updateMatrixWorld(true);const re=new RegExp(process.argv[3]||'.','i');
g.scene.traverse(o=>{if(!o.isMesh)return;const mats=[].concat(o.material).map(m=>m.name).join('|');const key=(o.name+' '+o.parent?.name+' '+mats);if(!re.test(key))return;const b=new THREE.Box3().setFromObject(o);console.log(JSON.stringify(o.name),'<',o.parent?.name,'mat',mats,'min',b.min.toArray().map(v=>v.toFixed(1)).join(','),'max',b.max.toArray().map(v=>v.toFixed(1)).join(','));});},e=>console.error('ERR',e));
