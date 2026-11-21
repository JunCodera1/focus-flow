# Nghiên cứu kỹ thuật — Pomodoro

**Ngày** 2026-11-21  
**Trạng thái** Có hướng kỹ thuật cho luồng trong màn hình. Q1–Q5 còn chờ quyết định sản phẩm.

## Quyết định kỹ thuật dự kiến

| Chủ đề | Lựa chọn | Cơ sở | Phương án đã cân nhắc |
| --- | --- | --- | --- |
| Tích hợp | Dùng tab app/(tabs)/focus.tsx, feature src/features/focus | Route và ranh giới ownership đã có | Tạo route riêng sẽ tăng công việc điều hướng |
| Logic | Hàm thuần chuyển trạng thái, hook nối với UI | Cho phép kiểm thử từng AC với đồng hồ kiểm soát được | Đặt toàn bộ logic trong route khó kiểm tra riêng |
| Thời gian | Mốc kết thúc và thời gian hiện tại | Callback chạy trễ vẫn tính được thời gian đã qua | Trừ một giây mỗi callback dễ tích lũy sai lệch |
| Độ chính xác | Giữ mili giây khi pause, làm tròn lên lúc hiển thị | Bảo toàn thời gian khi pause nhiều lần | Lưu số giây đã làm tròn có thể cộng thêm thời gian |
| UI | Tái dùng ThemedText, ThemedView, useTheme và Spacing | Đã hỗ trợ theme trong repo | Thêm bộ UI khác cần đánh giá thêm phụ thuộc |
| Kiểm thử | Jest và RNTL hiện có trong package.json | Phù hợp CONTRIBUTING.md | Chạy thời gian thực cho mọi unit test quá chậm |

Nghiên cứu mã nguồn được đối chiếu độc lập, cùng kết luận về route, ranh giới feature,
logic deadline và việc cần chốt các quyết định sản phẩm trước thiết kế vòng đời.

## Các quyết định còn thiếu và ảnh hưởng

| Câu hỏi trong spec | Ảnh hưởng cần xử lý |
| --- | --- |
| Q1 | Hành vi reset, yêu cầu xác nhận và kiểm thử AC4 |
| Q2 | Các action hợp lệ trong phiên nghỉ, trạng thái sau nghỉ |
| Q3 | Tiếp tục hay pause khi rời màn hình, chủ sở hữu state, lưu và khôi phục |
| Q4 | Dấu hiệu hoàn thành ngoài màn hình, quyền thông báo và fallback |
| Q5 | Quy tắc thao tác trùng, thứ tự xử lý khi vừa hết giờ |

Các câu hỏi này cần câu trả lời của nhóm. Tài liệu API cung cấp cơ chế triển khai,
quyết định hành vi sản phẩm cần được ghi vào spec trước khi chốt thiết kế.

## Tài liệu đã đối chiếu

package.json khai báo Expo 58 và React Native 0.88.1. Đã đọc tham chiếu đúng SDK,
chỉ mục tài liệu Expo và trang Expo Router tương ứng. Router dùng định tuyến theo file.

- [Expo SDK 58](https://docs.expo.dev/versions/v58.0.0/)
- [Chỉ mục Expo](https://docs.expo.dev/llms.txt)
- [Expo Router SDK 58](https://docs.expo.dev/versions/v58.0.0/sdk/router.md)

React Native có setInterval/clearInterval. AppState cung cấp trạng thái foreground
và background. Cách xử lý các trạng thái đó trong sản phẩm phụ thuộc Q3.

- [React Native Timers](https://reactnative.dev/docs/timers)
- [React Native AppState](https://reactnative.dev/docs/appstate)
