import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Autoplay,
  FreeMode,
  Navigation,
  Thumbs,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { cleanHTML } from "../../utils/cleanHtml";
import { Link } from "react-router-dom";

export function CarouselSimple({ section }) {
  const swiperRef = useRef(null);
  const [showNav, setShowNav] = useState(false);

  // Vérifie si on doit afficher les flèches
  useEffect(() => {
    const handleResize = () => {
      if (!swiperRef.current) return;

      const width = window.innerWidth;
      let slidesPerView = 1;
      if (width >= 1024) slidesPerView = 3;
      else if (width >= 640) slidesPerView = 2;

      setShowNav(section.subsections.length > slidesPerView);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [section.subsections.length]);

  return (
    <section
      id="references"
      className="min-h-screen py-20 bg-background px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Titre + Sous-titre */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            {section.title}
          </h1>
          {section.subtitle && (
            <p className="mt-3 text-gray-600 text-lg">{section.subtitle}</p>
          )}
        </div>

        <Swiper
          ref={swiperRef}
          style={{
            "--swiper-navigation-color": "#145c81",
            "--swiper-pagination-color": "#145c81",
          }}
          modules={[Pagination, Autoplay, Navigation]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          navigation={showNav}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="partner-carousel pb-14"
        >
          {section.subsections.map((item, index) => {
            const imageUrl = item.image
              ? `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${item.image}`
              : null;

            return (
              <SwiperSlide key={index}>
                <div className="border rounded-lg hover:shadow-lg overflow-hidden flex flex-col  justify-center transition-all duration-300 bg-white min-h-[300px]">
                  {/* Image avec fallback */}
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={item.title}
                      className="w-full h-48 object-contain"
                    />
                  ) : (
                    <div className="w-full flex-1 bg-gray-100 flex items-center justify-center text-gray-400">
                      <i className="fa fa-image text-4xl"></i>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}

export function CarouselProduits({ section }) {
  const swiperRef = useRef(null);
  const [showNav, setShowNav] = useState(false);

  // Vérifie si on doit afficher les flèches
  useEffect(() => {
    const handleResize = () => {
      if (!swiperRef.current) return;

      const width = window.innerWidth;
      let slidesPerView = 1;

      if (width >= 1024) {
        slidesPerView = 3;
      } else if (width >= 640) {
        slidesPerView = 2;
      }

      // Masquer les flèches si écran < 640px (mobile)
      if (width < 640) {
        setShowNav(false);
      } else {
        setShowNav(section.subsections.length > slidesPerView);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [section.subsections.length]);

  return (
    <section className="min-h-screen py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto w-full">
        {/* Titre + Sous-titre */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            {section.title}
          </h1>
          {section.subtitle && (
            <p className="mt-3 text-gray-600 text-lg">{section.subtitle}</p>
          )}
        </div>

        <Swiper
          ref={swiperRef}
          modules={[Pagination, Autoplay, Navigation]}
          style={{
            "--swiper-navigation-color": "#145c81",
            "--swiper-pagination-color": "#145c81",
          }}
          pagination={{ clickable: true }}
          navigation={showNav}
          autoplay={{ delay: 3000 }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="partner-carousel pb-14"
        >
          {section.subsections.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full min-h-[710px] border-2 border-gray-600 rounded-3xl hover:shadow-lg overflow-hidden flex flex-col transition-all duration-300 bg-white">
                {/* Image */}
                {item.image ? (
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${item.image}`}
                    alt={item.title}
                    className="w-full h-56 object-contain"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-100 flex items-center justify-center text-gray-400">
                    <i className="fa fa-image text-4xl"></i>
                  </div>
                )}

                {/* Contenu */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-semibold text-primary">
                      {item.title}
                    </h3>
                    <div
                      className="text-gray-600 mt-2 text-sm text-justify"
                      dangerouslySetInnerHTML={{
                        __html: cleanHTML(item.content),
                      }}
                    />
                  </div>

                  <div className="mt-6 flex gap-3">
                    {item.button_text && item.button_link && (
                      <a
                        href={item.button_link}
                        className="rounded-xl bg-primary text-white px-3 py-2 text-xs font-medium hover:opacity-70 transition"
                      >
                        {item.button_text}
                      </a>
                    )}
                    <Link
                      to="/prendre-rdv"
                      className="rounded-xl border border-yellowCustom text-primary px-3 py-2 text-xs font-medium hover:bg-primary hover:border-primary hover:text-white transition"
                    >
                      Obtenir un devis
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export function CarouselYTB({ section }) {
  const extractYoutubeUrl = (html) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
    const match = html?.match(regex);
    return match ? `https://www.youtube.com/watch?v=${match[1]}` : null;
  };

  const getYoutubeThumbnail = (url) => {
    const match = url.match(/(?:v=|youtu\.be\/)([\w-]+)/);
    return match
      ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
      : null;
  };

  return (
    <div className="w-full py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-screen-xl mx-auto">
        {section.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-orange-400 mb-8 text-center">
            {section.title}
          </h2>
        )}

        <Swiper
          modules={[Pagination, Autoplay]}
          speed={600}
          loop={true}
          spaceBetween={30}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          grabCursor={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="swiper min-h-[320px] partner-carousel"
        >
          {section.subsections.map((sub) => {
            const youtubeUrl = extractYoutubeUrl(sub.content);
            const thumbnail = youtubeUrl
              ? getYoutubeThumbnail(youtubeUrl)
              : null;

            return (
              <SwiperSlide
                key={sub.id}
                className="hover:-translate-y-1 transition-all duration-300"
              >
                <div className="bg-white rounded-xl shadow-md flex flex-col h-[280px] overflow-hidden relative">
                  <div className="h-full w-full overflow-hidden">
                    {thumbnail ? (
                      <a
                        href={youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={thumbnail}
                          alt={sub.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 bg-white bg-opacity-80 rounded-full flex items-center justify-center shadow-md">
                            <i className="fas fa-play text-orange-600 text-xl ml-1"></i>
                          </div>
                        </div>
                      </a>
                    ) : sub.image ? (
                      <div
                        className={`w-full h-full bg-gray-100 flex items-center justify-center text-orange-400 mb-3`}
                      >
                        <i className="fas fa-image fa-lg"></i>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-orange-100 flex items-center justify-center text-orange-400">
                        <i className="fas fa-image fa-lg"></i>
                      </div>
                    )}
                  </div>
                  <div className="p-3 text-center">
                    <h5 className="text-md font-semibold text-orange-500">
                      {sub.title}
                    </h5>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="swiper-pagination mt-6"></div>
      </div>
    </div>
  );
}

const CarouselDetails = ({ section }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const imageBaseUrl = process.env.REACT_APP_API_BASE_URL_STORAGE;

  if (!section?.subsections?.length) return null;

  return (
    <section className="px-6 md:px-12 py-20 bg-black text-white">
      {/* Titre principal */}
      <div className="mb-12 text-center">
        <h2 className="font-bold">{section.title}</h2>
        {section.subtitle && <h3 className="mt-2">{section.subtitle}</h3>}
      </div>

      {/* Main Swiper (Images) */}
      <Swiper
        style={{
          "--swiper-navigation-color": "#74BB43",
          "--swiper-pagination-color": "#74BB43",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 mb-6 rounded overflow-hidden"
      >
        {section.subsections.map((item) => (
          <SwiperSlide key={item.id}>
            <img
              src={`${imageBaseUrl}/${item.image}`}
              alt={item.title || "Image"}
              className="h-[400px] object-contain mx-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      <div className="max-h-30 overflow-hidden">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {section.subsections.map((item) => (
            <SwiperSlide key={item.id}>
              <img
                src={`${imageBaseUrl}/${item.image}`}
                alt={item.title || "Thumbnail"}
                className="cursor-pointer w-full h-16 md:h-20 object-contain rounded"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CarouselDetails;
