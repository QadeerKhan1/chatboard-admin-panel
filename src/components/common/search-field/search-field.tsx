import React from 'react'
import SearchIcon from './search-icon'

export default function SearchField({ placeholder , onChange }: { placeholder: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <div className="relative bg-[#F5F5F56B] flex items-center gap-[15px] pl-[15px] border border-[#DBDBDB] bg-white rounded-[6px]">
            <SearchIcon />
            <input
                onChange={onChange}
                type="text"
                placeholder="Search for statics"
                className=" w-[250px] 2xl:w-[315px] h-[45px] 2xl:h-[50px]  font-nunito font-normal text-[13px] 2xl:text-[15px] leading-[100%] tracking-[0em]  rounded-lg  text-[#1E265E] focus:outline-none"
            />
        </div>
    )
}
