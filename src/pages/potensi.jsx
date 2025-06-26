import React from 'react'
import { ParawisataSection, UmkmSection,UmkmKerajinan } from '../components'
export default function Potensi() {
    return (
        <div>
            <div id='container' className='w-[80%] mx-auto my-10'>
                <ParawisataSection />
            </div>
            <div className='w-[90%] mx-auto my-10'>
                <h1 className='text-4xl font-bold text-center mb-8'>UMKM Ramiki</h1>
                <p className='text-lg text-center mb-6'>UMKM Ramiki adalah inisiatif lokal yang bertujuan untuk meningkatkan kesejahteraan masyarakat melalui berbagai produk kreatif dan inovatif.</p>
            <UmkmSection />
            <UmkmKerajinan />
            </div>

        </div>
    )
}
