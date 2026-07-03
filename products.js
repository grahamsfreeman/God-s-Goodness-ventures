async function testProducts() {
    alert("Fetching products...");

    try {
        const { data, error } = await window.supabaseClient
            .from("products")
            .select("*");

        if (error) {
            alert("ERROR: " + error.message);
            return;
        }

        alert("SUCCESS!");

        alert(JSON.stringify(data));

    } catch (err) {
        alert("CATCH: " + err.message);
    }
}

testProducts();
