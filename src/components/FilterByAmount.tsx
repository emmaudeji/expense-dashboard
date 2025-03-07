import { useCallback, useState } from "react";
import { useExpenseContext } from "@/context/expensesContext";
import { BadgeDollarSign, Search, X } from "lucide-react";

const FilterByAmount = () => {
    const { updateURL, param, setCurrentPage } = useExpenseContext();
    const [minAmount, setMinAmount] = useState<string>()
    const [maxAmount, setMaxAmount] = useState<string>()

    const handleChange = useCallback(() => {
      if (!minAmount && !maxAmount) return;
      const { page, ...rest } = param;
      const newQueryParams = {
        ...rest, minAmount, maxAmount
    };
      setCurrentPage(1); 
      updateURL(newQueryParams);  
    }, [minAmount, maxAmount, updateURL, param, setCurrentPage]);

    const clear = useCallback(()  => {
        setMinAmount('')
        setMaxAmount('')
        const { page, ...rest } = param;
        const newQueryParams = {
            ...rest,
            minAmount: null,
            maxAmount: null,
        };
        setCurrentPage(1); 
        updateURL(newQueryParams);  
    }, [updateURL, param, setCurrentPage]);

  return (
    <div className="border rounded-md border-gray-300 px-2 py-1 text-sm">
        {/* <small></small> */}
        <div className="flex gap-2 items-center h-9">
            <BadgeDollarSign size={18}  className="text-gray-400"/>
            <div className="flex gap-1 items-center ">
                <label className=" text-[12px] ">Min.</label >
                <input 
                    type="number" 
                    name="minAmount" 
                    id="minAmount" 
                    value={minAmount} 
                    onChange={(e)=>setMinAmount(e.target.value)}
                    className="bg-transparent border-b border-gray-300  w-20 py-0.5 focus:outline-none focus-within:outline-none " 
                />
            </div>

            <div className="flex gap-1 items-center  ">
                <label className="text-[12px] ">Max.</label >
                <input 
                    type="number" 
                    name="maxAmount" 
                    id="maxAmount" 
                    value={maxAmount} 
                    onChange={(e)=>setMaxAmount(e.target.value)}
                    className="bg-transparent border-b border-gray-300  w-20  py-0.5 focus:outline-none focus-within:outline-none " 
                />
            </div>

            {minAmount||maxAmount?
                <div className="flex items-center gap-1">
                    <button type="button" className=" text-blue-600" onClick={handleChange}>
                        <Search size={18}/>
                    </button> 
                    <button type="button" className=" text-red-600" onClick={clear}>
                        <X size={18}/>
                    </button> 
                </div>
            : null}
        </div>
        
    </div>
  )
}

export default FilterByAmount