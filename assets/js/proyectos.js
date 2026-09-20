(() => {
    "use strict";


    /* =========================================================
       PROYECTOS · DARÍO NIETO LORENTE
       PROJECT ARCHIVE / TECHNICAL LAB
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


    const normalizeText =
        (
            value = ""
        ) =>
            String(value)
                .normalize("NFD")
                .replace(
                    /[\u0300-\u036f]/g,
                    ""
                )
                .toLowerCase()
                .trim();



    /* =========================================================
       02 · PROJECT DATABASE
       ========================================================= */

    const PROJECTS = {

        /* =====================================================
           DESTACADOS
           ===================================================== */

        "cableado": {
            symbol: "SCS",
            code: "FEATURED / NETWORK_DESIGN",

            summary:
                "Proyecto compuesto de cableado estructurado que reúne contenido técnico, planos, armarios, planificación, presupuesto y matriz de conexionado.",

            context:
                "Proyecto académico planteado como una instalación completa de infraestructura de red.",

            objective:
                "Diseñar y documentar una solución de cableado estructurado desde la parte técnica hasta la planificación y entrega.",

            tags: [
                "Cableado estructurado",
                "Planos",
                "Armarios",
                "Gantt",
                "Presupuesto",
                "Matriz de conexionado"
            ],

            evidence:
                "Proyecto compuesto · ZIP"
        },


        "prueba-final": {
            symbol: "SMR",
            code: "FEATURED / SYSTEM_INTEGRATION",

            summary:
                "Entorno virtualizado con Ubuntu Server como núcleo, Windows Server como servidor complementario y Windows 10 como cliente para integrar varios servicios de red.",

            context:
                "Proyecto final de SMR orientado a reunir en una misma infraestructura los principales servicios trabajados durante el curso.",

            objective:
                "Construir un entorno funcional y verificar la integración de DNS, dominio, DHCP, enrutamiento, Apache y otros servicios.",

            tags: [
                "Ubuntu Server",
                "Windows Server",
                "Windows 10",
                "DNS",
                "AD DC",
                "DHCP",
                "Apache",
                "Routing"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "lvm": {
            symbol: "LVM",
            code: "FEATURED / STORAGE",

            summary:
                "Laboratorio de Logical Volume Manager en GNU/Linux: Desde los dispositivos físicos hasta grupos y volúmenes lógicos, incluyendo operaciones avanzadas.",

            context:
                "Práctica de administración de almacenamiento flexible en Linux.",

            objective:
                "Gestionar el ciclo de vida de almacenamiento LVM y comprobar redimensionado, snapshots y migración de datos.",

            tags: [
                "Linux",
                "PV",
                "VG",
                "LV",
                "Snapshots",
                "Resize",
                "Migration"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "raid": {
            symbol: "RAID",
            code: "FEATURED / STORAGE",

            summary:
                "Laboratorio de almacenamiento avanzado en Windows Server con configuraciones RAID y volúmenes dinámicos.",

            context:
                "Práctica de administración de discos orientada a rendimiento, capacidad y tolerancia a fallos.",

            objective:
                "Implementar y comparar RAID 0, RAID 1, RAID 5 y volúmenes distribuidos, observando el comportamiento de cada configuración.",

            tags: [
                "Windows Server",
                "RAID 0",
                "RAID 1",
                "RAID 5",
                "Parity",
                "Dynamic disks"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "routers-linux-anillo": {
            symbol: "RTR",
            code: "FEATURED / ROUTING",

            summary:
                "Infraestructura virtualizada con tres routers Linux en anillo y tres subredes cliente conectadas mediante encaminamiento estático.",

            context:
                "Laboratorio de routing en GNU/Linux con topología redundante de tres routers.",

            objective:
                "Configurar Netplan e IP forwarding y analizar conectividad, rutas y trayectorias multi-hop con ping y traceroute.",

            tags: [
                "Linux",
                "Netplan",
                "Static routing",
                "IP forwarding",
                "Ping",
                "Traceroute"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },



        /* =====================================================
           REDES
           ===================================================== */

        "linux-network": {
            symbol: "NET",
            code: "REDES / LINUX",

            summary:
                "Práctica sobre administración de interfaces de red en Ubuntu, trabajando tanto con entornos Desktop como Server.",

            context:
                "Laboratorio de configuración de red en Linux.",

            objective:
                "Comprender distintos métodos de administración de interfaces y comprobar su configuración desde línea de comandos.",

            tags: [
                "Ubuntu",
                "Netplan",
                "ip",
                "ifconfig",
                "TCP/IP"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "dns": {
            symbol: "DNS",
            code: "REDES / SERVICES",

            summary:
                "Implementación de DNS en Ubuntu con zonas directas e inversas, zona secundaria en Windows y delegación de subdominio.",

            context:
                "Práctica de servicios de red en un entorno Linux/Windows.",

            objective:
                "Configurar resolución de nombres, transferencias de zona y registros DNS, comprobando el funcionamiento entre servidores.",

            tags: [
                "DNS",
                "Ubuntu",
                "Windows Server",
                "Zone transfer",
                "SOA",
                "NS",
                "A",
                "PTR",
                "CNAME",
                "MX"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "ics": {
            symbol: "ICS",
            code: "REDES / SHARING",

            summary:
                "Arquitectura en la que un equipo Windows actúa como gateway para proporcionar acceso a Internet a un cliente Linux.",

            context:
                "Laboratorio de interoperabilidad Windows/Linux en entorno virtualizado.",

            objective:
                "Activar ICS, gestionar dos interfaces de red y validar direccionamiento, routing y resolución DNS desde el cliente.",

            tags: [
                "Windows",
                "Linux",
                "ICS",
                "Gateway",
                "DHCP",
                "ICMP"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "wlan": {
            symbol: "WLAN",
            code: "REDES / WIRELESS",

            summary:
                "Configuración de redes inalámbricas en modo Ad-Hoc y modo infraestructura, incluyendo la gestión del router.",

            context:
                "Práctica de fundamentos WLAN.",

            objective:
                "Aplicar los conceptos de redes inalámbricas creando y verificando dos modelos diferentes de conexión.",

            tags: [
                "WLAN",
                "Ad-Hoc",
                "IBSS",
                "Infrastructure",
                "Router",
                "Wi-Fi"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "routers-win": {
            symbol: "RRAS",
            code: "REDES / ROUTING",

            summary:
                "Windows Server 2022 configurado como router software mediante RRAS para comunicar dos subredes con clientes Windows 10.",

            context:
                "Laboratorio de routing virtualizado dentro del ecosistema Windows.",

            objective:
                "Habilitar el encaminamiento entre redes aisladas mediante interfaces y tablas de routing correctamente configuradas.",

            tags: [
                "Windows Server 2022",
                "RRAS",
                "Windows 10",
                "Routing",
                "IPv4"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "vlans": {
            symbol: "VLAN",
            code: "REDES / SWITCHING",

            summary:
                "Práctica progresiva de creación de VLANs, ampliada a varios equipos y switches.",

            context:
                "Laboratorio de segmentación lógica en red con switches gestionables.",

            objective:
                "Crear VLANs, comunicar la infraestructura planificada y comprobar puertos y direcciones MAC aprendidas.",

            tags: [
                "VLAN",
                "Switching",
                "MAC",
                "Segmentation",
                "Switches"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "ping-arp": {
            symbol: "ARP",
            code: "REDES / ANALYSIS",

            summary:
                "Análisis de comunicación local mediante ping, ARP y captura de tráfico para relacionar direccionamiento IP y MAC.",

            context:
                "Laboratorio de diagnóstico y observación de tráfico de red.",

            objective:
                "Visualizar cómo los equipos descubren vecinos y mantienen sus tablas ARP mientras se realizan pruebas de conectividad.",

            tags: [
                "Ping",
                "ARP",
                "Wireshark",
                "ICMP",
                "IP",
                "MAC"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "mirroring-puertos": {
            symbol: "SPAN",
            code: "REDES / SWITCHING",

            summary:
                "Configuración de puertos de switch y observación del tráfico de red mediante técnicas de monitorización.",

            context:
                "Práctica de switching y análisis con Wireshark.",

            objective:
                "Administrar puertos, trabajar con aprendizaje MAC y capturar tráfico ICMP y HTTP para estudiar su comportamiento.",

            tags: [
                "Switch",
                "Port mirroring",
                "Wireshark",
                "MAC",
                "ICMP",
                "HTTP"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "compartir-win": {
            symbol: "SMB",
            code: "REDES / FILE_SHARING",

            summary:
                "Práctica de conexión y compartición de archivos entre Windows, smartphone y Linux.",

            context:
                "Laboratorio de interoperabilidad y transferencia de ficheros entre distintos dispositivos y sistemas.",

            objective:
                "Comprobar varios métodos de compartición, incluyendo enlaces Windows-Windows, Samba/SMB y SFTP.",

            tags: [
                "Windows",
                "Linux",
                "SMB",
                "Samba",
                "SFTP",
                "File sharing"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "opendns": {
            symbol: "ODNS",
            code: "REDES / DNS_SECURITY",

            summary:
                "Implementación de protección de navegación mediante OpenDNS y validación del filtrado por categorías y dominios.",

            context:
                "Laboratorio de control de navegación a nivel DNS.",

            objective:
                "Comparar OpenDNS Family Shield y Home Internet Security y comprobar el bloqueo mediante redirección DNS.",

            tags: [
                "OpenDNS",
                "DNS filtering",
                "Family Shield",
                "Security"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "sniffers": {
            symbol: "PCAP",
            code: "REDES / TRAFFIC_ANALYSIS",

            summary:
                "Práctica centrada en el uso de sniffers para observar y analizar tráfico de red.",

            context:
                "Laboratorio de captura de paquetes y análisis de comunicaciones.",

            objective:
                "Capturar tráfico y estudiar protocolos y comportamiento de red mediante herramientas de análisis.",

            tags: [
                "Wireshark",
                "tcpdump",
                "Packets",
                "TCP",
                "UDP",
                "Traffic analysis"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "trunks-puertos": {
            symbol: "TRK",
            code: "REDES / SWITCHING",

            summary:
                "Configuración y estudio de enlaces trunk entre switches para transportar tráfico perteneciente a varias VLANs.",

            context:
                "Práctica realizada sobre dos switches y una planificación compartida de puertos y VLANs.",

            objective:
                "Configurar trunks con distintos métodos y verificar el funcionamiento de VLANs a través de los enlaces.",

            tags: [
                "Trunk",
                "VLAN",
                "Switches",
                "Switching"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "dhcp": {
            symbol: "DHCP",
            code: "REDES / SERVICES",

            summary:
                "Servidor DHCP sobre Ubuntu que entrega configuración de red a un cliente Windows y gestiona concesiones y reservas.",

            context:
                "Laboratorio de asignación dinámica de direcciones en una red Linux/Windows.",

            objective:
                "Crear un ámbito DHCP, entregar parámetros de red y comprobar renovación, concesiones y reservas.",

            tags: [
                "DHCP",
                "Ubuntu",
                "Windows",
                "Lease",
                "Reservation",
                "DNS",
                "Gateway"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "dlna": {
            symbol: "DLNA",
            code: "REDES / MEDIA",

            summary:
                "Instalación y prueba de servidores multimedia en Windows y Linux junto al streaming DLNA nativo de Windows.",

            context:
                "Laboratorio de servicios multimedia en red.",

            objective:
                "Comprender, instalar y verificar distintos servidores multimedia compatibles con DLNA.",

            tags: [
                "DLNA",
                "Windows",
                "Linux",
                "Media server",
                "Streaming"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "routers-win-linux": {
            symbol: "W/L",
            code: "REDES / MIXED_ROUTING",

            summary:
                "Práctica de routing combinando sistemas Windows y Linux dentro de una misma infraestructura virtual.",

            context:
                "Laboratorio heterogéneo de encaminamiento entre subredes.",

            objective:
                "Conseguir tránsito entre redes mediante routing en Windows y Linux y verificar la interoperabilidad entre ambos sistemas.",

            tags: [
                "Windows Server",
                "Linux",
                "RRAS",
                "Netplan",
                "IP forwarding",
                "Routing"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "network-latency": {
            symbol: "MS",
            code: "REDES / MONITORING",

            summary:
                "Monitorización de conexiones TCP y latencia, consumo de ancho de banda, filtros por puerto, geolocalización y exportación de resultados.",

            context:
                "Práctica de análisis de red en Windows con una comprobación adicional en Linux.",

            objective:
                "Medir y observar el comportamiento de las conexiones utilizando varias herramientas de monitorización.",

            tags: [
                "NetworkLatencyView",
                "IPNetInfo",
                "WinPcap",
                "AppNetworkCounter",
                "TCP",
                "Latency"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "apache-video": {
            symbol: "▶",
            code: "REDES / VIDEO",

            summary:
                "Práctica de Apache presentada en formato vídeo y publicada en YouTube.",

            context:
                "Evidencia audiovisual de una práctica técnica relacionada con servidor web Apache.",

            objective:
                "Documentar el proceso en un formato distinto a la memoria escrita y explicar visualmente la práctica.",

            tags: [
                "Apache",
                "Web server",
                "Video",
                "YouTube"
            ],

            evidence:
                "Vídeo · YouTube"
        },


        "cli-ip-vlan": {
            symbol: "CLI",
            code: "REDES / LINUX_CLI",

            summary:
                "Administración TCP/IP desde línea de comandos en Ubuntu Server, trabajando utilidades clásicas y herramientas actuales.",

            context:
                "Laboratorio de configuración de red desde CLI en Linux.",

            objective:
                "Dominar tareas de direccionamiento y administración de red mediante net-tools, iproute2 y configuración de VLAN.",

            tags: [
                "Ubuntu Server",
                "CLI",
                "net-tools",
                "iproute2",
                "IPv4",
                "VLAN"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "ssmtp-cli": {
            symbol: "SMTP",
            code: "REDES / MAIL",

            summary:
                "Envío de correo desde shell en Linux mediante sSMTP y estudio del flujo básico de un servicio de correo.",

            context:
                "Práctica de servicios de red desde línea de comandos.",

            objective:
                "Configurar el envío de mensajes desde Linux y comprender los elementos implicados en SMTP.",

            tags: [
                "Linux",
                "sSMTP",
                "SMTP",
                "CLI",
                "Mail"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "netcat": {
            symbol: "NC",
            code: "REDES / TOOLS",

            summary:
                "Estudio práctico de Netcat en Linux y Windows para comunicaciones, transferencia de archivos y pruebas con TCP y UDP.",

            context:
                "Laboratorio de herramientas de red multiplataforma.",

            objective:
                "Utilizar Netcat, medir tiempos de transmisión y emplearlo como base para interactuar con Termbin.",

            tags: [
                "Netcat",
                "Linux",
                "Windows",
                "TCP",
                "UDP",
                "Termbin"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },



        /* =====================================================
           SISTEMAS
           ===================================================== */

        "reset-password-win": {
            symbol: "PASS",
            code: "SISTEMAS / RECOVERY",

            summary:
                "Laboratorio de recuperación offline de una contraseña de Windows utilizando un entorno Ubuntu Live.",

            context:
                "Práctica académica de recuperación y seguridad de sistemas con acceso físico al equipo.",

            objective:
                "Comprender el impacto del acceso físico y documentar un procedimiento de recuperación fuera del sistema operativo instalado.",

            tags: [
                "Windows 7",
                "Ubuntu Live",
                "Recovery",
                "Filesystem",
                "Security"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "gestion-cuentas": {
            symbol: "USR",
            code: "SISTEMAS / USERS",

            summary:
                "Administración de cuentas de usuario en Windows y Linux, diferenciando cuentas, perfiles y elementos de gestión asociados.",

            context:
                "Laboratorio de administración de usuarios en sistemas heterogéneos.",

            objective:
                "Gestionar cuentas y comprender cómo cada sistema organiza identidad, perfiles y acceso.",

            tags: [
                "Windows",
                "Linux",
                "Users",
                "Profiles",
                "Accounts"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "multi-disk": {
            symbol: "DISK",
            code: "SISTEMAS / STORAGE",

            summary:
                "Laboratorio de instalación y administración Linux empleando una estrategia de varios discos y gestión de dispositivos de bloque.",

            context:
                "Práctica de almacenamiento y jerarquía del sistema de archivos Linux.",

            objective:
                "Comprender cómo distribuir el sistema y sus recursos entre varios discos y gestionar el almacenamiento resultante.",

            tags: [
                "Linux",
                "Multi-disk",
                "Block devices",
                "Filesystem",
                "GParted"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "jpg-pdf": {
            symbol: "PDF",
            code: "SISTEMAS / FILES",

            summary:
                "Uso de utilidades Linux para trabajar con PDF: Conversión de imágenes y extracción de información textual.",

            context:
                "Práctica de instalación y uso de software para tratamiento de archivos.",

            objective:
                "Realizar transformaciones entre formatos y procesar el contenido de documentos desde Linux.",

            tags: [
                "Linux",
                "JPG",
                "PDF",
                "Conversion",
                "Text extraction"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "java-win-linux": {
            symbol: "JAVA",
            code: "SISTEMAS / JAVA",

            summary:
                "Configuración y ejecución de aplicaciones Java en Windows y Ubuntu, incluyendo uso de terminal y archivos JAR.",

            context:
                "Laboratorio multiplataforma sobre entorno de ejecución Java.",

            objective:
                "Preparar ambos sistemas para ejecutar aplicaciones Java y comprender la diferencia entre entorno de usuario y desarrollo.",

            tags: [
                "Java",
                "Windows",
                "Ubuntu",
                "JAR",
                "CLI"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "config-red-win-linux": {
            symbol: "NIC",
            code: "SISTEMAS / NETWORK",

            summary:
                "Estandarización de parámetros de red entre Windows 10, Ubuntu Desktop y Ubuntu Server.",

            context:
                "Laboratorio de administración básica de red en varios sistemas operativos.",

            objective:
                "Unificar identificación, direccionamiento y DNS, además de trabajar aspectos de firewall y funciones administrativas de Windows.",

            tags: [
                "Windows 10",
                "Ubuntu",
                "IP",
                "DNS",
                "Firewall",
                "Network bridge"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "permisos": {
            symbol: "RWX",
            code: "SISTEMAS / ACCESS_CONTROL",

            summary:
                "Administración de almacenamiento y control de acceso en Ubuntu y Windows mediante montaje, particiones y permisos.",

            context:
                "Laboratorio de recursos de almacenamiento y seguridad de acceso.",

            objective:
                "Configurar discos, montajes persistentes y permisos para controlar el acceso a datos según la identidad del usuario.",

            tags: [
                "Linux",
                "Windows",
                "Partitions",
                "fstab",
                "Permissions",
                "Access control"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "repair-startup": {
            symbol: "BOOT",
            code: "SISTEMAS / RECOVERY",

            summary:
                "Simulación de un problema de arranque y recuperación de GRUB mediante Ubuntu Live y chroot.",

            context:
                "Laboratorio de diagnóstico y reparación de arranque Windows/Linux.",

            objective:
                "Recuperar el acceso a Ubuntu y documentar el estado de UEFI, Windows BCD y configuración de GRUB.",

            tags: [
                "UEFI",
                "GRUB",
                "Ubuntu Live",
                "chroot",
                "BCD",
                "Recovery"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "virtualizadores": {
            symbol: "VM",
            code: "SISTEMAS / VIRTUALIZATION",

            summary:
                "Instalación de sistemas Windows y Ubuntu utilizando dos plataformas de virtualización distintas.",

            context:
                "Práctica de instalación y organización de sistemas operativos virtualizados.",

            objective:
                "Comparar el proceso de despliegue en VMware y VirtualBox y mantener entornos correctamente identificados.",

            tags: [
                "VMware",
                "VirtualBox",
                "Windows",
                "Ubuntu",
                "Virtualization"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "interior-pc": {
            symbol: "HW",
            code: "SISTEMAS / HARDWARE",

            summary:
                "Presentación dedicada a reconocer el interior de un ordenador y sus componentes.",

            context:
                "Material de hardware dentro de la formación de sistemas microinformáticos.",

            objective:
                "Identificar visualmente los principales elementos internos de un PC y su función dentro del equipo.",

            tags: [
                "Hardware",
                "PC",
                "Components",
                "SMR"
            ],

            evidence:
                "Presentación · PPTX"
        },


        "montaje-superficie": {
            symbol: "PC",
            code: "SISTEMAS / HARDWARE",

            summary:
                "Desmontaje completo de un ordenador funcional, identificación de componentes, montaje en superficie y verificación final.",

            context:
                "Práctica de hardware realizada sobre un equipo de sobremesa.",

            objective:
                "Aprender a montar y desmontar un PC, reconocer sus piezas y comprobar que vuelve a funcionar tras el proceso.",

            tags: [
                "Hardware",
                "PC",
                "Assembly",
                "Troubleshooting"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "git-github": {
            symbol: "GIT",
            code: "SISTEMAS / VERSION_CONTROL",

            summary:
                "Laboratorio de control de versiones distribuido con Git y sincronización remota mediante GitHub.",

            context:
                "Práctica orientada al flujo profesional de cambios y colaboración.",

            objective:
                "Gestionar historial, sincronización y situaciones de desarrollo no lineal como ramas y conflictos.",

            tags: [
                "Git",
                "GitHub",
                "DVCS",
                "Branches",
                "Merge",
                "Version control"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "fdisk-gparted": {
            symbol: "PART",
            code: "SISTEMAS / DISKS",

            summary:
                "Trabajo con fdisk, parted y GParted desde un entorno Live de Ubuntu para administrar discos y particiones.",

            context:
                "Laboratorio de herramientas de particionado y gestión de almacenamiento.",

            objective:
                "Comparar herramientas de consola y gráficas y aplicar operaciones sobre discos desde un entorno Live.",

            tags: [
                "fdisk",
                "parted",
                "GParted",
                "Ubuntu Live",
                "Partitions"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "licencias": {
            symbol: "LIC",
            code: "SISTEMAS / LICENSING",

            summary:
                "Práctica sobre números de serie, versiones, migración de licencias y derechos de autor.",

            context:
                "Laboratorio de gestión y análisis de licencias de software y contenido.",

            objective:
                "Aplicar procedimientos de identificación y migración de licencias y revisar conceptos relacionados con copyright.",

            tags: [
                "Licenses",
                "Serial keys",
                "Migration",
                "Copyright"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "idioma-win-linux": {
            symbol: "LANG",
            code: "SISTEMAS / LOCALIZATION",

            summary:
                "Instalación y comprobación de un idioma adicional en Windows 11, Windows Server, Ubuntu y Ubuntu Server.",

            context:
                "Práctica de localización en sistemas operativos heterogéneos.",

            objective:
                "Administrar paquetes de idioma y validar el cambio de localización en cliente y servidor.",

            tags: [
                "Windows 11",
                "Windows Server",
                "Ubuntu",
                "Ubuntu Server",
                "Language packs"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "upgrade": {
            symbol: "UP",
            code: "SISTEMAS / UPDATES",

            summary:
                "Estudio y ejecución de procesos de actualización en sistemas Windows y Linux, diferenciando update y upgrade.",

            context:
                "Práctica de mantenimiento y evolución de sistemas operativos.",

            objective:
                "Mantener sistemas actualizados y comprender los procedimientos para cambiar de versión con criterios de compatibilidad y seguridad.",

            tags: [
                "Windows",
                "Linux",
                "Update",
                "Upgrade",
                "Maintenance"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },


        "multiboot": {
            symbol: "BOOT",
            code: "SISTEMAS / MULTIBOOT",

            summary:
                "Instalación de Windows y Linux sobre un mismo disco con selección del sistema operativo durante el arranque.",

            context:
                "Laboratorio de particionado e instalación dual.",

            objective:
                "Planificar el espacio, respetar el orden de instalación y obtener un entorno multiboot funcional.",

            tags: [
                "Windows",
                "Linux",
                "Dual boot",
                "Partitions",
                "GRUB"
            ],

            evidence:
                "Memoria técnica · DOCX"
        },



        /* =====================================================
           DESARROLLO
           ===================================================== */

        "capitales": {
            symbol: "PY",
            code: "DESARROLLO / PYTHON",

            summary:
                "Juego interactivo de capitales del mundo desarrollado en Python con interfaz Tkinter, dificultad progresiva, banderas y animaciones.",

            context:
                "Proyecto de programación orientado a combinar lógica de juego e interfaz gráfica.",

            objective:
                "Construir una aplicación interactiva que adapte la dificultad y gestione contenido visual de países y capitales.",

            tags: [
                "Python",
                "Tkinter",
                "GUI",
                "Flags",
                "Animations",
                "Game logic"
            ],

            evidence:
                "Código fuente · PY"
        },


        "html-project": {
            symbol: "HTML",
            code: "DESARROLLO / WEB",

            summary:
                "Proyecto web personal compuesto por varias páginas HTML, recursos multimedia y documentación organizada por fases.",

            context:
                "Proyecto académico de Lenguajes de Marcas construido y documentado de forma progresiva.",

            objective:
                "Desarrollar un sitio multipágina y registrar su evolución desde las primeras fases hasta la versión completa.",

            tags: [
                "HTML",
                "CSS",
                "Multipage",
                "Documentation",
                "Web"
            ],

            evidence:
                "Proyecto completo · ZIP"
        },


        "juego-numeros": {
            symbol: "01",
            code: "DESARROLLO / LOGIC",

            summary:
                "Juego de números presentado como proyecto interactivo en PowerPoint.",

            context:
                "Ejercicio orientado a lógica e interacción dentro de una presentación.",

            objective:
                "Construir una experiencia de juego utilizando recursos y navegación de una presentación.",

            tags: [
                "PowerPoint",
                "Logic",
                "Interaction",
                "Game"
            ],

            evidence:
                "Presentación · PPTX"
        },


        "diagrama-flujo": {
            symbol: "FLOW",
            code: "DESARROLLO / DIAGRAM",

            summary:
                "Diagrama de flujo elaborado en Visio para representar visualmente un proceso lógico.",

            context:
                "Ejercicio de modelado previo a la implementación.",

            objective:
                "Expresar decisiones y secuencias de un proceso mediante una representación gráfica estructurada.",

            tags: [
                "Visio",
                "Flowchart",
                "Logic",
                "Diagram"
            ],

            evidence:
                "Diagrama · VSDX"
        },



        /* =====================================================
           BASES DE DATOS
           ===================================================== */

        "ejercicios-excel": {
            symbol: "XLS",
            code: "BBDD / EXCEL",

            summary:
                "Conjunto de ejercicios desarrollados en Excel como parte del trabajo con datos y hojas de cálculo.",

            context:
                "Práctica académica de tratamiento de información.",

            objective:
                "Aplicar operaciones y organización de datos dentro de hojas de cálculo.",

            tags: [
                "Excel",
                "XLSX",
                "Data",
                "Spreadsheets"
            ],

            evidence:
                "Libro de cálculo · XLSX"
        },


        "referencias-cruzadas": {
            symbol: "DB",
            code: "BBDD / ACCESS",

            summary:
                "Base de datos de Access centrada en consultas de referencias cruzadas.",

            context:
                "Práctica académica de consultas y análisis de información en Microsoft Access.",

            objective:
                "Trabajar la transformación y agrupación de datos mediante consultas cruzadas.",

            tags: [
                "Access",
                "ACCDB",
                "Crosstab query",
                "Database"
            ],

            evidence:
                "Base de datos · ACCDB"
        },


        "der": {
            symbol: "DER",
            code: "BBDD / MODEL",

            summary:
                "Diagrama Entidad-Relación diseñado en Visio como modelo conceptual de una base de datos.",

            context:
                "Ejercicio de modelado previo a la implementación de datos.",

            objective:
                "Representar entidades, atributos y relaciones antes de construir la base de datos.",

            tags: [
                "DER",
                "Visio",
                "Data modeling",
                "Entities",
                "Relations"
            ],

            evidence:
                "Diagrama · VSDX"
        },


        "ejercicios-bbdd": {
            symbol: "DB",
            code: "BBDD / ACCESS",

            summary:
                "Conjunto de ejercicios de bases de datos reunidos en un archivo Microsoft Access.",

            context:
                "Práctica académica de manejo de datos relacionales.",

            objective:
                "Aplicar distintas operaciones de gestión y consulta sobre una base de datos.",

            tags: [
                "Access",
                "ACCDB",
                "Database",
                "Queries"
            ],

            evidence:
                "Base de datos · ACCDB"
        },


        "informes-bbdd": {
            symbol: "RPT",
            code: "BBDD / REPORTS",

            summary:
                "Base de datos de Access dedicada al trabajo con informes.",

            context:
                "Ejercicio académico de presentación estructurada de información desde una base de datos.",

            objective:
                "Diseñar y generar informes a partir de los datos almacenados.",

            tags: [
                "Access",
                "Reports",
                "ACCDB",
                "Database"
            ],

            evidence:
                "Base de datos · ACCDB"
        },


        "factura-moratalaz": {
            symbol: "XLS",
            code: "BBDD / EXCEL",

            summary:
                "Documento de factura desarrollado en Excel como ejercicio de organización y tratamiento de datos.",

            context:
                "Práctica académica aplicada a un documento empresarial.",

            objective:
                "Estructurar información de una factura utilizando una hoja de cálculo.",

            tags: [
                "Excel",
                "Invoice",
                "XLSX",
                "Data"
            ],

            evidence:
                "Libro de cálculo · XLSX"
        },


        "consultas-accion": {
            symbol: "SQL",
            code: "BBDD / ACTION_QUERY",

            summary:
                "Base de datos de Access dedicada a consultas de acción.",

            context:
                "Práctica académica de modificación controlada de datos mediante consultas.",

            objective:
                "Trabajar operaciones que actualizan o transforman conjuntos de registros en Access.",

            tags: [
                "Access",
                "Action queries",
                "ACCDB",
                "Database"
            ],

            evidence:
                "Base de datos · ACCDB"
        },



        /* =====================================================
           CASOS REALES
           ===================================================== */

        "diario-campo": {
            symbol: "ROMA",
            code: "CASO_REAL / ERASMUS",

            summary:
                "Diario de campo de las prácticas Erasmus+ en Roma, con registro diario de tareas, incidencias, soporte y participación en eventos.",

            context:
                "Experiencia profesional en la Universidad Pontificia de la Santa Cruz.",

            objective:
                "Documentar de forma continuada el trabajo realizado y la evolución técnica y personal durante las prácticas.",

            tags: [
                "Roma",
                "Erasmus+",
                "PUSC",
                "IT support",
                "Events",
                "Field diary"
            ],

            evidence:
                "Diario de campo · DOCX"
        },



        /* =====================================================
           DOCUMENTOS
           ===================================================== */

        "anexo-roma": {
            symbol: "PDF",
            code: "DOCUMENTOS / ERASMUS",

            summary:
                "Documento asociado a la estancia Erasmus+ y a las prácticas realizadas en Roma.",

            context:
                "Evidencia documental vinculada a la experiencia internacional.",

            objective:
                "Conservar y presentar la documentación oficial relacionada con la movilidad.",

            tags: [
                "Erasmus+",
                "Roma",
                "Documentación"
            ],

            evidence:
                "Documento · PDF"
        },


        "b2": {
            symbol: "B2",
            code: "DOCUMENTOS / LANGUAGE",

            summary:
                "Certificación documental del nivel B2 de inglés.",

            context:
                "Acreditación lingüística incluida dentro de la formación complementaria.",

            objective:
                "Aportar evidencia del nivel de inglés acreditado.",

            tags: [
                "English",
                "B2",
                "Certificate"
            ],

            evidence:
                "Certificado · PDF"
        },


        "cv": {
            symbol: "CV",
            code: "DOCUMENTOS / PROFILE",

            summary:
                "Currículum Vitae con el resumen de formación, experiencia y capacidades profesionales.",

            context:
                "Documento general de presentación profesional.",

            objective:
                "Reunir en un formato compacto los principales datos del perfil.",

            tags: [
                "CV",
                "Profile",
                "Experience",
                "Education"
            ],

            evidence:
                "Documento · PDF"
        },


        "notas-gm": {
            symbol: "10",
            code: "DOCUMENTOS / ACADEMIC",

            summary:
                "Documento de calificaciones del Grado Medio en Sistemas Microinformáticos y Redes.",

            context:
                "Evidencia académica vinculada a la etapa de SMR.",

            objective:
                "Acreditar los resultados obtenidos durante el Grado Medio.",

            tags: [
                "SMR",
                "Grades",
                "Academic record"
            ],

            evidence:
                "Expediente · PDF"
        }

    };



    /* =========================================================
       03 · STORAGE
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

                /* Continúa sin localStorage. */

            }

        };



    /* =========================================================
       04 · THEME
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



    /* =========================================================
       05 · MOBILE MENU
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

        };



    /* =========================================================
       06 · CURRENT YEAR
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

                $(".projects-hero .section-code"),

                $(".projects-hero h1"),

                $(".projects-hero__lead"),

                ...$$(
                    ".projects-hero__text"
                ),

                $(".projects-hero .action-link")

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
                                opacity: 0.18,

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
                                60 +
                                index *
                                    75,

                            easing:
                                "cubic-bezier(0.22,1,0.36,1)",

                            fill:
                                "both"
                        }

                    );

                }

            );


            const archive =
                $(
                    "[data-archive-index]"
                );


            archive?.animate(

                [
                    {
                        opacity: 0.2,

                        transform:
                            "translateX(15px)"
                    },

                    {
                        opacity: 1,

                        transform:
                            "translateX(0)"
                    }
                ],

                {
                    duration: 950,

                    delay: 150,

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
                     * Solo ocultamos elementos que realmente están
                     * debajo del viewport.
                     *
                     * Así nunca desaparece contenido inicial si el
                     * IntersectionObserver tarda o falla.
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
       09 · ARCHIVE FILTERS + SEARCH
       ========================================================= */

    const initArchive =
        () => {

            const rows =
                $$(
                    "[data-project-row]"
                );


            const filterButtons =
                $$(
                    "[data-filter]"
                );


            const search =
                $(
                    "[data-project-search]"
                );


            const count =
                $(
                    "[data-results-count]"
                );


            const empty =
                $(
                    "[data-archive-empty]"
                );


            if (
                !rows.length
            ) {

                return;

            }


            let activeFilter =
                "all";


            /* -----------------------------------------
               CONTADORES REALES
               ----------------------------------------- */

            const updateFilterCounters =
                () => {

                    filterButtons.forEach(

                        (
                            button
                        ) => {

                            const filter =
                                button.dataset.filter;


                            let total =
                                rows.length;


                            if (
                                filter ===
                                "featured"
                            ) {

                                total =
                                    rows.filter(

                                        (
                                            row
                                        ) =>
                                            row.dataset.featured ===
                                            "true"

                                    ).length;

                            }


                            else if (
                                filter !==
                                "all"
                            ) {

                                total =
                                    rows.filter(

                                        (
                                            row
                                        ) =>
                                            row.dataset.category ===
                                            filter

                                    ).length;

                            }


                            const badge =
                                $(
                                    "span",
                                    button
                                );


                            if (badge) {

                                badge.textContent =
                                    String(total)
                                        .padStart(
                                            2,
                                            "0"
                                        );

                            }

                        }

                    );

                };


            /* -----------------------------------------
               FILTRADO
               ----------------------------------------- */

            const applyFilters =
                (
                    animate = false
                ) => {

                    const query =
                        normalizeText(
                            search?.value ||
                            ""
                        );


                    let visible =
                        0;


                    const visibleRows =
                        [];


                    rows.forEach(

                        (
                            row
                        ) => {

                            const category =
                                row.dataset.category ||
                                "";


                            const featured =
                                row.dataset.featured ===
                                "true";


                            const haystack =
                                normalizeText(
                                    `
                                    ${row.dataset.search || ""}
                                    ${row.textContent || ""}
                                    `
                                );


                            const matchesFilter =

                                activeFilter ===
                                "all"

                                ||

                                (
                                    activeFilter ===
                                        "featured"
                                    &&
                                    featured
                                )

                                ||

                                (
                                    activeFilter !==
                                        "featured"
                                    &&
                                    activeFilter !==
                                        "all"
                                    &&
                                    category ===
                                        activeFilter
                                );


                            const matchesSearch =

                                !query

                                ||

                                haystack.includes(
                                    query
                                );


                            const shouldShow =

                                matchesFilter
                                &&
                                matchesSearch;


                            row.classList.toggle(
                                "is-hidden",
                                !shouldShow
                            );


                            if (
                                shouldShow
                            ) {

                                visible += 1;

                                visibleRows.push(
                                    row
                                );

                            }

                        }

                    );


                    if (count) {

                        count.textContent =
                            `${visible} / ${rows.length}`;

                    }


                    if (empty) {

                        empty.hidden =
                            visible !== 0;

                    }


                    if (
                        animate &&
                        !reducedMotion.matches &&
                        typeof Element.prototype.animate ===
                            "function"
                    ) {

                        visibleRows
                            .slice(
                                0,
                                14
                            )
                            .forEach(

                                (
                                    row,
                                    index
                                ) => {

                                    row.animate(

                                        [
                                            {
                                                opacity: 0.25,

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
                                            duration: 300,

                                            delay:
                                                Math.min(
                                                    index *
                                                    22,
                                                    180
                                                ),

                                            easing:
                                                "cubic-bezier(0.22,1,0.36,1)"
                                        }

                                    );

                                }

                            );

                    }

                };


            /* -----------------------------------------
               BOTONES
               ----------------------------------------- */

            filterButtons.forEach(

                (
                    button
                ) => {

                    button.setAttribute(

                        "aria-pressed",

                        button.dataset.filter ===
                        activeFilter

                            ? "true"

                            : "false"

                    );


                    button.addEventListener(

                        "click",

                        () => {

                            activeFilter =
                                button.dataset.filter;


                            filterButtons.forEach(

                                (
                                    other
                                ) => {

                                    const active =
                                        other ===
                                        button;


                                    other.classList.toggle(
                                        "is-active",
                                        active
                                    );


                                    other.setAttribute(
                                        "aria-pressed",
                                        String(active)
                                    );

                                }

                            );


                            applyFilters(
                                true
                            );

                        }

                    );

                }

            );


            /* -----------------------------------------
               BUSCADOR
               ----------------------------------------- */

            search?.addEventListener(

                "input",

                () => {

                    applyFilters(
                        false
                    );

                }

            );


            /*
             * Tecla /
             *
             * Igual que un explorador técnico:
             * pulsas / y vas directamente al buscador.
             */

            document.addEventListener(

                "keydown",

                (
                    event
                ) => {

                    const activeElement =
                        document.activeElement;


                    const writing =

                        activeElement?.matches(
                            "input, textarea, select"
                        )

                        ||

                        activeElement?.isContentEditable;


                    if (
                        event.key === "/" &&
                        !writing &&
                        !body.classList.contains(
                            "inspector-open"
                        )
                    ) {

                        event.preventDefault();


                        search?.focus();

                    }


                    if (
                        event.key === "Escape" &&
                        activeElement ===
                            search &&
                        search?.value
                    ) {

                        search.value =
                            "";


                        applyFilters();

                    }

                }

            );


            updateFilterCounters();

            applyFilters();

        };



    /* =========================================================
       10 · PROJECT INSPECTOR
       ========================================================= */

    const initInspector =
        () => {

            const inspector =
                $(
                    "[data-project-inspector]"
                );


            const backdrop =
                $(
                    "[data-inspector-backdrop]"
                );


            const closeButton =
                $(
                    "[data-close-inspector]"
                );


            const rows =
                $$(
                    "[data-project-row]"
                );


            const triggers =
                $$(
                    "[data-open-project]"
                );


            if (
                !inspector ||
                !backdrop ||
                !closeButton
            ) {

                return;

            }


            inspector.setAttribute(
                "role",
                "dialog"
            );


            inspector.setAttribute(
                "aria-modal",
                "true"
            );


            inspector.setAttribute(
                "aria-label",
                "Ficha del proyecto"
            );


            const category =
                $(
                    "[data-inspector-category]",
                    inspector
                );


            const type =
                $(
                    "[data-inspector-type]",
                    inspector
                );


            const code =
                $(
                    "[data-inspector-code]",
                    inspector
                );


            const title =
                $(
                    "[data-inspector-title]",
                    inspector
                );


            const summary =
                $(
                    "[data-inspector-summary]",
                    inspector
                );


            const context =
                $(
                    "[data-inspector-context]",
                    inspector
                );


            const objective =
                $(
                    "[data-inspector-objective]",
                    inspector
                );


            const tags =
                $(
                    "[data-inspector-tags]",
                    inspector
                );


            const evidence =
                $(
                    "[data-inspector-evidence]",
                    inspector
                );


            const file =
                $(
                    "[data-inspector-file]",
                    inspector
                );


            const symbol =
                $(
                    "[data-inspector-symbol]",
                    inspector
                );


            const visual =
                $(
                    "[data-inspector-visual]",
                    inspector
                );


            let lastTrigger =
                null;


            let closeTimer =
                null;



            /* -----------------------------------------
               ENCONTRAR FILA
               ----------------------------------------- */

            const getRow =
                (
                    projectId
                ) =>
                    rows.find(

                        (
                            row
                        ) =>
                            row.dataset.project ===
                            projectId

                    );



            /* -----------------------------------------
               RENDER DE TAGS
               ----------------------------------------- */

            const renderTags =
                (
                    list
                ) => {

                    if (!tags) {

                        return;

                    }


                    tags.innerHTML =
                        "";


                    list.forEach(

                        (
                            item
                        ) => {

                            const tag =
                                document.createElement(
                                    "span"
                                );


                            tag.textContent =
                                item;


                            tags.appendChild(
                                tag
                            );

                        }

                    );

                };



            /* -----------------------------------------
               VISUAL DE PORTADA
               ----------------------------------------- */

            const setVisual =
                (
                    row,
                    project
                ) => {

                    if (!visual) {

                        return;

                    }


                    const cover =
                        $(
                            ".archive-row__visual img",
                            row
                        );


                    if (
                        cover &&
                        cover.src
                    ) {

                        visual.style.backgroundImage =
                            `
                            linear-gradient(
                                rgba(5, 15, 22, 0.30),
                                rgba(5, 15, 22, 0.73)
                            ),
                            url("${cover.src}")
                            `;


                        visual.style.backgroundSize =
                            "cover";


                        visual.style.backgroundPosition =
                            "center";

                    }

                    else {

                        visual.style.removeProperty(
                            "background-image"
                        );


                        visual.style.removeProperty(
                            "background-size"
                        );


                        visual.style.removeProperty(
                            "background-position"
                        );

                    }


                    if (symbol) {

                        symbol.textContent =
                            project.symbol ||
                            "DNL";

                    }

                };



            /* -----------------------------------------
               ABRIR
               ----------------------------------------- */

            const openProject =
                (
                    projectId,
                    trigger = null
                ) => {

                    const row =
                        getRow(
                            projectId
                        );


                    if (!row) {

                        return;

                    }


                    const project =
                        PROJECTS[
                            projectId
                        ] || {};


                    lastTrigger =
                        trigger;


                    const rowTitle =
                        $(
                            ".archive-row__identity strong",
                            row
                        )
                            ?.textContent
                            ?.trim()
                        ||
                        "Proyecto";


                    const rowCategory =
                        $(
                            ".archive-row__category",
                            row
                        )
                            ?.textContent
                            ?.trim()
                        ||
                        "ARCHIVE";


                    const rowType =
                        $(
                            ".archive-row__type",
                            row
                        )
                            ?.textContent
                            ?.trim()
                        ||
                        "FILE";


                    const rowFile =
                        $(
                            ".archive-row__file",
                            row
                        );


                    category.textContent =
                        rowCategory;


                    type.textContent =
                        rowType;


                    code.textContent =
                        project.code ||
                        "PROJECT / ARCHIVE";


                    title.textContent =
                        rowTitle;


                    summary.textContent =
                        project.summary ||
                        "Entrada del archivo técnico. Consulta el documento original para revisar el desarrollo completo.";


                    context.textContent =
                        project.context ||
                        "Proyecto académico y técnico.";


                    objective.textContent =
                        project.objective ||
                        "Documentar y resolver el trabajo planteado.";


                    evidence.textContent =
                        project.evidence ||
                        `Archivo · ${rowType}`;


                    renderTags(
                        project.tags ||
                        []
                    );


                    setVisual(
                        row,
                        project
                    );


                    if (
                        rowFile &&
                        file
                    ) {

                        file.href =
                            rowFile.href;


                        file.target =
                            "_blank";


                        if (
                            /^https?:/i.test(
                                rowFile.href
                            )
                        ) {

                            file.rel =
                                "noopener noreferrer";

                        }

                        else {

                            file.removeAttribute(
                                "rel"
                            );

                        }

                    }


                    if (
                        closeTimer
                    ) {

                        window.clearTimeout(
                            closeTimer
                        );

                    }


                    backdrop.hidden =
                        false;


                    inspector.setAttribute(
                        "aria-hidden",
                        "false"
                    );


                    body.classList.add(
                        "inspector-open"
                    );


                    window.requestAnimationFrame(

                        () => {

                            backdrop.classList.add(
                                "is-visible"
                            );


                            inspector.classList.add(
                                "is-open"
                            );

                        }

                    );


                    window.setTimeout(

                        () => {

                            closeButton.focus();

                        },

                        reducedMotion.matches

                            ? 0

                            : 350

                    );

                };



            /* -----------------------------------------
               CERRAR
               ----------------------------------------- */

            const closeInspector =
                () => {

                    if (
                        !inspector.classList.contains(
                            "is-open"
                        )
                    ) {

                        return;

                    }


                    inspector.classList.remove(
                        "is-open"
                    );


                    backdrop.classList.remove(
                        "is-visible"
                    );


                    inspector.setAttribute(
                        "aria-hidden",
                        "true"
                    );


                    body.classList.remove(
                        "inspector-open"
                    );


                    const delay =
                        reducedMotion.matches

                            ? 0

                            : 340;


                    closeTimer =
                        window.setTimeout(

                            () => {

                                backdrop.hidden =
                                    true;


                                lastTrigger?.focus?.();


                                lastTrigger =
                                    null;

                            },

                            delay

                        );

                };



            /* -----------------------------------------
               TRIGGERS
               ----------------------------------------- */

            triggers.forEach(

                (
                    trigger
                ) => {

                    trigger.addEventListener(

                        "click",

                        () => {

                            const projectId =
                                trigger.dataset.openProject;


                            openProject(
                                projectId,
                                trigger
                            );

                        }

                    );

                }

            );


            closeButton.addEventListener(
                "click",
                closeInspector
            );


            backdrop.addEventListener(
                "click",
                closeInspector
            );



            /* -----------------------------------------
               KEYBOARD + FOCUS TRAP
               ----------------------------------------- */

            document.addEventListener(

                "keydown",

                (
                    event
                ) => {

                    if (
                        !inspector.classList.contains(
                            "is-open"
                        )
                    ) {

                        return;

                    }


                    if (
                        event.key ===
                        "Escape"
                    ) {

                        event.preventDefault();


                        closeInspector();


                        return;

                    }


                    if (
                        event.key !==
                        "Tab"
                    ) {

                        return;

                    }


                    const focusable =
                        $$(
                            `
                            a[href],
                            button:not([disabled]),
                            input:not([disabled]),
                            [tabindex]:not([tabindex="-1"])
                            `,
                            inspector
                        ).filter(

                            (
                                element
                            ) =>
                                !element.hidden

                        );


                    if (
                        !focusable.length
                    ) {

                        return;

                    }


                    const first =
                        focusable[0];


                    const last =
                        focusable[
                            focusable.length -
                            1
                        ];


                    if (
                        event.shiftKey &&
                        document.activeElement ===
                            first
                    ) {

                        event.preventDefault();


                        last.focus();

                    }


                    else if (
                        !event.shiftKey &&
                        document.activeElement ===
                            last
                    ) {

                        event.preventDefault();


                        first.focus();

                    }

                }

            );

        };



    /* =========================================================
       11 · FEATURED MICRO MOTION
       ========================================================= */

    const initFeaturedMotion =
        () => {

            if (
                reducedMotion.matches ||
                !window.matchMedia(
                    "(hover: hover)"
                ).matches
            ) {

                return;

            }


            $$(
                ".featured-project"
            ).forEach(

                (
                    card
                ) => {

                    const button =
                        $(
                            ".featured-project__button",
                            card
                        );


                    if (!button) {

                        return;

                    }


                    button.addEventListener(

                        "pointermove",

                        (
                            event
                        ) => {

                            const rect =
                                button
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


                            button.style.transform =
                                `
                                perspective(900px)
                                rotateX(${y * -1.25}deg)
                                rotateY(${x * 1.25}deg)
                                translateY(-4px)
                                `;

                        }

                    );


                    button.addEventListener(

                        "pointerleave",

                        () => {

                            button.style.removeProperty(
                                "transform"
                            );

                        }

                    );

                }

            );

        };



    /* =========================================================
       12 · MANIFEST ACTIVATION
       ========================================================= */

    const initManifest =
        () => {

            const route =
                $(
                    ".project-manifest__route"
                );


            if (
                !route ||
                reducedMotion.matches ||
                !(
                    "IntersectionObserver"
                    in window
                )
            ) {

                return;

            }


            const nodes =
                $$(
                    ".project-manifest__route > div",
                    route
                );


            const observer =
                new IntersectionObserver(

                    (
                        entries
                    ) => {

                        const visible =
                            entries.some(

                                (
                                    entry
                                ) =>
                                    entry.isIntersecting

                            );


                        if (
                            !visible
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
                                                    opacity: 0.35,

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
                                                duration: 380,

                                                easing:
                                                    "cubic-bezier(0.22,1,0.36,1)",

                                                fill:
                                                    "both"
                                            }

                                        );

                                    },

                                    index *
                                        120

                                );

                            }

                        );


                        observer.disconnect();

                    },

                    {
                        threshold: 0.35
                    }

                );


            observer.observe(
                route
            );

        };



    /* =========================================================
       13 · ARCHIVE BACKGROUND
       ========================================================= */

    const initBackground =
        () => {

            const canvas =
                $(
                    "[data-archive-background]"
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


            let line =
                "rgba(20,53,68,.16)";


            let quiet =
                "rgba(20,53,68,.08)";


            const packets = [

                {
                    lane: 0.16,
                    speed: 0.018,
                    direction: 1,
                    offset: 0.11
                },

                {
                    lane: 0.34,
                    speed: 0.012,
                    direction: -1,
                    offset: 0.63
                },

                {
                    lane: 0.57,
                    speed: 0.016,
                    direction: 1,
                    offset: 0.35
                },

                {
                    lane: 0.78,
                    speed: 0.010,
                    direction: -1,
                    offset: 0.82
                }

            ];



            /* -----------------------------------------
               COLORES
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


                    /*
                     * Vertical archive channels
                     */

                    const verticals =
                        Math.max(
                            4,
                            Math.floor(
                                width /
                                240
                            )
                        );


                    for (
                        let index = 1;
                        index < verticals;
                        index += 1
                    ) {

                        const x =
                            (
                                width /
                                verticals
                            )
                            *
                            index;


                        context.beginPath();


                        context.moveTo(
                            x,
                            0
                        );


                        context.lineTo(
                            x,
                            height
                        );


                        context.strokeStyle =
                            quiet;


                        context.globalAlpha =
                            0.11;


                        context.lineWidth =
                            1;


                        context.stroke();

                    }



                    /*
                     * Horizontal data buses
                     */

                    packets.forEach(

                        (
                            packet,
                            index
                        ) => {

                            const y =
                                height *
                                packet.lane;


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
                                0.16;


                            context.lineWidth =
                                1;


                            context.stroke();



                            /*
                             * Packet
                             */

                            const progress =
                                (
                                    packet.offset
                                    +
                                    time *
                                    0.00001 *
                                    packet.speed *
                                    100
                                )
                                %
                                1;


                            const normalized =
                                packet.direction >
                                0

                                    ? progress

                                    : 1 -
                                    progress;


                            const x =
                                normalized *
                                width;


                            context.beginPath();


                            context.arc(
                                x,
                                y,
                                index % 2 === 0
                                    ? 2
                                    : 1.45,
                                0,
                                Math.PI *
                                    2
                            );


                            context.fillStyle =
                                cyan;


                            context.globalAlpha =
                                0.28;


                            context.fill();



                            /*
                             * Trail
                             */

                            context.beginPath();


                            context.moveTo(
                                x -
                                packet.direction *
                                    22,
                                y
                            );


                            context.lineTo(
                                x,
                                y
                            );


                            context.strokeStyle =
                                cyan;


                            context.globalAlpha =
                                0.12;


                            context.stroke();

                        }

                    );



                    /*
                     * Static nodes
                     */

                    const nodeCount =
                        Math.max(
                            8,
                            Math.floor(
                                width /
                                130
                            )
                        );


                    for (
                        let index = 0;
                        index < nodeCount;
                        index += 1
                    ) {

                        const x =
                            (
                                (
                                    index *
                                    0.137
                                )
                                %
                                1
                            )
                            *
                            width;


                        const y =
                            (
                                0.1
                                +
                                (
                                    index %
                                    5
                                )
                                *
                                0.19
                            )
                            *
                            height;


                        context.beginPath();


                        context.arc(
                            x,
                            y,
                            1.25,
                            0,
                            Math.PI *
                                2
                        );


                        context.fillStyle =
                            line;


                        context.globalAlpha =
                            0.24;


                        context.fill();

                    }


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

            initHero();

            initReveals();

            initArchive();

            initInspector();

            initFeaturedMotion();

            initManifest();

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