async function checkAdmin() {

    const {
        data: { session }
    } = await window.supabaseClient.auth.getSession();

    if (!session) {
        window.location.href = "login.html";
        return;
    }

}

checkAdmin();
