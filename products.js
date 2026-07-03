async function test() {

    alert("Starting...");

    const { data, error } = await supabase
        .from("products")
        .select("*");

    if (error) {
        alert(error.message);
        return;
    }

    alert(JSON.stringify(data));
}

test();
