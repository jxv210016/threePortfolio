import React, { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Sky, Stars, Plane } from "@react-three/drei";
import Building from "./Building";

const CityLayout = () => {
  const Navigation = () => {
    const { camera } = useThree();

    const handleKeyDown = (event) => {
      switch (event.key) {
        case "w":
          camera.position.z -= 1;
          break;
        case "s":
          camera.position.z += 1;
          break;
        case "a":
          camera.position.x -= 1;
          break;
        case "d":
          camera.position.x += 1;
          break;
        default:
          break;
      }
    };

    useEffect(() => {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [camera]);

    return null;
  };

  const buildings = [];

  for (let x = -10; x <= 10; x += 5) {
    for (let z = -10; z <= 10; z += 5) {
      const height = Math.random() * 5 + 1; // Random building height
      buildings.push(
        <Building
          key={`${x}-${z}`}
          position={[x, height / 2, z]}
          size={[2, height, 2]}
        />
      );
    }
  }

  return (
    <Canvas
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
      camera={{ position: [0, 10, 20] }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[0, 10, 5]} intensity={1.5} />
      <Sky sunPosition={[100, 20, 100]} />
      <Stars />
      <OrbitControls
        enableZoom={true}
        minDistance={10}
        maxDistance={50}
        target={[0, 2, 0]}
      />

      {/* Roads */}
      <Plane
        args={[50, 50]} // Size of the plane
        rotation={[-Math.PI / 2, 0, 0]} // Rotate to make it flat
        position={[0, 0.01, 0]} // Slightly above zero to avoid z-fighting
      >
        <meshStandardMaterial color="darkslategray" />
      </Plane>

      {/* Buildings */}
      {buildings}

      {/* Navigation */}
      <Navigation />
    </Canvas>
  );
};

export default CityLayout;
