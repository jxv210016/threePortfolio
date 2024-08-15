import React, { useState } from "react";
import { Box } from "@react-three/drei";

const Building = ({ position, size }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      position={position}
      args={size} // Dynamic size for buildings
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => alert(`Building at position ${position} clicked!`)}
    >
      <meshStandardMaterial
        color={hovered ? "hotpink" : "gray"}
        emissive={hovered ? "pink" : "darkgray"}
        roughness={0.2}
        metalness={0.8}
      />
    </Box>
  );
};

export default Building;
