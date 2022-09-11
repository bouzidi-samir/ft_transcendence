import React from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

export default function Particle() {
    return (
        <div>
            <Particles
            options={{
                background: {
                    color: "blue",
                },
                fpsLimit: 60,
                interactivity: {
                    detectsOn: "canvas",
                    events: {
                        resize: true
                    },
                },
                particles: {
                    color: {
                        value: "white"
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 1000
                        },
                        limit: 0,
                        value: 400,
                    },
                    opacity: {
                        animation: {
                            enable: true,
                            minimumValue: 0.05,
                            speed: 1,
                            sync: false
                        },
                        random: {
                            enable: true,
                            minimumValue: 0.05
                        },
                        value: 1
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        random: {
                            enable: true,
                            minimumValue: 0.5,
                        },
                        value: 1,
                    },
                }
            }}
            />
        </div>
    );
}