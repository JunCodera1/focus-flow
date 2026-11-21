# Đặc tả tính năng — Đồng hồ Pomodoro của Focus Flow

**Ngày tạo và cập nhật** 2026-11-21  
**Trạng thái** Bản nháp, còn hành vi cần nhóm xác nhận  
**Phạm vi** Phiên tập trung 25 phút, tạm dừng, tiếp tục, đặt lại và bắt đầu phiên nghỉ 5 phút.

## Tình huống người dùng và tiêu chí nghiệm thu

Các tiêu chí áp dụng khi màn hình đồng hồ đang mở. Given nêu trạng thái ban đầu,
When nêu thao tác hoặc sự kiện, Then nêu kết quả quan sát được trên màn hình.
Các tiêu chí ghi **Dự thảo** phụ thuộc quyết định tại phần Cần xác nhận.

### US1 — Bắt đầu phiên tập trung (P1)

Là người dùng, tôi muốn bắt đầu phiên tập trung 25 phút để dành thời gian học hoặc làm việc.
Đây là thao tác mở đầu cho toàn bộ luồng sử dụng.

**Kiểm tra độc lập** Mở đồng hồ ở trạng thái sẵn sàng và bắt đầu một phiên.

- **AC1.1** **Given** đồng hồ đang sẵn sàng cho phiên tập trung và hiển thị 25:00,
  **When** tôi chọn **Bắt đầu**, **Then** màn hình hiển thị loại phiên **Tập trung**,
  trạng thái **Đang chạy**, thời gian bắt đầu giảm từ 25:00 và thao tác **Tạm dừng** khả dụng.
- **AC1.2** **Given** tôi vừa bắt đầu phiên tập trung từ 25:00,
  **When** 10 giây trôi qua liên tục, **Then** đồng hồ hiển thị 24:50.

### US2 — Tạm dừng phiên tập trung (P1)

Là người dùng, tôi muốn tạm dừng khi có việc gián đoạn để giữ lại thời gian tập trung còn lại.
Điều này giúp tôi chủ động kiểm soát phiên học hoặc làm việc.

**Kiểm tra độc lập** Chuẩn bị phiên đang chạy còn 18:30 và chọn tạm dừng.

- **AC2.1** **Given** phiên tập trung đang chạy còn 18:30,
  **When** tôi chọn **Tạm dừng**, **Then** đồng hồ giữ ở 18:30, màn hình hiển thị
  **Đã tạm dừng** và thao tác **Tiếp tục** khả dụng.
- **AC2.2** **Given** phiên tập trung đã tạm dừng ở 18:30,
  **When** tôi chờ 60 giây, **Then** đồng hồ vẫn hiển thị 18:30 và **Đã tạm dừng**.

### US3 — Tiếp tục phiên tập trung (P1)

Là người dùng, tôi muốn tiếp tục phiên đã tạm dừng để hoàn thành phần thời gian còn lại.
Thao tác này cho phép tôi quay lại công việc sau gián đoạn.

**Kiểm tra độc lập** Chuẩn bị phiên đã tạm dừng còn 18:30 và chọn tiếp tục.

- **AC3.1** **Given** phiên tập trung đã tạm dừng ở 18:30,
  **When** tôi chọn **Tiếp tục**, **Then** màn hình hiển thị **Đang chạy**, đồng hồ
  đếm tiếp từ 18:30 và thao tác **Tạm dừng** khả dụng.
- **AC3.2** **Given** tôi vừa tiếp tục phiên từ 18:30,
  **When** 10 giây chạy liên tục trôi qua, **Then** đồng hồ hiển thị 18:20.

### US4 — Đặt lại đồng hồ tập trung (P1)

Là người dùng, tôi muốn đặt lại đồng hồ để có thể bắt đầu lại một phiên tập trung đầy đủ.
Đây là cách chủ động kết thúc lần đếm hiện tại và chuẩn bị lần mới.

**Kiểm tra độc lập** Chuẩn bị từng trạng thái trong bảng và thực hiện thao tác đặt lại.
Các tiêu chí dưới đây là **Dự thảo**, chờ xác nhận Q1.

| Mã | Given — Trạng thái ban đầu | When — Hành động | Then — Kết quả trên màn hình |
| --- | --- | --- | --- |
| AC4.1 | Phiên tập trung đang chạy còn 18:30. | Tôi chọn **Đặt lại**. | Đồng hồ về 25:00, trạng thái **Sẵn sàng**, có **Bắt đầu**. |
| AC4.2 | Phiên tập trung đã tạm dừng còn 18:30. | Tôi chọn **Đặt lại**. | Đồng hồ về 25:00, trạng thái **Sẵn sàng**, có **Bắt đầu**. |
| AC4.3 | Phiên tập trung đã hoàn thành ở 00:00. | Tôi chọn **Đặt lại**. | Màn hình trở về phiên tập trung **Sẵn sàng** ở 25:00 và có **Bắt đầu**. |
| AC4.4 | Đồng hồ tập trung vừa được đặt lại về 25:00. | Tôi chờ 10 giây. | Đồng hồ vẫn ở 25:00 và **Sẵn sàng**. |
| AC4.5 | Đồng hồ tập trung đã sẵn sàng ở 25:00. | Tôi chọn **Đặt lại** lần nữa. | Đồng hồ vẫn ở 25:00 và **Sẵn sàng**. |

### US5 — Nhận biết phiên tập trung hoàn thành (P1)

Là người dùng, tôi muốn biết khi đã tập trung đủ 25 phút để có thể chuyển sang nghỉ.
Dấu hiệu hoàn thành giúp tôi nhận biết thời điểm kết thúc trên màn hình.

**Kiểm tra độc lập** Chuẩn bị phiên tập trung đang chạy còn 00:01 và chờ giây cuối.

- **AC5.1** **Given** phiên tập trung đang chạy còn 00:01,
  **When** giây cuối trôi qua, **Then** đồng hồ dừng ở 00:00, màn hình hiển thị
  **Đã hoàn thành phiên tập trung** và thao tác **Bắt đầu nghỉ 5 phút** khả dụng.
- **AC5.2** **Given** phiên tập trung đã hoàn thành ở 00:00,
  **When** tôi chờ 10 giây, **Then** màn hình vẫn hiển thị trạng thái hoàn thành ở 00:00,
  thao tác **Tiếp tục** không khả dụng và phiên nghỉ vẫn chờ tôi chọn bắt đầu.

### US6 — Bắt đầu và hoàn thành phiên nghỉ 5 phút (P2)

Là người dùng, tôi muốn bắt đầu nghỉ 5 phút sau khi tập trung xong để nghỉ ngơi trước công việc tiếp theo.
Phiên nghỉ bổ sung bước phục hồi sau luồng tập trung chính.

**Kiểm tra độc lập** Chuẩn bị trạng thái vừa hoàn thành phiên tập trung và bắt đầu nghỉ.

- **AC6.1** **Given** phiên tập trung đã hoàn thành và có thao tác **Bắt đầu nghỉ 5 phút**,
  **When** tôi chọn thao tác này, **Then** màn hình chuyển sang loại phiên **Nghỉ**,
  hiển thị **Đang chạy** và bắt đầu đếm ngược từ 05:00.
- **AC6.2** **Given** tôi vừa bắt đầu nghỉ từ 05:00,
  **When** 10 giây trôi qua liên tục, **Then** đồng hồ hiển thị 04:50 và loại phiên **Nghỉ**.
- **AC6.3** **Given** phiên nghỉ đang chạy còn 00:01,
  **When** giây cuối trôi qua, **Then** đồng hồ dừng ở 00:00 và màn hình hiển thị
  **Đã hoàn thành phiên nghỉ**.

### Trường hợp biên

- **AC-E1** **Given** phiên tập trung đã tạm dừng khi còn 00:01,
  **When** tôi chờ 5 giây, **Then** đồng hồ vẫn ở 00:01 và hiển thị **Đã tạm dừng**.
- **AC-E2** **Given** phiên tập trung đã tạm dừng ở 00:01,
  **When** tôi chọn **Tiếp tục** và giây cuối trôi qua, **Then** đồng hồ dừng ở 00:00,
  hiển thị hoàn thành phiên tập trung và có **Bắt đầu nghỉ 5 phút**.
- **AC-E3** **Given** phiên tập trung đang chạy hoặc đã tạm dừng,
  **When** tôi xem các thao tác trên màn hình, **Then** **Bắt đầu nghỉ 5 phút** chưa khả dụng.
- **AC-E4** **Given** phiên nghỉ đã hoàn thành ở 00:00,
  **When** tôi chờ 10 giây, **Then** đồng hồ vẫn ở 00:00 và hiển thị hoàn thành phiên nghỉ.

## Yêu cầu

### Yêu cầu chức năng

| Mã | Yêu cầu | Tiêu chí nghiệm thu |
| --- | --- | --- |
| FR1 | Cho phép bắt đầu phiên tập trung 25 phút và hiển thị đếm ngược. | AC1.1–AC1.2 |
| FR2 | Cho phép tạm dừng và giữ nguyên thời gian còn lại. | AC2.1–AC2.2, AC-E1 |
| FR3 | Cho phép tiếp tục từ thời gian đã tạm dừng. | AC3.1–AC3.2, AC-E2 |
| FR4 | Cho phép đặt lại đồng hồ tập trung. Hành vi chi tiết chờ Q1. | AC4.1–AC4.5, dự thảo |
| FR5 | Hiển thị hoàn thành phiên tập trung ở 00:00 và cho phép người dùng bắt đầu nghỉ. | AC5.1–AC5.2, AC-E3 |
| FR6 | Bắt đầu phiên nghỉ 5 phút theo thao tác người dùng và hiển thị hoàn thành khi hết giờ. | AC6.1–AC6.3, AC-E4 |

### Đối tượng chính

- **Phiên đồng hồ** có loại Tập trung hoặc Nghỉ, thời lượng ban đầu tương ứng
  25 hoặc 5 phút, thời gian còn lại và trạng thái hiển thị.
- **Trạng thái** gồm Sẵn sàng, Đang chạy, Đã tạm dừng và Đã hoàn thành.
  Việc áp dụng tạm dừng, tiếp tục và đặt lại cho phiên nghỉ chờ Q2.

## Tiêu chí thành công

### Kết quả đo được

- **SC1** QC thực hiện đủ bắt đầu, tạm dừng và tiếp tục, quan sát được đúng trạng thái
  và thời gian còn lại ở tất cả tình huống AC1–AC3.
- **SC2** Một phiên có 10 phút chạy, 2 phút tạm dừng và 15 phút chạy tiếp kết thúc
  sau 27 phút kể từ khi bắt đầu. Màn hình báo hoàn thành tại 00:00.
- **SC3** Sau khi phiên tập trung hoàn thành, QC bắt đầu nghỉ bằng một thao tác.
  Phiên nghỉ liên tục kéo dài 5 phút rồi báo hoàn thành ở 00:00.
- **SC4 — Dự thảo** Sau đặt lại, đồng hồ tập trung hiển thị 25:00 và giữ nguyên
  ít nhất 10 giây khi người dùng chưa chọn Bắt đầu. Chờ xác nhận Q1.

## Giả định nghiệm thu

- Thời gian hiển thị theo phút và giây. Tên thao tác trong đặc tả mô tả chức năng.
- Các trạng thái tiền đề có thể được chuẩn bị riêng để QC kiểm tra từng thao tác.
- Mỗi thời điểm màn hình chỉ điều khiển một phiên. Phiên nghỉ bắt đầu khi người dùng
  chủ động chọn sau khi phiên tập trung hoàn thành.
- Hành vi đặt lại về 25:00 ở trạng thái Sẵn sàng, có hiệu lực ngay khi chọn,
  là đề xuất dự thảo để nhóm xem xét tại Q1.

## Hành vi cần nhóm xác nhận

| Mã | Tình huống | Quyết định cần xác nhận |
| --- | --- | --- |
| Q1 | Đặt lại đồng hồ tập trung. | Có chấp nhận AC4.1–AC4.5? Có cần hộp thoại xác nhận trước khi đặt lại? |
| Q2 | Đang nghỉ hoặc vừa nghỉ xong. | Phiên nghỉ có tạm dừng, tiếp tục và đặt lại không? Đặt lại về 05:00 hay 25:00? Sau khi hết nghỉ, người dùng bắt đầu phiên tập trung mới bằng cách nào? |
| Q3 | Khóa màn hình, chuyển ứng dụng hoặc đóng hẳn ứng dụng. | Đồng hồ tiếp tục, tự tạm dừng hay kết thúc? Khi mở lại, màn hình khôi phục loại phiên, trạng thái và thời gian như thế nào? |
| Q4 | Phiên tập trung hoặc nghỉ vừa hết giờ. | Ngoài dấu hiệu trên màn hình, có cần âm thanh, rung hoặc thông báo? Nếu cần, hành vi khi thiếu quyền thông báo là gì? |
| Q5 | Bấm nhanh nhiều lần hoặc thao tác đúng lúc hết giờ. | Thao tác trùng được xử lý thế nào? Khi tạm dừng hoặc đặt lại trùng thời điểm hết giờ, trạng thái nào được ưu tiên? |

Người phụ trách đặc tả ghi lại quyết định của nhóm và cập nhật tiêu chí nghiệm thu liên quan
trước khi chốt kế hoạch triển khai các hành vi này.
