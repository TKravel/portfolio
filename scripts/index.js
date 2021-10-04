const form = document.getElementById('contact-form');

form.onsubmit = (e) => {
	handleForm(e);
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
		body: JSON.stringify(data),
	})
		.then((Response) => Response.json())
		.then((data) => {
			console.log(data);
			email.innerText = '';
			fullName.innerText = '';
			message.innerText = '';
		})
		.catch((err) => {
			if (err) {
				console.log(err);
			}
		});
}
