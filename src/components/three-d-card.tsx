"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeDCard: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const currentMount = mountRef.current;

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);
        
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(0, 2, 5);
        scene.add(pointLight);

        // Particle effect
        const particleCount = 20000;
        const particlesGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities: THREE.Vector3[] = [];

        const cardWidth = 4.5;
        const cardHeight = 2.8;
        const cardDepth = 0.2;

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * cardWidth;
            positions[i * 3 + 1] = (Math.random() - 0.5) * cardHeight;
            positions[i * 3 + 2] = (Math.random() - 0.5) * cardDepth;

            velocities.push(
                new THREE.Vector3(
                    (Math.random() - 0.5) * 0.005,
                    Math.random() * 0.01 + 0.005,
                    (Math.random() - 0.5) * 0.005
                )
            );
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            color: 0x444444,
            size: 0.02,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true,
        });

        const ashCloud = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(ashCloud);

        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            const positionsAttribute = ashCloud.geometry.attributes.position as THREE.BufferAttribute;

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                
                positionsAttribute.array[i3] += velocities[i].x;
                positionsAttribute.array[i3 + 1] += velocities[i].y;
                positionsAttribute.array[i3 + 2] += velocities[i].z;

                velocities[i].x += (Math.random() - 0.5) * 0.0001;
                velocities[i].z += (Math.random() - 0.5) * 0.0001;

                if (positionsAttribute.array[i3 + 1] > cardHeight * 1.5) {
                    positionsAttribute.array[i3] = (Math.random() - 0.5) * cardWidth;
                    positionsAttribute.array[i3 + 1] = -cardHeight / 2;
                    positionsAttribute.array[i3 + 2] = (Math.random() - 0.5) * cardDepth;

                    velocities[i].x = (Math.random() - 0.5) * 0.005;
                    velocities[i].y = Math.random() * 0.01 + 0.005;
                    velocities[i].z = (Math.random() - 0.5) * 0.005;
                }
            }

            positionsAttribute.needsUpdate = true;
            
            ashCloud.rotation.y = elapsedTime * 0.1;

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
