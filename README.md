# Chill — Trang tỏ tình đơn giản để deploy lên Netlify 💖

Trang web nhỏ xinh để tỏ tình với nút Đồng ý/Không. Nút "Không" sẽ tinh nghịch chạy trốn, còn nhấn "Đồng ý" sẽ bung confetti và hiện thông báo siêu ngọt ngào.

## Thư mục dự án

- `index.html` — Trang chính
- `style.css` — Giao diện, hiệu ứng
- `script.js` — Logic nút Đồng ý/Không, confetti, modal
- `netlify.toml` — Cấu hình cache khi deploy Netlify

## Tùy chỉnh nhanh

- Đổi tiêu đề/câu chữ: sửa trong `index.html`
	- Thay phần tiêu đề trong thẻ `<h1>`
	- Thay nội dung modal (dòng "Yay! Tụi mình yêu nhau rồi nhé! 💞")
- Màu sắc/kiểu chữ: sửa biến màu ở đầu file `style.css`

## Chạy thử cục bộ

Bạn có thể mở trực tiếp `index.html` bằng trình duyệt, hoặc chạy server tĩnh (tùy chọn):

```
cmd
python -m http.server 5500
```

Sau đó mở http://localhost:5500

## Deploy lên Netlify

Bạn có 3 cách.

### Cách 1: Kéo thả (nhanh nhất)
1. Vào https://app.netlify.com và đăng nhập
2. Chọn Add new site > Deploy manually
3. Kéo cả thư mục dự án (chứa `index.html`) vào ô kéo-thả để upload

### Cách 2: Kết nối GitHub repo
1. Push code lên GitHub (repo này đã có sẵn)
2. Trên Netlify: Add new site > Import an existing project > GitHub > chọn repo `Chill`
3. Build command: để trống; Publish directory: `.`
4. Nhấn Deploy site

### Cách 3: Netlify CLI (Windows cmd)
1. Cài Netlify CLI (chỉ cần lần đầu):
```
cmd
npm install -g netlify-cli
```
2. Đăng nhập:
```
cmd
netlify login
```
3. Deploy (preview):
```
cmd
netlify deploy --dir=.
```
4. Deploy bản chính (production):
```
cmd
netlify deploy --prod --dir=.
```

## Tùy chọn domain

- Trên Netlify, vào Site settings > Domain management để đổi tên miền cho xịn xò.

## Ghi chú

- Dự án là tĩnh (static), không cần build. Chỉ cần `index.html`, `style.css`, `script.js` là chạy.
- `netlify.toml` giúp bật cache dài cho CSS/JS, có thể bỏ nếu không cần.

Chúc tỏ tình thành công! 💘