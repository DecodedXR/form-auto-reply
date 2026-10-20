# Free Form Auto-Reply for Google Forms

![Free Form Auto-Reply for Google Forms](assets/cover.png)

Send everyone who submits your Google Form a **personalized email of your own**, not Google's plain "copy of your responses". Write the reply as a normal Gmail draft with the respondent's answers dropped in: `Thanks {{Name}}, see you on {{Which session?}}`. One Apps Script file: no add-on, no daily cap beyond Gmail's own, no subscription.

- `{{Question title}}` placeholders in the subject and body
- Formatting, inline images, links and attachments carry over from the draft (send a PDF ticket, a brochure, a receipt)
- **Send Test to Myself** fills the reply in from the latest response and sends it to you
- Each reply is recorded as a note on the respondent's email cell, so you can see it was sent

New to this? Read the [step-by-step guide](https://decodedxr.github.io/form-auto-reply/google-forms-custom-confirmation-email.html).

## One-time setup (5 minutes)

1. Make sure the form has the respondent's email: **Settings → Responses → Collect email addresses**, or a question with "email" in its title.
2. In the form, **Responses → Link to Sheets** to create the response spreadsheet, and open it.
3. **Extensions → Apps Script**, delete the placeholder code, paste in `Code.gs`, save.
4. Reload the spreadsheet. A **📨 Form Auto-Reply** menu appears.
5. In **Gmail**, write the reply as a draft. Use placeholders that match the question titles exactly (the column headers in the response sheet):
   > Subject: `You're registered, {{Name}}`
   >
   > Hi {{Name}}, thanks for signing up for {{Which session?}}.
6. On the **Form Responses** sheet: **📨 Form Auto-Reply → Turn On Auto-Reply** and type the draft's subject. Google asks for permission the first time ("Google hasn't verified this app" → **Advanced → Go to (your project name) → Allow**; it's your own script).

From then on, every new response gets the email within a few seconds.

## Notes

- Keep the draft in Gmail. The script reads it every time, so editing the draft changes future replies.
- Responses submitted before you turned it on aren't emailed.
- If a reply fails (for example, no email address in that response), the email cell gets an "Auto-reply failed: …" note instead.
- Gmail's daily limit is about 100 recipients on a personal account and 1,500 on Google Workspace.
- Use **Turn Off** to stop, or **Turn On** again to switch to a different draft.

## More free Google tools

- [Form Prefill Links](https://github.com/DecodedXR/form-prefill-links): a pre-filled Google Form link for every row.
- [Sheets to Calendar](https://github.com/DecodedXR/sheets-to-calendar): rows become Google Calendar events that stay in sync.
- [Sheets Mail Merge](https://github.com/DecodedXR/sheets-mail-merge): a personalized email to every row, with per-person attachments.
- [Sheets Deadline Reminders](https://github.com/DecodedXR/sheets-deadline-reminders): automatic emails before a due date.
- [Sheets Doc Merge](https://github.com/DecodedXR/sheets-doc-merge): one PDF per row from a Google Docs template.

## License

MIT. See `LICENSE`.
