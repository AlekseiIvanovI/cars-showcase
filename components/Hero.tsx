"use client"

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import CustomButton from './CustomButton';

const Hero = () => {
  const imageRef = useRef(null);

  const handleScroll = () => {
    const targetOffset = imageRef.current.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: targetOffset, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScrollAnimation = () => {
      const image = imageRef.current;
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      if (image) {
        const imageOffset = image.offsetTop;
        const imageHeight = image.offsetHeight;

        const isVisible = scrollPosition + windowHeight > imageOffset + imageHeight / 2;
        const isFullyVisible = scrollPosition + windowHeight > imageOffset + imageHeight;

        if (isVisible) {
          const scrollPercentage = (scrollPosition + windowHeight - imageOffset) / windowHeight;
          const translateX = Math.min(scrollPercentage * 100, 100);
          const opacity = isFullyVisible ? 1 : scrollPercentage;

          image.style.transform = `translateX(-${translateX}%)`;
          image.style.opacity = opacity;
        }
      }
    };

    window.addEventListener('scroll', handleScrollAnimation);

    return () => {
      window.removeEventListener('scroll', handleScrollAnimation);
    };
  }, []);

  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">
          Find, book, or rent a car -- quickly and easily!
        </h1>
        <p className="hero__subtitle">
          Streamline your car rental experience with our effortless booking process.
        </p>
        <CustomButton
          title="Explore Cars"
          containerStyles="bg-primary-blue text-white rounded-full mt-10"
          handleClick={handleScroll}
        />
      </div>
      <div className="hero__image-container">
        <div className="hero__image" ref={imageRef}>
          <Image src="/hero11.png" alt="hero" fill className="object-contain"/>
        </div>
        <div className="hero__image-overlay" />
      </div>

      <style jsx>{`
        .hero__image {
          transition: transform 1.25s, opacity 0.5s;
          transform: translateX(-100%);
        }
      `}</style>
    </div>
  );
};

export default Hero;


//working version
// import Image from "next/image"
// import CustomButton from "./CustomButton"

// const Hero = () => {
//     const handleScroll = () => {

//     }
//   return (
//     <div className="hero">
//       <div className="flex-1 pt-36 padding-x">
//         <h1 className="hero__title">
//             Find, book, or rent a car -- quickly and easily!
//         </h1>
//         <p className="hero__subtitle">
//             Streamline your car rental experience with 
//             our effortless booking process.
//         </p>
//         <CustomButton 
//         title="Explore Cars"
//         containerStyles="bg-primary-blue text-white rounded-full mt-10"
//         handleClick={handleScroll}
//         />
//       </div>
//       <div className="hero__image-container">
//         <div className="hero__image">
//             <Image src="/hero11.png" alt="hero" 
//             fill className="object-contain"/>
//         </div>
//             <div className="hero__image-overlay"/>

//       </div>
//     </div>
//   )
// }

// export default Hero
