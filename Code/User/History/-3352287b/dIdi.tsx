import { CalculatorIcon } from "@heroicons/react/24/solid"
import { NavLink, Outlet } from "react-router-dom"

export default function HomeWrap() {
    const navigations = [{
        name:"Calculations",
        path:"/home/calculation",
        icon:<CalculatorIcon className="w-5 h-5 text-current" />
    },
    {
        name:"Base Price Configs",
        path:"/home/base-price-config"
    },
    {
        name:"Additional Price Configs",
        path:"/home/additional-price-configs"
    },
    {
        name:"Time Multiplier Configs",
        path:"/home/time-multiplier-configs"
    },
    {
        name:"Waiting Charges Configs",
        path:"/home/waiting-charges-configs"
    }]
    return <div className="w-screen h-screen flex flex-col">
        <div className="max-w-7xl mx-auto w-full py-2">
            <div className="p-2 flex gap-2 bg-slate-300 w-min rounded-lg">
                {
                    navigations.map((el,index)=>{
                        return <NavLink key={index} to={el.path} className={({isActive})=>`p-2 font-bold whitespace-nowrap rounded-sm inline-flex items-center gap-2 ${isActive?" bg-white shadow text-indigo-600 ring-indigo-600 ring-2 ring-offset-2":" "}`}>
                            {el.icon??''}
                            <span>{el.name}</span>
                        </NavLink>
                    })
                }
            </div>
        </div>
        <div className="max-w-7xl mx-auto w-full py-2">
            <Outlet />
        </div>
    </div>
}