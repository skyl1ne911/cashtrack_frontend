import { useEffect, useRef, useState } from "react";
import { useVisibleAuth } from "../contexts/AuthContext";



export class WindowAnimation {
    constructor() {
        
    }

    public animation(animation: boolean) {
        const setVisible = useVisibleAuth()[1];     
        
        const containerRef = useRef<HTMLInputElement>(null);
        const overlayRef = useRef<HTMLInputElement>(null);

        const [containerStyle, setContainerStyle] = useState({
            top: '10%',
            transition: '',
            opacity: '0'
        });

        const [overlayStyle, setOverlayStyle] = useState({
            backgroundColor: 'rgba(0, 0, 0, 0)',
            transition: ''
        });

        useEffect(() => {
            if (animation) {
                requestAnimationFrame(() => {
                    const container = containerRef.current;
                        if (container) {
                            const containerHeight = container.offsetHeight;
                            const viewportHeight = window.innerHeight;
                            const centerY = (viewportHeight - containerHeight) / 2.5;
                            setContainerStyle({
                                top: `${centerY}px`,
                                transition: '0.4s ease',
                                opacity: '1'
                            });
                            setOverlayStyle({
                                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                transition: 'background-color 0.2s ease-in'
                            })
                        }
                })
            } 
            else {
                setContainerStyle((prev) => ({
                    ...prev,
                    top: '60%',
                    transition: '0.4s ease',
                    opacity: '0'
                    })
                );
                setOverlayStyle({
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    transition: 'background-color 0.2s ease-out'
                });
                const timer = setTimeout(() => {
                    setVisible(false);
                }, 300);
                return () => clearTimeout(timer);  
            }
        },  [animation])

        return {containerRef, overlayRef, containerStyle, overlayStyle};
    }
}

