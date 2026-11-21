# Đầu việc — Đồng hồ Pomodoro

**Đầu vào** [spec.md](spec.md), [plan.md](plan.md), [research.md](research.md).  
**Trạng thái** Danh sách dự thảo, công việc triển khai phụ thuộc việc chốt thiết kế tại T001–T003.  
**Kiểm thử** Có theo yêu cầu người dùng, gắn mã AC trong từng đầu việc.

Mọi đường dẫn dưới đây tương đối với gốc repo. [P] chỉ các công việc ở các file
khác nhau có thể làm đồng thời sau khi hoàn tất phụ thuộc đã nêu.

## Phase 1 — Chuẩn bị

- [ ] T001 Chốt câu trả lời Q1–Q5 với nhóm, ghi quyết định và AC Given–When–Then vào specs/001-pomodoro-session/spec.md; ghi rõ các hành vi chuyển tab, làm tròn/sai số và khả năng tiếp cận cần bổ sung từ checklists/qc.md.
- [ ] T002 Cập nhật lựa chọn kỹ thuật sau T001 trong specs/001-pomodoro-session/research.md và specs/001-pomodoro-session/plan.md, gồm vòng đời, chủ sở hữu state, lưu trữ và báo hết giờ.
- [ ] T003 Hoàn tất specs/001-pomodoro-session/data-model.md, specs/001-pomodoro-session/contracts/pomodoro-ui.md và specs/001-pomodoro-session/quickstart.md theo các quyết định T001–T002; bổ sung trích dẫn Entity.field chính thức vào tasks.md khi data model được tạo.
- [ ] T004 Chuẩn bị môi trường bằng npm ci theo package-lock.json, chạy bốn kiểm tra nền theo package.json; ghi kết quả và lỗi cài đặt nếu có trong specs/001-pomodoro-session/quickstart.md.

## Phase 2 — Nền tảng dùng chung

Điều kiện bắt đầu là T001–T004 hoàn tất. Các công việc Q3–Q4 được xác định đầy đủ ở T030–T033 sau khi nhóm quyết định.

- [ ] T005 Định nghĩa kiểu phiên, trạng thái và action trong src/features/focus/types/pomodoro.ts theo data model đã chốt tại T003; thể hiện trạng thái ready/running/paused/completed và loại focus/break.
- [ ] T006 Viết kiểm thử thời gian còn lại và định dạng MM:SS, gồm callback trễ, phần lẻ mili giây và chặn tại 0, trong src/features/focus/services/pomodoro.test.ts theo AC1.2, AC3.2, AC6.2 và quy tắc đo đã chốt T001.
- [ ] T007 Tạo hàm thời gian, định dạng và nền chuyển trạng thái nhận thời điểm qua tham số trong src/features/focus/services/pomodoro.ts theo T005–T006.

## Phase 3 — US1 bắt đầu phiên (P1)

Mục tiêu là người dùng bắt đầu 25 phút và thấy đồng hồ giảm. Kiểm tra độc lập từ trạng thái sẵn sàng 25:00.

- [ ] T008 [US1] Viết kiểm thử bắt đầu và sau 10 giây còn 24:50 trong src/features/focus/services/pomodoro.test.ts theo AC1.1–AC1.2.
- [ ] T009 [US1] Bổ sung action bắt đầu từ ready sang running trong src/features/focus/services/pomodoro.ts theo AC1.1–AC1.2.
- [ ] T010 [US1] Viết kiểm thử vòng cập nhật duy nhất và cleanup trong src/features/focus/hooks/use-pomodoro.test.ts theo AC1.2 và hướng kỹ thuật của plan.md.
- [ ] T011 [US1] Tạo hook điều khiển state và lịch cập nhật trong src/features/focus/hooks/use-pomodoro.ts theo T010 và chủ sở hữu state đã chốt tại T002.
- [ ] T012 [US1] Viết kiểm thử nhãn phiên, 25:00, trạng thái và thao tác Bắt đầu/Tạm dừng trong src/features/focus/components/pomodoro-screen.test.tsx theo AC1.1.
- [ ] T013 [US1] Tạo màn hình trong src/features/focus/components/pomodoro-screen.tsx, export qua src/features/focus/index.ts và tích hợp app/(tabs)/focus.tsx theo AC1.1; dùng theme và spacing có sẵn.

## Phase 4 — US2 tạm dừng (P1)

Kiểm tra độc lập từ running còn 18:30, tạm dừng rồi chờ 60 giây vẫn 18:30.

- [ ] T014 [US2] Viết kiểm thử pause, giữ thời gian còn lại và trường hợp 00:01 trong src/features/focus/services/pomodoro.test.ts theo AC2.1–AC2.2, AC-E1.
- [ ] T015 [US2] Bổ sung pause lưu mili giây còn lại trong src/features/focus/services/pomodoro.ts và dừng lịch cập nhật trong src/features/focus/hooks/use-pomodoro.ts theo AC2.1–AC2.2.
- [ ] T016 [US2] Bổ sung kiểm thử UI trong src/features/focus/components/pomodoro-screen.test.tsx rồi hiển thị Đã tạm dừng và Tiếp tục trong src/features/focus/components/pomodoro-screen.tsx theo AC2.1–AC2.2.

## Phase 5 — US3 tiếp tục (P1)

Kiểm tra độc lập từ paused còn 18:30, tiếp tục 10 giây còn 18:20.

- [ ] T017 [US3] Viết kiểm thử resume và chuỗi pause/resume trong src/features/focus/services/pomodoro.test.ts theo AC3.1–AC3.2; phần chuyển hoàn thành AC-E2 được hoàn tất tại US5.
- [ ] T018 [US3] Bổ sung resume tính lại mốc kết thúc trong src/features/focus/services/pomodoro.ts và nối hook src/features/focus/hooks/use-pomodoro.ts theo AC3.1–AC3.2.
- [ ] T019 [US3] Bổ sung kiểm thử UI trong src/features/focus/components/pomodoro-screen.test.tsx rồi nối Tiếp tục và trạng thái Đang chạy trong src/features/focus/components/pomodoro-screen.tsx theo AC3.1–AC3.2.

## Phase 6 — US4 đặt lại (P1)

Phụ thuộc Q1 đã chốt trong T001. Kiểm tra độc lập với các trạng thái trong AC4.1–AC4.5 đã được nhóm xác nhận.

- [ ] T020 [US4] Viết kiểm thử reset tại src/features/focus/services/pomodoro.test.ts theo AC4.1–AC4.5 và SC4 sau cập nhật Q1.
- [ ] T021 [US4] Bổ sung reset trong src/features/focus/services/pomodoro.ts và xử lý lịch cập nhật trong src/features/focus/hooks/use-pomodoro.ts theo kết quả Q1.
- [ ] T022 [US4] Bổ sung kiểm thử UI trong src/features/focus/components/pomodoro-screen.test.tsx rồi nối Đặt lại và bước xác nhận nếu Q1 yêu cầu trong src/features/focus/components/pomodoro-screen.tsx theo AC4.1–AC4.5.

## Phase 7 — US5 kết thúc tập trung (P1)

Kiểm tra độc lập từ running còn 00:01. Phiên hoàn thành tại 00:00 và có Bắt đầu nghỉ 5 phút.

- [ ] T023 [US5] Viết kiểm thử hoàn thành, chờ sau hết giờ, resume qua giây cuối và giới hạn bắt đầu nghỉ trong src/features/focus/services/pomodoro.test.ts theo AC5.1–AC5.2, AC-E2–AC-E3.
- [ ] T024 [US5] Bổ sung chuyển completed khi hết giờ trong src/features/focus/services/pomodoro.ts và đồng bộ hook src/features/focus/hooks/use-pomodoro.ts theo AC5.1–AC5.2, AC-E2.
- [ ] T025 [US5] Bổ sung kiểm thử UI trong src/features/focus/components/pomodoro-screen.test.tsx rồi hiển thị hoàn thành tập trung và thao tác nghỉ trong src/features/focus/components/pomodoro-screen.tsx theo AC5.1–AC5.2, AC-E3.

## Phase 8 — US6 nghỉ 5 phút (P2)

Phụ thuộc US5 và Q2 đã chốt. Kiểm tra độc lập từ focus completed, bắt đầu break 05:00 và hoàn thành tại 00:00.

- [ ] T026 [US6] Viết kiểm thử start break và complete break trong src/features/focus/services/pomodoro.test.ts theo AC6.1–AC6.3, AC-E4.
- [ ] T027 [US6] Bổ sung chuyển sang nghỉ và hoàn thành nghỉ trong src/features/focus/services/pomodoro.ts theo AC6.1–AC6.3, AC-E4.
- [ ] T028 [US6] Bổ sung kiểm thử UI trong src/features/focus/components/pomodoro-screen.test.tsx rồi hiển thị loại Nghỉ, thời gian và trạng thái trong src/features/focus/components/pomodoro-screen.tsx theo AC6.1–AC6.3.
- [ ] T029 [US6] Sau khi Q2 có AC chính thức, bổ sung kiểm thử và xử lý điều khiển phiên nghỉ, thao tác sau khi nghỉ xong vào src/features/focus/services/pomodoro.test.ts, src/features/focus/services/pomodoro.ts và src/features/focus/components/pomodoro-screen.tsx theo các mã AC mới từ T001.

## Phase 9 — Tích hợp và nghiệm thu xuyên suốt

T030–T033 cần được phân rã lại tại T002 khi đã rõ lựa chọn vòng đời, persistence và hình thức báo hết giờ.

- [ ] T030 Bổ sung kiểm thử các AC mới về khóa màn hình, chuyển tab, chuyển ứng dụng và mở lại vào src/features/focus/hooks/use-pomodoro.test.ts sau khi T001 chốt Q3.
- [ ] T031 Thực hiện chính sách vòng đời, giữ và khôi phục state trong src/features/focus/hooks/use-pomodoro.ts theo T030 và plan.md đã chốt tại T002; bổ sung đường dẫn lưu trữ vào tasks.md nếu Q3 yêu cầu lưu bền.
- [ ] T032 Bổ sung kiểm thử các AC mới về hình thức báo hết giờ và thiếu quyền trong src/features/focus/hooks/use-pomodoro.test.ts sau khi T001 chốt Q4; chỉ định file kiểm thử riêng khi T002 xác định module thông báo.
- [ ] T033 Thực hiện báo hết giờ theo Q4 trong src/features/focus/hooks/use-pomodoro.ts và src/features/focus/components/pomodoro-screen.tsx; cập nhật tasks.md với file cấu hình/module cụ thể đã được xác định tại T002 nếu cần.
- [ ] T034 Viết kiểm thử thao tác trùng và thứ tự xử lý lúc hết giờ trong src/features/focus/services/pomodoro.test.ts, cập nhật src/features/focus/services/pomodoro.ts theo AC mới sau khi T001 chốt Q5.
- [ ] T035 Viết kiểm thử chuỗi 10 phút chạy, 2 phút pause, 15 phút chạy và 5 phút nghỉ với fake timers trong src/features/focus/hooks/use-pomodoro.test.ts theo SC1–SC3; thêm SC4 theo Q1.
- [ ] T036 Rà soát safe area, theme sáng/tối, nhãn và trạng thái hỗ trợ tiếp cận trong src/features/focus/components/pomodoro-screen.tsx theo tiêu chí đã bổ sung ở T001; ghi kết quả Android và iOS vào specs/001-pomodoro-session/quickstart.md.
- [ ] T037 Chạy lint, typecheck, format:check và test theo package.json, thực hiện nghiệm thu đầy đủ AC1–AC6, AC-E1–AC-E4 cùng các AC mới từ T001; ghi bằng chứng, Pass/Fail và lỗi chưa xử lý vào specs/001-pomodoro-session/quickstart.md.

## Phụ thuộc và thứ tự

T001 → T002 → T003 → T004 → T005 → T006 → T007 → US1.
US2 dùng US1, US3 dùng US2. US4 dùng nền US1 và Q1, kiểm tra trạng thái completed
sau khi US5 có. US5 dùng US1 và dùng US3 cho AC-E2. US6 dùng US5 và Q2.
T030–T034 dùng quyết định T001–T003 và các action đã triển khai. T035–T037
chạy sau tích hợp. Tất cả thay đổi trên cùng file phải được thực hiện tuần tự.

## Cơ hội song song theo story

| Story | Cặp công việc có thể tách sau khi giao diện nền đã ổn định |
| --- | --- |
| US1 | T010 hook test và T012 UI test, sau T009 |
| US2 | T014 logic test và phần UI test của T016, sau US1 |
| US3 | T017 logic test và phần UI test của T019, sau US2 |
| US4 | T020 logic test và phần UI test của T022, sau Q1 |
| US5 | T023 logic test và phần UI test của T025, sau US1 |
| US6 | T026 logic test và phần UI test của T028, sau US5 |

Các task gộp kiểm thử với triển khai chưa được gắn [P]. Chỉ tách phần kiểm thử
sang người thực hiện khác khi đã thống nhất phạm vi file và tránh chồng sửa.

## Chiến lược triển khai

Bắt đầu bằng T001–T007 và US1 để trình diễn khởi động đồng hồ. Hoàn tất US2,
US3, US4 và US5 để có phiên tập trung đầy đủ. Thêm US6 và phần tích hợp sau đó.
Mỗi story được kiểm tra riêng bằng trạng thái tiền đề trong spec. Các task kiểm thử
được viết trước phần xử lý tương ứng và chạy lại sau mỗi thay đổi.
