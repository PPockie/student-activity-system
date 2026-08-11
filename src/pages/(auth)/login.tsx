import { useState } from 'react'
import { Alert, Button, Checkbox, Input } from 'antd'
import { Lock, UserRound } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hook/auth-context'
import { DEMO_CREDENTIALS } from '../../mocks/accounts'
import { loginSchema } from '../../utils/schemas/auth'
import { ROLE_HOME, ROLE_LABEL } from '../../utils/roles'

type FieldErrors = Partial<Record<'identifier' | 'password', string>>

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  /** หน้าที่ผู้ใช้พยายามเข้าก่อนโดนเด้งมา login */
  const from = (location.state as { from?: string } | null)?.from
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError(null)

    const parsed = loginSchema.safeParse({ identifier, password, remember })
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {}
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof FieldErrors
        if (field && !fieldErrors[field]) fieldErrors[field] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setSubmitting(true)
    try {
      const user = await login(parsed.data)
      navigate(from ?? ROLE_HOME[user.role], { replace: true })
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">เข้าสู่ระบบ</h1>
        <p className="text-ink-500 mt-1 text-sm">กรอกข้อมูลเพื่อเข้าใช้งานระบบ</p>
      </div>

      {formError && (
        <Alert
          className="mb-5"
          type="error"
          title={formError}
          showIcon
          closable={{ onClose: () => setFormError(null) }}
        />
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label htmlFor="identifier" className="text-ink-700 mb-1.5 block text-sm font-medium">
            อีเมล หรือ รหัสนักศึกษา
          </label>
          <Input
            id="identifier"
            name="identifier"
            size="large"
            inputMode="email"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            status={errors.identifier ? 'error' : undefined}
            prefix={<UserRound className="text-ink-400 size-4.5" />}
            placeholder="example@email.com หรือ 12345678"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
          />
          {errors.identifier && <p className="text-danger mt-1.5 text-xs">{errors.identifier}</p>}
        </div>

        <div>
          <label htmlFor="password" className="text-ink-700 mb-1.5 block text-sm font-medium">
            รหัสผ่าน
          </label>
          <Input.Password
            id="password"
            name="password"
            size="large"
            autoComplete="current-password"
            status={errors.password ? 'error' : undefined}
            prefix={<Lock className="text-ink-400 size-4.5" />}
            placeholder="กรอกรหัสผ่าน"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {errors.password && <p className="text-danger mt-1.5 text-xs">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between">
          <Checkbox checked={remember} onChange={(event) => setRemember(event.target.checked)}>
            <span className="text-ink-600 text-sm">จดจำการเข้าสู่ระบบ</span>
          </Checkbox>
          <Link to="/forgot-password" className="text-primary text-sm font-medium hover:underline">
            ลืมรหัสผ่าน?
          </Link>
        </div>

        <Button type="primary" htmlType="submit" size="large" block loading={submitting}>
          เข้าสู่ระบบ
        </Button>
      </form>

      {import.meta.env.DEV && (
        <div className="border-ink-100 bg-surface mt-6 rounded-xl border p-3">
          <p className="text-ink-500 mb-2 text-xs font-medium">บัญชีทดสอบ (กดเพื่อกรอกอัตโนมัติ)</p>
          <ul className="space-y-1">
            {DEMO_CREDENTIALS.map((account) => (
              <li key={account.identifier}>
                <button
                  type="button"
                  onClick={() => {
                    setIdentifier(account.identifier)
                    setPassword(account.password)
                  }}
                  className="hover:bg-primary-50 flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left text-xs"
                >
                  <span className="text-primary-700 font-medium">{ROLE_LABEL[account.role]}</span>
                  <span className="text-ink-500 truncate">
                    {account.identifier} / {account.password}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-ink-500 mt-6 text-center text-sm">
        ยังไม่มีบัญชี?{' '}
        <Link to="/register" className="text-primary font-medium hover:underline">
          ลงทะเบียนนักศึกษา
        </Link>
      </p>
    </>
  )
}

export default Login
