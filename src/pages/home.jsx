import React,{useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { HomeBanner, Location, Description, DescriptionMobile } from '../components';

export default function Home() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  
      useEffect(() => {
          const handleResize = () => setIsMobile(window.innerWidth < 640);
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
      }, []);

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
      <div id='description'>
        {isMobile ? <DescriptionMobile /> : <Description />}
      </div>
      <Location />
    </div>
  );
}