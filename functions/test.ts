import { transporter } from "./src/transporter";

// Email options
const mailOptions = {
	from: "iknowatutor@gmail.com",
	to: "mushrafaltaf@gmail.com",
	subject: "Test Email",
	text: "Hello, this is a test email sent using Nodemailer!",
};

// Send the email
transporter.sendMail(mailOptions, (error) => {
	if (error) {
		console.error("Error:", error);
	} else {
		console.log("Email sent:");
	}
});
