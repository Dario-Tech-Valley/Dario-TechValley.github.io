(() => {
    "use strict";


    const root =
        document.documentElement;

    const body =
        document.body;

    const $ = (
        selector,
        context = document
    ) =>
        context.querySelector(selector);

    const $$ = (
        selector,
        context = document
    ) =>
        [...context.querySelectorAll(selector)];


    const THEME_KEY =
        "dnl-theme";


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    const systemDark =
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        );


    /* =====================================================
       THEME
       ===================================================== */

    const initTheme =
        () => {
            const toggle =
                $("[data-theme-toggle]");

            let saved = null;

            try {
                saved =
                    localStorage.getItem(
                        THEME_KEY
                    );
            }

            catch {
                saved = null;
            }


            const initial =
                saved === "dark" ||
                saved === "light"
                    ? saved
                    : systemDark.matches
                        ? "dark"
                        : "light";


            const apply =
                (
                    theme,
                    persist = true
                ) => {
                    root.dataset.theme =
                        theme;

                    root.style.colorScheme =
                        theme;


                    if (persist) {
                        try {
                            localStorage.setItem(
                                THEME_KEY,
                                theme
                            );
                        }

                        catch {
                            /* Sin storage. */
                        }
                    }


                    if (toggle) {
                        toggle.setAttribute(
                            "aria-label",
                            theme === "dark"
                                ? "Activar modo claro"
                                : "Activar modo oscuro"
                        );
                    }


                    window.dispatchEvent(
                        new CustomEvent(
                            "dnl:themechange"
                        )
                    );
                };


            apply(
                initial,
                false
            );


            toggle?.addEventListener(
                "click",
                () => {
                    apply(
                        root.dataset.theme === "dark"
                            ? "light"
                            : "dark"
                    );
                }
            );
        };


    /* =====================================================
       MENU
       ===================================================== */

    const initMenu =
        () => {
            const toggle =
                $("[data-menu-toggle]");

            const navigation =
                $("[data-navigation]");


            if (
                !toggle ||
                !navigation
            ) {
                return;
            }


            const setOpen =
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
                    setOpen(
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
                        event.target.closest("a")
                    ) {
                        setOpen(false);
                    }
                }
            );


            document.addEventListener(
                "keydown",
                (
                    event
                ) => {
                    if (
                        event.key === "Escape"
                    ) {
                        setOpen(false);
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
                        setOpen(false);
                    }
                }
            );
        };


    /* =====================================================
       YEAR
       ===================================================== */

    const initYear =
        () => {
            $$(
                "[data-current-year]"
            ).forEach(
                (
                    node
                ) => {
                    node.textContent =
                        new Date()
                            .getFullYear();
                }
            );
        };


    /* =====================================================
       SAFE REVEALS
       ===================================================== */

    const initReveals =
        () => {
            if (
                reducedMotion.matches ||
                !(
                    "IntersectionObserver"
                    in window
                )
            ) {
                return;
            }


            const elements =
                $$("[data-reveal]");


            const observer =
                new IntersectionObserver(
                    (
                        entries
                    ) => {
                        entries.forEach(
                            (
                                entry
                            ) => {
                                if (
                                    !entry.isIntersecting
                                ) {
                                    return;
                                }


                                entry.target
                                    .classList
                                    .add(
                                        "is-visible"
                                    );


                                observer.unobserve(
                                    entry.target
                                );


                                setTimeout(
                                    () => {
                                        entry.target
                                            .classList
                                            .remove(
                                                "reveal-await",
                                                "is-visible"
                                            );
                                    },
                                    850
                                );
                            }
                        );
                    },
                    {
                        threshold: 0.02,
                        rootMargin:
                            "0px 0px 7% 0px"
                    }
                );


            elements.forEach(
                (
                    element
                ) => {
                    const rect =
                        element
                            .getBoundingClientRect();


                    if (
                        rect.top >
                        window.innerHeight +
                            30
                    ) {
                        element.classList.add(
                            "reveal-await"
                        );

                        observer.observe(
                            element
                        );
                    }
                }
            );
        };


    /* =====================================================
       IAE OPS CENTER
       ===================================================== */

    const opsData = {
        web: {
            status:
                "WEB / ACTIVE",

            code:
                "MODULE / 01",

            title:
                "Plataformas web y gestión",

            description:
                "Administración de WordPress y Elementor, trabajando con plugins, formularios, materiales, usuarios, roles y permisos. Gestión de Zoho y de las conexiones e integraciones existentes mediante API.",

            stack: [
                "WordPress",
                "Elementor",
                "Zoho",
                "API"
            ]
        },


        infra: {
            status:
                "INFRA / ACTIVE",

            code:
                "MODULE / 02",

            title:
                "Hosting e infraestructura web",

            description:
                "Gestión de servicios en Arsys y Plesk. Trabajo con dominios, DNS, servidores, entornos virtualizados, FTP/SFTP y alojamiento de herramientas estáticas y dinámicas construidas en entornos Docker.",

            stack: [
                "Arsys",
                "Plesk",
                "DNS",
                "FTP/SFTP",
                "Docker"
            ]
        },


        support: {
            status:
                "SUPPORT / ACTIVE",

            code:
                "MODULE / 03",

            title:
                "Soporte técnico",

            description:
                "Soporte a usuarios, resolución de incidencias y mantenimiento de equipos dentro del entorno de trabajo.",

            stack: [
                "Usuarios",
                "Equipos",
                "Incidencias",
                "Mantenimiento"
            ]
        },


        collab: {
            status:
                "COLLAB / ACTIVE",

            code:
                "MODULE / 04",

            title:
                "Entornos colaborativos",

            description:
                "Administración de grupos, permisos y seguridad en Microsoft SharePoint, apoyando el trabajo colaborativo y el control de acceso a recursos.",

            stack: [
                "SharePoint",
                "Grupos",
                "Permisos",
                "Seguridad"
            ]
        },


        av: {
            status:
                "A/V / ACTIVE",

            code:
                "MODULE / 05",

            title:
                "Audiovisual y eventos",

            description:
                "Soporte técnico en reuniones y eventos mediante Zoom, gestión de contenidos en Vimeo y edición de vídeo con Filmora.",

            stack: [
                "Zoom",
                "Vimeo",
                "Filmora",
                "Eventos"
            ]
        }
    };


    const initOpsCenter =
        () => {
            const container =
                $("[data-ops-center]");


            if (!container) {
                return;
            }


            const nodes =
                $$(
                    "[data-ops-node]",
                    container
                );


            const status =
                $(
                    "[data-ops-status]",
                    container
                );

            const code =
                $(
                    "[data-ops-code]",
                    container
                );

            const title =
                $(
                    "[data-ops-title]",
                    container
                );

            const description =
                $(
                    "[data-ops-description]",
                    container
                );

            const stack =
                $(
                    "[data-ops-stack]",
                    container
                );


            const select =
                (
                    key
                ) => {
                    const data =
                        opsData[key];


                    if (!data) {
                        return;
                    }


                    nodes.forEach(
                        (
                            node
                        ) => {
                            node.classList.toggle(
                                "is-active",
                                node.dataset.opsNode ===
                                    key
                            );
                        }
                    );


                    status.textContent =
                        data.status;

                    code.textContent =
                        data.code;

                    title.textContent =
                        data.title;

                    description.textContent =
                        data.description;


                    stack.innerHTML = "";


                    data.stack.forEach(
                        (
                            item
                        ) => {
                            const tag =
                                document.createElement(
                                    "span"
                                );

                            tag.textContent =
                                item;

                            stack.appendChild(
                                tag
                            );
                        }
                    );


                    if (
                        !reducedMotion.matches &&
                        typeof title.animate ===
                            "function"
                    ) {
                        [
                            title,
                            description,
                            stack
                        ].forEach(
                            (
                                element,
                                index
                            ) => {
                                element.animate(
                                    [
                                        {
                                            opacity: 0.3,
                                            transform:
                                                "translateY(5px)"
                                        },

                                        {
                                            opacity: 1,
                                            transform:
                                                "translateY(0)"
                                        }
                                    ],
                                    {
                                        duration: 330,
                                        delay:
                                            index *
                                            40,
                                        easing:
                                            "cubic-bezier(0.22,1,0.36,1)"
                                    }
                                );
                            }
                        );
                    }
                };


            nodes.forEach(
                (
                    node
                ) => {
                    node.addEventListener(
                        "click",
                        () => {
                            select(
                                node.dataset.opsNode
                            );
                        }
                    );
                }
            );
        };


    /* =====================================================
       CAPABILITY ENGINE
       ===================================================== */

    const capabilityData = {
        standards: {
            code:
                "NETWORK / 01",

            title:
                "Aplicación de estándares técnicos",

            text:
                "Base para diseñar, desplegar y documentar infraestructura de red con criterios técnicos."
        },


        topology: {
            code:
                "NETWORK / 02",

            title:
                "Diseño de topologías de red",

            text:
                "Capacidad para plantear cómo se relacionan equipos, segmentos y servicios dentro de una infraestructura."
        },


        services: {
            code:
                "NETWORK / 03",

            title:
                "Servicios en red",

            text:
                "Configuración y comprensión de servicios necesarios para la comunicación y funcionamiento de sistemas conectados."
        },


        cabling: {
            code:
                "NETWORK / 04",

            title:
                "Cableado estructurado",

            text:
                "Diseño y documentación de infraestructura física organizada para comunicaciones de red."
        },


        monitor: {
            code:
                "NETWORK / 05",

            title:
                "Análisis y monitorización",

            text:
                "Observación del comportamiento de la red para comprender tráfico, latencia, conectividad e incidencias."
        },


        office: {
            code:
                "TOOLS / 01",

            title:
                "Microsoft Office 365",

            text:
                "Herramientas ofimáticas y colaborativas utilizadas para documentación, organización y trabajo diario."
        },


        systems: {
            code:
                "SYSTEMS / 01",

            title:
                "Windows y Linux",

            text:
                "Administración y trabajo con sistemas operativos Windows y Linux en diferentes entornos."
        },


        databases: {
            code:
                "DATA / 01",

            title:
                "Administración de bases de datos",

            text:
                "Conocimientos de organización, consulta y administración de información mediante sistemas de bases de datos."
        },


        frontend: {
            code:
                "WEB / 01",

            title:
                "HTML y CSS",

            text:
                "Desarrollo web básico orientado a estructura, presentación y construcción de interfaces."
        },


        cms: {
            code:
                "PLATFORMS / 01",

            title:
                "WordPress y Zoho",

            text:
                "Administración de CMS y CRM aplicada a contenidos, usuarios, permisos, formularios y gestión de plataformas."
        }
    };


    const initCapabilities =
        () => {
            const engine =
                $("[data-capability-engine]");


            if (!engine) {
                return;
            }


            const buttons =
                $$(
                    "[data-capability]",
                    engine
                );


            const code =
                $(
                    "[data-capability-code]",
                    engine
                );

            const title =
                $(
                    "[data-capability-title]",
                    engine
                );

            const text =
                $(
                    "[data-capability-text]",
                    engine
                );


            const select =
                (
                    key
                ) => {
                    const data =
                        capabilityData[key];


                    if (!data) {
                        return;
                    }


                    buttons.forEach(
                        (
                            button
                        ) => {
                            button.classList.toggle(
                                "is-active",
                                button.dataset
                                    .capability ===
                                    key
                            );
                        }
                    );


                    code.textContent =
                        data.code;

                    title.textContent =
                        data.title;

                    text.textContent =
                        data.text;


                    if (
                        !reducedMotion.matches &&
                        typeof title.animate ===
                            "function"
                    ) {
                        [
                            title,
                            text
                        ].forEach(
                            (
                                element
                            ) => {
                                element.animate(
                                    [
                                        {
                                            opacity: 0.25,
                                            transform:
                                                "translateY(4px)"
                                        },

                                        {
                                            opacity: 1,
                                            transform:
                                                "translateY(0)"
                                        }
                                    ],
                                    {
                                        duration: 320,
                                        easing:
                                            "cubic-bezier(0.22,1,0.36,1)"
                                    }
                                );
                            }
                        );
                    }
                };


            buttons.forEach(
                (
                    button
                ) => {
                    button.addEventListener(
                        "click",
                        () => {
                            select(
                                button.dataset
                                    .capability
                            );
                        }
                    );
                }
            );
        };


    /* =====================================================
       LIVE CASE
       ===================================================== */

    const initLiveCase =
        () => {
            const container =
                $("[data-live-case]");


            if (!container) {
                return;
            }


            const steps =
                $$(
                    "[data-live-step]",
                    container
                );


            const label =
                $(
                    "[data-live-label]",
                    container
                );


            const labels = [
                "PREPARATION",
                "OPERATIONS",
                "CONTROL_ROOM",
                "RESULT"
            ];


            const activate =
                (
                    index
                ) => {
                    steps.forEach(
                        (
                            step,
                            stepIndex
                        ) => {
                            step.classList.toggle(
                                "is-active",
                                stepIndex ===
                                    index
                            );
                        }
                    );


                    label.textContent =
                        labels[index];


                    container.style.setProperty(
                        "--live-progress",
                        String(
                            (index + 1) *
                            25
                        )
                    );
                };


            if (
                !(
                    "IntersectionObserver"
                    in window
                )
            ) {
                return;
            }


            const observer =
                new IntersectionObserver(
                    (
                        entries
                    ) => {
                        entries.forEach(
                            (
                                entry
                            ) => {
                                if (
                                    !entry.isIntersecting
                                ) {
                                    return;
                                }


                                activate(
                                    Number(
                                        entry.target.dataset
                                            .liveStep
                                    )
                                );
                            }
                        );
                    },
                    {
                        threshold: 0.58
                    }
                );


            steps.forEach(
                (
                    step
                ) => {
                    observer.observe(
                        step
                    );
                }
            );
        };


    /* =====================================================
       BACKGROUND
       ===================================================== */

    const initBackground =
        () => {
            const canvas =
                $("[data-ops-background]");


            if (!canvas) {
                return;
            }


            const context =
                canvas.getContext("2d");


            if (!context) {
                return;
            }


            let width = 0;
            let height = 0;
            let dpr = 1;
            let frame = null;


            let cyan =
                "#058eae";

            let line =
                "rgba(20,53,68,.15)";


            const readColors =
                () => {
                    const styles =
                        getComputedStyle(root);

                    cyan =
                        styles
                            .getPropertyValue(
                                "--cyan"
                            )
                            .trim() ||
                        cyan;

                    line =
                        styles
                            .getPropertyValue(
                                "--line-strong"
                            )
                            .trim() ||
                        line;
                };


            const resize =
                () => {
                    width =
                        window.innerWidth;

                    height =
                        window.innerHeight;

                    dpr =
                        Math.min(
                            window.devicePixelRatio ||
                                1,
                            1.5
                        );


                    canvas.width =
                        Math.round(
                            width *
                            dpr
                        );

                    canvas.height =
                        Math.round(
                            height *
                            dpr
                        );


                    canvas.style.width =
                        `${width}px`;

                    canvas.style.height =
                        `${height}px`;


                    context.setTransform(
                        dpr,
                        0,
                        0,
                        dpr,
                        0,
                        0
                    );
                };


            const draw =
                (
                    time = 0
                ) => {
                    context.clearRect(
                        0,
                        0,
                        width,
                        height
                    );


                    const routes = [
                        0.18,
                        0.39,
                        0.63,
                        0.82
                    ];


                    routes.forEach(
                        (
                            ratio,
                            index
                        ) => {
                            const y =
                                height *
                                ratio;


                            context.beginPath();

                            context.moveTo(
                                0,
                                y
                            );

                            context.lineTo(
                                width,
                                y
                            );


                            context.strokeStyle =
                                line;

                            context.globalAlpha =
                                0.24;

                            context.lineWidth =
                                1;

                            context.stroke();


                            const packetX =
                                (
                                    (
                                        time *
                                            0.035 +
                                        index *
                                            width *
                                            0.23
                                    ) %
                                    (
                                        width +
                                        160
                                    )
                                ) -
                                80;


                            context.beginPath();

                            context.arc(
                                packetX,
                                y,
                                1.8,
                                0,
                                Math.PI *
                                    2
                            );


                            context.fillStyle =
                                cyan;

                            context.globalAlpha =
                                0.28;

                            context.fill();
                        }
                    );


                    context.globalAlpha = 1;


                    if (
                        !reducedMotion.matches
                    ) {
                        frame =
                            requestAnimationFrame(
                                draw
                            );
                    }
                };


            readColors();

            resize();

            draw();


            window.addEventListener(
                "resize",
                resize
            );


            window.addEventListener(
                "dnl:themechange",
                readColors
            );


            document.addEventListener(
                "visibilitychange",
                () => {
                    if (
                        document.hidden &&
                        frame
                    ) {
                        cancelAnimationFrame(
                            frame
                        );

                        frame = null;
                    }

                    else if (
                        !document.hidden &&
                        !frame &&
                        !reducedMotion.matches
                    ) {
                        frame =
                            requestAnimationFrame(
                                draw
                            );
                    }
                }
            );
        };


    /* =====================================================
       INIT
       ===================================================== */

    const init =
        () => {
 
            initReveals();

            initOpsCenter();
            initCapabilities();
            initLiveCase();

            initBackground();
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