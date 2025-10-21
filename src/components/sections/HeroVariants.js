import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cleanHTML } from "../../utils/cleanHtml";
import { formatWhatsappLink } from "../../utils/phone";
// -----------

export function HeroDefault({ section }) {
  const [zones, setZones] = useState([]);
  const LINK = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${LINK}/api/zones-public`)
      .then((res) => res.json())
      .then((data) => setZones(data))
      .catch((err) => console.error("Erreur chargement zones :", err));
  }, [LINK]);

  return (
    <section
      id="zones"
      className="relative bg-white flex items-center px-6 md:px-12 overflow-hidden"
    >
      <div className="p-6 max-w-7xl mx-auto w-full">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            {section.title}
          </h1>
          {section.subtitle && (
            <p className="mt-3 text-gray-600 text-sm">{section.subtitle}</p>
          )}
        </div>

        {/* Tableau dynamique */}
        <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 text-black">
          <table className="w-full text-sm">
            <caption className="sr-only">
              Zones, équipes et délais d’intervention
            </caption>
            <thead className="bg-yellowCustom text-white">
              <tr>
                <th scope="col" className="pl-10 text-left">
                  Ville / Département
                </th>
                <th scope="col" className="p-3 text-left">
                  Pays
                </th>
                <th scope="col" className="p-3 text-left">
                  Techniciens
                </th>
                <th scope="col" className="p-3 text-left">
                  Délai moyen
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-primary text-white">
              {zones.length > 0 ? (
                zones.map((pos) => (
                  <tr key={pos.id}>
                    <td className="pl-10">{pos.ville}</td>
                    <td className="p-3">{pos.pays}</td>
                    <td className="p-3">{pos.techniciens}</td>
                    <td className="p-3">{pos.delai_moyen}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-3 text-center">
                    Chargement des zones...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
/* 
export function HeroDefault({ section }) {
  const bgImage = section.image_side || section.image || "";

  return (
    <section
      className="relative h-[80vh] flex items-center justify-center px-6 md:px-12"
      style={{
        backgroundImage: bgImage
          ? `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${bgImage})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-black bg-opacity-60 p-8 rounded max-w-3xl text-center text-white drop-shadow-lg">
        {section.title && (
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            {section.title}
          </h1>
        )}
        {section.subtitle && (
          <h2 className="text-xl md:text-2xl mb-6 font-light">
            {section.subtitle}
          </h2>
        )}
        {section.content && (
          <p className="mb-8 text-md md:text-lg leading-relaxed">
            {section.content}
          </p>
        )}
        {section.button_text && section.button_link && (
          <a
            href={section.button_link}
            className="inline-block bg-orange-600 hover:bg-orange-700 transition-colors duration-300 px-8 py-3 rounded font-semibold shadow-lg"
          >
            {section.button_text}
          </a>
        )}
      </div>
    </section>
  );
}
 */
// -----------------------
export function HeroMinimal({ section }) {
  const bgImage = section.image
    ? `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image}`
    : null;

  return (
    <section className="relative w-full text-white h-[80vh] flex items-center justify-center text-center">
      {bgImage ? (
        <div
          className="relative h-[80vh] w-full"
          style={{
            backgroundImage: `url("${bgImage}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>
      ) : (
        <div className="min-h-[80vh] w-full bg-slate-100 flex items-center justify-center text-slate-400 text-4xl">
          <i className="fas fa-image"></i>
        </div>
      )}
      {/* Overlay sombre toujours présent */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Contenu centré */}
      <div className="absolute inset-0 z-20 flex items-center justify-center text-center pointer-events-none">
        <div className="max-w-fit text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {section.title}
          </h2>
          <h5 className="text-xl mb-4">{section.subtitle}</h5>
          <div
            className="mt-6 leading-relaxed px-4 text-justify max-w-4xl mx-auto"
            dangerouslySetInnerHTML={{
              __html: section.content ? cleanHTML(section.content) : "",
            }}
          />
          <div className="flex justify-around mt-10">
            {section.button_link && section.button_text && (
              <Link
                to={section.button_link ? "/" + section.button_link : ""}
                className="inline-block bg-[#74BB43] hover:bg-orange-700 px-6 py-3 rounded pointer-events-auto"
              >
                {section.button_text}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroContent({ section, settings }) {
  const bgImage = section.image
    ? `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image}`
    : null;

  return (
    <section
      id="accueil"
      className="relative w-full text-white h-[90vh] flex items-center justify-center text-center"
    >
      {bgImage ? (
        <div
          className="relative h-[90vh] w-full"
          style={{
            backgroundImage: `url("${bgImage}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      ) : (
        <div className="min-h-[90vh] w-full bg-slate-900 flex items-center justify-center text-slate-400 text-4xl">
          <i className="fas fa-image"></i>
        </div>
      )}
      {/* Overlay sombre toujours présent */}
      <div className="absolute inset-0 bg-white/40 z-0" />

      {/* Contenu centré */}
      <div className="absolute inset-0 z-20 flex items-center justify-center text-center pointer-events-none">
        <div className="max-w-fit text-white mt-0 lg:mt-[4rem]">
          <div className="text-center text-white max-w-5xl mx-auto">
            <h1 className="text-6xl px-4 ">{section.title}</h1>
            <p className="montserrat p-2 w-fit mx-auto mb-1">
              {section.subtitle}
            </p>
          </div>
          <div className="flex gap-3 justify-center mt-12 mx-2 bg-white rounded-xl text-gray-800 justify-between py-4 px-8 montserrat">
            <div className="text-start">
              <p className="montserrat font-semibold pb-2">Service Client</p>
              <p className="montserrat text-sm">{settings.emplacement}</p>
            </div>
            <a
              href={formatWhatsappLink(settings.telephone || settings.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="montserrat text-5xl my-auto rounded-full text-green-800 hover:text-yellow-500 font-medium transition pointer-events-auto"
            >
              <i className="ri-whatsapp-line"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroAds({ section }) {
  const bgImage = section.image
    ? `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image}`
    : null;

  return (
    <div className="relative w-full px-6 md:px-12 py-4">
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold mt-3">
          {section.title}
        </h2>
        {section.subtitle && <p className="montserrat">{section.subtitle}</p>}
      </div>
      {bgImage ? (
        <div
          className="w-full aspect-[16/9] rounded-xl bg-no-repeat bg-center bg-contain"
          style={{
            backgroundImage: `url("${bgImage}")`,
          }}
        ></div>
      ) : (
        <div className="w-full aspect-[16/9] max-h-[300px] bg-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-4xl">
          <i className="fas fa-image"></i>
        </div>
      )}
    </div>
  );
}

export function HeroAdsWithContent({ section }) {
  const bgImage = section.image
    ? `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image}`
    : null;

  return (
    <div className="relative w-full px-6 md:px-12 max-w-5xl mx-auto py-4">
      <div className="relative w-full aspect-[16/9] max-h-[300px] rounded-xl overflow-hidden">
        {/* Image de fond */}
        {bgImage ? (
          <div
            className="absolute inset-0 bg-no-repeat bg-center bg-cover"
            style={{
              backgroundImage: `url("${bgImage}")`,
            }}
          ></div>
        ) : (
          <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400 text-4xl">
            <i className="fas fa-image"></i>
          </div>
        )}

        {/* Overlay sombre pour lisibilité */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Contenu superposé */}
        <div className="relative z-10 h-full flex flex-col md:flex-row items-end md:items-center justify-around md:justify-between p-6 text-white">
          {/* Colonne gauche : titre, sous-titre, bouton */}
          <div className="md:w-1/2 w-full flex flex-col items-center md:items-center justify-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-2">
              {section.title}
            </h2>
            {section.subtitle && (
              <p className="montserrat text-lg mb-4">{section.subtitle}</p>
            )}
            {section.button_text && (
              <a
                href={section.button_link || "#"}
                className="montserrat inline-block bg-white text-yellow-500 px-6 py-2 rounded-full hover:bg-yellow-500 hover:text-white transition"
              >
                {section.button_text}
              </a>
            )}
          </div>

          {/* Colonne droite : contenu */}
          <div className="hidden md:block md:w-1/2 w-full md:pl-8 text-sm leading-relaxed">
            <div
              dangerouslySetInnerHTML={{
                __html: section.content
                  ? cleanHTML(section.content, "Montserrat")
                  : "",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// HeroInfo.js
export function HeroInfo({ section }) {
  const location = useLocation();
  const accueil = location.pathname === "/accueil";
  return (
    <div
      className="py-16 px-6 md:px-12 bg-white text-black"
      style={{
        backgroundImage: accueil ? `url("")` : "none",
        backgroundSize: "contain",
        backgroundPosition: "right center", // aligné à droite
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Titre centré en haut */}
      {section.title && (
        <h2 className="text-center text-orange-600 uppercase text-3xl font-semibold mb-10 abeezee">
          {section.title}
        </h2>
      )}

      <div className="rounded-xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {section.image_side ? (
          <img
            src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image_side}`}
            alt={section.title || "Image"}
            className="w-full rounded"
          />
        ) : (
          <div className="min-h-[400px] w-full bg-orange-900 flex items-center justify-center text-orange-400 text-4xl">
            <i className="fas fa-image"></i>
          </div>
        )}

        <div>
          {section.subtitle && (
            <h1 className="font-bold mb-4 text-3xl text-gray-900">
              {section.subtitle}
            </h1>
          )}
          {section.content && (
            <div
              className="mb-4 text-gray-700 text-justify"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          )}
          <Link
            to={section.button_link ? "/" + section.button_link : ""}
            className="inline-block border-2 border-bg-[#74BB43] text-[#74BB43] hover:bg-[#74BB43] px-6 py-3 rounded pointer-events-auto transition-colors duration-300 hover:text-white"
          >
            {section.button_text}
          </Link>
        </div>
      </div>
    </div>
  );
}

export function HeroInfoInverse({ section }) {
  return (
    <section
      className="py-16 px-6 md:px-12 relative bg-white"
      style={{
        backgroundImage: section.image
          ? `url(${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {section.image && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />
      )}
      <div className="rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10 ">
        <div>
          <p className="mb-2">{section.title}</p>
          {section.subtitle && (
            <h1 className="font-bold mb-2">{section.subtitle}</h1>
          )}
          {section.content && (
            <p className="mb-4 text-gray-700">{section.content}</p>
          )}
          {section.button_text && section.button_link && (
            <a
              href={section.button_link}
              className="inline-block bg-orange-600 hover:bg-orange-700 px-4 py-2 text-white rounded"
            >
              {section.button_text}
            </a>
          )}
          {section.subsections?.length > 0 && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.subsections.map((item, index) => (
                <div
                  key={index}
                  className="border p-4 rounded bg-white shadow-sm text-black text-center"
                >
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  {item.subtitle && (
                    <p className="text-sm text-gray-500">{item.subtitle}</p>
                  )}
                  {item.content && (
                    <p className="mt-2 text-gray-600">{item.content}</p>
                  )}
                  {item.button_text && item.button_link && (
                    <a
                      href={item.button_link}
                      className="inline-block mt-2 text-orange-600 hover:underline"
                    >
                      {item.button_text}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {section.image_side && (
          <div>
            <img
              src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image_side}`}
              alt={section.title || "Image"}
              className="w-full rounded shadow"
            />
          </div>
        )}
      </div>
    </section>
  );
}

export function HeroTwoCols({ section }) {
  return (
    <div className="relative py-8 bg-background overflow-hidden">
      <div className="mx-auto min-h-[80vh] max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
        {/* Colonne gauche */}
        <div>
          {/* Titre */}
          <h1 className="text-3xl sm:text-4xl text-primary font-semibold tracking-tight">
            {section.title}
          </h1>

          {/* Sous-titre */}
          <h2 className="mt-4 text-lg font-medium text-slate-600 uppercase">
            {section.subtitle}
          </h2>

          {/* Contenu */}
          <div
            className="mt-4 text-base leading-relaxed text-slate-600 max-w-prose"
            dangerouslySetInnerHTML={{ __html: section.content }}
          />

          {/* Boutons */}
          <div className="mt-6 flex gap-3">
            <a
              href={section.button_link}
              className="rounded-2xl bg-yellowCustom text-white px-5 py-3 text-sm font-medium hover:opacity-70 transition"
            >
              {section.button_text}
            </a>
            <a
              href="#contact"
              className="rounded-2xl bg-primary text-white px-5 py-3 text-sm font-medium hover:bg-slate-900 hover:text-white transition"
            >
              Nous contacter
            </a>
          </div>
        </div>

        {/* Colonne droite */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow shadow-lg">
          {section.image_side ? (
            <img
              src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image_side}`}
              alt={section.title}
              className="w-full h-64 object-cover rounded-3xl"
            />
          ) : (
            <div className="h-[350px] w-full bg-slate-100 flex items-center justify-center text-slate-400 text-4xl rounded-xl">
              <i className="fas fa-image"></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
