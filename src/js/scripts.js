window.addEventListener('load', () => {

    // Scroll menu
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let href = this.getAttribute('href').substring(1);
            const scrollTarget = document.getElementById(href);
            const topOffset = document.querySelector('.scrollto').offsetHeight;
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
});

