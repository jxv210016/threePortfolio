import React, { useRef, useEffect, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Stars, OrbitControls, Html } from "@react-three/drei";
import Planet from "./Planet";
import * as THREE from "three";
import "../styles/planetContent.css"; // Use your existing CSS

const SpaceLayout = () => {
  const [currentPlanetIndex, setCurrentPlanetIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const cameraRef = useRef();

  const handleMoveToPlanet = (index) => {
    setCurrentPlanetIndex(index);
  };

  useEffect(() => {
    setShowInfo(false); // Hide info during transition
  }, [currentPlanetIndex]);

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
          currentPlanetIndex={currentPlanetIndex}
          setShowInfo={setShowInfo}
          showInfo={showInfo}
        />
        <OrbitControls />
        <NavigationButtons
          currentPlanetIndex={currentPlanetIndex}
          moveToPlanet={handleMoveToPlanet}
        />
      </Canvas>
    </>
  );
};

const Scene = ({ currentPlanetIndex, setShowInfo, showInfo }) => {
  const { camera } = useThree();
  const [targetPosition, setTargetPosition] = useState([0, 0, 0]);
  const [moving, setMoving] = useState(false);
  const [zoomPhase, setZoomPhase] = useState("zoomOut");

  const planetPositions = [
    { x: 0, y: 0, z: 0 },
    { x: 100, y: 0, z: 0 },
    { x: 200, y: 0, z: 0 },
    { x: 300, y: 0, z: 0 },
  ];

  useEffect(() => {
    const targetPos = planetPositions[currentPlanetIndex];
    setTargetPosition([targetPos.x, targetPos.y, targetPos.z]);
    setMoving(true);
    setZoomPhase("zoomOut");
  }, [currentPlanetIndex]);

  useFrame(() => {
    if (moving) {
      const currentPos = camera.position;
      const targetPos = new THREE.Vector3(...targetPosition);

      if (zoomPhase === "zoomOut") {
        camera.fov = THREE.MathUtils.lerp(camera.fov, 70, 0.05);
        camera.updateProjectionMatrix();

        if (Math.abs(camera.fov - 70) < 0.1) {
          setZoomPhase("moveRight");
        }
      } else if (zoomPhase === "moveRight") {
        currentPos.lerp(
          targetPos.clone().add(new THREE.Vector3(0, 0, 50)),
          0.05
        );

        camera.lookAt(targetPos);

        if (
          currentPos.distanceTo(
            targetPos.clone().add(new THREE.Vector3(0, 0, 50))
          ) < 0.1
        ) {
          setZoomPhase("zoomIn");
        }
      } else if (zoomPhase === "zoomIn") {
        camera.fov = THREE.MathUtils.lerp(camera.fov, 60, 0.05);
        camera.updateProjectionMatrix();

        currentPos.lerp(
          targetPos.clone().add(new THREE.Vector3(0, 0, 30)),
          0.05
        );
        camera.lookAt(targetPos);

        if (Math.abs(camera.fov - 60) < 0.1) {
          setMoving(false);
          setTimeout(() => setShowInfo(true), 500); // Delay to trigger fade-in
        }
      }
    }
  });

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
        size={[2.5, 32, 32]}
        texture="/textures/neptune_texture.jpg"
        bumpMap={null}
        emissiveColor="blue"
        title="About Me"
        content={
          <div>
            <p>Get To Know More</p>
            <h2>Jay Vanam</h2>
            <p>
              B.S Computer Science
              <br />
              May 2025
            </p>
            <p>Experience: 6 Months in Frontend Development</p>
            <p>
              👋 I'm Jay, a junior at the University of Texas at Dallas. I enjoy
              video editing, photography, listening to music, and sleeping. I
              also love football and F1. I'm a die-hard Cowboys fan and a
              Ferrari enthusiast.
            </p>
          </div>
        }
        showInfo={showInfo}
      />
      <Planet
        position={{ x: 100, y: 0, z: 0 }}
        size={[3, 32, 32]}
        texture="/textures/venus_texture.jpg"
        bumpMap="/textures/venus_bump.jpg"
        emissiveColor="orange"
        title="Skills"
        content={
          <div>
            <p>Explore My Skills</p>
            <h3>Frontend Development</h3>
            <ul>
              <li>HTML: Intermediate</li>
              <li>CSS: Intermediate</li>
              <li>JavaScript: Basic</li>
              <li>React.js: Intermediate</li>
              <li>Bootstrap: Basic</li>
              <li>Material UI: Basic</li>
            </ul>
            <h3>Backend Development</h3>
            <ul>
              <li>Python: Intermediate</li>
              <li>Java: Intermediate</li>
              <li>C++: Intermediate</li>
              <li>Flask: Intermediate</li>
              <li>Django: Basic</li>
              <li>Git: Basic</li>
            </ul>
          </div>
        }
        showInfo={showInfo}
      />
      <Planet
        position={{ x: 200, y: 0, z: 0 }}
        size={[2, 32, 32]}
        texture="/textures/mars_texture.jpg"
        bumpMap="/textures/mars_bump.jpg"
        emissiveColor="red"
        title="Projects"
        content={
          <div>
            <p>Browse My Recent Projects</p>
            <div className="project-container">
              <div className="project-item">
                <img src="./assets/Trendalytics.png" alt="Trendalytics" />
                <h3>Trendalytics</h3>
                <button
                  onClick={() =>
                    window.open("https://github.com/jxv210016/Trendalytics")
                  }
                >
                  GitHub
                </button>
                <button
                  onClick={() =>
                    window.open("https://www.youtube.com/watch?v=keIBs8Ej2Y8")
                  }
                >
                  Demo
                </button>
              </div>
              <div className="project-item">
                <img src="./assets/EntryWizard.png" alt="Entry Wizard" />
                <h3>Entry Wizard</h3>
                <button
                  onClick={() =>
                    window.open("https://github.com/jxv210016/EntryWizard")
                  }
                >
                  GitHub
                </button>
                <button
                  onClick={() => window.open("https://youtu.be/5iuDD4GAuj0")}
                >
                  Demo
                </button>
              </div>
              <div className="project-item">
                <img src="./assets/GitReviews.png" alt="GitReviews" />
                <h3>GitReviews</h3>
                <button
                  onClick={() =>
                    window.open("https://github.com/risheelg01/GitReviews")
                  }
                >
                  GitHub
                </button>
                <button
                  onClick={() => window.open("https://youtu.be/SydE4xkuQLI")}
                >
                  Demo
                </button>
              </div>
            </div>
          </div>
        }
        showInfo={showInfo}
      />
      <Planet
        position={{ x: 300, y: 0, z: 0 }}
        size={[2, 32, 32]}
        texture="/textures/pluto_texture.jpg"
        bumpMap="/textures/pluto_bump.jpg"
        emissiveColor="purple"
        title="Contact"
        content={
          <div>
            <p>Get in Touch</p>
            <p>
              Email:{" "}
              <a href="mailto:jashithvanam@gmail.com">jashithvanam@gmail.com</a>
            </p>
            <p>
              LinkedIn:{" "}
              <a href="https://www.linkedin.com/in/jay-vanam/">Jay Vanam</a>
            </p>
          </div>
        }
        showInfo={showInfo}
      />
    </>
  );
};

const NavigationButtons = ({ currentPlanetIndex, moveToPlanet }) => {
  return (
    <Html position={[0, -3, 0]} transform>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button
          onClick={() => moveToPlanet(currentPlanetIndex - 1)}
          disabled={currentPlanetIndex === 0}
        >
          Previous
        </button>
        <button
          onClick={() => moveToPlanet(currentPlanetIndex + 1)}
          disabled={currentPlanetIndex === 3}
        >
          Next
        </button>
      </div>
    </Html>
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
