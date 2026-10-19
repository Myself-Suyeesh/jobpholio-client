/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  CircleAlert,
  Clock3,
  Layers3,
  Menu,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { GET_STARTED_HREF, LOGIN_HREF } from "./constants";
import { Button } from "@base-ui/react/button";
import { useRouter } from "next/navigation";

import jobPholioLogo from "@/public/logos/jobpholio-light-logo.webp";

const dashboardImage = "/landing/dashboard-screen.png";

const faqs = [
  [
    "Why does tracking get messy?",
    "Because the search lives across job boards, inboxes, spreadsheets, notes, calendars, and recruiter messages.",
  ],
  [
    "What does JobPholio keep together?",
    "Applications, stages, interviews, follow-ups, notes, and role details in one clear workspace.",
  ],
  [
    "Is this another spreadsheet?",
    "No. JobPholio is designed around the next action, so the search feels lighter instead of becoming more admin.",
  ],
];

function Logo() {
  return (
    <div className="brand">
      <Image src={jobPholioLogo} alt="JobPholio Logo" width={100} height={26} />
    </div>
  );
}

function Eyebrow({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <span className={`eyebrow ${dark ? "eyebrow-dark" : ""}`}>
      <Sparkles size={14} />
      {children}
    </span>
  );
}

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

export function LandingView() {
  const [active, setActive] = useState("top");
  const [openFaq, setOpenFaq] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const nodes = [...document.querySelectorAll<HTMLElement>("[data-story]")];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActive((visible.target as HTMLElement).dataset.story || "top");
        }
      },
      { threshold: [0.2, 0.5, 0.8], rootMargin: "-20% 0px -45% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main className={`story-page active-${active}`}>
      <div className="scroll-progress" />
      <div className="announcement">
        A clearer way through the messy middle of a job search
      </div>

      <nav className="nav">
        <a href="#top" aria-label="JobPholio home">
          <Logo />
        </a>
        <div className="nav-links">
          <a href="#problem">The problem</a>
          <a href="#solution">The shift</a>
          <a href="#faq">FAQ</a>
        </div>
        <Button className="nav-cta" onClick={() => router.replace("/login")}>
          Get Started
        </Button>
        <button
          className="menu-button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <a href="#problem" onClick={() => setMobileMenuOpen(false)}>
            The problem
          </a>
          <a href="#solution" onClick={() => setMobileMenuOpen(false)}>
            The shift
          </a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)}>
            FAQ
          </a>
          <Link
            className="mobile-cta"
            href={GET_STARTED_HREF}
            onClick={() => setMobileMenuOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}

      <section className="hero-story" id="top" data-story="top">
        <div className="hero-copy reveal">
          <Eyebrow>JOB SEARCH, TOGETHER</Eyebrow>
          <h1>
            The job search is a lot to hold. <em>It shouldn&apos;t be.</em>
          </h1>
          <p>
            Every application has a story. JobPholio gives it a home, so you can
            stop reconstructing your search and start moving through it.
          </p>
          <div className="hero-cta-wrap">
            <Button
              className="hero-cta-btn"
              onClick={() => router.replace("/login")}
            >
              Get Started <ArrowRight size={16} />
            </Button>
          </div>
          <small>
            Free access for people juggling LinkedIn, Naukri, referrals, and
            recruiter calls.
          </small>
        </div>
        <Reveal className="hero-dashboard">
          <div className="dashboard-caption">
            <span>
              <i /> Your search, at a glance
            </span>
            <span>
              42 applications <ArrowRight size={15} />
            </span>
          </div>
          <img
            src={dashboardImage}
            alt="JobPholio dashboard with applications, interviews, progress metrics, and needs attention"
          />
        </Reveal>
      </section>

      <section
        className="problem section-wrap"
        id="problem"
        data-story="problem"
      >
        <div className="section-container">
          <Reveal className="section-intro">
            <Eyebrow>THE REAL PROBLEM</Eyebrow>
            <h2>
              You apply everywhere. Then the story <em>fragments.</em>
            </h2>
            <p>
              The hard part is not only finding roles. It is remembering what
              you sent, who replied, when to follow up, and what deserves your
              energy today.
            </p>
          </Reveal>
          <div className="problem-grid">
            <Reveal>
              <article>
                <span className="problem-number">01</span>
                <CircleAlert />
                <h3>Scattered context</h3>
                <p>
                  A role lives in a tab, a recruiter reply in email, and the
                  salary notes in a phone draft.
                </p>
              </article>
            </Reveal>
            <Reveal>
              <article>
                <span className="problem-number">02</span>
                <Clock3 />
                <h3>Quiet moments slip</h3>
                <p>
                  Interview rounds and follow-ups are easy to miss when nothing
                  shows you what is next.
                </p>
              </article>
            </Reveal>
            <Reveal>
              <article>
                <span className="problem-number">03</span>
                <Layers3 />
                <h3>Progress feels invisible</h3>
                <p>
                  When every update is separate, even real momentum can feel
                  like starting over.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="shift" data-story="shift">
        <div className="section-container">
          <div className="shift-inner section-wrap">
            <Reveal>
              <Eyebrow dark>THE SHIFT</Eyebrow>
              <h2>
                Not more admin.
                <br />
                <em>A better memory.</em>
              </h2>
            </Reveal>
            <Reveal className="shift-statement">
              <span>JobPholio turns</span>
              <strong>scattered effort</strong>
              <span>into a visible next step.</span>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        className="solution section-wrap"
        id="solution"
        data-story="solution"
      >
        <div className="section-container">
          <Reveal className="section-intro">
            <Eyebrow>HOW IT HELPS</Eyebrow>
            <h2>
              A calmer search is built from <em>small certainties.</em>
            </h2>
            <p>
              Each feature answers a real friction point, without asking you to
              become a full-time project manager.
            </p>
          </Reveal>
          <div className="solution-grid">
            <Reveal>
              <article className="solution-card capture">
                <span>01 / CAPTURE</span>
                <Target />
                <h3>One place to land the role.</h3>
                <p>
                  Save the details while they are fresh. No more searching for
                  the link you meant to revisit.
                </p>
              </article>
            </Reveal>
            <Reveal>
              <article className="solution-card remember">
                <span>02 / REMEMBER</span>
                <Clock3 />
                <h3>One timeline to remember it.</h3>
                <p>
                  Keep interviews, notes, and follow-ups attached to the
                  application they belong to.
                </p>
              </article>
            </Reveal>
            <Reveal>
              <article className="solution-card move">
                <span>03 / MOVE FORWARD</span>
                <ArrowRight />
                <h3>One next step to act on.</h3>
                <p>
                  See what needs attention, what is waiting, and where your
                  energy matters most.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-wrap" data-story="journey">
        <div className="journey-story section-container">
          <Reveal className="journey-copy">
            <Eyebrow dark>YOUR APPLICATION JOURNEY</Eyebrow>
            <h2>
              From scattered tabs to a search you can <em>trust.</em>
            </h2>
            <p>
              JobPholio does not make the search feel like admin. It gives your
              effort a shape you can return to.
            </p>
          </Reveal>
          <div className="journey-steps">
            <Reveal>
              <div>
                <b>01</b>
                <span>Applied</span>
                <p>The role and context are captured while they are fresh.</p>
              </div>
            </Reveal>
            <Reveal>
              <div>
                <b>02</b>
                <span>Interview</span>
                <p>Dates, rounds, and preparation stay together.</p>
              </div>
            </Reveal>
            <Reveal>
              <div>
                <b>03</b>
                <span>Follow up</span>
                <p>The next action is visible before it slips.</p>
              </div>
            </Reveal>
            <Reveal>
              <div>
                <b>04</b>
                <span>Outcome</span>
                <p>The full story is there, whatever the answer.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="faq section-wrap" id="faq" data-story="faq">
        <div className="section-container">
          <Reveal className="section-intro">
            <Eyebrow>FAQ</Eyebrow>
            <h2>
              Less reconstructing.
              <br />
              <em>More next steps.</em>
            </h2>
          </Reveal>
          <div className="faq-list">
            {faqs.map(([q, a], i) => (
              <div
                className={`faq-item ${openFaq === i ? "open" : ""}`}
                key={q}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  type="button"
                >
                  <span>{q}</span>
                  <ChevronDown size={18} />
                </button>
                {openFaq === i && <p>{a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="join section-wrap" id="join" data-story="join">
        <div className="join-panel section-container">
          <Reveal>
            <Eyebrow dark>START YOUR SEARCH</Eyebrow>
            <h2>
              A calmer job search starts with <em>one place.</em>
            </h2>
            <p>
              Track every application, interview and follow-up in one clear
              workspace.
            </p>
            <div className="join-cta-wrap">
              <Button
                className="join-cta-btn"
                onClick={() => router.replace("/login")}
              >
                Get Started <ArrowRight size={16} />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <footer>
        <div>
          <Logo />
          <p>Applications, interviews, follow-ups — one clear story.</p>
        </div>
        <div className="footer-links">
          <a href="#problem">The problem</a>
          <a href="#solution">The shift</a>
          <a href="#faq">FAQ</a>
        </div>
      </footer>
    </main>
  );
}
