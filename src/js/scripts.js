window.addEventListener('DOMContentLoaded', () => {

    // Scroll menu
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let href = this.getAttribute('href').substring(1);
            const scrollTarget = document.getElementById(href);
            const topOffset = document.querySelector('.js-scroll-menu').offsetHeight;
            // const topOffset = 0; // если не нужен отступ сверху
            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });

            scrollTarget.focus();
        });
    });

    // Tabs
    var tabNavs = document.querySelectorAll(".nav-tab");
    var tabPanes = document.querySelectorAll(".tab-pane");

    for (var i = 0; i < tabNavs.length; i++) {

        tabNavs[i].addEventListener("click", function(e){
            e.preventDefault();
            var activeTabAttr = e.target.getAttribute("data-tab");

            for (var j = 0; j < tabNavs.length; j++) {
                var contentAttr = tabPanes[j].getAttribute("data-tab-content");

                if (activeTabAttr === contentAttr) {
                    tabNavs[j].classList.add("active");
                    tabPanes[j].classList.add("active");
                } else {
                    tabNavs[j].classList.remove("active");
                    tabPanes[j].classList.remove("active");
                }
            };
        });
    }

    // Установка фокусов
    const skipLinkMain = document.getElementById("skip-link_main");
    const areaMain = document.getElementById("main");
    skipLinkMain.addEventListener('click', (e) => {
        areaMain.focus();
    });


    // Модальное окно
    let modalButtons = document.querySelectorAll('.js-open-auth-modal'),
          overlay      = document.querySelector('#overlay-modal'),
          closeButtons = document.querySelectorAll('.js-modal-close'),
          modals       = document.querySelectorAll('.modal'),
          lastFocusedElement;

    modalButtons.forEach(function(item){
        item.addEventListener('click', (e) => {
            // e.preventDefault();

            lastFocusedElement = document.activeElement;

            let modalId = item.getAttribute('data-modal'),
                modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

            modalElem.classList.add('active');
            overlay.classList.add('active');

            console.log('modalElem', modalElem);

        });
    });

    closeButtons.forEach(function(item){
        item.addEventListener('click', function(e) {
            let parentModal = this.closest('.modal');
            parentModal.classList.remove('active');
            overlay.classList.remove('active');
            // Возврат фокуса на инициирующую кнопку
            lastFocusedElement.focus();
        });
    });

    overlay.addEventListener('click', function(e) {
        modals.forEach((item) => {
            item.classList.remove('active');
            overlay.classList.remove('active');
            // Возврат фокуса на инициирующую кнопку
            lastFocusedElement.focus();
        });
    });


    // Обработка Esc
    window.onkeydown = function( event ) {
        let clickEvent = new Event('click');
        if ( event.keyCode == 27 ) {
            closeButtons.forEach((item) => {
                item.dispatchEvent(clickEvent);
            });
            // Возврат фокуса на инициирующую кнопку
            lastFocusedElement.focus();
        }
    };




});

