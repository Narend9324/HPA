import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useState } from 'react';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State to store error message

  const onFinish = async (values) => {
    setLoading(true);
    setErrorMessage(''); // Reset error message on submit

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        companyName: values.companyName,
        adminName: values.adminName,
        adminEmail: values.email,
        password: values.password,
      });

      // Show success message and redirect to login page
      message.success('Registration successful!');
      window.location.href = '/login';
    } catch (error) {
      // Handle error response
      if (error.response && error.response.status === 400) {
        // Display specific error message from backend
        setErrorMessage(error.response.data.message);
      } else {
        // Display a generic error message
        setErrorMessage('Something went wrong, please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="md:min-h-screen max-h-screen flex flex-col md:flex-row">
      {/* Left Section for the Logo, Form, and Copyright */}
      <div className="flex-1 flex flex-col justify-between px-8 md:px-24 py-12">
        {/* Top Section (Logo) */}
        <div className="flex justify-start">
          <img src="/Logo.svg" alt="Logo" className="h-12" />
        </div>

        {/* Middle Section (Form) */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-semibold mb-6">Create Account</h2>
            <p className="mb-6 text-gray-500">Sign up to access all that HPA has to offer</p>
            <Form
              name="signup"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <p className="input-field">Company Name</p>
              <Form.Item
                name="companyName"
                rules={[{ required: true, message: 'Please input your Company Name!' }]}
              >
                <Input placeholder="Enter your Company Name" className="mb-4 !py-2" />
              </Form.Item>

              <p className="input-field">Admin Full Name</p>
              <Form.Item
                name="adminName"
                rules={[{ required: true, message: 'Please input Admin Full Name!' }]}
              >
                <Input placeholder="Enter your Admin Full Name" className="mb-4 !py-2" />
              </Form.Item>

              <p className="input-field">Admin Email</p>
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input Admin Email!' }]}
              >
                <Input placeholder="Enter your Admin Email" className="mb-4 !py-2" />
              </Form.Item>

              <p className="input-field">Admin Password</p>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder="Enter your password" className="mb-6 !py-2" />
              </Form.Item>

              {/* Show error message if there's any */}
              {errorMessage && (
                <p className="text-red-500 mb-4">{errorMessage}</p>
              )}

              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full mb-4 !bg-[#0C1F3D] !rounded-full !py-6 !font-bold" loading={loading}>
                  Sign Up
                </Button>
              </Form.Item>

              <div className="text-center">
                <span>Already have an account?</span>
                <a href="/login" className="text-blue-500"> Log in</a>
              </div>
            </Form>
          </div>
        </div>

        {/* Bottom Section (Copyright) */}
        <div className="flex justify-start">
          <p className="text-center text-gray-400 text-sm">
            © Copyright Health Provider Assist | ABN: 49 653 279 657
          </p>
        </div>
      </div>

      {/* Right Section for SVG with Left Side Rounded */}
      <div className="flex-1 max-h-full flex items-center justify-center">
        <img src="/Section.svg" alt="SVG" className="w-full rounded-l-4xl" />
      </div>
    </div>
  );
};

export default Signup;
