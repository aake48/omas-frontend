# How to run the application

### 1. Install [NodeJS](https://nodejs.org)

### 2. Create a certificate for HTTPS

In the root folder of the project, create a "certificates" folder and generate a self-signed certificate of name: localhost.pem and localhost-key.pem

recommended tool for generating a certificate: [mkcert](https://github.com/FiloSottile/mkcert)

### 3. Create .env or .env.local file in the project root with the following content:
```
NEXT_PUBLIC_API_URL=https://localhost:8080/
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
```

#### TO ENABLE reCAPTCHA, SEE BELOW:
Go to this [website](https://www.google.com/recaptcha/admin/create) and create a new reCAPTCHA project.
1. Label can be anything.
2. In the type section, select *Challenge (v2)* and then select *"I'm not a robot" Checkbox*.
3. In the domains section: For development, type in localhost (without port). For production, type in the actual domain name.
4. At last, click *Submit* and the next page should show you two keys. Copy and place these keys in their corresponding spots in the .env file.

### 4. Using a NodeJS package manager (e.g., npm) , install dependencies with the command:
```bash
npm install
```

### 5. Start the application
```bash
npm run dev
```


## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

### Next.js
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

### Recommended Icon library
- [Heroicons](https://heroicons.com/)

### Tailwind CSS
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
