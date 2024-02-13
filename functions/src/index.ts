import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";
import { transporter } from "./transporter";
import { bookingTemplate } from "./email-templates/booking-template";

admin.initializeApp();

export const sendEmail = functions.firestore
	.document("bookings/{bookingId}")
	.onCreate(async (snapshot, context) => {
		const booking = snapshot.data();

		const mailOptions: nodemailer.SendMailOptions = {
			from: "iknowatutor@gmail.com",
			to: booking.email,
			subject: "Let's Schedule Your Demo Session! 📅 - Iknowatutor.com",
			html: bookingTemplate({
				firstName: booking.firstName,
				lastName: booking.lastName,
				email: booking.email,
				phone: booking.phone,
			}),
		};

		try {
			await transporter.sendMail(mailOptions);
			console.log("Booking email sent successfully");
		} catch (error) {
			console.error("Error sending welcome email:", error);
		}
	});
