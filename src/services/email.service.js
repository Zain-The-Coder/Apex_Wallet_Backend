require("dotenv").config();
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// Generic Email Sender
const sendEmail = async (to, subject, html) => {
  try {
    const data = await resend.emails.send({
      from: "Apex Wallet <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    console.log("Email Sent Successfully");
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// ========================
// Register Email
// ========================
const sendRegisterEmail = async (userEmail, name) => {
  const subject = "Welcome to Apex Wallet! 🎉";

  const html = `
    <h2>Hello ${name},</h2>

    <p>Welcome to <strong>Apex Wallet</strong>!</p>

    <p>Your account has been created successfully.</p>

    <p>
      You can now securely manage your wallet, create accounts,
      and perform transactions with ease.
    </p>

    <br>

    <p>Thank you for choosing <strong>Apex Wallet</strong>.</p>

    <p>
      Regards,<br>
      <strong>Apex Wallet Team</strong>
    </p>
  `;

  await sendEmail(userEmail, subject, html);
};

// ========================
// Transaction Success
// ========================
const sendTransactionEmail = async (
  userEmail,
  name,
  amount,
  toAccount
) => {
  const subject = "Transaction Successful ✅";

  const html = `
    <h2>Hello ${name},</h2>

    <p>Your transaction has been completed successfully.</p>

    <table border="1" cellpadding="10" cellspacing="0">
      <tr>
        <td><strong>Amount</strong></td>
        <td>${amount}</td>
      </tr>
      <tr>
        <td><strong>Transferred To</strong></td>
        <td>${toAccount}</td>
      </tr>
    </table>

    <br>

    <p>Thank you for using <strong>Apex Wallet</strong>.</p>

    <p>
      Regards,<br>
      <strong>Apex Wallet Team</strong>
    </p>
  `;

  await sendEmail(userEmail, subject, html);
};

// ========================
// Transaction Failed
// ========================
const failTransactionEmail = async (
  userEmail,
  name,
  amount,
  toAccount
) => {
  const subject = "Transaction Failed ❌";

  const html = `
    <h2>Hello ${name},</h2>

    <p>Unfortunately, your transaction could not be completed.</p>

    <table border="1" cellpadding="10" cellspacing="0">
      <tr>
        <td><strong>Amount</strong></td>
        <td>${amount}</td>
      </tr>
      <tr>
        <td><strong>Recipient</strong></td>
        <td>${toAccount}</td>
      </tr>
    </table>

    <br>

    <p>
      Please verify your balance and recipient details before trying again.
    </p>

    <p>
      If the problem continues, please contact our support team.
    </p>

    <br>

    <p>
      Regards,<br>
      <strong>Apex Wallet Team</strong>
    </p>
  `;

  await sendEmail(userEmail, subject, html);
};

module.exports = {
  sendRegisterEmail,
  sendTransactionEmail,
  failTransactionEmail,
};