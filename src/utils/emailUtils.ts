
/**
 * Opens a mailto link with the provided form data
 * @param formData Data to include in the email
 * @param emailAddress Recipient email address
 * @param subject Email subject
 */
export const sendEmailViaMailto = (
  formData: Record<string, string>,
  emailAddress: string = 'tejxcoder0.1@gmail.com',
  subject: string = 'New Form Submission'
) => {
  // Create a formatted message body from the form data
  const bodyContent = Object.entries(formData)
    .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
    .join('\n');

  // Encode the subject and body for mailto URL
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(bodyContent);

  // Create the mailto link
  const mailtoLink = `mailto:${emailAddress}?subject=${encodedSubject}&body=${encodedBody}`;

  // Open the default email client
  window.open(mailtoLink);
};
