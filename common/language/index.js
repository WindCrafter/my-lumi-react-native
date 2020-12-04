const langs = {
  user: 'Tên đăng nhập hoặc email',
  passWord: 'Vui lòng nhập mật khẩu',
  login: 'Đăng nhập',
  forgotPassword: 'Quên mật khẩu',
  rememberMe: 'Nhớ đăng nhập',
  name: 'Họ và tên:',
  phone: 'Số điện thoại:',
  birthday: 'Ngày sinh:',
  gene: 'Giới tính:',
  nativeLand: 'Quê quán:',
  home: 'Trang chủ',
  addStaff: 'Thêm nhân viên',
  delStaff: 'Xoá nhân viên',
  checkIn: 'Chấm công',
  questCheckin: 'Bạn chưa chấm công ?',
  onTime: 'Đúng giờ',
  checkOut: 'Check out',
  break: 'Nghỉ làm',
  late: 'Đi muộn',
  addWork: 'Thêm công việc',
  creMeeting: 'Tạo lịch họp',
  extendContract: 'Gia hạn hợp đồng',
  genaralInfo: 'Tổng hợp chấm công',
  resignOT: 'Đơn nghỉ, OT',
  listStaffOut: 'Nhân sự nghỉ việc',
  workMonth: 'Công/Tháng',
  kpiMonth: 'KPI/tháng',
  kpi_6Month: 'KPI/6tháng',
  reason: 'Lí do:',
  applyBreak: 'Đơn xin nghỉ phép',
  applyOT: 'Đơn xin OT',
  applyLate: 'Đơn xin đi muộn',
  dob: 'DOB:',
  team: 'Team:',
  manager: 'Quản lí nhân sự',
  event: 'Sự kiện',
  dealLine: 'Dead Line hoặc dự án lớn',
  dayInfo: 'Tổng quan/ngày',
  dayWeek: 'Tổng quan/tuần',
  inforMonth: 'Tổng quan/tháng',
  work: 'Công việc',
  reasonSum: 'Tóm tắt lí do :',
  timeStart: 'Thời điểm bắt đầu :',
  timeEnd: 'Thời điểm kết thúc :',
  timeLate: 'Thời điểm đến muộn :',
  enterInfo: 'Nhập thông tin :',
  qrCode: 'QR Code',
  timeBreak: 'Thời gian nghỉ',
  breakShift: 'Theo buổi',
  breakDay: 'Theo ngày',
  breakMoreDay: 'Nghỉ nhiều ngày',
  morningShift: 'Ca sáng',
  afternoonShift: 'Ca chiều',
  contact: 'Thông tin liên hệ',
  validBreak: 'Số phép tồn',
  identity: 'CCCD/CMND:',
  inforCompany: 'Tổng quan công ty',
  staff: 'Nhân viên',
  notify: 'Thông báo',
  errorNetwork: 'Lỗi mạng',
  day: 'Ngày:',
  bankAccount: 'Số tài khoản:',
  bank: 'Ngân hàng:',
  pickTeam: 'Chọn người tham gia',
  newEvent: 'Sự kiện mới',
  deviceID: 'DeviceID:',
  tryAgain: 'Thử lại',
  code: 'Dùng mã',
  titleListOT: 'Lịch sử xin OT',
  titleApproveOT: 'Đơn xin OT',
  writeOT: 'Viết đơn',
  approveOT: 'Duyệt đơn',
  filter: 'Bộ lọc',
  waiting: 'Đang chờ',
  approve: 'Đã duyệt',
  denied: 'Bị từ chối',
  deny: 'Từ chối',
  accept: 'Chấp thuận',
  goLate: 'Đi muộn',
  backSoon: 'Về Sớm',
  confirm: 'Xác nhận',
  timeOT: 'Thời gian ước tính',
  navigator: {
    login: 'Login',
    register: 'Register',
    forgotPass: 'Forgot Password',
    firstLogin: 'FirstLogin',
    adminStack: 'AdminStack',
    userStack: 'User Stack',
    home: 'Home',
    book: 'Book Lịch',
    testNotify: 'TestNotify',
    account: 'Cá nhân',
    main: 'Trang chủ',
    schedule: 'Lịch họp',
    notify: 'Thông báo',
    tabbarUser: 'TabbarUser',
    tabbarAdmin: 'TabbarAdmin',
    forgotPassword: 'ForgotPass',
    contact: 'Contact',
    applyLate: 'ApplyLate',
    applyBreak: 'ApplyBreak',
    approveOT: 'ApproveOT',
    applyOT: 'ApplyOT',
    listOT: 'listOT',
    updateProfile: 'UpdareProdile',
    allHistory: 'allHistory',
    history: 'History',
    checkIn: 'CheckIn',
    confirm: 'Xác nhận',
    verify: 'Xác nhận đơn',
    event: 'Sự kiện mới',
    pickTeam: 'PickTeam',
    notifyDetail: 'NotifyDetail',
    assignment: 'Assignment',
    ot: 'OT',
    historyLate: 'History Late',
    approveLate: 'Approve Late',
    historyBreak: 'History Break',
    approveBreak: 'Approve Break',
  },
  alert: {
    ok: 'OK',
    yes: 'Có',
    no: 'Không',
    cancel: 'Cancel',
    notify: 'Thông báo',
    deviceID: 'DeviceID',
    copy: 'Copy',
    wrongPhone: 'Sai định dạng số điện thoại',
    wrongVinaphone: 'Sai số điện thoại.\nVui lòng kiểm tra lại.',
    invalidGene: 'Vui lòng điền đúng định dạng: Nam/Nữ/Khác',
    wrongIdentity: 'Sai định dang CCCD/CMND',
    remind: 'Nhắc bạn',
    enterUsername: 'Vui lòng điền tên đăng nhập',
    notice: 'Lưu ý',
    wrongEmail: 'Định dạng email không đúng',
    wrongRepass: 'Mật khẩu nhập lại không đúng',
    lessPassword: 'Mật khẩu không được dưới 6 kí tự',
    invalidPassword: 'Mật khẩu không được để trống',
    invalidEmail: 'Email không được để trống.\nVui lòng kiểm tra lại.',
    wrongVerifyCode: 'Mã xác nhận sai',
    termOfService:
      'Bạn cần đồng ý với những điều khoản dịch vụ của chúng tôi để tiếp tục đăng ký',
    privacyPolicy:
      'Bạn cần đồng ý với những chính sách về quyền riêng tư của chúng tôi để tiếp tục đăng ký',
    endShift: 'Bạn có chắc chắn muốn kết thúc phiên làm việc không? ',
    checkinSuccess: 'YEAH! CHECK-IN THÀNH CÔNG',
    checkoutSuccess: 'YEAH! CHECK-OUT THÀNH CÔNG',
    wishIn: 'Hãy có ngày làm việc tuyệt vời ông Mặt Trời nhé.',
    wishOut: 'Hãy dành nhiều thời gian hơn cho bản thân và gia đình nhé!',
    cantCheck: 'Hiện tại chưa thể chấm công thành công',
    applydone: 'Đơn của bạn đã được gửi đi',
    applyOTdone: 'Đơn tăng ca đã được gửi đi',
    waitConfirm: 'Vui lòng đợi trong khi duyệt.',
    updateProfileFailed:
      'Thay đổi thông tin thấy bại \n Vui lòng kiểm tra kết nối mạng',
    signOut: 'Đăng xuất',
    questSignOut: 'Bạn thực sự muốn đăng xuất ?',
    plscheck: 'Vui lòng kiểm tra lại',
    dontImportPhone: 'Lumier này chưa cung cấp số điện thoại.',
    dontImportUser: 'Lumier này chưa cung cấp số tài khoản.',
  },
};

export default langs;
