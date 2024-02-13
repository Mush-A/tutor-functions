import * as nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		type: "OAuth2",
		user: "iknowatutor@gmail.com",
		clientId:
			"145675848367-hnpt10h2f8k655gmqoss9g4gpk5qagmr.apps.googleusercontent.com",
		clientSecret: "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",
		refreshToken:
			"1//049Yy3uvykmF5CgYIARAAGAQSNwF-L9IryvxgxUiRHGKkIObCIRVbg1DdR9b3orenc5SR_JLkD6dMOpS9C5DV5VPTTmDL6tYvf3c",
	},
} as nodemailer.TransportOptions);
