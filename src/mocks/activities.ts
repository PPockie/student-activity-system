import type { ActivityDetail } from '../types/activity'

/** ข้อมูลจำลอง — จะถูกแทนด้วย API จริงภายหลัง (GET /activities, GET /activities/:id) */
export const MOCK_ACTIVITIES: ActivityDetail[] = [
  {
    id: 1,
    title: 'จิตอาสาพัฒนาชุมชน',
    category: 'จิตอาสา',
    date: 'ศ. 15 ส.ค.',
    time: '08:00',
    endTime: '12:00',
    location: 'ศาลาประชาคม',
    hours: 4,
    joined: 38,
    capacity: 40,
    tab: 'เปิดรับสมัคร',
    description:
      'ร่วมพัฒนาพื้นที่ส่วนกลางของชุมชน ทำความสะอาดศาลาประชาคม ทาสีรั้ว และจัดระเบียบพื้นที่สีเขียว โดยมีเจ้าหน้าที่ชุมชนเป็นพี่เลี้ยงตลอดกิจกรรม',
    organizer: 'ฝ่ายกิจการนักศึกษา',
    contact: '02-123-4567',
    allowOverflow: true,
    maxHours: 4,
    requirements: ['แต่งกายชุดสุภาพ สวมรองเท้าผ้าใบ', 'เตรียมหมวกและน้ำดื่มส่วนตัว'],
  },
  {
    id: 2,
    title: 'อบรมการเงินสำหรับนักศึกษา',
    category: 'อบรม',
    date: 'พ. 20 ส.ค.',
    endDate: 'ศ. 22 ส.ค.',
    time: '13:00',
    endTime: '16:00',
    location: 'ห้องประชุม A',
    hours: 3,
    joined: 40,
    capacity: 40,
    tab: 'เปิดรับสมัคร',
    description:
      'เรียนรู้การวางแผนการเงินส่วนบุคคล การจัดการหนี้ กยศ. และการออมระยะยาว บรรยายโดยวิทยากรจากสถาบันการเงิน',
    organizer: 'ศูนย์แนะแนวและทุนการศึกษา',
    contact: 'finance@demo.ac.th',
    allowOverflow: false,
    maxHours: 3,
    requirements: ['นำโน้ตบุ๊กหรือสมุดจดมาด้วย'],
  },
  {
    id: 3,
    title: 'ปลูกป่าชายเลน',
    category: 'อนุรักษ์',
    date: 'ส. 2 ส.ค.',
    time: '07:30',
    endTime: '13:30',
    location: 'บางขุนเทียน',
    hours: 6,
    joined: 25,
    capacity: 30,
    tab: 'ของฉัน',
    description:
      'ลงพื้นที่ปลูกกล้าโกงกางเพื่อฟื้นฟูแนวป่าชายเลนชายฝั่งบางขุนเทียน พร้อมกิจกรรมเรียนรู้ระบบนิเวศชายฝั่ง',
    organizer: 'ชมรมอนุรักษ์สิ่งแวดล้อม',
    allowOverflow: true,
    maxHours: 6,
    requirements: ['เตรียมเสื้อผ้าสำหรับเปลี่ยน', 'ผู้มีโรคประจำตัวแจ้งผู้ดูแลก่อนเริ่มกิจกรรม'],
    participationStatus: 'registered',
  },
  {
    id: 4,
    title: 'ค่ายอาสาสอนน้องอ่านเขียน',
    category: 'จิตอาสา',
    date: 'อา. 10 ส.ค.',
    time: '09:00',
    endTime: '15:00',
    location: 'โรงเรียนวัดบางแค',
    hours: 6,
    joined: 18,
    capacity: 25,
    tab: 'ของฉัน',
    description:
      'จัดกิจกรรมเสริมทักษะการอ่านเขียนให้นักเรียนชั้นประถมศึกษา พร้อมฐานกิจกรรมนันทนาการช่วงบ่าย',
    organizer: 'ชมรมครูอาสา',
    contact: '089-000-1122',
    allowOverflow: false,
    maxHours: 6,
    participationStatus: 'checked-in',
  },
  {
    id: 5,
    title: 'เดิน-วิ่งการกุศลเพื่อทุนการศึกษา',
    category: 'กีฬา',
    date: 'ส. 23 ส.ค.',
    time: '05:30',
    endTime: '09:30',
    location: 'สนามกีฬากลาง',
    hours: 4,
    /* เคสที่นั่งเต็มแต่เปิดคิวสำรอง */
    joined: 150,
    capacity: 150,
    tab: 'เปิดรับสมัคร',
    description:
      'กิจกรรมเดิน-วิ่งระยะ 5 กม. รายได้หลังหักค่าใช้จ่ายสมทบกองทุนการศึกษาของมหาวิทยาลัย',
    organizer: 'ฝ่ายกีฬาและนันทนาการ',
    allowOverflow: true,
    maxHours: 4,
    waitlistCount: 18,
    requirements: ['รายงานตัวก่อนเวลา 30 นาที'],
  },
  {
    id: 6,
    title: 'เวิร์กช็อปทักษะดิจิทัลเบื้องต้น',
    category: 'อบรม',
    date: 'จ. 25 ส.ค.',
    time: '13:00',
    endTime: '17:00',
    location: 'ห้องปฏิบัติการคอมพิวเตอร์ 2',
    hours: 4,
    joined: 30,
    capacity: 30,
    tab: 'เปิดรับสมัคร',
    description:
      'ฝึกใช้เครื่องมือดิจิทัลสำหรับการเรียนและการทำงาน ทั้งการจัดการเอกสารออนไลน์ การนำเสนอ และความปลอดภัยข้อมูลส่วนบุคคล',
    organizer: 'สำนักเทคโนโลยีสารสนเทศ',
    contact: 'it-training@demo.ac.th',
    allowOverflow: false,
    maxHours: 4,
  },
]

export class ActivityNotFoundError extends Error {
  constructor(id: string | number) {
    super(`ไม่พบกิจกรรมรหัส ${id}`)
    this.name = 'ActivityNotFoundError'
  }
}

/** จำลองการเรียก GET /activities/:id */
export async function fetchActivityById(id: string | number): Promise<ActivityDetail> {
  await new Promise((resolve) => setTimeout(resolve, 400))

  const activity = MOCK_ACTIVITIES.find((item) => String(item.id) === String(id))

  if (!activity) throw new ActivityNotFoundError(id)

  return activity
}
