import React from 'react'
import { ParawisataSection, UmkmSection, UmkmKerajinan } from '../components'
export default function Potensi() {
    return (
        <div>
            <div id='container' className='w-[80%] mx-auto my-10'>
                <ParawisataSection />
            </div>
            <div className='w-[90%] mx-auto my-10'>
                <UmkmSection />
            </div>

        </div>
    )
}
