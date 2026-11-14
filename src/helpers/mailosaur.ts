
import MailosaurClient from 'mailosaur';

const mailosaur = new MailosaurClient(
  process.env.MAILOSAUR_API_KEY!
);

const serverId = process.env.MAILOSAUR_SERVER_ID!;

export function generateEmail() {
  return mailosaur.servers.generateEmailAddress(serverId);
}


export async function getOTP(email: string, receivedAfter: Date) {
  const message = await mailosaur.messages.get(
    serverId,
    {
      sentTo: email
    },
    {
      timeout: 60000,
      receivedAfter
    }
  );

  const otp =
    message.text?.codes?.[0]?.value ??
    message.html?.codes?.[0]?.value;

  if (!otp) {
    throw new Error('OTP not found in email');
  }

  return otp;
}
