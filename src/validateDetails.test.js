import { validateDetails } from './validateDetails';

const valid = { firstName: 'Ana', lastName: 'Horvat', email: 'ana@example.com', phone: '' };

test('complete details have no errors', () => {
  expect(validateDetails(valid)).toEqual({});
});

test('empty details have an error for name and email, but not for the optional phone', () => {
  const errors = validateDetails({ firstName: '', lastName: '', email: '', phone: '' });
  expect(Object.keys(errors).sort()).toEqual(['email', 'firstName', 'lastName']);
});

test('a name made only of spaces is rejected', () => {
  expect(validateDetails({ ...valid, firstName: '   ' }).firstName).toBe('Please enter your first name.');
  expect(validateDetails({ ...valid, lastName: '   ' }).lastName).toBe('Please enter your last name.');
});

test('the email must look like an email address', () => {
  expect(validateDetails({ ...valid, email: 'ana' }).email)
    .toBe('Please enter a valid email address, for example name@example.com.');
  expect(validateDetails({ ...valid, email: 'ana@example' }).email)
    .toBe('Please enter a valid email address, for example name@example.com.');
  expect(validateDetails({ ...valid, email: ' ana@example.com ' }).email).toBeUndefined();
});

test('the phone is optional, but must be a real number when given', () => {
  expect(validateDetails({ ...valid, phone: '(312) 555-0100' }).phone).toBeUndefined();
  expect(validateDetails({ ...valid, phone: '+385 91 123 4567' }).phone).toBeUndefined();
  expect(validateDetails({ ...valid, phone: '12345' }).phone)
    .toBe('Please enter a valid phone number, for example (312) 555-0100.');
  expect(validateDetails({ ...valid, phone: 'call me' }).phone)
    .toBe('Please enter a valid phone number, for example (312) 555-0100.');
});
