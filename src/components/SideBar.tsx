import { ChartPie, CreditCard, Flag, GraduationCap, House, Settings, SquareKanban } from "lucide-react";
import { tv } from "tailwind-variants";



const style = tv({
    slots: {
        sidebar: 'max-w-[80px] w-screen h-screen fixed bg-[#444444] top-[0] left-[0] z-10 border-r-[1px] border-white',
        appIcon: 'mt-[25px]',
        listItem: 'm-[20px_10px] p-[5px_10px] bg-gray-700 rounded-[8px] hover:cursor-pointer'
    }
});

const icons = [House, Flag, SquareKanban, GraduationCap, CreditCard, Settings];

function SideBar() {
    return(
        <div className={style().sidebar()}>
            <aside className='flex items-center flex-col'>
            <div className={style().appIcon()}>
               <ChartPie color="white" size={44} strokeWidth={2} />
            </div>

            <nav className="my-[20px]">
                <ul className="">
                    {icons.map((Icon, index) => {
                        return(
                            <li className={style().listItem()} key={index}>
                                <Icon size={24} color="white"/>
                            </li>
                        );
                    })   
                    }
                </ul>
            </nav>
            </aside>
        </div>
    );
}


export default SideBar;