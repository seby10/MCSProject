import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "plataformauta03@gmail.com",
    pass: "vimb gsth alea ozpu",
  },
});
export const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: "Team4.Contact",
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
