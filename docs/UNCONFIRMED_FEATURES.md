# Unconfirmed Business Features

Features marked `"coming-soon"` in `lib/features.ts`. Each is fully built as an interactive preview but the final action button is disabled. Remove the badge and change the status to `"live"` once the feature ships.

| Feature | Status | Widget | Notes |
|---|---|---|---|
| Bulk payouts | coming-soon | `BulkPayoutBuilder` | Needs backend: batch payment endpoint, recipient validation, approval workflow |
| Team and approvals | coming-soon | `ApprovalsQueue`, `TeamRoles` | Needs backend: role-based auth, maker/checker workflow, team invite emails |
| Collect payments | coming-soon | `CollectPayments` | Needs backend: payment link generation, webhook for confirmation |
| Developer API | coming-soon | `ApiKeysPanel` | Needs backend: key issuance, scopes, usage tracking |
| Book a demo form | n/a | `BookADemo` | Submits to `submitDemoRequest()` mock — needs a real endpoint or form service (e.g. Formspree, HubSpot) before launch. Currently sends nothing. |
