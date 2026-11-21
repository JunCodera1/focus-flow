# Kế hoạch triển khai — Đồng hồ Pomodoro

**Ngày** 2026-11-21  
**Đặc tả** [spec.md](spec.md)  
**Nhánh Git thực tế** main  
**Mã tính năng do Spec Kit phân giải** 001-pomodoro-session  
**Trạng thái** Dự thảo kỹ thuật. Q1–Q5 trong đặc tả còn mở.

## Summary

Triển khai đồng hồ trong tab Focus có sẵn, gồm tập trung 25 phút, tạm dừng,
 tiếp tục, hoàn thành và bắt đầu nghỉ 5 phút. Đặt lại theo AC4 là đề xuất chờ Q1.
Thực hiện theo sáu user story trong spec, với kiểm thử liên kết trực tiếp tới AC.

Kế hoạch này chuẩn bị phần kiến trúc và thứ tự công việc. Việc chốt thiết kế
vòng đời, khôi phục và báo hết giờ phụ thuộc Q2–Q5. Khi trả lời, cập nhật spec
trước rồi đồng bộ kế hoạch và các đầu việc tương ứng.

## Technical Context

| Nội dung | Cơ sở và lựa chọn |
| --- | --- |
| Ngôn ngữ | TypeScript ~6.0.3, strict mode theo package.json và tsconfig.json |
| Runtime | Expo ~58.0.26, React 19.3.0, React Native 0.88.1 |
| Điều hướng | Expo Router ~58.0.32, tab hiện có app/(tabs)/focus.tsx |
| UI | ThemedText, ThemedView, useTheme, Spacing, Fonts có sẵn |
| Trạng thái | Logic chuyển trạng thái thuần và hook trong src/features/focus |
| Lưu trữ | Bộ nhớ cho phần màn hình đang mở. Lưu bền và khôi phục chờ Q3 |
| Kiểm thử | Jest, jest-expo, React Native Testing Library có sẵn trong manifest |
| Nền tảng | Android và iOS theo app.json |
| Quy mô | Một đồng hồ được điều khiển tại một thời điểm |
| Mục tiêu | Đúng AC1–AC6 và SC1–SC4, số giây hiển thị cập nhật khi thay đổi |
| Phụ thuộc | Luồng trong màn hình dùng gói có sẵn. Gói lưu trữ/thông báo tùy quyết định Q3–Q4 |

## Constitution Check

| Nguyên tắc | Trước nghiên cứu | Sau nghiên cứu |
| --- | --- | --- |
| Mỗi tính năng có tiêu chí QC kiểm tra được | FR1–FR6 có AC tương ứng | Đạt cho luồng đã rõ, AC4 còn dự thảo |
| Hành vi chưa thống nhất được ghi lại | Q1–Q5 đã có trong spec | Đạt về ghi nhận, quyết định vẫn chờ nhóm |
| Điều kiện chốt thiết kế của speckit-plan | Chưa đạt vì còn câu hỏi mở | Chưa đạt, dừng trước khi chốt Phase 1 |

Theo quy tắc của speckit-plan, câu hỏi chưa giải quyết chặn việc chốt thiết kế.
Các tài liệu Phase 1 gồm data-model.md, contracts/ và quickstart.md sẽ được
hoàn thiện sau khi câu trả lời được ghi vào spec. Các lựa chọn dưới đây là cơ sở
kỹ thuật dự kiến cho phần hành vi đang mở màn hình.

## Project Structure

### Documentation (this feature)

- spec.md là nguồn tiêu chí nghiệm thu và quyết định sản phẩm.
- plan.md và research.md ghi hướng kỹ thuật cùng các điểm chưa chốt.
- checklists/qc.md dùng rà soát chất lượng yêu cầu.
- tasks.md phân rã công việc, bao gồm công việc giải quyết điều kiện tiên quyết.
- data-model.md, contracts/pomodoro-ui.md và quickstart.md là đầu ra thiết kế
  cần hoàn tất sau khi chốt Q1–Q5.

### Source Code (repository root)

| Đường dẫn dự kiến | Trách nhiệm |
| --- | --- |
| app/(tabs)/focus.tsx | Route mỏng nhập màn hình qua public entry point |
| src/features/focus/index.ts | Export màn hình Focus |
| src/features/focus/types/pomodoro.ts | Kiểu phiên và trạng thái |
| src/features/focus/services/pomodoro.ts | Chuyển trạng thái, thời gian còn lại, định dạng MM:SS |
| src/features/focus/hooks/use-pomodoro.ts | Vòng đời cập nhật và nối thao tác với logic |
| src/features/focus/components/pomodoro-screen.tsx | Nhãn loại phiên, trạng thái, thời gian và các thao tác |
| Các file *.test.ts(x) cạnh từng file | Kiểm thử logic, hook và hành vi màn hình |

**Structure Decision** Tái sử dụng tab Focus và design tokens hiện có. Tập trung
logic trong feature Focus, giữ route mỏng theo CONTRIBUTING.md. Cách giữ trạng
thái khi điều hướng, unmount hoặc đóng ứng dụng cần được xác định cùng Q3.

## Hướng thiết kế dự kiến

1. Phiên có loại focus hoặc break, trạng thái ready, running, paused hoặc completed.
   Khi running dùng mốc kết thúc, khi paused giữ mili giây còn lại. Mô hình chính thức
   cần ghi rõ bất biến của từng trạng thái trong data-model.md.
2. Thời gian còn lại tính từ mốc kết thúc và thời điểm hiện tại. Callback định kỳ
   yêu cầu cập nhật màn hình. Logic nhận thời gian qua tham số để kiểm thử có thể
   điều khiển được đồng hồ. Giữ phần mili giây khi tạm dừng để tránh mất thời gian
   sau nhiều lần tạm dừng và tiếp tục.
3. Hiển thị số giây làm tròn lên và chặn tại 0. Khi hết giờ, hoàn thành đúng loại
   phiên. Phiên nghỉ bắt đầu bằng thao tác người dùng theo AC6.1.
4. Hook chỉ giữ một lịch cập nhật, dọn khi dừng hoặc unmount. Render giới hạn ở
   màn hình Focus và cập nhật khi số giây hoặc trạng thái thay đổi.
5. UI dùng StyleSheet, màu và spacing có sẵn, safe area, nhãn thao tác tiếng Việt
   và thuộc tính hỗ trợ trình đọc màn hình. Các yêu cầu nghiệm thu accessibility
   cần được bổ sung vào spec khi nhóm chốt.

## Trình tự triển khai

| Bước | Kết quả | Phụ thuộc |
| --- | --- | --- |
| 0 | Chốt Q1–Q5 thành tiêu chí Given–When–Then | Nhóm trả lời và cập nhật spec |
| 1 | Chốt data model, hợp đồng UI và hướng dẫn nghiệm thu | Bước 0, cập nhật research |
| 2 | Chuẩn bị môi trường, kiểu trạng thái, hàm thời gian và bộ kiểm thử | Bước 1 |
| 3 | US1 bắt đầu, US2 tạm dừng, US3 tiếp tục | Bước 2 |
| 4 | US4 đặt lại và US5 hoàn thành | US1, Q1 và Q5 đã chốt |
| 5 | US6 phiên nghỉ | US5, Q2 đã chốt |
| 6 | Vòng đời ứng dụng, khôi phục và báo hết giờ theo câu trả lời | Q3–Q4 đã chốt |
| 7 | Kiểm tra QC xuyên suốt trên Android và iOS | Tất cả bước trước |

## Chiến lược kiểm thử

- Logic thuần dùng thời gian giả, bao phủ 25 phút, 5 phút, giữ thời gian tạm dừng,
  tiếp tục và hoàn thành tại 0. Kiểm tra callback bị trễ để phát hiện sai lệch do đếm số callback.
- Hook dùng fake timers và renderHook, kiểm tra cleanup và tránh nhiều lịch cập nhật.
- UI kiểm tra kết quả thấy được và thao tác khả dụng theo từng AC.
- SC2 kiểm tra tổng 27 phút với 2 phút tạm dừng. SC3 kiểm tra nghỉ đủ 5 phút.
- Q1–Q5 cần AC chính thức trước khi viết kỳ vọng cho các trường hợp liên quan.
- Chạy npm run lint, npm run typecheck, npm run format:check và npm test.
  Dùng npm start để QC chạy luồng thực tế trên cả hai nền tảng sau triển khai.

## Kết quả xác minh hiện tại

Repo chưa có node_modules, các kiểm tra trước đó dừng vì thiếu executable.
Kế hoạch dựa trên manifest và mã nguồn hiện có. Chạy cài đặt phụ thuộc bằng npm ci
ở bước chuẩn bị, ghi lại lỗi nếu có và kiểm tra lại bộ công cụ trước triển khai.
