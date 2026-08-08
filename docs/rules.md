# Development Rules

These rules define how this project should evolve. Their purpose is to keep the codebase simple, maintainable, and consistent over time.

---

## 1. Do Not Assume Information

Never assume:

- Functional requirements.
- Business rules.
- Data models.
- Project structure.
- Existing implementations.
- Technologies.
- Expected behavior.

If information is missing, ask before implementing.

---

## 2. Do Not Invent Code

When implementing a feature requires knowledge of the existing project, request the necessary files first.

Examples:

- Project structure
- Source code
- Interfaces
- Models
- Configuration
- Dependencies

Never generate code based on guesses.

---

## 3. Base Decisions on Existing Code

Before proposing any implementation, review the current project.

Respect:

- Existing architecture
- Naming conventions
- Folder organization
- Coding style
- Existing patterns

New code should integrate naturally with the current codebase.

---

## 4. Keep the Code Simple

Always prioritize:

- Readability
- Simplicity
- Low coupling
- Clear responsibilities
- Easy maintenance
- Clean Code


Prefer the simplest solution that satisfies the requirements.

---

## 5. Follow Good Practices

Apply established software engineering principles whenever appropriate.

- KISS
- YAGNI
- DRY
- SOLID (without overengineering)

Good practices should simplify the project, not make it more complex.

---



## 6. Explain the Impact Before Making Changes

Before proposing significant modifications, briefly explain:

- What will change.
- Why it needs to change.
- Which files are expected to be affected.

Keep explanations simple, not extended and concise.

---

## 7. Avoid Unnecessary Dependencies

Before introducing a new dependency, verify:

- Can the Python standard library solve the problem?
- Does an existing dependency already provide the functionality?
- Does the new dependency provide enough value to justify its addition?

Only add dependencies when they provide clear benefits.

---

## 8. Respect the Project Architecture

Each module should have a single responsibility.

Do not mix:

- User Interface
- Business Logic
- Persistence
- Scraping
- Notifications
- Configuration

Each concern should remain isolated.

---


## 9. Refactor Only with a Clear Purpose

Do not refactor based on personal preference.

Every refactor should have a clear justification, such as:

- Improved maintainability
- Reduced duplication
- Simplified implementation
- Bug fixes
- Better readability

---

## 10. Communication

Always:

- Keep responses short and direct.
- Avoid unnecessary explanations.
- Prefer code over theory.
- Return complete implementations, not partial snippets.
- Return complete refactors when requested.
- Do not omit modified code.
- Do not speculate. Ask for missing files or context first.
- Follow KISS and avoid overengineering.

---


## 11. Verify Before Deciding

Do not make architectural or implementation decisions without evidence.

When uncertain:

- Ask questions.
- Request the relevant code.
- Review the documentation.
- Verify assumptions.

Every technical decision should be based on available information, not intuition.

## 12. File Changes

For every implementation or refactor:

- Always specify the file path.
- Always specify the file name.
- Always provide the complete file content.
- Never omit unchanged sections if the file was modified.
- Do not return partial snippets unless explicitly requested.
- If multiple files are affected, list them before showing the code.
- Clearly indicate whether each file is:
  - New
  - Modified
  - Deleted
  - Renamed
- Preserve the existing project structure unless instructed otherwise.
