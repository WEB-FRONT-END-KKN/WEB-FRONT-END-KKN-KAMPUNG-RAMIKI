import React from 'react'
import { ParawisataSection, UmkmSection, UmkmKerajinan } from '../components'
import { Helmet } from 'react-helmet'

export default function Potensi() {
    return (
        <div>
            <Helmet>
                <title>Potensi Kampung Ramiki | Wisata, UMKM & Kerajinan</title>
                <meta name="description" content="Jelajahi potensi Kampung Ramiki, Teluk Wondama Papua Barat. Temukan wisata alam, produk UMKM, dan kerajinan khas Ramiki." />
                <meta name="keywords" content="Potensi Kampung Ramiki, Wisata, UMKM, Kerajinan, Teluk Wondama, Papua Barat" />
                <meta property="og:title" content="Potensi Kampung Ramiki" />
                <meta property="og:description" content="Jelajahi potensi Kampung Ramiki, Teluk Wondama Papua Barat. Temukan wisata alam, produk UMKM, dan kerajinan khas Ramiki." />
                <meta property="og:type" content="website" />
            </Helmet>
            <div id='container' className='w-[80%] mx-auto my-10'>
                <ParawisataSection />
            </div>
            <div className='w-[90%] mx-auto my-10'>
                <UmkmSection />
            </div>

        </div>
    )
}
