import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export default function AnimatedTitle() {
  const container = useRef(null);
  const imageRef = useRef(null);
  const parallaxContainerRef = useRef(null); // Ajout d'un ref pour le container

  useGSAP(
    () => {
      // 1. Animation du texte
      const split = new SplitText(".title", {
        type: "chars",
      });

      gsap.from(split.chars, {
        y: 50,
        opacity: 0,
        stagger: 0.05,
        duration: 0.4,
        repeat: -1,
        repeatDelay: 4,
      });

      // 2. Animation du parallaxe (corrigée)
      gsap.from('.parallax-container img', {
        y: 400, // L'image descend de 100px (effet de profondeur)
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-container", // Le trigger est le container
          start: "top center", // Démarre quand le haut du container atteint le bas de l'écran
          end: "bottom center",   // Se termine quand le bas du container atteint le haut
          scrub: 0.5,          // Animation liée au scroll avec un léger délai
          markers: true,       // Gardez pour déboguer, puis enlevez
          // invalidateOnRefresh: true, // Recalcule au redimensionnement
        },
      });
    },
    [] // Dépendances vides = exécuté une fois
  );

  return (
    <>
      <div ref={container}>
        <h1 className="title">Bienvenue sur mon site</h1>
      </div>

      <section className="section">
        <h1>Scroll vers le bas</h1>
      </section>

      {/* Container avec overflow:hidden pour cacher le débordement */}
      <section 
        ref={parallaxContainerRef} 
        className="parallax-container"
        style={{ 
          height: "100vh", 
          overflow: "hidden", 
          position: "relative" 
        }}
      >
        <h1 style={{ position: "relative", zIndex: 2, color: "white" }}>
          Effet parallaxe
        </h1>
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          alt="Paysage"
          style={{
            width: "100%",
            height: "120%", // Plus grand que le container
            objectFit: "cover",
            position: "absolute",
            top: "-10%", // Décalage initial pour permettre le mouvement
            left: 0,
          }}
        />
      </section>

      <section className="section" style={{ height: "100vh" }}>
        <h2>Contenu suivant</h2>
      </section>
    </>
  );
}