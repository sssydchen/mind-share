import React, { useState } from 'react'
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Segmented,
} from 'antd'
import {
  ALPHANUMERIC_UNDERSCORE,
  ALPHANUMERIC_UNDERSCORE_CHINESE,
  PASSWORD_ALLOWABLE_CHARACTERS,
  EMAIL_PATTERN,
} from '../../../base/regex'
import { useLogin } from '../hooks/useLogin.ts'
import { useRegister } from '../hooks/useRegister.ts'
import { userService } from '../service/userService.ts'
import { useForm } from 'antd/es/form/Form'
import CountDownButton from '@/domain/user/components/CountDownButton.tsx'

const LoginModal: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('login')
  const [loading, setLoading] = useState(false)

  const { loginHandle } = useLogin()
  const { registerHandle } = useRegister()

  const [form] = useForm()

  // Send Code
  const handleSendVerifyCode = async () => {
    try {
      await form.validateFields(['email'])
      const email = form.getFieldValue('email')
      if (!email) {
        message.error('Enter your email')
        return false
      }
      setLoading(true)
      await userService.sendVerifyCode({ email, type: 'REGISTER' })
      message.success('Verification code sent')
      return true
    } catch (e: any) {
      message.error(e.message || 'Failed to send')
      return false
    } finally {
      setLoading(false)
    }
  }

  async function onFinish(values: any) {
    try {
      setLoading(true)
      if (value === 'login') {
        await loginHandle(values)
        message.success('Logged in successfully')
      } else if (value === 'register') {
        await registerHandle(values)
        message.success('Registration successful')
      }
      setOpen(false)
    } catch (e: any) {
      message.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  const LoginForm = () => {
    return (
      <Form
        name="loginForm"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        style={{ minWidth: '100%' }}
        autoComplete={'off'}
        layout={'vertical'}
        form={form}
      >
        {value === 'login' && (
          <Form.Item
            label="Account or Email"
            name={form.getFieldValue('email') ? 'email' : 'account'}
            rules={[
              { required: true, message: 'Enter your account or email' },
              {
                pattern: form.getFieldValue('email')
                  ? EMAIL_PATTERN
                  : ALPHANUMERIC_UNDERSCORE,
                message: form.getFieldValue('email')
                  ? 'Invalid email format'
                  : 'Account can only contain letters, numbers, and underscores',
              },
            ]}
          >
            <Input
              autoComplete="off"
              onChange={(e) => {
                // Switch between email and account fields based on input.
                const value = e.target.value
                if (value.includes('@')) {
                  form.setFieldsValue({ email: value, account: undefined })
                } else {
                  form.setFieldsValue({ account: value, email: undefined })
                }
              }}
            />
          </Form.Item>
        )}

        {value === 'register' && (
          <>
            <Form.Item
              label="Account"
              name="account"
              rules={[
                { required: true, message: 'Enter your account' },
                {
                  pattern: ALPHANUMERIC_UNDERSCORE,
                  message:
                    'Account can only contain letters, numbers, and underscores',
                },
                {
                  min: 6,
                  max: 16,
                  message: 'Account length must be 6-16 characters',
                },
              ]}
            >
              <Input autoComplete="off" />
            </Form.Item>
            <Form.Item
              label="Display Name"
              name="username"
              rules={[
                { required: true, message: 'Enter a display name' },
                {
                  pattern: ALPHANUMERIC_UNDERSCORE_CHINESE,
                  message:
                    'Display name can only contain letters, numbers, underscores, hyphens, dots, and Chinese characters',
                },
                {
                  min: 1,
                  max: 16,
                  message: 'Display name must be 1-16 characters',
                },
              ]}
            >
              <Input autoComplete={'off'} />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Enter your email' },
                { type: 'email', message: 'Invalid email format' },
              ]}
            >
              <Input autoComplete="off" />
            </Form.Item>
            <Row gutter={8} align="middle">
              <Col flex="auto">
                <Form.Item
                  label="Verification Code"
                  name="verifyCode"
                  rules={[
                    { required: true, message: 'Enter the verification code' },
                    { len: 6, message: 'Verification code must be 6 digits' },
                  ]}
                >
                  <Input autoComplete="off" />
                </Form.Item>
              </Col>
              <Col>
                <CountDownButton handleSendVerifyCode={handleSendVerifyCode} />
              </Col>
            </Row>
          </>
        )}

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Enter your password' },
            {
              pattern: PASSWORD_ALLOWABLE_CHARACTERS,
              message: 'Password contains unsupported characters',
            },
            {
              min: 8,
              max: 16,
              message: 'Password length must be 8-16 characters',
            },
          ]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          {value === 'register' ? 'Sign Up' : 'Login'}
        </Button>
      </Form>
    )
  }

  return (
    <div className="cursor-pointer">
      <Avatar size={36} onClick={() => setOpen(true)}>
        <span className="flex items-center text-xs">Login</span>
      </Avatar>
      <Modal
        title={'Login / Sign Up'}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <div className="mt-4">
          <Segmented
            block
            options={[
              {
                label: 'Login',
                value: 'login',
              },
              {
                label: 'Sign Up',
                value: 'register',
              },
            ]}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </div>
        <div className="mt-4 flex justify-center pb-4">
          <LoginForm />
        </div>
      </Modal>
    </div>
  )
}

export default LoginModal
