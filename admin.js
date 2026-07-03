// ==============================
// ADMIN LOGIN
// ==============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const { error } = await window.supabaseClient.auth.signInWithPassword({

            email,
            password

        });

        if (error) {

            alert(error.message);
            return;

        }

        alert("Login Successful!");

        window.location.href = "dashboard.html";

    });

}
