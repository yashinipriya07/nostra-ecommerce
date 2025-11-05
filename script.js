document.addEventListener("DOMContentLoaded", () => {

    // ====== POPUP ======
    const popup = document.getElementById('signup-popup');
    const closeBtn = document.getElementById('close-popup');

    if (popup) {
        setTimeout(() => {
            popup.style.display = 'flex';
        }, 5000);

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                popup.style.display = 'none';
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.style.display = 'none';
            }
        });
    }

    // ====== SLIDER ======
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

    // ====== SIDE NAVBAR ======
    const sidenav = document.getElementById('sidenav');
    const openNav = document.getElementById('opennav');
    const closeNav = document.getElementById('closenav');

    if (sidenav && openNav && closeNav) {
        openNav.addEventListener('click', () => sidenav.style.right = '0');
        closeNav.addEventListener('click', () => sidenav.style.right = '-50%');
    }

    // ====== COLLECTION FILTERING ======
    const searchInput = document.querySelector(".search__bar input");
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const products = document.querySelectorAll(".collection__images .images");

    if (searchInput && products.length > 0) {

        function filterProducts() {
            const searchText = searchInput.value.toLowerCase().trim();

            const selectedOccasions = Array.from(document.querySelectorAll('input[name="occasion"]:checked'))
                .map(cb => cb.value.toLowerCase());
            const selectedColors = Array.from(document.querySelectorAll('input[name="colors"]:checked'))
                .map(cb => cb.value.toLowerCase());
            const selectedArrivals = Array.from(document.querySelectorAll('input[name="Arrivals"]:checked'))
                .map(cb => cb.value.toLowerCase());

            let anyVisible = false;

            products.forEach(product => {
                const title = product.querySelector("h4")?.textContent.toLowerCase() || "";

                // Get dataset values safely
                const productOccasion = (product.dataset.occasion || "").toLowerCase();
                const productColor = (product.dataset.color || "").toLowerCase();
                const productArrival = (product.dataset.arrival || "").toLowerCase();

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

            // Show "No products found" message
            let noMsg = document.querySelector("#no-results");
            if (!anyVisible) {
                if (!noMsg) {
                    noMsg = document.createElement("p");
                    noMsg.id = "no-results";
                    noMsg.textContent = "No products found";
                    noMsg.style.cssText = "text-align:center;font-weight:bold;margin-top:20px;";
                    document.querySelector(".collection__images").appendChild(noMsg);
                }
                noMsg.style.display = "block";
            } else if (noMsg) {
                noMsg.style.display = "none";
            }
        }

        // Add event listeners
        searchInput.addEventListener("input", filterProducts);
        checkboxes.forEach(cb => cb.addEventListener("change", filterProducts));

        // Initial filter
        filterProducts();
    }

});
