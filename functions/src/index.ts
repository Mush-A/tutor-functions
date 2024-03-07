import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";
import { transporter } from "./transporter";
import { bookingTemplate } from "./email-templates/booking-template";
import * as logger from "firebase-functions/logger";

admin.initializeApp();

export const sendEmail = functions.firestore
	.document("bookings/{bookingId}")
	.onCreate(async (snapshot, context) => {
		const booking = snapshot.data();

		const adminsQuerySnapshot = await admin
			.firestore()
			.collection("admins")
			.get();

		const admins = adminsQuerySnapshot.docs;

		logger.log("Admins:", admins);

		const adminsEmailsPromise = admins.map((adminUser) => {
			logger.log("AdminUser:", adminUser);
			return admin.auth().getUser(adminUser.id);
		});

		const adminsEmails = (await Promise.all(adminsEmailsPromise)).map(
			(adminUser) => adminUser.email
		);

		logger.log("Admins:", adminsEmails);

		const mailOptions: nodemailer.SendMailOptions = {
			from: "iknowatutor@gmail.com",
			to: [booking.email, ...adminsEmails],
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
			logger.log("Booking email sent successfully");
		} catch (error) {
			logger.error("Error sending welcome email:", error);
		}
	});

export const assignStudentRole = functions.firestore
	.document("students/{studentId}")
	.onCreate(async (snapshot, context) => {
		try {
			const student = snapshot.data();
			logger.log("Student:", student);
			const user = await admin.auth().getUser(context.params.studentId);
			logger.log("User:", user);
			await admin.auth().setCustomUserClaims(user.uid, {
				student: true,
			});
			logger.log("Student role assigned to:", user.email);
		} catch (e) {
			logger.error("Error assigning student role:", e);
		}
	});

export const assignAdminRole = functions.firestore
	.document("admins/{adminId}")
	.onCreate(async (snapshot, context) => {
		try {
			const adminUser = snapshot.data();
			logger.log("Admin:", adminUser);
			const user = await admin.auth().getUser(context.params.adminId);
			logger.log("User:", user);
			await admin.auth().setCustomUserClaims(user.uid, {
				admin: true,
			});
			logger.log("Admin role assigned to:", user.email);
		} catch (e) {
			logger.error("Error assigning admin role:", e);
		}
	});

export const addTutorRole = functions.https.onCall(async (data, context) => {
	try {
		const email = data.email;
		const user = await admin.auth().getUserByEmail(email);
		if (user.customClaims && (user.customClaims as any).tutor === true) {
			return;
		}
		await admin.auth().setCustomUserClaims(user.uid, {
			tutor: true,
		});

		return {
			message: `Success! ${email} has been made a tutor.`,
		};
	} catch (e) {
		logger.log("[addTutorRole] Something went wrong", e);
		return {
			message: `Error! ${e}. User could not be made a tutor.`,
		};
	}
});
