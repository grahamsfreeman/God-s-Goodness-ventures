// ===============================
// LOAD REVIEWS
// ===============================

async function loadReviews() {

    const reviewContainer = document.querySelector(".review-container");

    if (!reviewContainer) return;

    const { data, error } = await window.supabaseClient
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        return;
    }

    reviewContainer.innerHTML = "";

    data.forEach(review => {

        reviewContainer.innerHTML += `
            <div class="review-card">

                <div class="stars">
                    ${"⭐".repeat(review.rating)}
                </div>

                <p>"${review.message}"</p>

                <h4>- ${review.name}</h4>

            </div>
        `;

    });

}


// ===============================
// SAVE REVIEW
// ===============================

const reviewForm = document.getElementById("reviewForm");

if (reviewForm) {

    reviewForm.addEventListener("submit", async function(e){

        e.preventDefault();

        const name =
        document.getElementById("name").value.trim();

        const rating =
        Number(document.getElementById("rating").value);

        const message =
        document.getElementById("message").value.trim();

        if(name === "" || message === ""){

            alert("Please complete the review form.");

            return;

        }

        const { error } = await window.supabaseClient

            .from("reviews")

            .insert([{

                name,
                rating,
                message

            }]);

        if(error){

            alert(error.message);

            return;

        }

        reviewForm.reset();

        alert("Thank you for your review!");

        loadReviews();

    });

}

loadReviews();
