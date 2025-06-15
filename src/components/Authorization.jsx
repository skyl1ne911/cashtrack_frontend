import { useCallback, useEffect, useRef, useState } from 'react';
import { foo, signup, signin } from '../services/Rest.js'
import classNames from 'classnames';
import '../css/auth_window/auth.css'
import { useModal } from '../services/context.jsx';


function Authorization() {
    const [visible, setVisible] = useState(true); 
    
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [username, setUsername] = useState('Name');
    
    const mouseDownOnElement = useRef(false);

    const {
        containerRef,
        modalRef,
        containerStyle,
        modalStyle
    } = useAnimation(visible);

    const handleMouseDown = (e) => {
        if (modalRef.current && e.target === modalRef.current) {
            mouseDownOnElement.current = true;
        }
        else mouseDownOnElement.current = false;
    }
    
    const handleMouseUp = (e) => {
        if (modalRef.current && e.target === modalRef.current && mouseDownOnElement.current) {
            setVisible(false);
        }
        else mouseDownOnElement.current = false;
    }

    const handleClick = async () => {
        try {
            const response = await foo();
            setUsername(response.data.username);
        } catch(error) {
            console.log(error)
        }
    }

    const signupHandle = async () => {
        const response = await signup(
            usernameRef.current.value, 
            emailRef.current.value, 
            passwordRef.current.value
        )
    }

    const signinHandle = async () => {
        const response = await signin(
            emailRef.current.value, 
            passwordRef.current.value
        )
    }

    return(
        <div className={classNames('auth-modal')} ref={modalRef} style={modalStyle} onMouseUp={handleMouseUp} onMouseDown={handleMouseDown}>
            <div className='auth-modal-container' ref={containerRef} style={containerStyle}>

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

                    
                    <button className='auth-modal-content__register-btn' onClick={signinHandle}>Register</button>
                    

                    <div className='auth-modal-content-login'>
                        <h6 className='auth-modal-content-login-text'>Already have an account?</h6>
                        <a className='auth-modal-content-login-signin' href=''>Login</a>
                    </div>

                </div>

            </div>
        </div>
    )
}

function useAnimation(visible) {
    const {showAuth, setShowAuth} = useModal();
    const containerRef = useRef(null);
    const modalRef = useRef(null);

    const [containerStyle, setContainerStyle] = useState({
        top: '-100vh',
        transition: 0
    });

    const [modalStyle, setModalStyle] = useState({
        backgroundColor: 'rgba(0, 0, 0, 0)',
        transition: 0
    });

    useEffect(() => {
        if (visible) {
            requestAnimationFrame(() => {
                const modal = containerRef.current;
                    if (modal) {
                        const modalHeight = modal.offsetHeight;
                        const viewportHeight = window.innerHeight;
                        const centerY = (viewportHeight - modalHeight) / 2.5;
                        setContainerStyle({
                            top: `${centerY}px`,
                            transition: 'top 0.4s ease',
                        });
                        setModalStyle({
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            transition: 'background-color 0.2s ease-in'
                        })
                    }
            })
        } 
        else {
            setContainerStyle((prev) => ({
                ...prev,
                top: '200vh',
                transition: 'top 0.4s ease',
                })
            );
            setModalStyle({
                backgroundColor: 'rgba(0, 0, 0, 0)',
                transition: 'background-color 0.2s ease-out'
            });
            const timer = setTimeout(() => {
                setShowAuth(false);
            }, 400);
            return () => clearTimeout(timer);  
        }
    },  [visible])

    return {containerRef, modalRef, containerStyle, modalStyle}
}
export default Authorization;