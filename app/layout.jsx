import UserDetailProvider from './Provider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import "./globals.css";
import { Toaster } from '@/components/ui/sonner';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          <UserDetailProvider>
            {children}
          </UserDetailProvider>
        </GoogleOAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}