interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export default {
  async queue(batch: MessageBatch<EmailPayload>, env: any): Promise<void> {
    for (const msg of batch.messages) {
      const { to, subject, html, from } = msg.body;
      try {
        await env.SEND_EMAIL.send({
          to,
          from: from || env.FROM_EMAIL || "noreply@reliancenepal.com.np",
          subject,
          html,
        });
        msg.ack();
      } catch (err) {
        msg.retry({ delaySeconds: 60 });
      }
    }
  },
};
