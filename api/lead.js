export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};
    const lead = {
      name: String(body.name || '').trim(),
      phone: String(body.phone || '').trim(),
      need: String(body.need || '').trim(),
      message: String(body.message || '').trim(),
      source: String(body.source || 'hung-ai-global-site').trim(),
      time: new Date().toISOString()
    };

    if (!lead.name || !lead.phone) {
      return res.status(400).json({ ok: false, error: 'Thiếu họ tên hoặc số điện thoại' });
    }

    const text = [
      '🔥 LEAD MỚI - HÙNG AI GLOBAL',
      `Tên: ${lead.name}`,
      `SĐT: ${lead.phone}`,
      `Nhu cầu: ${lead.need || 'Chưa chọn'}`,
      `Ghi chú: ${lead.message || 'Không có'}`,
      `Nguồn: ${lead.source}`,
      `Thời gian: ${lead.time}`
    ].join('\n');

    const results = {};

    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      const tg = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text })
      });
      results.telegram = tg.ok;
    }

    if (process.env.GOOGLE_SHEET_WEBHOOK_URL) {
      const gs = await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      });
      results.googleSheet = gs.ok;
    }

    return res.status(200).json({ ok: true, lead, results });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message || 'Server error' });
  }
}
