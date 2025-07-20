import React from 'react';
import { Helmet } from 'react-helmet';
import { HomeBanner, Location, Description, DescriptionMobile } from '../components';

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Kampung Ramiki | UMKM, Koperasi & Potensi Lokal</title>
        <meta name="description" content="Beranda Kampung Ramiki, Teluk Wondama Papua Barat. Temukan info UMKM, koperasi, potensi lokal, lokasi, dan kegiatan KKN di Ramiki." />
        <meta name="keywords" content="Kampung Ramiki, UMKM, Koperasi, Teluk Wondama, Papua Barat, Potensi Lokal, KKN, Beranda" />
        <meta property="og:title" content="Kampung Ramiki | UMKM, Koperasi & Potensi Lokal" />
        <meta property="og:description" content="Beranda Kampung Ramiki, Teluk Wondama Papua Barat. Temukan info UMKM, koperasi, potensi lokal, lokasi, dan kegiatan KKN di Ramiki." />
        <meta property="og:type" content="website" />
      </Helmet>
      <HomeBanner />
      <div id='description' className="hidden lg:block">
        <Description />
      </div>
      <div id='description' className="block lg:hidden">
        <DescriptionMobile />
      </div>
      <Location />
    </div>
  );
}