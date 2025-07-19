import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import '../css/auth_window/auth.css'
import { signin, signup } from '../services/Rest';
import { useAuth, useVisibleAuth } from '../contexts/AuthContext';
import { tv } from 'tailwind-variants';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useAnimate, useInView } from "motion/react"


function Authorization({onClose}: {onClose: () => void}) {
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [visible, setVisible] = useState(true);

    const [scopeContainer, animateContainer] = useAnimate();
    const [scopeOverlay, animateOverlay] = useAnimate();
    const isInView = useInView(scopeOverlay);

    const handleOAuth2 = () => {
        window.location.href = "https://localhost/api/oauth2/authorization/google";
    }


    useEffect(() => {
        if (scopeContainer.current ) {
            const h = scopeContainer.current.offsetHeight;
            const vh = window.innerHeight;
            const centerY = (vh - h) / 2.5;

            animateContainer(scopeContainer.current,
                { y: `${centerY}px`, opacity: 1 },
                { ease: "easeInOut", duration: 0.4 }
            );
            animateOverlay(scopeOverlay.current,
                { opacity: 0.4 },
                { ease: "easeIn", duration: 0.3 }
            );
        }  
    }, [isInView]);


    const handleClose = async () => {
        if (!visible) return; 
        setVisible(false);
        
        await Promise.all([
            animateContainer(scopeContainer.current,
                { y: '100%', opacity: 0 },
                { ease: "easeInOut", duration: 0.4 }
            ),
            animateOverlay(scopeOverlay.current,
                { opacity: 0 },
                { ease: "easeOut", duration: 0.3 }
            )
        ]);
        onClose();
    }

    // const {handleMouseUp, handleMouseDown} = useClickOutsideToClose(scopeOverlay, () => setAnimation(false));


    return(
        <AnimatePresence>   
        <div className="overlay" onClick={handleClose}>
        <div className='opacity-0 overlay-background absolute inset-0 bg-black' ref={scopeOverlay}/>
        <div className='auth-modal-container opacity-0' ref={scopeContainer} onClick={e => e.stopPropagation()}>

            <div className='auth-modal-content'>
                <h3 className='auth-modal-content__title'>Registration</h3>

                <div className='auth-modal-content__fields'>
                    <input className='auth-modal-content__fields-item' ref={usernameRef} placeholder='Name' maxLength={16}/>
                    <input className='auth-modal-content__fields-item' ref={emailRef} placeholder='Email' maxLength={32}/>
                    <input className='auth-modal-content__fields-item' ref={passwordRef} placeholder='Password' type='password' maxLength={32}/>
                </div>

                <div className='auth-modal-content__agree'>
                    <input className='auth-modal-content__agree-checkbox' type='checkbox'/>
                    <p className='auth-modal-content__agree-text'>I agree to the Terms & Conditions</p>
                </div>

                <div className='flex flex-col gap-4 mb-[20px]'>
                    <button className='auth-modal-content__register-btn'>Register</button>
                    <button className='auth-modal-content__register-btn' onClick={handleOAuth2}>Register via google</button>
                </div>
                
                <div className='auth-modal-content-login'>
                    <h6 className='auth-modal-content-login-text'>Already have an account?</h6>
                    <a className='auth-modal-content-login-signin' href=''>Login</a>
                </div>

            </div>

        </div>
        </div>
        </AnimatePresence>
    )
}

export function useClickOutsideToClose(elementRef: React.RefObject<HTMLElement>, stopAnimation: () => void) {
    const mouseDownOnElement = useRef(false);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (elementRef.current && e.target === elementRef.current) {
            mouseDownOnElement.current = true;
        }
        else mouseDownOnElement.current = false;
    }
    
    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        if (elementRef.current && e.target === elementRef.current && mouseDownOnElement.current) {
            stopAnimation();
        }
        else mouseDownOnElement.current = false;
    }
    return {handleMouseUp, handleMouseDown};
}

export default Authorization;