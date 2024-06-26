// Nav logic

const openNavBtn = document.getElementById("open-nav-btn");
const closeNavBtn = document.getElementById("close-nav-btn");
const nav = document.getElementsByTagName("nav")[0];
const navLinks = document.getElementsByClassName("nav-link");

function closeNav() {
  nav.classList.add("nav-slide-out");
  nav.classList.remove("nav-slide-in");
  nav.setAttribute("aria-hidden", "true");
  openNavBtn.classList.add("show-nav");
  openNavBtn.classList.remove("hide-nav");
  openNavBtn.style.opacity = 1;
}

function openNav() {
  nav.classList.remove("nav-slide-out");
  nav.classList.add("nav-slide-in");
  nav.setAttribute("aria-hidden", "false");
  // nav.classList.add('fade-in-right');

  openNavBtn.classList.add("hide-nav");
  openNavBtn.classList.remove("show-nav");
  openNavBtn.style.opacity = 0;

  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener(
      "click",
      closeNav

      // nav.classList.remove('show-nav');
      // nav.classList.add('hide-nav');
      // openNavBtn.classList.add('show-nav');
      // openNavBtn.classList.remove('hide-nav');
    );
  }
}

// Landing animation

const fillerDigits = document.getElementsByClassName("fillerDigits");
const decoderTypewriter = document.getElementById("decoderTypewriter");
const digits = [
  "~",
  "@",
  "#",
  "$",
  "%",
  "&",
  "*",
  "+",
  "?",
  ":",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "m",
  "n",
  "o",
  "p",
  "r",
  "t",
  "u",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const selectedWords = ["Creative", "Ambitious", "Problem solver", "Tim Kravel", "Software Developer"];

function randomizeDigit() {
  const randomNum = Math.floor(Math.random() * (digits.length - 1));
  return digits[randomNum];
}

const createStartingString = (wordLength) => {
  const desiredLength = wordLength % 2 === 0 ? 22 : 23;
  let startingStr = "";
  for (let i = 0; i < desiredLength; i++) {
    startingStr += randomizeDigit();
  }
  return startingStr;
};

const createEncodedString = (str, currentIndex) => {
  const arr = str.split("");
  if (currentIndex === 0) {
    arr.forEach((item, index) => {
      arr[index] = randomizeDigit();
    });
  } else {
    arr.forEach((item, index) => {
      if (index < currentIndex) {
        arr[index] = item;
      } else if (index > str.length - 1 - currentIndex) {
        arr[index] = item;
      } else {
        arr[index] = randomizeDigit();
      }
    });
  }
  return arr.join("");
};

const decodeWord = (encryptedWord, OriginalWord, decodingIndex) => {
  const encryptedStr = encryptedWord;
  const originalStr = OriginalWord;
  const currentIndex = decodingIndex;

  if (encryptedStr.length > originalStr.length) {
    // remove extra char from each side
    const arr = encryptedStr.split("");
    arr.shift();
    arr.pop();
    arr.forEach((item, index) => {
      arr[index] = randomizeDigit();
    });
    return arr.join("");
  } else {
    // decode one char from each side
    const arr = originalStr.split("");
    arr.forEach((item, index) => {
      if (index <= currentIndex) {
        return;
      } else if (index >= originalStr.length - 1 - currentIndex) {
        return;
      } else {
        arr[index] = randomizeDigit();
      }
    });
    return arr.join("");
  }
};

const injectText = (str) => {
  decoderTypewriter.textContent = str;
};

const addHeader = (str) => {
  const parent = document.getElementsByClassName("hero-wrapper")[0];
  const header = document.createElement("h1");
  header.classList.add("floating-header");
  header.innerText = str;
  parent.append(header);
};

const togglePulseAnimation = () => {
  if (decoderTypewriter.classList.contains("pulse")) {
    decoderTypewriter.classList.remove("pulse");
  } else {
    decoderTypewriter.classList.add("pulse");
    setTimeout(() => {
      togglePulseAnimation();
    }, 750);
  }
};

// add text shadow tansition
const floatElements = () => {
  const img = document.getElementById("profileImg");
  const screenWidth = window.innerWidth;

  img.classList.add("float-element");

  if (screenWidth < 550) {
    return;
  } else {
    nav.classList.add("float-nav");
    for (let li of navLinks) {
      li.classList.add("float-text");
    }
  }
};

const landingAnimation = () => {
  let wordIdx = 0;
  let currentWord = selectedWords[wordIdx];
  let encodedWord = "";
  let decodingIndex = 0;
  let tick = 0;
  let stepSpeed = 125;

  // encode starting word
  if (encodedWord === "") {
    encodedWord = createStartingString(currentWord.length);
    injectText(encodedWord);
  }

  const decodingAnimation = () => {
    // encode if a new word
    if (encodedWord === "") {
      encodedWord = createStartingString(currentWord.length);
      injectText(encodedWord);
      stepSpeed = 125;
    }
    if (tick !== 1) {
      // if tick does not equal 1, create a new encoded string
      encodedWord = createEncodedString(encodedWord, decodingIndex);
      injectText(encodedWord);
    } else {
      // continue decoding
      if (decodingIndex >= (currentWord.length - 2) / 2) {
        // slow down speed if word will be decoded this iteration
        stepSpeed = 300;
      }
      if (encodedWord !== currentWord) {
        // decode a section of the word if encoded
        encodedWord = decodeWord(encodedWord, currentWord, decodingIndex);
        injectText(encodedWord);
        if (encodedWord.length === currentWord.length) {
          // start tracking char index if no extra chars remain
          decodingIndex++;
        }
        if (encodedWord === currentWord) {
          // check if fully decoded
          if (currentWord === selectedWords[selectedWords.length - 2]) {
            // check if header word was decoded
            encodedWord = "";
            injectText(encodedWord);
            addHeader(currentWord);
            floatElements();
            decodingIndex = 0;
            wordIdx++;
            currentWord = selectedWords[wordIdx];
          } else if (currentWord === selectedWords[selectedWords.length - 1]) {
            decoderTypewriter.classList.add("final-animation-position");
          } else {
            togglePulseAnimation();
          }
        }
      } else if (encodedWord === currentWord) {
        // move to next word or return if none left
        decodingIndex = 0;
        if (wordIdx === selectedWords.length - 1) {
          return;
        } else {
          stepSpeed = 125;
          wordIdx++;
          currentWord = selectedWords[wordIdx];
          encodedWord = createStartingString(currentWord.length);
          injectText(encodedWord);
        }
      }
    }
    // handle count for 2 interations for each decoding
    if (tick === 1) {
      tick = 0;
    } else {
      tick++;
    }
    setTimeout(() => {
      decodingAnimation();
    }, stepSpeed);
  };
  decodingAnimation();
};

window.addEventListener("load", () => {
  landingAnimation();
});

// Fetch resume, toggle spinners

const startDownload = (event) => {
  const elementID = event.currentTarget.id;
  let button;
  let spinner;

  if (elementID === "download-btn") {
    button = document.getElementById("download-btn");
    spinner = document.getElementById("download-spinner");
  } else {
    button = document.getElementById("nav-download-btn");
    spinner = document.getElementById("nav-download-spinner");
  }

  const toggleSpinner = () => {
    if (button.classList.contains("hide-content")) {
      button.classList.remove("hide-content");
      spinner.classList.add("hide-content");
    } else {
      button.classList.add("hide-content");
      spinner.classList.remove("hide-content");
    }
  };
  toggleSpinner();
  download(toggleSpinner);
};

const download = (callback) => {
  fetch("https://tkdevdesign.com/api/portfolioServer/downloads", {
    method: "GET",
  })
    .then((response) => response.blob())
    .then((data) => {
      if (data) {
        callback();
        var a = document.createElement("a");
        var url = window.URL.createObjectURL(data);
        a.href = url;
        a.download = "Tim_Kravel_Resume";
        document.body.append(a);
        a.click();
        a.remove();
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 4000);
      }
    })
    .catch((err) => {
      if (err) {
        console.error(err);
      }
    });
};

// Form submit

const form = document.getElementById("contact-form");
const formWrapper = document.getElementById("contact-wrapper");
const msg = document.getElementById("contact-response");
const errorMsg = document.getElementById("contact-error");
const directEmail = document.getElementById("error-email");
const spinner = document.getElementById("spinner");
const submitBtn = document.getElementById("submit-btn");

form.onsubmit = (e) => {
  handleForm(e);
  form.reset();
  submitBtn.classList.add("hide-content");
  spinner.classList.remove("hide-content");
};

function handleForm(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const fullName = document.getElementById("fullName").value;
  const message = document.getElementById("message").value;

  const data = {
    email: email,
    fullName: fullName,
    message: message,
  };

  fetch("https://www.tkdevdesign.com/api/portfolioServer/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((Response) => Response.json())
    .then((data) => {
      if (data) {
        formWrapper.classList.add("hide-content");
        msg.classList.remove("hide-content");
        spinner.classList.add("hide-content");
      }
    })
    .catch((err) => {
      if (err) {
        formWrapper.classList.add("hide-content");
        errorMsg.classList.remove("hide-content");
        spinner.classList.add("hide-content");
        directEmail.innerText = "TLKravel" + "-at-" + "Gmail" + "-dot-" + "com";
      }
    });
}

function restoreForm() {
  msg.classList.add("hide-content");
  formWrapper.classList.remove("hide-content");
  submitBtn.classList.remove("hide-content");
}

// scroll animations

const scrollOffset = (window.innerHeight || document.documentElement.clientHeight) / 8;

const scrollElement = document.querySelectorAll(".js-scroll");

const elementInView = (el, offset) => {
  const elementTop = el.getBoundingClientRect().top;

  return elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset;
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElement.forEach((element) => {
    if (elementInView(element, scrollOffset)) {
      displayScrollElement(element);
    } else {
      hideScrollElement(element);
    }
  });
};

window.addEventListener("scroll", () => {
  handleScrollAnimation();
});

// Footer date

const currentDate = document.getElementById("current-year");
const date = new Date();
const year = date.getFullYear();

currentDate.innerText = year;
