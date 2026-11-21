# Checklist QC — Chất lượng yêu cầu Pomodoro

**Mục đích** Rà soát mỗi hành vi và trường hợp biên có kết quả mong đợi rõ để QC quyết định Pass/Fail.  
**Ngày tạo** 2026-11-21  
**Đặc tả** [spec.md](../spec.md)  
**Độ sâu và người dùng** Mức tiêu chuẩn, QC và người rà soát trước triển khai.

**Quyền đánh dấu** Người rà soát đánh dấu [x] sau khi xác định yêu cầu đủ rõ.
Dấu [x] thể hiện chất lượng yêu cầu đã được duyệt. Mọi mục mới để trống cho người rà soát.

## Độ đầy đủ của hành vi

- [ ] CHK001 Đặc tả bắt đầu có nêu loại phiên, giá trị 25:00, trạng thái và thao tác khả dụng sau khi bắt đầu không? [Đầy đủ, Spec §AC1.1]
- [ ] CHK002 Đặc tả tạm dừng có nêu thời gian giữ lại, trạng thái và thao tác tiếp tục không? [Đầy đủ, Spec §AC2.1–AC2.2]
- [ ] CHK003 Đặc tả tiếp tục có nêu rõ dùng thời gian còn lại của cùng phiên không? [Rõ ràng, Spec §AC3.1–AC3.2]
- [ ] CHK004 Yêu cầu đặt lại ở trạng thái đang chạy, tạm dừng, hoàn thành và sẵn sàng đã có quyết định chính thức chưa? [Đầy đủ, Spec §AC4.1–AC4.5, Spec §Q1]
- [ ] CHK005 Yêu cầu đặt lại có xác định rõ việc xác nhận, tự chạy lại và trạng thái sau thao tác không? [Rõ ràng, Spec §Q1, Ambiguity]
- [ ] CHK006 Yêu cầu kết thúc tập trung có chỉ rõ 00:00, thông điệp hoàn thành và thao tác bắt đầu nghỉ không? [Đầy đủ, Spec §AC5.1–AC5.2]
- [ ] CHK007 Yêu cầu bắt đầu nghỉ có nêu điều kiện phiên tập trung hoàn thành, thời lượng 05:00 và thao tác chủ động của người dùng không? [Đầy đủ, Spec §AC6.1]
- [ ] CHK008 Yêu cầu hết nghỉ có nêu kết quả ở 00:00 và trạng thái sau đó không? [Đầy đủ, Spec §AC6.3, Spec §AC-E4]
- [ ] CHK009 Đặc tả đã chốt các thao tác cho phiên nghỉ và cách bắt đầu phiên tập trung tiếp theo chưa? [Bao phủ, Spec §Q2, Gap]

## Chất lượng tiêu chí nghiệm thu

- [ ] CHK010 Mỗi AC có đủ Given với trạng thái tiền đề, When với thao tác/sự kiện và Then với kết quả quan sát được không? [Đo được, Spec §US1–US6]
- [ ] CHK011 Các AC nêu thời gian đếm có đủ giá trị ban đầu, khoảng thời gian trôi qua và giá trị kết quả không? [Đo được, Spec §AC1.2, Spec §AC2.2, Spec §AC3.2, Spec §AC6.2]
- [ ] CHK012 Quy tắc làm tròn giây và sai số thời gian cho phép khi QC đo thực tế đã được định nghĩa chưa? [Rõ ràng, Spec §SC2–SC3, Gap]
- [ ] CHK013 Nhãn loại phiên, trạng thái và ý nghĩa thao tác có được dùng nhất quán trong các AC không? [Nhất quán, Spec §US1–US6]
- [ ] CHK014 Mỗi FR và SC có AC tương ứng, gồm điều kiện để kết luận đạt hoặc chưa đạt không? [Truy vết, Spec §FR1–FR6, Spec §SC1–SC4]
- [ ] CHK015 Các AC dự thảo có được phân biệt rõ với tiêu chí đã được nhóm chốt không? [Rõ ràng, Spec §AC4, Spec §SC4, Spec §Giả định nghiệm thu]

## Trường hợp biên và khôi phục

- [ ] CHK016 Yêu cầu đã nêu kết quả khi tạm dừng ở 00:01, chờ và tiếp tục qua giây cuối chưa? [Bao phủ, Spec §AC-E1–AC-E2]
- [ ] CHK017 Điều kiện chưa được bắt đầu nghỉ đã được mô tả rõ trong lúc tập trung chạy hoặc tạm dừng chưa? [Bao phủ, Spec §AC-E3]
- [ ] CHK018 Yêu cầu có xác định trạng thái giữ nguyên sau khi phiên tập trung hoặc nghỉ hết giờ không? [Nhất quán, Spec §AC5.2, Spec §AC-E4]
- [ ] CHK019 Yêu cầu đã chốt kết quả khi bấm nhanh nhiều lần cùng thao tác chưa? [Bao phủ, Spec §Q5, Gap]
- [ ] CHK020 Quy tắc ưu tiên khi tạm dừng hoặc đặt lại trùng thời điểm hết giờ đã rõ chưa? [Nhất quán, Spec §Q5, Gap]
- [ ] CHK021 Yêu cầu chuyển ứng dụng và khóa màn hình đã nêu thời gian và trạng thái khi quay lại, cả trước và sau mốc hết giờ chưa? [Khôi phục, Spec §Q3, Gap]
- [ ] CHK022 Yêu cầu mở lại sau khi đóng hẳn ứng dụng đã nêu cách khôi phục phiên đang chạy và tạm dừng chưa? [Khôi phục, Spec §Q3, Gap]
- [ ] CHK023 Yêu cầu báo hết giờ có xác định hình thức, thời điểm và hành vi khi thiếu quyền thông báo chưa? [Bao phủ, Spec §Q4, Gap]
- [ ] CHK024 Hành vi khi chuyển tab Focus trong ứng dụng đã được phân biệt với chuyển sang ứng dụng khác chưa? [Bao phủ, Spec §Giả định nghiệm thu, Gap]

## Giả định và điều kiện nghiệm thu

- [ ] CHK025 Phạm vi màn hình đang mở và các hành vi ngoài phạm vi đó có được ghi rõ, nhất quán với câu hỏi mở không? [Nhất quán, Spec §Giả định nghiệm thu, Spec §Q3–Q4]
- [ ] CHK026 Yêu cầu khả năng tiếp cận và sự nhất quán trên Android/iOS đã có tiêu chí quan sát được chưa? [Đầy đủ, Gap]
- [ ] CHK027 Các câu hỏi Q1–Q5 có quyết định và cập nhật AC liên quan trước khi chốt triển khai không? [Phụ thuộc, Spec §Hành vi cần nhóm xác nhận]

## Nhận xét đối chiếu ban đầu

Đánh giá dưới đây dựa trên nội dung tài liệu ngày 2026-11-21. Đây là kết quả rà soát
đặc tả, các tiêu chí triển khai vẫn cần được thực hiện sau khi có ứng dụng.

| Nhóm hành vi | Kết quả rà soát | Cơ sở |
| --- | --- | --- |
| Bắt đầu, tạm dừng, tiếp tục | Có giá trị thời gian và trạng thái kỳ vọng cụ thể | AC1–AC3 |
| Đặt lại | Có kết quả dự thảo, chưa được nhóm xác nhận | AC4, Q1 |
| Kết thúc tập trung, bắt đầu và kết thúc nghỉ | Có kết quả mong đợi rõ cho luồng màn hình đang mở | AC5–AC6 |
| Tạm dừng ở giây cuối, chờ sau hết giờ | Có tiêu chí riêng | AC-E1, AC-E2, AC5.2, AC-E4 |
| Điều khiển nghỉ và vòng tiếp theo | Thiếu quyết định chính thức | Q2 |
| Rời ứng dụng, khóa màn hình, đóng và mở lại | Thiếu kết quả nghiệm thu | Q3 |
| Âm thanh, rung, thông báo | Thiếu lựa chọn và fallback | Q4 |
| Bấm trùng hoặc thao tác đúng lúc hết giờ | Thiếu kết quả nghiệm thu | Q5 |
| Chuyển tab, làm tròn/sai số, khả năng tiếp cận | Chưa có tiêu chí riêng trong spec | CHK012, CHK024, CHK026 |

## Ghi chú

- Người rà soát đánh dấu sau khi yêu cầu được xác nhận, làm rõ hoặc bổ sung.
- speckit-implement đọc trạng thái checklist để kiểm tra điều kiện triển khai.
- Checklist requirements.md có vòng đời riêng do speckit-specify và speckit-clarify duy trì.
- Các mã CHK dẫn tới nội dung spec cần rà soát. Nhận xét ban đầu giúp chọn điểm cần làm rõ trước.
