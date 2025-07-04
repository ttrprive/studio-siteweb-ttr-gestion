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
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);
        
        const light = new THREE.PointLight(0xffffff, 1.2);
        light.position.set(10, 10, 10);
        scene.add(light);
        
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const textureLoader = new THREE.TextureLoader();
        const logoTexture = textureLoader.load('/logo.svg');
        logoTexture.colorSpace = THREE.SRGBColorSpace;

        const geometry = new THREE.BoxGeometry(3, 3, 0.1);
        const material = new THREE.MeshStandardMaterial({ 
            map: logoTexture,
            metalness: 0.8, 
            roughness: 0.2 
        });
        const card = new THREE.Mesh(geometry, material);
        scene.add(card);

        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            card.rotation.y += 0.005;
            card.rotation.x = Math.sin(elapsedTime) * 0.05;
            
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
