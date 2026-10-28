---
title: "A free alternative to Email Notifications for Google Forms (respondent replies)"
description: Send every Google Form respondent your own personalized email with their answers filled in, beyond the 20-a-day free limit, with no add-on. An honest comparison with Email Notifications for Google Forms.
image: https://decodedxr.github.io/form-auto-reply/assets/cover.png
---
{% raw %}

# A free alternative to Email Notifications for Google Forms (respondent replies)

[Email Notifications for Google Forms](https://digitalinspiration.com/docs/form-notifications) by Digital Inspiration is a popular add-on for emailing people when a form is submitted. According to [its edition comparison](https://digitalinspiration.com/docs/form-notifications/google-forms-premium) (checked October 2026), the free edition sends **20 emails a day** with a single notification. CC/BCC, conditional rules and Drive attachments need a paid edition.

If the email you need is "thank each respondent with their own answers filled in", a free script can send it with no 20-a-day limit.

## Side by side

| | Email Notifications (free edition) | Free Form Auto-Reply |
|---|---|---|
| Emails per day | 20 | Gmail's own script limit: about 100 on personal Gmail, 1,500 on Workspace |
| Email the respondent | Yes | Yes |
| Their answers in the email | Yes | Yes: `{{Question title}}` placeholders in the subject and body |
| Write the email in Gmail, with formatting and images | — | Yes, as a normal Gmail draft |
| Attach a file | Drive attachments in paid editions | Attach it to the draft (the same file to everyone) |
| Notify the form owner or a team | Yes | No: this only replies to respondents |
| Conditional rules | Paid editions | No |
| How it's installed | Workspace add-on | One script in the response spreadsheet; it only asks for access to that spreadsheet |

## When the add-on is the better buy

- You also want **notifications to yourself or your team** on each submission, or emails that **depend on the answers** (conditional rules).
- You'd rather click through a sidebar than paste a script.

## Set up the free auto-reply (5 minutes)

1. Make sure the form collects email addresses, and link it to a response spreadsheet.
2. In the spreadsheet: **Extensions → Apps Script**, paste in [this `Code.gs`](https://github.com/DecodedXR/form-auto-reply/blob/main/Code.gs), and save.
3. Write the reply as a Gmail draft, for example `Hi {{Name}}, you're booked for {{Which session?}}.`
4. **📨 Form Auto-Reply → Turn On Auto-Reply** and type the draft's subject.

Every new response then gets the email within seconds. The full walkthrough is in the [step-by-step guide](google-forms-custom-confirmation-email.html).

Want a personal email to a whole list instead of form respondents? [Sheets Mail Merge](https://decodedxr.github.io/sheets-mail-merge/) is free, and [Mail Merge Pro](https://decodedpc.gumroad.com/l/tcfsse) adds scheduling and follow-ups.

---

[Get the script on GitHub](https://github.com/DecodedXR/form-auto-reply) · [Step-by-step guide](google-forms-custom-confirmation-email.html) · [More free Google Sheets scripts](https://decodedxr.github.io/free-google-sheets-scripts/)
{% endraw %}
