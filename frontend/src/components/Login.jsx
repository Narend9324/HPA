import { Form, Input, Button, Checkbox, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', values);
      console.log('response:', response);
      if (response.status === 200) {
        const token = response.data.token;
        const userId = response.data.userInfo.id;
        console.log('token:', token);
        
        // Store the token in localStorage
        localStorage.setItem('userId', userId);
        localStorage.setItem('accessToken', token);

        // Update auth context (if using it)
        login(token);
        message.success('Login successful!');
        navigate('/dashboard'); // Redirect to dashboard after successful login
      }
    } catch (error) {
      message.error('Login failed. Please check your credentials.');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Failed to submit form!');
  };

  return (
    <div className="md:min-h-screen max-h-screen flex flex-col md:flex-row">
      {/* Left Section for the Logo, Form, and Copyright */}
      <div className="flex-1 flex flex-col justify-between px-8 md:px-24 py-12">
        {/* Top Section (Logo) */}
        <div className="flex justify-start">
          <img src="Logo.svg" alt="Logo" className="h-12" />
        </div>

        {/* Middle Section (Form) */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md ">
            <h2 className="text-3xl font-semibold mb-4">Log in</h2>
            <p className="mb-6 text-gray-500">Welcome back! Please enter your details.</p>
            <Form
              name="login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <p className='input-field'>Email</p>
              <Form.Item
                name="adminEmail"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input placeholder="Enter your email" className="mb-4 !py-2" />
              </Form.Item>

              <p className='input-field'>Password</p>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder="Enter your password" className="mb-4 !py-2" />
              </Form.Item>

              <div className="flex justify-between mb-6">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember for 30 days</Checkbox>
                </Form.Item>
                <a href="/forgot-password" className="text-blue-500">Forgot password?</a>
              </div>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full mb-4 !bg-[#0C1F3D] !rounded-full !py-6 !font-bold">
                  Sign in
                </Button>
              </Form.Item>
            </Form>
            <p className="text-center text-gray-500">
              New to HPA? <a href="/signup" className="text-blue-500">Create Account now</a>
            </p>
          </div>
        </div>

        {/* Bottom Section (Copyright) */}
        <div className="flex justify-start">
          <p className="text-center text-gray-400 text-sm">
            © Copyright Health Provider Assist | ABN: 49 653 279 657
          </p>
        </div>
      </div>

      {/* Right Section for SVG */}
      <div className="flex-1 flex items-center justify-center ">
        <img src="Section.svg" alt="SVG" className="w-full rounded-l-4xl" />
      </div>
    </div>
  );
};

export default Login;
