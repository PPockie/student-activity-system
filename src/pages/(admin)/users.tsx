import { Button, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { MOCK_ACCOUNTS } from '../../mocks/accounts'
import type { Role } from '../../types/auth'
import { ROLE_LABEL } from '../../utils/roles'

interface UserRow {
  key: string
  name: string
  identifier: string
  role: Role
}

const DATA: UserRow[] = MOCK_ACCOUNTS.map((account) => ({
  key: account.id,
  name: account.name,
  identifier: account.studentId ?? account.email,
  role: account.role,
}))

const ROLE_COLOR: Record<Role, string> = {
  admin: 'magenta',
  teacher: 'purple',
  student: 'blue',
}

const columns: ColumnsType<UserRow> = [
  { title: 'ชื่อ', dataIndex: 'name' },
  { title: 'อีเมล / รหัสนักศึกษา', dataIndex: 'identifier', responsive: ['md'] },
  {
    title: 'สิทธิ์',
    dataIndex: 'role',
    width: 140,
    render: (role: Role) => <Tag color={ROLE_COLOR[role]}>{ROLE_LABEL[role]}</Tag>,
  },
  {
    title: 'จัดการ',
    key: 'actions',
    width: 120,
    render: () => (
      <Button size="small" type="link" className="px-0!">
        แก้ไขสิทธิ์
      </Button>
    ),
  },
]

function AdminUsers() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">จัดการผู้ใช้</h1>
      <div className="border-ink-100 overflow-hidden rounded-2xl border bg-white">
        <Table<UserRow> columns={columns} dataSource={DATA} pagination={false} scroll={{ x: 'max-content' }} />
      </div>
    </div>
  )
}

export default AdminUsers
