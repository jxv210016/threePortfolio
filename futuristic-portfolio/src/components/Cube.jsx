import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { PortfolioSection } from "./PortfolioSection";

const Cube = () => {
  const mountRef = useRef(null);
  const [camera, setCamera] = useState(null);
  const [cube, setCube] = useState(null);
  const [currentFace, setCurrentFace] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFirstClick, setIsFirstClick] = useState(true); // Control initial spin
  const [isLanding, setIsLanding] = useState(true); // Display landing page initially
  const [spinSpeed, setSpinSpeed] = useState({ x: 0.01, y: 0.01 }); // Track the cube's spin speed

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    setCamera(camera);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Helper function to wrap text
    const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
      const words = text.split(" ");
      let line = "";
      let lineCount = 0;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          context.fillText(line, x, y);
          line = words[n] + " ";
          y += lineHeight;
          lineCount++;
        } else {
          line = testLine;
        }
      }
      context.fillText(line, x, y);
    };

    // Helper function to create a canvas with custom designs
    const createTextTexture = (contentFunction) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = 512; // Adjust canvas size for higher resolution
      canvas.height = 512;

      // Set the background for each face
      context.fillStyle = "#ffffff"; // Background color (white)
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Use the content function to add custom content (text, images, etc.)
      contentFunction(context, canvas);

      return new THREE.CanvasTexture(canvas);
    };

    // Design each face of the cube using this function
    const faceDesigns = [
      (ctx, canvas) => {
        // Front Face: Profile
        ctx.fillStyle = "#000000";
        ctx.font = "Bold 36px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Profile: Jay Vanam", canvas.width / 2, 80);

        ctx.font = "24px Arial";
        wrapText(
          ctx,
          "Software Engineer | Passionate about technology and innovation",
          canvas.width / 2,
          140,
          400,
          30
        );
      },
      (ctx, canvas) => {
        // Right Face: Education
        ctx.fillStyle = "#000000";
        ctx.font = "Bold 36px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Education", canvas.width / 2, 80);

        ctx.font = "24px Arial";
        wrapText(
          ctx,
          "University of XYZ \nBSc in Computer Science \nGraduation: 2025",
          canvas.width / 2,
          140,
          400,
          30
        );
      },
      (ctx, canvas) => {
        // Left Face: Experience
        ctx.fillStyle = "#000000";
        ctx.font = "Bold 36px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Experience", canvas.width / 2, 80);

        ctx.font = "24px Arial";
        wrapText(
          ctx,
          "Software Engineer Intern \nAmazon, Summer 2024 \nDeveloped a debugging tool for real-time analysis.",
          canvas.width / 2,
          140,
          400,
          30
        );
      },
      (ctx, canvas) => {
        // Top Face: Projects
        ctx.fillStyle = "#000000";
        ctx.font = "Bold 36px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Projects", canvas.width / 2, 80);

        ctx.font = "24px Arial";
        wrapText(
          ctx,
          "Project 1: AI Chatbot \nProject 2: Fitty App (Mobile Wardrobe)",
          canvas.width / 2,
          140,
          400,
          30
        );
      },
      (ctx, canvas) => {
        // Bottom Face: Skills
        ctx.fillStyle = "#000000";
        ctx.font = "Bold 36px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Skills", canvas.width / 2, 80);

        ctx.font = "24px Arial";
        wrapText(
          ctx,
          "JavaScript, React, Three.js \nPython, AWS, Firebase",
          canvas.width / 2,
          140,
          400,
          30
        );
      },
      (ctx, canvas) => {
        // Back Face: Contact
        ctx.fillStyle = "#000000";
        ctx.font = "Bold 36px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Contact", canvas.width / 2, 80);

        ctx.font = "24px Arial";
        wrapText(
          ctx,
          "Email: jay@example.com \nPhone: (123) 456-7890",
          canvas.width / 2,
          140,
          400,
          30
        );
      },
    ];

    // Create materials for each face by applying the designs
    const materials = faceDesigns.map(
      (design) =>
        new THREE.MeshBasicMaterial({
          map: createTextTexture(design),
        })
    );

    const geometry = new THREE.BoxGeometry(3, 3, 3); // Larger cube

    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
    setCube(cube);

    camera.position.z = 15; // Set camera further back for the larger cube

    const animate = () => {
      requestAnimationFrame(animate);

      if (isLanding) {
        // Spin the cube continuously during the landing page
        cube.rotation.x += spinSpeed.x;
        cube.rotation.y += spinSpeed.y;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on component unmount
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [isLanding, spinSpeed]);

  const faceRotations = [
    { x: 0, y: 0 }, // Front face
    { x: 0, y: Math.PI / 2 }, // Right face
    { x: 0, y: -Math.PI / 2 }, // Left face
    { x: Math.PI / 2, y: 0 }, // Top face
    { x: -Math.PI / 2, y: 0 }, // Bottom face
    { x: 0, y: Math.PI }, // Back face
  ];

  const zoomIn = () => {
    if (camera) {
      gsap.to(camera.position, {
        duration: 0.5, // Speed up the zoom-in
        z: 7,
        ease: "power2.inOut", // Smooth easing for zoom-in
      });
    }
  };

  const handleFirstClick = () => {
    setIsAnimating(true); // Start animation phase

    // Step 1: Speed up stopping the spin (1 second)
    gsap.to(spinSpeed, {
      duration: 1,
      x: 0,
      y: 0,
      ease: "power2.out",
      onComplete: () => {
        // Step 2: Speed up rotating to the front face (0.75 seconds)
        gsap.to(cube.rotation, {
          duration: 0.75,
          x: faceRotations[0].x,
          y: faceRotations[0].y,
          ease: "power2.inOut",
          onComplete: () => {
            // Step 3: Zoom in after aligning the cube to the front face
            zoomIn();
            setIsFirstClick(false);
            setIsLanding(false); // Exit the landing page
            setCurrentFace(0); // Set current face to front face
            setIsAnimating(false); // Allow further interactions
          },
        });
      },
    });
  };

  const rotateToFace = (faceIndex) => {
    setIsAnimating(true);

    const targetRotation = faceRotations[faceIndex];
    gsap.to(cube.rotation, {
      duration: 0.25, // Keep subsequent transitions at 1/4 second
      x: targetRotation.x,
      y: targetRotation.y,
      ease: "power2.inOut",
    });
    setTimeout(() => {
      zoomIn(); // After rotating, zoom into the new face
      setIsAnimating(false); // Allow interactions again after animation
      setCurrentFace(faceIndex); // Update the current face index after the animation completes
    }, 250);
  };

  const handleNextFace = () => {
    if (!isAnimating && currentFace < 5) {
      const nextFace = currentFace + 1;
      rotateToFace(nextFace);
    }
  };

  const handlePreviousFace = () => {
    if (!isAnimating && currentFace > 0) {
      const prevFace = currentFace - 1;
      rotateToFace(prevFace);
    }
  };

  return (
    <div>
      {/* Always render the cube in the background */}
      <div ref={mountRef} className="canvas-container" />

      {isLanding && (
        <div className="landing-page">
          <h1 className="landing-title">Jay Vanam</h1>
          <button onClick={handleFirstClick} className="next-button">
            Enter
          </button>
        </div>
      )}

      {!isLanding && (
        <div>
          <PortfolioSection currentFace={currentFace} />
          <div className="button-container">
            <button
              onClick={handlePreviousFace}
              className="back-button"
              disabled={currentFace === 0}
            >
              Back
            </button>
            <button
              onClick={handleNextFace}
              className="next-button"
              disabled={currentFace === 5}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cube;
