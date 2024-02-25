import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function Calculations() {
    const [date, setDate] = useState<Date>()
    const [submitAttempted, setSubmitAttempts] = useState(false)
    const [distance, setDistance] = useState()
    const [travelTime, setTravelTime] = useState()
    const [waitingTime, setWatingTime] = useState()

    return <div className="p-2 max-w-3xl flex flex-col gap-2 w-full">
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="dt">Date of travel</Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? date.toDateString() : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            {submitAttempted && !date ? <Label htmlFor="dt" className="text-red-400">No value selected</Label> : null}

        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="dt">Distance Travelled (in KMs)</Label>
            <Input type="number" id="dt" placeholder="Distance Travelled" value={distance} onChange={(e:any)=>{
                setDistance(e.target.value)
            }}/>
            {submitAttempted && !distance ? <Label htmlFor="dt" className="text-red-400">Invalid Value</Label> : null}
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="ttt">Total Time Travelled (in hours)</Label>
            <Input type="number" id="ttt" placeholder="Total Time Travelled" value={travelTime} onChange={(e:any)=>{
                setTravelTime(e.target.value)
            }}/>
            {submitAttempted && !travelTime ? <Label htmlFor="dt" className="text-red-400">Invalid Value</Label> : null}
        
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="wt">Waiting Time (in minutes)</Label>
            <Input type="wt" id="wt" placeholder="Waiting Time" value={waitingTime} onChange={(e:any)=>{
                setWatingTime(e.target.value)
            }}/>
            {submitAttempted && !waitingTime ? <Label htmlFor="dt" className="text-red-400">Invalid Value</Label> : null}
        
        </div>
        <div className="grid w-full max-w-sm items-center pt-2 mt-2 border-t gap-1.5">
            <Button className="bg-indigo-600"
                onClick={_=>{
                    if(!date || !distance){
                        setSubmitAttempts(true)
                    }
                }}
            >Submit</Button>
        </div>
    </div>
}