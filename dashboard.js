// ==========================================
// GOD'S GOODNESS VENTURE ADMIN DASHBOARD
// ==========================================

let editingProductId = null;

// ==========================================
// CHECK ADMIN LOGIN
// ==========================================

async function checkAdmin() {

    const { data: { session } } =
        await window.supabaseClient.auth.getSession();

    if (!session) {

        window.location.href = "login.html";
        return;

    }

}

// ==========================================
// LOGOUT
// ==========================================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.onclick = async () => {

        await window.supabaseClient.auth.signOut();

        window.location.href = "login.html";

    };

}

// ==========================================
// DASHBOARD STATS
// ==========================================

async function loadStats() {

    const { count: productCount } =
        await window.supabaseClient
        .from("products")
        .select("*", { count: "exact", head: true });

    document.getElementById("totalProducts").textContent =
        productCount || 0;

    const { count: reviewCount } =
        await window.supabaseClient
        .from("reviews")
        .select("*", { count: "exact", head: true });

    document.getElementById("totalReviews").textContent =
        reviewCount || 0;

    const { data: visit } =
        await window.supabaseClient
        .from("visits")
        .select("count")
        .eq("id", 1)
        .single();

    document.getElementById("totalVisits").textContent =
        visit ? visit.count : 0;

}
// ==========================================
// PRODUCT FORM
// ==========================================

const productForm = document.getElementById("productForm");

if (productForm) {

    productForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = document.getElementById("productName").value.trim();
        const description = document.getElementById("productDescription").value.trim();
        const price = document.getElementById("productPrice").value.trim();
        const imageInput = document.getElementById("productImage");
        const imageFile = imageInput.files[0];

        let imageUrl = null;

        // Upload image if selected
        if (imageFile) {

            const fileName = `${Date.now()}-${imageFile.name}`;

            const { error: uploadError } =
                await window.supabaseClient.storage
                .from("products")
                .upload(fileName, imageFile);

            if (uploadError) {

                alert(uploadError.message);
                return;

            }

            const { data } =
                window.supabaseClient.storage
                .from("products")
                .getPublicUrl(fileName);

            imageUrl = data.publicUrl;

        }

        // =====================
        // UPDATE PRODUCT
        // =====================

        if (editingProductId) {

            const updateData = {

                name,
                description,
                price

            };

            if (imageUrl) {

                updateData.image = imageUrl;

            }

            const { error } =
                await window.supabaseClient
                .from("products")
                .update(updateData)
                .eq("id", editingProductId);

            if (error) {

                alert(error.message);
                return;

            }

            alert("Product updated successfully!");

            editingProductId = null;

            document.getElementById("saveBtn").textContent =
                "Save Product";

        }

        // =====================
        // ADD PRODUCT
        // =====================

        else {

            if (!imageUrl) {

                alert("Please select a product image.");

                return;

            }

            const { error } =
                await window.supabaseClient
                .from("products")
                .insert([{

                    name,
                    description,
                    price,
                    image: imageUrl

                }]);

            if (error) {

                alert(error.message);

                return;

            }

            alert("Product added successfully!");

        }

        productForm.reset();

        await loadProducts();

        await loadStats();

    });

    }
// ==========================================
// LOAD PRODUCTS
// ==========================================

async function loadProducts() {

    const productsList = document.getElementById("productsList");

    if (!productsList) return;

    productsList.innerHTML = "Loading products...";

    const { data, error } = await window.supabaseClient
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {

        console.error(error);

        productsList.innerHTML = "<p>Failed to load products.</p>";

        return;

    }

    if (!data || data.length === 0) {

        productsList.innerHTML = "<p>No products found.</p>";

        return;

    }

    productsList.innerHTML = "";

    data.forEach(product => {

        productsList.innerHTML += `

        <div class="product-card">

            <img src="${product.image}" alt="${product.name}">

            <div class="product-info">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <strong>₦${product.price}</strong>

            </div>

            <div class="action-buttons">

                <button
                    class="edit-btn"
                    onclick="editProduct('${product.id}')">

                    Edit

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteProduct('${product.id}')">

                    Delete

                </button>

            </div>

        </div>

        `;

    });

}


// ==========================================
// EDIT PRODUCT
// ==========================================

async function editProduct(id) {

    const { data, error } = await window.supabaseClient
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {

        console.error(error);

        alert(error.message);

        return;

    }

    editingProductId = id;

    document.getElementById("productName").value = data.name;
    document.getElementById("productDescription").value = data.description;
    document.getElementById("productPrice").value = data.price;

    document.getElementById("saveBtn").textContent = "Update Product";

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ==========================================
// DELETE PRODUCT
// ==========================================

async function deleteProduct(id) {

    if (!confirm("Delete this product?")) return;

    const { error } = await window.supabaseClient
        .from("products")
        .delete()
        .eq("id", id);

    if (error) {

        console.error(error);

        alert(error.message);

        return;

    }

    alert("Product deleted successfully!");

    await loadProducts();

    await loadStats();

}
// ==========================================
// LOAD REVIEWS
// ==========================================

async function loadReviews() {

    const reviewsList = document.getElementById("reviewsList");

    if (!reviewsList) return;

    reviewsList.innerHTML = "Loading reviews...";

    const { data, error } = await window.supabaseClient
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {

        console.error(error);

        reviewsList.innerHTML = "<p>Failed to load reviews.</p>";

        return;

    }

    if (!data || data.length === 0) {

        reviewsList.innerHTML = "<p>No reviews available.</p>";

        return;

    }

    reviewsList.innerHTML = "";

    data.forEach(review => {

        const stars = "⭐".repeat(Number(review.rating || 0));

        reviewsList.innerHTML += `

        <div class="review-card">

            <div class="review-info">

                <h3>${review.name}</h3>

                <p class="stars">${stars}</p>

                <p>${review.message}</p>

                <small>${new Date(review.created_at).toLocaleString()}</small>

            </div>

            <div class="action-buttons">

                <button
                    class="delete-btn"
                    onclick="deleteReview('${review.id}')">

                    Delete

                </button>

            </div>

        </div>

        `;

    });

}


// ==========================================
// DELETE REVIEW
// ==========================================

async function deleteReview(id) {

    if (!confirm("Delete this review?")) return;

    const { error } = await window.supabaseClient
        .from("reviews")
        .delete()
        .eq("id", id);

    if (error) {

        console.error(error);

        alert(error.message);

        return;

    }

    alert("Review deleted successfully!");

    await loadReviews();

    await loadStats();

}
// ==========================================
// LOAD VISITS
// ==========================================

async function loadVisits() {

    const { data, error } = await window.supabaseClient
        .from("visits")
        .select("count")
        .eq("id", 1)
        .single();

    if (error) {

        console.error(error);

        return;

    }

    document.getElementById("totalVisits").textContent =
        data ? data.count : 0;

}


// ==========================================
// REFRESH DASHBOARD
// ==========================================

async function refreshDashboard() {

    await loadStats();

    await loadProducts();

    await loadReviews();

    await loadVisits();

}


// ==========================================
// INITIALIZE DASHBOARD
// ==========================================

window.addEventListener("DOMContentLoaded", async () => {

    await checkAdmin();

    await refreshDashboard();

});


// ==========================================
// AUTO REFRESH
// ==========================================

setInterval(async () => {

    await refreshDashboard();

}, 30000);
