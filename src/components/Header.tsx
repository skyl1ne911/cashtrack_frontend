import "../css/header/header.css"
import "../css/header/header-light.css"
import "../css/header/header-dark.css"
import { act, useCallback, useEffect, useRef, useState } from 'react';
import { LogOutIcon, UserRound, ChevronDown, UserIcon, SettingsIcon, Sun, Moon, Factory } from "lucide-react";  
import classNames from 'classnames';
import { useTheme } from "../contexts/ThemeContext";
import { cn, tv } from "tailwind-variants";
import { useAuth, useVisibleAuth } from "../contexts/AuthContext";
import { allUsers, logout } from "../services/Rest";
import Authorization from "./Authorization";
import { a } from "react-spring";
import Logout from "./Logout";
// import { foo } from '../services/Rest.js'
// import { Link } from 'react-router-dom';
// import Authorization from "./Authorization.jsx";
// import { useModal } from "../services/context.jsx";

const style = tv({
    slots: {
        header: 'relative z-5 mt-[15px] ml-[30px]',
        content: 'w-full p-[10px_20px] flex items-center',
        dashboard: 'relative flex items-center gap-[5px] select-none cursor-pointer',
        dashboardTitle: 'text-(--text-color) text-xl transition-colors duration-250 ease-in-out font-[500]',
        userSection: 'relative flex items-center py-[7px] pl-[10px] pr-[20px] rounded-[11px] ml-auto',
        avatarWrapper: 'size-[36px] mr-[18px]',
        defaultAvatar: 'size-full bg-white rounded-full cursor-pointer',
        avatar: 'size-full rounded-full cursor-pointer object-cover',
        userWrapper: 'flex flex-col items-start gap-[1px] font-(family-name:--sec-font)',
        usernameWrapper: "flex items-center gap-[6px]",
        username: 'font-[600] text-base text-(--default-color)'
    },
    variants: {
        authentication: {
            true: 'cursor-default text-green-500',
            false: 'cursor-pointer text-red-500',
        }
    },
    compoundSlots: [
        {
            slots: ['username'],
            authentication: true,
            class: 'cursor-default text-green-500'
        },
        {
            slots: ['username'],
            authentication: false,
            class: 'cursor-pointer text-red-500'
        }
    ]
});

const themes = {
    light: 'Light mode',
    dark: 'Dark mode',
    system: 'System mode'
} as const;

type SelectedTheme = keyof typeof themes;

const themeSvg = {
    light: Sun,
    dark: Moon 
} as const;

enum Active {
    dashboard = "dashboard",
    accountSettings = "accountSettings",
    authPopup = "authPopup"
}


function Header() {
    const userData = useAuth().userData;
    const themeState = useTheme();
    const [active, setActive] = useState<Active | null>(null);

    const [isOpenThemeMenu, setIsOpenThemeMenu] = useState(false);
    const [isOpenAccountSettings, setIsOpenAccountSettings] = useState(false);

    const isAuthorized = useAuth()?.authorized;
    const [showLogout, setShowLogout] = useAuth().logoutWindow;

    const toggleActive = useCallback((currentActive: Active) => setActive(prev => 
        (prev === currentActive ? null : currentActive)
    ), []);
    
    // const toggleDropDown = useCallback(() => setIsOpenThemeMenu(prev => !prev), []);
    // const toggleDropDownAccountSettings = useCallback(() => setIsOpenAccountSettings(prev => !prev), []);
    // const toggleVisibleAuthWindow = useCallback(() => setVisibleAuth(prev => !prev), []);
    
    // const className = cn('cursor-pointer', isOpenAccountSettings && 'rotate');

    const IconTheme = themeSvg[themeState.current];
    
    useEffect(() => {
        if (showLogout)
            setIsOpenAccountSettings(prev => !prev);
    }, [showLogout])


    return(isAuthorized != null &&
        <header className={style().header()}>
            
            <div className={style().content()}>
                {/* Dashboard */}
                <div className={style().dashboard()} onClick={() => toggleActive(Active.dashboard)}>
                    <h5 className={style().dashboardTitle()}>Dashboard</h5>
                    <ChevronDown color="var(--text-color)" size={18} strokeWidth={2}/>
                </div>
                { active === Active.dashboard && <DropDown onClick={() => toggleActive(Active.dashboard)}/>}

                {/* User */}
                <div className={style().userSection()}>
                    <div className={style().avatarWrapper()} onClick={() => toggleActive(Active.accountSettings)}>
                        { userData?.picture 
                            ? <img src={userData?.picture} className={style().avatar()}/>
                            : <UserRound className={style().defaultAvatar()}/> 
                        }
                    </div>

                    <div className={style().userWrapper()}>
                        <div className={style().usernameWrapper()}>
                            <h6 className={style({ authentication: isAuthorized }).username()} onClick={() => toggleActive(Active.authPopup)}>{isAuthorized ? userData?.username: 'Войти'}</h6>
                            <ChevronDown className='mt-[2px]' size={18} color="var(--default-color)"/>
                        </div>
                        <p className='font-[300] text-sm text-(--default-color)' title="Copy">{isAuthorized && `@${formatUserId(userData?.id)}`}</p>
                    </div>

                    { active === Active.accountSettings && <DropDownAccount onClick={() => toggleActive(Active.accountSettings)} onClose={() => setIsOpenAccountSettings(false)}/>}
            
                </div>

                <div className='ml-[10px]'>
                    <IconTheme size={24} color="white" />
                </div>

            </div>
            { active === Active.authPopup && <Authorization onClose={() => toggleActive(Active.authPopup)}/>}
            {/* {showLogout && <Logout/>} */}
        </header>
    )
}


function DropDown({onClick: handleCloseDropdown}: {onClick: () => void}) { 
    const {selected, current, setTheme} = useTheme();

    const handleThemeChange = useCallback((value: SelectedTheme) => {
        setTheme(value);
    }, [current]);


    return(
        <>
        <div className="overlay" onClick={handleCloseDropdown}/>
        <ul className='header-dropdown'>
            {
                Object.entries(themes).map(([key, value]) => {
                    const themeKey = key as SelectedTheme;
                    return (
                        <li className='flex justify-center p-[10px]' key={key}>
                            <button className={classNames("header-dropdown-button__transition p-[10px_15px] rounded-[10px] cursor-pointer text-(--text-color)", 
                                {'bg-(--bg-btn-a-color)!': selected === key})} 
                                onClick={() => handleThemeChange(themeKey)}>
                                {value}
                            </button>
                        </li>
                    );
                })
            } 
        </ul>
        </>
    )
}   


function DropDownAccount({onClick: dropDownClose, onClose: handlerCloseAccountWindow}: 
    {onClick: () => void; onClose: () => void}
) {
    const [showLogoutWindow, setShowLogoutWindow] = useAuth().logoutWindow;
    const accountItems = [
        { label: 'Account', icon: UserIcon },
        { label: 'Settings', icon: SettingsIcon },
        { label: 'Log out', icon: LogOutIcon }
    ];

    const logoutHandler = async () => {
        try {
            const response = await logout();
            window.location.reload();
            console.log("Logout done:", response.data);
        } catch (e) {
            console.error("Logout failed:", e);
        }
    }

    return(
        <>
        <div className="overlay" onClick={dropDownClose}/>
        <div className='header-dropdown-account bg-(--bg-dd-color)'>

            <ul className='p-0 overflow-hidden'>
                {
                    accountItems.map(({label, icon: Icon}, index) => {
                        const isLast = index === accountItems.length - 1;
                        return(                  
                            <li key={index}>
                                { isLast && <div className='header-dropdown-account__content-item__line'/>}
                                <div className={`header-dropdown-account__content-item__container`} onClick={() => {
                                    isLast && (setShowLogoutWindow(false), logoutHandler());
                                    handlerCloseAccountWindow();
                                }}>
                                    <Icon className='text-(--text-color)' size={22}/>
                                    <p className='text-base text-(--text-color)'>{label}</p>
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


function formatUserId(userId: string | undefined): string {
    if (!userId) return '';
    return userId.length > 7 ? userId.slice(0, 7) + "..." : userId;
}

export default Header;

