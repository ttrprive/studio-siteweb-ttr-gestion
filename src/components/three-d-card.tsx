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
        // Enable shadows
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows
        currentMount.appendChild(renderer.domElement);
        
        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Ambient light for general illumination
        scene.add(ambientLight);

        // Directional light to cast shadows
        const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5); // Increased intensity for brighter look
        directionalLight.position.set(2, 5, 10); // Positioned in front, above, and slightly to the side
        directionalLight.castShadow = true;
        
        // Configure shadow properties
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;

        scene.add(directionalLight);

        // Card with logo texture
        const textureLoader = new THREE.TextureLoader();
        const logoTexture = textureLoader.load('/logo.svg', (texture) => {
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
            texture.needsUpdate = true;
        });
        logoTexture.colorSpace = THREE.SRGBColorSpace;

        const cardGeometry = new THREE.BoxGeometry(3.5, 3.5, 0.1);
        const cardMaterial = new THREE.MeshStandardMaterial({
            metalness: 0.9, // More metallic
            roughness: 0.1, // Less rough, more reflective for a "scintillating" effect
            map: logoTexture,
        });
        
        const card = new THREE.Mesh(cardGeometry, cardMaterial);
        card.castShadow = true; // The card will cast a shadow
        scene.add(card);

        // Plane to receive the shadow
        const planeGeometry = new THREE.PlaneGeometry(20, 20);
        const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.2 }); // Material that only receives shadows
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.z = -2; // Position it behind the card
        plane.receiveShadow = true; // The plane will receive the shadow
        scene.add(plane);

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
