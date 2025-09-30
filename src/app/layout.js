import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Open Stage",
  description: "Discover and manage your concert experiences",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Synchronize animation timing across page navigation
              (function() {
                const ANIMATION_DURATION_1 = 20000; // 20 seconds
                const ANIMATION_DURATION_2 = 25000; // 25 seconds
                
                // Get or create animation start time
                let animationStartTime = sessionStorage.getItem('animationStartTime');
                if (!animationStartTime) {
                  animationStartTime = Date.now();
                  sessionStorage.setItem('animationStartTime', animationStartTime);
                } else {
                  animationStartTime = parseInt(animationStartTime);
                }
                
                // Calculate current animation progress
                const now = Date.now();
                const elapsed = now - animationStartTime;
                
                // Calculate delay for each animation layer
                const delay1 = (elapsed % ANIMATION_DURATION_1) / 1000;
                const delay2 = (elapsed % ANIMATION_DURATION_2) / 1000;
                
                // Set CSS custom properties
                document.documentElement.style.setProperty('--animation-start-time', '0s');
                document.documentElement.style.setProperty('--animation-duration-1', ANIMATION_DURATION_1 + 'ms');
                document.documentElement.style.setProperty('--animation-duration-2', ANIMATION_DURATION_2 + 'ms');
                
                // Apply calculated delays
                const style = document.createElement('style');
                style.textContent = \`
                  .main-content-background::before,
                  .auth-container::before {
                    animation-delay: -\${delay1}s !important;
                  }
                  .main-content-background::after,
                  .auth-container::after {
                    animation-delay: -\${delay2}s !important;
                  }
                \`;
                document.head.appendChild(style);
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
