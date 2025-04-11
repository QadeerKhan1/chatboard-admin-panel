"use client"

import Sidebar from '../../sidebar/sidebar';
import { usePathname } from 'next/navigation';
import Navbar from '../navbar/navbar';

export const PrivateLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    const pathName = usePathname();
    const isVisitNotesPage = pathName ? pathName.includes("/visit-notes/") : false;


    return (
        <div className="flex flex-col h-full w-full max-w-[1920px] mx-auto border ">
            {/* nav bar */}
            {/* <Navbar /> */}


            <div className="flex items-start justify-start  ">
                {/* side bar */}
                <div className='w-full flex'>
                    <Sidebar />
                    <div className='w-full h-full'>
                        <Navbar />
                        <div className={`w-full p-[25px] overflow-auto bg-[#e4f0ff]  h-[calc(100vh-70px)] `}>
                            {children}
                        </div>
                    </div>
                </div>




            </div>
        </div>
    )
}
