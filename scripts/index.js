// Nav logic

const openNav = document.getElementById('nav-open');
const closeNav = document.getElementById('nav-close');
const nav = document.getElementsByTagName('nav')[0];

closeNav.addEventListener('click', () => {
	nav.style.setProperty('display', 'none');
	openNav.style.setProperty('display', 'block');
});

openNav.addEventListener('click', () => {
	nav.style.setProperty('display', 'block');
	openNav.style.setProperty('display', 'block');
});

// Form submit

const form = document.getElementById('contact-form');

form.onsubmit = (e) => {
	handleForm(e);
	form.reset();
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
		})
		.catch((err) => {
			if (err) {
				console.log(err);
			}
		});
}
