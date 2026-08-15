# JobPholio

**Never lose track of an application again.**

JobPholio is a job application tracker built for how people actually job-hunt — across LinkedIn, Naukri, company career sites, referrals, and everything in between. It automatically captures your applications as you apply, lets you log the rest manually, and gives you one clean dashboard to check before a recruiter call catches you off guard.

## The problem

Job seekers apply across dozens of platforms — LinkedIn, Naukri, company sites, referrals — with no single record of where they've applied, when, or what was said. Weeks later, a recruiter calls to schedule an interview, and the candidate has no idea if they've even applied there, what role it was for, or what they said in their application. Existing trackers (Teal, Careerflow, LoopCV) are built around Western job platforms and don't offer first-class support for Naukri.com, leaving a real gap for Indian job seekers.

## What it does

- **Auto-capture applications** from LinkedIn, Naukri, and other platforms via browser extension and email parsing — no manual re-entry required.
- **Manual entry** for offline or referral-based applications.
- **Automatic status management** — applications move to "on hold" after a configurable no-response window.
- **Centralized tracking** — every application's status (applied, on hold, interview, offer, rejected), source, dates, notes, and job description in one place.
- **One place to check before any interviewer call** — so you're never caught confused about whether, when, or how you applied.

## Tech stack

- **Frontend:** React
- **Backend:** Node.js + Express (monolith architecture)
- **Database:** MongoDB, with session-based authentication backed by `connect-mongo`
- **Architecture:** Deliberately built as a monolith for Phase 1 — microservices was considered and rejected as unnecessary complexity at this stage

## Roadmap

- **Phase 1 (current):** Manual CRUD + authentication, core application tracking
- **Phase 2:** AI features — resume-to-job-description matching, JD parsing via LLM
- **Phase 3:** Email parsing and Chrome extension for automatic cross-platform capture

## Status

Early development — architecture and API design in progress.
