import React, { useEffect, useState, useMemo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { cleanHTML } from "../../utils/cleanHtml";
import { formatDateRelative } from "../../utils/formatDateRelative";
import decoJaune from "../../assets/img/decoJaune.png";

export const GridColumns = ({ section }) => (
  <section className="py-20 bg-gradient-to-b from-white to-gray-100 px-6 md:px-12">
    <div className="max-w-6xl mx-auto text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
        {section.title}
      </h2>
      {section.subtitle && (
        <p className="mt-3 text-gray-600 text-lg">{section.subtitle}</p>
      )}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {section.subsections.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-1 transition-all duration-300"
        >
          {item.image && (
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${item.image}`}
                alt={item.title}
                className="h-10 w-10"
              />
            </div>
          )}
          <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
          <div
            className="text-gray-600 mt-3 text-justify"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </div>
      ))}
    </div>
  </section>
);

export const GridIcons = ({ section }) => (
  <section className="py-16 px-6 md:px-12 bg-white text-gray-800">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* ➕ Gauche : Infos de la section */}
      <div>
        {section.title && (
          <p className="text-lg text-gray-600 mb-2">{section.title}</p>
        )}
        {section.subtitle && (
          <h1 className="font-bold mb-4">{section.subtitle}</h1>
        )}
        {section.content && (
          <div
            className="text-gray-700 mb-6 leading-relaxed text-justify"
            dangerouslySetInnerHTML={{ __html: section.content }}
          />
        )}
        {/* {section.image && (
          <img
            src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image}`}
            alt={section.title}
            className="mb-6 w-full h-80 object-contain rounded shadow"
          />
        )} */}
        {section.button_text && section.button_link && (
          <a
            href={section.button_link}
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded font-semibold transition"
          >
            {section.button_text}
          </a>
        )}
      </div>

      {/* ➕ Droite : Cartes des sous-sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {section.subsections.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden shadow pt-5 flex flex-col"
          >
            {/* Icône ou image */}
            <span className="px-4 rounded-full overflow-hidden w-fit text-green-600 text-xl">
              {item.icon ? (
                <i className={`${item.icon}`} />
              ) : (
                <i className="fas fa-circle-question" />
              )}
            </span>

            <div className="p-4">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              {item.subtitle && (
                <p className="text-sm text-gray-500">{item.subtitle}</p>
              )}
              {item.content && (
                <div
                  className="text-gray-600 mt-2 text-sm"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              )}

              {item.button_text && item.button_link && (
                <a
                  href={item.button_link}
                  className="inline-block mt-4 text-orange-600 hover:underline text-sm"
                >
                  {item.button_text}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const GridCards = ({ section }) => (
  <section id="nos-services" className="py-20 px-6 md:px-12 w-full">
    <div className="max-w-7xl mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mt-3">
          {section.title}
        </h2>
        {section.subtitle && <p className="montserrat">{section.subtitle}</p>}
      </div>

      <div className="flex flex-wrap justify-center gap-6 mx-auto">
        {section.subsections.map((item, index) => (
          <div
            key={index}
            className="w-full md:w-[48%] lg:w-[40%] border rounded-xl hover:shadow-lg overflow-hidden flex flex-col transition-all duration-300 bg-white"
          >
            <div className="p-4">
              <h3 className="text-3xl font-bold text-center">{item.title}</h3>
              {item.image ? (
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${item.image}`}
                  alt={item.title}
                  className="w-full h-56 rounded-xl object-contain"
                />
              ) : (
                <div className="w-full h-56 rounded-xl bg-slate-500 flex items-center justify-center text-gray-400">
                  <i className="fa fa-image text-4xl"></i>
                </div>
              )}
            </div>

            <div className="px-6 pb-6 flex flex-col justify-between flex-1">
              <div>
                <div
                  className={`my-4 text-justify`}
                  dangerouslySetInnerHTML={{
                    __html: cleanHTML(item.content, "Montserrat"),
                  }}
                />
                {item.button_text && item.button_link && (
                  <a
                    href={item.button_link}
                    className="rounded-full px-4 bg-yellowCustom text-white px-3 py-2 font-medium hover:opacity-70 transition"
                  >
                    {item.button_text}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const GridBlogCards = ({ section }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const produitsPerPage = 6;
  const LINK = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const sectionRef = useRef(null);

  const isBlogPage = location.pathname === "/blog";

  useEffect(() => {
    setLoading(true);
    fetch(`${LINK}/api/blogs-public`)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement articles:", err);
        setLoading(false);
      });
  }, [LINK]);

  // 🔹 Pagination
  const totalPages = Math.ceil(articles.length / produitsPerPage);

  const currentArticles = useMemo(() => {
    if (!isBlogPage) return articles.slice(0, 3);
    const startIndex = (currentPage - 1) * produitsPerPage;
    return articles.slice(startIndex, startIndex + produitsPerPage);
  }, [articles, currentPage, isBlogPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);

      // 🔹 Scroll vers la section au lieu de toute la page
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="nos-services"
      className="py-20 px-6 md:px-12 w-full scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mt-3">
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="montserrat text-gray-400">{section.subtitle}</p>
          )}
        </div>

        {/* 🦴 Skeleton loader */}
        {loading ? (
          <div className="flex flex-wrap justify-center gap-6 mx-auto animate-pulse">
            {Array.from({ length: isBlogPage ? 6 : 3 }).map((_, i) => (
              <div
                key={i}
                className="w-full md:w-[48%] xl:w-[30%] border rounded-xl bg-white overflow-hidden"
              >
                <div className="p-4">
                  <div className="w-full h-56 rounded-xl bg-gray-200"></div>
                </div>
                <div className="px-6 pb-6">
                  <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
                  <div className="h-6 bg-gray-200 w-1/3 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* CARTES */}
            <div className="flex flex-wrap justify-center gap-6 mx-auto">
              {currentArticles.map((item, index) => (
                <div
                  key={index}
                  className="w-full md:w-[48%] xl:w-[30%] max-w-[400px] border rounded-xl hover:shadow-lg overflow-hidden flex flex-col transition-all duration-300 bg-white"
                >
                  <div className="p-4">
                    {item.image ? (
                      <img
                        src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${item.image}`}
                        alt={item.title}
                        className="w-full h-56 rounded-xl object-contain"
                      />
                    ) : (
                      <div className="w-full h-56 rounded-xl bg-slate-500 flex items-center justify-center text-gray-400">
                        <i className="fa fa-image text-4xl"></i>
                      </div>
                    )}
                  </div>

                  <div className="px-6 pb-6 flex flex-col flex-1">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold">{item.title}</h3>
                      <p className="montserrat text-gray-400 text-sm">
                        {formatDateRelative(item.created_at)}
                      </p>
                    </div>
                    <div className="flex flex-col justify-between h-full">
                      <div
                        className="my-4 text-justify montserrat"
                        dangerouslySetInnerHTML={{
                          __html:
                            cleanHTML(item.content, "Montserrat").slice(
                              0,
                              100
                            ) + "...",
                        }}
                      />
                      <Link
                        to={`/subsection/${item.id}`}
                        state={{ type: "blog" }}
                        className="montserrat text-yellow-500 font-bold hover:underline text-xs w-fit mt-2 inline-block p-2 border border-yellow-500 bg-yellow-50 rounded 
     hover:bg-yellow-500 hover:text-white hover:border-yellow-500 transition duration-300"
                      >
                        Lire plus →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 🔸 Bouton ou pagination selon la page */}
            {isBlogPage ? (
              <nav className="mt-10 flex justify-center">
                <ul className="flex items-center gap-1">
                  {/* Précédent */}
                  <li>
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`montserrat px-3 py-1 rounded border text-sm ${
                        currentPage === 1
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Précédent
                    </button>
                  </li>

                  {/* Pages dynamiques */}
                  {[...Array(totalPages).keys()]
                    .map((_, i) => i + 1)
                    .filter(
                      (p) =>
                        p === 1 ||
                        p === totalPages ||
                        (p >= currentPage - 1 && p <= currentPage + 1)
                    )
                    .map((p, i, pages) => (
                      <React.Fragment key={p}>
                        {i > 0 && p !== pages[i - 1] + 1 && (
                          <li>
                            <span className="montserrat px-3 py-1 text-gray-500">
                              ...
                            </span>
                          </li>
                        )}
                        <li>
                          <button
                            onClick={() => handlePageChange(p)}
                            className={`montserrat px-3 py-1 rounded border text-sm ${
                              currentPage === p
                                ? "bg-yellow-500 text-white font-bold"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {p}
                          </button>
                        </li>
                      </React.Fragment>
                    ))}

                  {/* Suivant */}
                  <li>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`montserrat px-3 py-1 rounded border text-sm ${
                        currentPage === totalPages
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Suivant
                    </button>
                  </li>
                </ul>
              </nav>
            ) : (
              <div className="w-full flex justify-center">
                <Link
                  to="/blog"
                  className="text-2xl text-yellow-500 font-bold hover:underline mt-5 inline-block p-2 border border-yellow-500 bg-yellow-50 rounded 
                 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 transition duration-300"
                >
                  Voir tous les articles →
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export const GridImages = ({ section }) => (
  <section className="py-20 bg-slate-100 px-6 md:px-12 w-full">
    <div className="max-w-7xl mx-auto">
      {/* Header section */}
      <div className="max-w-2xl mx-auto mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-primary">
          {section.title}
        </h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
        {section.subsections.map((item, index) => (
          <div
            key={index}
            className="relative rounded-xl overflow-hidden group h-72 flex items-end justify-center"
            style={{
              backgroundImage: item.image
                ? `url(${process.env.REACT_APP_API_BASE_URL_STORAGE}/${item.image})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Fallback si pas d'image */}
            {!item.image && (
              <div className="absolute inset-0 bg-slate-500 flex items-center justify-center text-gray-300 text-4xl">
                <i className="fa fa-image"></i>
              </div>
            )}

            {/* Backdrop */}
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition"></div>

            {/* Texte en bas */}
            <div className="relative z-10 p-6 text-center text-white w-full">
              {item.subtitle && (
                <p className="text-sm mb-1 opacity-90">{item.subtitle}</p>
              )}
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              {item.button_text && item.button_link && (
                <a
                  href={item.button_link}
                  className="inline-block rounded-full bg-yellowCustom text-white px-4 py-2 font-medium hover:opacity-80 transition"
                >
                  {item.button_text}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const GridCardsExpertise = ({ section }) => {
  return (
    <section id="services" className="px-6 md:px-12 ">
      <div className="bg-[#FF910217] max-w-7xl mx-auto w-full p-5 rounded-2xl">
        {/* Titre et sous-titre */}
        <div className="mb-10 text-center">
          <p className="montserrat mt-3 text-yellow-500 text-sm font-bold">
            {section.title}
          </p>
          {section.subtitle && (
            <h1 className="text-3xl md:text-4xl font-bold">
              {section.subtitle}
            </h1>
          )}
        </div>

        {/* Grid de cartes */}
        <div className="flex flex-wrap justify-center gap-6 mb-4 mx-auto">
          {section.subsections.map((item, index) => (
            <div
              key={index}
              className="w-full md:w-[48%] xl:w-[30%] max-w-[350px] rounded-3xl bg-white border border-yellow-500/50 border-2 p-4 hover:shadow-lg overflow-hidden flex flex-col transition-all duration-300"
            >
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="text-center">
                    <h3 className="montserrat text-3xl font-bold text-orange-500">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <h1 className="text-lg md:text-xl font-bold">
                        {item.subtitle}
                      </h1>
                    )}
                  </div>
                  <div
                    className="text-gray-600 mt-2 text-sm text-justify"
                    dangerouslySetInnerHTML={{
                      __html: cleanHTML(item.content, "Montserrat"),
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export function GridWithoutTitle({ section }) {
  return (
    <section id="produits" className="py-20 px-6 md:px-12">
      {/* Titre + Sous-titre */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold text-primary">
          {section.title}
        </h1>
        {section.subtitle && (
          <p className="mt-3 text-gray-600 text-lg">{section.subtitle}</p>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {(section.subsections || []).map((item, i) => (
          <Link
            key={i}
            to={item.button_link || "/"}
            className="relative rounded-xl overflow-hidden shadow-lg w-full md:w-[48%] lg:w-[22%] h-[370px] m-h-[360px] aspect-[3/4] flex items-center justify-center text-center bg-primary text-white hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex flex-col items-center justify-center p-6">
              {item.image && (
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${item.image}`}
                  alt={item.title}
                  className="w-48 h-48 mb-4 object-contain"
                />
              )}
              <h3 className="text-lg font-bold mb-1 uppercase">GAMME</h3>
              <h1 className="text-3xl font-bold mb-1 uppercase">
                {item.title}
              </h1>
              {item.subtitle && (
                <p className="text-sm opacity-80">{item.subtitle}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export const GridRows = ({ section }) => {
  if (!section?.subsections?.length) return null;

  return (
    <section
      id="downloads"
      className="min-h-screen py-20 bg-white relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          {section.title}
        </h1>{" "}
        <ul className="mt-6 grid md:grid-cols-2 gap-4 text-sm">
          {section.subsections.map((item, index) => (
            <li
              key={index}
              className="rounded-2xl border border-2 border-slate-600 p-4 flex items-center justify-between"
            >
              <span>{item.title}</span>
              {item.button_text && item.button_link && (
                <a
                  href={item.button_link}
                  target="_blank"
                  rel="noreferrer"
                  className="underline-force underline-offset-4"
                  onClick={() =>
                    window.gtag &&
                    window.gtag("event", "download_fiche", {
                      label: item.title,
                    })
                  }
                >
                  {item.button_text}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute top-0 right-0 h-full w-auto pointer-events-none flex flex-col">
        {Array.from({ length: 4 }).map((_, i) => (
          <img
            key={i}
            src={decoJaune}
            alt="decor"
            className="opacity-50 w-auto h-[200px] object-contain"
            style={{
              filter: "hue-rotate(180deg) saturate(200%) brightness(0.8)", // recoloration bleu
            }}
          />
        ))}
      </div>
    </section>
  );
};

export const GridThreeIcon = ({ section }) => {
  return (
    <section className="py-20 bg-white px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {section.subsections.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 border rounded-xl shadow-sm hover:shadow-lg transition"
          >
            {item.icon && (
              <div className="text-4xl text-orange-600 mb-4">
                <i className={item.icon}></i>
              </div>
            )}
            <h3 className="text-xl font-semibold text-gray-800">
              {item.title}
            </h3>
            {item.subtitle && (
              <p className="text-sm text-gray-500 mt-1">{item.subtitle}</p>
            )}
            {item.content && (
              <div
                className="mt-2 text-gray-600 text-sm"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export function CategoryGrid({ section }) {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const LINK = process.env.REACT_APP_API_URL;

  useEffect(() => {
    setLoading(true);
    fetch(`${LINK}/api/menus-public`)
      .then((res) => res.json())
      .then((data) => {
        setMenus(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement menus:", err);
        setLoading(false);
      });
  }, [LINK]);

  // On regroupe les menus par type (clé = nom du type)
  const menusParType = useMemo(() => {
    const map = {};

    menus.forEach((menu) => {
      const type = menu.type;
      if (!type) return;

      if (!map[type]) {
        map[type] = [];
      }

      map[type].push(menu);
    });

    return map;
  }, [menus]);

  // On limite à 4 types max pour l'affichage
  const typesAffiches = useMemo(() => {
    return Object.keys(menusParType)
      .slice(0, 4)
      .map((type) => ({
        type: type,
        menus: menusParType[type],
      }));
  }, [menusParType]);

  return (
    <section id="menus" className="py-20 px-6 md:px-24">
      <div className="max-w-6xl mx-auto mb-14">
        <h2 className="text-3xl md:text-4xl font-semibold text-primary">
          {section.title}
        </h2>
        {section.subtitle && (
          <p className="mt-3 text-gray-600 text-lg">{section.subtitle}</p>
        )}
      </div>

      {loading ? (
        // ✅ SKELETON
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto animate-pulse">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-2xl p-8 shadow-md flex flex-col justify-between min-h-[200px]"
            >
              {/* Skeleton Header */}
              <div className="flex items-center justify-center mb-4 gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              </div>

              {/* Skeleton Produits */}
              <ul className="mt-4 space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <li key={i} className="h-3 w-3/4 bg-gray-300 rounded"></li>
                ))}
              </ul>

              {/* Skeleton bouton */}
              <div className="mt-6 w-1/2 mx-auto h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {typesAffiches.map((cat, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-2xl shadow-lg p-8 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[100px]"
            >
              {/* HEADER */}
              <div className="">
                <h3 className="text-xl font-semibold text-gray-800">
                  {cat.type}
                </h3>
              </div>

              <ul className="text-left mt-2 text-gray-700">
                {cat.menus.slice(0, 5).map((menu) => (
                  <>
                    <li
                      key={menu.id}
                      className="mb-1 capitalize flex justify-between text-gray-800"
                    >
                      <p className="break-words max-w-[70%]">
                        •&nbsp;{menu.titre}
                      </p>
                      {menu.prix && (
                        <p className="shrink-0">{menu.prix} FCFA</p>
                      )}
                    </li>

                    <p className="text-sm text-gray-500 mb-3">
                      {menu.description}
                    </p>
                  </>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export function GalerieGrid({ section }) {
  const [galeries, setGaleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const LINK = process.env.REACT_APP_API_URL;
  const STORAGE = process.env.REACT_APP_API_BASE_URL_STORAGE;
  const perPage = 4;

  useEffect(() => {
    setLoading(true);
    fetch(`${LINK}/api/galeries-public`)
      .then((res) => res.json())
      .then((data) => {
        setGaleries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement galeries:", err);
        setLoading(false);
      });
  }, [LINK]);

  // ✅ Regroupement par catégorie
  const galeriesParCategorie = useMemo(() => {
    const map = {};
    galeries.forEach((img) => {
      const cat = img.categorie || "Autres";
      if (!map[cat]) map[cat] = [];
      map[cat].push(img);
    });
    return map;
  }, [galeries]);

  const categories = Object.keys(galeriesParCategorie);
  const totalPages = Math.ceil(categories.length / perPage);

  const paginatedCategories = categories
    .slice((page - 1) * perPage, page * perPage)
    .map((cat) => ({
      categorie: cat,
      images: galeriesParCategorie[cat],
    }));

  return (
    <div id="galerie" className="container mx-auto py-20">
      <div className="max-w-6xl mx-auto mb-14 px-6 xl:px-0 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-primary">
          {section.title}
        </h2>
        {section.subtitle && (
          <p className="mt-3 text-gray-600 text-lg">{section.subtitle}</p>
        )}
      </div>

      {loading ? (
        // ✅ Skeleton
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 animate-pulse">
          {Array.from({ length: galeriesParCategorie.length }).map(
            (_, index) => (
              <div
                key={index}
                className="rounded-2xl bg-gray-200 h-[250px]"
              ></div>
            )
          )}
        </div>
      ) : (
        <>
          {/* ✅ Cartes Catégories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
            {paginatedCategories.map(({ categorie, images }, idx) => {
              const cover = images[0];
              const previews = images.slice(1, 4);

              return (
                <div
                  key={idx}
                  className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer h-[250px] md:h-[350px] flex items-end justify-between"
                  onClick={() => setSelectedCategory({ categorie, images })}
                >
                  {/* ✅ Image principale ou fallback */}
                  {cover?.image ? (
                    <img
                      src={`${STORAGE}/${cover.image}`}
                      alt={categorie}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-slate-500 flex items-center justify-center text-gray-300">
                      <i className="fa fa-image text-5xl"></i>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300"></div>

                  {/* ✅ Infos Catégorie */}
                  <div className="relative z-10 text-white p-6 flex justify-between w-full">
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold">
                        {categorie}
                      </h3>
                      <p className="montserrat text-xs text-gray-200">
                        {images.length} image{images.length > 1 ? "s" : ""}
                      </p>
                    </div>

                    <div className="flex space-x-3">
                      {previews.length > 0 ? (
                        previews.map((img, i) =>
                          img.image ? (
                            <img
                              key={i}
                              src={`${STORAGE}/${img.image}`}
                              alt={img.titre}
                              className="w-12 h-12 rounded-xl border-2 border-white object-cover shadow"
                              onError={(e) =>
                                (e.currentTarget.style.display = "none")
                              }
                            />
                          ) : (
                            <div
                              key={i}
                              className="w-12 h-12 rounded-xl bg-slate-500 flex items-center justify-center text-gray-300 border-2 border-white shadow"
                            >
                              <i className="fa fa-image text-xs"></i>
                            </div>
                          )
                        )
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-slate-500 flex items-center justify-center text-gray-300 border-2 border-white shadow">
                          <i className="fa fa-image text-xs"></i>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ✅ Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 gap-3">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`montserrat px-4 py-2 rounded-full border transition ${
                    page === i + 1
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* ✅ MODAL CATÉGORIE */}
      {selectedCategory && (
        <div
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-[999]"
          onClick={() => setSelectedCategory(null)}
        >
          <div
            className="bg-white rounded-lg max-w-5xl w-[90%] max-h-[90vh] relative p-4 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton de fermeture */}
            <button
              onClick={() => setSelectedCategory(null)}
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full h-10 w-10 font-bold shadow opacity-70 hover:opacity-100 transition"
            >
              ✕
            </button>

            {/* Titre */}
            <h3 className="text-2xl font-bold mb-6 text-center">
              {selectedCategory.categorie}
            </h3>

            {/* ✅ Grille d'images scrollable uniquement */}
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 overflow-y-auto pr-2"
              style={{ maxHeight: "65vh" }}
            >
              {selectedCategory.images.map((img, i) => (
                <div
                  key={i}
                  className="aspect-square cursor-pointer hover:opacity-80 transition"
                  onClick={() => setSelectedImage(img)}
                >
                  {img.image ? (
                    <img
                      src={`${STORAGE}/${img.image}`}
                      alt={img.titre}
                      className="w-full h-full object-cover rounded"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-500 rounded text-gray-300">
                      <i className="fa fa-image text-2xl"></i>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ✅ MODAL IMAGE */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-[1000] flex justify-center items-center"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="montserrat absolute top-6 left-6 bg-white/90 text-black rounded-full h-12 w-12 shadow-md opacity-70 hover:opacity-100 transition"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <i className="fa fa-arrow-left text-xl"></i>
          </button>
          {selectedImage.image ? (
            <img
              src={`${STORAGE}/${selectedImage.image}`}
              alt={selectedImage.titre}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          ) : (
            <div className="w-80 h-80 bg-slate-500 rounded flex items-center justify-center text-gray-300">
              <i className="fa fa-image text-5xl"></i>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
