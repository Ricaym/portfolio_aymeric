import { Canvas } from "@react-three/fiber";
import {OrbitControls, useGLTF, useAnimations} from "@react-three/drei";
import { useEffect, useRef } from "react";

function Model() {
	const group = useRef();

	const gltf = useGLTF("/portfolio_aymeric/companion.v3.0.1.glb");

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

				// if (child.material) {
				// 	child.material.roughness = 1;
				// 	child.material.metalness = 0;
				// }
			}
		});

		const handler = (e) => {
				e.stopPropagation();
			};

			window.addEventListener('contextmenu', handler, true);

			return () => {
				window.removeEventListener('contextmenu', handler, true);
		};
	}, [gltf]);

	return (
		<primitive ref={group} object={gltf.scene} scale={2} position={[0, 0, 0]} rotation={[0.2, 5.2, 0.6]} />
	);
}

export default function Companion() {

	return (
		<div className="Companion">
			<Canvas shadows camera={{ position: [0, 10, 15], fov: 45 }} gl={{ antialias: true }}>

				<ambientLight intensity={0.8} />

				<directionalLight position={[5, 10, 5]} intensity={2.5} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} shadow-camera-near={0.5} shadow-camera-far={50} shadow-bias={-0.0001} />

				<directionalLight position={[-5, 5, -5]} intensity={1} />

				<Model />

				<OrbitControls enablePan={false} minDistance={4} maxDistance={400} /**mouseButtons={{LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: -1}}*/ />
			</Canvas>
		</div>
	);
}