document.addEventListener('DOMContentLoaded', () => {
    // 1. STICKY HEADER & SCROLL EFFECT
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. MOBILE NAVIGATION MENU (HAMBURGER)
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        hamburger.classList.toggle('active');
    });

    // Мобилдик менюну шилтемени басканда жабуу
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            hamburger.classList.remove('active');
        });
    });

    // 3. SEARCH OVERLAY TOGGLE (ИЗДӨӨ ТЕРЕЗЕСИ)
    const openSearch = document.getElementById('openSearch');
    const closeSearch = document.getElementById('closeSearch');
    const searchOverlay = document.getElementById('searchOverlay');

    openSearch.addEventListener('click', () => {
        searchOverlay.classList.add('open');
    });

    closeSearch.addEventListener('click', () => {
        searchOverlay.classList.remove('open');
    });

    // 4. INTERACTIVE WISHLIST (ИЗБРАННОЕ СЧЕТЧИГИ)
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    const favoriteBadge = document.querySelector('.favorite-badge');
    let favoriteCount = 0;

    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const icon = btn.querySelector('i');
            if (icon.classList.contains('fa-regular')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
                icon.style.color = '#e74c3c';
                favoriteCount++;
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
                icon.style.color = '';
                favoriteCount--;
            }
            favoriteBadge.textContent = favoriteCount;
        });
    });

    // 5. INTERACTIVE SHOPPING CART (СЕБЕТ СЧЕТЧИГИ ЖАНА АНИМАЦИЯ)
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const cartBadge = document.querySelector('.cart-badge');
    let cartCount = 0;

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            cartCount++;
            cartBadge.textContent = cartCount;

            // Баскычтагы заматта кайтарым байланыш
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Кошулду';
            btn.style.backgroundColor = '#9C826B';
            btn.style.color = '#ffffff';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.backgroundColor = '';
                btn.style.color = '';
            }, 1500);
        });
    });

    // 6. ACTIVE LINK ON SCROLL (АКТИВДҮҮ МЕНЮ ШИЛТЕМЕЛЕРИ)
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 110;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']')?.classList.add('active');
            } else {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']')?.classList.remove('active');
            }
        });
    });
});
// Социалдык ишеним билдирүүчү функция
function showLiveNotification() {
    const cities = ["Бишкек", "Ош", "Жалал-Абад", "Нарын", "Каракол", "Талас"];
    const names = ["Айдана", "Мээрим", "Назира", "Самара", "Айсулуу", "Гульназ"];
    const products = ["Coffee Brown Hijab", "Luxury Floral Chiffon", "Ivory Elegance Silk", "Classic Coat Abaya"];

    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomProduct = products[Math.floor(Math.random() * products.length)];

    const popUp = document.createElement('div');
    popUp.className = 'live-sale-popup';
    popUp.innerHTML = `
        <div style="position: fixed; bottom: 20px; left: 20px; background: #ffffff; padding: 14px 20px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 12px; z-index: 9999; font-size: 0.9rem; border-left: 4px solid #9C826B;">
            <i class="fa-solid fa-bag-shopping" style="color: #9C826B; font-size: 1.2rem;"></i>
            <div>
                <strong>${randomName} (${randomCity} ш.)</strong> азыр эле <br><span style="color: #9C826B; font-weight: 600;">"${randomProduct}"</span> өнүмүн заказ кылды!
            </div>
        </div>
    `;

    document.body.appendChild(popUp);

    // 5 секунддан кийин кабарламаны өчүрүү
    setTimeout(() => {
        popUp.remove();
    }, 5000);
}

// Ар бир 18 секунд сайын кабарламаны чыгарып туруу
setInterval(showLiveNotification, 18000);
// WhatsApp аркылуу заматта заказ жөнөтүү
function orderViaWhatsApp(productName, price) {
    const phoneNumber = "996555001122"; // Сиздин WhatsApp номериңиз
    const message = `Саламатсыздарбы! Мен Sara Collection сайтынан төмөнкү өнүмдү заказ кылайын дедим эле:\n\n*Өнүм:* ${productName}\n*Баасы:* ${price}\n\nЖеткирүү шарттарын айтып берсеңиздер?`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}