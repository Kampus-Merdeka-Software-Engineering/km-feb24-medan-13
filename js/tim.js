const cover = document.querySelector(".cover");
const cover2 = document.querySelector(".cover2");
const firstCardWidth = cover2.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".cover i");
const cover2Childrens = [...cover2.children];

let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;

// Menghitung jumlah item di cover2
const totalItems = cover2Childrens.length;

// Jumlah item yang ingin ditampilkan sekaligus
const cardPerView = Math.min(12, totalItems);

// Mengatur ulang konten untuk memastikan looping bekerja dengan benar
cover2Childrens.slice(-cardPerView).reverse().forEach((card) => {
  cover2.insertAdjacentHTML("afterbegin", card.outerHTML);
});

cover2Childrens.slice(0, cardPerView).forEach((card) => {
  cover2.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Menambahkan event listener untuk tombol panah
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    cover2.scrollLeft += btn.id == "kiri" ? -firstCardWidth : firstCardWidth;
  });
});

// Fungsi untuk memulai drag
const dragStart = (e) => {
  isDragging = true;
  startX = (e.pageX || e.touches[0].pageX) - cover2.offsetLeft;
  startScrollLeft = cover2.scrollLeft;
  cover2.style.cursor = "grabbing"; // Ubah kursor saat drag dimulai
};

// Fungsi untuk melakukan drag
const dragging = (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = (e.pageX || e.touches[0].pageX) - cover2.offsetLeft;
  const walk = (x - startX) * 3; // Faktor scroll
  cover2.scrollLeft = startScrollLeft - walk;
};

// Fungsi untuk menghentikan drag
const dragStop = () => {
  isDragging = false;
  cover2.style.cursor = "grab"; // Ubah kursor kembali ke semula
};

// Fungsi untuk mengatur scrolling tak terbatas
const infiniteScroll = () => {
  if (cover2.scrollLeft === 0) {
    cover2.classList.add("no-transition");
    cover2.scrollLeft = cover2.scrollWidth - 2 * cover2.offsetWidth;
    cover2.classList.remove("no-transition");
  } else if (
    Math.ceil(cover2.scrollLeft) >=
    cover2.scrollWidth - cover2.offsetWidth
  ) {
    cover2.classList.add("no-transition");
    cover2.scrollLeft = cover2.offsetWidth;
    cover2.classList.remove("no-transition");
  }
  clearTimeout(timeoutId);
  if (!cover.matches(":hover")) autoPlay();
};

// Fungsi untuk otomatisasi scrolling
const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return;
  timeoutId = setTimeout(() => (cover2.scrollLeft += firstCardWidth), 2500);
};
autoPlay();

// Menambahkan event listener untuk mouse events
cover2.addEventListener("mousedown", dragStart);
cover2.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
cover2.addEventListener("scroll", infiniteScroll);
cover.addEventListener("mouseenter", () => clearTimeout(timeoutId));
cover.addEventListener("mouseleave", autoPlay);

// Menambahkan event listener untuk touch events
cover2.addEventListener("touchstart", dragStart);
cover2.addEventListener("touchmove", dragging);
cover2.addEventListener("touchend", dragStop);
