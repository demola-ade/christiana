// Builds the "many inputs -> one point" flow graphic in the hero.
(function () {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const CENTER = { x: 435, y: 138 };

  const COLORS = {
    blue: "#2f5bff",
    purple: "#9b4df0",
    pink: "#f23fc0",
    gray: "#c9cdd8",
  };

  // [x, y, color] in the SVG's 880 x 260 coordinate space
  const NODES = [
    [35, 11, "gray"],
    [131, 19, "blue"],
    [79, 57, "purple"],
    [286, 30, "pink"],
    [4, 84, "gray"],
    [28, 143, "blue"],
    [45, 112, "gray"],
    [154, 127, "pink"],
    [317, 81, "purple"],
    [124, 116, "gray"],
    [76, 162, "gray"],
    [293, 168, "gray"],
    [293, 192, "pink"],
    [340, 224, "pink"],
    [190, 231, "purple"],
    [50, 203, "gray"],
    [127, 232, "gray"],
    [222, 249, "gray"],
    [265, 249, "gray"],
    [280, 217, "gray"],
  ];

  const linesGroup = document.getElementById("inputLines");
  const dotsGroup = document.getElementById("inputDots");
  if (!linesGroup || !dotsGroup) return;

  function el(name, attrs) {
    const node = document.createElementNS(SVG_NS, name);
    Object.keys(attrs).forEach((k) => node.setAttribute(k, attrs[k]));
    return node;
  }

  function curve(x, y, spread) {
    const dx = CENTER.x - x;
    const c1x = x + dx * 0.55;
    const c1y = y + (CENTER.y - y) * 0.05;
    const c2x = CENTER.x - dx * 0.5;
    const c2y = CENTER.y + spread;
    return `M${x} ${y} C${c1x} ${c1y} ${c2x} ${c2y} ${CENTER.x} ${CENTER.y}`;
  }

  NODES.forEach(([x, y, color], i) => {
    const stroke = COLORS[color];
    const isGray = color === "gray";

    // Main line + a fainter "ghost" line to create the woven bundle effect
    [
      { spread: 0, width: isGray ? 0.9 : 1.3, opacity: isGray ? 0.55 : 0.8 },
      { spread: (i % 2 ? 1 : -1) * 14, width: 0.7, opacity: isGray ? 0.25 : 0.4 },
    ].forEach((v, n) => {
      const path = el("path", {
        d: curve(x, y, v.spread),
        class: "inLine",
        stroke: stroke,
        "stroke-width": v.width,
        "stroke-opacity": v.opacity,
        pathLength: "1",
      });
      path.style.animationDelay = `${i * 0.04 + n * 0.1}s`;
      linesGroup.appendChild(path);
    });

    dotsGroup.appendChild(
      el("circle", {
        cx: x,
        cy: y,
        r: isGray ? 3 : 3.5,
        fill: stroke,
      }),
    );
  });
})();

// Nav: mark the clicked link as active
document.querySelectorAll(".navLink").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".navLink").forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navlist = document.querySelector(".navList");
// const bars = document.querySelectorAll(".bar");

const toggleMenu = (open) => {
  const isOpen = open ?? !navlist.classList.contains("open");

  hamburger.classList.toggle("openMenu");
  navlist.classList.toggle("open");
};

//Toggle the menu
hamburger.addEventListener("click", () => toggleMenu());
// close the navigation once click on a link in the navigation list
navlist.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => toggleMenu(false));
});

// document.addEventListener("keydown", (e) => {
//   if (e.key === "Escape") toggleMenu(false);
// });

// document.addEventListener("click", (e) => {
//   if (!e.target.closest(".nav")) toggleMenu(false);
// });

// contact popup
const contactBtn = document.querySelector(".bookBtn");
const close = document.querySelector(".close");
const popup = document.querySelector(".popup");
const overlay = document.querySelector(".overlay");



contactBtn.addEventListener("click", () => {
  popup.classList.add("opencta");
  overlay.classList.add("openOverlay");
});

close.addEventListener("click", (e) => {
  //   if (e.target === popup) {
  popup.classList.remove("opencta");
  overlay.classList.remove("openOverlay");

  //   }
});


// Selected work 
const wrapper = document.querySelector('.cards')
const cards = document.querySelectorAll('.card')
const sk = document.querySelector('.sk__in')
const pc = document.querySelector(".pc__in");
const irm = document.querySelector(".irm__in");
const fe = document.querySelector('.fe__in')
const minimize = document.querySelectorAll(".minimize");


const openWork = (number) => {
    switch(number){
        case 1:
            sk.classList.add("sk-open");
            break;
        case 2:
            pc.classList.add("pc-open");
            break;
        case 3:
            fe.classList.add("fe-open");
            break;
        case 4:
            irm.classList.add("irm-open");
            break;
    }
}

const closeWork = (number) => {
  switch (number) {
    case 1:
      sk.classList.remove("sk-open");
      break;
    case 2:
      pc.classList.remove("pc-open");
      break;
    case 3:
      fe.classList.remove("fe-open");
      break;
    case 4:
      irm.classList.remove("irm-open");
      break;
  }
};

    // const cardNumber = e.target.closest("[data-number]");
wrapper.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    const cardNumber = Number(card.getAttribute("data-number"));
    openWork(cardNumber);
    overlay.classList.add("openOverlay");
  });
});

minimize.forEach((close) => {
  close.addEventListener("click", () => {
    const buttonNumber = Number(close.getAttribute("data-number"));
    closeWork(buttonNumber);
    overlay.classList.remove("openOverlay");
  });
});
