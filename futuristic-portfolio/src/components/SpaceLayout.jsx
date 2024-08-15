import React, { useRef, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Planet from "./Planet";
import gsap from "gsap";

const SpaceLayout = () => {
  const [currentPlanetIndex, setCurrentPlanetIndex] = useState(0);
  const cameraRef = useRef();

  const planetPositions = [
    { x: 0, y: 0, z: 0 },
    { x: 100, y: 0, z: 0 },
    { x: 200, y: 0, z: 0 },
    { x: 300, y: 0, z: 0 },
  ];

  const moveToPlanet = (index, camera) => {
    if (index >= 0 && index < planetPositions.length) {
      const targetPosition = planetPositions[index];

      console.log(`Moving to planet index: ${index}`, targetPosition);

      // Smoothly move camera to the target planet
      gsap.to(camera.position, {
        x: targetPosition.x + 20, // Adjust to change distance from the planet
        y: targetPosition.y + 10,
        z: targetPosition.z + 30,
        duration: 2, // Duration of the transition
        ease: "power2.inOut", // Smooth easing
        onUpdate: () => {
          camera.lookAt(targetPosition.x, targetPosition.y, targetPosition.z);
        },
        onComplete: () => {
          console.log(`Arrived at planet index: ${index}`);
        },
      });

      setCurrentPlanetIndex(index);
    }
  };

  return (
    <>
      <MenuBar />
      <Canvas
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        camera={{ position: [0, 0, 50], fov: 60 }}
        onCreated={({ camera }) => {
          cameraRef.current = camera;
        }}
      >
        <Scene
          moveToPlanet={moveToPlanet}
          currentPlanetIndex={currentPlanetIndex}
        />
      </Canvas>
      <NavigationButtons
        moveToPlanet={(index) => {
          if (cameraRef.current) {
            moveToPlanet(index, cameraRef.current);
          }
        }}
        currentPlanetIndex={currentPlanetIndex}
      />
    </>
  );
};

const Scene = ({ moveToPlanet, currentPlanetIndex }) => {
  const { camera } = useThree();

  useEffect(() => {
    moveToPlanet(currentPlanetIndex, camera);
  }, [currentPlanetIndex, camera, moveToPlanet]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[-20, 20, -20]}
        intensity={1}
        color={"#ffffff"}
      />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
      />
      <Planet
        position={{ x: 0, y: 0, z: 0 }}
        size={[2, 32, 32]}
        texture="/textures/mars_texture.jpg"
        bumpMap="/textures/mars_bump.jpg"
        emissiveColor="red"
        title="Projects"
        content="Here are some of the projects I've worked on..."
      />
      <Planet
        position={{ x: 100, y: 0, z: 0 }}
        size={[3, 32, 32]}
        texture="/textures/venus_texture.jpg"
        bumpMap="/textures/venus_bump.jpg"
        emissiveColor="orange"
        title="Skills"
        content="Here are some of the skills I have..."
      />
      <Planet
        position={{ x: 200, y: 0, z: 0 }}
        size={[2.5, 32, 32]}
        texture="/textures/neptune_texture.jpg"
        bumpMap={null}
        emissiveColor="blue"
        title="About Me"
        content="Here's some information about me..."
      />
      <Planet
        position={{ x: 300, y: 0, z: 0 }}
        size={[2, 32, 32]}
        texture="/textures/pluto_texture.jpg"
        bumpMap="/textures/pluto_bump.jpg"
        emissiveColor="purple"
        title="Contact"
        content="Here’s how you can get in touch with me..."
      />
    </>
  );
};

const NavigationButtons = ({ currentPlanetIndex, moveToPlanet }) => {
  const handleNext = () => {
    if (currentPlanetIndex < 3) {
      console.log("Next button clicked. Current index:", currentPlanetIndex);
      moveToPlanet(currentPlanetIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPlanetIndex > 0) {
      console.log(
        "Previous button clicked. Current index:",
        currentPlanetIndex
      );
      moveToPlanet(currentPlanetIndex - 1);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
      }}
    >
      <button onClick={handlePrevious} disabled={currentPlanetIndex === 0}>
        Previous
      </button>
      <button onClick={handleNext} disabled={currentPlanetIndex === 3}>
        Next
      </button>
    </div>
  );
};

const MenuBar = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: "10px",
        zIndex: 10,
      }}
    >
      <h1 style={{ color: "white", margin: 0 }}>My Portfolio</h1>
    </div>
  );
};

export default SpaceLayout;
