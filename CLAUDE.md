# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Git workflow

- Never run `git commit` or `git push` on your own — always wait for the user's explicit go-ahead. The user reviews the diff before anything is committed.
- Do not add `Co-Authored-By: Claude` (or any Claude/Anthropic attribution) to commit messages.
- Commit messages should be as short as possible (one sentence)
- Commit messages must follow the format `TYPE: DESCRIPTION` — Husky enforces this on every commit
- Allowed types: `feat`, `bugfix`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `revert`
