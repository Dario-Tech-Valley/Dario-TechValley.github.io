(() => {
    "use strict";


    /* =====================================================
       FORMACIÓN · DARÍO NIETO LORENTE
       ===================================================== */


    const root =
        document.documentElement;


    const body =
        document.body;


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    const systemDark =
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        );


    const THEME_KEY =
        "dnl-theme";


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


    const clamp = (
        value,
        min,
        max
    ) =>
        Math.min(
            Math.max(
                value,
                min
            ),
            max
        );


    const motionOff =
        () =>
            reducedMotion.matches;


    /* =====================================================
       STORAGE
       ===================================================== */

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
                /* Continúa sin storage. */
            }
        };


    /* =====================================================
       TEMA
       ===================================================== */

    const initTheme =
        () => {
            const toggle =
                $(
                    "[data-theme-toggle]"
                );


            const saved =
                safeGet(
                    THEME_KEY
                );


            const initial =
                saved === "light" ||
                saved === "dark"

                    ? saved

                    : systemDark.matches

                        ? "dark"

                        : "light";


            const updateLabel =
                () => {
                    if (!toggle) {
                        return;
                    }


                    const dark =
                        root.dataset.theme ===
                        "dark";


                    toggle.setAttribute(
                        "aria-label",
                        dark
                            ? "Activar modo claro"
                            : "Activar modo oscuro"
                    );
                };


            const setTheme =
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


                    updateLabel();


                    window.dispatchEvent(
                        new CustomEvent(
                            "dnl:themechange"
                        )
                    );
                };


            setTheme(
                initial,
                false
            );


            toggle?.addEventListener(
                "click",
                () => {
                    setTheme(
                        root.dataset.theme ===
                        "dark"
                            ? "light"
                            : "dark"
                    );
                }
            );
        };


    /* =====================================================
       MENÚ
       ===================================================== */

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


            let open =
                false;


            const setOpen =
                (
                    value
                ) => {
                    open =
                        Boolean(
                            value
                        );


                    body.classList.toggle(
                        "menu-open",
                        open
                    );


                    navigation.classList.toggle(
                        "is-open",
                        open
                    );


                    toggle.setAttribute(
                        "aria-expanded",
                        String(
                            open
                        )
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
                        !open
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
                        setOpen(
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
                            "Escape" &&
                        open
                    ) {
                        setOpen(
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
                            920 &&
                        open
                    ) {
                        setOpen(
                            false
                        );
                    }
                }
            );
        };


    /* =====================================================
       AÑO
       ===================================================== */

    const initYear =
        () => {
            $$(
                "[data-current-year]"
            ).forEach(
                (
                    element
                ) => {
                    element.textContent =
                        new Date()
                            .getFullYear();
                }
            );
        };


    /* =====================================================
       HERO
       ===================================================== */

    const initHero =
        () => {
            if (
                motionOff() ||
                typeof Element
                    .prototype
                    .animate !==
                    "function"
            ) {
                return;
            }


            const elements = [
                $(".formation-hero .section-code"),
                $(".formation-hero h1"),
                $(".formation-hero__lead"),
                $(".formation-hero__text"),
                $(".formation-hero .action-link")
            ].filter(
                Boolean
            );


            elements.forEach(
                (
                    element,
                    index
                ) => {
                    element.animate(
                        [
                            {
                                opacity: 0.25,

                                transform:
                                    "translateY(13px)"
                            },

                            {
                                opacity: 1,

                                transform:
                                    "translateY(0)"
                            }
                        ],
                        {
                            duration: 720,

                            delay:
                                70 +
                                index *
                                    80,

                            easing:
                                "cubic-bezier(0.22,1,0.36,1)",

                            fill:
                                "both"
                        }
                    );
                }
            );


            const topology =
                $(
                    ".learning-topology"
                );


            topology?.animate(
                [
                    {
                        opacity: 0.25,

                        transform:
                            "translateX(12px)"
                    },

                    {
                        opacity: 1,

                        transform:
                            "translateX(0)"
                    }
                ],
                {
                    duration: 950,

                    delay: 180,

                    easing:
                        "cubic-bezier(0.22,1,0.36,1)",

                    fill:
                        "both"
                }
            );
        };


    /* =====================================================
       REVEALS
       ===================================================== */

    const initReveals =
        () => {
            const elements =
                $$(
                    "[data-reveal]"
                );


            if (
                !elements.length ||
                motionOff() ||
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
                                    !entry
                                        .isIntersecting
                                ) {
                                    return;
                                }


                                const element =
                                    entry.target;


                                element.classList.add(
                                    "is-visible"
                                );


                                observer.unobserve(
                                    element
                                );


                                window.setTimeout(
                                    () => {
                                        element.classList.remove(
                                            "reveal-await",
                                            "is-visible"
                                        );
                                    },
                                    860
                                );
                            }
                        );
                    },
                    {
                        rootMargin:
                            "0px 0px 8% 0px",

                        threshold:
                            0.01
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
       ACADEMIC ROUTE
       ===================================================== */

    const initAcademicRoute =
        () => {
            const route =
                $(
                    "[data-academic-route]"
                );


            if (!route) {
                return;
            }


            const stages =
                $$(
                    "[data-academic-stage]",
                    route
                );


            let ticking =
                false;


            const update =
                () => {
                    const rect =
                        route
                            .getBoundingClientRect();


                    const start =
                        window.innerHeight *
                        0.73;


                    const travel =
                        rect.height -
                        window.innerHeight *
                        0.25;


                    const progress =
                        clamp(
                            (
                                start -
                                rect.top
                            ) /
                            Math.max(
                                travel,
                                1
                            ),
                            0,
                            1
                        );


                    route.style.setProperty(
                        "--academic-progress",
                        progress.toFixed(
                            4
                        )
                    );


                    stages.forEach(
                        (
                            stage
                        ) => {
                            const stageRect =
                                stage
                                    .getBoundingClientRect();


                            const active =
                                stageRect.top <
                                window.innerHeight *
                                    0.62;


                            stage.classList.toggle(
                                "is-route-active",
                                active
                            );
                        }
                    );


                    ticking =
                        false;
                };


            const requestUpdate =
                () => {
                    if (ticking) {
                        return;
                    }


                    ticking =
                        true;


                    window.requestAnimationFrame(
                        update
                    );
                };


            update();


            window.addEventListener(
                "scroll",
                requestUpdate,
                {
                    passive: true
                }
            );


            window.addEventListener(
                "resize",
                requestUpdate
            );
        };


    /* =====================================================
       MODULE REGISTRY
       ===================================================== */

    const initModules =
        () => {
            const modules =
                $$(
                    "[data-learning-module]"
                );


            modules.forEach(
                (
                    module
                ) => {
                    const toggle =
                        $(
                            "[data-module-toggle]",
                            module
                        );


                    if (!toggle) {
                        return;
                    }


                    toggle.addEventListener(
                        "click",
                        () => {
                            const open =
                                module.classList.toggle(
                                    "is-open"
                                );


                            toggle.setAttribute(
                                "aria-expanded",
                                String(
                                    open
                                )
                            );
                        }
                    );
                }
            );
        };


    /* =====================================================
       COMMUNICATION PIPELINE
       ===================================================== */

    const initCommunicationPipeline =
        () => {
            const pipeline =
                $(
                    ".communication-pipeline"
                );


            if (
                !pipeline ||
                motionOff() ||
                !(
                    "IntersectionObserver"
                    in window
                )
            ) {
                return;
            }


            const nodes =
                $$(
                    "div",
                    pipeline
                );


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
                                    !entry
                                        .isIntersecting
                                ) {
                                    return;
                                }


                                nodes.forEach(
                                    (
                                        node,
                                        index
                                    ) => {
                                        window.setTimeout(
                                            () => {
                                                node.animate(
                                                    [
                                                        {
                                                            opacity:
                                                                0.35,

                                                            transform:
                                                                "translateY(6px)"
                                                        },

                                                        {
                                                            opacity:
                                                                1,

                                                            transform:
                                                                "translateY(0)"
                                                        }
                                                    ],
                                                    {
                                                        duration:
                                                            420,

                                                        easing:
                                                            "cubic-bezier(0.22,1,0.36,1)",

                                                        fill:
                                                            "both"
                                                    }
                                                );
                                            },
                                            index *
                                                130
                                        );
                                    }
                                );


                                observer.disconnect();
                            }
                        );
                    },
                    {
                        threshold:
                            0.3
                    }
                );


            observer.observe(
                pipeline
            );
        };


    /* =====================================================
       BACKGROUND
       ===================================================== */

    const initFormationBackground =
        () => {
            const canvas =
                $(
                    "[data-formation-background]"
                );


            if (!canvas) {
                return;
            }


            const context =
                canvas.getContext(
                    "2d"
                );


            if (!context) {
                return;
            }


            let width = 0;

            let height = 0;

            let dpr = 1;

            let frame = null;

            let cyan =
                "#058eae";

            let blue =
                "#3869a5";

            let line =
                "rgba(20,53,68,.16)";


            const paths = [
                {
                    y: 0.16,
                    offset: 0
                },

                {
                    y: 0.43,
                    offset: 1.3
                },

                {
                    y: 0.70,
                    offset: 2.4
                },

                {
                    y: 0.86,
                    offset: 3.1
                }
            ];


            const readColors =
                () => {
                    const styles =
                        getComputedStyle(
                            root
                        );


                    cyan =
                        styles
                            .getPropertyValue(
                                "--cyan"
                            )
                            .trim() ||
                        cyan;


                    blue =
                        styles
                            .getPropertyValue(
                                "--blue"
                            )
                            .trim() ||
                        blue;


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
                    dpr =
                        Math.min(
                            window.devicePixelRatio ||
                                1,
                            1.5
                        );


                    width =
                        window.innerWidth;


                    height =
                        window.innerHeight;


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


                    paths.forEach(
                        (
                            path,
                            index
                        ) => {
                            const baseY =
                                path.y *
                                height;


                            context.beginPath();


                            context.moveTo(
                                -30,
                                baseY
                            );


                            for (
                                let x = -30;
                                x <= width + 30;
                                x += 70
                            ) {
                                const y =
                                    baseY +
                                    Math.sin(
                                        x *
                                            0.006 +
                                        time *
                                            0.00012 +
                                        path.offset
                                    ) *
                                        11;


                                context.lineTo(
                                    x,
                                    y
                                );
                            }


                            context.strokeStyle =
                                index %
                                    2 ===
                                    0
                                    ? cyan
                                    : blue;


                            context.globalAlpha =
                                0.055;


                            context.lineWidth =
                                1;


                            context.stroke();
                        }
                    );


                    for (
                        let index = 0;
                        index < 9;
                        index += 1
                    ) {
                        const x =
                            (
                                (
                                    index *
                                        0.13 +
                                    time *
                                        0.000005
                                ) %
                                1
                            ) *
                            width;


                        const y =
                            (
                                0.12 +
                                (
                                    index %
                                    4
                                ) *
                                    0.22
                            ) *
                            height;


                        context.beginPath();


                        context.arc(
                            x,
                            y,
                            index %
                                3 ===
                                0
                                ? 1.8
                                : 1.1,
                            0,
                            Math.PI *
                                2
                        );


                        context.fillStyle =
                            index %
                                3 ===
                                0
                                ? cyan
                                : line;


                        context.globalAlpha =
                            index %
                                3 ===
                                0
                                ? 0.26
                                : 0.36;


                        context.fill();
                    }


                    context.globalAlpha =
                        1;


                    if (!motionOff()) {
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


                        frame =
                            null;
                    }


                    else if (
                        !document.hidden &&
                        !frame &&
                        !motionOff()
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

            initHero();

            initReveals();

            initAcademicRoute();

            initModules();

            initCommunicationPipeline();

            initFormationBackground();
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