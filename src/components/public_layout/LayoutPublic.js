import { useState, useEffect } from "react";
import logo from "../../assets/img/logo.png"; // Mets ici ton chemin correct vers le logo
// import floral from "../../assets/img/floral-1.png"; // Mets ici ton chemin correct vers le logo
import { Link, useLocation } from "react-router-dom";
import UseNavbarInteractions from "../../assets/js/UseNavbarInteractions";
// import DropdownFondements from "./DropdownFondements";

function LayoutPublic({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [pages, setPages] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [settings, setSettings] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [showCloseBtn, setShowCloseBtn] = useState(false);

  const socialIcons = [
    { key: "facebook", icon: "ri-facebook-fill" },
    { key: "twitter", icon: "ri-twitter-x-fill" },
    { key: "instagram", icon: "ri-instagram-line" },
    { key: "youtube", icon: "ri-youtube-fill" },
    { key: "tiktok", icon: "ri-tiktok-fill" },
    { key: "linkedin", icon: "ri-linkedin-fill" },
    { key: "whatsapp", icon: "ri-whatsapp-line" },
  ];

  const locations = [
    { label: "Location jardin", to: "/locations/jardin" },
    {
      label: "Location salle événementiel",
      to: "/locations/salle-evenementiel",
    },
    { label: "Location salle de concert", to: "/locations/salle-concert" },
    { label: "Location salle réunion", to: "/locations/salle-reunion" },
    { label: "Location salle de mariage", to: "/locations/salle-mariage" },
    { label: "Location salle restaurant", to: "/locations/salle-restaurant" },
  ];

  const events = [
    { label: "Anniversaire", to: "/evenements/anniversaire" },
    { label: "Mariage", to: "/evenements/mariage" },
    { label: "Garden-Party", to: "/evenements/garden-party" },
    { label: "Soirée", to: "/evenements/soiree" },
    { label: "Séminaire et réunion", to: "/evenements/seminaire-reunion" },
    { label: "Événement entreprise", to: "/evenements/entreprise" },
    { label: "Tournage", to: "/evenements/tournage" },
  ];

  const STORAGE = process.env.REACT_APP_API_BASE_URL_STORAGE;

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

        // On vérifie ici si le popup doit être affiché
        if (mapped.popup_accueil && !sessionStorage.getItem("popupShown")) {
          setShowPopup(true);
          sessionStorage.setItem("popupShown", "true");
        }
      });

    fetch(`${API}/pages-public`)
      .then((res) => res.json())
      .then((data) => setPages(data));

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = pages
    .filter((page) => page.template.includes("default"))
    .map((page) => ({
      label: page.title,
      to: `/${page.slug}`,
    }));

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCloseBtn(true);
    }, 5000); // 1000 = 1 seconde

    return () => clearTimeout(timer);
  }, []);

  // Limite à 8 liens
  const displayedLinks = links.slice(0, 8);

  // Découper le tableau
  const half = Math.ceil(displayedLinks.length / 2);
  const leftLinks = displayedLinks.slice(
    0,
    displayedLinks.length % 2 === 0 ? half : half - 1
  );
  const rightLinks = displayedLinks.slice(
    displayedLinks.length % 2 === 0 ? half : half - 1
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] bg-white lg:bg-transparent transition duration-300`}
      >
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-screen mx-auto px-6">
              {/* ======== 💻 Desktop (visible uniquement sur grand écran) ======== */}
              <div
                className={`hidden lg:flex ${
                  scrolled ? "bg-white/70" : "bg-white"
                } transition duration-300 mt-2 backdrop-blur-md shadow-md rounded-3xl px-10 py-1 items-center justify-between max-w-6xl w-full border border-gray-200 mx-auto`}
              >
                {/* Liens gauche */}
                <ul className="flex gap-6 items-center">
                  {leftLinks.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className={`montserrat transition duration-300 ${
                          location.pathname === link.to
                            ? "font-bold text-primary underline-force underline-offset-4"
                            : "text-gray-700 hover:text-primary"
                        } hover:underline-force-hover`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Logo centré */}
                <Link to="/" className="inline-block mx-8">
                  <img
                    src={settings.logo ? `${STORAGE}/${settings.logo}` : logo}
                    alt="Logo site"
                    className="w-28 h-24 object-contain"
                  />
                </Link>

                {/* Liens droite */}
                <ul className="flex gap-6 items-center">
                  {rightLinks.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className={`montserrat transition duration-300 ${
                          location.pathname === link.to
                            ? "font-bold text-primary underline-force underline-offset-4"
                            : "text-gray-700 hover:text-primary"
                        } hover:underline-force`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ======== 📱 Mobile (visible uniquement sur mobile) ======== */}
              <div className="block lg:hidden">
                <div className="flex justify-between items-center py-2">
                  <Link to="/" className="inline-block">
                    <img
                      src={settings.logo ? `${STORAGE}/${settings.logo}` : logo}
                      alt="logo"
                      className="w-28 h-20 object-contain"
                    />
                  </Link>

                  <div
                    className={`text-3xl cursor-pointer z-50 ${
                      menuOpen ? "text-white" : ""
                    }`}
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    <i
                      className={`ri-${
                        menuOpen ? "close-line" : "menu-4-line"
                      }`}
                    ></i>
                  </div>
                </div>

                <div
                  className={`absolute left-0 w-full bg-primary/80 backdrop-blur-sm duration-300 z-40 ${
                    menuOpen ? "top-0 h-[100vh]" : "top-[-999vh]"
                  }`}
                >
                  <ul className="flex flex-col justify-center items-center gap-8 py-6 h-full">
                    {links.map((link) => (
                      <li key={link.to}>
                        <Link
                          to={link.to}
                          className={`nav-link transition duration-300 text-2xl text-white ${
                            location.pathname === link.to
                              ? " font-bold underline-force underline-offset-4 text-primary"
                              : "opacity-80 hover:opacity-100"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ---------- POPUP ACCUEIL ---------- */}
      {showPopup && settings.popup_accueil && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[999]">
          <div className="bg-white rounded-lg p-4 relative max-w-lg w-full shadow-lg">
            {showCloseBtn && (
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-500 bg-red-500 shadow-lg h-10 w-10 rounded-full text-lg transition duration-300"
                onClick={() => setShowPopup(false)}
              >
                ✖
              </button>
            )}
            <img
              src={`${STORAGE}/${settings.popup_accueil}`}
              alt="Popup Accueil"
              className="w-full rounded"
            />
          </div>
        </div>
      )}

      {/* -------------------------------- */}
      <div className={`min-h-screen mt-[5rem] lg:mt-0`}>{children}</div>
      {/* -------------------------------- */}

      <footer
        className={`relative bg-[#262424] text-white mt-0 pb-10 overflow-hidden
  ${location.pathname === "/accueil" ? "pt-16" : "pt-5"} min-h-[300px]`}
      >
        {/* 🌄 Forme arrondie vers le haut */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block w-[calc(100%+1.3px)] h-[80px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,120 C300,40 900,40 1200,120 L1200,0 L0,0 Z"
              fill="#fff"
            ></path>
          </svg>
        </div>
        {/* Contenu principal */}
        <div className="container mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-end md:items-center justify-around md:justify-between">
            {/* Logo */}
            <div className="w-full md:w-1/2 lg:w-[25%]">
              <img
                src={settings.logo2 ? `${STORAGE}/${settings.logo2}` : logo}
                alt="Logo footer"
                className="mx-auto md:mx-0 h-36 object-contain rounded-lg"
              />
            </div>
            <div className="text-center md:text-start">
              <p className="text-2xl">{settings.mot_de_fin}</p>
              <p className="text-xs montserrat">{settings.mot_de_fin2}</p>
            </div>
          </div>
          <hr className="my-8" />
          <div className="flex flex-wrap gap-4 justify-around text-center md:text-left">
            {/* Locations */}
            <div className="w-full sm:w-[48%] md:w-[30%] lg:w-[20%] pb-4 border-b-2 lg:border-0 border-white/50">
              <h4 className="montserrat mb-4 font-bold">Locations</h4>
              <ul className="space-y-2">
                {locations.map((loc) => (
                  <li key={loc.to}>
                    <Link
                      to={loc.to}
                      className="montserrat hover:text-yellow-500 transition"
                    >
                      {loc.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Événements */}
            <div className="w-full sm:w-[48%] md:w-[30%] lg:w-[20%] pb-4 border-b-2 lg:border-0 border-white/50">
              <h4 className="montserrat mb-4 font-bold">Événements</h4>
              <ul className="space-y-2">
                {events.map((evt) => (
                  <li key={evt.to}>
                    <Link
                      to={evt.to}
                      className="montserrat hover:text-yellow-500 transition"
                    >
                      {evt.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation */}
            <div className="w-full sm:w-[48%] md:w-[20%] lg:w-[15%] pb-4 border-b-2 lg:border-0 border-white/50">
              <h4 className="montserrat mb-4 font-bold">Navigation</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="montserrat hover:text-yellow-500 transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacts */}
            <div className="w-full sm:w-[48%] md:w-[30%] lg:w-[20%] pb-4 border-b-2 md:border-0 border-white/50">
              <h4 className="montserrat mb-4 font-bold">Contacts</h4>
              <ul className="space-y-2 text-sm">
                {settings?.telephone && (
                  <li>
                    <a
                      href={`tel:${settings.telephone}`}
                      className="montserrat underline-force-hover"
                    >
                      <span>(+225)</span> {settings.telephone}
                    </a>

                    {settings?.telephone_2 && (
                      <>
                        {" "}
                        ●{" "}
                        <a
                          href={`tel:${settings.telephone_2}`}
                          className="montserrat underline-force-hover"
                        >
                          {settings.telephone_2}
                        </a>
                      </>
                    )}
                  </li>
                )}

                {settings?.email && (
                  <li>
                    <a
                      href={`mailto:${settings.email}`}
                      className="montserrat underline-force-hover"
                    >
                      {settings.email}
                    </a>
                  </li>
                )}

                <li>
                  <Link
                    to="/conditions-generales"
                    className="montserrat hover:text-yellow-500 transition"
                  >
                    Conditions générales
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div className="my-10 flex justify-center space-x-4 text-2xl text-white">
          <h4 className="mb-4 font-bold hidden md:block">Suivez nous</h4>
          {socialIcons.map(({ key, icon }) =>
            settings[key] ? (
              <a
                key={key}
                href={settings[key]}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellowCustom transition"
              >
                <i className={icon}></i>
              </a>
            ) : null
          )}
        </div>

        <div className="text-center mt-12 text-sm opacity-60">
          &copy; {new Date().getFullYear()} Pavillon HERA, AsNumeric - J/D. Tous
          droits réservés.
        </div>
      </footer>

      {/* <!--~~~~~~~~~~~~~~~ Scroll Up ~~~~~~~~~~~~~~~--> */}
      <button
        type="button"
        className="fixed right-2 bottom-16 bg-yellow-500 shadow-lg px-3 py-2 md:px-4 md:py-3 rounded-md text-lg z-50 
    invisible opacity-0 translate-y-4 transition-all duration-300 ease-in-out"
        id="scroll-up"
        aria-label="Scroll to top"
      >
        <i className="ri-arrow-up-line text-white"></i>
      </button>

      <UseNavbarInteractions />
    </>
  );
}
export default LayoutPublic;
