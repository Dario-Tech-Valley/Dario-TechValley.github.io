(() => {
    "use strict";


    /* =========================================================
       CONTACTO · DARÍO NIETO LORENTE
       OPEN CHANNEL / CONTACT ENDPOINT
       ========================================================= */


    /* =========================================================
       01 · BASE
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


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    const systemDark =
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        );



    /* =========================================================
       02 · SAFE STORAGE
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

                /* Continúa sin almacenamiento. */

            }

        };



    /* =========================================================
       03 · THEME
       ========================================================= */

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
                saved === "dark" ||
                saved === "light"

                    ? saved

                    : systemDark.matches

                        ? "dark"

                        : "light";


            const updateLabel =
                () => {

                    if (!toggle) {

                        return;

                    }


                    toggle.setAttribute(

                        "aria-label",

                        root.dataset.theme === "dark"

                            ? "Activar modo claro"

                            : "Activar modo oscuro"

                    );

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


                    updateLabel();


                    window.dispatchEvent(

                        new CustomEvent(
                            "dnl:themechange"
                        )

                    );

                };


            applyTheme(
                initial,
                false
            );


            toggle?.addEventListener(

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
                        "Escape"
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
                        920
                    ) {

                        setOpen(
                            false
                        );

                    }

                }

            );

        };



    /* =========================================================
       05 · CURRENT YEAR
       ========================================================= */

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



    /* =========================================================
       06 · COPY EMAIL
       ========================================================= */

    const initCopyEmail =
        () => {

            const buttons =
                $$(
                    "[data-copy-email]"
                );


            if (
                !buttons.length
            ) {

                return;

            }


            const fallbackCopy =
                (
                    text
                ) => {

                    const input =
                        document.createElement(
                            "textarea"
                        );


                    input.value =
                        text;


                    input.setAttribute(
                        "readonly",
                        ""
                    );


                    input.style.position =
                        "fixed";


                    input.style.opacity =
                        "0";


                    input.style.pointerEvents =
                        "none";


                    document.body.appendChild(
                        input
                    );


                    input.select();


                    input.setSelectionRange(
                        0,
                        input.value.length
                    );


                    let success =
                        false;


                    try {

                        success =
                            document.execCommand(
                                "copy"
                            );

                    }

                    catch {

                        success =
                            false;

                    }


                    input.remove();


                    return success;

                };


            const copyText =
                async (
                    text
                ) => {

                    if (
                        navigator.clipboard &&
                        window.isSecureContext
                    ) {

                        try {

                            await navigator.clipboard.writeText(
                                text
                            );


                            return true;

                        }

                        catch {

                            return fallbackCopy(
                                text
                            );

                        }

                    }


                    return fallbackCopy(
                        text
                    );

                };


            buttons.forEach(

                (
                    button
                ) => {

                    const label =
                        $(
                            "[data-copy-label]",
                            button
                        );


                    let timer =
                        null;


                    button.addEventListener(

                        "click",

                        async () => {

                            const email =
                                button.dataset.copyEmail;


                            if (!email) {

                                return;

                            }


                            const success =
                                await copyText(
                                    email
                                );


                            if (
                                timer
                            ) {

                                window.clearTimeout(
                                    timer
                                );

                            }


                            if (
                                success
                            ) {

                                button.classList.add(
                                    "is-copied"
                                );


                                if (label) {

                                    label.textContent =
                                        "COPIED ✓";

                                }


                                button.setAttribute(
                                    "aria-label",
                                    "Correo copiado"
                                );


                                timer =
                                    window.setTimeout(

                                        () => {

                                            button.classList.remove(
                                                "is-copied"
                                            );


                                            if (label) {

                                                label.textContent =
                                                    "COPY";

                                            }


                                            button.setAttribute(
                                                "aria-label",
                                                "Copiar dirección de correo electrónico"
                                            );

                                        },

                                        2200

                                    );

                            }

                            else {

                                if (label) {

                                    label.textContent =
                                        "ERROR";

                                }


                                timer =
                                    window.setTimeout(

                                        () => {

                                            if (label) {

                                                label.textContent =
                                                    "COPY";

                                            }

                                        },

                                        1600

                                    );

                            }

                        }

                    );

                }

            );

        };



    /* =========================================================
       07 · HERO ENTRANCE
       ========================================================= */

    const initHero =
        () => {

            if (
                reducedMotion.matches ||
                typeof Element.prototype.animate !==
                    "function"
            ) {

                return;

            }


            const elements = [

                $(".contact-status"),

                $(".contact-hero .section-code"),

                $(".contact-hero h1"),

                $(".contact-hero__lead"),

                $(".contact-hero__text"),

                $(".primary-channel")

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
                                opacity: 0.15,

                                transform:
                                    "translateY(14px)"
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
                                80 +
                                index *
                                    85,

                            easing:
                                "cubic-bezier(0.22,1,0.36,1)",

                            fill:
                                "both"
                        }

                    );

                }

            );


            const identity =
                $(
                    ".contact-identity"
                );


            identity?.animate(

                [
                    {
                        opacity: 0.2,

                        transform:
                            "translateX(18px)"
                    },

                    {
                        opacity: 1,

                        transform:
                            "translateX(0)"
                    }
                ],

                {
                    duration: 950,

                    delay: 170,

                    easing:
                        "cubic-bezier(0.22,1,0.36,1)",

                    fill:
                        "both"
                }

            );

        };



    /* =========================================================
       08 · SAFE REVEALS
       ========================================================= */

    const initReveals =
        () => {

            const elements =
                $$(
                    "[data-reveal]"
                );


            if (
                !elements.length ||
                reducedMotion.matches ||
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


                    /*
                     * Igual que en el resto del portfolio:
                     * el contenido empieza visible.
                     *
                     * Solo se prepara para reveal si está
                     * claramente por debajo del viewport.
                     */

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



    /* =========================================================
       09 · CHANNEL ROUTER
       ========================================================= */

    const initChannelRouter =
        () => {

            const router =
                $(
                    "[data-channel-router]"
                );


            if (!router) {

                return;

            }


            const channels =
                $$(
                    "[data-contact-channel]",
                    router
                );


            const connectionMap = {

                "contact-channel--email":
                    $(".connection--email", router),

                "contact-channel--linkedin":
                    $(".connection--linkedin", router),

                "contact-channel--youtube":
                    $(".connection--youtube", router),

                "contact-channel--cv":
                    $(".connection--cv", router)

            };


            const core =
                $(
                    ".channel-router__avatar",
                    router
                );


            const getConnection =
                (
                    channel
                ) => {

                    const className =
                        Object.keys(
                            connectionMap
                        )
                            .find(

                                (
                                    key
                                ) =>
                                    channel.classList.contains(
                                        key
                                    )

                            );


                    return className

                        ? connectionMap[
                            className
                        ]

                        : null;

                };


            const activate =
                (
                    channel
                ) => {

                    if (
                        reducedMotion.matches
                    ) {

                        return;

                    }


                    const selectedConnection =
                        getConnection(
                            channel
                        );


                    channels.forEach(

                        (
                            item
                        ) => {

                            item.style.opacity =
                                item === channel

                                    ? "1"

                                    : "0.55";

                        }

                    );


                    Object.values(
                        connectionMap
                    ).forEach(

                        (
                            connection
                        ) => {

                            if (!connection) {

                                return;

                            }


                            connection.style.opacity =
                                connection ===
                                selectedConnection

                                    ? "1"

                                    : "0.18";

                        }

                    );


                    if (
                        selectedConnection
                    ) {

                        selectedConnection.style.filter =
                            "drop-shadow(0 0 5px var(--cyan))";

                    }


                    if (core) {

                        core.style.transform =
                            "translate(-50%, -50%) scale(1.06)";


                        core.style.boxShadow =
                            "0 0 0 .55rem var(--cyan-soft)";

                    }

                };


            const reset =
                () => {

                    channels.forEach(

                        (
                            item
                        ) => {

                            item.style.removeProperty(
                                "opacity"
                            );

                        }

                    );


                    Object.values(
                        connectionMap
                    ).forEach(

                        (
                            connection
                        ) => {

                            if (!connection) {

                                return;

                            }


                            connection.style.removeProperty(
                                "opacity"
                            );


                            connection.style.removeProperty(
                                "filter"
                            );

                        }

                    );


                    if (core) {

                        core.style.removeProperty(
                            "transform"
                        );


                        core.style.removeProperty(
                            "box-shadow"
                        );

                    }

                };


            channels.forEach(

                (
                    channel
                ) => {

                    channel.addEventListener(

                        "pointerenter",

                        () => {

                            activate(
                                channel
                            );

                        }

                    );


                    channel.addEventListener(

                        "pointerleave",

                        reset

                    );


                    channel.addEventListener(

                        "focus",

                        () => {

                            activate(
                                channel
                            );

                        }

                    );


                    channel.addEventListener(

                        "blur",

                        reset

                    );

                }

            );

        };



    /* =========================================================
       10 · ROUTER SCROLL ACTIVATION
       ========================================================= */

    const initRouterEntrance =
        () => {

            const router =
                $(
                    "[data-channel-router]"
                );


            if (
                !router ||
                reducedMotion.matches ||
                !(
                    "IntersectionObserver"
                    in window
                )
            ) {

                return;

            }


            const channels =
                $$(
                    "[data-contact-channel]",
                    router
                );


            const observer =
                new IntersectionObserver(

                    (
                        entries
                    ) => {

                        if (
                            !entries.some(
                                (
                                    entry
                                ) =>
                                    entry.isIntersecting
                            )
                        ) {

                            return;

                        }


                        channels.forEach(

                            (
                                channel,
                                index
                            ) => {

                                window.setTimeout(

                                    () => {

                                        if (
                                            typeof channel.animate ===
                                            "function"
                                        ) {

                                            channel.animate(

                                                [
                                                    {
                                                        opacity: 0.25,

                                                        transform:
                                                            "translateY(10px)"
                                                    },

                                                    {
                                                        opacity: 1,

                                                        transform:
                                                            "translateY(0)"
                                                    }
                                                ],

                                                {
                                                    duration: 500,

                                                    easing:
                                                        "cubic-bezier(0.22,1,0.36,1)",

                                                    fill:
                                                        "both"
                                                }

                                            );

                                        }

                                    },

                                    index *
                                        110

                                );

                            }

                        );


                        observer.disconnect();

                    },

                    {
                        threshold: 0.22
                    }

                );


            observer.observe(
                router
            );

        };



    /* =========================================================
       11 · PHOTO MICRO MOTION
       ========================================================= */

    const initPhotoMotion =
        () => {

            const identity =
                $(
                    ".contact-identity"
                );


            const frame =
                $(
                    ".contact-identity__frame",
                    identity
                );


            if (
                !identity ||
                !frame ||
                reducedMotion.matches ||
                !window.matchMedia(
                    "(hover: hover)"
                ).matches
            ) {

                return;

            }


            identity.addEventListener(

                "pointermove",

                (
                    event
                ) => {

                    const rect =
                        identity
                            .getBoundingClientRect();


                    const x =
                        (
                            event.clientX -
                            rect.left
                        )
                        /
                        rect.width
                        -
                        0.5;


                    const y =
                        (
                            event.clientY -
                            rect.top
                        )
                        /
                        rect.height
                        -
                        0.5;


                    frame.style.transform =
                        `
                        perspective(1000px)
                        rotateX(${y * -1.25}deg)
                        rotateY(${x * 1.4}deg)
                        `;

                }

            );


            identity.addEventListener(

                "pointerleave",

                () => {

                    frame.style.removeProperty(
                        "transform"
                    );

                }

            );

        };



    /* =========================================================
       12 · PRIMARY CHANNEL SIGNAL
       ========================================================= */

    const initPrimaryChannel =
        () => {

            const channel =
                $(
                    "[data-primary-channel]"
                );


            if (
                !channel ||
                reducedMotion.matches ||
                typeof Element.prototype.animate !==
                    "function"
            ) {

                return;

            }


            const email =
                $(
                    ".primary-channel__email",
                    channel
                );


            email?.addEventListener(

                "pointerenter",

                () => {

                    channel.animate(

                        [
                            {
                                borderColor:
                                    "var(--line-strong)"
                            },

                            {
                                borderColor:
                                    "var(--cyan)"
                            }
                        ],

                        {
                            duration: 320,

                            easing:
                                "ease-out",

                            fill:
                                "forwards"
                        }

                    );

                }

            );


            email?.addEventListener(

                "pointerleave",

                () => {

                    channel.animate(

                        [
                            {
                                borderColor:
                                    "var(--cyan)"
                            },

                            {
                                borderColor:
                                    "var(--line-strong)"
                            }
                        ],

                        {
                            duration: 450,

                            easing:
                                "ease-out",

                            fill:
                                "forwards"
                        }

                    );

                }

            );

        };



    /* =========================================================
       13 · BACKGROUND
       ========================================================= */

    const initBackground =
        () => {

            const canvas =
                $(
                    "[data-contact-background]"
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


            let green =
                "#23895a";


            let line =
                "rgba(20,53,68,.18)";


            let quiet =
                "rgba(20,53,68,.08)";


            const routes = [

                {
                    startY: 0.17,
                    endY: 0.28,
                    speed: 0.00004,
                    offset: 0.05
                },

                {
                    startY: 0.33,
                    endY: 0.42,
                    speed: 0.000028,
                    offset: 0.48
                },

                {
                    startY: 0.62,
                    endY: 0.53,
                    speed: 0.000034,
                    offset: 0.2
                },

                {
                    startY: 0.81,
                    endY: 0.7,
                    speed: 0.000025,
                    offset: 0.73
                }

            ];



            /* -----------------------------------------
               READ COLORS
               ----------------------------------------- */

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
                            .trim()
                        ||
                        cyan;


                    green =
                        styles
                            .getPropertyValue(
                                "--green"
                            )
                            .trim()
                        ||
                        green;


                    line =
                        styles
                            .getPropertyValue(
                                "--line-strong"
                            )
                            .trim()
                        ||
                        line;


                    quiet =
                        styles
                            .getPropertyValue(
                                "--line"
                            )
                            .trim()
                        ||
                        quiet;

                };



            /* -----------------------------------------
               RESIZE
               ----------------------------------------- */

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



            /* -----------------------------------------
               CURVED PATH
               ----------------------------------------- */

            const routePoint =
                (
                    route,
                    progress
                ) => {

                    const startX =
                        -70;


                    const endX =
                        width +
                        70;


                    const startY =
                        height *
                        route.startY;


                    const endY =
                        height *
                        route.endY;


                    const control1X =
                        width *
                        0.33;


                    const control2X =
                        width *
                        0.67;


                    const control1Y =
                        startY +
                        (
                            endY -
                            startY
                        )
                        *
                        0.15;


                    const control2Y =
                        endY -
                        (
                            endY -
                            startY
                        )
                        *
                        0.15;


                    const t =
                        progress;


                    const oneMinus =
                        1 -
                        t;


                    const x =

                        oneMinus ** 3 *
                            startX

                        +

                        3 *
                        oneMinus ** 2 *
                        t *
                        control1X

                        +

                        3 *
                        oneMinus *
                        t ** 2 *
                        control2X

                        +

                        t ** 3 *
                        endX;


                    const y =

                        oneMinus ** 3 *
                            startY

                        +

                        3 *
                        oneMinus ** 2 *
                        t *
                        control1Y

                        +

                        3 *
                        oneMinus *
                        t ** 2 *
                        control2Y

                        +

                        t ** 3 *
                        endY;


                    return {
                        x,
                        y
                    };

                };



            /* -----------------------------------------
               DRAW
               ----------------------------------------- */

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


                    routes.forEach(

                        (
                            route,
                            index
                        ) => {

                            const startX =
                                -70;


                            const endX =
                                width +
                                70;


                            const startY =
                                height *
                                route.startY;


                            const endY =
                                height *
                                route.endY;


                            context.beginPath();


                            context.moveTo(
                                startX,
                                startY
                            );


                            context.bezierCurveTo(

                                width *
                                    0.33,

                                startY +
                                    (
                                        endY -
                                        startY
                                    )
                                    *
                                    0.15,

                                width *
                                    0.67,

                                endY -
                                    (
                                        endY -
                                        startY
                                    )
                                    *
                                    0.15,

                                endX,
                                endY

                            );


                            context.strokeStyle =
                                line;


                            context.globalAlpha =
                                0.13;


                            context.lineWidth =
                                1;


                            context.stroke();



                            /* ---------------------------------
                               STATIC NODES
                               --------------------------------- */

                            [
                                0.18,
                                0.5,
                                0.82
                            ].forEach(

                                (
                                    position,
                                    nodeIndex
                                ) => {

                                    const point =
                                        routePoint(
                                            route,
                                            position
                                        );


                                    context.beginPath();


                                    context.arc(
                                        point.x,
                                        point.y,
                                        nodeIndex ===
                                            1

                                            ? 1.7

                                            : 1.2,
                                        0,
                                        Math.PI *
                                            2
                                    );


                                    context.fillStyle =
                                        quiet;


                                    context.globalAlpha =
                                        0.28;


                                    context.fill();

                                }

                            );



                            /* ---------------------------------
                               MOVING PACKET
                               --------------------------------- */

                            const progress =
                                (
                                    route.offset
                                    +
                                    time *
                                    route.speed
                                )
                                %
                                1;


                            const point =
                                routePoint(
                                    route,
                                    progress
                                );


                            context.beginPath();


                            context.arc(
                                point.x,
                                point.y,
                                index === 0
                                    ? 2
                                    : 1.6,
                                0,
                                Math.PI *
                                    2
                            );


                            context.fillStyle =
                                index ===
                                    routes.length -
                                    1

                                    ? green

                                    : cyan;


                            context.globalAlpha =
                                0.32;


                            context.fill();

                        }

                    );


                    /*
                     * Endpoint central sutil.
                     */

                    context.beginPath();


                    context.arc(
                        width *
                            0.5,
                        height *
                            0.5,
                        2.1,
                        0,
                        Math.PI *
                            2
                    );


                    context.fillStyle =
                        cyan;


                    context.globalAlpha =
                        0.18;


                    context.fill();


                    context.globalAlpha =
                        1;


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


                        frame =
                            null;

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



    /* =========================================================
       14 · INIT
       ========================================================= */

    const init =
        () => {

            initCopyEmail();

            initHero();

            initReveals();

            initChannelRouter();

            initRouterEntrance();

            initPhotoMotion();

            initPrimaryChannel();

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