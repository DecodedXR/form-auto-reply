/**
 * Form Auto-Reply: send every Google Form respondent a personalized email of your own,
 * written as a Gmail draft with {{Question Title}} placeholders.
 *
 * Setup: open the form's linked response spreadsheet (Responses → Link to Sheets),
 * paste this into Extensions → Apps Script, reload, then 📨 Form Auto-Reply → Turn On.
 * The respondent's address comes from the first column whose header contains "email".
 * Each reply is recorded as a note on that row's email cell.
 */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('📨 Form Auto-Reply')
    .addItem('Turn On Auto-Reply', 'turnOn')
    .addItem('Send Test to Myself', 'sendTest')
    .addItem('Turn Off', 'turnOff')
    .addToUi();
}

function turnOn() {
  const ui = SpreadsheetApp.getUi();
  const sheet = SpreadsheetApp.getActiveSheet();
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getDisplayValues()[0];
  if (findEmailCol_(headers) === -1) {
    ui.alert('No email column found on this sheet. Open the "Form Responses" sheet, and make sure the form collects email addresses or has a question with "email" in its title.');
    return;
  }
  const draft = pickDraft_(ui);
  if (!draft) return;
  const props = PropertiesService.getDocumentProperties();
  props.setProperty('draftSubject', draft.getMessage().getSubject());
  props.setProperty('sheetName', sheet.getName());
  deleteTriggers_();
  ScriptApp.newTrigger('sendAutoReply').forSpreadsheet(SpreadsheetApp.getActive()).onFormSubmit().create();
  ui.alert('Auto-reply is on. Every new response on "' + sheet.getName() + '" gets your draft "' +
    draft.getMessage().getSubject() + '". Keep that draft in Gmail.');
}

function turnOff() {
  deleteTriggers_();
  SpreadsheetApp.getUi().alert('Auto-reply is off.');
}

/** Sends the reply for the latest response to your own inbox, so you can check it. */
function sendTest() {
  const ui = SpreadsheetApp.getUi();
  const props = PropertiesService.getDocumentProperties();
  const sheet = SpreadsheetApp.getActive().getSheetByName(props.getProperty('sheetName') || '');
  if (!sheet || !props.getProperty('draftSubject')) {
    ui.alert('Use "Turn On Auto-Reply" first.');
    return;
  }
  if (sheet.getLastRow() < 2) {
    ui.alert('No responses yet. Submit the form once, then try again.');
    return;
  }
  try {
    reply_(sheet, sheet.getLastRow(), Session.getActiveUser().getEmail());
    ui.alert('Test sent to your inbox, filled in from the latest response (row ' + sheet.getLastRow() + ').');
  } catch (e) {
    ui.alert('Test failed: ' + e.message);
  }
}

/** Runs from the form-submit trigger. */
function sendAutoReply(e) {
  const sheet = e.range.getSheet();
  if (sheet.getName() !== PropertiesService.getDocumentProperties().getProperty('sheetName')) return;
  reply_(sheet, e.range.getRow());
}

function reply_(sheet, row, testTo) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getDisplayValues()[0];
  const values = sheet.getRange(row, 1, 1, headers.length).getDisplayValues()[0];
  const emailIdx = findEmailCol_(headers);
  const cell = sheet.getRange(row, emailIdx + 1);
  const to = String(values[emailIdx] || '').trim();
  try {
    if (!testTo && !to) throw new Error('no email address in this response');
    const subject = PropertiesService.getDocumentProperties().getProperty('draftSubject');
    const draft = GmailApp.getDrafts().find(d => d.getMessage().getSubject() === subject);
    if (!draft) throw new Error('Gmail draft "' + subject + '" not found');
    const msg = draft.getMessage();
    GmailApp.sendEmail(testTo || to, fill_(msg.getSubject(), headers, values), '', {
      htmlBody: fill_(msg.getBody(), headers, values, true),
      attachments: msg.getAttachments({ includeInlineImages: false }),
      inlineImages: inlineImageMap_(msg),
    });
    if (!testTo) cell.setNote('Auto-reply sent ' + new Date().toLocaleString());
  } catch (err) {
    if (testTo) throw err;
    cell.setNote('Auto-reply failed: ' + err.message);
  }
}

/** First column whose header mentions "email" (Forms' own "Email Address" column or a question). */
function findEmailCol_(headers) {
  return headers.findIndex(h => /e-?mail/i.test(h));
}

/** Fill {{Column}} placeholders from a row; unknown columns become empty. */
function fill_(s, headers, row, escape) {
  return s.replace(/{{\s*([^}]+?)\s*}}/g, (_, name) => {
    const i = headers.findIndex(h => h.trim() === name.trim());
    const v = i === -1 ? '' : String(row[i]);
    return escape ? escapeHtml_(v).replace(/\n/g, '<br>') : v;
  });
}

function deleteTriggers_() {
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'sendAutoReply')
    .forEach(t => ScriptApp.deleteTrigger(t));
}

/** Let the user pick which Gmail draft is the reply, by subject line. */
function pickDraft_(ui) {
  const drafts = GmailApp.getDrafts();
  if (!drafts.length) {
    ui.alert('No Gmail drafts found. Write your reply as a draft in Gmail first.');
    return null;
  }
  const resp = ui.prompt('Form Auto-Reply',
    'Type the subject line of the Gmail draft to send to each respondent:\n\n' +
    drafts.slice(0, 15).map(d => '• ' + d.getMessage().getSubject()).join('\n'),
    ui.ButtonSet.OK_CANCEL);
  if (resp.getSelectedButton() !== ui.Button.OK) return null;
  const wanted = resp.getResponseText().trim().toLowerCase();
  const match = drafts.find(d => d.getMessage().getSubject().trim().toLowerCase() === wanted);
  if (!match) ui.alert('No draft with that subject found.');
  return match;
}

/** Re-attach inline images so they render instead of showing as broken.
 *  Gmail tags each inline <img> with its cid and file name (alt); match by name. */
function inlineImageMap_(msg) {
  const imgs = msg.getAttachments({ includeInlineImages: true, includeAttachments: false });
  const map = {};
  for (const m of msg.getBody().matchAll(/<img[^>]*?src="cid:([^"]+)"[^>]*?alt="([^"]*)"[^>]*>/g)) {
    const img = imgs.find(a => a.getName() === m[2]);
    if (img) map[m[1]] = img;
  }
  return map;
}

function escapeHtml_(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
