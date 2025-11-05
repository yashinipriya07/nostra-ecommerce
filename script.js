document.addEventListener("DOMContentLoaded", () => {
    //===== POP UP MESSAGE =====
    const popup = document.getElementById('signup-popup');
    const closeBtn = document.getElementById('close-popup');

    // Show popup after 2 seconds
    setTimeout(() => {
        popup.style.display = 'flex';
    }, 2000);

    // Close popup when clicking X
    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Close popup when clicking outside the content
    window.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });

    // ======= SLIDER CODE =======
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let index = 0;

        function showSlide(i) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[i].classList.add('active');
        }

        function nextSlide() {
            index = (index + 1) % slides.length;
            showSlide(index);
        }

        showSlide(index);
        setInterval(nextSlide, 3000);
    }

    // ===== Side Navbar =====
    const sidenav = document.getElementById('sidenav');
    const openNav = document.getElementById('opennav');
    const closeNav = document.getElementById('closenav');

    openNav.addEventListener('click', () => {
        sidenav.style.right = '0';
    });

    closeNav.addEventListener('click', () => {
        sidenav.style.right = '-50%';
    });

    // ===== Collections Page Filtering =====
    const searchInput = document.querySelector(".search__bar input");
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const products = document.querySelectorAll(".collection__images .images");

    if (searchInput && products.length > 0) {
        function filterProducts() {
            const searchText = searchInput.value.toLowerCase().trim();
            const selectedOccasions = Array.from(document.querySelectorAll('input[name="occasion"]:checked')).map(cb => cb.value.toLowerCase());
            const selectedColors = Array.from(document.querySelectorAll('input[name="colors"]:checked')).map(cb => cb.value.toLowerCase());
            const selectedArrivals = Array.from(document.querySelectorAll('input[name="Arrivals"]:checked')).map(cb => cb.value.toLowerCase());

            let anyVisible = false;

            products.forEach(product => {
                const title = product.querySelector("h4").textContent.toLowerCase();
                const productOccasion = product.dataset.occasion?.toLowerCase() || "";
                const productColor = product.dataset.color?.toLowerCase() || "";
                const productArrival = product.dataset.arrival?.toLowerCase() || "";

                const matchesSearch = searchText === "" || title.includes(searchText);
                const matchesOccasion = selectedOccasions.length === 0 || selectedOccasions.includes(productOccasion);
                const matchesColor = selectedColors.length === 0 || selectedColors.includes(productColor);
                const matchesArrival = selectedArrivals.length === 0 || selectedArrivals.includes(productArrival);

                if (matchesSearch && matchesOccasion && matchesColor && matchesArrival) {
                    product.style.display = "block";
                    anyVisible = true;
                } else {
                    product.style.display = "none";
                }
            });

            const noMsg = document.querySelector("#no-results");
            if (!anyVisible) {
                if (!noMsg) {
                    const msg = document.createElement("p");
                    msg.id = "no-results";
                    msg.textContent = "No products found";
                    msg.style.textAlign = "center";
                    msg.style.fontWeight = "bold";
                    msg.style.marginTop = "20px";
                    document.querySelector(".collection__images").appendChild(msg);
                }
            } else if (noMsg) {
                noMsg.remove();
            }
        }

        searchInput.addEventListener("input", filterProducts);
        checkboxes.forEach(cb => cb.addEventListener("change", filterProducts));
        filterProducts();
    }
});
