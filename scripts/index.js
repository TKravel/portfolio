// Nav logic

const openNavBtn = document.getElementById('open-nav-btn');
const closeNavBtn = document.getElementById('close-nav-btn');
const nav = document.getElementsByTagName('nav')[0];
const navLinks = document.getElementsByClassName('nav-link');

function closeNav() {
	console.log('click');
	nav.classList.remove('show-nav');
	nav.classList.add('hide-nav');
	openNavBtn.classList.add('show-nav');
	openNavBtn.classList.remove('hide-nav');
}

function openNav() {
	nav.classList.add('show-nav');
	nav.classList.add('fade-in-right');
	nav.classList.remove('hide-nav');
	openNavBtn.classList.add('hide-nav');
	openNavBtn.classList.remove('show-nav');

	for (let i = 0; i < navLinks.length; i++) {
		navLinks[i].addEventListener('click', () => {
			nav.classList.remove('show-nav');
			nav.classList.add('hide-nav');
			openNavBtn.classList.add('show-nav');
			openNavBtn.classList.remove('hide-nav');
		});
	}
}

// Landing animation

const fillerDigits = document.getElementsByClassName('fillerDigits');
const decoderTypewriter = document.getElementById('decoderTypewriter');
const digits = [
	'0',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'm',
	'n',
	'o',
	'p',
	'r',
	't',
	'u',
	'w',
	'x',
	'y',
	'z',
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
];
const selectedWords = [
	'Artist',
	'Creative',
	'Adaptable',
	'Problem solver',
	'Tim Kravel',
	'Front-end Developer',
];

function randomizeDigit() {
	const randomNum = Math.floor(Math.random() * (digits.length - 1));
	return digits[randomNum];
}

const createStartingString = (wordLength) => {
	const desiredLength = wordLength % 2 === 0 ? 20 : 21;
	let startingStr = '';
	for (let i = 0; i < desiredLength; i++) {
		startingStr += randomizeDigit();
	}
	return startingStr;
};

const createEncodedString = (str, currentIndex) => {
	const arr = str.split('');
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
	return arr.join('');
};

const decodeWord = (encryptedWord, OriginalWord, decodingIndex) => {
	const encryptedStr = encryptedWord;
	const originalStr = OriginalWord;
	const currentIndex = decodingIndex;

	console.log(encryptedStr, originalStr, currentIndex);

	if (encryptedStr.length > originalStr.length) {
		// remove extra char from each side
		const arr = encryptedStr.split('');
		arr.shift();
		arr.pop();
		arr.forEach((item, index) => {
			arr[index] = randomizeDigit();
		});
		return arr.join('');
	} else {
		// decode one char from each side
		const arr = originalStr.split('');
		arr.forEach((item, index) => {
			if (index <= currentIndex) {
				return;
			} else if (index >= originalStr.length - 1 - currentIndex) {
				return;
			} else {
				arr[index] = randomizeDigit();
			}
		});
		return arr.join('');
	}
};

const injectText = (str) => {
	decoderTypewriter.textContent = str;
};

const addHeader = (str) => {
	const parent = document.getElementsByClassName('hero-wrapper')[0];
	const header = document.createElement('h1');
	header.classList.add('floating-header');
	header.innerText = str;
	parent.append(header);
};

const togglePulseAnimation = () => {
	if (decoderTypewriter.classList.contains('pulse')) {
		decoderTypewriter.classList.remove('pulse');
	} else {
		decoderTypewriter.classList.add('pulse');
		setTimeout(() => {
			togglePulseAnimation();
		}, 750);
	}
};

const landingAnimation = () => {
	let wordIdx = 0;
	let currentWord = selectedWords[wordIdx];
	let encodedWord = '';
	let decodingIndex = 0;
	let tick = 0;
	let stepSpeed = 100;

	// encode starting word
	if (encodedWord === '') {
		encodedWord = createStartingString(currentWord.length);
		injectText(encodedWord);
	}

	const decodingAnimation = () => {
		// encode if a new word
		if (encodedWord === '') {
			encodedWord = createStartingString(currentWord.length);
			injectText(encodedWord);
			stepSpeed = 100;
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
				encodedWord = decodeWord(
					encodedWord,
					currentWord,
					decodingIndex
				);
				injectText(encodedWord);
				if (encodedWord.length === currentWord.length) {
					// start tracking char index if no extra chars remain
					decodingIndex++;
				}
				if (encodedWord === currentWord) {
					// check if fully decoded
					if (currentWord === 'Tim Kravel') {
						// check if header word was decoded
						addHeader(currentWord);
						encodedWord = '';
						decodingIndex = 0;
						wordIdx++;
						currentWord = selectedWords[wordIdx];
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
					stepSpeed = 100;
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

window.addEventListener('load', () => {
	landingAnimation();
});

// Fetch resume, toggle spinners

const startDownload = (event) => {
	const elementID = event.currentTarget.id;
	let button;
	let spinner;

	console.log(elementID);

	if (elementID === 'download-btn') {
		button = document.getElementById('download-btn');
		spinner = document.getElementById('download-spinner');
	} else {
		button = document.getElementById('nav-download-btn');
		spinner = document.getElementById('nav-download-spinner');
	}

	console.log(button);
	console.log(spinner);

	const toggleSpinner = () => {
		if (button.classList.contains('hide-content')) {
			console.log('true');
			button.classList.remove('hide-content');
			spinner.classList.add('hide-content');
		} else {
			console.log('False');
			button.classList.add('hide-content');
			spinner.classList.remove('hide-content');
		}
	};
	toggleSpinner();
	download(toggleSpinner);
};

const download = (callback) => {
	fetch('https://young-sierra-17248.herokuapp.com/downloads', {
		method: 'GET',
	})
		.then((response) => response.blob())
		.then((data) => {
			if (data) {
				callback();
				var a = document.createElement('a');
				var url = window.URL.createObjectURL(data);
				a.href = url;
				a.download = 'Tim_Kravel_Resume';
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
				console.log(err);
			}
		});
};

// Form submit

const form = document.getElementById('contact-form');
const formWrapper = document.getElementById('contact-wrapper');
const msg = document.getElementById('contact-response');
const errorMsg = document.getElementById('contact-error');
const directEmail = document.getElementById('error-email');
const spinner = document.getElementById('spinner');
const submitBtn = document.getElementById('submit-btn');

form.onsubmit = (e) => {
	handleForm(e);
	form.reset();
	submitBtn.classList.add('hide-content');
	spinner.classList.remove('hide-content');
};

function handleForm(e) {
	e.preventDefault();

	const email = document.getElementById('email').value;
	const fullName = document.getElementById('fullName').value;
	const message = document.getElementById('message').value;

	const data = {
		email: email,
		fullName: fullName,
		message: message,
	};

	console.log(data);

	fetch('https://young-sierra-17248.herokuapp.com/contact', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then((Response) => Response.json())
		.then((data) => {
			console.log(data);
			if (data) {
				formWrapper.classList.add('hide-content');
				msg.classList.remove('hide-content');
				spinner.classList.add('hide-content');
			}
		})
		.catch((err) => {
			if (err) {
				console.log('test', err);
				formWrapper.classList.add('hide-content');
				errorMsg.classList.remove('hide-content');
				spinner.classList.add('hide-content');
				directEmail.innerText =
					'TLKravel' + '-at-' + 'Gmail' + '-dot-' + 'com';
			}
		});
}

function restoreForm() {
	console.log('clicked');
	msg.classList.add('hide-content');
	formWrapper.classList.remove('hide-content');
	submitBtn.classList.remove('hide-content');
}

// scroll animations

const scrollOffset =
	(window.innerHeight || document.documentElement.clientHeight) / 8;

const scrollElement = document.querySelectorAll('.js-scroll');

const elementInView = (el, offset) => {
	const elementTop = el.getBoundingClientRect().top;

	return (
		elementTop <=
		(window.innerHeight || document.documentElement.clientHeight) - offset
	);
};

const displayScrollElement = (element) => {
	element.classList.add('scrolled');
};

const hideScrollElement = (element) => {
	element.classList.remove('scrolled');
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

window.addEventListener('scroll', () => {
	handleScrollAnimation();
});

// Footer date

const currentDate = document.getElementById('current-year');
const date = new Date();
const year = date.getFullYear();

currentDate.innerText = year;
