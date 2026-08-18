/*!
* Start Bootstrap - Creative v7.0.7 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });

    const clasesData = {
        1: {
            tema: 'Introducción a la Informática Aplicada',
            descripcion: 'Qué es la informática, sus 3 pilares (hardware, software y datos/redes) y qué es la ofimática.',
            actividades: 'Revisión de los objetivos del curso y de las principales herramientas ofimáticas: Word, Excel, PowerPoint y páginas/aplicaciones web.',
            pdf: 'assets/files/clase1.pptx'
        },
        2: {
            tema: 'Normas APA (séptima edición)',
            descripcion: 'Síntesis del Centro de Escritura Javeriano sobre el Estilo APA 7.ª edición: formato general, tablas y figuras, citas y referencias.',
            actividades: 'Lectura y práctica de citación narrativa/parentética, parafraseo y elaboración de referencias según el número y tipo de autores.',
            pdf: 'assets/files/clase2.pdf'
        },
        3: {
            tema: 'Ofimática Avanzada',
            descripcion: 'Libro de Excel con todos los ejercicios de ofimática trabajados en clase.',
            actividades: 'Limpieza de datos de ventas, registro de empleados y contactos, captura de datos, base e inventario de clientes y proyecto de vencimientos.',
            pdf: 'assets/files/clase3.xlsx'
        },

        4: {
            tema: 'Proyecto Final',
            descripcion: 'Modificación y personalización de una plantilla web, adaptando el diseño y contenido según las necesidades del sitio.',
            actividades: 'Modificación y personalización de una plantilla web, incorporando las clases, actividades y materiales del curso. Se adaptó el diseño, se agregaron ventanas modales, buscador, botones para visualizar y descargar archivos, y se organizó el contenido de la bitácora digital.',
            pdf: 'assets/files/clase4.pdf'
        }
    };

    // Completar el modal con los datos de la clase seleccionada
    const claseModal = document.getElementById('claseModal');
    if (claseModal) {
        claseModal.addEventListener('show.bs.modal', event => {
            const button = event.relatedTarget;
            const numero = button.getAttribute('data-clase');
            const datos = clasesData[numero];
            if (!datos) return;

            document.getElementById('claseModalLabel').textContent = 'Clase ' + numero + ': ' + datos.tema;
            document.getElementById('claseModalTema').textContent = datos.tema;
            document.getElementById('claseModalDescripcion').textContent = datos.descripcion;
            document.getElementById('claseModalActividades').textContent = datos.actividades;

            const verBtn = document.getElementById('claseModalVer');
            const descargarBtn = document.getElementById('claseModalDescargar');
            verBtn.setAttribute('href', datos.pdf);
            descargarBtn.setAttribute('href', datos.pdf);
        });
    }

    // Buscador de clases: filtra las tarjetas por número o tema
    const buscador = document.getElementById('buscadorClases');
    if (buscador) {
        const items = document.querySelectorAll('#portfolio .clase-item');
        const sinResultados = document.getElementById('sinResultados');

        buscador.addEventListener('input', () => {
            const texto = buscador.value.trim().toLowerCase();
            let visibles = 0;

            items.forEach(item => {
                const numero = item.getAttribute('data-numero') || '';
                const tema = (item.getAttribute('data-tema') || '').toLowerCase();
                const coincide = texto === '' || tema.includes(texto) || numero.includes(texto) || ('clase ' + numero).includes(texto);

                item.style.display = coincide ? '' : 'none';
                if (coincide) visibles++;
            });

            if (sinResultados) {
                sinResultados.classList.toggle('d-none', visibles !== 0);
            }
        });
    }

});
