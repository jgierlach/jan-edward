import { json } from '@sveltejs/kit';
import { SEND_GRID_API_KEY } from '$env/static/private';

const endpoint = 'https://api.sendgrid.com/v3/mail/send';

export async function POST({ request }) {
	try {
		const { name, email, message } = await request.json();

		// Validate required fields
		if (!name || !email || !message) {
			return json({ message: 'Name, Email, and Message fields are required.' }, { status: 400 });
		}

		// Prepare email data
		const emailData = {
			personalizations: [
				{
					to: [{ email: 'jan@corelabs.digital' }],
					subject: 'Core Labs - Contact Form Submission'
				}
			],
			from: {
				email: 'info@sveltesaaskit.com',
				name: 'Core Labs'
			},
			content: [
				{
					type: 'text/html',
					value: `
            <p><strong>Name</strong>: ${name}</p>
            <p><strong>Email</strong>: ${email}</p>
            <p><strong>Message</strong>: ${message}</p>
          `
				}
			]
		};

		// Make the SendGrid API request
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${SEND_GRID_API_KEY}`
			},
			body: JSON.stringify(emailData)
		});

		// Handle SendGrid API response
		if (!response.ok) {
			console.error('SendGrid API error:', await response.text());
			return json({ message: 'Failed to send email.' }, { status: response.status });
		}

		return json({ message: 'Contact form submission successful!' }, { status: 200 });
	} catch (error) {
		console.error('Server error:', error);
		return json(
			{ message: 'Error processing contact form.', error: error.message || 'Unknown error.' },
			{ status: 500 }
		);
	}
}
