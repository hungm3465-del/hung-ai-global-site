// Google Apps Script Web App for HÙNG AI GLOBAL leads
// 1) Create Google Sheet with headers: Time, Name, Phone, Need, Message, Source
// 2) Extensions → Apps Script → paste this file
// 3) Set SHEET_NAME if needed
// 4) Deploy → New deployment → Web app → Anyone with the link
// 5) Copy Web App URL to Vercel env: GOOGLE_SHEET_WEBHOOK_URL

const SHEET_NAME = 'Leads';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Time', 'Name', 'Phone', 'Need', 'Message', 'Source']);
    }

    sheet.appendRow([
      data.time || new Date().toISOString(),
      data.name || '',
      data.phone || '',
      data.need || '',
      data.message || '',
      data.source || 'HÙNG AI GLOBAL'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
