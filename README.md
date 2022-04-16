# Flight-Agency Frontend / BFF

This frontend is written in Typescript, using Next.js. The directory structure is modulated, so that common utilities and components live at the top level, whereas page specific components live in their own modules. This allows us to reuse code where it makes sense, whilst keeping things together where they're likely to change for the same reason.

This project utilizes some of the latest features from Next.js, including aspects of their Rust compiler. For example, we use SWC to modularize imports to avoid bundling the entirety of certain packages into our pages. Components also leverage dynamic imports to have them lazy loaded until required.

Due to the fact that Next.js exposes both regular and API routes, the API side was leveraged as a `backend for frontend` or `BFF`. It handles authorization by using JWT tokens within the NextAuth framework, and makes calls to both the backend service and Googles standalone APIs such as Places, and caches responses for the frontend.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
