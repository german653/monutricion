# Melina Health Studio

Contexto

Actúa como un desarrollador Full Stack Senior especializado en Next.js 15 (App Router), React 19, TypeScript, TailwindCSS 4, Supabase, Shadcn/ui, Framer Motion y arquitectura escalable.

Tu objetivo es desarrollar un proyecto prácticamente terminado, con código limpio, reutilizable, moderno y listo para producción.

El proyecto será una página web profesional para la nutricionista Melina Oviedo, tomando como referencia su Instagram:

https://www.instagram.com/nutri_melioviedo/

La web debe transmitir:

profesionalismo
confianza
salud
bienestar
cercanía
simplicidad

Toda la experiencia debe ser extremadamente sencilla para usuarios de cualquier edad.

Rol

Eres el Lead Frontend + Backend Developer de una agencia premium.

No expliques qué harías.

Construye directamente el proyecto.

Piensa como si fuera un trabajo que costará miles de dólares.

Tecnologías obligatorias

Utilizar únicamente tecnologías modernas.

Next.js 15 (App Router)
React 19
TypeScript
TailwindCSS
Supabase
Supabase Auth
Cloudinary
PostgreSQL (Supabase)
Shadcn/ui
Lucide Icons
Framer Motion
React Hook Form
Zod
TanStack Query
Sonner (toast)
next-themes
ESLint
Prettier

Arquitectura modular.

Estilo visual

Inspirarse en el Instagram.

La web debe verse elegante.

Minimalista.

Mucho espacio en blanco.

Nada recargado.

Utilizar los colores del logo.

Agregar un rosado extremadamente suave para acompañar la identidad.

Ejemplo:

Primary:
Color del logo

Secondary:
Color del logo

Accent:
#FCEEF3

Background:
#FFFFFF

Surface:
#FAFAFA

Success:
#61B96B

Error:
#E85B5B

Border:
#ECECEC

Muchísimas esquinas redondeadas.

Sombras suaves.

Animaciones delicadas.

Diseño

Responsive perfecto.

Mobile First.

Optimizado para:

celular
tablet
notebook
desktop

Debe parecer una página premium.

Navbar

Logo.

Inicio

Sobre mí

Servicios

Tienda

Reservar turno

Contacto

Si el usuario inició sesión como administrador:

mostrar además

Panel Admin

Hero

Gran fotografía de Melina.

Título grande.

Subtítulo.

Botón:

Reservar Turno

Segundo botón:

Ver Servicios

Animaciones suaves.

Sección Sobre Mí

Fotografía.

Historia.

Experiencia.

Especialidades.

Valores.

Cards con iconos.

Servicios

Cada servicio será una Card.

Cada card contiene:

Imagen

Título

Descripción

Duración

Precio

Botón:

Reservar

Toda la información debe venir desde Supabase.

No hardcodear.

Reserva de turnos

Sistema completo.

Formulario:

Nombre

Apellido

Correo

Teléfono

Servicio

Fecha

Hora

Observaciones

Al enviar:

guardar en Supabase.

Mostrar Toast.

Enviar al usuario a una pantalla de confirmación.

Panel Admin podrá ver todas las reservas.

Tienda

Apartado de productos.

Cada producto tiene:

Imagen

Nombre

Descripción

Precio

Stock

Categoría

Botón:

Agregar al carrito

Carrito

Persistente.

Guardar en LocalStorage.

Mostrar:

Productos

Cantidad

Subtotal

Eliminar producto

Modificar cantidad

Vaciar carrito

Comprar

No habrá pago online.

Al presionar

Finalizar Compra

debe abrir automáticamente WhatsApp.

Número:

+543541639512

Generar automáticamente un mensaje.

Ejemplo:

Hola Melina!

Quiero comprar los siguientes productos:

Producto A x2
Producto B x1
Producto C x3

Total aproximado:

$45.000

Mi nombre es:

Muchas gracias.

Debe abrir WhatsApp directamente.

Contacto

Formulario.

Ubicación.

Instagram.

WhatsApp.

Correo.

Footer

Links rápidos.

Instagram.

WhatsApp.

Copyright.

Panel Administrador

Crear un login exclusivo.

Correo:

nutri@gmail.com

Contraseña:

42981809

IMPORTANTE: Para una aplicación real, no almacenar estas credenciales en texto plano. Implementar autenticación segura con Supabase Auth y crear ese usuario como administrador. Proteger las rutas del panel mediante middleware y roles.

Si el login es correcto

Redireccionar automáticamente a

/admin

Si el login es incorrecto

No mostrar error.

Simplemente:

cerrar el modal.

volver al inicio.

mostrar un toast:

"¡Bienvenido! Esperamos que encuentres toda la información que buscás."

El usuario continúa navegando normalmente.

Nunca indicar que el login falló.

Panel Admin

Dashboard completo.

Sidebar.

Estadísticas.

Reservas.

Productos.

Servicios.

Contenido.

Configuración.

Dashboard

Mostrar:

Cantidad de reservas.

Productos.

Servicios.

Ventas simuladas.

Últimos turnos.

Actividad reciente.

Gestión de Productos

CRUD completo.

Agregar.

Editar.

Eliminar.

Subir imágenes.

Guardar imágenes en Supabase Storage.

Gestión de Servicios

CRUD completo.

Agregar.

Modificar.

Eliminar.

Imagen.

Precio.

Duración.

Descripción.

Gestión del contenido

Modificar:

Hero.

Sobre mí.

Información.

Contacto.

Preguntas frecuentes.

Todo editable.

Nada hardcodeado.

Gestión de reservas

Listado.

Filtros.

Buscador.

Eliminar.

Cambiar estado.

Pendiente.

Confirmado.

Cancelado.

Base de datos Supabase

Crear automáticamente todas las migraciones.

Tablas:

admins

site_content

services

products

categories

appointments

settings

faq

hero

about

testimonials

activity_log

storage

Implementar relaciones.

Índices.

Restricciones.

Seguridad

Middleware.

Protección de rutas.

Validaciones con Zod.

Rate limiting donde sea posible.

Sanitización.

Buenas prácticas.

No exponer secretos.

Variables de entorno.

SEO

Metadata dinámica.

Open Graph.

Twitter Cards.

Schema.org.

robots.

sitemap.

Favicons.

Rendimiento

Server Components.

Lazy Loading.

Image Optimization.

Code Splitting.

Suspense.

Caching.

Revalidación.

Accesibilidad

ARIA.

Contraste correcto.

Focus visible.

Navegación por teclado.

Animaciones

Framer Motion.

Fade.

Slide.

Hover.

Scroll Reveal.

Muy suaves.

Organización del proyecto
app/

components/

features/

hooks/

lib/

services/

types/

supabase/

middleware.ts

public/

styles/

Código extremadamente limpio.

Componentes reutilizables.

Separar lógica.

Separar UI.

Separar servicios.

Calidad del código

Seguir principios:

SOLID.

Clean Code.

DRY.

KISS.

Arquitectura escalable.

Tipado estricto.

Sin código duplicado.

Objetivo final

Generar una aplicación completamente funcional, moderna y lista para producción, con un diseño premium, optimizada para SEO y rendimiento, utilizando Next.js + Tailwind + Supabase. El resultado debe ser prácticamente un producto terminado, con todas las funcionalidades descritas implementadas y una arquitectura preparada para futuras ampliaciones.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1b33a83d-fefd-4613-aaf3-e6beae13249f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
