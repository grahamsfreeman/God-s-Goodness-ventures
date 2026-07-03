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
