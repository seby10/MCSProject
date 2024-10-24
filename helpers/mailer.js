import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'jhaninaconteron03@gmail.com',
    pass: 'jazl muon jhtc wthq',
  },
});
export const sendMail = async (to, subject, text) => {
  const mailOptions = {
      from: 'jhaninaconteron03@gmail.com',
      to,
      subject,
      text,
  };

  try {
      await transporter.sendMail(mailOptions);
      console.log(`Correo enviado a: ${to}`);
  } catch (error) {
      console.error("Error al enviar el correo:", error);
      throw new Error("Error al enviar el correo: " + error.message);
  }
};