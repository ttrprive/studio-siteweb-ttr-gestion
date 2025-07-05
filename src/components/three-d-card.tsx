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
        camera.position.z = 15; // Dégage un peu la carte

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        currentMount.appendChild(renderer.domElement);
        
        const ambientLight = new THREE.AmbientLight(0xffffff, 5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 5.0);
        directionalLight.position.set(2, 5, 10);
        directionalLight.castShadow = true;
        
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;

        scene.add(directionalLight);

        const textureLoader = new THREE.TextureLoader();
        const logoTexture = textureLoader.load('/logo.svg', (texture) => {
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
            texture.repeat.set(0.5, 0.5); // Agrandi le logo * 0.5
            texture.offset.set(0.25, 0.28); // Centré et descendu
            texture.needsUpdate = true;
        });
        logoTexture.colorSpace = THREE.SRGBColorSpace;

        const width = 4.5;
        const height = 2.8;
        const depth = 0.1;
        const radius = 0.2;
        
        const roundedRectShape = new THREE.Shape();
        
        roundedRectShape.moveTo( -width/2 + radius, -height/2 );
        roundedRectShape.lineTo( width/2 - radius, -height/2 );
        roundedRectShape.quadraticCurveTo( width/2, -height/2, width/2, -height/2 + radius );
        roundedRectShape.lineTo( width/2, height/2 - radius );
        roundedRectShape.quadraticCurveTo( width/2, height/2, width/2 - radius, height/2 );
        roundedRectShape.lineTo( -width/2 + radius, height/2 );
        roundedRectShape.quadraticCurveTo( -width/2, height/2, -width/2, height/2 - radius );
        roundedRectShape.lineTo( -width/2, -height/2 + radius );
        roundedRectShape.quadraticCurveTo( -width/2, -height/2, -width/2 + radius, -height/2 );

        const extrudeSettings = {
            depth: depth,
            bevelEnabled: false
        };

        const cardGeometry = new THREE.ExtrudeGeometry( roundedRectShape, extrudeSettings );
        cardGeometry.center();

        const cardMaterial = new THREE.MeshStandardMaterial({
            metalness: 1.0,
            roughness: 0.4, // Logo visible
            map: logoTexture,
        });
        
        const card = new THREE.Mesh(cardGeometry, cardMaterial);
        card.castShadow = true;
        scene.add(card);

        const planeGeometry = new THREE.PlaneGeometry(20, 20);
        const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.z = -2;
        plane.receiveShadow = true;
        scene.add(plane);

        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            card.rotation.y = Math.sin(elapsedTime * 0.7) * (Math.PI / 36);
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
