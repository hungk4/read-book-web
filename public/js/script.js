// Xử lý sự kiện nút "Đọc sách"
const readBtn = document.getElementById("readBtn");
if (readBtn) {
  const id = readBtn.getAttribute("bookId");
  readBtn.addEventListener("click", () => {
    window.location.href = `/books/${id}`;
  });
}

// Xử lý sự kiện ấn nút "Xem thêm" để tải thêm sách
document.addEventListener("DOMContentLoaded", () => {
  const booksContainer = document.querySelector(".books.hot");
  const loadMoreBtn = document.querySelector(".load-more");
  if (loadMoreBtn && booksContainer) {
    loadMoreBtn.addEventListener("click", async () => {
      const offset = booksContainer.children.length;

      fetch(`/books/load-more?offset=${offset}&limit=5`)
        .then((response) => response.json())
        .then((data) => {
          const moreBooks = data.moreBooks;
          if (moreBooks.length === 0) {
            loadMoreBtn.style.display = "none"; // Ẩn nút nếu không còn sách để tải
            return;
          }
          moreBooks.forEach((book) => {
            const bookElement = document.createElement("div");
            bookElement.className = "book";
            bookElement.innerHTML = `
              <a href="/detail/${book.id}">
                <img src="/images/${book.image}" alt="${book.title}">
              </a>
              <a href="/detail/${book.id}">
                <h4>${book.title}</h4>
              </a>
            `;
            booksContainer.appendChild(bookElement);
          });
        })
        .catch((error) => console.error("Lỗi tải thêm sách", error));
    });
  }
});

// Xử lý nút xóa sách khỏi tủ sách
const deleteBtns = document.querySelectorAll(".delete-btn");
if(deleteBtns){
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      event.preventDefault();
      const bookId = btn.getAttribute("bookId");
      const response = await fetch(`/bookshelf/delete/${bookId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Xóa sách khỏi DOM
        btn.closest(".book").remove();
      } else {
        console.error("Lỗi khi xóa sách");
      }
    });
  });
}
