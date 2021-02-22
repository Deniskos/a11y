window.addEventListener('DOMContentLoaded', () => {

    // ----------- Scroll menu --------------
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let href = this.getAttribute('href').substring(1);
            const scrollTarget = document.getElementById(href);
            // const topOffset = document.querySelector('.js-scroll-menu').offsetHeight;
            const topOffset = 0; // если не нужен отступ сверху
            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });

            scrollTarget.focus();
        });
    });

    // ----------- Tabs -------------
    var exhibitionTabs = document.querySelectorAll("#exhibition .nav-tab");
    var exhibitionPanes = document.querySelectorAll("#exhibition .tab-pane");
    var museumTabs = document.querySelectorAll("#museum .nav-tab");
    var museumPanes = document.querySelectorAll("#museum .tab-pane");

    const switchTabs = (tabNavs, tabPanes) => {
        for (var i = 0; i < tabNavs.length; i++) {

            tabNavs[i].addEventListener("click", function(e){
                e.preventDefault();
                var activeTabAttr = e.target.getAttribute("data-tab");

                for (var j = 0; j < tabNavs.length; j++) {
                    var contentAttr = tabPanes[j].getAttribute("data-tab-content");

                    if (activeTabAttr === contentAttr) {
                        tabNavs[j].classList.add("active");
                        tabNavs[j].setAttribute("aria-selected", true)
                        tabPanes[j].classList.add("active");
                    } else {
                        tabNavs[j].classList.remove("active");
                        tabNavs[j].setAttribute("aria-selected", false)
                        tabPanes[j].classList.remove("active");
                    }
                };
            });
        }
    };

    switchTabs(exhibitionTabs, exhibitionPanes);
    switchTabs(museumTabs, museumPanes);



    // --------------- Установка фокусов --------------
    const skipLinkMain = document.getElementById("skip-link_main");
    const areaMain = document.getElementById("main");
    skipLinkMain.addEventListener('click', (e) => {
        areaMain.focus();
    });


    // ---------- Модальное окно -------------

    // focus trap
    const focusTrap = (element) => {
        var focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
        var firstFocusableEl = focusableEls[0];
        var lastFocusableEl = focusableEls[focusableEls.length - 1];
        var KEYCODE_TAB = 9;

        element.addEventListener('keydown', function(e) {
            var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

            if (!isTabPressed) {
                return;
            }

            if ( e.shiftKey ) /* shift + tab */ {
                if (document.activeElement === firstFocusableEl) {
                    lastFocusableEl.focus();
                    e.preventDefault();
                }
            } else /* tab */ {
                if (document.activeElement === lastFocusableEl) {
                    firstFocusableEl.focus();
                    e.preventDefault();
                }
            }
        });
    }

    let   modalButton  = document.querySelector('.js-open-auth-modal'),
          overlay      = document.querySelector('#overlay-modal'),
          closeButton  = document.querySelector('.js-modal-close'),
          authModal    = document.querySelector('.modal'),
          modalForm    = document.querySelector('#modalForm'),
          lastFocusedElement;

    modalButton.addEventListener('click', (e) => {
        focusTrap(authModal);

        lastFocusedElement = document.activeElement;
        modalButton.blur();

        let modalId = modalButton.getAttribute('data-modal'),
            modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

        modalElem.classList.add('active');
        overlay.classList.add('active');

        // let firstModalElement = document.querySelector('.js-login-form');
        authModal.querySelector('.js-login-form').focus();

    });



    const modalClose = () => {
        authModal.classList.remove('active');
        overlay.classList.remove('active');
        // Возврат фокуса на инициирующую кнопку
        console.log('modalForm', modalForm);
        lastFocusedElement.focus();
    };

    modalForm.addEventListener("submit", (e) => {
        e.preventDefault();
        modalClose();
    });
    closeButton.addEventListener('click', () => modalClose());
    overlay.addEventListener('click', () => modalClose());

    // --------------- Обработка Esc --------------------
    window.onkeydown = function( event ) {
        let clickEvent = new Event('click');
        if ( event.keyCode == 27 ) {
            closeButton.dispatchEvent(clickEvent);
        }
    };

});