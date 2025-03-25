import Image from 'next/image';
import React from 'react';

interface DataNotFoundProps {
    title?: string;
    description?: string;
    description2?: string
}

export default function DataNotFound({
    title = 'No Data Found',
    description = 'It looks like there is no data .',
    description2 = 'available at the moment'
}: DataNotFoundProps) {
    return (
        <div className='w-full h-full flex justify-center items-center bg-white border-l border-[#FAFBFF]'>
            <div className='w-full h-full flex flex-col gap-[12px] items-center justify-center'>
                <Image src={'/images/data-not-found.svg'} alt='data-not-found' width={230} height={237} />
                <h1 className='mt-[12px] font-nunito font-medium text-[30px] leading-[100%] tracking-[0px] text-center text-[#111111]'>
                    {title}
                </h1>
                <p className='text-center font-nunito font-normal text-[18px] leading-[20px] tracking-[0px] text-[#8391A1]'>
                    {description} <br />
                    {description2}
                </p>
            </div>
        </div>
    );
}
