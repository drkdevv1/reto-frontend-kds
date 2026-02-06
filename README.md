# Reto técnico - Frontend Developer - 🍔 Kitchen Display System (KDS)

Sistema de visualización de pedidos para cocina (KDS).
Simula una conexión en tiempo real con un backend, permitiendo gestionar el ciclo de vida de los pedidos (Pendiente -> Preparando -> Completado).

## 🚀 Cómo Iniciar

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Correr el proyecto:**
    ```bash
    npm run dev
    ```

3.  Abrir en el navegador (usualmente `http://localhost:5173`).

---

## 🛠️ Tecnologías

*   **React + TypeScript** (Vite)
*   **Redux Toolkit** (Estado global)
*   **Styled Components** (Estilos y temas)

## ✨ Funcionalidades Clave

*   **📡 Simulación Real-Time:** Polling automático cada 5s para recibir nuevos pedidos.
*   **💾 Persistencia Mock:** Un servicio en memoria simula una base de datos real.
*   **🎨 UI Profesional:**
    *   Diseño responsivo y adaptativo.
    *   Carrusel infinito con Scroll Snap.
    *   Drag-to-Scroll (arrastrar con mouse).
    *   Dark Mode / Light Mode.
