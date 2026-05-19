import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Logo from '../components/Logo.jsx'

function FeatureCard({ title, body }) {
  return (
    <div className="card p-6 transition hover:border-brand-secondary2 hover:bg-surface-raised">
      <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-md bg-brand-secondary/60">
        <Logo className="h-5 w-5" />
      </div>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-brand-secondary3/80">{body}</p>
    </div>
  )
}

function Step({ n, title, body }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-secondary2 bg-surface text-sm font-semibold text-brand-primary">
        {n}
      </div>
      <div>
        <h4 className="font-semibold text-white">{title}</h4>
        <p className="mt-1 text-sm leading-6 text-brand-secondary3/80">{body}</p>
      </div>
    </div>
  )
}

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative overflow-hidden border-b border-brand-secondary/60 bg-hero-glow">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="pill mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
                Unified HR and IT assistant
              </div>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                One conversation.<br />
                <span className="text-brand-primary">Every system.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-brand-secondary3/80 sm:text-lg">
                Muayien replaces the maze of HRMS and ITSM dashboards with a single,
                intelligent chat. Request leave, open a ticket, check status, in plain English.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/register" className="btn-primary px-5 py-2.5 text-base">Get started</Link>
                <Link to="/login" className="btn-secondary px-5 py-2.5 text-base">Sign in</Link>
              </div>
            </div>

            <div className="relative">
              <Logo className="pointer-events-none absolute -top-12 -right-6 h-20 w-20 opacity-20 animate-float" />
              <div className="card-raised overflow-hidden">
                <div className="flex items-center gap-2 border-b border-brand-secondary2/30 px-4 py-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand-secondary" />
                  <div className="h-2.5 w-2.5 rounded-full bg-brand-secondary" />
                  <div className="h-2.5 w-2.5 rounded-full bg-brand-secondary" />
                  <span className="ml-2 text-xs text-brand-secondary3/60">muayien.app/chat</span>
                </div>
                <div className="space-y-3 px-4 py-5">
                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-br-md bg-brand-primary px-4 py-2 text-sm font-medium text-brand-bg">
                      I need to take Monday off.
                    </div>
                  </div>
                  <div className="flex">
                    <div className="max-w-[80%] rounded-2xl rounded-bl-md border border-brand-secondary bg-surface px-4 py-2 text-sm text-white">
                      Your leave request starting Monday has been submitted to HR.
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-br-md bg-brand-primary px-4 py-2 text-sm font-medium text-brand-bg">
                      My laptop screen is flickering.
                    </div>
                  </div>
                  <div className="flex">
                    <div className="max-w-[80%] rounded-2xl rounded-bl-md border border-brand-secondary bg-surface px-4 py-2 text-sm text-white">
                      A hardware support ticket has been opened. IT will reach out within 4 business hours.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-b border-brand-secondary/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-white">Built for the modern workplace.</h2>
            <p className="mt-3 text-base leading-7 text-brand-secondary3/80">
              One interface that understands intent, fills in the details, and routes work to the right system.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard title="Natural language" body="Ask in plain English. Muayien classifies the intent and extracts the right entities automatically." />
            <FeatureCard title="HRMS workflows" body="Leave requests, time off, and policy questions resolved in seconds without leaving the chat." />
            <FeatureCard title="ITSM tickets" body="Open hardware, access, and software tickets with one message. Track status from the same interface." />
            <FeatureCard title="Chat history" body="Every conversation is saved, searchable, and clearable on demand. Your audit trail in one place." />
            <FeatureCard title="Secure by default" body="JWT-authenticated. Tokens refresh silently. Your data stays inside your organization." />
            <FeatureCard title="Built on a SGM model" body="A Slot-Gated joint intent and slot-filling NLP model purpose-built for ERP language, trained in PyTorch." />
          </div>
        </div>
      </section>

      <section id="how" className="border-b border-brand-secondary/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-white">How it works.</h2>
              <p className="mt-3 text-base leading-7 text-brand-secondary3/80">
                Three layers, one experience. The frontend talks to a Django REST API, which delegates language understanding to a PyTorch model.
              </p>
            </div>
            <div className="space-y-6">
              <Step n="1" title="You type a request" body='"I want a vacation next Sunday." No forms, no menus.' />
              <Step n="2" title="Muayien understands" body="The SGM model identifies the intent (Leave_Request) and the entities (start_day=Sunday)." />
              <Step n="3" title="The system acts" body="A draft request is sent to HRMS, an ITSM ticket is opened, or a status check is run, and you get a reply in the chat." />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="card-raised flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <Logo className="h-10 w-10 shrink-0" />
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-white">Stop hunting across dashboards.</h3>
                <p className="mt-1 text-sm text-brand-secondary3/80">Create your account and try the chat in under a minute.</p>
              </div>
            </div>
            <Link to="/register" className="btn-primary px-5 py-2.5 text-base">Get started</Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-brand-secondary/60">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-4 py-8 text-xs text-brand-secondary3/60 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Logo className="h-4 w-4" />
            <span>(c) {new Date().getFullYear()} Muayien</span>
          </div>
          <p>Made By Team MU | Muhammad, Muath, Muayad</p>
        </div>
      </footer>
    </div>
  )
}
