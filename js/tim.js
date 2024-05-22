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

let cardPerView = Math.round(cover2.offsetWidth / firstCardWidth);

cover2Childrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    cover2.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

cover2Childrens.slice(0, cardPerView).forEach((card) => {
  cover2.insertAdjacentHTML("beforeend", card.outerHTML);
});

cover2.classList.add("no-transition");
cover2.scrollLeft = cover2.offsetWidth;
cover2.classList.remove("no-transition");

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    cover2.scrollLeft += btn.id == "kiri" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  cover2.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = cover2.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  cover2.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  cover2.classList.remove("dragging");
};

const infiniteScroll = () => {
  if (cover2.scrollLeft === 0) {
    cover2.classList.add("no-transition");
    cover2.scrollLeft = cover2.scrollWidth - 2 * cover2.offsetWidth;
    cover2.classList.remove("no-transition");
  } else if (
    Math.ceil(cover2.scrollLeft) ===
    cover2.scrollWidth - cover2.offsetWidth
  ) {
    cover2.classList.add("no-transition");
    cover2.scrollLeft = cover2.offsetWidth;
    cover2.classList.remove("no-transition");
  }
  clearTimeout(timeoutId);
  if (!cover.matches(":hover")) autoPlay();
};

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return;
  timeoutId = setTimeout(() => (cover2.scrollLeft += firstCardWidth), 2500);
};
autoPlay();

cover2.addEventListener("mousedown", dragStart);
cover2.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
cover2.addEventListener("scroll", infiniteScroll);
cover.addEventListener("mouseenter", () => clearTimeout(timeoutId));
cover.addEventListener("mouseleave", autoPlay);
