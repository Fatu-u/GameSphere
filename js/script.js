/**
 * GameSphere - Script principal
 * Funcionalidades para el sitio web de GameSphere
 */

// Java Script hecho con MUCHA ayuda de IA (no le sé)

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Efecto de escritura para el título principal
    const typedTitles = document.querySelectorAll('.typed-title');
    if (typedTitles.length > 0) {
        typedTitles.forEach(title => {
            const text = title.getAttribute('data-text');
            let i = 0;
            const typingEffect = setInterval(() => {
                if (i < text.length) {
                    title.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typingEffect);
                }
            }, 100);
        });
    }

    // Control de video en las cards
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        const video = card.querySelector('video');
        if (video) {
            card.addEventListener('mouseenter', () => {
                video.play();
            });
            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        }
    });

    // Efecto parallax para el hero section
    const parallaxElements = document.querySelectorAll('.parallax');
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', function() {
            parallaxElements.forEach(element => {
                const scrollPosition = window.pageYOffset;
                element.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
            });
        });
    }

    // Contador de visitas (simulado)
    const visitCounter = document.getElementById('visit-counter');
    if (visitCounter) {
        let visits = localStorage.getItem('gameSphereVisits') || 0;
        visits++;
        localStorage.setItem('gameSphereVisits', visits);
        visitCounter.textContent = visits.toLocaleString();
    }

    // Filtrado de noticias
    const newsFilter = document.getElementById('news-filter');
    if (newsFilter) {
        newsFilter.addEventListener('change', function() {
            const category = this.value;
            const newsItems = document.querySelectorAll('.news-item');
            
            newsItems.forEach(item => {
                if (category === 'all' || item.classList.contains(category)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Sistema de valoración en reseñas
    const ratingStars = document.querySelectorAll('.rating-star');
    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            const ratingContainer = this.closest('.rating-container');
            
            // Actualizar estrellas seleccionadas
            ratingContainer.querySelectorAll('.rating-star').forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
            
            // Actualizar valor oculto del formulario
            if (ratingContainer.querySelector('input[name="rating"]')) {
                ratingContainer.querySelector('input[name="rating"]').value = rating;
            }
        });
    });

    // Animación de scroll para enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mostrar/ocultar botón "ir arriba"
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
    }

    // Cargar más noticias (simulado)
    const loadMoreButton = document.getElementById('load-more');
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cargando...';
            
            // Simular carga AJAX
            setTimeout(() => {
                const newsContainer = document.querySelector('.news-container');
                const newItem = document.createElement('div');
                newItem.className = 'news-item col-md-4 mb-4';
                newItem.innerHTML = `
                    <div class="card h-100">
                        <img src="https://via.placeholder.com/300x200" class="card-img-top" alt="Noticia nueva">
                        <div class="card-body">
                            <h5 class="card-title">Nueva noticia cargada</h5>
                            <p class="card-text">Contenido adicional cargado dinámicamente al hacer clic en el botón.</p>
                            <a href="#" class="btn btn-primary">Leer más</a>
                        </div>
                    </div>
                `;
                
                newsContainer.appendChild(newItem);
                this.textContent = 'Cargar más noticias';
                
                // Scroll suave al nuevo elemento
                newItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 1000);
        });
    }

    // Reloj en tiempo real para el footer
    const clockElement = document.getElementById('real-time-clock');
    if (clockElement) {
        function updateClock() {
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            const dateString = now.toLocaleDateString();
            clockElement.textContent = `${dateString} - ${timeString}`;
        }
        updateClock();
        setInterval(updateClock, 1000);
    }

    // Efecto de aparición al hacer scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length > 0) {
        const fadeInOnScroll = function() {
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('visible');
                }
            });
        };
        
        window.addEventListener('scroll', fadeInOnScroll);
        fadeInOnScroll(); // Ejecutar al cargar la página
    }

    // Modal para suscripción al newsletter
    const newsletterModal = document.getElementById('newsletterModal');
    if (newsletterModal) {
        // Mostrar modal después de 5 segundos
        setTimeout(() => {
            const modal = new bootstrap.Modal(newsletterModal);
            const alreadyShown = localStorage.getItem('newsletterShown');
            
            if (!alreadyShown) {
                modal.show();
                localStorage.setItem('newsletterShown', 'true');
            }
        }, 5000);
        
        // Manejar el formulario del newsletter
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const emailInput = this.querySelector('input[type="email"]');
                
                // Simular envío
                setTimeout(() => {
                    const modalInstance = bootstrap.Modal.getInstance(newsletterModal);
                    modalInstance.hide();
                    
                    // Mostrar notificación
                    const toast = new bootstrap.Toast(document.getElementById('newsletterToast'));
                    toast.show();
                }, 1000);
            });
        }
    }

    // Galería de imágenes
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                const modal = document.getElementById('galleryModal');
                const modalImg = modal.querySelector('.modal-img');
                
                modalImg.src = imgSrc;
                const modalInstance = new bootstrap.Modal(modal);
                modalInstance.show();
            });
        });
    }

    // Temporizador para ofertas especiales
    const offerTimer = document.getElementById('offer-timer');
    if (offerTimer) {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 2); // Oferta por 2 días
        
        function updateOfferTimer() {
            const now = new Date();
            const diff = endDate - now;
            
            if (diff <= 0) {
                offerTimer.innerHTML = '<span class="text-danger">¡Oferta terminada!</span>';
                return;
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            offerTimer.innerHTML = `
                <span class="badge bg-danger me-1">${days}d</span>
                <span class="badge bg-danger me-1">${hours}h</span>
                <span class="badge bg-danger me-1">${minutes}m</span>
                <span class="badge bg-danger">${seconds}s</span>
            `;
        }
        
        updateOfferTimer();
        setInterval(updateOfferTimer, 1000);
    }
});

// Función para el modo oscuro/claro
function toggleDarkMode() {
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
        if (darkModeToggle) darkModeToggle.checked = false;
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        if (darkModeToggle) darkModeToggle.checked = true;
    }
}

// Verificar preferencia de modo oscuro al cargar
window.addEventListener('load', function() {
    // Modo oscuro
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) darkModeToggle.checked = true;
    }
    
    // Verificar si el navegador prefiere modo oscuro
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('darkMode')) {
        document.body.classList.add('dark-mode');
    }
    
    // Configurar el listener para cambios en la preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (!localStorage.getItem('darkMode')) {
            if (event.matches) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        }
    });
});

// Función para compartir en redes sociales
function shareOnSocial(network) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    let shareUrl;
    
    switch (network) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
            break;
        default:
            return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

//Un contador de visitas :)) - Index

const visitCounter = document.getElementById('visit-counter');

function updateVisitCount() {
  let visits = localStorage.getItem('gameSphereVisits') || 0;
  visits++;
  localStorage.setItem('gameSphereVisits', visits);
  visitCounter.textContent = `Visitas: ${visits}`;
}

updateVisitCount();

// Filtroo - noticias

document.getElementById('filter-btn').addEventListener('click', function() {
    const filter = document.getElementById('news-filter').value.toLowerCase();
    const newsItems = document.querySelectorAll('.news-item');
    
    newsItems.forEach(item => {
      const title = item.querySelector('h3').textContent.toLowerCase();
      item.style.display = title.includes(filter) ? 'block' : 'none';
    });
  });

  //    Sistema de valoración - reseñas
const stars = document.querySelectorAll('.rating-star');

stars.forEach(star => {
  star.addEventListener('click', function() {
    const rating = this.getAttribute('data-rating');
    document.getElementById('user-rating').value = rating;
    
    stars.forEach((s, index) => {
      s.classList.toggle('active', index < rating);
    });
  });
});

// Validación de formulario
document.getElementById('contact-form').addEventListener('submit', function(e) {
    const email = document.getElementById('email').value;
    
    if (!email.includes('@')) {
      e.preventDefault();
      alert('Por favor ingresa un email válido');
      document.getElementById('email').focus();
    }
  });


  // JQUERY RESEÑASSSS
  $(document).ready(function() {
    // Variables globales
    var ratings = JSON.parse(localStorage.getItem('gameRatings')) || [];
    var currentGameId = window.location.pathname.split('/').pop(); // Identificador único del juego
    
    // Sistema de calificación
    $('.rate-star').hover(
        function() {
            var value = $(this).data('value');
            highlightStars(value);
            updateRatingText(value);
        },
        function() {
            var currentRating = $('#user-rating').val();
            if(currentRating) {
                highlightStars(currentRating);
                updateRatingText(currentRating);
            } else {
                resetStars();
            }
        }
    ).click(function() {
        var value = $(this).data('value');
        $('#user-rating').val(value);
        updateRatingText(value);
    });
    
    // Enviar calificación
    $('#submit-rating').click(function() {
        var rating = $('#user-rating').val();
        var comment = $('#review-comment').val().trim();
        
        if(!rating) {
            showMessage('Por favor selecciona una calificación', 'error');
            return;
        }
        
        var review = {
            gameId: currentGameId,
            rating: rating,
            comment: comment,
            date: new Date().toLocaleDateString()
        };
        
        ratings.push(review);
        saveRatings();
        displayRatings();
        
        showMessage('¡Gracias por tu calificación!', 'success');
        resetForm();
    });
    
    // Mostrar calificaciones existentes
    displayRatings();
    
    // Funciones auxiliares
    $(document).ready(function() {
        // Configuración inicial
        var currentRating = 0;
        var stars = $('.rate-star');
        
        // Función para resaltar estrellas
        function highlightStars(count) {
            stars.removeClass('active');
            stars.slice(0, count).addClass('active');
        }
        
        // Evento hover (mouse entra y sale)
        stars.hover(
            function() {
                var value = $(this).data('value');
                highlightStars(value);
                updateRatingText(value);
            },
            function() {
                highlightStars(currentRating);
                updateRatingText(currentRating);
            }
        );
        
        // Evento click
        stars.click(function() {
            currentRating = $(this).data('value');
            $('#user-rating').val(currentRating);
            updateRatingText(currentRating);
            
            // Efecto visual al seleccionar
            $(this).effect("bounce", { times: 2 }, 300);
        });
        
        // Actualizar texto descriptivo
        function updateRatingText(value) {
            var texts = ['Pésimo', 'Regular', 'Bueno', 'Muy bueno', 'Excelente'];
            $('#rating-text').text(value ? texts[value-1] : 'Sin valorar');
        }
    });})