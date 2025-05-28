# TempAI: AI-Powered Email Template Generator 🚀
**TempAI** is a modern web application built with Next.js that simplifies email template creation using artificial intelligence. By leveraging the Google Gemini API, TempAI allows users to generate professional email templates from simple text prompts (e.g., “create a newsletter for a coffee shop”) and customize them with an intuitive drag-and-drop interface. Designed for accessibility, TempAI caters to non-technical users like small business owners, marketers, and students, while offering a robust platform for developers. Deployed on Vercel for fast, global access, it uses Convex for real-time data management.

This README provides a comprehensive guide to understanding, installing, and running TempAI locally, with enhanced formatting to highlight key information.

## 📋 Table of Contents

✨ Features <br>
🛠️ Tech Stack <br>
📋 Prerequisites <br>
⚙️ Installation <br>
🚀 Running the Project Locally <br>
📂 Project Structure <br>
🔐 Environment Variables <br>
🛡️ Troubleshooting <br>
🌐 Deployment <br>
🤝 Contributing <br>
📚 Learn More <br>
📜 License


## ✨ Features
TempAI offers powerful features to streamline email template creation:

AI-Driven Template Generation: Input a text prompt, and the Google Gemini API creates a fully editable email template in seconds.
Drag-and-Drop Editor: Customize templates using React DnD, allowing users to drag components like text, images, or buttons onto a canvas.
Text and Font Editing: In the editor’s settings sidebar, users can modify text content, font styles (e.g., bold, italic), font sizes, and alignment for components like headings or paragraphs, with real-time previews for intuitive design.
Real-Time Data Sync: Convex ensures template changes are saved and updated instantly across sessions.
Secure Authentication: Google OAuth provides safe and reliable user login.
Responsive Design: Tailwind CSS ensures templates look great on all devices, from phones to desktops.

These features make TempAI user-friendly and versatile.

## 🛠️ Tech Stack
TempAI is built with a modern, scalable tech stack:

- Frontend: Next.js (React framework), Tailwind CSS for styling, React DnD for drag-and-drop, Radix UI for accessible components. <br>
- Backend: Convex for real-time database and serverless backend. <br>
- AI: Google Gemini API for generating email templates. <br>
- Authentication: Google OAuth for secure login. <br>
- Hosting: Vercel for frontend deployment, Convex Cloud for backend. <br>
- Fonts: Geist via Next.js font optimization.

This stack ensures TempAI is fast, maintainable, and scalable.

## 📋 Prerequisites
Before setting up TempAI locally, ensure you have:

- Node.js: Version 18.x or higher (nodejs.org). <br>
- npm: Version 8.x or higher (included with Node.js), or use Yarn, pnpm, or Bun. <br>
- Git: For cloning the repository (git-scm.com). <br>
- Code Editor: Visual Studio Code or similar. <br>
- Accounts: <br>
  - Vercel (optional, for deployment). <br>
  - Convex for backend setup. <br>
  - Google Cloud for Gemini API and OAuth credentials.



Verify versions:
node -v <br>
npm -v


## ⚙️ Installation
Follow these steps to set up TempAI locally:

Clone the Repository:
git clone https://github.com/your-username/tempai.git
cd tempai

Replace your-username with your GitHub username.

Install Dependencies:
npm install
### or
yarn install
### or
pnpm install
### or
bun install


Set Up Environment Variables:Create a .env.local file in the root directory:
NEXT_PUBLIC_CONVEX_URL=your-convex-project-url <br>
GOOGLE_GEMINI_API_KEY=your-gemini-api-key <br>
GOOGLE_CLIENT_ID=your-google-oauth-client-id <br>
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret <br>



Convex URL: From your Convex dashboard. <br>
Gemini API Key: From Google Cloud Console. <br>
OAuth Credentials: From Google Cloud Console.



⚠️ **Warning:** Never commit .env.local to Git. Add it to .gitignore.


Convex Setup:

Sign up at Convex and create a project. <br>
Initialize Convex:npx convex init <br>


Link your project and note the NEXT_PUBLIC_CONVEX_URL.


Google Gemini API Setup:

In Google Cloud Console, create a project and enable the Gemini API. <br>
Generate an API key for GOOGLE_GEMINI_API_KEY. <br>
Set up OAuth credentials for GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET. <br>




## 🚀 Running the Project Locally

Ensure dependencies and environment variables are set. <br>
Start the development server: <br>
npm run dev
### or
yarn dev
### or
pnpm dev
### or
bun dev


Open http://localhost:3000 in your browser. <br>

The app auto-updates as you edit files like app/page.js. Stop the server with Ctrl + C.

## 📂 Project Structure
Key directories and files:
tempai/
├── app/                    # Next.js App Router pages <br>
│   ├── page.js             # Homepage <br>
│   ├── editor/             # Editor page <br>
│   └── api/                # API routes <br>
│       └── gemini.js       # Gemini API integration <br>
├── components/             # React components <br>
│   ├── EditorCanvas.js     # Drag-and-drop canvas <br>
│   └── SettingsSidebar.js  # Text/font customization <br>
├── lib/                    # Utility functions <br>
│   └── gemini.js           # Gemini API helpers <br>
├── styles/                 # Tailwind CSS <br>
├── convex/                 # Convex backend <br>
├── public/                 # Static assets <br>
├── .env.local              # Environment variables <br>
├── next.config.js          # Next.js config <br>
├── package.json            # Dependencies <br>
└── README.md               # This file <br>

Explore:

app/api/gemini.js: Handles AI requests. <br>
components/SettingsSidebar.js: Manages text and font editing.


## 🔐 Environment Variables



Variable <br>
Description <br>
Source



NEXT_PUBLIC_CONVEX_URL <br>
Convex backend URL <br>
Convex dashboard


GOOGLE_GEMINI_API_KEY <br>
Google Gemini API key <br>
Google Cloud Console


GOOGLE_CLIENT_ID <br>
Google OAuth client ID <br>
Google Cloud Console


GOOGLE_CLIENT_SECRET <br>
Google OAuth client secret <br>
Google Cloud Console



🔐 **Security:** Keep .env.local private and excluded from Git.


## 🛡️ Troubleshooting

Dependency Errors: <br>
 - Run npm install again. <br>
 - Ensure Node.js is 18.x or higher.


API Key Issues: <br>
 - Verify GOOGLE_GEMINI_API_KEY in .env.local. <br>
 - Enable Gemini API in Google Cloud Console.


Convex Errors: <br>
 - Check NEXT_PUBLIC_CONVEX_URL.
 - Run npx convex dev to sync.


Port Conflicts: <br>
 - Change port if localhost:3000 is busy:npm run dev -- -p 3001




Text/Font Editing Issues: <br>
 - Ensure SettingsSidebar.js is correctly linked to the editor.



Open an issue on the repository for help.

## 🌐 Deployment

- Vercel. <br>
- Push to GitHub. <br>
- Connect to Vercel Dashboard. <br>
- Add environment variables. <br>
Deploy automatically.


Convex (Backend):npx convex deploy

Update NEXT_PUBLIC_CONVEX_URL in Vercel.

See Next.js deployment and Convex docs.

## 🤝 Contributing

Fork the repository.

Create a branch: git checkout -b feature/your-feature.

Commit: git commit -m 'Add feature'.

Push: git push origin feature/your-feature.

Open a pull request.

Test changes locally before submitting.

## 📚 Learn More
- Next.js Documentation
- Tailwind CSS Documentation
- React DnD Documentation
- Convex Documentation
- Google Gemini API
- Vercel Documentation

Visit the Next.js GitHub for updates.

