import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
	const [currentIndex, setCurrentIndex] = useState(1);
	const [hasClicked, setHasClicked] = useState(false);

	const [loading, setLoading] = useState(true);
	const [loadedVideos, setLoadedVideos] = useState(0);

	// Optimized animation refs
	const redefineRef = useRef(null);
	const heroContainerRef = useRef(null);
	const particleRefs = useRef([]);
	const characterRefs = useRef([]);

	const totalVideos = 4;
	const nextVdRef = useRef(null);

	const handleVideoLoad = () => {
		setLoadedVideos(prev => prev + 1);
	};

	useEffect(() => {
		if (loadedVideos === totalVideos - 1) {
			setLoading(false);
		}
	}, [loadedVideos]);

	const handleMiniVdClick = () => {
		setHasClicked(true);

		setCurrentIndex(prevIndex => (prevIndex % totalVideos) + 1);
	};

	useGSAP(
		() => {
			if (hasClicked) {
				gsap.set("#next-video", { visibility: "visible" });
				gsap.to("#next-video", {
					transformOrigin: "center center",
					scale: 1,
					width: "100%",
					height: "100%",
					duration: 1,
					ease: "power1.inOut",
					onStart: () => nextVdRef.current.play(),
				});
				gsap.from("#current-video", {
					transformOrigin: "center center",
					scale: 0,
					duration: 1.5,
					ease: "power1.inOut",
				});
			}
		},
		{
			dependencies: [currentIndex],
			revertOnUpdate: true,
		}
	);

	useGSAP(() => {
		gsap.set("#video-frame", {
			clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
			borderRadius: "0% 0% 40% 10%",
		});
		gsap.from("#video-frame", {
			clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
			borderRadius: "0% 0% 0% 0%",
			ease: "power1.inOut",
			scrollTrigger: {
				trigger: "#video-frame",
				start: "center center",
				end: "bottom center",
				scrub: true,
			},
		});
	});

	// Optimized ultra-complex "redefine" animation system with directional entrances
	useGSAP(
		() => {
			if (!redefineRef.current) return;

			// Animation configuration for ultimate complexity
			const animConfig = {
				text: redefineRef.current.textContent,
				particlesPerChar: 5,
				entranceDirections: [
					{ x: -2000, y: -1500, rotZ: -720 }, // top-left spiral
					{ x: 2000, y: -1000, rotZ: 540 }, // top-right spiral
					{ x: -1500, y: 1200, rotZ: -360 }, // bottom-left flip
					{ x: 1800, y: 800, rotZ: 900 }, // bottom-right mega-spin
					{ x: 0, y: -2000, rotZ: -1080 }, // top center triple-flip
					{ x: -2500, y: 0, rotZ: 720 }, // left center double-spin
					{ x: 2500, y: 0, rotZ: -900 }, // right center mega-flip
					{ x: 0, y: 2500, rotZ: 1440 }, // bottom center quad-spin
				],
				colors: [
					"rgba(59, 130, 246, 0.8)", // blue
					"rgba(147, 51, 234, 0.8)", // purple
					"rgba(236, 72, 153, 0.8)", // pink
					"rgba(34, 197, 94, 0.8)", // green
					"rgba(251, 146, 60, 0.8)", // orange
				],
			};

			// Clear and setup
			redefineRef.current.innerHTML = "";
			characterRefs.current = [];
			particleRefs.current = [];

			// Create ultra-advanced character system
			const characters = animConfig.text.split("").map((char, index) => {
				const span = document.createElement("span");
				span.textContent = char;
				span.className = `redefine-char char-${index}`;

				// Enhanced styling for maximum performance
				Object.assign(span.style, {
					display: "inline-block",
					position: "relative",
					transformOrigin: "50% 50%",
					willChange: "transform, filter, color, text-shadow",
					backfaceVisibility: "hidden",
					perspective: "1000px",
				});

				redefineRef.current.appendChild(span);
				return span;
			});

			characterRefs.current = characters;

			// Ultra-advanced particle system with optimized performance
			const createParticleSystem = (char, charIndex) => {
				const container = document.createElement("div");
				container.className = `particle-container-${charIndex}`;

				Object.assign(container.style, {
					position: "absolute",
					top: "0",
					left: "0",
					width: "100%",
					height: "100%",
					pointerEvents: "none",
					overflow: "visible",
				});

				// Create enhanced particles with varied properties
				for (let i = 0; i < animConfig.particlesPerChar; i++) {
					const particle = document.createElement("div");
					particle.className = `particle particle-${charIndex}-${i}`;

					const size = gsap.utils.random(1, 4);
					const color = animConfig.colors[i % animConfig.colors.length];

					Object.assign(particle.style, {
						position: "absolute",
						width: `${size}px`,
						height: `${size}px`,
						background: color,
						borderRadius: "50%",
						opacity: "0",
						willChange: "transform, opacity",
						boxShadow: `0 0 ${size * 2}px ${color}`,
					});

					container.appendChild(particle);
				}

				char.appendChild(container);
				return container;
			};

			// Setup particle systems for all characters
			characters.forEach((char, index) => {
				const container = createParticleSystem(char, index);
				particleRefs.current.push(container);
			});

			// Ultra-complex directional entrance animation
			const setupEntranceAnimation = () => {
				characters.forEach((char, index) => {
					const direction =
						animConfig.entranceDirections[
							index % animConfig.entranceDirections.length
						];

					// Set extreme initial positions with multiple transform layers
					gsap.set(char, {
						x: direction.x,
						y: direction.y,
						z: gsap.utils.random(-500, 500),
						rotationX: gsap.utils.random(-180, 180),
						rotationY: gsap.utils.random(-180, 180),
						rotationZ: direction.rotZ,
						scale: gsap.utils.random(0.1, 0.3),
						skewX: gsap.utils.random(-30, 30),
						skewY: gsap.utils.random(-30, 30),
						opacity: 0,
						transformPerspective: 2000,
						transformStyle: "preserve-3d",
						filter: `blur(${gsap.utils.random(5, 15)}px) hue-rotate(${gsap.utils.random(0, 360)}deg) saturate(200%)`,
						textShadow: "0 0 0px transparent",
					});
				});
			};

			const executeEntranceAnimation = () => {
				const masterTl = gsap.timeline({ delay: 0.3 });

				// Phase 1: Dramatic directional entrances
				masterTl.to(characters, {
					x: 0,
					y: 0,
					z: 0,
					opacity: 1,
					duration: 2.5,
					ease: "expo.out",
					stagger: {
						amount: 2,
						from: "random",
						ease: "power3.inOut",
					},
				});

				// Phase 2: Complex rotation normalization with overshoot
				masterTl.to(
					characters,
					{
						rotationX: 0,
						rotationY: 0,
						rotationZ: 0,
						skewX: 0,
						skewY: 0,
						duration: 2,
						ease: "elastic.out(1, 0.4)",
						stagger: {
							amount: 1.5,
							from: "center",
							ease: "power2.inOut",
						},
					},
					"-=1.5"
				);

				// Phase 3: Scale and filter stabilization
				masterTl.to(
					characters,
					{
						scale: 1,
						filter: "blur(0px) hue-rotate(0deg) saturate(100%)",
						duration: 1.8,
						ease: "back.out(1.7)",
						stagger: 0.08,
					},
					"-=1"
				);

				// Phase 4: Epic text shadow crescendo
				masterTl.to(
					characters,
					{
						textShadow:
							"0 0 30px rgba(59, 130, 246, 0.9), 0 0 60px rgba(147, 51, 234, 0.6), 0 0 90px rgba(236, 72, 153, 0.4)",
						duration: 1.2,
						ease: "power3.out",
						stagger: {
							amount: 0.8,
							from: "edges",
							ease: "sine.inOut",
						},
					},
					"-=0.5"
				);

				return masterTl;
			};

			// Optimized continuous animation system
			const setupContinuousAnimations = () => {
				characters.forEach((char, index) => {
					// Complex floating with multiple harmonics
					const floatTl = gsap.timeline({ repeat: -1 });

					floatTl
						.to(char, {
							y: gsap.utils.random(-8, 8),
							x: gsap.utils.random(-3, 3),
							rotation: gsap.utils.random(-3, 3),
							scale: gsap.utils.random(0.98, 1.02),
							duration: gsap.utils.random(2.5, 4.5),
							ease: "sine.inOut",
						})
						.to(char, {
							y: gsap.utils.random(-5, 5),
							x: gsap.utils.random(-2, 2),
							rotation: gsap.utils.random(-2, 2),
							scale: gsap.utils.random(0.99, 1.01),
							duration: gsap.utils.random(2, 4),
							ease: "sine.inOut",
						}); // Advanced particle choreography
					const container = particleRefs.current[index];
					if (container) {
						const particles = container.querySelectorAll(".particle");
						particles.forEach((particle, pIndex) => {
							const particleTl = gsap.timeline({
								repeat: -1,
								delay: index * 0.1 + pIndex * 0.2,
							});

							particleTl
								.to(particle, {
									opacity: gsap.utils.random(0.4, 0.9),
									x: gsap.utils.random(-60, 60),
									y: gsap.utils.random(-60, 60),
									z: gsap.utils.random(-30, 30),
									rotation: 720,
									scale: gsap.utils.random(0.5, 2),
									duration: gsap.utils.random(4, 8),
									ease: "none",
								})
								.to(particle, {
									opacity: 0,
									x: gsap.utils.random(-30, 30),
									y: gsap.utils.random(-30, 30),
									rotation: 1080,
									scale: 0.1,
									duration: gsap.utils.random(2, 4),
									ease: "power2.in",
								});
						});
					}
				});
			};

			// Execute the ultra-complex animation sequence
			setupEntranceAnimation();
			const entranceTl = executeEntranceAnimation();

			entranceTl.call(() => {
				setupContinuousAnimations();
			});

			// Store timeline for cleanup
			redefineRef.current._animationTimeline = entranceTl;
		},
		{ scope: redefineRef }
	);

	// Optimized ultra-advanced mouse tracking with enhanced physics
	useEffect(() => {
		if (!heroContainerRef.current || !redefineRef.current) return;

		// Ultra-advanced physics configuration for maximum complexity
		const physics = {
			magneticStrength: 65,
			elasticity: 0.08,
			damping: 0.92,
			maxDistance: 2.2,
			rotationMultiplier: 45,
			scaleRange: [0.7, 1.8],
			glitchThreshold: 0.5,
			particleForce: 180,
			waveAmplitude: 25,
			spiralForce: 15,
			gravityWell: 0.5,
			dimensionalRift: 12,
			quantumFlux: 0.8,
			cosmicForce: 30,
			timeDistortion: 0.6,
			realityBend: 1.2
		};

		// Optimized mouse position tracking
		let rafId = null;
		let currentMousePos = { x: 0, y: 0 };
		let targetMousePos = { x: 0, y: 0 };

		const smoothMouseTracking = () => {
			// Smooth interpolation for fluid motion
			currentMousePos.x +=
				(targetMousePos.x - currentMousePos.x) * physics.elasticity;
			currentMousePos.y +=
				(targetMousePos.y - currentMousePos.y) * physics.elasticity;

			updateCharacterPhysics();
			rafId = requestAnimationFrame(smoothMouseTracking);
		};

		const updateCharacterPhysics = () => {
			if (!characterRefs.current.length) return;

			const time = Date.now() * 0.001;

			characterRefs.current.forEach((char, index) => {
				const distance = Math.sqrt(
					Math.pow(currentMousePos.x, 2) + Math.pow(currentMousePos.y, 2)
				);

				const normalizedDistance =
					Math.min(distance, physics.maxDistance) / physics.maxDistance;
				const strength = Math.max(0, 1 - normalizedDistance);
				const dampedStrength = strength * physics.damping;

				// Ultra-complex cosmic force calculations with multiple harmonics
				const cosmicTime = time * 0.3;
				const charOffset = index * 0.8;
				
				// Multi-layered wave interference system
				const primaryWave = Math.sin(cosmicTime * 2 + charOffset) * physics.waveAmplitude * strength;
				const secondaryWave = Math.cos(cosmicTime * 1.3 + charOffset * 1.5) * physics.waveAmplitude * 0.7 * strength;
				const tertiaryWave = Math.sin(cosmicTime * 3.7 + charOffset * 0.4) * physics.waveAmplitude * 0.4 * strength;
				
				const waveX = primaryWave + secondaryWave * 0.6 + tertiaryWave * 0.3;
				const waveY = (Math.cos(cosmicTime * 1.8 + charOffset) + 
				              Math.sin(cosmicTime * 2.4 + charOffset * 1.2) * 0.5) * 
				              physics.waveAmplitude * strength;
				
				// Advanced spiral force with quantum fluctuations
				const spiralAngle = cosmicTime + charOffset;
				const quantumNoise = Math.sin(time * 15 + charOffset * 3) * physics.quantumFlux;
				const spiralRadius = physics.spiralForce * (1 + quantumNoise) * strength;
				const spiralX = Math.cos(spiralAngle) * spiralRadius + Math.sin(spiralAngle * 2.3) * spiralRadius * 0.3;
				const spiralY = Math.sin(spiralAngle) * spiralRadius + Math.cos(spiralAngle * 1.7) * spiralRadius * 0.4;

				// Multi-dimensional gravity well with time distortion
				const timeWarp = 1 + Math.sin(time * 4 + charOffset) * physics.timeDistortion * strength;
				const gravityX = currentMousePos.x * physics.gravityWell * Math.pow(strength, 2) * timeWarp;
				const gravityY = currentMousePos.y * physics.gravityWell * Math.pow(strength, 2) * timeWarp;

				// Dimensional rift forces
				const riftAngle = time * 5 + charOffset * 2;
				const riftForceX = Math.sin(riftAngle) * physics.dimensionalRift * Math.pow(strength, 1.5);
				const riftForceY = Math.cos(riftAngle * 1.3) * physics.dimensionalRift * Math.pow(strength, 1.5);

				// Cosmic force with reality bending
				const cosmicAngle = time * 0.7 + charOffset * 1.3;
				const realityBend = physics.realityBend * strength;
				const cosmicX = Math.cos(cosmicAngle) * physics.cosmicForce * realityBend + 
				               Math.sin(cosmicAngle * 2.1) * physics.cosmicForce * 0.5 * realityBend;
				const cosmicY = Math.sin(cosmicAngle) * physics.cosmicForce * realityBend + 
				               Math.cos(cosmicAngle * 1.6) * physics.cosmicForce * 0.6 * realityBend;

				// Ultimate magnetic field combining all forces
				const magneticField = {
					x: currentMousePos.x * physics.magneticStrength * dampedStrength * 
					   (index % 2 === 0 ? 1 : -0.7) + waveX + spiralX + gravityX + riftForceX + cosmicX,
					y: currentMousePos.y * physics.magneticStrength * dampedStrength * 
					   (index % 3 === 0 ? 1 : -0.8) + waveY + spiralY + gravityY + riftForceY + cosmicY,
				};

				// Hyper-advanced 3D rotation with orbital mechanics and quantum tunneling
				const orbitAngle = time * 0.5 + charOffset;
				const quantumOrbit = time * 12 + charOffset * 4;
				const orbitRadius = strength * 15 + Math.sin(quantumOrbit) * 5;
				
				const rotation3D = {
					x: currentMousePos.y * physics.rotationMultiplier * dampedStrength + 
					   Math.sin(orbitAngle) * orbitRadius + 
					   Math.cos(quantumOrbit) * 8 * strength,
					y: currentMousePos.x * physics.rotationMultiplier * dampedStrength + 
					   Math.cos(orbitAngle) * orbitRadius + 
					   Math.sin(quantumOrbit * 1.4) * 6 * strength,
					z: (currentMousePos.x + currentMousePos.y) * 0.5 * 18 * dampedStrength + 
					   Math.sin(time + charOffset) * 12 * strength +
					   Math.cos(time * 3 + charOffset * 2) * 8 * strength,
				};

				// Multi-phase dynamic scaling with harmonic resonance
				const baseFreq = 3 + charOffset * 0.5;
				const breathingScale = 1 + Math.sin(time * baseFreq + charOffset * 0.7) * 0.04;
				const pulseScale = 1 + Math.sin(time * (baseFreq * 2) + charOffset * 1.2) * 0.03 * strength;
				const resonanceScale = 1 + Math.sin(time * (baseFreq * 0.5) + charOffset) * 0.02;
				const magneticScale = physics.scaleRange[0] + 
					(physics.scaleRange[1] - physics.scaleRange[0]) * dampedStrength;
				const finalScale = magneticScale * breathingScale * pulseScale * resonanceScale;

				// Apply ultra-complex transformations with momentum
				gsap.to(char, {
					x: magneticField.x,
					y: magneticField.y,
					rotationX: rotation3D.x,
					rotationY: rotation3D.y,
					rotationZ: rotation3D.z,
					scale: finalScale,
					skewX: currentMousePos.x * 8 * strength + Math.sin(time * 6 + charOffset) * 3 * strength,
					skewY: currentMousePos.y * 5 * strength + Math.cos(time * 4 + charOffset) * 2 * strength,
					duration: 0.25,
					ease: "power2.out",
					overwrite: "auto",
				});

				// Ultra-smooth, completely non-blinking color system with cosmic hues
				const timePhase = time * 0.15; // Slowed down for smoother transitions
				const baseHue = (charOffset * 45 + timePhase * 60) % 360;
				const mouseHueInfluence = Math.atan2(currentMousePos.y, currentMousePos.x) * (180 / Math.PI);
				const strengthHue = strength * 120;
				const cosmicHue = Math.sin(timePhase + charOffset) * 30;
				
				const finalHue = (baseHue + mouseHueInfluence * 0.3 + strengthHue + cosmicHue) % 360;
				
				// Smooth saturation and brightness oscillations
				const baseSaturation = 120;
				const saturationWave = Math.sin(timePhase * 2 + charOffset) * 20;
				const strengthSaturation = dampedStrength * 60;
				const finalSaturation = Math.min(200, baseSaturation + saturationWave + strengthSaturation);
				
				const baseBrightness = 110;
				const brightnessWave = Math.cos(timePhase * 1.5 + charOffset * 1.3) * 15;
				const strengthBrightness = dampedStrength * 25;
				const finalBrightness = Math.min(160, baseBrightness + brightnessWave + strengthBrightness);
				
				const baseContrast = 110;
				const contrastWave = Math.sin(timePhase * 1.8 + charOffset * 0.9) * 20;
				const strengthContrast = dampedStrength * 40;
				const finalContrast = Math.min(180, baseContrast + contrastWave + strengthContrast);
				
				// Extremely smooth blur with gentle oscillation
				const blurBase = normalizedDistance > physics.glitchThreshold ? 1 : 0;
				const blurWave = Math.sin(time * 2 + charOffset) * 0.5;
				const finalBlur = Math.max(0, blurBase + blurWave + strength * 0.8);

				gsap.to(char, {
					filter: `hue-rotate(${finalHue}deg) saturate(${finalSaturation}%) brightness(${finalBrightness}%) contrast(${finalContrast}%) blur(${finalBlur}px)`,
					duration: 1.2, // Longer duration for smoother transitions
					ease: "sine.inOut",
				});

				// Hyper-enhanced particle field with cosmic storm effects
				const container = particleRefs.current[index];
				if (container && strength > 0.03) {
					const particles = container.querySelectorAll(".particle");
					particles.forEach((particle, pIndex) => {
						const particleAngle = time * 1.5 + pIndex * 1.2 + charOffset;
						const particleRadius = 25 + strength * 60;
						const quantumJitter = Math.sin(time * 20 + pIndex * 5) * 3 * strength;
						
						const particleForce = {
							x: magneticField.x * 0.7 + 
							   Math.cos(particleAngle) * particleRadius * strength +
							   gsap.utils.random(-physics.particleForce, physics.particleForce) * strength * 0.4 +
							   quantumJitter,
							y: magneticField.y * 0.7 + 
							   Math.sin(particleAngle) * particleRadius * strength +
							   gsap.utils.random(-physics.particleForce, physics.particleForce) * strength * 0.4 +
							   quantumJitter * 0.8,
						};

						const particleScale = 1 + strength * 4 + Math.sin(time * 8 + pIndex) * 0.5;
						const particleRotation = rotation3D.z * 2 + time * 180 + pIndex * 45;

						gsap.to(particle, {
							x: particleForce.x,
							y: particleForce.y,
							opacity: strength * 0.9 * (0.6 + Math.sin(time * 4 + pIndex) * 0.4),
							scale: particleScale,
							rotation: particleRotation,
							duration: 0.3,
							ease: "power2.out",
							overwrite: "auto",
						});
					});
				}
			});
		};

		const handleMouseMove = e => {
			const rect = heroContainerRef.current.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			targetMousePos = {
				x: (e.clientX - centerX) / (rect.width / 2),
				y: (e.clientY - centerY) / (rect.height / 2),
			};
		};

		const handleMouseEnter = () => {
			// Ultra-complex cosmic entrance effects with reality distortion
			characterRefs.current.forEach((char, index) => {
				// Multi-dimensional quantum glitch with controlled chaos and smooth transitions
				const quantumPhases = gsap.timeline({ repeat: 2 });
				
				// Phase 1: Reality fragmentation with cosmic force
				quantumPhases
					.to(char, {
						x: () => gsap.utils.random(-35, 35),
						y: () => gsap.utils.random(-25, 25),
						z: () => gsap.utils.random(-50, 50),
						skewX: () => gsap.utils.random(-45, 45),
						skewY: () => gsap.utils.random(-20, 20),
						rotationX: () => gsap.utils.random(-60, 60),
						rotationY: () => gsap.utils.random(-60, 60),
						rotationZ: () => gsap.utils.random(-45, 45),
						scale: () => gsap.utils.random(0.6, 1.5),
						duration: 0.04,
						ease: "power4.inOut"
					})
					// Phase 2: Dimensional rift expansion
					.to(char, {
						x: () => gsap.utils.random(-20, 20),
						y: () => gsap.utils.random(-15, 15),
						z: () => gsap.utils.random(-30, 30),
						skewX: () => gsap.utils.random(-30, 30),
						skewY: () => gsap.utils.random(-15, 15),
						rotationX: () => gsap.utils.random(-90, 90),
						rotationY: () => gsap.utils.random(-90, 90),
						rotationZ: () => gsap.utils.random(-60, 60),
						scale: () => gsap.utils.random(0.7, 1.4),
						duration: 0.06,
						ease: "elastic.out(2, 0.8)"
					})
					// Phase 3: Quantum tunneling effect
					.to(char, {
						x: () => gsap.utils.random(-8, 8),
						y: () => gsap.utils.random(-6, 6),
						z: () => gsap.utils.random(-15, 15),
						skewX: () => gsap.utils.random(-15, 15),
						skewY: () => gsap.utils.random(-8, 8),
						rotationX: () => gsap.utils.random(-30, 30),
						rotationY: () => gsap.utils.random(-30, 30),
						rotationZ: () => gsap.utils.random(-20, 20),
						scale: () => gsap.utils.random(0.85, 1.2),
						duration: 0.08,
						ease: "expo.out"
					})
					// Phase 4: Reality stabilization with harmonic convergence
					.to(char, {
						x: 0,
						y: 0,
						z: 0,
						skewX: 0,
						skewY: 0,
						rotationX: 0,
						rotationY: 0,
						rotationZ: 0,
						scale: 1,
						duration: 0.2,
						ease: "back.out(3)",
						delay: index * 0.008
					});

				// Hyper-enhanced particle supernova with gravitational waves
				const container = particleRefs.current[index];
				if (container) {
					const particles = container.querySelectorAll(".particle");
					particles.forEach((particle, pIndex) => {
						const primaryAngle = (pIndex / particles.length) * Math.PI * 2;
						const secondaryAngle = primaryAngle + Math.PI * 0.5;
						const radius = gsap.utils.random(120, 300);
						const secondaryRadius = gsap.utils.random(80, 200);
						
						// Primary explosion trajectory
						const targetX = Math.cos(primaryAngle) * radius;
						const targetY = Math.sin(primaryAngle) * radius;
						
						// Secondary gravitational wave effect
						const waveX = Math.cos(secondaryAngle) * secondaryRadius * 0.3;
						const waveY = Math.sin(secondaryAngle) * secondaryRadius * 0.3;

						gsap.fromTo(particle, 
							{
								opacity: 0,
								scale: 0,
								x: 0,
								y: 0,
								z: 0,
								rotation: 0,
								filter: "hue-rotate(0deg) saturate(100%)"
							},
							{
								opacity: 1,
								scale: gsap.utils.random(4, 8),
								x: targetX + waveX,
								y: targetY + waveY,
								z: gsap.utils.random(-50, 50),
								rotation: primaryAngle * (180 / Math.PI) + 1080,
								filter: `hue-rotate(${gsap.utils.random(0, 360)}deg) saturate(200%)`,
								duration: 3,
								ease: "expo.out",
								delay: index * 0.015 + pIndex * 0.03
							}
						);

						// Multi-layered orbital mechanics with quantum fluctuations
						gsap.to(particle, {
							rotation: `+=${gsap.utils.random(720, 1440)}`,
							x: `+=${gsap.utils.random(-50, 50)}`,
							y: `+=${gsap.utils.random(-50, 50)}`,
							scale: `*=${gsap.utils.random(0.5, 1.5)}`,
							duration: 6,
							ease: "sine.inOut",
							repeat: -1,
							yoyo: true,
							delay: index * 0.015 + pIndex * 0.03
						});

						// Cosmic breathing effect
						gsap.to(particle, {
							opacity: "+=0.3",
							scale: "+=1",
							duration: 2,
							ease: "sine.inOut",
							repeat: -1,
							yoyo: true,
							delay: index * 0.02 + pIndex * 0.05
						});
					});
				}
			});

			// Epic multi-layered text shadow with smooth cosmic gradients
			gsap.to(characterRefs.current, {
				textShadow: [
					"0 0 50px rgba(59, 130, 246, 1)",
					"0 0 100px rgba(99, 102, 241, 0.8)",
					"0 0 150px rgba(139, 92, 246, 0.6)",
					"0 0 200px rgba(167, 139, 250, 0.5)",
					"0 0 250px rgba(196, 181, 253, 0.4)",
					"0 0 300px rgba(221, 214, 254, 0.3)"
				].join(", "),
				duration: 1.5,
				ease: "expo.out",
				stagger: {
					amount: 1.2,
					from: "center",
					ease: "power3.out",
				},
			});

			// Completely smooth filter transition with cosmic enhancement
			gsap.to(characterRefs.current, {
				filter: "saturate(180%) brightness(130%) contrast(150%) hue-rotate(15deg)",
				duration: 1.2,
				ease: "sine.inOut",
				stagger: 0.025
			});

			// Additional cosmic glow effect
			gsap.to(characterRefs.current, {
				textShadow: [
					"0 0 60px rgba(59, 130, 246, 1)",
					"0 0 120px rgba(99, 102, 241, 0.9)",
					"0 0 180px rgba(139, 92, 246, 0.7)",
					"0 0 240px rgba(167, 139, 250, 0.6)",
					"0 0 300px rgba(196, 181, 253, 0.5)",
					"0 0 360px rgba(221, 214, 254, 0.4)",
					"0 0 420px rgba(240, 238, 255, 0.3)"
				].join(", "),
				duration: 2,
				ease: "sine.inOut",
				delay: 1.5,
				stagger: 0.05
			});
		};

		const handleMouseLeave = () => {
			// Graceful return to base state
			if (rafId) {
				cancelAnimationFrame(rafId);
				rafId = null;
			}

			characterRefs.current.forEach((char, index) => {
				gsap.to(char, {
					x: 0,
					y: 0,
					rotationX: 0,
					rotationY: 0,
					rotationZ: 0,
					scale: 1,
					skewX: 0,
					skewY: 0,
					filter:
						"hue-rotate(0deg) saturate(100%) brightness(100%) contrast(100%) blur(0px)",
					textShadow:
						"0 0 30px rgba(59, 130, 246, 0.9), 0 0 60px rgba(147, 51, 234, 0.6), 0 0 90px rgba(236, 72, 153, 0.4)",
					duration: 2,
					ease: "elastic.out(1, 0.6)",
					delay: index * 0.04,
				});

				// Return particles to orbit
				const container = particleRefs.current[index];
				if (container) {
					const particles = container.querySelectorAll(".particle");
					particles.forEach((particle, pIndex) => {
						gsap.to(particle, {
							x: gsap.utils.random(-30, 30),
							y: gsap.utils.random(-30, 30),
							opacity: gsap.utils.random(0.3, 0.7),
							scale: 1,
							rotation: 0,
							duration: 1.5,
							ease: "power2.out",
							delay: pIndex * 0.1,
						});
					});
				}
			});

			// Reset mouse tracking
			currentMousePos = { x: 0, y: 0 };
			targetMousePos = { x: 0, y: 0 };
		};

		// Event listeners with passive options for performance
		const container = heroContainerRef.current;
		const redefine = redefineRef.current;

		container.addEventListener("mousemove", handleMouseMove, { passive: true });
		redefine.addEventListener("mouseenter", handleMouseEnter, { passive: true });
		redefine.addEventListener("mouseleave", handleMouseLeave, { passive: true });

		// Start smooth tracking
		smoothMouseTracking();

		// Cleanup
		return () => {
			if (rafId) cancelAnimationFrame(rafId);
			container.removeEventListener("mousemove", handleMouseMove);
			redefine.removeEventListener("mouseenter", handleMouseEnter);
			redefine.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, []);

	const getVideoSrc = index => `videos/hero-${index}.mp4`;

	return (
		<div
			ref={heroContainerRef}
			className="relative h-dvh w-screen overflow-x-hidden">
			{loading && (
				<div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
					{/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
					<div className="three-body">
						<div className="three-body__dot"></div>
						<div className="three-body__dot"></div>
						<div className="three-body__dot"></div>
					</div>
				</div>
			)}

			<div
				id="video-frame"
				className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
				<div>
					<div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
						<VideoPreview>
							<div
								onClick={handleMiniVdClick}
								className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
								<video
									ref={nextVdRef}
									src={getVideoSrc((currentIndex % totalVideos) + 1)}
									loop
									muted
									id="current-video"
									className="size-64 origin-center scale-150 object-cover object-center"
									onLoadedData={handleVideoLoad}
								/>
							</div>
						</VideoPreview>
					</div>

					<video
						ref={nextVdRef}
						src={getVideoSrc(currentIndex)}
						loop
						muted
						id="next-video"
						className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
						onLoadedData={handleVideoLoad}
					/>
					<video
						src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
						autoPlay
						loop
						muted
						className="absolute left-0 top-0 size-full object-cover object-center"
						onLoadedData={handleVideoLoad}
					/>
				</div>

				<h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
					G<b>A</b>MING
				</h1>

				<div className="absolute left-0 top-0 z-40 size-full">
					<div className="mt-24 px-5 sm:px-10">
						<h1
							ref={redefineRef}
							className="special-font hero-heading cursor-pointer select-none text-blue-100"
							style={{
								perspective: "1000px",
								transformStyle: "preserve-3d",
							}}>
							redefi<b>n</b>e
						</h1>

						<p className="mb-5 max-w-64 font-robert-regular text-blue-100">
							Enter the Metagame Layer <br /> Unleash the Play Economy
						</p>

						<Button
							id="watch-trailer"
							title="Watch trailer"
							leftIcon={<TiLocationArrow />}
							containerClass="bg-yellow-300 flex-center gap-1"
						/>
					</div>
				</div>
			</div>

			<h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
				G<b>A</b>MING
			</h1>
		</div>
	);
};

export default Hero;
