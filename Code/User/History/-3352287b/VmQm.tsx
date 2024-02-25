import { ArrowTrendingUpIcon, BanknotesIcon, CalculatorIcon, CircleStackIcon, ClockIcon } from "@heroicons/react/24/solid"
import { NavLink, Outlet } from "react-router-dom"

export default function HomeWrap() {
    const navigations = [{
        name:"Calculations",
        path:"/home/calculation",
        icon:<CalculatorIcon className="w-5 h-5 text-current" />
    },
    {
        name:"Base Price Configs",
        path:"/home/base-price-config",
        icon:<CircleStackIcon className="w-5 h-5 text-current" />
    },
    {
        name:"Additional Price Configs",
        path:"/home/additional-price-configs",
        icon:<BanknotesIcon className="w-5 h-5 text-current" />
    },
    {
        name:"Time Multiplier Configs",
        path:"/home/time-multiplier-configs",
        icon:<ArrowTrendingUpIcon className="w-5 h-5 text-current" />
    },
    {
        name:"Waiting Charges Configs",
        path:"/home/waiting-charge-configs",
        icon:<ClockIcon className="w-5 h-5 text-current" />
    }]
    return <div className="w-screen h-screen flex flex-col overflow-auto">
        <h1 className="text-xl max-w-7xl mx-auto w-full px-2 pt-2 sm:text-2xl md:text-3xl text-indigo-600 font-bold">Charge calculation app</h1>
        <div className="max-w-7xl mx-auto w-full p-2">
            <div className="p-2 flex gap-2 bg-slate-300 w-min rounded-lg">
                {
                    navigations.map((el,index)=>{
                        return <NavLink key={index} to={el.path} title={el.name} className={({isActive})=>`p-2 font-bold whitespace-nowrap rounded-sm inline-flex items-center gap-2 ${isActive?" bg-white shadow text-indigo-600 ring-indigo-600 ring-2 ring-offset-2":" "}`}>
                            {el.icon??''}
                            <span className=" hidden sm:block" >{el.name}</span>
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