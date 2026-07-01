# Cấu hình Telegram + Google Sheet cho HÙNG AI GLOBAL

## Mục tiêu
Khi khách điền form tại:

`https://hung-ai-global-site.vercel.app/funnel/lead-form`

hệ thống sẽ:
1. Gửi thông báo lead mới về Telegram.
2. Ghi lead vào Google Sheet.

---

## A. Telegram

### Cần có
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

### Cách lấy bot token
1. Mở Telegram, tìm `@BotFather`.
2. Gửi `/newbot`.
3. Đặt tên bot, ví dụ: `Hung AI Global Lead Bot`.
4. Đặt username kết thúc bằng `bot`, ví dụ: `hung_ai_global_lead_bot`.
5. BotFather trả về token dạng `123456:ABC...`.

### Cách lấy chat id
Cách đơn giản:
1. Nhắn `/start` cho bot vừa tạo.
2. Mở link:
   `https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/getUpdates`
3. Tìm đoạn `chat":{"id":...}`.
4. Số đó là `TELEGRAM_CHAT_ID`.

---

## B. Google Sheet

### Tạo Sheet
1. Vào Google Sheets.
2. Tạo file mới tên: `HUNG AI GLOBAL - Leads`.
3. Tạo sheet/tab tên: `Leads`.
4. Hàng đầu tiên có thể để trống, script sẽ tự tạo header.

### Tạo Apps Script webhook
1. Trong Google Sheet: `Extensions` → `Apps Script`.
2. Dán nội dung file:
   `integrations/google-sheet-apps-script.js`
3. Bấm Save.
4. Bấm `Deploy` → `New deployment`.
5. Type chọn `Web app`.
6. Execute as: `Me`.
7. Who has access: `Anyone` hoặc `Anyone with the link`.
8. Bấm Deploy.
9. Copy Web App URL.

URL đó là:
`GOOGLE_SHEET_WEBHOOK_URL`

---

## C. Thêm biến môi trường trên Vercel

Vào Vercel project `hung-ai-global-site`:

`Settings` → `Environment Variables`

Thêm 3 biến:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `GOOGLE_SHEET_WEBHOOK_URL`

Sau khi thêm xong, vào `Deployments` → redeploy bản mới nhất.

---

## D. Test

1. Mở form:
   `https://hung-ai-global-site.vercel.app/funnel/lead-form`
2. Điền thử lead.
3. Kiểm tra Telegram có tin nhắn mới.
4. Kiểm tra Google Sheet có dòng mới.

