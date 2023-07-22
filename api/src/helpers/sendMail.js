const nodemailer = require("nodemailer");

const sendMail = async (token, email, username) => {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: process.env("MAIL_HOST"),
    port: process.env("MAIL_PORT"),
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env("MAIL_USERNAME"), // generated ethereal user
      pass: process.env("MAIL_PASSWORD"), // generated ethereal password
    },
  });

  let mailOptions = {
    from: `The Prophecy Game <${process.env("MAIL_USERNAME")}>`,
    to: email,
    subject: "Verificación de cuenta",
    html: `
    <!DOCTYPE html>
      <html lang="en" xmlns="https://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="x-apple-disable-message-reformatting">
        <title></title>
        <!--[if mso]>
        <noscript>
          <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style>
        table, td, div, h1, p {font-family: Roboto, sans-serif;}
    </style>
    </head>
    <body style="margin:0;padding:0;">
      <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#eeeeee;">
        <tr>
            <td align="center" style="padding:0;">
                <table role="presentation" style="max-width:602px;border-collapse:collapse;border-spacing:0;text-align:left;">
                    <tr>
                        <td style="padding:20px;background:#941832;" align="center">
                           <h1 style="color:#fff;font-family:Roboto,sans-serif;">¡Bienvenido ${username} a The Prophecy Game!</h1>
                        </td>
                    </tr>
                        <td style="padding:36px 30px 42px 30px;background:#fff;">
                            <p style="font-family:Roboto,sans-serif;font-weight: 100;">Gracias por registrarte, ¡es un placer tenerte!</p>
                            <p style="font-family:Roboto,sans-serif;font-weight: 100;">Verifique su dirección de correo electrónico pulsando en el enlace a continuación.</p>
                        </td>
                    </tr>
                        <td align="center" style="padding:5px 30px 42px 30px;background:#fff;">
                            <a style="text-decoration: none; color:#fff;padding:10px 30px;border-radius:5px;background:#FF004C;font-weight: 700;" href="http://localhost:3001/api/auth/confirmar-cuenta/${token}">Verificar email</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
      </table>
    </body>
  </html>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error.message);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendMail;
