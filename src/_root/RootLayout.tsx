import Buttombar from '@/components/ui/shared/Buttombar'
import LeftSidebar from '@/components/ui/shared/LeftSidebar'
import Topbar from '@/components/ui/shared/Topbar'
import { Outlet } from 'react-router-dom'

function RootLayout() {
    return (
        <div className='w-full md:flex'>
            <Topbar />
            <LeftSidebar />
            <section className='flex flex-1 h-full'>
                <Outlet />
            </section>

            <Buttombar />
        </div>
    )
}

export default RootLayout