// =========================
// CHECK LOGIN
// =========================

async function checkAdmin() {

    const { data: { session } } =
        await window.supabaseClient.auth.getSession();

    if (!session) {

        window.location.href = "login.html";
        return;

    }

}

checkAdmin();


// =========================
// LOAD STATISTICS
// =========================

async function loadStats() {

    const { count: productCount } =
        await window.supabaseClient
        .from("products")
        .select("*", { count: "exact", head: true });

    document.getElementById("totalProducts").textContent = productCount || 0;

    const { count: reviewCount } =
        await window.supabaseClient
        .from("reviews")
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
