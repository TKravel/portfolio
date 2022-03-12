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
	const char = digits[randomNum];
	return char;
}
const createStartingString = (num) => {
	const desiredLength = num * 3;
	let startingStr = '';
	for (let i = 0; i < desiredLength; i++) {
		startingStr += randomizeDigit();
	}
	return startingStr;
};

const createEncodedString = (str, num) => {
	if (num === 0) {
		const arr = str.split('');
		const newArr = [];
		arr.forEach(() => {
			newArr.push(randomizeDigit());
		});
		const result = newArr.join('');
		return result;
	} else {
		const arr = str.split('');
		const newArr = [];
		arr.forEach((item, index) => {
			if (index < num) {
				console.log('less ' + index + num);
				newArr.push(item);
			} else if (index > str.length - 1 - num) {
				console.log('greater ' + index + num);
				newArr.push(item);
			} else {
				console.log('middle ' + index + num);
				newArr.push(randomizeDigit());
			}
		});
		const result = newArr.join('');
		return result;
	}
};

const decodeStep = (str, num) => {
	const encodedWord = str;
	const decodedWordLength = num;

	if (encodedWord.length > decodedWordLength) {
		const arr = encodedWord.split('');
		arr.shift();
		arr.pop();
		arr.forEach((item, idx) => {
			arr[idx] = randomizeDigit();
		});
		const result = arr.join('');
		return result;
	} else {
		return;
	}
};

const decodeWord = (word, index) => {
	const decodedStr = word;
	const currentIndex = index;
	const isOdd = decodedStr.length % 2 === 0 ? true : false;

	if (isOdd && currentIndex === decodedStr.length - 1) {
		return decodedStr;
	} else {
		let newArr = [];
		const arr = decodedStr.split('');
		arr.forEach((item, idx) => {
			if (idx <= currentIndex) {
				newArr.push(item);
			} else if (idx >= decodedStr.length - 1 - currentIndex) {
				newArr.push(item);
			} else {
				newArr.push(randomizeDigit());
			}
		});
		const result = newArr.join('');
		return result;
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

const landingAnimation = () => {
	let wordIdx = 0;
	let currentWord = selectedWords[wordIdx];
	let encodedWord = '';
	let decodingIndex = 0;
	let tick = 0;
	let stepSpeed = 100;

	if (encodedWord === '') {
		encodedWord = createStartingString(currentWord.length);
		injectText(encodedWord);
		console.log('test');
	}

	const decodingAnimation = () => {
		console.log(tick);
		if (encodedWord === '') {
			encodedWord = createStartingString(currentWord.length);
			injectText(encodedWord);
			stepSpeed = 100;
		}
		if (tick !== 2) {
			console.log('tick equals ' + tick);
			encodedWord = createEncodedString(encodedWord, decodingIndex);
			injectText(encodedWord);
		} else {
			if (decodingIndex >= (currentWord.length - 2) / 2) {
				stepSpeed = 400;
			}
			if (encodedWord.length > currentWord.length) {
				encodedWord = decodeStep(encodedWord, currentWord.length);
				injectText(encodedWord);
			} else if (
				encodedWord.length === currentWord.length &&
				encodedWord !== currentWord
			) {
				encodedWord = decodeWord(currentWord, decodingIndex);
				if (encodedWord === currentWord) {
					if (wordIdx === selectedWords.length - 2) {
						addHeader(currentWord);
						encodedWord = '';
						decodingIndex = 0;
						wordIdx++;
						currentWord = selectedWords[wordIdx];
					}
				}
				injectText(encodedWord);
				decodingIndex++;
			} else if (encodedWord === currentWord) {
				// do animation
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
		if (tick === 2) {
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
