# Northstar Customer Support Portal

A customer support page with contact information, an FAQ, and a form
that saves support requests in the current browser.

## Technologies and prerequisites
HTML, CSS, and JavaScript. Use a modern browser with JavaScript and
local storage enabled. No packages, account, or API keys are required.

## Installation and configuration
Download and extract the project ZIP, or clone the repository:
https://github.com/Zfrozan/support-portal
Keep all project files together. No configuration is required.

## Run
Open index.html in Microsoft Edge.
On macOS, from the project folder, run:
open index.html

## Try the features
1. Enter a name, a valid email, and an issue.
2. Click Save request. The request appears under Saved requests.
3. Refresh the page in the same browser to check persistence.
4. Submit an empty form to check required fields.
5. Enter test as the email to check email validation.

## Files
- index.html: page and form
- styles.css: appearance
- support.js: validation, browser storage, and saved request display
- support-checklist.md: support checklist
- .gitignore: files excluded from Git

## Limitations
Requests stay in the same browser and are not emailed to support.
There is no backend, account system, editing, or deletion feature.
Repeated submissions create separate entries.
Clearing browser data removes saved requests.
Storage behavior for local files may vary between browsers.
The contact email is a placeholder.
