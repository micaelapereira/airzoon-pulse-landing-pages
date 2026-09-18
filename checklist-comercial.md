# Pulse — Sales checklist (all 5 archetypes)

One consolidated reference for the sales team: what's already fixed by the shared design system, and what needs to be collected from the client for each Pulse landing-page archetype. Each archetype also keeps its own `checklist-comercial.md` inside its folder — this file exists so a single link covers the whole product line.

## Covered for every archetype — do not ask again

- Brand primary color.
- Heading font.
- Card background color.
- Main button style and color.
- Logo — reused from the client's Spot welcome page.

---

## 1. Offer Page (`pulse-offer-pages/`) — reactivation, deal of the day, first visit

1. **Header photo** — real photo of the venue or product. Landscape, well lit, no text overlay.
2. **The deal** — one short sentence (e.g. "2x1 on montaditos", "20% off your bill").
3. **How the deal is claimed** — WhatsApp (customer messages, confirms there) or Code (shown on-screen, redeemed in person). Pick one, not a visitor choice.
4. **Offer validity** — expiry date, or a time window if using the countdown variant.
5. **Business WhatsApp number**, and the pre-filled message opened by the button.
6. **Redemption code** (only if delivery is by code).
7. **Terms and conditions** — text or link.
8. **Locations** — name, phone, and hours for each one. Repeat for more than one branch.
9. **Connect-with-business button** (optional, turned on per campaign) — yes or no, and if on, the pre-filled WhatsApp message.

Only for the "Business intro" variant: a short paragraph about the business (2-3 lines) + 3 to 6 photos for the gallery.
Only for the "Countdown" variant: exact closing time of the offer.

## 2. Booking Page (`pulse-booking-pages/`) — birthday gift, booked by WhatsApp

Also fixed, no client input: validity — the gift is valid for the whole month by design, not a client choice; airZoon coupon and connect-with-business block — fixed structure (both have a per-campaign on/off toggle, not client-provided content).

1. **Header photo** — real photo of the venue. Landscape, well lit, no text overlay.
2. **The birthday gift** — one short sentence (e.g. "1 montadito per guest + a drink for the birthday person", "a free facial cleansing").
3. **Photo of the gift** — real photo of the specific item or treatment (not the venue).
4. **Business WhatsApp number**, and the pre-filled message opened by the button.
5. **Terms and conditions** — text or link.
6. **Locations** — name, phone, and hours for each one. Repeat for more than one branch.

## 3. Giveaway Page (`pulse-giveaways-pages/`) — raffle entry, prize photo, countdown to close

Also fixed, no client input: airZoon coupon and connect-with-business block — fixed structure (both have a per-campaign on/off toggle).

1. **The prize** — one short sentence (e.g. "a dinner for 4 with drinks", "a premium signature facial").
2. **Photo of the prize** — real photo of the specific item or experience (not the venue). Runs full-width at the very top of the page — needs to work as a hero image, not a small product shot.
3. **Close date** — when the raffle closes and the winner is picked; drives the countdown.
4. **Entry form fields** — which of name / WhatsApp / email / Instagram (or another field) are required vs. optional. Default: name + WhatsApp required, email + Instagram optional.
5. **Raffle terms ("bases del sorteo")** — full text: eligibility, how the winner is chosen, how they're notified, prize transferability. Shown in an inline expandable panel, not a separate page.
6. **Business WhatsApp number**, for the "talk to us" button shown after entering.
7. **Locations** — name, phone, and hours for each one. Repeat for more than one branch.

## 4. Survey Page (`pulse-survey-pages/`) — one-tap rating, branches to review or feedback

Also fixed, no client input: airZoon coupon and connect-with-business block (shown only after answering, both with a per-campaign on/off toggle); the question itself and the 1-5 star scale — fixed across every client, not written by the business.

1. **Header photo** — real photo of the venue, same as the other archetypes.
2. **Public review link** — the real Google Business or Facebook page review URL (or a place ID). Mockup placeholder is a generic Maps search link; must be swapped before this ships.
3. **Suggested review text** — a short, real sentence in the brand's voice for the high-branch (4-5★) copy-to-clipboard block.
4. **Person in charge's WhatsApp number** — where the low-branch (1-3★) free-text feedback goes, and where the always-on "talk to us" button points.

Not part of this page (per brief: "sin menú y sin promoción"): no address/hours card (someone answering already visited); no offer or unrelated promotion on the question screen; coupon and connect only appear after answering, never before.

## 5. Corporate Page (`pulse-corporate-pages/`) — news, launches, events. Save the date or WhatsApp

Also fixed, no client input: airZoon coupon and connect-with-business block (both have a per-campaign on/off toggle).

1. **Header photo** — real photo of the venue, same as the other archetypes.
2. **The headline** — the news/launch/event in one short sentence.
3. **Date and time** — for the highlighted date block and the "save the date" calendar link.
4. **Gallery photos** — 3 to 6 real photos (event, new space, launch). Mockup uses 5 AI-generated placeholders styled to match each brand — swap for the client's real photos before this ships.
5. **Body copy** — 2-3 short paragraphs about what's happening.
6. **CTA type** — pick ONE per campaign: "Guardar fecha" (opens a Google Calendar event — needs exact date/time/location text) or "Escribir por WhatsApp" (needs the business's WhatsApp number and a pre-filled message). Not both, not a visitor choice.
7. **Locations** — name, phone, and hours for each one. Repeat for more than one branch.
8. **Social links ("redes")** — Instagram and/or Facebook URLs. Shown as text (the @handle) until the visitor uses the primary CTA — only then do they become clickable, so no one leaves the page before converting.

Not part of this page (per brief: "sin promoción"): no discount, deal, or claimable offer; no claim flow — this page never changes state, the only thing configurable is the CTA type, chosen once per campaign.

---

# Pulse — Checklist comercial (los 5 arquetipos)

Referencia única para el equipo comercial: qué está fijo por el sistema de diseño compartido y qué hay que pedirle al cliente para cada arquetipo de landing Pulse. Cada arquetipo también mantiene su propio `checklist-comercial.md` dentro de su carpeta — este archivo existe para que un solo link cubra toda la línea de producto.

## Cubierto para los 5 arquetipos — no pedir de nuevo

- Color principal de marca.
- Tipografía de títulos.
- Color de fondo de las tarjetas.
- Estilo y color del botón principal.
- Logo — se reusa el de la splash page de bienvenida (Spot) del cliente.

---

## 1. Página Oferta (`pulse-offer-pages/`) — reactivación, oferta del día, primera visita

1. **Foto de cabecera** — foto real del local o del producto. Horizontal, buena luz, sin texto superpuesto.
2. **La ventaja** — una frase corta (ej. "2x1 en montaditos", "20% off en tu cuenta").
3. **Cómo se entrega la ventaja** — por WhatsApp (el cliente escribe y confirma ahí) o por código (se muestra y se canjea en el local). Se elige uno, no es una elección del visitante.
4. **Vigencia de la oferta** — fecha de vencimiento, o franja horaria si es la variante con cuenta atrás.
5. **Número de WhatsApp** del negocio, y el mensaje precargado que abre el botón.
6. **Código de canje** (solo si la entrega es por código).
7. **Términos y condiciones** — texto o link.
8. **Ubicaciones** — nombre, teléfono y horario de cada local. Se repite si hay más de una sucursal.
9. **Botón de conexión con el negocio** (opcional, se activa por campaña) — sí o no, y si está activo, el mensaje precargado de WhatsApp.

Solo para la variante "Presentación del negocio": un párrafo corto sobre el negocio (2-3 líneas) + 3 a 6 fotos para la galería.
Solo para la variante "Cuenta atrás": hora exacta de cierre de la oferta.

## 2. Página Reserva (`pulse-booking-pages/`) — regalo de cumpleaños, reserva por WhatsApp

También fijo, sin datos del cliente: vigencia — el regalo vale todo el mes por diseño, no es una elección del cliente; cupón airZoon y botón de conexión — estructura fija (ambos tienen ahora un toggle on/off por campaña, no es contenido que completa el cliente).

1. **Foto de cabecera** — foto real del local. Horizontal, buena luz, sin texto superpuesto.
2. **El regalo de cumpleaños** — una frase corta (ej. "1 montadito por invitado + una copa o un trago para el cumpleañero", "una limpieza facial gratis").
3. **Foto del regalo** — foto real del producto o tratamiento específico (no del local).
4. **Número de WhatsApp** del negocio, y el mensaje precargado que abre el botón.
5. **Términos y condiciones** — texto o link.
6. **Ubicaciones** — nombre, teléfono y horario de cada local. Se repite si hay más de una sucursal.

## 3. Página Sorteo (`pulse-giveaways-pages/`) — participación en sorteo, foto del premio, cuenta atrás al cierre

También fijo, sin datos del cliente: cupón airZoon y botón de conexión con el negocio — estructura fija (ambos tienen un toggle on/off por campaña).

1. **El premio** — una frase corta (ej. "una cena para 4 con bebidas", "un facial premium de firma").
2. **Foto del premio** — foto real del producto o experiencia específica (no del local). Ocupa todo el ancho arriba de todo — tiene que funcionar como imagen de cabecera, no como foto de producto chica.
3. **Fecha de cierre** — cuándo cierra el sorteo y se elige al ganador; define la cuenta regresiva.
4. **Campos del formulario** — cuáles de nombre / WhatsApp / email / Instagram (u otro campo) son obligatorios y cuáles opcionales. Por defecto: nombre y WhatsApp obligatorios, email e Instagram opcionales.
5. **Bases del sorteo** — texto completo: quién puede participar, cómo se elige al ganador, cómo se le avisa, si el premio es transferible. Se muestra en un desplegable dentro de la misma página, no en una página aparte.
6. **Número de WhatsApp** del negocio, para el botón "hablar con nosotros" que aparece después de participar.
7. **Ubicaciones** — nombre, teléfono y horario de cada local. Se repite si hay más de una sucursal.

## 4. Página Encuesta (`pulse-survey-pages/`) — calificación de un toque, ramifica a reseña o comentario

También fijo, sin datos del cliente: cupón airZoon y botón de conexión (aparecen solo después de responder, ambos con un toggle on/off por campaña); la pregunta en sí y la escala de 1 a 5 estrellas — fijas para todo cliente, no las escribe el negocio.

1. **Foto de cabecera** — foto real del local, igual que en el resto de los arquetipos.
2. **Link de reseña pública** — la URL real de la ficha de Google Business o Facebook (o un place ID). El mockup usa un link genérico de búsqueda en Maps como placeholder; hay que reemplazarlo por el real antes de publicar.
3. **Texto sugerido de reseña** — una frase corta y real, con la voz de la marca, para el bloque copiable de la rama alta (4-5★).
4. **WhatsApp del encargado** — adónde llega el comentario de texto libre de la rama baja (1-3★), y adónde apunta el botón fijo "Hablar con [negocio]".

No forma parte de esta página (según el brief: "sin menú y sin promoción"): sin card de dirección/horario (quien responde ya visitó el local); sin oferta ni contenido ajeno en la primera pantalla; el cupón y el botón de conexión solo aparecen después de responder, nunca antes.

## 5. Página Corporativa (`pulse-corporate-pages/`) — novedades, lanzamientos, eventos. Guardar fecha o WhatsApp

También fijo, sin datos del cliente: cupón airZoon y botón de conexión con el negocio (ambos tienen un toggle on/off por campaña).

1. **Foto de cabecera** — foto real del local, igual que en el resto de los arquetipos.
2. **El titular** — la novedad, lanzamiento o evento en una frase corta.
3. **Fecha y hora** — para el bloque de fecha destacada y el link de "guardar fecha" en el calendario.
4. **Fotos de la galería** — de 3 a 6 fotos reales (evento, nuevo espacio, lanzamiento). El mockup usa 5 placeholders generados por IA con el estilo de cada marca — hay que reemplazarlas por las fotos reales del cliente antes de publicar.
5. **Texto** — 2 a 3 párrafos cortos contando de qué se trata.
6. **Tipo de botón principal** — elegir UNO por campaña: "Guardar fecha" (abre un evento de Google Calendar — necesita fecha/hora/lugar exactos) o "Escribir por WhatsApp" (necesita el número del negocio y un mensaje precargado). No los dos juntos, no es una elección del visitante.
7. **Ubicaciones** — nombre, teléfono y horario de cada local. Se repite si hay más de una sucursal.
8. **Redes** — URLs de Instagram y/o Facebook. Se muestran como texto (el @usuario) hasta que el visitante usa el CTA principal — recién ahí se vuelven clickeables, para no desviarlo antes de convertir.

No forma parte de esta página (según el brief: "sin promoción"): sin descuento, oferta ni nada canjeable; sin flujo de canje — la página nunca cambia de estado, lo único configurable es el tipo de botón, elegido una vez por campaña.
