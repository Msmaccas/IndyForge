# Product Overview: IndyForge

## What is IndyForge?

IndyForge is a private agent operations cockpit for founders, traders, real‑estate investors, software builders and medical researchers who demand leverage without surrendering control. Unlike chatbots that answer isolated questions, IndyForge operates as a continuous background service: it ingests raw messages, files and notes, classifies them by domain, creates structured **decision cards**, proposes ranked options and next actions, and routes those actions through safe queues and approval gates.

The result is a single command center where messy inputs become evidence‑backed decisions. Because everything is persisted with an audit trail, IndyForge becomes a living knowledge base and workflow orchestrator rather than a disposable assistant. Users maintain ultimate control, with the ability to enable or disable live integrations at any time.

## Target Buyers

1. **Founder‑operators** juggling product, finance, marketing and operations across multiple ventures.
2. **Swing traders** who maintain a CAN SLIM or systematic trading watchlist but need help triaging charts and earnings notes.
3. **Real‑estate investors** reviewing deals, leases and property management notes.
4. **Medical students and researchers** managing literature reviews, research notes and lab tasks.
5. **Independent consultants and boutique shops** who want a private alternative to SaaS analytics and AI dashboards.

## Unique Value Proposition

- **Domain‑aware ingestion:** IndyForge understands that a stock chart note differs from a property listing or a GitHub issue. It classifies inputs appropriately and routes them to specialised workers.
- **Structured decision cards:** Instead of producing unstructured summaries, IndyForge produces consistent cards with fields like urgency, risk tier, missing data and actions. This makes downstream automation much easier to reason about.
- **Human‑in‑the‑loop by design:** All irreversible actions—trades, offers, emails, posts—are routed through an approval queue. Approvals are explicit and logged.
- **Self‑hosted or cloud‑ready:** Run IndyForge on your laptop with SQLite and in‑memory queues or deploy it to a cloud provider with Postgres and Redis. The codebase is open and auditable.
- **Extensible skills & integrations:** Future versions will support plug‑and‑play skills from skills.sh and other registries, plus connectors for GitHub, Activepieces, Telegram and research APIs. Adapt IndyForge to your workflows rather than the other way around.

## Pricing & Licensing (Suggested)

IndyForge is offered under a dual license: MIT for personal use and a commercial license for organisations. A hosted version with encrypted storage, managed LLM providers and turnkey connectors can be offered on a subscription basis (e.g. USD 49/mo per seat) with usage‑based overages. Professional services are available for custom workflows and on‑prem deployments.

## Roadmap

1. **Frontend dashboard:** Build a Next.js or React dashboard to visualise the inbox, decision board, approval queue and audit logs.
2. **LLM connectors:** Integrate with OpenAI, Anthropic, Qwen or local models to perform classification, summarisation and option ranking. Provide a tool registry and skill loader based on skills.sh.
3. **Activepieces/MCP integration:** Use connectors for GitHub, Slack/Telegram, Postgres and browser automation. Expose IndyForge as a reusable piece inside existing no‑code workflows.
4. **Skills marketplace:** Allow users to install and update domain‑specific skills (e.g. CAN SLIM analyst, real estate due‑diligence module) with verification and sandboxing.
5. **Advanced verifiers:** Implement policy enforcement for regulatory compliance (financial promotions, medical claims, privacy) and integrate external review services.

IndyForge aims to be more than an automation script: it is a foundation for trustworthy, agentic operations in a world where context is fragmented and decisions are risky.