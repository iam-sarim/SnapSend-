import Header from "../_components/Header";
import Link from "next/link";

export const metadata = {
  title: "About Us – FileShare",
  description:
    "Learn about FileShare – the simplest way to upload, manage, and share files with anyone.",
};

const features = [
  {
    icon: (
      <svg
        className="size-6 text-indigo-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
        />
      </svg>
    ),
    title: "Lightning-Fast Uploads",
    desc: "Upload files up to 100MB in seconds. Our optimised infrastructure ensures your files reach the cloud without delay.",
  },
  {
    icon: (
      <svg
        className="size-6 text-indigo-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
        />
      </svg>
    ),
    title: "Instant Sharing",
    desc: "Generate a unique shareable link for any file in one click. Share with anyone — no account required to download.",
  },
  {
    icon: (
      <svg
        className="size-6 text-indigo-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
        />
      </svg>
    ),
    title: "Secure by Default",
    desc: "Every file is stored with enterprise-grade encryption. Optional password protection lets you control who can access your content.",
  },
  {
    icon: (
      <svg
        className="size-6 text-indigo-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
        />
      </svg>
    ),
    title: "All File Types",
    desc: "PDFs, images, videos, audio, Word docs, spreadsheets — if it's a file, we handle it. No restrictions on file format.",
  },
  {
    icon: (
      <svg
        className="size-6 text-indigo-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
        />
      </svg>
    ),
    title: "File Dashboard",
    desc: "Track all your uploads in one place. View, share, or delete files at any time from your personal file manager.",
  },
  {
    icon: (
      <svg
        className="size-6 text-indigo-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
        />
      </svg>
    ),
    title: "Email Sharing",
    desc: "Send file links directly to recipients via email — straight from the platform. No copy-pasting required.",
  },
];

const steps = [
  {
    step: "01",
    title: "Create an account",
    desc: "Sign up in seconds using your email or social login.",
  },
  {
    step: "02",
    title: "Upload your file",
    desc: "Drag and drop or browse — any file type, up to 100MB.",
  },
  {
    step: "03",
    title: "Share the link",
    desc: "Copy your unique link or email it directly to anyone.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-indigo-50 to-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-4 py-1.5 text-xs font-semibold text-indigo-700 mb-6">
            <span className="size-1.5 rounded-full bg-indigo-500 inline-block" />
            About FileShare
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            The simplest way to{" "}
            <span className="text-indigo-600">share any file</span> with anyone
          </h1>
          <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
            FileShare was built with one goal: make file sharing effortless. No
            complicated setup, no cluttered interfaces — just upload, share, and
            move on.
          </p>
          <div className="mt-8">
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 active:scale-95"
            >
              Start Uploading — It&apos;s Free
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Built for people who just need it to{" "}
                <span className="text-indigo-600">work</span>
              </h2>
              <p className="mt-4 text-gray-500 leading-relaxed">
                We&apos;ve all been there — trying to send a large file over
                email only to be told it&apos;s too big, or fumbling through
                confusing cloud storage tools just to share a single document.
                FileShare solves that problem cleanly and simply.
              </p>
              <p className="mt-4 text-gray-500 leading-relaxed">
                Whether you&apos;re a freelancer sending design files to a
                client, a student sharing lecture notes, or a team collaborating
                on a project — FileShare gives you a fast, secure, and reliable
                way to move files between people.
              </p>
              <div className="mt-8 flex flex-wrap gap-6">
                {[
                  { label: "Files Shared", value: "10K+" },
                  { label: "Happy Users", value: "2K+" },
                  { label: "Uptime", value: "99.9%" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-3xl font-extrabold text-indigo-600">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual card */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 flex flex-col gap-4 shadow-inner">
              {["design-mockup.fig", "report-q1.pdf", "intro-video.mp4"].map(
                (name, i) => (
                  <div
                    key={name}
                    className="flex items-center gap-4 bg-white rounded-xl px-4 py-3 shadow-sm"
                  >
                    <div
                      className={`size-10 rounded-lg flex items-center justify-center text-xs font-bold text-white ${["bg-purple-500", "bg-red-500", "bg-blue-500"][i]}`}
                    >
                      {["FIG", "PDF", "MP4"][i]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {["4.2 MB", "1.1 MB", "38 MB"][i]} · Shared
                      </p>
                    </div>
                    <svg
                      className="size-4 text-green-500 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                ),
              )}
              <p className="text-xs text-center text-indigo-400 mt-2">
                Your files, shared securely ✦
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Everything you need to share files{" "}
              <span className="text-indigo-600">confidently</span>
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              Packed with features that make uploading and sharing
              straightforward — not stressful.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-indigo-200 hover:shadow-md transition"
              >
                <div className="size-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              How it <span className="text-indigo-600">works</span>
            </h2>
            <p className="mt-4 text-gray-500">Three steps. That&apos;s all.</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.step} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden sm:block absolute top-8 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-0.5 bg-indigo-100" />
                )}
                <div className="mx-auto size-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-md mb-4">
                  {s.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-indigo-600 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to share your first file?
          </h2>
          <p className="mt-4 text-indigo-200">
            Join thousands of users who trust FileShare every day. No credit
            card required.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-md transition hover:bg-indigo-50 active:scale-95"
            >
              Upload a File Now
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg border border-indigo-400 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} FileShare. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <Link href="/upload" className="hover:text-white transition">
              Upload
            </Link>
            <Link href="/about" className="hover:text-white transition">
              About
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
