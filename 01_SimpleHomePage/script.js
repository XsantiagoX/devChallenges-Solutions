// · · · Variables
const elements = {
  logo: document.getElementById("logo"),
  menuSVG: document.getElementById("menuSVG"),
  linksItem: document.querySelectorAll(".links__item"),
  desktopThemeToggleBtn: document.getElementById("desktopThemeToggle"),
  mobileThemeToggleBtn: document.getElementById("mobileThemeToggle"),
  menuToggleBtn: document.getElementById("menuToggle"),
  headerMenu: document.querySelector(".header__menu"),
};

// · · · Functions
function handleTheme() {
  const theme = document.documentElement.getAttribute("data-theme");
  const isDarkTheme = theme === "dark";

  elements.mobileThemeToggleBtn.checked = !isDarkTheme;
  elements.desktopThemeToggleBtn.checked = !isDarkTheme;

  document.documentElement.setAttribute(
    "data-theme",
    isDarkTheme ? "light" : "dark"
  );

  elements.menuSVG.setAttribute(
    "src",
    `/assets/svg/Menu${isDarkTheme ? "" : "_light"}.svg`
  );
  elements.logo.setAttribute(
    "src",
    `/assets/svg/alarado-icon-homepage${isDarkTheme ? "" : "-light"}.svg`
  );
}

function hadleLinks(item) {
  elements.linksItem.forEach((link) =>
    link.classList.remove("links__item--active")
  );

  const index = Array.from(elements.linksItem).indexOf(item);
  const siblingIndex =
    index < elements.linksItem.length / 2
      ? index + elements.linksItem.length / 2
      : index - elements.linksItem.length / 2;

  item.classList.add("links__item--active");
  elements.linksItem[siblingIndex].classList.add("links__item--active");
}

function handleMenu() {
  const isMenuOpen = elements.headerMenu.getAttribute("data-state") === "open";
  elements.headerMenu.setAttribute("data-state", isMenuOpen ? "closed" : "open");
  document.documentElement.style.overflowY = isMenuOpen ? "auto" : "hidden";
}

// · · · Event listeners
elements.desktopThemeToggleBtn.addEventListener("change", handleTheme);
elements.mobileThemeToggleBtn.addEventListener("change", handleTheme);

elements.menuToggleBtn.addEventListener("click", handleMenu);
elements.menuToggleBtn.addEventListener("blur", handleMenu);

elements.linksItem.forEach((item) =>
  item.addEventListener("click", () => hadleLinks(item))
);
