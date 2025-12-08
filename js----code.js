<script>
document.addEventListener("DOMContentLoaded", function () {

    // === 1. دالة الانتظار (من كودك الأصلي) ===
    function waitFor(selector, callback) {
        // إضافة فحص بسيط لمنع تكرار التنفيذ على نفس العنصر
        if (document.querySelector(selector + '[data-js-processed="true"]')) return;

        const interval = setInterval(() => {
            const el = document.querySelector(selector);
            if (el && !el.hasAttribute('data-js-processed')) {
                clearInterval(interval);
                el.setAttribute('data-js-processed', 'true'); // تعليم العنصر
                callback(el);
            }
        }, 200);
    }

    // === 2. تنفيذ التعديلات الهيكلية وتغيير الأيقونات ===
    
    // أ) ضبط الهيكل (Grid)
    waitFor("header.default_header .flex.items-center", function (headerRow) {
        headerRow.style.display = "grid";
        headerRow.style.gridTemplateColumns = "1fr auto 1fr";
        headerRow.style.alignItems = "center";
        headerRow.style.width = "100%";
    });

    // ب) زر المنيو
    waitFor("button.bg-white.py-2.lg\\:hidden", function (menuBtn) {
        menuBtn.querySelectorAll("svg, img").forEach(x => x.remove());
        
        const img = document.createElement("img");
        img.src = "https://files.easy-orders.net/1765166038824688914.png";
        img.style.width = "23px";
        img.style.height = "23px";
        img.alt = "Menu";
        img.classList.add("custom-header-icon"); // كلاس للتحكم في اللون

        menuBtn.style.justifySelf = "start";
        menuBtn.style.marginLeft = "0px";
        menuBtn.style.backgroundColor = "transparent"; // مهم جداً: إزالة الخلفية البيضاء للزر
        
        menuBtn.appendChild(img);
    });

    // ج) زر البحث
    waitFor("a[href='/search']", function (searchParent) {
        searchParent.querySelectorAll("svg, img").forEach(x => x.remove());

        const img = document.createElement("img");
        img.src = "https://files.easy-orders.net/1765165976671910310.png";
        img.style.width = "25px";
        img.style.height = "25px";
        img.alt = "Search";
        img.classList.add("custom-header-icon");

        searchParent.style.marginRight = "-3px"; 
        searchParent.insertBefore(img, searchParent.firstChild);
    });

    // د) زر السلة
    waitFor("button.group.relative.flex.items-center", function (cartBtn) {
        const svg = cartBtn.querySelector("svg");
        if (svg) svg.remove();

        const img = document.createElement("img");
        img.src = "https://files.easy-orders.net/1765165976715042792.png";
        img.style.width = "22px";
        img.style.height = "22px";
        img.alt = "Cart";
        img.classList.add("custom-header-icon");

        cartBtn.style.marginRight = "20px";
        cartBtn.insertBefore(img, cartBtn.firstChild);
    });

    // هـ) حاوية الأيقونات
    waitFor(".ms-auto.flex.items-center", function (iconsWrapper) {
        iconsWrapper.style.justifySelf = "end";
        iconsWrapper.style.display = "flex";
        iconsWrapper.style.alignItems = "center";
        iconsWrapper.style.gap = "15px";
    });

    // و) توسيط اللوجو
    waitFor(".default_header_logo", function (logoArea) {
        logoArea.style.justifySelf = "center";
    });


    // === 3. منطق السكرول والصفحة الرئيسية (الجديد) ===
    let lastPath = "";
    const headerWrapper = document.querySelector('.sticky.top-0');
    const body = document.body;

    function handleScroll() {
        if (!body.classList.contains('is-home-page')) return;

        const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercentage > 5) {
            headerWrapper.classList.add('header-scrolled');
            headerWrapper.classList.remove('header-transparent');
        } else {
            headerWrapper.classList.add('header-transparent');
            headerWrapper.classList.remove('header-scrolled');
        }
    }

    function checkUrlChange() {
        const currentPath = window.location.pathname;
        if (currentPath !== lastPath) {
            lastPath = currentPath;
            if (currentPath === "/" || currentPath === "/index.html") {
                // نحن في الهوم
                body.classList.add('is-home-page');
                handleScroll();
                window.addEventListener('scroll', handleScroll);
            } else {
                // نحن في صفحة داخلية
                body.classList.remove('is-home-page');
                headerWrapper.classList.remove('header-transparent', 'header-scrolled');
                window.removeEventListener('scroll', handleScroll);
            }
        }
    }

    // تشغيل المراقب
    checkUrlChange();
    setInterval(checkUrlChange, 200);
});
</script>
