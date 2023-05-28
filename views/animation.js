let idPage = 1;
const soundButton = document.querySelector(".sound-button");
const muteButton = `<i class="fa-solid fa-volume-xmark fa-fade"></i>`
const unmuteButton = `<i class="fa-solid fa-volume-off"></i>`;
const audio = document.querySelector("audio");
soundButton.addEventListener("click", () => {
  console.log("click");
  if (soundButton.innerHTML === muteButton) {
    soundButton.innerHTML = unmuteButton;
    soundButton.classList.remove("is-muted");
    audio.muted = false;
    audio.play();
  } else {
    soundButton.innerHTML = muteButton;
    soundButton.classList.add("is-muted");
    audio.muted = true;
  }
})

audio.addEventListener("ended", () => {
  if (audio.innerHTML === `<source src="../public/audio/y2mate.com - 11  rainy lady  しぐれうい Shigure Ui.mp3"></source>`) {
    audio.innerHTML = `<source src="../public/audio/y2mate.com - monochrome rainbow.mp3"></source>`;
    audio.play();
  } else {
    audio.innerHTML = `<source src="../public/audio/y2mate.com - 11  rainy lady  しぐれうい Shigure Ui.mp3"></source>`;
    audio.play();
  }
})
// utility
gsap.registerPlugin(Draggable);

const countWord = (element) => {
  let text = element.innerHTML;
  let count = text.split(" ").length;
  return count;
}

/* ==== scroll action ===== */
const scrollQuery = ".scroll-action .arrow";
const scrollLoader = document.querySelector(scrollQuery);
const value = 50;
const animationScrollLoader = () => {
  const timeLine = gsap.timeline();
  timeLine.fromTo(scrollLoader,
    {
      duration: 0.5,
      height: "0px",
      y: "-40px",
    },
    {
      delay: 0.5,
      duration: 2.5,
      height: value*4 + "px",
      y: value*2 + 12 + "px",
      ease: "slow.inOut",
    })
}
const idScrollLoader = setInterval(() => {
  animationScrollLoader();
}, 2000)

document.querySelector(".scroll-action").addEventListener("click", () => {
  window.scrollTo({
    top: window.scrollY  + window.innerHeight + window.innerHeight * 0.3,
    behavior: "smooth"
  })
})


/* bground */
const evtbg = document.querySelector(".evtbg");
const evtbgTimeline = gsap.timeline();
const evtbgAnimation = () => {
  evtbgTimeline.to(".evtbg", {
    delay: 0.5,
    duration: 5,
    x: 25,
    y: 50,
  })
  evtbgTimeline.to(".evtbg", {
    delay: 0.5,
    duration: 5,
    x: 0,
    y: 0,
  })
}
const idEvtbg = setInterval(() => {
  evtbgAnimation();
})


/* ====== hero =======*/
const hero = document.querySelector(".hero");
const heroTimeLine = gsap.timeline();

for (let i = 0; i < hero.children.length - 1; i++) {
  const element = hero.children[i];
  let time = 3;
  if (element.id === "card-1") {
    time = 6;
  }
  heroTimeLine.to(element, {
    delay: 0.5,
    duration: 1,
    opacity: 1,
    ease: "slow.inOut",
  })
  heroTimeLine.to(element, {
    delay: 0.5,
    duration: 1,
    opacity: 0,
    ease: "slow.inOut",
    display: "none",
  }, ">" + time)
}

heroTimeLine.to(".hero__letter", {
  delay: 0.5,
  duration: 1,
  opacity: 1,
  ease: "slow.inOut",
}, ">-1")

Draggable.create(".hero__letter");

const heroLetter = document.querySelector(".hero__letter");
heroLetter.addEventListener("mouseenter", () => {
  heroLetter.classList.add("is-active");
})
heroLetter.addEventListener("mouseleave", () => {
  heroLetter.classList.remove("is-active");
})

// ======== game =========
const game = document.querySelector(".game");
const item = document.querySelectorAll(".game_img");
for (let i = 0; i < item.length; i++) {
  Draggable.create(".game_img" + ":nth-child" + "(" + (i + 1) + ")");
}

// ===== chat =======
const chat = document.querySelector(".chat");
const chatContainer = document.querySelectorAll(".chat-container");
const chatTimeLine = gsap.timeline();

const chatAnimation = () => {
  for (let i = 0; i < chatContainer.length; i++) {
    let chatComp = chatContainer[i].children;
    // for avatar
    chatTimeLine.fromTo(chatComp[0], {
      opacity: 0,
      y: -5,
    }, {
      delay: 0.5,
      duration: 0.3,
      opacity: 1,
      y: 0,
      display: "block",
      ease: "power1.in"
    })
    //  for name
    let chatinfo = chatComp[1].children;
    // for loading
    chatTimeLine.to(chatinfo[1], {
      display: "block",
    })
    chatTimeLine.to(chatinfo[1].children[0], {
      display: "block",
      duration: 1,
    })
    chatTimeLine.to(chatinfo[1].children[0], {
      display: "none",
    })
    chatTimeLine.to(chatinfo[1], {
      display: "none",
    })
    // for name
    chatTimeLine.fromTo(chatinfo[0], {
      opacity: 0,
      x: -5,
    }, {
      duration: 0.3,
      opacity: 1,
      x: 0,
      display: "block",
      ease: "power1.in"
    })
    // for chat list
    let chatList = chatinfo[2].children;
    let chatdelay = 0;
    for (let j = 0; j < chatList.length; j++) {
      if (j > 0) {
        chatdelay = 1;
      }
      chatTimeLine.fromTo(chatList[j], {
        opacity: 0,
        display: "none",
      }, {
        delay: chatdelay,
        duration: 0.5,
        opacity: 1,
        display: "block",
        ease: "power1.in"
      }, "<")
      chatTimeLine.to(chatList[j], {
        duration: countWord(chatList[j]) * 0.13,
      })
      console.log(window.scrollTop);
    }
  }
}

console.log("Tôi yêu bà")
console.log("yêu luôn cả bạn mò vào dev tool nhé")
window.addEventListener("scroll", () => {
  if (!document.querySelector(".chat").classList.contains("is-active") && window.scrollY > chat.offsetTop - 200) {
    chatAnimation();
    document.querySelector(".chat").classList.add("is-active");
  }
})

/* ====== trigger birthday box =======*/
const birthdayBox = document.querySelector(".birthdayBox");
window.addEventListener("scroll", () => {
  if (window.scrollY > birthdayBox.offsetTop - 200) {
    birthdayBox.classList.add("is-active")
  }
})