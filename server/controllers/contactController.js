import nodemailer from 'nodemailer';

const sendContactMessage = async (req, res) => {
  const { name, email, subject, message, userLocation } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }

  try {
    let transporter;

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, 
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    const receiverEmail = process.env.RECEIVER_EMAIL || "admin@kingshimafoundation.org";

    const info = await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: receiverEmail,
      subject: `Kingshima Contact: ${subject || 'General Inquiry'}`,
      text: `Name: ${name}\nEmail: ${email}\nLocation: ${userLocation || 'Not provided'}\nMessage: ${message}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Location:</strong> ${userLocation || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    let previewUrl = null;
    if (!process.env.SMTP_USER) {
      previewUrl = nodemailer.getTestMessageUrl(info);
      console.log("Preview URL: %s", previewUrl);
    } else {
      console.log("Contact Message sent via SMTP! ID: %s", info.messageId);
    }

    res.status(200).json({ 
      message: 'Your message has been sent successfully! We will respond shortly.',
      previewUrl: previewUrl 
    });
  } catch (error) {
    console.error("Error sending contact email: ", error);
    res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
};

export { sendContactMessage };
