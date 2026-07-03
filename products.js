import { supabase } from "./supabase.js";

async function loadProducts() {

    const productGrid = document.getElementById("productGrid");

    if (!productGrid) return;

    productGrid.innerHTML = "<h3>Loading products...</h3>";

    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        productGrid.innerHTML = `<h3>${error.message}</h3>`;
        console.error(error);
        return;
    }

    if (!data.length) {
        productGrid.innerHTML = "<h3>No products available.</h3>";
        return;
    }

    productGrid.innerHTML = "";

    data.forEach(product => {
        productGrid.innerHTML += `
            <div class="product-card">
                <img src="${product.image || "https://via.placeholder.com/300"}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description || ""}</p>
                    <p><strong>${product.price || ""}</strong></p>
                </div>
            </div>
        `;
    });
}

document.addEventListener("DOMContentLoaded", loadProducts);
                <div class="product-card">

                    <img
                        src="${product.image || 'https://via.placeholder.com/400x300?text=No+Image'}"
                        alt="${product.name}">

                    <div class="product-info">

                        <h3>${product.name}</h3>

                        <p>${product.description}</p>

                        <p style="font-weight:bold; color:#D4AF37; margin-bottom:20px;">
                            ${product.price}
                        </p>

                        <a
                            href="https://wa.me/2348030483262?text=Hello,%20I'm%20interested%20in%20ordering%20${encodeURIComponent(product.name)}."
                            target="_blank">

                            Order Now

                        </a>

                    </div>

                </div>

            `;

        });

    }

    catch (err) {

        console.error(err);

        productGrid.innerHTML = `
            <h3 style="color:red;">
                ${err.message}
            </h3>
        `;

    }

}

document.addEventListener("DOMContentLoaded", loadProducts);
