
## Getting Started

First, run the development server:

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

Short Summary of the Application

This Full-stack Next.js application provides comprehensive authentication features, including Signup, Login, and Logout functions:

Signup: Users can securely create an account by filling out the Signup form. The password is encrypted before being stored in the MongoDB database.

Login: Upon successful authentication, a token is generated for the user and stored in a cookie, enabling seamless access to protected routes.

Logout: Users can easily log out by clicking the logout button, which removes the cookie containing the authentication token.

The application utilizes MongoDB for storing user passwords and manages authentication using tokens stored in cookies.

In my Full-stack Next.js application, I use middleware to restrict access to the Profile page and product listings if the user is not logged in.





