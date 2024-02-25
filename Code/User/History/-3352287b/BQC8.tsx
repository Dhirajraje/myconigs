import { NavLink, Outlet } from "react-router-dom"

export default function HomeWrap() {
    const navigations = [{
        name:"Calculations",
        path:"/home/calculation"
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
                        return <NavLink key={index} to={el.path} className={({isActive})=>`p-2 font-bold whitespace-nowrap rounded-md ${isActive?" bg-white shadow":" "}`}>{el.name}</NavLink>
                    })
                }
            </div>
        </div>
        <div className="max-w-7xl mx-auto w-full py-2">
            <Outlet />
        </div>
    </div>
}