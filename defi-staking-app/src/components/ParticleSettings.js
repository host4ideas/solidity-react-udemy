import React from "react";
import Particles from "react-tsparticles";

export default function ParticleSettings() {
    return (
        <div>
            <Particles
                height="100vh"
                width="100vw"
                id="tsparticles"
                options={{
                    background: {
                        color: {
                            value: "#21529B",
                        },
                    },
                    fpsLimit: 60,
                    interactivity: {
                        detect_on: "canvas",
                        events: {
                            onclick: {
                                enable: true,
                                mode: "push",
                            },
                            onhover: {
                                enable: true,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            bubble: 400,
                            duration: 2,
                            opacity: 0.8,
                            size: 40,
                        },
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 20,
                            duration: 0.4,
                        },
                    },
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        links: {
                            color: "#ffffff",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        collisions: {
                            enable: true,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outmode: "bounce",
                            random: false,
                            speed: 3,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                value_area: 800,
                            },
                            value: 80,
                        },
                        opacity: {
                            value: 0.5,
                        },
                    },
                }}
            />
        </div>
    );
}
