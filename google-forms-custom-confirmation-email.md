---
title: How to send a custom confirmation email from Google Forms (free)
description: Email every Google Form respondent your own personalized message with their answers, instead of Google's plain response copy. Free Apps Script, no add-on.
---

# How to send a custom confirmation email from Google Forms (free)

Google Forms can email respondents a copy of their answers, but you can't change that email. The subject is the form title, the body is a plain list of answers, and you can't add a message, a logo or an attachment. To send your **own** confirmation ("You're registered, Ana. Here's your ticket."), you need a small script. This guide sets one up for free in about 5 minutes, with no add-on.

It uses [Form Auto-Reply](https://github.com/DecodedXR/form-auto-reply), a free, MIT-licensed Apps Script.

## What you need

- A Google Form that collects the respondent's email address
- Its response spreadsheet
- Your reply, written as a Gmail draft

## Step 1: Collect email addresses

In the form editor, open **Settings → Responses** and turn on **Collect email addresses**. Alternatively, add a short-answer question with "email" in its title, such as "Your email". The script uses the first column whose title contains "email".

## Step 2: Link the form to a spreadsheet

In the form, open the **Responses** tab and click **Link to Sheets**. Open the spreadsheet. Each question is a column, titled with the question's text.

## Step 3: Add the script

1. In the spreadsheet, open **Extensions → Apps Script**.
2. Delete the placeholder code.
3. Paste in the contents of [`Code.gs`](https://github.com/DecodedXR/form-auto-reply/blob/main/Code.gs) and click **Save**.
4. Reload the spreadsheet. A **📨 Form Auto-Reply** menu appears.

## Step 4: Write your reply as a Gmail draft

Compose a new email in Gmail and leave it in **Drafts**. Wherever you want an answer from the form, put the question's title in double braces, exactly as it appears in the spreadsheet's header row:

> **Subject:** `You're registered, {{Name}}`
>
> Hi {{Name}},
>
> Thanks for signing up for **{{Which session?}}**. Your ticket is attached.

Bold text, links, your logo and attachments all carry over to every reply. Multi-line answers keep their line breaks.

## Step 5: Turn it on

Go to the **Form Responses** sheet and choose **📨 Form Auto-Reply → Turn On Auto-Reply**. Type the draft's subject line. The first time, Google asks for permission. Because it's your own script, it shows "Google hasn't verified this app": click **Advanced → Go to (your project name) → Allow**.

Now submit the form once yourself, then choose **📨 Form Auto-Reply → Send Test to Myself** to check the result in your inbox.

From now on, every respondent gets your email a few seconds after they submit. A note on their email cell records when it was sent.

## FAQ

**Is it free?** Yes. It's MIT licensed and runs on your own Google account. Gmail allows scripts about 100 recipients a day on a personal account and 1,500 on Google Workspace ([Google's quotas](https://developers.google.com/apps-script/guides/services/quotas)).

**Should I turn off Google's own response receipts?** If you don't want respondents to get two emails, yes: in **Settings → Responses**, set **Send responders a copy of their response** to Off.

**Can I attach a file?** Yes. Attach it to the Gmail draft, and every reply includes it.

**Can the reply depend on an answer?** Not in this script; everyone gets the same draft with their answers filled in. For "different email per choice", use two forms or edit the script.

**Does it email people who responded before I set it up?** No, only new responses. To email earlier respondents, use [Sheets Mail Merge](https://decodedxr.github.io/sheets-mail-merge/free-mail-merge-google-sheets.html) on the response sheet.

**How do I stop it?** **📨 Form Auto-Reply → Turn Off**.

---

[Get the script on GitHub](https://github.com/DecodedXR/form-auto-reply) · Also free: [Mail Merge for Google Sheets](https://decodedxr.github.io/sheets-mail-merge/free-mail-merge-google-sheets.html) · [Doc Merge: PDFs from Google Sheets](https://decodedxr.github.io/sheets-doc-merge/generate-pdfs-certificates-from-google-sheets.html)
