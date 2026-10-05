# Shree School Mart — Final Project Guide

## 1. Project summary

This is the final Shree School Mart catalogue website. Customers can browse services, see real stationery and trophy images, save service items to a wishlist/enquiry bag, and contact the shop through WhatsApp. Online website payment remains disabled and is marked as coming soon.

The trophy gallery contains 366 individually cropped products:

- 66 Economical trophies
- 84 Fiber trophies
- 216 Wooden mementos

## 2. How to run the project

Install Node.js 22 or newer, extract the ZIP, and open a terminal inside the `Shree-School-Mart-Final` folder.

```bash
npm install
npm run dev
```

Open the local address printed in the terminal, normally `http://localhost:5173`.

To verify a production build:

```bash
npm run build
```

## 3. Important files and folders

| Path | Purpose |
| --- | --- |
| `app/page.tsx` | Main website UI, navigation, gallery, WhatsApp links, cart, wishlist, address and timings |
| `app/globals.css` | Website colours, cards, gallery layout, mobile responsiveness and general styling |
| `app/api/shop/route.ts` | Saves and returns enquiry-bag and wishlist data |
| `lib/catalog.ts` | Service categories and service-product information |
| `lib/gallery.ts` | Stationery and trophy image lists, references and category counts |
| `public/shree-school-mart-logo.jpeg` | Shop logo used on the website |
| `public/products/stationery/` | 74 stationery images and the supplied product video |
| `public/products/trophies/eco-items/` | 66 separate economical trophy images |
| `public/products/trophies/fiber-items/` | 84 separate fiber trophy images |
| `public/products/trophies/wooden-items/` | 216 separate wooden memento images |
| `package.json` | Project commands and required packages |
| `.openai/hosting.json` | Hosting configuration; the downloadable ZIP does not contain the live project's private ID |

## 4. How the trophy count works

The website calculates the total directly from the three gallery arrays:

```text
66 + 84 + 216 = 366 products
```

Both the section heading and the `Browse services` sidebar use this same calculated value. Therefore, changing a gallery array automatically changes the displayed total.

## 5. Adding more trophy products

1. Add the new `.webp` image inside the correct `public/products/trophies/...-items/` folder.
2. Update the relevant page count or gallery-generation logic in `lib/gallery.ts`.
3. Run `npm run build` to check the project.

Every existing trophy crop retains its original catalogue code, size and MRP text inside the image.

## 6. Updating shop details

- Main content, WhatsApp number, address and timings: `app/page.tsx`
- Categories and service descriptions: `lib/catalog.ts`
- Product gallery entries and counts: `lib/gallery.ts`
- Colours and layout: `app/globals.css`

## 7. Current shop information

- Office: 99819 90811
- Alternate: +91 95846 26452
- Address: Shree School Mart, Narmada Colony, Udaipura 464770, Raisen (MP)
- Timings: 8:30 AM to 10:00 PM

## 8. Ordering and payment status

Product prices are not maintained as website checkout prices yet. Customers are redirected to WhatsApp for current price, availability and order confirmation. Website checkout and online payment can be added later.
