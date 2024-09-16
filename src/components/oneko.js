import React, { useState, useRef } from 'react';

const Oneko = () => {
    const nekoRef = useRef(null);
    const [position, setPosition] = useState({ x: 32, y: 32 });
    const [targetPosition, setTargetPosition] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [frameCount, setFrameCount] = useState(0);
    const [idleTime, setIdleTime] = useState(0);
    const [idleAnimation, setIdleAnimation] = useState(null);
    const [idleAnimationFrame, setIdleAnimationFrame] = useState(0);

    const nekoSpeed = 10;
    const spriteSets = {
        idle: [[-3, -3]],
        alert: [[-7, -3]],
        scratch: [[-5, 0], [-6, 0], [-7, 0]],
        tired: [[-3, -2]],
        sleeping: [[-2, 0], [-2, -1]],
        N: [[-1, -2], [-1, -3]],
        NE: [[0, -2], [0, -3]],
        E: [[-3, 0], [-3, -1]],
        SE: [[-5, -1], [-5, -2]],
        S: [[-6, -3], [-7, -2]],
        SW: [[-5, -3], [-6, -1]],
        W: [[-4, -2], [-4, -3]],
        NW: [[-1, 0], [-1, -1]]
    };

    const setSprite = (name, frame) => {
        const sprite = spriteSets[name][frame % spriteSets[name].length];
        if (nekoRef.current) {
            nekoRef.current.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
        }
    };

    const resetIdleAnimation = () => {
        setIdleAnimation(null);
        setIdleAnimationFrame(0);
    };

    const idle = () => {
        setIdleTime(prevIdleTime => {
            const newIdleTime = prevIdleTime + 1;

            if (newIdleTime > 10 && Math.floor(Math.random() * 200) === 0 && idleAnimation === null) {
                setIdleAnimation(["sleeping", "scratch"][Math.floor(Math.random() * 2)]);
            }

            switch (idleAnimation) {
                case "sleeping":
                    if (idleAnimationFrame < 8) {
                        setSprite("tired", 0);
                    } else {
                        setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
                        if (idleAnimationFrame > 192) {
                            resetIdleAnimation();
                        }
                    }
                    break;
                case "scratch":
                    setSprite("scratch", idleAnimationFrame);
                    if (idleAnimationFrame > 9) {
                        resetIdleAnimation();
                    }
                    break;
                default:
                    setSprite("idle", 0);
                    break;
            }

            setIdleAnimationFrame(prevFrame => prevFrame + 1);
            return newIdleTime;
        });
    };

    const updateMovement = () => {
        setFrameCount(prevCount => prevCount + 1);
        if (!targetPosition) {
            idle();
            return;
        }

        const diffX = position.x - targetPosition.x;
        const diffY = position.y - targetPosition.y;
        const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

        if (distance < nekoSpeed) {
            setPosition(targetPosition); // Reach the target
            setTargetPosition(null); // Clear the target
            idle();
            return;
        }

        setIdleAnimation(null);
        setIdleAnimationFrame(0);

        let direction = "";
        direction += diffY / distance > 0.5 ? "N" : "";
        direction += diffY / distance < -0.5 ? "S" : "";
        direction += diffX / distance > 0.5 ? "W" : "";
        direction += diffX / distance < -0.5 ? "E" : "";
        setSprite(direction, frameCount);

        setPosition(prevPos => ({
            x: prevPos.x - (diffX / distance) * nekoSpeed,
            y: prevPos.y - (diffY / distance) * nekoSpeed
        }));
    };

    const handleMouseMove = (event) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseClick = (event) => {
        setTargetPosition({ x: event.clientX, y: event.clientY });
    };

    React.useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('click', handleMouseClick);

        const intervalId = setInterval(updateMovement, 100);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('click', handleMouseClick);
            clearInterval(intervalId);
        };
    }, [targetPosition, position, frameCount, idleTime, idleAnimation, idleAnimationFrame]);

    return (
        <div
            ref={nekoRef}
            style={{
                width: '32px',
                height: '32px',
                position: 'fixed',
                pointerEvents: 'none',
                backgroundImage: "url('https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.gif')",
                imageRendering: 'pixelated',
                left: `${position.x - 16}px`,
                top: `${position.y - 16}px`,
                zIndex: 999,
            }}
        />
    );
};

export default Oneko;
