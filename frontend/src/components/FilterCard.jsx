import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { Filter, RotateCcw } from 'lucide-react'
import { Button } from './ui/button'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Science"]
    },
    {
        filterType: "Salary Range",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    const resetFilters = () => {
        setSelectedValue('');
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className='w-full bg-card p-6 rounded-3xl border border-border/60 shadow-sm space-y-6'>
            <div className='flex items-center justify-between pb-4 border-b border-border/40'>
                <div className='flex items-center gap-2 font-bold text-lg text-foreground'>
                    <Filter className='w-5 h-5 text-primary' />
                    <span>Filter Jobs</span>
                </div>
                {selectedValue && (
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={resetFilters} 
                        className='h-8 px-2 text-xs text-muted-foreground hover:text-primary'
                    >
                        <RotateCcw className='w-3.5 h-3.5 mr-1' /> Reset
                    </Button>
                )}
            </div>

            <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-6">
                {filterData.map((data, index) => (
                    <div key={index} className='space-y-3'>
                        <h3 className='font-semibold text-sm tracking-wide uppercase text-muted-foreground'>{data.filterType}</h3>
                        <div className='space-y-2.5 pl-1'>
                            {data.array.map((item, idx) => {
                                const itemId = `id${index}-${idx}`
                                return (
                                    <div key={itemId} className='flex items-center space-x-3 group cursor-pointer'>
                                        <RadioGroupItem value={item} id={itemId} className="text-primary border-border/80 group-hover:border-primary" />
                                        <Label htmlFor={itemId} className="text-sm font-medium text-foreground/80 group-hover:text-foreground cursor-pointer transition-colors">
                                            {item}
                                        </Label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}

export default FilterCard