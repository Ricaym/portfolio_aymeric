import { Canvas } from "@react-three/fiber";
import {
	OrbitControls,
	useGLTF,
	useAnimations,
	// Environment,
	ContactShadows,
} from "@react-three/drei";

import { useEffect, useRef } from "react";

function Model() {
	const group = useRef();

	const gltf = useGLTF("/portfolio_aymeric/companion-v2.0.1.glb");

	const { actions } = useAnimations(gltf.animations, group);

	useEffect(() => {
		if (!actions) return;

		Object.values(actions).forEach((action) => {
			action.reset().fadeIn(0.5).play();
		});

		return () => {
			Object.values(actions).forEach((action) => {
				action.fadeOut(0.5);
			});
		};
	}, [actions]);

	useEffect(() => {
		gltf.scene.traverse((child) => {
			if (child.isMesh) {
				child.castShadow = true;
				child.receiveShadow = true;

				// Rend les matériaux plus propres
				// if (child.material) {
				// 	child.material.roughness = 0.7;
				// 	child.material.metalness = 0.2;
				// }
			}
		});
	}, [gltf]);

	return (
		<primitive
			ref={group}
			object={gltf.scene}
			scale={2}
			position={[0, 0, 0]}
			rotation={[0.2, 5.2, 0.6]}
		/>
	);
}

export default function Companion() {

	return (
		<div className="Companion">
			<Canvas
				shadows
				camera={{ position: [0, 10, 15], fov: 45 }}
				gl={{ antialias: true }}
			>

				{/* Lumière ambiante douce */}
				<ambientLight intensity={0.8} />

				{/* Lumière principale */}
				<directionalLight
					position={[5, 10, 5]}
					intensity={2.5}
					castShadow
					shadow-mapSize-width={2048}
					shadow-mapSize-height={2048}
					shadow-camera-near={0.5}
					shadow-camera-far={50}
					shadow-bias={-0.0001}
				/>

				{/* Lumière secondaire pour déboucher les ombres */}
				<directionalLight
					position={[-5, 5, -5]}
					intensity={1}
				/>

				{/* <Environment preset="studio" /> */}

				{/* Ombres propres */}
				<ContactShadows
					position={[0, -4, 0]}
					opacity={0.5}
					scale={20}
					blur={2.5}
					far={10}
				/>

				<Model />

				<OrbitControls
					enablePan={false}
					minDistance={8}
					maxDistance={25}
				/>
			</Canvas>
		</div>
	);
}