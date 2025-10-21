import { useEffect, useState } from "react";
import { cleanHTML } from "../../utils/cleanHtml";
import { useLocation } from "react-router-dom";

export const TwoColsWithSS = ({ section }) => {
  const isVideo = /\.(mp4|webm|ogg)$/i.test(section.image_side);
  const mediaSrc = `${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image_side}`;

  return (
    <section className="py-20 bg-white px-6 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {section.image_side ? (
          isVideo ? (
            <video
              src={mediaSrc}
              className="w-full rounded"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              src={mediaSrc}
              alt={section.title || "Image"}
              className="w-full rounded"
            />
          )
        ) : (
          <div className="min-h-[450px] w-full bg-orange-900 flex items-center justify-center text-orange-400 text-4xl">
            <i className="fas fa-image"></i>
          </div>
        )}

        {/* Titre principal + contenu + sous-sections */}
        <div className="mb-14">
          <h1 className="text-2xl md:text-4xl font-bold text-[#74BB43]">
            {section.title}
          </h1>
          {section.subtitle && (
            <p className="mt-3 text-gray-600 text-lg">{section.subtitle}</p>
          )}
          {section.content && (
            <div
              className="mt-6 text-gray-700 leading-relaxed text-justify"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          )}
          {/* Sous-sections en cards */}
          <div className="flex flex-wrap justify-center gap-4">
            {section.subsections.map((item, index) => (
              <div
                key={index}
                className="w-[40%] lg:w-[31%] border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-all duration-300"
              >
                {item.icon && (
                  <div className="text-[#74BB43] text-4xl mb-4">
                    <i className={item.icon}></i>
                  </div>
                )}
                <p className="font-semibold text-xs break-words text-gray-800">
                  {item.title}
                </p>
                {item.subtitle && (
                  <p className="mt-2 text-xs text-gray-600">{item.subtitle}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const TwoColsWithoutSS = ({ section }) => {
  const location = useLocation();
  const loc = location.pathname === "/cda-motors";

  return (
    <section
      className={`${
        loc ? "bg-[#74BB432B]" : "bg-white"
      } px-6 md:px-12 border border-b`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Image */}
        <div className="bg-white p-2 shadow-lg rounded-md">
          {section.image_side ? (
            <div className="flex justify-center items-center p-2">
              <img
                src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image_side}`}
                alt={section.title || "Image"}
                className="w-fit h-auto max-h-[400px] object-contain rounded shadow-lg"
              />
            </div>
          ) : (
            <div className="min-h-[400px] w-full bg-gray-200 flex items-center justify-center text-primary text-4xl">
              <i className="fas fa-image"></i>
            </div>
          )}
        </div>

        {/* Texte */}
        <div className="flex flex-col justify-start p-2 overflow-hidden">
          <p className="mt-3 text-yellow-500 text-sm font-bold montserrat">
            {section.title}
          </p>
          {section.subtitle && (
            <h1 className="text-2xl md:text-4xl font-bold">
              {section.subtitle}
            </h1>
          )}
          {section.content && (
            <div
              className="mt-6 text-gray-700 leading-relaxed text-justify overflow-y-auto max-h-[300px]"
              dangerouslySetInnerHTML={{
                __html: section.content
                  ? cleanHTML(section.content, "Montserrat")
                  : "",
              }}
            />
          )}
          <div className="mt-6 flex gap-3 flex-wrap">
            {section.button_text && section.button_link && (
              <a
                href={section.button_link}
                className="rounded-xl bg-primary text-white px-3 py-2 font-medium hover:opacity-70 transition"
              >
                {section.button_text}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const TwoColsWithoutSSInverse = ({ section }) => {
  const location = useLocation();
  const loc = location.pathname === "/cda-motors";
  return (
    <section id="galeries" className="py-20 bg-white px-6 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Titre principal */}
        <div className="mb-14 order-2 lg:order-1">
          <h1
            className={`text-2xl md:text-4xl text-primary font-bold ${
              loc ? "text-primary" : ""
            }`}
          >
            {section.title}
          </h1>
          {section.subtitle && (
            <p className="mt-3 text-gray-600 text-lg">{section.subtitle}</p>
          )}
          {section.content && (
            <div
              className="mt-6 text-gray-700 leading-relaxed text-justify"
              dangerouslySetInnerHTML={{
                __html: section.content ? cleanHTML(section.content) : "",
              }}
            />
          )}
          <div className="mt-6 flex gap-3">
            {section.button_text && section.button_link && (
              <a
                href={section.button_link}
                className="rounded-xl bg-primary text-white px-3 py-2 font-medium hover:opacity-70 transition"
              >
                {section.button_text}
              </a>
            )}
          </div>
        </div>
        <div className="order-1 lg:order-2">
          {section.image_side ? (
            section.image_side.endsWith(".mp4") ||
            section.image_side.endsWith(".webm") ||
            section.image_side.endsWith(".ogg") ? (
              <video
                controls
                className="h-full max-h-[400px] object-contain rounded mx-auto shadow-lg"
              >
                <source
                  src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image_side}`}
                  type="video/mp4"
                />
                Votre navigateur ne supporte pas la vidéo.
              </video>
            ) : (
              <img
                src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image_side}`}
                alt={section.title || "Image"}
                className="h-full max-h-[400px] object-contain rounded mx-auto shadow-lg"
              />
            )
          ) : (
            <div className="min-h-[400px] w-full bg-gray-200 flex items-center justify-center text-primary text-4xl">
              <i className="fas fa-image"></i>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export const TwoColsTwoImages = ({ section }) => {
  return (
    <section
      className={`
        bg-white
      px-6 md:px-12 border border-b`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Image */}
        {section.image ? (
          <div className="flex justify-center items-center p-2">
            <img
              src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image}`}
              alt={section.title || "Image"}
              className="w-fit h-auto max-h-[400px] object-contain rounded shadow-lg"
            />
          </div>
        ) : (
          <div className="min-h-[400px] w-full bg-gray-200 flex items-center justify-center text-primary text-4xl">
            <i className="fas fa-image"></i>
          </div>
        )}

        {/* Texte */}
        <div className="flex flex-col justify-start p-2 overflow-hidden">
          {section.subtitle && (
            <p className="mt-3 text-gray-600 text-sm text-yellowCustom">
              {section.title}
            </p>
          )}
          <h1 className="text-xl md:text-4xl font-bold text-primary">
            {section.subtitle}
          </h1>
          {section.content && (
            <div
              className="mt-6 text-gray-700 leading-relaxed text-justify overflow-y-auto max-h-[300px]"
              dangerouslySetInnerHTML={{
                __html: section.content ? cleanHTML(section.content) : "",
              }}
            />
          )}
          <div className="mt-6 flex gap-3 flex-wrap">
            {section.image_side ? (
              <div className="flex justify-center items-center p-2">
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${section.image_side}`}
                  alt={section.title || "Image"}
                  className="w-fit h-auto max-h-[300px] object-contain rounded shadow-lg"
                />
              </div>
            ) : (
              <div className="min-h-[300px] w-full bg-gray-200 flex items-center justify-center text-primary text-4xl">
                <i className="fas fa-image"></i>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const TwoColsImageGrid = ({ section }) => {
  return (
    <section className="py-20 bg-primary px-6 md:px-12">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-center">
        {/* Colonne gauche : texte */}
        <div className="mb-14">
          <p className="mt-3 text-yellowCustom text-lg">{section.title}</p>
          {section.subtitle && (
            <h1 className="text-2xl text-white md:text-4xl font-bold text-[#74BB43]">
              {section.subtitle}
            </h1>
          )}
          {section.content && (
            <div
              className="mt-6 text-gray-700 leading-relaxed text-justify"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          )}
        </div>

        {/* Colonne droite : affichage de logos des sous-sections */}
        <div className="w-full h-full">
          {section.subsections.length === 0 && (
            <div className="w-32 h-32 rounded-xl bg-white flex items-center justify-center text-gray-400">
              <i className="fa fa-image text-2xl"></i>
            </div>
          )}

          <div className="flex flex-wrap gap-4 justify-center">
            {section.subsections.slice(0, 8).map((sub, i) =>
              sub.image ? (
                <img
                  key={i}
                  src={`${process.env.REACT_APP_API_BASE_URL_STORAGE}/${sub.image}`}
                  alt={sub.title || ""}
                  className="w-28 h-28 md:w-32 md:h-32 object-contain rounded-xl bg-white p-2 shadow"
                />
              ) : (
                <div
                  key={i}
                  className="w-28 h-28 md:w-32 md:h-32 rounded-xl bg-white flex items-center justify-center text-gray-400 shadow"
                >
                  <i className="fa fa-image text-2xl"></i>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export function TwoColsContact({ section }) {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const API = process.env.REACT_APP_API_BASE_URL;

    fetch(`${API}/settings-public`)
      .then((res) => res.json())
      .then((data) => {
        const mapped = {};
        data.forEach((item) => {
          mapped[item.key] = item.value;
        });
        setSettings(mapped);
      });
  }, []);

  return (
    <>
      <section id="contact" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {section.title && (
            <h2 className="text-3xl md:text-4xl font-semibold text-primary tracking-tight">
              {section.title}
            </h2>
          )}

          <div className="mt-8 grid lg:grid-cols-2 gap-8">
            {/* 1ère colonne */}
            <div className="p-6 flex flex-col justify-start items-start space-y-4">
              {/* Nom du site */}
              {settings?.nom_du_site && (
                <h2 className="text-2xl font-bold">{settings.nom_du_site}</h2>
              )}

              {/* Coordonnées principales */}
              <ul className="space-y-2">
                {settings?.emplacement && (
                  <li className="flex items-center gap-2">
                    <i className="text-2xl ri-map-pin-line text-primary font-semibold"></i>
                    <span>{settings.emplacement}</span>
                  </li>
                )}

                {settings?.telephone && (
                  <li className="flex items-center gap-2">
                    <i className="text-2xl ri-phone-line text-primary font-semibold"></i>
                    <span>(+225)</span>
                    <a
                      href={`tel:${settings.telephone}`}
                      className="text-blue-600 underline-force-hover"
                    >
                      {settings.telephone}
                    </a>
                    {settings?.telephone_2 && (
                      <>
                        {" "}
                        ●{" "}
                        <a
                          href={`tel:${settings.telephone_2}`}
                          className="text-blue-600 underline-force-hover"
                        >
                          {settings.telephone_2}
                        </a>
                      </>
                    )}
                  </li>
                )}

                {settings?.email && (
                  <li className="flex items-center gap-2">
                    <i className="text-2xl ri-mail-line text-primary font-semibold"></i>
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-blue-600 underline-force-hover"
                    >
                      {settings.email}
                    </a>
                  </li>
                )}
              </ul>

              {/* Grid responsive pour sous-sections */}
              {section?.subsections?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 w-full">
                  {section.subsections.map((sub, index) => (
                    <div key={index} className="flex flex-col">
                      <span className="font-semibold">{sub.title}</span>
                      <span className="text-gray-500">{sub.subtitle}</span>

                      {/* Si tu as des jours et heures à afficher */}
                      {sub.jours && sub.heures && (
                        <div className="flex justify-between mt-1">
                          <span className="font-semibold">{sub.jours}</span>
                          <span className="text-gray-500">{sub.heures}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {settings?.whatsapp && (
                <div className="flex items-center mt-8">
                  <a
                    href={`https://wa.me/${
                      settings.whatsapp /* .replace(/\D/g, "") */
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-moov text-white rounded-lg hover:bg-green-600 transition"
                  >
                    WhatsApp
                  </a>
                </div>
              )}
            </div>

            {/* 2ème colonne */}
            <div className="p-6">
              {settings?.localisation && (
                <div className="w-full shadow rounded overflow-hidden">
                  <iframe
                    src={settings.localisation}
                    title={
                      settings?.nom_du_site
                        ? `${settings?.nom_du_site} Map`
                        : "Location Map"
                    }
                    className="w-full h-96"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
