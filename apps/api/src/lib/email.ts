export function contactConfirmation(name: string): string {
  return `
    <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a365d;">Thank you for contacting us</h2>
      <p>Dear ${name},</p>
      <p>We have received your message and will get back to you within 24 hours.</p>
      <hr />
      <p style="color: #666; font-size: 12px;">Reliance Finance Limited</p>
    </div>
  `;
}

export function contactNotification(name: string, email: string, phone: string, subject: string, message: string): string {
  return `
    <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a365d;">New Contact Form Submission</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name</td><td style="padding: 8px; border: 1px solid #ddd;">${name}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone</td><td style="padding: 8px; border: 1px solid #ddd;">${phone}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Subject</td><td style="padding: 8px; border: 1px solid #ddd;">${subject}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Message</td><td style="padding: 8px; border: 1px solid #ddd;">${message}</td></tr>
      </table>
    </div>
  `;
}

export function loanEnquiryNotification(data: Record<string, any>): string {
  return `
    <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a365d;">New Loan Enquiry</h2>
      <table style="width: 100%; border-collapse: collapse;">
        ${Object.entries(data).map(([k, v]) => `
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; text-transform: capitalize;">${k}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${v}</td></tr>
        `).join('')}
      </table>
    </div>
  `;
}

export function jobApplicationNotification(name: string, email: string, phone: string, jobTitle: string): string {
  return `
    <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a365d;">New Job Application</h2>
      <p><strong>Position:</strong> ${jobTitle}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
    </div>
  `;
}

export function applicationStatusEmail(name: string, referenceNo: string, type: string, status: string, note?: string): string {
  const statusLabels: Record<string, string> = {
    submitted: "Submitted",
    under_review: "Under Review",
    verified: "Documents Verified",
    approved: "Approved",
    rejected: "Rejected",
    processing: "Processing",
  };
  return `
    <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a365d;">Your ${type === "loan" ? "Loan" : "Account"} Application Status</h2>
      <p>Dear ${name},</p>
      <p>Your application status has been updated to:</p>
      <p style="display: inline-block; background: #f0f0f0; padding: 8px 16px; border-radius: 20px; font-weight: bold; color: #1a365d;">
        ${statusLabels[status] || status}
      </p>
      ${note ? `<p><strong>Note:</strong> ${note}</p>` : ""}
      <p>Reference Number: <strong>${referenceNo}</strong></p>
      <hr />
      <p style="color: #666; font-size: 12px;">Reliance Finance Limited | Track status anytime on our website.</p>
    </div>
  `;
}
