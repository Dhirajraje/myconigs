import { NavLink } from "react-router-dom"

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
            <div className="p-2 bg-slate-300 w-min rounded-md">
                {
                    navigations.map((el,index)=>{
                        return <NavLink className="p-2">{el.name}</NavLink>
                    })
                }
            </div>
        </div>
    </div>
}