'use client'
import styles from './style.module.scss'
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { slideUp } from './animation';
import { motion } from 'framer-motion';

export default function Home() {

  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: e => direction = e.direction * -1
      },
      x: "-500px",
    });
    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    if(xPercent < -100){
      xPercent = 0;
    }
    else if(xPercent > 0){
      xPercent = -100;
    }
    gsap.set(firstText.current, {xPercent: xPercent});
    gsap.set(secondText.current, {xPercent: xPercent});
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  };

  return (
    <motion.main variants={slideUp} initial="initial" animate="enter" className={styles.landing}>
      {/* Image added at the top, above all other content */}
      <img 
        src="/images/Open-Peeps-Landing.png" 
        alt="Landing Image" 
        className={styles.landingImage} 
      />
      <div className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
          <p ref={firstText}>BRIAN GATHUI</p>
          <p ref={secondText}>BRIAN GATHUI</p>
        </div>
      </div>
      <div data-scroll data-scroll-speed={0.1} className={styles.description}>
        <p>I am an aspiring developer and a keen problem-solver that is passionate about crafting impactful Software Solutions. Calm, collaborative, and driven—I turn complexity into clarity. Let's build something amazing together!</p>
      </div>
    </motion.main>
  );
}
