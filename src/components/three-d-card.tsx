"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeDCard: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const currentMount = mountRef.current;

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(45, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 8;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);
        
        const light = new THREE.PointLight(0xffffff, 1.5);
        light.position.set(10, 10, 10);
        scene.add(light);
        
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);

        // Create 3D logo from basic shapes
        const logoGroup = new THREE.Group();
        const scale = 0.04;
        const depth = 0.5;

        const materialWhite = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.8,
            roughness: 0.2
        });

        const materialBlue = new THREE.MeshStandardMaterial({
            color: 0x2461ff,
            metalness: 0.8,
            roughness: 0.2
        });
        
        // t horizontal bar
        const tHGeom = new THREE.BoxGeometry(44.5 * scale, 11.1 * scale, depth);
        const tHMesh = new THREE.Mesh(tHGeom, materialWhite);
        tHMesh.position.set(61.15 * scale, -62.65 * scale, 0);
        logoGroup.add(tHMesh);

        // t1 vertical bar
        const t1VGeom = new THREE.BoxGeometry(13.6 * scale, 56.4 * scale, depth);
        const t1VMesh = new THREE.Mesh(t1VGeom, materialWhite);
        t1VMesh.position.set(51.8 * scale, -73.15 * scale, 0);
        logoGroup.add(t1VMesh);
        
        // t2 vertical bar
        const t2VGeom = new THREE.BoxGeometry(13.7 * scale, 56.4 * scale, depth);
        const t2VMesh = new THREE.Mesh(t2VGeom, materialWhite);
        t2VMesh.position.set(70.75 * scale, -73.15 * scale, 0);
        logoGroup.add(t2VMesh);

        // r vertical bar
        const rVGeom = new THREE.BoxGeometry(13.7 * scale, 30.6 * scale, depth);
        const rVMesh = new THREE.Mesh(rVGeom, materialBlue);
        rVMesh.position.set(90.25 * scale, -86.025 * scale, 0);
        logoGroup.add(rVMesh);
        
        // r top bar
        const rTGeom = new THREE.BoxGeometry(13.7 * scale, 15 * scale, depth);
        const rTMesh = new THREE.Mesh(rTGeom, materialBlue);
        rTMesh.position.set(90.25 * scale, -64.6 * scale, 0);
        logoGroup.add(rTMesh);
        
        // r diagonal leg
        const rLegShape = new THREE.Shape();
        rLegShape.moveTo( 94.6875 * scale, -68.996094 * scale );
        rLegShape.lineTo( 109.769531 * scale, -56.328125 * scale );
        rLegShape.lineTo( 94.6875 * scale, -56.328125 * scale );
        rLegShape.lineTo( 94.6875 * scale, -68.996094 * scale );

        const extrudeSettings = {
            depth: depth,
            bevelEnabled: false,
        };
        const rLegGeom = new THREE.ExtrudeGeometry(rLegShape, extrudeSettings);
        const rLegMesh = new THREE.Mesh(rLegGeom, materialBlue);
        logoGroup.add(rLegMesh);

        // Center the logo
        const box = new THREE.Box3().setFromObject(logoGroup);
        const center = box.getCenter(new THREE.Vector3());
        logoGroup.position.sub(center);

        scene.add(logoGroup);

        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            logoGroup.rotation.y += 0.005;
            logoGroup.rotation.x = Math.sin(elapsedTime) * 0.05;
            
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            if (currentMount) {
                camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (currentMount && renderer.domElement.parentNode === currentMount) {
                currentMount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} className="h-full w-full" />;
};

export default ThreeDCard;
