import React, { useRef, useState } from "react";
import { Sphere, useTexture, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Planet = ({
  position,
  size,
  texture,
  bumpMap,
  title,
  content,
  emissiveColor,
}) => {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);

  const planetRef = useRef();

  // Load the textures
  const colorMap = useTexture(texture);
  const bumpMapTexture = bumpMap ? useTexture(bumpMap) : null;

  // Rotate the planet
  useFrame(() => {
    planetRef.current.rotation.y += 0.01;
  });

  return (
    <>
      <Sphere
        ref={planetRef}
        position={[position.x, position.y, position.z]}
        args={size}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setOpen(!open)}
      >
        <meshStandardMaterial
          map={colorMap}
          bumpMap={bumpMapTexture}
          bumpScale={bumpMapTexture ? 0.05 : 0}
          emissive={hovered ? emissiveColor : "black"}
          emissiveIntensity={0.5}
        />
      </Sphere>
      {open && (
        <Html position={position}>
          <div
            style={{
              padding: "10px",
              background: "rgba(255, 255, 255, 0.9)",
              borderRadius: "8px",
              color: "black",
              maxWidth: "200px",
            }}
          >
            <h3>{title}</h3>
            <p>{content}</p>
          </div>
        </Html>
      )}
    </>
  );
};

export default Planet;
