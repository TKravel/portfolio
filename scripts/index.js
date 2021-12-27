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
