import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ToastMessage from "../Layout/ToastMessage";
import FormRDV from "../rdv_form/FormRDV";
import { cleanHTML } from "../../utils/cleanHtml";

export const CtaCentered = ({ section }) => (
  <section className="py-20 px-6 md:px-12 text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-4 capitalize">
      {section.title}
    </h2>
    {section.subtitle && <p className="mb-6 text-lg">{section.subtitle}</p>}
    {section.button_text && section.button_link && (
      <Link
        to={section.button_link || ""}
        className="montserrat inline-block bg-orange-500 text-white text-sm mt-2 px-6 py-3 font-semibold rounded-full shadow hover:bg-yellow-500 transition duration-300"
      >
        {section.button_text}
      </Link>
    )}
  </section>
);

export const CtaTwoCols = ({ section }) => (
  <section id="contacts" className="py-20 px-6 md:px-12 bg-primary text-white">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
      {/* Colonne gauche : titre + sous-titre */}
      <div className="text-center md:text-left">
        <h2 className="text-4xl font-semibold mb-4 capitalize">
          {section.title}
        </h2>
        {section.subtitle && <p className="mb-6 text-lg">{section.subtitle}</p>}
        {section.content && (
          <div
            className="text-gray-300 leading-relaxed text-justify max-h-[300px]"
            dangerouslySetInnerHTML={{
              __html: section.content ? cleanHTML(section.content) : "",
            }}
          />
        )}
      </div>

      {/* Colonne droite : bouton */}
      <div className="text-center md:text-right w-full md:w-[60%]">
        {section.button_text && section.button_link && (
          <Link
            to={section.button_link || ""}
            className="min-w-fit inline-block rounded-full bg-yellowCustom text-white px-6 py-3 font-semibold rounded shadow hover:bg-yellowCustom/80 transition"
          >
            {section.button_text}
          </Link>
        )}
      </div>
    </div>
  </section>
);

export function CtaNewsletter({ section }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔁 Tu pourras remplacer ceci par une vraie requête API
    console.log("Email inscrit :", email);
  };

  return (
    <section className="bg-[#74BB432B] m-4 rounded-md py-16 px-6 md:px-12 text-center">
      <div className="max-w-2xl mx-auto">
        {section.title && (
          <h1 className="text-3xl font-bold mb-2">{section.title}</h1>
        )}
        {section.subtitle && (
          <h3 className="text-xl mb-4">{section.subtitle}</h3>
        )}
        {section.content && <p className="mb-8">{section.content}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row ">
          <input
            type="email"
            required
            placeholder="Votre adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 bg-white rounded-t-lg sm:rounded-t-none sm:rounded-l-lg sm:border-r-0 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-b-lg sm:rounded-b-none sm:rounded-r-lg transition border border-orange-500"
          >
            S’inscrire
          </button>
        </form>
      </div>
    </section>
  );
}

export function CtaContact({ section, settings }) {
  const [toast, setToast] = useState({ message: "", success: true });

  const showToast = (message, success = true) => {
    setToast({ message, success });
    setTimeout(() => setToast({ message: "", success: true }), 4000);
  };

  const handleCloseToast = () => {
    setToast({ message: "", success: true });
  };

  return (
    <>
      {toast.message && (
        <ToastMessage
          message={toast.message}
          success={toast.success}
          onClose={handleCloseToast}
        />
      )}
      <section id="reservations" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-8 grid lg:grid-cols-2 gap-8 rounded-3xl shadow-lg border border-slate-200 ">
            {/* Coordonnées via settings */}
            <div className="p-6 flex flex-col justify-center text-primary">
              {section.title && (
                <h2 className="text-3xl md:text-5xl font-semibold text-primary tracking-tight">
                  {section.title.split("?").map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <>
                          ?<br />
                        </>
                      )}
                    </span>
                  ))}
                </h2>
              )}
              {section.content && (
                <div
                  className="mt-2 leading-relaxed text-justify"
                  dangerouslySetInnerHTML={{
                    __html: section.content ? cleanHTML(section.content) : "",
                  }}
                />
              )}
              <ul className="mt-4 space-y-3">
                {settings?.telephone && (
                  <li className="flex items-center gap-2">
                    <i className="text-3xl text-yellowCustom ri-phone-line text-primary font-semibold"></i>
                    <span className="text-slate-500">(+225)</span>
                    <a
                      href={`tel:${settings.telephone}`}
                      className="montserrat text-blue-600 underline-force-hover"
                    >
                      {settings.telephone}
                    </a>
                    {settings?.telephone_2 && (
                      <>
                        {" "}
                        ●{" "}
                        <a
                          href={`tel:${settings.telephone_2}`}
                          className="montserrat text-blue-600 underline-force-hover"
                        >
                          {settings.telephone_2}
                        </a>
                      </>
                    )}
                  </li>
                )}

                {settings?.whatsapp && (
                  <li className="flex items-center gap-2">
                    <i className="text-3xl text-yellowCustom ri-whatsapp-line text-primary font-semibold"></i>
                    <a
                      href={`https://wa.me/${settings.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="montserrat text-green-600 underline-force-hover"
                    >
                      {settings.whatsapp}
                    </a>
                  </li>
                )}

                {settings?.emplacement && (
                  <li className="flex items-center gap-2">
                    <i className="text-3xl text-yellowCustom ri-map-pin-line text-primary font-semibold"></i>
                    <span className="montserrat">{settings.emplacement}</span>
                  </li>
                )}

                {settings?.localisation && (
                  <li>
                    <a
                      href={settings.localisation}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="montserrat flex items-center gap-2 text-blue-600 hover:text-blue-800 underline underline-offset-2"
                    >
                      <i className="text-3xl text-yellowCustom ri-map-line"></i>
                      <span>Voir sur la carte</span>
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {/* Formulaire */}
            <FormRDV showToast={showToast} />
            {/* <div className="rounded-3xl bg-white border border-slate-200 p-6 flex flex-col justify-center items-center">
              <h3 className="font-semibold">Coordonnées</h3>
              <ul className="mt-4 space-y-3">
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

                {settings?.telephone && (
                  <li className="flex items-center gap-2">
                    <i className="text-2xl ri-phone-line text-primary font-semibold"></i>
                    <span className="text-slate-500">(+225)</span>
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

                {settings?.whatsapp && (
                  <li className="flex items-center gap-2">
                    <i className="text-2xl ri-whatsapp-line text-primary font-semibold"></i>
                    <a
                      href={`https://wa.me/${settings.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-600 underline-force-hover"
                    >
                      {settings.whatsapp}
                    </a>
                  </li>
                )}

                {settings?.emplacement && (
                  <li className="flex items-center gap-2">
                    <i className="text-2xl ri-map-pin-line text-primary font-semibold"></i>
                    <span>{settings.emplacement}</span>
                  </li>
                )}

                {settings?.localisation && (
                  <li>
                    <a
                      href={settings.localisation}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 underline underline-offset-2"
                    >
                      <i className="text-2xl ri-map-line"></i>
                      <span>Voir sur la carte</span>
                    </a>
                  </li>
                )}
              </ul>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}
