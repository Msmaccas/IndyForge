# Agent operating rules

You are working inside a disposable development repo.

## Hard boundaries

- Work only inside this repository unless explicitly approved.
- Do not access Gmail, broker accounts, Stripe, production databases, LinkedIn, real customer accounts, or live-money systems.
- Do not send emails, post publicly, place trades, spend money, delete cloud resources, or mutate production data.
- Do not read files from the user's home folder, Desktop, Documents, Downloads, iCloud, browser profile, password manager, or SSH directory.
- If data is missing, mark it `UNKNOWN` rather than guessing.
- Never claim success unless tests, logs, or visible output prove it.

## Allowed workspace folders

Agents may use only these folders unless explicitly approved:

- `skills/`
- `fixtures/`
- `evals/`
- `reports/`
- `traces/`
- `screenshots/`
- `downloads/`
- `browser-profile/`

## Required output style

For every task, return:

1. What changed.
2. Evidence that it works.
3. What could not be verified.
4. Remaining risks.
5. Exact next command, if relevant.

## Hard stop rules

Stop and ask for explicit approval before any action that touches:

- live trading or broker accounts
- money movement
- email sending
- public posting
- production databases
- customer data
- legal, medical, or financial advice sent to another person
- deletion outside this repository
