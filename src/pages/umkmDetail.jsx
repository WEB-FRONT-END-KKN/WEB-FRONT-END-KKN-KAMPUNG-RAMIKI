import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight, FaWhatsapp, FaFacebook } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

// Helper function untuk mengambil gambar dari Google Drive sebagai URL blob
const getGoogleDriveImageAsBlobUrl = async (url) => {
    if (!url || typeof url !== 'string') return null;
    const fileIdMatch = url.match(/id=([^&]+)/);
    if (!fileIdMatch || !fileIdMatch[1]) return null;

    const fileId = fileIdMatch[1];
    const googleDriveUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=AIzaSyCcHVF-YTiEhhfZUDsN8o-95EqAuKSyM9E`;

    try {
        const response = await axios.get(googleDriveUrl, { responseType: 'blob' });
        return URL.createObjectURL(response.data);
    } catch (error) {
        console.error(`Gagal mengambil gambar dari Google Drive: ${url}`, error);
        return null;
    }
};

// Helper function untuk membuat slug
const createSlug = (sellerName, title) => {
    if (!sellerName || !title) return '';
    const sellerSlug = sellerName.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const titleSlug = title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return `${sellerSlug}<>${titleSlug}`;
};


export default function UmkmDetail() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [mainImage, setMainImage] = useState(0);

    useEffect(() => {
        const SPREADSHEET_ID = '12EGp8r-dF8FQujkSFip5HxlDazz1VJSfq8Uaki-zlqc';
        const API_KEY = 'AIzaSyCcHVF-YTiEhhfZUDsN8o-95EqAuKSyM9E';
        const spreadsheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Form Responses 1?key=${API_KEY}`;

        const fetchAndProcessData = async () => {
            try {
                const response = await axios.get(spreadsheetUrl);
                const rows = response.data.values.slice(1);

                let foundProductData = null;
                for (const row of rows) {
                    const [
                        , sellerName, sellerImageRaw, whatsapp, facebook,
                        title, description, category, imageRaw, imagesRaw
                    ] = row;
                    const productSlug = createSlug(sellerName, title);
                    if (productSlug === slug) {
                        foundProductData = {
                            sellerName, sellerImageRaw, whatsapp, facebook, title, description, category, imageRaw, imagesRaw, slug: productSlug
                        }
                        break;
                    }
                }

                if (foundProductData) {
                    setProduct({
                        ...foundProductData,
                        sellerImage: null,
                        images: [],
                    });

                    const sellerImagePromise = getGoogleDriveImageAsBlobUrl(foundProductData.sellerImageRaw);
                    const imagePromise = getGoogleDriveImageAsBlobUrl(foundProductData.imageRaw);
                    const galleryImagesPromises = foundProductData.imagesRaw
                        ? foundProductData.imagesRaw.split(',').map(url => getGoogleDriveImageAsBlobUrl(url.trim()))
                        : [];

                    const [sellerImage, mainImg, ...galleryImages] = await Promise.all([
                        sellerImagePromise,
                        imagePromise,
                        ...galleryImagesPromises
                    ]);

                    setProduct(prev => ({
                        ...prev,
                        sellerImage,
                        images: [mainImg, ...galleryImages.filter(img => img && img !== mainImg)].filter(Boolean)
                    }));

                } else {
                    setProduct(null);
                }

            } catch (err) {
                console.error("Gagal memuat atau memproses data:", err);
                setError("Gagal memuat data produk.");
            }
        };

        fetchAndProcessData();

        // Cleanup
        return () => {
            if (product) {
                if (product.sellerImage) URL.revokeObjectURL(product.sellerImage);
                if (product.images) {
                    product.images.forEach(img => {
                        if (img) URL.revokeObjectURL(img)
                    });
                }
            }
        };
    }, [slug]);

    if (error) {
        return <div className="text-center py-20 text-red-500">{error}</div>;
    }

    if (!product) {
        return <div className="text-center py-10">Memuat data produk...</div>;
    }

    const handleNext = () => {
        setMainImage((prev) => (prev + 1) % product.images.length);
    };

    const handlePrev = () => {
        setMainImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    return (
        <>
            <Helmet>
                <title>{product?.title ? `${product.title} | UMKM Kampung Ramiki` : "UMKM Detail | Kampung Ramiki"}</title>
                <meta name="description" content={product?.description?.slice(0, 150) || "Detail produk UMKM Kampung Ramiki"} />
                <meta name="keywords" content={`UMKM, Kampung Ramiki, ${product?.title || ""}, ${product?.sellerName || ""}`} />
                <meta property="og:title" content={product?.title || "UMKM Kampung Ramiki"} />
                <meta property="og:description" content={product?.description?.slice(0, 150) || "Detail produk UMKM Kampung Ramiki"} />
                <meta property="og:type" content="product" />
                <meta property="og:image" content={product?.images?.[0] || ""} />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Product",
                        "name": product?.title,
                        "image": product?.images?.[0] || "",
                        "description": product?.description?.slice(0, 150) || "",
                        "brand": "UMKM Kampung Ramiki",
                        "seller": {
                            "@type": "Person",
                            "name": product?.sellerName
                        }
                    })}
                </script>
            </Helmet>
            <div className="container mx-auto py-10 px-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Galeri Gambar */}
                    <div className="w-full lg:w-2/3">
                        <div className="relative mb-4">
                            <div className="w-full h-96 flex justify-center items-center bg-gray-200 rounded-lg shadow-lg">
                                {!product.images || product.images.length === 0 ? (
                                    <span className="loading loading-infinity loading-lg"></span>
                                ) : (
                                    <img src={product.images[mainImage]} alt={product.title} className="w-full h-full object-cover rounded-lg" />
                                )}
                            </div>
                            {product.images && product.images.length > 1 && (
                                <>
                                    <button onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white">
                                        <FaChevronLeft size={24} />
                                    </button>
                                    <button onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white">
                                        <FaChevronRight size={24} />
                                    </button>
                                </>
                            )}
                        </div>
                        <div className="flex gap-2 justify-center flex-wrap">
                            {product.images.map((img, idx) => (
                                img && <img
                                    key={idx}
                                    src={img}
                                    alt={`thumb-${idx}`}
                                    className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${mainImage === idx ? 'border-blue-500' : 'border-transparent'}`}
                                    onClick={() => setMainImage(idx)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Deskripsi dan Info Penjual */}
                    <div className="w-full lg:w-1/3">
                        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                        {product.category && (
                            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">{product.category}</span>
                        )}
                        <p className="text-gray-700 my-6">{product.description}</p>

                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <div className="flex items-center mb-4">
                                <div className="w-16 h-16 rounded-full flex justify-center items-center bg-gray-300 border-2 border-green-500">
                                    {!product.sellerImage ? (
                                        <span className="loading loading-ring loading-md"></span>
                                    ) : (
                                        <img src={product.sellerImage} alt={product.sellerName} className="w-full h-full rounded-full object-cover" />
                                    )}
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-xl font-semibold">{product.sellerName}</h3>
                                    <p className="text-gray-600">Penjual</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <a href={`https://wa.me/${product.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition">
                                    <FaWhatsapp size={20} />
                                    <span>Hubungi via WhatsApp</span>
                                </a>
                                {product.facebook && (
                                    <a href={product.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
                                        <FaFacebook size={20} />
                                        <span>Lihat di Facebook</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}