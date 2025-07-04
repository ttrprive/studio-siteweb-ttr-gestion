"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeDCard: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!mountRef.current) return;

        const currentMount = mountRef.current;

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 4;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);
        
        const geometry = new THREE.BoxGeometry(3.375, 2.125, 0.05);

        const material = new THREE.MeshStandardMaterial({
            color: '#0077FF',
            metalness: 0.7,
            roughness: 0.2,
        });

        const card = new THREE.Mesh(geometry, material);
        scene.add(card);
        
        const edges = new THREE.EdgesGeometry(geometry);
        const lineMaterial = new THREE.LineBasicMaterial({ color: '#00FFD1' });
        const wireframe = new THREE.LineSegments(edges, lineMaterial);
        card.add(wireframe);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        const pointLight2 = new THREE.PointLight(0x00FFD1, 0.8);
        pointLight2.position.set(-5, -5, 2);
        scene.add(pointLight2);
        
        const handleMouseMove = (event: MouseEvent) => {
            const { clientX, clientY } = event;
            const { innerWidth, innerHeight } = window;
            mouse.current.x = (clientX / innerWidth) * 2 - 1;
            mouse.current.y = -(clientY / innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            card.rotation.x = 0.1 * Math.sin(elapsedTime * 0.5);
            card.rotation.y = 0.2 * Math.sin(elapsedTime * 0.3);
            
            card.rotation.y += (mouse.current.x * 0.5 - card.rotation.y) * 0.05;
            card.rotation.x += (-mouse.current.y * 0.5 - card.rotation.x) * 0.05;

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
            window.removeEventListener('mousemove', handleMouseMove);
            if (currentMount) {
                currentMount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} className="h-full w-full" />;
};

export default ThreeDCard;
