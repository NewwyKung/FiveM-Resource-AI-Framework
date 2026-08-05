# Security Policy

## Supported versions

This project is currently in Public Preview. Security fixes are applied to the latest commit on the default branch. Older tags or generated resource packages may not receive backports.

## Reporting a vulnerability

Do not publish exploitable details in a public issue, discussion, pull request, log, or example.

Use GitHub's private vulnerability reporting feature when it is enabled for this repository. If that feature is unavailable, contact the repository owner privately through an available GitHub profile contact method.

Include the affected commit or release version, the smallest safe reproduction, expected and actual behavior, security impact, affected runtime boundaries, and any proposed mitigation.

Remove API keys, webhooks, database credentials, private provider documentation, player identifiers, and sensitive logs before submitting a report.

## Scope

Security-sensitive areas include client/server authority, server event validation, NUI callbacks, provider adapters, database queries, release sanitization, generated production packages, and setup/release path handling.

Static validation is not a substitute for runtime testing on a real FXServer.
