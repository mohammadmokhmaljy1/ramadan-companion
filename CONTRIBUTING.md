# Contributing Guide

This document explains the Git workflow and contribution rules for the Ramadan Companion project.

## 1. Branch Naming

Every task should have its own branch. Use the following naming format:

`type/short-name`

Examples:
- `feature/home-page`
- `fix/login-error`
- `docs/contributing`

## 2. Commit Message Format

Use this format for all commit messages:

`type(scope): summary`

Examples:
- `feat(auth): add login form`
- `fix(home): fix header alignment`
- `docs(readme): update project documentation`

## 3. Commit Types

Use one of the following types:

- `feat`: Add a new feature.
- `fix`: Fix a bug or error.
- `docs`: Add or update documentation.
- `style`: Make formatting or styling changes without changing functionality.
- `refactor`: Improve code structure without changing behavior.
- `test`: Add or update tests.
- `chore`: Perform maintenance or configuration tasks.

## 4. Contribution Rules

**One task = one branch = one PR.**

Each task must have its own branch and Pull Request. Do not work on multiple unrelated tasks in the same branch.

## 5. Git Workflow

Follow these steps for every task:

1. Update the local `main` branch to get the latest changes.
2. Create a new branch from `main` using the `type/short-name` naming format.
3. Make the required changes for your task.
4. Review your changes and test your work.
5. Stage the modified files.
6. Commit your changes using the required commit message format.
7. Push your branch to GitHub.
8. Open a Pull Request into `main` and request a review.
9. After approval, merge the Pull Request and sync your local `main` branch.

Following this workflow helps keep the project organized and makes collaboration easier.