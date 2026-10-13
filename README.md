# Little Lemon

Front-end capstone project (Meta Front-End Developer Professional Certificate): a responsive web app for Little Lemon, a family-owned Mediterranean restaurant in Chicago. The main feature is the **table booking form**.

Bootstrapped with Create React App.

## Requirements

- [Node.js](https://nodejs.org/) 18 or newer (npm comes with it)
- Git

## Setup

```bash
git clone https://github.com/GlassHopper66/little-lemon.git
cd little-lemon
npm install
npm start          # opens http://localhost:3000
```

Other scripts:

```bash
npm test                       # runs the unit tests in watch mode (press "a" to run all)
npm test -- --watchAll=false   # runs all tests once
npm run build                  # production build in the build/ folder
```

## How to try the booking form

1. Open **Reservations** in the navigation (or the **Reserve a Table** button), route `/booking`.
2. Under **Your table**, choose a date, a time, the number of guests (1 to 10) and an occasion.
3. Under **Your details**, enter your first name, last name and email (the phone number is optional). Required fields are marked with *.
4. Press **Make Your reservation**. The confirmation page shows the booking.
5. Choose **Make another reservation** to see the booking in the **Your bookings** table, where it can be cancelled.

Bookings are saved in `localStorage`, so they survive a page reload. A booked time disappears from the list of times for that date.

## Features

| Area | What the app does |
| --- | --- |
| Booking form | Controlled React form in two sections, **Your table** and **Your details**; available times come from `fetchAPI` and are managed with `useReducer` |
| Validation | HTML5 attributes (`required`, `min`, `max`, `step`) plus JavaScript validation in `validateBooking.js` and `validateDetails.js`; the submit button stays disabled until the form is valid |
| Edge cases | Past dates, times that have already passed today, booked times, an empty, decimal or out-of-range number of guests, no free tables on a date, broken or blocked `localStorage`, names made only of spaces, an invalid email or phone number |
| Error messages | Shown after a field is left or the form is submitted, linked with `aria-describedby` and `aria-invalid` |
| Accessibility | Semantic landmarks, skip link, labels connected with `htmlFor`/`id`, a title per page, focus moved to the confirmation heading, visible focus styles |
| Responsive layout | CSS Grid with 4 / 8 / 12 columns (mobile / tablet / desktop) |
| UX/UI | Colours and fonts from the Little Lemon style guide (Markazi Text, Karla) |

## Project structure

```
src/
  App.js                 page skeleton: skip link, Header, Nav, Main, Footer
  Main.js                routes, booking state (useReducer), initializeTimes / updateTimes
  BookingPage.js         booking page: form, help line, bookings table
  BookingForm.js         the booking form
  BookingsTable.js       saved bookings with cancel / keep
  ConfirmedBooking.js    confirmation page
  validateBooking.js     table validation rules and messages
  validateDetails.js     customer details rules (name, email, optional phone)
  api.js                 fetchAPI / submitAPI from the course
  bookingStorage.js      load and save bookings in localStorage
  dates.js               date helpers (local time, readable dates)
  *.test.js              unit tests (Jest + React Testing Library)
  App.css                page grid and reusable 4/8/12 column grid
  elements.css           style guide tokens and element styles
  components.css         component styles
```

## Tests

The unit tests cover the form fields and labels, HTML5 validation attributes, valid and invalid values for every field (including the customer details), form submission, `initializeTimes` and `updateTimes` (including booked and already passed times), saving to `localStorage`, and the booking flow from the form to the confirmation page and the bookings table.

## Notes

- `api.js` is the course API file (`courseraap/capstone/main/api.js`) kept as an ES module, because GitHub serves the original as `text/plain` and a `<script>` tag cannot run it.
- The Menu, Order online and Login pages are placeholders ("coming soon"); the capstone focuses on the booking form.
