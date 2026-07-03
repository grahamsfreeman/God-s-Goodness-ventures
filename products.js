async function loadProducts() {
    const productGrid = document.getElementById("productGrid");

    if (!productGrid) return;

    // Show loading message
    productGrid.innerHTML = "<h3>Loading products...</h3>";

    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        productGrid.innerHTML = "<h3>Unable to load products.</h3>";
        return;
    }

    productGrid.innerHTML = "";

    data.forEach(product => {

        productGrid.innerHTML += `
            <div class="product-card">

                <img src="${product.image}" alt="${product.name}">

                <div class="product-info">

                    <h3>${product.name}</h3>

                    <p>${product.description}</p>

                    <p><strong>${product.price}</strong></p>

                    <a
                        href="https://wa.me/2348030483262?text=Hello, I'm interested in ordering ${encodeURIComponent(product.name)}."
                        target="_blank">

                        Order Now

                    </a>

                </div>

            </div>
        `;
    });

}

loadProducts();
