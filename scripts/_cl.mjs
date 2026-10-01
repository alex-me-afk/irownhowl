import fs from 'fs';import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
const l=new GLTFLoader();l.setMeshoptDecoder(MeshoptDecoder);l.register(()=>({name:'KHR_texture_basisu',loadTexture:()=>Promise.resolve(null)}));
const [file,name]=process.argv.slice(2);const buf=fs.readFileSync(file);
l.parse(buf.buffer.slice(buf.byteOffset,buf.byteOffset+buf.byteLength),'',g=>{g.scene.updateMatrixWorld(true);
g.scene.traverse(o=>{if(!o.isMesh||o.name!==name)return;const p=o.geometry.attributes.position;const v=new THREE.Vector3();const pts=[];for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i).applyMatrix4(o.matrixWorld);pts.push(v.clone());}
// union-find by distance 0.6
const par=pts.map((_,i)=>i);const f=i=>par[i]===i?i:(par[i]=f(par[i]));const cell=0.8,grid=new Map();pts.forEach((q,i)=>{const k=[Math.floor(q.x/cell),Math.floor(q.y/cell),Math.floor(q.z/cell)];for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let c=-1;c<=1;c++){const l=grid.get((k[0]+a)+','+(k[1]+b)+','+(k[2]+c));if(l)for(const j of l)if(q.distanceTo(pts[j])<(+process.argv[4]||0.5))par[f(i)]=f(j);}const kk=k.join(',');(grid.get(kk)||grid.set(kk,[]).get(kk)).push(i);});
const cl=new Map();pts.forEach((q,i)=>{const r=f(i);(cl.get(r)||cl.set(r,new THREE.Box3()).get(r)).expandByPoint(q);});
[...cl.values()].forEach(b=>{const c=b.getCenter(new THREE.Vector3()),s=b.getSize(new THREE.Vector3());console.log(c.toArray().map(x=>x.toFixed(1)).join(','),'size',s.toArray().map(x=>x.toFixed(1)).join(','));});});});
