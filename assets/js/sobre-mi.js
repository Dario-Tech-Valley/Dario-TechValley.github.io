(() => {
    "use strict";


    /* =====================================================
       SOBRE MÍ · DARÍO NIETO LORENTE
       JS AISLADO DE LA PÁGINA
       ===================================================== */


    const root =
        document.documentElement;


    const body =
        document.body;


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    const finePointer =
        window.matchMedia(
            "(pointer: fine)"
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


    const motionOff =
        () =>
            reducedMotion.matches;


    /* =====================================================
       01 · STORAGE
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
                /* Continúa sin localStorage. */
            }
        };


    /* =====================================================
       02 · TEMA
       ===================================================== */

    const initTheme =
        () => {
            const toggle =
                $(
                    "[data-theme-toggle]"
                );


            const stored =
                safeGet(
                    THEME_KEY
                );


            const initial =
                stored === "light" ||
                stored === "dark"

                    ? stored

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
       03 · MENÚ
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


                        toggle.focus();
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
       04 · AÑO
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
       05 · HERO
       ===================================================== */

    const initHeroEntrance =
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
                $(".about-hero .section-code"),
                $(".about-hero h1"),
                $(".about-hero__lead"),
                $(".about-hero__text"),
                $(".about-hero .action-link")
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
                                opacity:
                                    0.25,

                                transform:
                                    "translateY(13px)"
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
                                720,

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


            const map =
                $(
                    ".identity-map"
                );


            map?.animate(
                [
                    {
                        opacity:
                            0.3,

                        transform:
                            "scale(0.97)"
                    },

                    {
                        opacity:
                            1,

                        transform:
                            "scale(1)"
                    }
                ],
                {
                    duration:
                        950,

                    delay:
                        170,

                    easing:
                        "cubic-bezier(0.22,1,0.36,1)",

                    fill:
                        "both"
                }
            );
        };


    /* =====================================================
       06 · REVEALS SEGUROS
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


                                element
                                    .classList
                                    .add(
                                        "is-visible"
                                    );


                                observer
                                    .unobserve(
                                        element
                                    );


                                window.setTimeout(
                                    () => {
                                        element
                                            .classList
                                            .remove(
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


                    /*
                     * Únicamente ocultamos algo
                     * si todavía está claramente
                     * fuera de pantalla.
                     */

                    if (
                        rect.top >
                        window.innerHeight +
                            30
                    ) {
                        element
                            .classList
                            .add(
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
       07 · EJES PERSONALES
       ===================================================== */

    const initPersonalAxes =
        () => {
            const axes =
                $$(
                    "[data-personal-axis]"
                );


            if (
                !axes.length ||
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
                                entry
                                    .target
                                    .classList
                                    .toggle(
                                        "is-current-axis",
                                        entry
                                            .isIntersecting
                                    );
                            }
                        );
                    },
                    {
                        rootMargin:
                            "-30% 0px -45% 0px",

                        threshold:
                            0
                    }
                );


            axes.forEach(
                (
                    axis
                ) => {
                    observer.observe(
                        axis
                    );
                }
            );
        };


    /* =====================================================
       08 · CONSTELACIÓN DE HABILIDADES
       ===================================================== */

    const initSkillsMap =
        () => {
            const map =
                $(
                    "[data-skills-map]"
                );


            if (!map) {
                return;
            }


            const skills =
                $$(
                    "[data-skill]",
                    map
                );


            const axes =
                $$(
                    "[data-axis]",
                    map
                );


            const lines =
                $$(
                    "[data-skill-line]",
                    map
                );


            const title =
                $(
                    "[data-skill-output-title]",
                    map
                );


            const text =
                $(
                    "[data-skill-output-text]",
                    map
                );


            const activate =
                (
                    skill
                ) => {
                    const id =
                        skill.dataset
                            .skill;


                    const linkedAxes =
                        (
                            skill.dataset
                                .skillAxes ||
                            ""
                        )
                            .split(
                                /\s+/
                            )
                            .filter(
                                Boolean
                            );


                    map.dataset.activeSkill =
                        id;


                    skills.forEach(
                        (
                            current
                        ) => {
                            current
                                .classList
                                .toggle(
                                    "is-active",
                                    current ===
                                        skill
                                );
                        }
                    );


                    axes.forEach(
                        (
                            axis
                        ) => {
                            axis
                                .classList
                                .toggle(
                                    "is-active",
                                    linkedAxes.includes(
                                        axis.dataset
                                            .axis
                                    )
                                );
                        }
                    );


                    lines.forEach(
                        (
                            line
                        ) => {
                            line
                                .classList
                                .toggle(
                                    "is-active",
                                    line.dataset
                                        .skillLine ===
                                        id
                                );
                        }
                    );


                    if (title) {
                        title.textContent =
                            skill.dataset
                                .skillTitle ||
                            "";
                    }


                    if (text) {
                        text.textContent =
                            skill.dataset
                                .skillText ||
                            "";
                    }
                };


            skills.forEach(
                (
                    skill
                ) => {
                    skill.addEventListener(
                        "pointerenter",
                        () => {
                            activate(
                                skill
                            );
                        }
                    );


                    skill.addEventListener(
                        "focus",
                        () => {
                            activate(
                                skill
                            );
                        }
                    );


                    skill.addEventListener(
                        "click",
                        () => {
                            activate(
                                skill
                            );
                        }
                    );
                }
            );


            if (
                skills[
                    0
                ]
            ) {
                activate(
                    skills[
                        0
                    ]
                );
            }
        };


    /* =====================================================
       09 · MOVIMIENTO MUY SUAVE DE FOTOS
       ===================================================== */

    const initPhotoMotion =
        () => {
            if (
                motionOff() ||
                !finePointer.matches
            ) {
                return;
            }


            $$(
                ".personal-axis__image-frame"
            ).forEach(
                (
                    frame
                ) => {
                    const image =
                        $(
                            "img",
                            frame
                        );


                    if (!image) {
                        return;
                    }


                    frame.addEventListener(
                        "pointermove",
                        (
                            event
                        ) => {
                            const rect =
                                frame
                                    .getBoundingClientRect();


                            const x =
                                (
                                    event.clientX -
                                    rect.left
                                ) /
                                rect.width -
                                0.5;


                            const y =
                                (
                                    event.clientY -
                                    rect.top
                                ) /
                                rect.height -
                                0.5;


                            image.style.transform =
                                `
                                translate3d(
                                    ${(x * 3).toFixed(2)}px,
                                    ${(y * 3).toFixed(2)}px,
                                    0
                                )
                                scale(1.008)
                                `;
                        }
                    );


                    frame.addEventListener(
                        "pointerleave",
                        () => {
                            image.style.transform =
                                "";
                        }
                    );
                }
            );
        };


    /* =====================================================
       10 · FONDO PERSONAL ANIMADO

       A diferencia del Index:
       Aquí no es una topología rígida.

       Las líneas se comportan más como
       conexiones entre grupos de ideas.
       ===================================================== */

    const initPersonalBackground =
        () => {
            const canvas =
                $(
                    "[data-personal-background]"
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


            const points = [
                [0.06, 0.15, 0],
                [0.14, 0.28, 0],
                [0.10, 0.52, 0],
                [0.21, 0.68, 0],

                [0.42, 0.12, 1],
                [0.50, 0.31, 1],
                [0.45, 0.60, 1],
                [0.57, 0.76, 1],

                [0.76, 0.15, 2],
                [0.87, 0.29, 2],
                [0.79, 0.55, 2],
                [0.93, 0.72, 2]
            ];


            const connections = [
                [0, 1],
                [1, 2],
                [2, 3],

                [4, 5],
                [5, 6],
                [6, 7],

                [8, 9],
                [9, 10],
                [10, 11],

                [1, 5],
                [3, 6],
                [5, 9],
                [7, 10]
            ];


            let width =
                0;


            let height =
                0;


            let dpr =
                1;


            let frame =
                null;


            let cyan =
                "#058eae";


            let violet =
                "#6e74bf";


            let green =
                "#23895a";


            let line =
                "rgba(20,53,68,.12)";


            let mouseX =
                0;


            let mouseY =
                0;


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


                    violet =
                        styles
                            .getPropertyValue(
                                "--violet"
                            )
                            .trim() ||
                        violet;


                    green =
                        styles
                            .getPropertyValue(
                                "--green"
                            )
                            .trim() ||
                        green;


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
                            window
                                .devicePixelRatio ||
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


            const colorByGroup =
                (
                    group
                ) => {
                    if (
                        group ===
                        0
                    ) {
                        return cyan;
                    }


                    if (
                        group ===
                        1
                    ) {
                        return violet;
                    }


                    return green;
                };


            const render =
                (
                    time = 0
                ) => {
                    context.clearRect(
                        0,
                        0,
                        width,
                        height
                    );


                    const current =
                        points.map(
                            (
                                [
                                    x,
                                    y,
                                    group
                                ],
                                index
                            ) => {
                                const movement =
                                    motionOff()
                                        ? 0
                                        : 1;


                                return {
                                    group,

                                    x:
                                        x *
                                            width +
                                        Math.sin(
                                            time *
                                                0.0001 +
                                            index
                                        ) *
                                            6 *
                                            movement +
                                        mouseX *
                                            0.3,

                                    y:
                                        y *
                                            height +
                                        Math.cos(
                                            time *
                                                0.00009 +
                                            index *
                                                0.7
                                        ) *
                                            5 *
                                            movement +
                                        mouseY *
                                            0.2
                                };
                            }
                        );


                    connections.forEach(
                        (
                            [
                                from,
                                to
                            ]
                        ) => {
                            const a =
                                current[
                                    from
                                ];


                            const b =
                                current[
                                    to
                                ];


                            context.beginPath();


                            context.moveTo(
                                a.x,
                                a.y
                            );


                            const middleX =
                                (
                                    a.x +
                                    b.x
                                ) /
                                2;


                            const middleY =
                                (
                                    a.y +
                                    b.y
                                ) /
                                2 -
                                14;


                            context.quadraticCurveTo(
                                middleX,
                                middleY,
                                b.x,
                                b.y
                            );


                            context.strokeStyle =
                                a.group ===
                                b.group

                                    ? colorByGroup(
                                        a.group
                                    )

                                    : line;


                            context.globalAlpha =
                                a.group ===
                                b.group
                                    ? 0.09
                                    : 0.16;


                            context.lineWidth =
                                1;


                            context.stroke();
                        }
                    );


                    current.forEach(
                        (
                            point,
                            index
                        ) => {
                            context.beginPath();


                            context.arc(
                                point.x,
                                point.y,
                                index %
                                    4 ===
                                    0
                                    ? 2
                                    : 1.15,
                                0,
                                Math.PI *
                                    2
                            );


                            context.fillStyle =
                                colorByGroup(
                                    point.group
                                );


                            context.globalAlpha =
                                index %
                                    4 ===
                                    0
                                    ? 0.34
                                    : 0.16;


                            context.fill();
                        }
                    );


                    context.globalAlpha =
                        1;


                    if (!motionOff()) {
                        frame =
                            requestAnimationFrame(
                                render
                            );
                    }
                };


            const pointerMove =
                (
                    event
                ) => {
                    mouseX =
                        (
                            event.clientX /
                            window.innerWidth -
                            0.5
                        ) *
                        6;


                    mouseY =
                        (
                            event.clientY /
                            window.innerHeight -
                            0.5
                        ) *
                        6;
                };


            readColors();

            resize();

            render();


            window.addEventListener(
                "resize",
                resize
            );


            if (
                finePointer.matches &&
                !motionOff()
            ) {
                window.addEventListener(
                    "pointermove",
                    pointerMove,
                    {
                        passive:
                            true
                    }
                );
            }


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
                                render
                            );
                    }
                }
            );
        };


    /* =====================================================
       11 · INIT
       ===================================================== */

    const init =
        () => {

            initHeroEntrance();

            initReveals();

            initPersonalAxes();

            initSkillsMap();

            initPhotoMotion();

            initPersonalBackground();
        };


    if (
        document.readyState ===
        "loading"
    ) {
        document.addEventListener(
            "DOMContentLoaded",
            init,
            {
                once:
                    true
            }
        );
    }

    else {
        init();
    }

})();

/* =========================================================
   FLIP CARDS · MI LEMA
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const cards =
        document.querySelectorAll(
            "[data-flip-card]"
        );


    cards.forEach((card) => {

        const button =
            card.querySelector(
                ".motto-flip__button"
            );


        if (!button) {
            return;
        }


        button.addEventListener(
            "click",
            () => {

                const flipped =
                    card.classList.toggle(
                        "is-flipped"
                    );


                button.setAttribute(
                    "aria-pressed",
                    flipped
                        ? "true"
                        : "false"
                );

            }
        );

    });

});