import { getDocument, GlobalWorkerOptions } from "/js/pdfjs/pdf.min.mjs";

// Configure the worker path
GlobalWorkerOptions.workerSrc = "/js/pdfjs/pdf.worker.min.mjs";

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
if (deleteBtns) {
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

// Xử lý sự kiện click để hiển thị/ẩn menu phụ trong phần "Chapters"
window.toggleMenu = () => {
  const menu = document.querySelector(".chapters .sub-menu");
  if (menu) {
    menu.classList.toggle("hidden");
  }
};
document.addEventListener("click", (event) => {
  const menu = document.querySelector(".chapters .sub-menu");
  const trigger = document.querySelector(".chapters span");
  if (!menu || !trigger) return; // Nếu không tồn tại thì bỏ qua
  if (!trigger.contains(event.target) && !menu.contains(event.target)) {
    menu.classList.add("hidden");
  }
});
// Hết xử lý sự kiện click để hiển thị/ẩn menu phụ trong phần "Chapters"

// PDF.js
document.addEventListener("DOMContentLoaded", () => {
  const url = window.pdfFileUrl;
  const canvas = document.getElementById("pdfCanvas");
  const context = canvas?.getContext("2d");

  if (!canvas || !url) return;

  let pdfDoc = null;
  let currentPage = window.startPage || 1;

  // Load PDF
  getDocument(url).promise.then((pdf) => {
    pdfDoc = pdf;
    document.getElementById("totalPages").textContent = pdf.numPages;

    // Kiểm tra nếu currentPage hợp lệ, nếu không thì dùng 1
    if (currentPage < 1 || currentPage > pdfDoc.numPages) currentPage = 1;

    renderPage(currentPage);
  });

  // Render trang cụ thể
  function renderPage(pageNumber) {
    pdfDoc.getPage(pageNumber).then((page) => {
      const viewport = page.getViewport({ scale: 1.5 });
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      page.render({ canvasContext: context, viewport });

      // Cập nhật lại input số trang
      const input = document.getElementById("currentPageInput");
      if (input) input.value = pageNumber;

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Trang trước
  window.prevPage = () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage(currentPage);
    }
  };

  // Trang sau
  window.nextPage = () => {
    if (currentPage < pdfDoc.numPages) {
      currentPage++;
      renderPage(currentPage);
    }
  };

  // Nhấn Enter để chuyển đến trang được nhập
  const pageInput = document.getElementById("currentPageInput");
  if (pageInput) {
    pageInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const desiredPage = parseInt(pageInput.value, 10);
        if (
          !isNaN(desiredPage) &&
          desiredPage >= 1 &&
          desiredPage <= pdfDoc.numPages
        ) {
          currentPage = desiredPage;
          renderPage(currentPage);
        } else {
          alert(`Trang phải từ 1 đến ${pdfDoc?.numPages}`);
        }
      }
    });
  }
});
// end PDF.js
