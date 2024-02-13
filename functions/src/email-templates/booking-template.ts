import { Booking } from "../models/booking";

export const bookingTemplate = (booking: Booking) => {
	return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Let's Schedule Your Demo Session! - IKnowATutor.com</title>
    </head>
    
    <body style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f4; color: #333; padding: 20px; text-align: left;">
    
        <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h3 style="color: #F69E0A; font-size: 24px;">Hello ${booking.firstName}!</h3>
            <p style="font-size: 16px;">Thanks a bunch for booking a demo session with us! We're thrilled to connect with you and chat about how we can assist you on your learning journey.</p>
            <p style="font-size: 16px;">Just a heads up: you can expect to hear from us shortly via email and WhatsApp. We'll touch base to gather some more details from you and set up a time for your demo session.</p>
            <p style="font-size: 16px;">Once we've got everything sorted, we'll send over a Calendly link so you can easily pick a time that suits you best. Easy peasy!</p>
            <p style="font-size: 16px;">If you have any questions or need anything in the meantime, feel free to shoot us a message. We're here to help!</p>
            <p style="font-size: 16px;">Looking forward to chatting soon!</p>
            <p style="font-size: 16px; color: #F69E0A; font-weight: bold;">Best,</p>
            <p style="font-size: 16px; color: #F69E0A; font-weight: bold;">Mush<br>IknowAtutor.com</p>
    
            <div style="margin-top: 20px; font-size: 14px; color: #F69E0A;">
                <p>For any inquiries, you can reach us at:</p>
                <ul style="list-style: none; padding: 0;">
                    <li>Email: <a href="mailto:iknowatutor@gmail.com" style="text-decoration: none; color: #007BFF;">iknowatutor@gmail.com</a></li>
                    <li>Phone: <a href="tel:+947766298764" style="text-decoration: none; color: #007BFF;">+94 766 298 764</a></li>
                </ul>
            </div>
        </div>
    
    </body>
    
    </html>
    
    `;
};
