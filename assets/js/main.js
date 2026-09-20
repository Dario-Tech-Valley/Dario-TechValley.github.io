(() => {
    "use strict";


    /* =========================================================
       DNL · MAIN
       Funciones compartidas por todo el portfolio.
       ========================================================= */


    const root =
        document.documentElement;


    const body =
        document.body;


    const $ = (
        selector,
        context = document
    ) =>
        context.querySelector(
            selector
        );


    const $$ = (
        selector,
        context = document
    ) =>
        [
            ...context.querySelectorAll(
                selector
            )
        ];


    const THEME_KEY =
        "dnl-theme";


    const systemDark =
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        );



    /* =========================================================
       01 · SAFE STORAGE
       ========================================================= */

    const safeGet =
        (
            key
        ) => {

            try {

                return localStorage.getItem(
                    key
                );

            }

            catch {

                return null;

            }

        };


    const safeSet =
        (
            key,
            value
        ) => {

            try {

                localStorage.setItem(
                    key,
                    value
                );

            }

            catch {

                /* El portfolio puede funcionar sin localStorage. */

            }

        };



    /* =========================================================
       02 · THEME
       ========================================================= */

    const getInitialTheme =
        () => {

            const saved =
                safeGet(
                    THEME_KEY
                );


            if (
                saved === "light" ||
                saved === "dark"
            ) {

                return saved;

            }


            return systemDark.matches
                ? "dark"
                : "light";

        };


    const applyTheme =
        (
            theme,
            persist = true
        ) => {

            root.dataset.theme =
                theme;


            root.style.colorScheme =
                theme;


            if (persist) {

                safeSet(
                    THEME_KEY,
                    theme
                );

            }


            const toggle =
                $(
                    "[data-theme-toggle]"
                );


            toggle?.setAttribute(

                "aria-label",

                theme === "dark"

                    ? "Activar modo claro"

                    : "Activar modo oscuro"

            );


            /*
             * Las animaciones/canvas específicos de cada página
             * pueden escuchar este evento.
             */

            window.dispatchEvent(

                new CustomEvent(
                    "dnl:themechange",
                    {
                        detail: {
                            theme
                        }
                    }
                )

            );

        };


    /*
     * Se aplica en cuanto carga main.js para recuperar el
     * modo utilizado en la página anterior.
     */

    applyTheme(
        getInitialTheme(),
        false
    );



    /* =========================================================
       03 · THEME BUTTON
       ========================================================= */

    const initThemeToggle =
        () => {

            const toggle =
                $(
                    "[data-theme-toggle]"
                );


            if (!toggle) {

                return;

            }


            toggle.addEventListener(

                "click",

                () => {

                    applyTheme(

                        root.dataset.theme ===
                            "dark"

                            ? "light"

                            : "dark"

                    );

                }

            );

        };



    /* =========================================================
       04 · MOBILE MENU
       ========================================================= */

    const initMenu =
        () => {

            const toggle =
                $(
                    "[data-menu-toggle]"
                );


            const navigation =
                $(
                    "[data-navigation]"
                );


            if (
                !toggle ||
                !navigation
            ) {

                return;

            }


            const setMenu =
                (
                    open
                ) => {

                    navigation.classList.toggle(
                        "is-open",
                        open
                    );


                    body.classList.toggle(
                        "menu-open",
                        open
                    );


                    toggle.setAttribute(
                        "aria-expanded",
                        String(open)
                    );


                    toggle.setAttribute(

                        "aria-label",

                        open
                            ? "Cerrar menú"
                            : "Abrir menú"

                    );

                };


            toggle.addEventListener(

                "click",

                () => {

                    setMenu(

                        !navigation.classList.contains(
                            "is-open"
                        )

                    );

                }

            );


            navigation.addEventListener(

                "click",

                (
                    event
                ) => {

                    if (
                        event.target.closest(
                            "a"
                        )
                    ) {

                        setMenu(
                            false
                        );

                    }

                }

            );


            document.addEventListener(

                "keydown",

                (
                    event
                ) => {

                    if (
                        event.key ===
                        "Escape"
                    ) {

                        setMenu(
                            false
                        );

                    }

                }

            );


            window.addEventListener(

                "resize",

                () => {

                    if (
                        window.innerWidth >
                        920
                    ) {

                        setMenu(
                            false
                        );

                    }

                }

            );

        };



    /* =========================================================
       05 · YEAR
       ========================================================= */

    const initYear =
        () => {

            const year =
                new Date()
                    .getFullYear();


            $$(
                "[data-current-year]"
            ).forEach(

                (
                    element
                ) => {

                    element.textContent =
                        year;

                }

            );

        };

/* =========================================================
   COOKIES · GOOGLE ANALYTICS
========================================================= */

function initCookieConsent() {
  const config = window.DTV_ANALYTICS;

  if (!config) return;

  const getConsent = () => {
    try {
      return localStorage.getItem(config.storageKey);
    } catch {
      return null;
    }
  };

  const saveConsent = (value) => {
    try {
      localStorage.setItem(config.storageKey, value);
    } catch {
      console.warn("No se pudo guardar la preferencia de cookies.");
    }
  };

  const removeBanner = () => {
    document.querySelector(".cookie-banner")?.remove();
  };

  const showBanner = () => {
    if (document.querySelector(".cookie-banner")) return;

    const banner = document.createElement("div");

    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Preferencias de cookies");

    banner.innerHTML = `
      <div class="cookie-banner__content">

        <div class="cookie-banner__text">
          <span class="cookie-banner__label">ANALYTICS</span>

          <p>
            Utilizo Google Analytics para conocer cómo se usa el portfolio
            y medir acciones como las descargas del CV y de proyectos.
            Puedes aceptar o rechazar las cookies analíticas.
          </p>

          <a href="assets/docs/documentos/licencia.html#cookies" class="cookie-banner__info">
            Más información
          </a>
        </div>

        <div class="cookie-banner__actions">
          <button
            type="button"
            class="cookie-banner__button cookie-banner__button--reject"
            data-cookie-reject
          >
            Rechazar
          </button>

          <button
            type="button"
            class="cookie-banner__button cookie-banner__button--accept"
            data-cookie-accept
          >
            Aceptar
          </button>
        </div>

      </div>
    `;

    document.body.appendChild(banner);

    banner
      .querySelector("[data-cookie-accept]")
      .addEventListener("click", () => {
        saveConsent("accepted");

        if (typeof window.dtvLoadAnalytics === "function") {
          window.dtvLoadAnalytics();
        }

        removeBanner();
      });

    banner
      .querySelector("[data-cookie-reject]")
      .addEventListener("click", () => {
        saveConsent("rejected");

        /*
         * Si Analytics ya estaba cargado porque el usuario
         * anteriormente había aceptado, recargamos la página.
         */
        if (window.__dtvAnalyticsLoaded) {
          window.location.reload();
          return;
        }

        removeBanner();
      });
  };

  /*
   * Primera visita:
   * si todavía no existe ninguna decisión, mostramos el banner.
   */
  if (!getConsent()) {
    showBanner();
  }

  /*
   * Permite volver a abrir las preferencias desde cualquier
   * elemento con data-cookie-settings.
   */
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-cookie-settings]");

    if (!button) return;

    event.preventDefault();
    showBanner();
  });
}



    /* =========================================================
       06 · INIT
       ========================================================= */

    const init =
        () => {

            initThemeToggle();

            initMenu();

            initYear();

            initCookieConsent();

        };


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(

            "DOMContentLoaded",

            init,

            {
                once: true
            }

        );

    }

    else {

        init();

    }

})();