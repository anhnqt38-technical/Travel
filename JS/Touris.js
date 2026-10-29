
function toggleRoute(routeId, button) {
    const selectedRoute = document.getElementById(routeId);
    const isOpening = selectedRoute.hidden;

    document.querySelectorAll(".route-details").forEach(route => {
        route.hidden = true;
    });

    document.querySelectorAll(".journey-button").forEach(btn => {
        btn.setAttribute("aria-expanded", "false");
        btn.firstElementChild.textContent = "↗";
    });

    if (isOpening) {
        selectedRoute.hidden = false;
        button.setAttribute("aria-expanded", "true");
        button.firstElementChild.textContent = "↘";

        setTimeout(() => {
            selectedRoute.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 50);
    }
}


const form = document.getElementById("reviewForm");
const reviewList = document.getElementById("reviewList");

let reviews = JSON.parse(
    localStorage.getItem("reviews") || "[]"
);

function showReviews() {
    reviewList.innerHTML = "";

    if (reviews.length === 0) {
        reviewList.textContent = "Chưa có bình luận nào.";
        return;
    }

    reviews.forEach(function(review) {
        const item = document.createElement("div");
        item.className = "review-item";

        const name = document.createElement("h4");
        name.textContent = review.name;

        const rating = document.createElement("p");
        rating.textContent = "Đánh giá: " +
            "★".repeat(review.rating);

        const comment = document.createElement("p");
        comment.textContent = review.comment;

        item.append(name, rating, comment);
        reviewList.appendChild(item);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const rating = Number(document.getElementById("rating").value);
    const comment = document.getElementById("comment").value.trim();

    if (!name || !comment) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    reviews.unshift({
        name: name,
        rating: rating,
        comment: comment
    });

    try {
        localStorage.setItem("reviews", JSON.stringify(reviews));
    } catch (error) {
        reviews.shift();
        alert("Không thể lưu bình luận!");
        return;
    }

    showReviews();

    form.reset();
});

showReviews();

