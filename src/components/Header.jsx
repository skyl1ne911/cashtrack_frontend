import "../css/header/header.css"
import "../css/header/header-light.css"
import "../css/header/header-dark.css"
import { act, useCallback, useEffect, useRef, useState } from 'react';
import { LogOutIcon, UserRound, ChevronDown, UserIcon, SettingsIcon } from "lucide-react";  
import classNames from 'classnames';
import { foo } from '../services/Rest.js'
import { Link } from 'react-router-dom';
import Authorization from "./Authorization.jsx";
import { useModal } from "../services/context.jsx";

const themeOptions = [
    { value: 'theme-light', label: 'Light Mode' },
    { value: 'theme-dark', label: 'Dark Mode' },
    { value: 'theme-system', label: 'System Mode' },
];


function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [showAccountSettings, setShowAccountSettings] = useState(false);
    const [currentTheme, setCurrentTheme] = useState(themeOptions[0].value);
    const {showAuth, setShowAuth} = useModal();

    const toggleDropDown = useCallback(() => setIsOpen(prev => !prev), []);
    const toggleDropDownAccountSettings = useCallback(() => setShowAccountSettings(prev => !prev), []);
    // const toggleAuthWindow = useCallback(() => setShowAuth(prev => !prev), [showAuth]);
    
    
    const handleThemeChange = useCallback((value) => {
        setCurrentTheme(value);
    }, []);

    useEffect(() => {
        if (currentTheme === 'theme-system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setCurrentTheme(prefersDark ? 'theme-dark' : 'theme-light');
        }
        document.documentElement.className = currentTheme;
        localStorage.setItem('theme', currentTheme);
    }, [currentTheme])


    return(
        <header className='header'>

            <div className='header-dashboard' onClick={toggleDropDown}>
                <h5 className={classNames('header-dashboard__title', currentTheme)}>Dashboard</h5>
                <ChevronDown className='header-dashboard__icon-arrow' size={18} strokeWidth={2}/>
                { 
                    isOpen && <DropDown currentTheme={currentTheme} handlerTheme={handleThemeChange}/>
                }
            </div>

            <div className='header-profile'>
                <div className='header-profile__icon-wrapper'>
                    <UserRound className='header-profile__icon' onClick={toggleDropDownAccountSettings}/>
                </div>

                <div className='header-profile-section__info'>
                    <h6 className='header-profile-section__info-name'>username</h6>
                    <p className='header-profile-section__info-id'>@username1234</p>
                </div>


            </div>

            {showAccountSettings && <DropDownAccount onClick={toggleDropDownAccountSettings} theme={currentTheme}/>}
            {showAuth && <Authorization/> }

        </header>

    )
}


// status = close or open dropdown list
function DropDown({currentTheme, handlerTheme}) { 

    const handleThemeChange = useCallback((value) => {
        handlerTheme(value);
    }, [handlerTheme]);

    return (
        <>
        <div className="header-overlay"/>
        <ul className={classNames('header-dropdown', currentTheme)} onClick={e => e.stopPropagation()}>
            {
                themeOptions.map(({value, label}) => {
                    return (
                        <li className='header-dropdown__item' key={value}>
                            <button className={classNames("header-dropdown__item-button-text", currentTheme, {'active' : currentTheme === value})} onClick={() => handleThemeChange(value)}>
                                {label}
                            </button>
                        </li>
                    );
                })
            } 
        </ul>
        </>
    )
}   

function DropDownAccount({onClick: dropDownClose, theme}) {
    const accountItems = [
        { label: 'Account', icon: UserIcon },
        { label: 'Settings', icon: SettingsIcon },
        { label: 'Log out', icon: LogOutIcon }
    ];
    
    const mainClassName = 'header-dropdown-account'
    const elemClassName = 'header-dropdown-account__content-item';


    return(
        <>
        <div className="header-overlay" onClick={dropDownClose}/>
        <div className={classNames(mainClassName, theme)}>

            <ul className={classNames(`${mainClassName}__content`, theme)}>
                {
                    accountItems.map(({label, icon: Icon}, index) => {
                        const isLast = index === accountItems.length - 1;
                        return(                  
                            <li className={elemClassName} key={index}>
                                { isLast && <div className={`${elemClassName}__line`}/>}
                                <div className={classNames(`${elemClassName}__container`, theme, {'last': isLast})}>
                                    <Icon className={classNames(`${elemClassName}__icon`, theme)} size={22}/>
                                    <p className={classNames(`${elemClassName}__text`, theme)}>{label}</p>
                                </div>
                            </li>
                        );
                   })   
                }
            </ul>

        </div>
        </>
    )
}

export default Header;


