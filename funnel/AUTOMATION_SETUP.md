# Cấu hình tự động nhận khách - HÙNG AI GLOBAL

Đã có endpoint Vercel Serverless:

`POST /api/lead`

Form `funnel/lead-form.html` sẽ tự gửi dữ liệu về endpoint này.

## Biến môi trường cần thêm trên Vercel

Vào Vercel project → Settings → Environment Variables, thêm:

### Telegram thông báo lead mới
- `TELEGRAM_BOT_TOKEN` = token bot Telegram
- `TELEGRAM_CHAT_ID` = chat id nhận thông báo

### Google Sheet webhook, nếu dùng
- `GOOGLE_SHEET_WEBHOOK_URL` = URL Google Apps Script Web App

Có thể dùng Telegram trước, Google Sheet thêm sau.

## Dữ liệu form gửi lên

```json
{
  "name": "Tên khách",
  "phone": "Số điện thoại",
  "need": "Nhu cầu",
  "message": "Ghi chú",
  "source": "HÙNG AI GLOBAL landing page"
}
```

## Sau khi thêm biến môi trường

1. Deploy lại Vercel
2. Vào `/funnel/lead-form.html`
3. Điền thử form
4. Kiểm tra Telegram/Google Sheet nhận lead
