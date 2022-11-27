import { color } from '@styles/variables';
import { createRefs } from '@utils/utility';
import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { gsap } from '@utils/gsap.js';
import useMouse from '@utils/hooks/useMouse';

const Particle = styled.div`
    width: 0.5rem;
    height: 0.5rem;
    background: ${color.white};
    position: absolute;
    opacity: 0;
    pointer-events: none;

    ${(props) => css`
        top: ${props.top}%;
        left: ${props.left}%;
        transform: scale(${props.scale});
    `}
`;

const StyledParticles = styled.div`
    position: fixed;
    z-index: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
`;

const Particles = () => {
    const particlesRef = useRef([]);
    const [particlesData, setParticlesData] = useState([]);
    const mousePos = useMouse();

    const wabbleCoef = 250;

    // const particlesData = [
    //     {
    //         top: 15,
    //         left: 10,
    //         moving: 5,
    //         opacity: 0.4,
    //         scale: 0.6,
    //     },
    //     {
    //         top: 15,
    //         left: 50,
    //         moving: 3,
    //         opacity: 0.7,
    //         scale: 0.6,
    //     },
    //     {
    //         top: 15,
    //         left: 90,
    //         moving: 5,
    //         opacity: 0.5,
    //         scale: 0.6,
    //     },
    //     {
    //         top: 50,
    //         left: 10,
    //         moving: 5,
    //         opacity: 0.5,
    //         scale: 0.6,
    //     },
    //     {
    //         top: 50,
    //         left: 50,
    //         moving: 1,
    //         opacity: 0.1,
    //         scale: 0.6,
    //     },
    //     {
    //         top: 50,
    //         left: 90,
    //         moving: 5,
    //         opacity: 0.8,
    //         scale: 0.6,
    //     },
    //     {
    //         top: 85,
    //         left: 10,
    //         moving: 5,
    //         opacity: 0.4,
    //         scale: 0.6,
    //     },
    //     {
    //         top: 85,
    //         left: 50,
    //         moving: 3,
    //         opacity: 0.3,
    //         scale: 0.6,
    //     },
    //     {
    //         top: 85,
    //         left: 90,
    //         moving: 5,
    //         opacity: 0.3,
    //         scale: 0.6,
    //     },
    // ];

    const randomParticlesArray = (length) =>
        [...new Array(length)].map(() => {
            return {
                top: Math.round(Math.random() * 100),
                left: Math.round(Math.random() * 100),
                moving: Math.random(),
                opacity: Math.random() * (0.4 - 0.6) + 0.4,
                scale: Math.random(),
            };
        });

    useEffect(() => {
        setParticlesData(randomParticlesArray(100));
    }, []);

    useEffect(() => {
        if (!particlesRef) {
            return;
        }

        particlesRef.current.forEach((particle, index) => {
            gsap.fromTo(
                particle,
                {
                    opacity: 0.05,
                },
                {
                    opacity: particlesData[index].opacity,
                    repeat: -1,
                    yoyo: true,
                    duration: 5,
                    delay: 2 * particlesData[index].scale,
                }
            );
        });
    }, [particlesRef, particlesData]);

    useEffect(() => {
        if (!particlesRef) {
            return;
        }

        particlesRef.current.forEach((particle, index) => {
            gsap.to(particle, {
                x: (mousePos.x * particlesData[index].moving) / wabbleCoef,
                y: (mousePos.y * particlesData[index].moving) / wabbleCoef,
            });
        });
    }, [particlesRef, mousePos]);

    return (
        <StyledParticles>
            {particlesData.length >= 1 &&
                particlesData.map((data, index) => (
                    <Particle
                        key={index}
                        ref={(e) => createRefs(particlesRef, e, index)}
                        {...data}
                    />
                ))}
        </StyledParticles>
    );
};

export default Particles;
