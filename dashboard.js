// ==========================================
// GOD'S GOODNESS VENTURE ADMIN DASHBOARD
// ==========================================


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

checkAdmin();


// ==========================================
// LOGOUT
// ==========================================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", async () => {

        await window.supabaseClient.auth.signOut();

        window.location.href = "login.html";

    });

}


// ==========================================
// LOAD DASHBOARD STATISTICS
// ==========================================

async function loadStats() {

    // Products
    const { count: productCount } =
        await window.supabaseClient
        .from("products")
        .select("*", {
            count: "exact",
            head: true
        });

    document.getElementById("totalProducts").textContent =
        productCount || 0;


    // Reviews
    const { count: reviewCount } =
        await window.supabaseClient
        .from("reviews")
        .select("*", {
            count: "exact",
            head: true
        });

    document.getElementById("totalReviews").textContent =
        reviewCount || 0;


    // Website Visits
    const { data: visits } =
        await window.supabaseClient
        .from("visits")
        .select("*")
        .limit(1);

    if (visits && visits.length > 0) {

        document.getElementById("totalVisits").textContent =
            visits[0].count;

    }

}        .from("reviews")
        .select("*", { count: "exact", head: true });

    document.getElementById("totalReviews").textContent = reviewCount || 0;

}

loadStats();


// =========================
// LOGOUT
// =========================

document.getElementById("logoutBtn")
.addEventListener("click", async () => {

    await window.supabaseClient.auth.signOut();

    window.location.href = "login.html";

});
// ==============================
// ADD PRODUCT
// ==============================

const productForm = document.getElementById("productForm");

productForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("productName").value.trim();
    const description = document.getElementById("productDescription").value.trim();
    const price = document.getElementById("productPrice").value.trim();

    const imageFile =
        document.getElementById("productImage").files[0];

    if (!imageFile) {

        alert("Please choose an image.");
        return;

    }

    // Unique filename
    const fileName = `${Date.now()}-${imageFile.name}`;

    // Upload image
    const { error: uploadError } =
        await window.supabaseClient.storage
        .from("products")
        .upload(fileName, imageFile);

    if (uploadError) {

        alert(uploadError.message);
        return;

    }

    // Get public URL
    const { data } =
        window.supabaseClient.storage
        .from("products")
        .getPublicUrl(fileName);

    const imageUrl = data.publicUrl;

    // Save product
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

    alert("Product Added Successfully!");

    productForm.reset();

    loadStats();

});
// ==========================================
// ADD PRODUCT
// ==========================================

const productForm = document.getElementById("productForm");

if (productForm) {

    productForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = document.getElementById("productName").value.trim();
        const description = document.getElementById("productDescription").value.trim();
        const price = document.getElementById("productPrice").value.trim();

        const imageFile = document.getElementById("productImage").files[0];

        if (!imageFile) {

            alert("Please select an image.");

            return;

        }

        const fileName = `${Date.now()}-${imageFile.name}`;

        // Upload Image
        const { error: uploadError } =
            await window.supabaseClient.storage
            .from("products")
            .upload(fileName, imageFile);

        if (uploadError) {

            alert(uploadError.message);

            return;

        }

        // Get Public URL
        const { data } =
            window.supabaseClient.storage
            .from("products")
            .getPublicUrl(fileName);

        const imageUrl = data.publicUrl;

        // Save Product
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

        alert("Product Added Successfully!");

        productForm.reset();

        loadProducts();

        loadStats();

    });

            }
 // ==========================================
// LOAD PRODUCTS
// ==========================================

async function loadProducts() {

    const productsList = document.getElementById("productsList");

    if (!productsList) return;

    productsList.innerHTML = "<p>Loading products...</p>";

    const { data, error } = await window.supabaseClient
        .from("products")
        .select("*")
        .order("id", { ascending: false });

    if (error) {

        productsList.innerHTML = error.message;

        return;

    }

    if (data.length === 0) {

        productsList.innerHTML = "<p>No products found.</p>";

        return;

    }

    productsList.innerHTML = "";

    data.forEach(product => {

        productsList.innerHTML += `

        <div class="product-card">

            <img
                src="${product.image}"
                width="120"
                style="border-radius:10px;">

            <h3>${product.name}</h3>

            <p>${product.description}</p>

            <strong>${product.price}</strong>

            <br><br>

            <button
                onclick="editProduct(${product.id})">

                Edit

            </button>

            <button
                onclick="deleteProduct(${product.id})">

                Delete

            </button>

        </div>

        <hr>

        `;

    });

}

loadProducts();


// ==========================================
// DELETE PRODUCT
// ==========================================

async function deleteProduct(id) {

    const confirmDelete =
        confirm("Delete this product?");

    if (!confirmDelete) return;

    const { error } =
        await window.supabaseClient
        .from("products")
        .delete()
        .eq("id", id);

    if (error) {

        alert(error.message);

        return;

    }

    alert("Product deleted successfully!");

    loadProducts();

    loadStats();

}


// ==========================================
// TEMPORARY EDIT BUTTON
// ==========================================

function editProduct(id){

    alert("Editing Product ID: " + id);

}
