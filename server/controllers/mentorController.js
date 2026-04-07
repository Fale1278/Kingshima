import nodemailer from 'nodemailer';

const applyAsMentor = async (req, res) => {
  const { name, email, linkedin, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  try {
    let transporter;

    // Use actual email configuration if it exists in .env
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter = nodemailer.createTransport({
        service: 'gmail', // Standard gmail smtp
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Fallback: Generate test SMTP service account from ethereal.email
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

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"${name}" <${email}>`, // sender address
      to: receiverEmail, // list of receivers
      subject: "New Mentor Application", // Subject line
      text: `Name: ${name}\nEmail: ${email}\nLinkedIn: ${linkedin || 'Not Provided'}\nMessage: ${message}`, // plain text body
      html: `
        <h3>New Mentor Application</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>LinkedIn:</strong> ${linkedin || 'Not Provided'}</li>
        </ul>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `, // html body
    });

    let previewUrl = null;
    if (!process.env.SMTP_USER) {
      previewUrl = nodemailer.getTestMessageUrl(info);
      console.log("Preview URL: %s", previewUrl);
    } else {
      console.log("Message effectively sent via SMTP! ID: %s", info.messageId);
    }

    // Return success to the client along with the preview URL for demonstration purposes
    res.status(200).json({ 
      message: 'Application received! We will be in touch shortly.',
      previewUrl: previewUrl 
    });
  } catch (error) {
    console.error("Error sending email: ", error);
    res.status(500).json({ message: 'Failed to submit application. Please try again later.' });
  }
};

export { applyAsMentor };
