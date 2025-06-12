const chaptersContainer = document.querySelector("#chapters-container");
const addChapterButton = document.querySelector("#add-chapter");
if (addChapterButton && chaptersContainer) {
  addChapterButton.addEventListener("click", () => {
    const index = chaptersContainer.children.length;

    const newChapter = document.createElement("div");
    newChapter.classList.add("chapter-group"); 

    newChapter.innerHTML = `
      <input type="text" name="chapters[${index}][title]" placeholder="Tiêu đề chương" required>
      <input type="number" name="chapters[${index}][page]" placeholder="Trang bắt đầu" required>
      <button type="button" class="remove-chapter">Xóa chương</button>
    `;

    chaptersContainer.appendChild(newChapter);

    // Gắn sự kiện xóa
    newChapter.querySelector(".remove-chapter").addEventListener("click", () => {
      newChapter.remove();
    });
  });
}

