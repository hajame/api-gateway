export function getReviewTotals(reviews) {
    let reviewTotals = new Map();
    reviews.forEach(review => {
        let total = reviewTotals.get(review.productid);
        if (!total) {
            total = { count: 0, rating_sum: 0 };
        }
        total.count = total.count + 1;
        total.rating_sum = total.rating_sum + review.rating;
        reviewTotals.set(review.productid, total);
    });
    return reviewTotals;
}
