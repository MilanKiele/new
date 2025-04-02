/*
File: LandingSection.tsx
Description: Landing Page Section for the application.
*/

export default function LandingSection() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="container text-center max-w-2xl -mt-40">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to Authify
        </h1>
        <p className="text-lg text-gray-600 mb-8 mb-40">
          A modern authentication template with login, registration, and user
          management built-in. Get started quickly with secure, scalable auth.
        </p>
      </div>
    </section>
  );
}
