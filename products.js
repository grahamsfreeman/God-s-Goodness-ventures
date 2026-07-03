async function loadProducts() {

    alert("Fetching products...");

    const { data, error } = await window.supabaseClient
        .from("products")
        .select("*");

    if (error) {
        alert("Database Error:\n" + error.message);
        return;
    }

    alert("Products found: " + data.length);

    console.log(data);
}

loadProducts();
