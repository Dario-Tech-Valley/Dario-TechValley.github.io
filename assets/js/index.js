(() => {
    "use strict";

    /* =====================================================
       INDEX · DARÍO NIETO LORENTE
       JS ESPECÍFICO DE LA PÁGINA
       ===================================================== */

    const root = document.documentElement;
    const body = document.body;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    const finePointer = window.matchMedia(
        "(pointer: fine)"
    );

    const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    );

    const THEME_KEY = "dnl-theme";

    const $ = (
        selector,
        context = document
    ) => context.querySelector(selector);

    const $$ = (
        selector,
        context = document
    ) => [
        ...context.querySelectorAll(selector)
    ];

    const clamp = (
        value,
        min,
        max
    ) => Math.min(
        Math.max(value, min),
        max
    );

    const motionOff = () =>
        reducedMotion.matches;


    /* =====================================================
       01 · STORAGE
       ===================================================== */

    const safeGet = (
        key
    ) => {
        try {
            return localStorage.getItem(key);
        }

        catch {
            return null;
        }
    };


    const safeSet = (
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
            /*
             * La página sigue funcionando
             * aunque localStorage no esté disponible.
             */
        }
    };


    /* =====================================================
       02 · TEMA
       ===================================================== */

    const initTheme = () => {
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

                const label =
                    dark
                        ? "Activar modo claro"
                        : "Activar modo oscuro";

                toggle.setAttribute(
                    "aria-label",
                    label
                );

                toggle.setAttribute(
                    "title",
                    label
                );
            };


        const setTheme = (
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


        if (toggle) {
            toggle.addEventListener(
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
        }


        const systemChange =
            (
                event
            ) => {
                const manual =
                    safeGet(
                        THEME_KEY
                    );

                if (
                    manual === "light" ||
                    manual === "dark"
                ) {
                    return;
                }

                setTheme(
                    event.matches
                        ? "dark"
                        : "light",
                    false
                );
            };


        if (
            typeof systemDark
                .addEventListener ===
            "function"
        ) {
            systemDark.addEventListener(
                "change",
                systemChange
            );
        }
    };


    /* =====================================================
       03 · MENÚ MÓVIL
       ===================================================== */

    const initMenu = () => {
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

    const initYear = () => {
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
       05 · PALABRA ROTATORIA
       ===================================================== */

    const initRotatingWord = () => {
        const element =
            $(
                "[data-rotating-word]"
            );


        if (!element) {
            return;
        }


        const words =
            (
                element.dataset.words ||
                ""
            )
                .split("|")
                .map(
                    (
                        word
                    ) =>
                        word.trim()
                )
                .filter(
                    Boolean
                );


        if (
            words.length <
            2 ||
            motionOff()
        ) {
            return;
        }


        let index =
            Math.max(
                words.indexOf(
                    element.textContent
                        .trim()
                ),
                0
            );


        let swapping =
            false;


        const swap =
            async () => {
                if (swapping) {
                    return;
                }

                swapping =
                    true;

                index =
                    (
                        index +
                        1
                    ) %
                    words.length;


                if (
                    typeof element.animate !==
                    "function"
                ) {
                    element.textContent =
                        words[
                            index
                        ];

                    swapping =
                        false;

                    return;
                }


                try {
                    const leave =
                        element.animate(
                            [
                                {
                                    opacity:
                                        1,

                                    transform:
                                        "translateY(0)"
                                },

                                {
                                    opacity:
                                        0,

                                    transform:
                                        "translateY(-8px)"
                                }
                            ],
                            {
                                duration:
                                    220,

                                easing:
                                    "cubic-bezier(0.4,0,1,1)",

                                fill:
                                    "forwards"
                            }
                        );


                    await leave.finished;

                    leave.cancel();


                    element.textContent =
                        words[
                            index
                        ];


                    const enter =
                        element.animate(
                            [
                                {
                                    opacity:
                                        0,

                                    transform:
                                        "translateY(8px)"
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
                                    340,

                                easing:
                                    "cubic-bezier(0.22,1,0.36,1)",

                                fill:
                                    "forwards"
                            }
                        );


                    await enter.finished;

                    enter.cancel();
                }

                catch {
                    element.textContent =
                        words[
                            index
                        ];
                }

                finally {
                    swapping =
                        false;
                }
            };


        window.setInterval(
            swap,
            2100
        );
    };


    /* =====================================================
       06 · REVEALS SEGUROS
       ===================================================== */

    const initReveals = () => {
        const items =
            $$(
                "[data-reveal]"
            );


        if (
            !items.length ||
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


                            const item =
                                entry.target;


                            item.classList.add(
                                "is-visible"
                            );


                            observer.unobserve(
                                item
                            );


                            window.setTimeout(
                                () => {
                                    item.classList.remove(
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
                    rootMargin:
                        "0px 0px 8% 0px",

                    threshold:
                        0.01
                }
            );


        items.forEach(
            (
                item
            ) => {
                const rect =
                    item
                        .getBoundingClientRect();


                /*
                 * Solo preparamos elementos
                 * claramente por debajo.
                 */

                if (
                    rect.top >
                    window.innerHeight +
                    30
                ) {
                    item.classList.add(
                        "reveal-await"
                    );


                    observer.observe(
                        item
                    );
                }
            }
        );
    };


    /* =====================================================
       07 · MAPA DEL PORTFOLIO
       ===================================================== */

    const initPortfolioMap = () => {
        const map =
            $(
                "[data-portfolio-map]"
            );


        if (!map) {
            return;
        }


        const nodes =
            $$(
                "[data-map-node]",
                map
            );


        const outputTitle =
            $(
                "[data-map-output-title]",
                map
            );


        const outputCopy =
            $(
                "[data-map-output-copy]",
                map
            );


        if (!nodes.length) {
            return;
        }


        const activate =
            (
                node
            ) => {
                const key =
                    node.dataset
                        .mapNode;


                if (!key) {
                    return;
                }


                map.dataset.activeNode =
                    key;


                nodes.forEach(
                    (
                        current
                    ) => {
                        current.classList.toggle(
                            "is-active",
                            current ===
                            node
                        );
                    }
                );


                if (outputTitle) {
                    outputTitle.textContent =
                        node.dataset
                            .mapTitle ||
                        "";
                }


                if (outputCopy) {
                    outputCopy.textContent =
                        node.dataset
                            .mapCopy ||
                        "";
                }
            };


        nodes.forEach(
            (
                node
            ) => {
                node.addEventListener(
                    "pointerenter",
                    () => {
                        activate(
                            node
                        );
                    }
                );


                node.addEventListener(
                    "focus",
                    () => {
                        activate(
                            node
                        );
                    }
                );


                node.addEventListener(
                    "click",
                    () => {
                        activate(
                            node
                        );
                    }
                );
            }
        );


        const initiallyActive =
            nodes.find(
                (
                    node
                ) =>
                    node.classList.contains(
                        "is-active"
                    )
            ) ||

            nodes.find(
                (
                    node
                ) =>
                    node.dataset
                        .mapNode ===
                    map.dataset
                        .activeNode
            ) ||

            nodes[
                0
            ];


        if (initiallyActive) {
            activate(
                initiallyActive
            );
        }
    };


    /* =====================================================
       08 · PROCESO / TRACE
       ===================================================== */

    const initProcessRoute = () => {
        const section =
            $(
                "[data-process-section]"
            );


        if (!section) {
            return;
        }


        const steps =
            $$(
                "[data-process-step]",
                section
            );


        let ticking =
            false;


        const update =
            () => {
                const rect =
                    section
                        .getBoundingClientRect();


                const start =
                    window.innerHeight *
                    0.76;


                const distance =
                    rect.height +
                    window.innerHeight *
                    0.28;


                const progress =
                    clamp(
                        (
                            start -
                            rect.top
                        ) /
                        distance,
                        0,
                        1
                    );


                section.style.setProperty(
                    "--route-progress",
                    progress.toFixed(
                        4
                    )
                );


                steps.forEach(
                    (
                        step,
                        index
                    ) => {
                        const threshold =
                            index /
                            Math.max(
                                steps.length -
                                1,
                                1
                            );


                        step.classList.toggle(
                            "is-active",
                            progress >=
                            threshold *
                            0.82
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
                passive:
                    true
            }
        );


        window.addEventListener(
            "resize",
            requestUpdate
        );
    };


    /* =====================================================
       09 · FOTO HERO · PROFUNDIDAD MUY SUAVE
       ===================================================== */

    const initHeroPointer = () => {
        if (
            motionOff() ||
            !finePointer.matches
        ) {
            return;
        }


        const frame =
            $(
                ".hero-photo__frame"
            );


        const image =
            $(
                ".hero-photo__image"
            );


        if (
            !frame ||
            !image
        ) {
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
                    `translate3d(
                        ${(x * 3).toFixed(2)}px,
                        ${(y * 3).toFixed(2)}px,
                        0
                    ) scale(1.006)`;
            }
        );


        frame.addEventListener(
            "pointerleave",
            () => {
                image.style.transform =
                    "";
            }
        );
    };


    /* =====================================================
       10 · FONDO DE RED ANIMADO
       ===================================================== */

    const initNetworkBackground = () => {
        const canvas =
            $(
                "[data-network-background]"
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


        const baseNodes = [
            [0.04, 0.18],
            [0.14, 0.34],
            [0.09, 0.71],
            [0.21, 0.83],
            [0.31, 0.19],
            [0.39, 0.52],
            [0.47, 0.76],
            [0.56, 0.23],
            [0.64, 0.44],
            [0.69, 0.81],
            [0.77, 0.13],
            [0.82, 0.59],
            [0.91, 0.32],
            [0.96, 0.74]
        ];


        const connections = [
            [0, 1],
            [0, 4],
            [1, 5],
            [2, 3],
            [2, 5],
            [3, 6],
            [4, 5],
            [4, 7],
            [5, 6],
            [5, 8],
            [6, 9],
            [7, 8],
            [7, 10],
            [8, 9],
            [8, 11],
            [10, 12],
            [11, 12],
            [11, 13],
            [12, 13]
        ];


        let width =
            0;


        let height =
            0;


        let dpr =
            1;


        let frame =
            null;


        let pointerX =
            0;


        let pointerY =
            0;


        let cyan =
            "#058eae";


        let line =
            "rgba(20,53,68,.11)";


        const readColors =
            () => {
                const style =
                    getComputedStyle(
                        root
                    );


                cyan =
                    style
                        .getPropertyValue(
                            "--cyan"
                        )
                        .trim() ||
                    cyan;


                line =
                    style
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


        const getNodes =
            (
                time
            ) =>
                baseNodes.map(
                    (
                        [
                            x,
                            y
                        ],
                        index
                    ) => {
                        const motion =
                            motionOff()
                                ? 0
                                : 1;


                        const driftX =
                            Math.sin(
                                time *
                                0.00012 +
                                index *
                                0.8
                            ) *
                            7 *
                            motion;


                        const driftY =
                            Math.cos(
                                time *
                                0.0001 +
                                index *
                                0.7
                            ) *
                            5 *
                            motion;


                        const pointerFactor =
                            finePointer.matches
                                ? 1
                                : 0;


                        return {
                            x:
                                x *
                                width +
                                driftX +
                                pointerX *
                                (
                                    index %
                                    3
                                ) *
                                0.7 *
                                pointerFactor,

                            y:
                                y *
                                height +
                                driftY +
                                pointerY *
                                (
                                    index %
                                    2
                                ) *
                                0.5 *
                                pointerFactor
                        };
                    }
                );


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


                const nodes =
                    getNodes(
                        time
                    );


                connections.forEach(
                    (
                        [
                            from,
                            to
                        ],
                        index
                    ) => {
                        const start =
                            nodes[
                                from
                            ];


                        const end =
                            nodes[
                                to
                            ];


                        if (
                            !start ||
                            !end
                        ) {
                            return;
                        }


                        context.beginPath();


                        context.moveTo(
                            start.x,
                            start.y
                        );


                        context.lineTo(
                            end.x,
                            end.y
                        );


                        context.strokeStyle =
                            index %
                            5 ===
                            0
                                ? cyan
                                : line;


                        context.globalAlpha =
                            index %
                            5 ===
                            0
                                ? 0.10
                                : 0.34;


                        context.lineWidth =
                            1;


                        context.stroke();
                    }
                );


                nodes.forEach(
                    (
                        node,
                        index
                    ) => {
                        context.beginPath();


                        context.arc(
                            node.x,
                            node.y,
                            index %
                            4 ===
                            0
                                ? 2
                                : 1.25,
                            0,
                            Math.PI *
                            2
                        );


                        context.fillStyle =
                            index %
                            4 ===
                            0
                                ? cyan
                                : line;


                        context.globalAlpha =
                            index %
                            4 ===
                            0
                                ? 0.45
                                : 0.5;


                        context.fill();
                    }
                );


                context.globalAlpha =
                    1;


                if (
                    !motionOff()
                ) {
                    frame =
                        window.requestAnimationFrame(
                            draw
                        );
                }

                else {
                    frame =
                        null;
                }
            };


        const pointerMove =
            (
                event
            ) => {
                pointerX =
                    (
                        event.clientX /
                        window.innerWidth -
                        0.5
                    ) *
                    8;


                pointerY =
                    (
                        event.clientY /
                        window.innerHeight -
                        0.5
                    ) *
                    8;
            };


        const handleResize =
            () => {
                resize();


                if (
                    motionOff()
                ) {
                    draw();
                }
            };


        readColors();

        resize();

        draw();


        window.addEventListener(
            "resize",
            handleResize
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
            () => {
                readColors();


                if (
                    motionOff()
                ) {
                    draw();
                }
            }
        );


        document.addEventListener(
            "visibilitychange",
            () => {
                if (
                    document.hidden &&
                    frame
                ) {
                    window.cancelAnimationFrame(
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
                        window.requestAnimationFrame(
                            draw
                        );
                }
            }
        );
    };


    /* =====================================================
       11 · ENTRADA INICIAL DEL HERO
       ===================================================== */

    const initHeroEntrance = () => {
        if (
            motionOff() ||
            typeof Element.prototype.animate !==
            "function"
        ) {
            return;
        }


        const elements = [
            $(".hero__role"),
            $(".hero__title"),
            $(".hero__statement"),
            $(".hero__personal"),
            $(".hero__actions")
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
                            80 +
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


        const visual =
            $(
                ".hero__visual"
            );


        if (visual) {
            visual.animate(
                [
                    {
                        opacity:
                            0.45,

                        transform:
                            "translateX(15px)"
                    },

                    {
                        opacity:
                            1,

                        transform:
                            "translateX(0)"
                    }
                ],
                {
                    duration:
                        900,

                    delay:
                        190,

                    easing:
                        "cubic-bezier(0.22,1,0.36,1)",

                    fill:
                        "both"
                }
            );
        }
    };


    /* =====================================================
       12 · INIT
       ===================================================== */

    const init = () => {

        initRotatingWord();

        initPortfolioMap();

        initProcessRoute();

        initHeroPointer();

        initNetworkBackground();

        initHeroEntrance();

        initReveals();
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