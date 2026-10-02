document.addEventListener("DOMContentLoaded", () => {
    // Cambia solo este número: código de país + número, sin + ni espacios. Ejemplo: 18001234567
    const WHATSAPP_NUMBER = "18633786138";
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

    document.querySelectorAll(".js-whatsapp").forEach((link) => {
        const numero = link.dataset.whatsapp || WHATSAPP_NUMBER;
        const mensaje = link.dataset.mensaje || "Hola, quisiera más información.";
        link.href = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
        link.target = "_blank";
        link.rel = "noopener";
    });

    // Botones de contacto del directorio de proveedores
    document.querySelectorAll(".proveedor-btn").forEach((link) => {
        const numero = link.dataset.whatsapp;
        if (!numero) return;
        const mensaje = link.dataset.mensaje || "Hola, quisiera información sobre sus productos.";
        link.href = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
        link.target = "_blank";
        link.rel = "noopener";
    });

    const panelSection = document.getElementById("panel");
    if (panelSection) {
        panelSection.querySelectorAll(".reveal").forEach((item) => {
            item.classList.add("visible");
        });
    }

    const nav = document.getElementById("nav");
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelectorAll(".nav-links a");

    toggle?.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
    });

    links.forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
            toggle?.setAttribute("aria-expanded", "false");
        });
    });

    // Menú desplegable "Asesorías"
    const dropdowns = document.querySelectorAll(".nav-dropdown");
    dropdowns.forEach((dropdown) => {
        const button = dropdown.querySelector(".nav-dropdown-toggle");
        button?.addEventListener("click", (event) => {
            event.stopPropagation();
            const open = dropdown.classList.toggle("open");
            button.setAttribute("aria-expanded", String(open));
        });
    });

    document.addEventListener("click", () => {
        dropdowns.forEach((dropdown) => {
            dropdown.classList.remove("open");
            dropdown.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
        });
    });

    // Cierra el menú desplegable al elegir una opción
    document.querySelectorAll(".nav-dropdown-menu a").forEach((link) => {
        link.addEventListener("click", () => {
            dropdowns.forEach((dropdown) => {
                dropdown.classList.remove("open");
                dropdown.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
            });
        });
    });

    const revealItems = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.18
    });

    revealItems.forEach((item) => revealObserver.observe(item));

    const form = document.getElementById("consulta-form");
    const showForm = () => {
        if (!form) return;
        form.hidden = false;
        const formButton = document.getElementById("btn-mostrar-formulario");
        if (formButton) {
            formButton.hidden = true;
            formButton.style.display = "none";
        }
        document.getElementById("consulta")?.scrollIntoView({ behavior: "smooth", block: "start" });
        form.querySelector("input")?.focus();
    };

    document.getElementById("btn-programar")?.addEventListener("click", showForm);
    document.getElementById("btn-mostrar-formulario")?.addEventListener("click", showForm);

    form?.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const nombre = String(data.get("nombre") || "").trim();
        const apellido = String(data.get("apellido") || "").trim();
        const correo = String(data.get("correo") || "").trim();

        const mensaje = [
            "Hola, quiero programar una consulta de importación desde China.",
            `Nombre: ${nombre} ${apellido}`,
            `Correo: ${correo}`
        ].join("\n");

        window.open(`${whatsappUrl}?text=${encodeURIComponent(mensaje)}`, "_blank", "noopener");
    });
});
