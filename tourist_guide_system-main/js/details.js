const reviewForm = document.querySelector('.add-review form');
const reviewRating = reviewForm?.querySelector('input[name="rating"]');
const reviewComment = reviewForm?.querySelector('textarea[name="comment"]');

if (reviewForm) {
  reviewForm.addEventListener('submit', (event) => {
    const rating = Number(reviewRating?.value || 0);
    const comment = reviewComment?.value.trim() || '';

    if (!rating || rating < 1 || rating > 5) {
      event.preventDefault();
      window.showToast?.('Please choose a rating from 1 to 5');
      return;
    }

    if (!comment) {
      event.preventDefault();
      window.showToast?.('Please write a short review before submitting');
    }
  });
}
