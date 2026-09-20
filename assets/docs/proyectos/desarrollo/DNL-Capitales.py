"""Módulo principal del juego interactivo de capitales del mundo.
Incluye dificultad progresiva, descarga de banderas, diseño dinámico y animaciones.
Autor: Darío Nieto Lorente
"""

# pylint: disable=line-too-long, invalid-name

import tkinter as tk
from tkinter import messagebox
import random
import urllib.request
import urllib.error
import base64

AUTOR = "Darío Nieto Lorente"

DATOS_PAISES = {
    "Afganistán": {"capital": "Kabul", "iso": "af"}, "Albania": {"capital": "Tirana", "iso": "al"},
    "Alemania": {"capital": "Berlín", "iso": "de"}, "Andorra": {"capital": "Andorra la Vieja", "iso": "ad"},
    "Angola": {"capital": "Luanda", "iso": "ao"}, "Antigua y Barbuda": {"capital": "Saint John", "iso": "ag"},
    "Arabia Saudita": {"capital": "Riad", "iso": "sa"}, "Argelia": {"capital": "Argel", "iso": "dz"},
    "Argentina": {"capital": "Buenos Aires", "iso": "ar"}, "Armenia": {"capital": "Ereván", "iso": "am"},
    "Australia": {"capital": "Canberra", "iso": "au"}, "Austria": {"capital": "Viena", "iso": "at"},
    "Azerbaiyán": {"capital": "Bakú", "iso": "az"}, "Bahamas": {"capital": "Nasáu", "iso": "bs"},
    "Bangladés": {"capital": "Daca", "iso": "bd"}, "Barbados": {"capital": "Bridgetown", "iso": "bb"},
    "Baréin": {"capital": "Manama", "iso": "bh"}, "Bélgica": {"capital": "Bruselas", "iso": "be"},
    "Belice": {"capital": "Belmopán", "iso": "bz"}, "Benín": {"capital": "Porto Novo", "iso": "bj"},
    "Bielorrusia": {"capital": "Minsk", "iso": "by"}, "Birmania": {"capital": "Naipyidó", "iso": "mm"},
    "Bolivia": {"capital": "Sucre", "iso": "bo"}, "Bosnia y Herzegovina": {"capital": "Sarajevo", "iso": "ba"},
    "Botsuana": {"capital": "Gaborone", "iso": "bw"}, "Brasil": {"capital": "Brasilia", "iso": "br"},
    "Brunéi": {"capital": "Bandar Seri Begawan", "iso": "bn"}, "Bulgaria": {"capital": "Sofía", "iso": "bg"},
    "Burkina Faso": {"capital": "Uagadugú", "iso": "bf"}, "Burundi": {"capital": "Gitega", "iso": "bi"},
    "Bután": {"capital": "Timbu", "iso": "bt"}, "Cabo Verde": {"capital": "Praia", "iso": "cv"},
    "Camboya": {"capital": "Nom Pen", "iso": "kh"}, "Camerún": {"capital": "Yaundé", "iso": "cm"},
    "Canadá": {"capital": "Ottawa", "iso": "ca"}, "Catar": {"capital": "Doha", "iso": "qa"},
    "Chad": {"capital": "Yamena", "iso": "td"}, "Chile": {"capital": "Santiago", "iso": "cl"},
    "China": {"capital": "Pekín", "iso": "cn"}, "Chipre": {"capital": "Nicosia", "iso": "cy"},
    "Ciudad del Vaticano": {"capital": "Ciudad del Vaticano", "iso": "va"}, "Colombia": {"capital": "Bogotá", "iso": "co"},
    "Comoras": {"capital": "Moroni", "iso": "km"}, "Corea del Norte": {"capital": "Pionyang", "iso": "kp"},
    "Corea del Sur": {"capital": "Seúl", "iso": "kr"}, "Costa de Marfil": {"capital": "Yamusukro", "iso": "ci"},
    "Costa Rica": {"capital": "San José", "iso": "cr"}, "Croacia": {"capital": "Zagreb", "iso": "hr"},
    "Cuba": {"capital": "La Habana", "iso": "cu"}, "Dinamarca": {"capital": "Copenhague", "iso": "dk"},
    "Dominica": {"capital": "Roseau", "iso": "dm"}, "Ecuador": {"capital": "Quito", "iso": "ec"},
    "Egipto": {"capital": "El Cairo", "iso": "eg"}, "El Salvador": {"capital": "San Salvador", "iso": "sv"},
    "Emiratos Árabes Unidos": {"capital": "Abu Dabi", "iso": "ae"}, "Eritrea": {"capital": "Asmara", "iso": "er"},
    "Eslovaquia": {"capital": "Bratislava", "iso": "sk"}, "Eslovenia": {"capital": "Liubliana", "iso": "si"},
    "España": {"capital": "Madrid", "iso": "es"}, "Estados Unidos": {"capital": "Washington D. C.", "iso": "us"},
    "Estonia": {"capital": "Tallin", "iso": "ee"}, "Esuatini": {"capital": "Mbabane", "iso": "sz"},
    "Etiopía": {"capital": "Adís Abeba", "iso": "et"}, "Filipinas": {"capital": "Manila", "iso": "ph"},
    "Finlandia": {"capital": "Helsinki", "iso": "fi"}, "Fiyi": {"capital": "Suva", "iso": "fj"},
    "Francia": {"capital": "París", "iso": "fr"}, "Gabón": {"capital": "Libreville", "iso": "ga"},
    "Gambia": {"capital": "Banjul", "iso": "gm"}, "Georgia": {"capital": "Tiflis", "iso": "ge"},
    "Ghana": {"capital": "Acra", "iso": "gh"}, "Granada": {"capital": "Saint George", "iso": "gd"},
    "Grecia": {"capital": "Atenas", "iso": "gr"}, "Guatemala": {"capital": "Ciudad de Guatemala", "iso": "gt"},
    "Guinea": {"capital": "Conakri", "iso": "gn"}, "Guinea Ecuatorial": {"capital": "Malabo", "iso": "gq"},
    "Guinea-Bisáu": {"capital": "Bisáu", "iso": "gw"}, "Guyana": {"capital": "Georgetown", "iso": "gy"},
    "Haití": {"capital": "Puerto Príncipe", "iso": "ht"}, "Honduras": {"capital": "Tegucigalpa", "iso": "hn"},
    "Hungría": {"capital": "Budapest", "iso": "hu"}, "India": {"capital": "Nueva Delhi", "iso": "in"},
    "Indonesia": {"capital": "Yakarta", "iso": "id"}, "Irak": {"capital": "Bagdad", "iso": "iq"},
    "Irán": {"capital": "Teherán", "iso": "ir"}, "Irlanda": {"capital": "Dublín", "iso": "ie"},
    "Islandia": {"capital": "Reikiavik", "iso": "is"}, "Islas Marshall": {"capital": "Majuro", "iso": "mh"},
    "Islas Salomón": {"capital": "Honiara", "iso": "sb"}, "Israel": {"capital": "Jerusalén", "iso": "il"},
    "Italia": {"capital": "Roma", "iso": "it"}, "Jamaica": {"capital": "Kingston", "iso": "jm"},
    "Japón": {"capital": "Tokio", "iso": "jp"}, "Jordania": {"capital": "Amán", "iso": "jo"},
    "Kazajistán": {"capital": "Astaná", "iso": "kz"}, "Kenia": {"capital": "Nairobi", "iso": "ke"},
    "Kirguistán": {"capital": "Biskek", "iso": "kg"}, "Kiribati": {"capital": "Tarawa", "iso": "ki"},
    "Kuwait": {"capital": "Ciudad de Kuwait", "iso": "kw"}, "Laos": {"capital": "Vientián", "iso": "la"},
    "Lesoto": {"capital": "Maseru", "iso": "ls"}, "Letonia": {"capital": "Riga", "iso": "lv"},
    "Líbano": {"capital": "Beirut", "iso": "lb"}, "Liberia": {"capital": "Monrovia", "iso": "lr"},
    "Libia": {"capital": "Trípoli", "iso": "ly"}, "Liechtenstein": {"capital": "Vaduz", "iso": "li"},
    "Lituania": {"capital": "Vilna", "iso": "lt"}, "Luxemburgo": {"capital": "Luxemburgo", "iso": "lu"},
    "Madagascar": {"capital": "Antananarivo", "iso": "mg"}, "Malasia": {"capital": "Kuala Lumpur", "iso": "my"},
    "Malaui": {"capital": "Lilongüe", "iso": "mw"}, "Maldivas": {"capital": "Malé", "iso": "mv"},
    "Malí": {"capital": "Bamako", "iso": "ml"}, "Malta": {"capital": "La Valeta", "iso": "mt"},
    "Marruecos": {"capital": "Rabat", "iso": "ma"}, "Mauricio": {"capital": "Port Louis", "iso": "mu"},
    "Mauritania": {"capital": "Nuakchot", "iso": "mr"}, "México": {"capital": "Ciudad de México", "iso": "mx"},
    "Micronesia": {"capital": "Palikir", "iso": "fm"}, "Moldavia": {"capital": "Chisináu", "iso": "md"},
    "Mónaco": {"capital": "Mónaco", "iso": "mc"}, "Mongolia": {"capital": "Ulán Bator", "iso": "mn"},
    "Montenegro": {"capital": "Podgorica", "iso": "me"}, "Mozambique": {"capital": "Maputo", "iso": "mz"},
    "Namibia": {"capital": "Windhoek", "iso": "na"}, "Nauru": {"capital": "Yaren", "iso": "nr"},
    "Nepal": {"capital": "Katmandú", "iso": "np"}, "Nicaragua": {"capital": "Managua", "iso": "ni"},
    "Níger": {"capital": "Niamey", "iso": "ne"}, "Nigeria": {"capital": "Abuya", "iso": "ng"},
    "Noruega": {"capital": "Oslo", "iso": "no"}, "Nueva Zelanda": {"capital": "Wellington", "iso": "nz"},
    "Omán": {"capital": "Mascate", "iso": "om"}, "Países Bajos": {"capital": "Ámsterdam", "iso": "nl"},
    "Pakistán": {"capital": "Islamabad", "iso": "pk"}, "Palaos": {"capital": "Ngerulmud", "iso": "pw"},
    "Panamá": {"capital": "Ciudad de Panamá", "iso": "pa"}, "Papúa Nueva Guinea": {"capital": "Port Moresby", "iso": "pg"},
    "Paraguay": {"capital": "Asunción", "iso": "py"}, "Perú": {"capital": "Lima", "iso": "pe"},
    "Polonia": {"capital": "Varsovia", "iso": "pl"}, "Portugal": {"capital": "Lisboa", "iso": "pt"},
    "Reino Unido": {"capital": "Londres", "iso": "gb"}, "República Centroafricana": {"capital": "Bangui", "iso": "cf"},
    "República Checa": {"capital": "Praga", "iso": "cz"}, "República del Congo": {"capital": "Brazzaville", "iso": "cg"},
    "República Democrática del Congo": {"capital": "Kinsasa", "iso": "cd"}, "República Dominicana": {"capital": "Santo Domingo", "iso": "do"},
    "Ruanda": {"capital": "Kigali", "iso": "rw"}, "Rumania": {"capital": "Bucarest", "iso": "ro"},
    "Rusia": {"capital": "Moscú", "iso": "ru"}, "Samoa": {"capital": "Apia", "iso": "ws"},
    "San Cristóbal y Nieves": {"capital": "Basseterre", "iso": "kn"}, "San Marino": {"capital": "San Marino", "iso": "sm"},
    "San Vicente y las Granadinas": {"capital": "Kingstown", "iso": "vc"}, "Santa Lucía": {"capital": "Castries", "iso": "lc"},
    "Santo Tomé y Príncipe": {"capital": "Santo Tomé", "iso": "st"}, "Senegal": {"capital": "Dakar", "iso": "sn"},
    "Serbia": {"capital": "Belgrado", "iso": "rs"}, "Seychelles": {"capital": "Victoria", "iso": "sc"},
    "Sierra Leona": {"capital": "Freetown", "iso": "sl"}, "Singapur": {"capital": "Singapur", "iso": "sg"},
    "Siria": {"capital": "Damasco", "iso": "sy"}, "Somalia": {"capital": "Mogadiscio", "iso": "so"},
    "Sri Lanka": {"capital": "Sri Jayawardenapura Kotte", "iso": "lk"}, "Sudáfrica": {"capital": "Pretoria", "iso": "za"},
    "Sudán": {"capital": "Jartum", "iso": "sd"}, "Sudán del Sur": {"capital": "Yuba", "iso": "ss"},
    "Suecia": {"capital": "Estocolmo", "iso": "se"}, "Suiza": {"capital": "Berna", "iso": "ch"},
    "Surinam": {"capital": "Paramaribo", "iso": "sr"}, "Tailandia": {"capital": "Bangkok", "iso": "th"},
    "Tanzania": {"capital": "Dodoma", "iso": "tz"}, "Tayikistán": {"capital": "Dusambé", "iso": "tj"},
    "Timor Oriental": {"capital": "Dili", "iso": "tl"}, "Togo": {"capital": "Lomé", "iso": "tg"},
    "Tonga": {"capital": "Nukualofa", "iso": "to"}, "Trinidad y Tobago": {"capital": "Puerto España", "iso": "tt"},
    "Túnez": {"capital": "Túnez", "iso": "tn"}, "Turkmenistán": {"capital": "Asjabad", "iso": "tm"},
    "Turquía": {"capital": "Ankara", "iso": "tr"}, "Tuvalu": {"capital": "Funafuti", "iso": "tv"},
    "Ucrania": {"capital": "Kiev", "iso": "ua"}, "Uganda": {"capital": "Kampala", "iso": "ug"},
    "Uruguay": {"capital": "Montevideo", "iso": "uy"}, "Uzbekistán": {"capital": "Taskent", "iso": "uz"},
    "Vanuatu": {"capital": "Port Vila", "iso": "vu"}, "Venezuela": {"capital": "Caracas", "iso": "ve"},
    "Vietnam": {"capital": "Hanói", "iso": "vn"}, "Yemen": {"capital": "Saná", "iso": "ye"},
    "Yibuti": {"capital": "Yibuti", "iso": "dj"}, "Zambia": {"capital": "Lusaka", "iso": "zm"},
    "Zimbabue": {"capital": "Harare", "iso": "zw"}
}

class LogicaJuego:
    """Clase encargada de gestionar el estado interno y las reglas del juego."""

    def __init__(self, datos):
        """Inicializa la lógica y la segmentación de dificultad de los países."""
        self.datos = datos

        faciles = [
            "Alemania", "Argentina", "Australia", "Brasil", "Canadá", "Chile", "China",
            "Colombia", "Corea del Sur", "Cuba", "Egipto", "España", "Estados Unidos",
            "Francia", "Grecia", "India", "Italia", "Japón", "Marruecos", "México",
            "Países Bajos", "Perú", "Portugal", "Reino Unido", "Rusia", "Sudáfrica",
            "Suecia", "Suiza", "Turquía", "Venezuela"
        ]

        dificiles = [
            "Andorra", "Antigua y Barbuda", "Bahamas", "Barbados", "Baréin", "Belice",
            "Benín", "Bután", "Cabo Verde", "Comoras", "Dominica", "Eritrea", "Esuatini",
            "Fiyi", "Gabón", "Gambia", "Granada", "Guinea Ecuatorial", "Guinea-Bisáu",
            "Guyana", "Islas Marshall", "Islas Salomón", "Kiribati", "Lesoto",
            "Liechtenstein", "Maldivas", "Mauricio", "Micronesia", "Mónaco", "Nauru",
            "Palaos", "Papúa Nueva Guinea", "Samoa", "San Cristóbal y Nieves", "San Marino",
            "San Vicente y las Granadinas", "Santa Lucía", "Santo Tomé y Príncipe",
            "Seychelles", "Surinam", "Timor Oriental", "Tonga", "Tuvalu", "Vanuatu", "Yibuti"
        ]

        medios = [p for p in datos.keys() if p not in faciles and p not in dificiles]

        random.shuffle(faciles)
        random.shuffle(medios)
        random.shuffle(dificiles)

        self.paises = faciles + medios + dificiles
        self.total_preguntas = len(self.paises)
        self.pregunta_actual = 0
        self.puntuacion = 0
        self.vidas = 3
        self.pais_actual = None

    def generar_pregunta(self):
        """Genera una pregunta nueva seleccionando un país y 4 opciones únicas."""
        if self.pregunta_actual >= self.total_preguntas or self.vidas <= 0:
            return None

        self.pais_actual = self.paises[self.pregunta_actual]
        capital_correcta = self.datos[self.pais_actual]["capital"]
        iso_code = self.datos[self.pais_actual]["iso"]

        todas_capitales = [info["capital"] for info in self.datos.values()]
        todas_capitales.remove(capital_correcta)

        opciones = random.sample(todas_capitales, 3)
        opciones.append(capital_correcta)
        random.shuffle(opciones)

        self.pregunta_actual += 1

        return {
            "pais": self.pais_actual,
            "iso": iso_code,
            "opciones": opciones,
            "correcta": capital_correcta
        }

    def procesar_respuesta(self, seleccion_usuario):
        """Evalúa la respuesta del usuario y actualiza puntuación y vidas."""
        capital_correcta = self.datos[self.pais_actual]["capital"]
        es_correcta = (seleccion_usuario == capital_correcta)

        if es_correcta:
            self.puntuacion += 1
        else:
            self.vidas -= 1

        return es_correcta, capital_correcta

    def comprobar_fin_juego(self):
        """Evalúa las condiciones de victoria o derrota del estado actual."""
        if self.vidas <= 0:
            return "derrota"
        if self.pregunta_actual >= self.total_preguntas:
            return "victoria"
        return "continuar"

class InterfazGrafica:
    """Clase encargada de construir y gestionar la interfaz visual mediante tkinter."""

    def __init__(self, root, logica):
        """Inicializa los componentes de la interfaz y carga la primera pregunta."""
        self.root = root
        self.logica = logica
        self.imagen_actual = None
        self.particulas = []

        self.root.title(f"Juego de Capitales - Creado por {AUTOR}")
        self.root.geometry("600x650")
        self.root.resizable(False, False)

        self._configurar_interfaz()
        self.cargar_siguiente_pregunta()

    def _configurar_interfaz(self):
        """Inicializa y posiciona los elementos visuales base en la ventana."""
        self.frame_stats = tk.Frame(self.root, pady=15, padx=20)
        self.frame_stats.pack(fill=tk.X)

        fuente_stats = ("Helvetica", 14, "bold")
        self.lbl_puntuacion = tk.Label(self.frame_stats, text="Puntuación: 0", font=fuente_stats, fg="#333333")
        self.lbl_puntuacion.pack(side=tk.LEFT)

        self.lbl_progreso = tk.Label(self.frame_stats, text="Progreso: 0/0", font=fuente_stats, fg="#555555")
        self.lbl_progreso.pack(side=tk.LEFT, expand=True)

        self.lbl_vidas = tk.Label(self.frame_stats, text="Vidas: 3", font=fuente_stats, fg="#d32f2f")
        self.lbl_vidas.pack(side=tk.RIGHT)

        self.frame_pregunta = tk.Frame(self.root, pady=20)
        self.frame_pregunta.pack(fill=tk.BOTH, expand=True)

        self.lbl_bandera = tk.Label(self.frame_pregunta, text="Cargando bandera...", font=("Arial", 12), width=160, height=107, bg="#ffffff", relief="solid", borderwidth=1)
        self.lbl_bandera.pack(pady=10)

        self.lbl_pais = tk.Label(self.frame_pregunta, text="País", font=("Helvetica", 28, "bold"), pady=15)
        self.lbl_pais.pack()

        self.frame_opciones = tk.Frame(self.root, pady=10)
        self.frame_opciones.pack(fill=tk.BOTH, expand=True)

        self.botones_opciones = []
        for _ in range(4):
            btn = tk.Button(self.frame_opciones, text="", font=("Helvetica", 14), width=35, pady=8,
                            bg="#ffffff", activebackground="#e0e0e0", relief="groove", borderwidth=3, cursor="hand2")
            btn.pack(pady=6)
            self.botones_opciones.append(btn)

        self.frame_footer = tk.Frame(self.root, pady=10)
        self.frame_footer.pack(fill=tk.X, side=tk.BOTTOM)
        self.lbl_autor = tk.Label(self.frame_footer, text=f"Desarrollado por {AUTOR}", font=("Helvetica", 10, "italic"), fg="#777777")
        self.lbl_autor.pack()

    def actualizar_colores_estado(self):
        """Ajusta los colores de fondo de la interfaz en función de las vidas restantes."""
        if self.logica.vidas == 3:
            bg_color = "#f0f8ff"
        elif self.logica.vidas == 2:
            bg_color = "#fff3e0"
        else:
            bg_color = "#ffebee"

        self.root.config(bg=bg_color)
        self.frame_stats.config(bg=bg_color)
        self.frame_pregunta.config(bg=bg_color)
        self.frame_opciones.config(bg=bg_color)
        self.frame_footer.config(bg=bg_color)

        self.lbl_puntuacion.config(bg=bg_color)
        self.lbl_progreso.config(bg=bg_color)
        self.lbl_vidas.config(bg=bg_color)
        self.lbl_pais.config(bg=bg_color)
        self.lbl_autor.config(bg=bg_color)

    def actualizar_estadisticas(self):
        """Actualiza los marcadores visuales tras procesar una respuesta."""
        self.lbl_puntuacion.config(text=f"Puntuación: {self.logica.puntuacion}")
        self.lbl_vidas.config(text=f"Vidas: {'❤️' * self.logica.vidas}")
        self.lbl_progreso.config(text=f"{self.logica.pregunta_actual} / {self.logica.total_preguntas}")
        self.actualizar_colores_estado()

    def cargar_imagen_bandera(self, iso_code):
        """Descarga la bandera desde internet y la convierte a un formato compatible con tkinter."""
        url = f"https://flagcdn.com/w160/{iso_code}.png"
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response:
                raw_data = response.read()
                b64_data = base64.b64encode(raw_data)
                self.imagen_actual = tk.PhotoImage(data=b64_data)
                self.lbl_bandera.config(image=self.imagen_actual, width=160, height=107, text="")
        except urllib.error.URLError:
            self.imagen_actual = None
            self.lbl_bandera.config(image='', text="[Error cargando bandera]", width=20, height=5)

    def cargar_siguiente_pregunta(self):
        """Extrae y renderiza los datos de la siguiente pregunta de la partida."""
        datos_pregunta = self.logica.generar_pregunta()
        self.actualizar_estadisticas()

        if datos_pregunta is None:
            self.gestionar_fin_juego(self.logica.comprobar_fin_juego())
            return

        self.lbl_pais.config(text=datos_pregunta["pais"])
        self.cargar_imagen_bandera(datos_pregunta["iso"])

        opciones = datos_pregunta["opciones"]
        for i in range(4):
            self.botones_opciones[i].config(
                text=opciones[i],
                command=lambda opc=opciones[i]: self.manejar_respuesta(opc),
                state=tk.NORMAL
            )

    def manejar_respuesta(self, seleccion):
        """Recibe la opción pulsada y determina si se avanza o se finaliza el juego."""
        es_correcta, capital_correcta = self.logica.procesar_respuesta(seleccion)

        if not es_correcta:
            messagebox.showerror("Resultado", f"Incorrecto.\nLa capital correcta era: {capital_correcta}")

        estado_juego = self.logica.comprobar_fin_juego()

        if estado_juego == "continuar":
            self.cargar_siguiente_pregunta()
        else:
            self.actualizar_estadisticas()
            self.gestionar_fin_juego(estado_juego)

    def gestionar_fin_juego(self, estado):
        """Borra la pantalla principal y selecciona la pantalla final correspondiente."""
        for widget in self.root.winfo_children():
            widget.destroy()

        if estado == "derrota":
            self.mostrar_derrota()
        elif estado == "victoria":
            self.mostrar_victoria()

    def mostrar_derrota(self):
        """Renderiza la vista gráfica de finalización por agotamiento de vidas."""
        self.root.config(bg="#3b0000")
        canvas = tk.Canvas(self.root, width=600, height=650, bg="#3b0000", highlightthickness=0)
        canvas.pack(fill=tk.BOTH, expand=True)

        canvas.create_text(300, 200, text="FIN DEL JUEGO", font=("Helvetica", 48, "bold"), fill="#ff4d4d")
        canvas.create_text(300, 300, text="Te has quedado sin vidas.", font=("Helvetica", 18), fill="white")
        canvas.create_text(300, 350, text=f"Puntuación final: {self.logica.puntuacion}", font=("Helvetica", 24, "bold"), fill="#ffcccc")
        canvas.create_text(300, 550, text=f"Desarrollado por {AUTOR}", font=("Helvetica", 14, "italic"), fill="#888888")

    def mostrar_victoria(self):
        """Renderiza la vista gráfica y genera los datos de la animación de victoria."""
        self.root.config(bg="#001a33")
        canvas = tk.Canvas(self.root, width=600, height=650, bg="#001a33", highlightthickness=0)
        canvas.pack(fill=tk.BOTH, expand=True)

        canvas.create_text(300, 150, text="¡VICTORIA ÉPICA!", font=("Impact", 54), fill="#FFD700")
        canvas.create_text(300, 250, text="¡Has conquistado todas las capitales del mundo!", font=("Helvetica", 16), fill="white")
        canvas.create_text(300, 320, text=f"Puntuación perfecta: {self.logica.puntuacion}", font=("Helvetica", 28, "bold"), fill="#00FFCC")
        canvas.create_text(300, 550, text=f"Desarrollado por:\n{AUTOR}", font=("Helvetica", 18, "italic"), fill="#aaaaaa", justify="center")

        colores = ["#FF3F34", "#0BE881", "#3C40C6", "#FFA801", "#0FB8B3", "#FFD700", "#FFFFFF"]
        for _ in range(150):
            pos_x = random.randint(0, 600)
            pos_y = random.randint(-800, 0)
            color = random.choice(colores)
            size = random.randint(6, 16)
            id_particula = canvas.create_oval(pos_x, pos_y, pos_x+size, pos_y+size, fill=color, outline="")
            self.particulas.append((id_particula, random.randint(4, 10)))

        self.animar_confeti(canvas)

    def animar_confeti(self, canvas):
        """Bucle de movimiento para el efecto de caída de confeti en la pantalla de victoria."""
        try:
            for part, vel in self.particulas:
                canvas.move(part, 0, vel)
                coords = canvas.coords(part)
                if coords and coords[1] > 650:
                    canvas.move(part, 0, -800)
            self.root.after(30, lambda: self.animar_confeti(canvas))
        except tk.TclError:
            pass

def iniciar_juego():
    """Punto de entrada de la aplicación que inicia la instancia de tkinter."""
    root = tk.Tk()
    logica = LogicaJuego(DATOS_PAISES)
    InterfazGrafica(root, logica)
    root.mainloop()

if __name__ == "__main__":
    iniciar_juego()