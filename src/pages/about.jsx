import React from 'react'
import { Helmet } from 'react-helmet'
import { AboutBanner, UmkmSection, DescriptionAbout, TeamKKN } from '../components'

export default function about() {
    return (
        <div>
            <Helmet>
                <title>Tentang Kampung Ramiki | UMKM & Koperasi</title>
                <meta name="description" content="Halaman tentang KKN Kampung Ramiki, profil tim, tujuan, dan pengembangan UMKM serta koperasi di Teluk Wondama Papua Barat." />
                <meta name="keywords" content="KKN, Kampung Ramiki, UMKM, Koperasi, Teluk Wondama, Papua Barat, Tim KKN, Tentang Kami" />
                <meta property="og:title" content="Tentang KKN Kampung Ramiki" />
                <meta property="og:description" content="Profil KKN Kampung Ramiki, tim, tujuan, dan pengembangan UMKM serta koperasi di Teluk Wondama Papua Barat." />
                <meta property="og:type" content="website" />
            </Helmet>
            <AboutBanner />
            <DescriptionAbout />
            <UmkmSection />
            {/* <TeamKKN /> */}
        </div>
    )
}
