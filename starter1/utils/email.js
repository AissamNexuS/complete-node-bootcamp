const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1) Create a Transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '7e436b5efd83cc',
      pass: 'c9b11aff8f2193'
    }
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'Aissam test send email <ighirissam100@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
    // html :
  };
  // 3) actually sed the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
