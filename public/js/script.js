const readBtn = document.getElementById('readBtn');
const id = readBtn.getAttribute('bookId');

readBtn.addEventListener('click', () => {
   window.location.href = `/books/${id}`;
});
