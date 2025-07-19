import { useAnimate } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useClickOutsideToClose } from "./Authorization";
import { logout } from "../services/Rest";




function Logout() {
    const [animation, setAnimation] = useState(true);
    // const {handleMouseUp, handleMouseDown} = useClickOutsideToClose(overlayRef, () => setAnimation(false));


    return(
        <div className="overlay">
            <div className="auth-modal-container relative max-w-[250px]! rounded-[12px]! p-[0_3rem]! pb-[3rem]! pt-[1.7rem]!">

                <div className="flex items-center justify-center">
                    <div className="logout-content__title">Logout?</div>
                    <div className="logout-content__agrees">
                        <h4 className="logout-content__agrees_answer">Are you sure that you want to logout?</h4>
                        <button className="">yes</button>
                        <button className="">no</button>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default Logout;