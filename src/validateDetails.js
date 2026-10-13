// Customer details: first and last name and an email are required, a phone number is optional.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_CHARACTERS = /^[0-9+()\-.\s]+$/;

// Returns an object with one message per invalid field; an empty object means the details are valid.
export function validateDetails({ firstName, lastName, email, phone }) {
  const errors = {};

  if (!firstName.trim()) {
    errors.firstName = 'Please enter your first name.';
  }

  if (!lastName.trim()) {
    errors.lastName = 'Please enter your last name.';
  }

  if (!email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = 'Please enter a valid email address, for example name@example.com.';
  }

  const digits = phone.replace(/\D/g, '').length;
  if (phone.trim() && (!PHONE_CHARACTERS.test(phone) || digits < 7 || digits > 15)) {
    errors.phone = 'Please enter a valid phone number, for example (312) 555-0100.';
  }

  return errors;
}
