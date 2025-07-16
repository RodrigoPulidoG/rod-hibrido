# 🧭 Proyecto Microfrontends Híbrido — Angular + React

## 🔍 Visión general

Este proyecto demuestra cómo integrar múltiples microfrontends (MFs) construidos en diferentes frameworks dentro de un host Angular. Los MFs actuales incluyen:

- `mf-login`: Microfrontend de autenticación hecho en **React**
- `mf-cards`: Microfrontend funcional hecho en **Angular**
- `host`: Aplicación Angular que orquesta e integra los microfrontends

Esta arquitectura permite:

- Separación modular entre dominios funcionales
- Despliegue independiente por tecnología
- Interoperabilidad entre Angular, React (y potencialmente Vue o Svelte)

---

## ⚙️ Componentes del sistema

| Componente   | Framework | Rol                            |
|--------------|-----------|---------------------------------|
| mf-login     | React     | Microfrontend de login          |
| mf-cards     | Angular   | Microfrontend funcional         |
| host         | Angular   | Orquestador de los MFs          |

---

## 🔐 MF-Login (React)

El MF-Login expone una función `mount(containerIdOrElement: HTMLElement | string)` que permite renderizar el login dentro de cualquier contenedor DOM.

### Bootstrap de React

```ts
export function mount(containerIdOrElement) {
  const container = typeof containerIdOrElement === 'string'
    ? document.getElementById(containerIdOrElement)
    : containerIdOrElement;

  if (!container) return;

  const root = ReactDOM.createRoot(container);
  root.render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
}

## 🧩 MF-Cards (Angular)

Este microfrontend está construido con Angular y expone directamente su módulo `CardsModule` como punto de entrada principal. Incluye configuraciones necesarias para ejecutar formularios, consultas HTTP y demás funcionalidades típicas de una aplicación Angular.

---

### 🔗 Bootstrap de Angular

El MF se inicia directamente con `CardsModule` como raíz:

```ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CardsModule } from './app/features/cards/cards.module';

platformBrowserDynamic()
  .bootstrapModule(CardsModule)
  .catch(err => console.error(err));


## 🖼️ Componente de visualización con Swiper — Host Angular

El host contiene un componente que se conecta a una API de imágenes (por ejemplo NASA Apod) y renderiza dichas imágenes usando Swiper como Web Component federado y controlado vía `ElementRef`.

---

### 🔧 Características

- Obtiene imágenes desde una API personalizada (como `apodApi.getRandomImage()`).
- Guarda el historial de imágenes en sesión (`ApodSessionService`).
- Utiliza `swiper/element/bundle` para renderizar un slider con efecto `cube`.
- Controla el `swiper-container` desde Angular con `ViewChild` y `ElementRef`.
- Usa botones de navegación personalizados para avanzar o retroceder el slider.
