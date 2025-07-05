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
            texture.repeat.set(0.625, 0.625);
            texture.offset.set(0.1, 0.35);
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
            roughness: 0.25,
            map: logoTexture,
        });
        
        const card = new THREE.Mesh(cardGeometry, cardMaterial);
        card.castShadow = true;
        scene.add(card);

        // Modern App Icon
        const iconSize = 0.5;
        const iconRadius = 0.1;
        const iconDepth = 0.05;

        const iconShape = new THREE.Shape();
        iconShape.moveTo(-iconSize / 2 + iconRadius, -iconSize / 2);
        iconShape.lineTo(iconSize / 2 - iconRadius, -iconSize / 2);
        iconShape.quadraticCurveTo(iconSize / 2, -iconSize / 2, iconSize / 2, -iconSize / 2 + iconRadius);
        iconShape.lineTo(iconSize / 2, iconSize / 2 - iconRadius);
        iconShape.quadraticCurveTo(iconSize / 2, iconSize / 2, iconSize / 2 - iconRadius, iconSize / 2);
        iconShape.lineTo(-iconSize / 2 + iconRadius, iconSize / 2);
        iconShape.quadraticCurveTo(-iconSize / 2, iconSize / 2, -iconSize / 2, iconSize / 2 - iconRadius);
        iconShape.lineTo(-iconSize / 2, -iconSize / 2 + iconRadius);
        iconShape.quadraticCurveTo(-iconSize / 2, -iconSize / 2, -iconSize / 2 + iconRadius, -iconSize / 2);

        const iconExtrudeSettings = {
            depth: iconDepth,
            bevelEnabled: false
        };

        const iconGeometry = new THREE.ExtrudeGeometry(iconShape, iconExtrudeSettings);
        
        const iconMaterial = new THREE.MeshStandardMaterial({
            color: 0x00FFD1, // Cyan accent
            metalness: 0.7,
            roughness: 0.3
        });

        const appIcon = new THREE.Mesh(iconGeometry, iconMaterial);
        appIcon.castShadow = true;
        
        // Position calculation
        // X position: 1cm from right edge to the icon's right edge
        const oneCmInUnits = width / 8.6;
        const iconX = (width / 2) - oneCmInUnits - (iconSize / 2);

        // Y position: centered with logo.
        const logoVRepeat = 0.625;
        const logoVOffset = 0.35;
        const logoUVCenterV = logoVOffset + (logoVRepeat / 2);
        const iconY = (logoUVCenterV - 0.5) * height;

        // Z position: on top of the card
        const iconZ = (depth / 2);

        appIcon.position.set(iconX, iconY, iconZ);

        card.add(appIcon);

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
