import { Button } from "@/components/ui/button";
import { FancyMultiSelect } from "@/components/ui/fancy-multi-select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import api from "@/utils/axios-instance";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/solid";
import { Label } from "@radix-ui/react-label";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";


async function getBasePrices() {
    return await api.get('master/dbp-master/')
}

export default function BasePriceConfig() {
    const query = useQuery({ queryKey: ['base-prices'], queryFn: getBasePrices })
    const [modalState, setModalState] = useState<{ isOpen: boolean, data: any }>({
        isOpen: false,
        data: null
    })
    const [history, setHistory] = useState<number | undefined>()
    return <div className="flex flex-col gap-2 w-full max-w-7xl p-2">
        {
            query.isLoading ? <div className="p-10 flex w-full justify-center items-center">
                <div className="w-4 h-4 bg-indigo-600 rounded-full animate-ping"></div>
            </div> : query.isError ? <div className="text-red-400">Something went wrong</div> : <>
                <div className="flex gap-2 items-center">
                    <h2 className="text-lg font-semibold flex-grow">Base Prices</h2>
                    <Button onClick={_ => {
                        setModalState({
                            isOpen: true,
                            data: null
                        })
                    }}>Add New</Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">id</TableHead>
                            <TableHead>Base Price</TableHead>
                            <TableHead>Base Distance</TableHead>
                            <TableHead>Applicable Days</TableHead>
                            <TableHead>Created By</TableHead>
                            <TableHead>Created On</TableHead>
                            <TableHead className="">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {query.data?.data.data.map((entry: any) => (
                            <TableRow key={entry.id}>
                                <TableCell className="font-medium">{entry.id}</TableCell>
                                <TableCell>{entry.base_price}</TableCell>
                                <TableCell>{entry.base_distance}</TableCell>
                                <TableCell>{entry.applicable_days.join(',')}</TableCell>
                                <TableCell>{entry.created_by.username}</TableCell>
                                <TableCell>{entry.created_on ? new Date(entry.created_on.split('.')[0]).toLocaleDateString('en-GB') : ''}</TableCell>
                                <TableCell className=" justify-end inline-flex gap-2">
                                    <Button><EyeIcon className="w-4 h-4" /></Button>
                                    <Button onClick={_ => {
                                        setModalState({
                                            isOpen: true,
                                            data: entry
                                        })
                                    }}><PencilIcon className="w-4 h-4" /></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table></>
        }
        {
            modalState.isOpen ?
                <Modal modalState={modalState} setModalState={setModalState} />
                : null
        }
        {
            history ?
                <HistoryModal id={history} closeHistoryModal={() => setHistory(undefined)} />
                : null
        }
    </div>
}

function Modal({ setModalState, modalState }: { setModalState: Function, modalState: { isOpen: boolean, data: any } }) {
    const [dropdownItems, setDropdownItems] = useState([])
    useEffect(() => {
        if (!modalState.isOpen) return
        api.get('master/day-dropdown/', {
            params: {
                dbp_id: modalState.data?.id ?? null
            }
        }).then(res => {
            setDropdownItems(res.data.data.map((el: any) => { return { label: el, value: el } }) ?? [])
        })
    }, [])

    async function saveBasePrice() {
        if (!modalState.data.id) {
            const _data_to_add = {
                base_price: modalState.data.base_price,
                base_distance: modalState.data.base_distance,
                applicable_days: modalState.data.applicable_days
            }
            await api.post('master/dbp-master/', _data_to_add)
            setModalState({ isOpen: false, data: null })
        }
        else {
            const _data_to_update = {
                id: modalState.data.id,
                base_price: modalState.data.base_price,
                base_distance: modalState.data.base_distance,
                applicable_days: modalState.data.applicable_days
            }
            await api.patch('master/dbp-master/', _data_to_update)
            setModalState({ isOpen: false, data: null })

        }
    }
    // Mutations
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: saveBasePrice,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['base-prices'] })
        },
    })

    return <div className="absolute bg-slate-500/30 top-0 p-2 left-0 h-screen w-screen flex justify-center items-center">
        <div className="rounded-md bg-white max-w-md w-full shadow p-4 flex flex-col">
            <h2 className="text-lg border-b font-semibold">
                Base Price
            </h2>
            <div className="flex-grow overflow-visible">
                <div className="grid w-full items-center gap-1.5 p-1">
                    <Label htmlFor="base-price">Base Price</Label>
                    <Input value={modalState.data?.base_price} onChange={e => {
                        setModalState({
                            ...modalState,
                            data: {
                                ...modalState.data ?? {},
                                base_price: e.target.value
                            }
                        })
                    }} type="number" id="base-price" placeholder="Base Price" />

                </div>
                <div className="grid w-full items-center gap-1.5 p-1">
                    <Label htmlFor="base-distance">Base Distance</Label>
                    <Input value={modalState.data?.base_distance} onChange={e => {
                        setModalState({
                            ...modalState,
                            data: {
                                ...modalState?.data ?? {},
                                base_distance: e.target.value
                            }
                        })
                    }} type="number" id="base-distance" placeholder="Base Distance" />

                </div>
                <div className="grid w-full items-center gap-1.5 p-1">
                    <Label htmlFor="">Base Distance</Label>
                    <FancyMultiSelect options={dropdownItems}
                        selecteds={modalState.data?.applicable_days?.map((el: any) => {
                            return { label: el, value: el }
                        }) ?? []}
                        onSelectChange={(values: any) => {
                            setModalState({
                                ...modalState,
                                data: {
                                    ...modalState?.data ?? {},
                                    applicable_days: values.map(el => el.value)
                                }
                            })

                        }} />

                </div>
            </div>
            <div className="flex justify-end gap-2">
                <Button onClick={_ => {
                    setModalState({ isOpen: false, data: null })
                }} variant="outline">Cancel</Button>
                <Button onClick={_ => {
                    mutation.mutate()
                }}>Save</Button>
            </div>
        </div>
    </div>;
}


function HistoryModal({ id, closeHistoryModal }: { id: number, closeHistoryModal: Function }) {

    async function getBasePriceHistory() {
        return await api.get('master/dbp-master/', {
            params: {
                audit_type: 'DBP',
                autid_tx_id: id
            }
        })
    }
    const query = useQuery({ queryKey: ['audit-history', 'BDP', id], queryFn: getBasePriceHistory })

    return <div className="absolute bg-slate-500/30 top-0 p-2 left-0 h-screen w-screen flex justify-center items-center">
        <div className="rounded-md bg-white max-w-md w-full shadow p-4 flex flex-col">
            <h2 className="text-lg border-b font-semibold">
                Audit Histroy
            </h2>
            <div className="flex-grow overflow-visible">
                query.isLoading ? <div className="p-10 flex w-full justify-center items-center">
                    <div className="w-4 h-4 bg-indigo-600 rounded-full animate-ping"></div>
                </div> : query.isError ? <div className="text-red-400">Something went wrong</div> :
                <>
                    {
                        query.data?.data.data.map((el: any, index: any) => {
                            return <div className="flex gap-2" key={index}>
                                <div className="flex justify-between">
                                    <h3 className="text-md font-medium">
                                        {el.created_by.username}
                                    </h3>
                                    <span className="text-sm">
                                        {el.created_on ? new Date(el.created_on.split('.')[0]).toLocaleDateString('en-GB') : ''}
                                    </span>
                                </div>
                            </div>
                        })
                    }
                </>
            </div>
            <div className="flex justify-end gap-2">
                <Button onClick={_ => {
                    closeHistoryModal()
                }}>Close</Button>
            </div>
        </div>
    </div>;
}
