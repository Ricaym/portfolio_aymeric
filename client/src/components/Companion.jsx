import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";

function Model() {

    const group = useRef();
	const gltf = useGLTF("/portfolio_aymeric/companion-personal.glb");
    
    const { actions } = useAnimations(gltf.animations, group);

	useEffect(() => {
		if (!actions) return;

		// lance toutes les animations associées aux objets
		Object.values(actions).forEach((action) => {
			action.reset().play();
		});
	}, [actions]);

	return (
		<primitive
            ref={group}
			object={gltf.scene}
			scale={2.5}
			position={[0, 0, 0]}
            rotation={[0, 5, 0.5]}
		/>
	);
}

export default function Companion() {
	return (
		<div className="Companion">
			<Canvas camera={{ position: [0, 10, 20], fov: 50 }}>
				<ambientLight intensity={2} />

				<directionalLight position={[2, 10, 2]} intensity={3}/>

				<Model />

				<OrbitControls />
			</Canvas>
		</div>
	);
}