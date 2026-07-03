async function loadProducts() {

    const productGrid = document.getElementById("productGrid");

    if (!productGrid) {
        alert("productGrid not found!");
        return;
    }

    const { data, error } = await window.supabaseClient
        .from("products")
        .select("*")
        .order("id", { ascending: false });

    if (error) {
        alert(error.message);
        return;
    }

    // Clear the existing hardcoded products
    productGrid.innerHTML = "";

    data.forEach(product => {

        productGrid.innerHTML += `
            <div class="product-card">

                <img src="${product.image}" alt="${product.name}">

                <div class="product-info">

                    <h3>${product.name}</h3>

                    <p>${product.description}</p>

                    <h4>${product.price}</h4>

                    <a href="https://wa.me/2348030483262?text=Hello,%20I'm%20interested%20in%20${encodeURIComponent(product.name)}" class="primary-btn">

                        Order Now

                    </a>

                </div>

            </div>
        `;

    });

}

loadProducts();
