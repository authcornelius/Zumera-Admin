import '../styles/login.css'
import { Button, Checkbox, Form, Image, Input, message } from "antd"
import Logo from '/zumera-logo-red.png'
import { errorCheck } from "../utils/utils";
import { useLoginMutation } from "../redux/slice/authApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slice/userSlice";
import BgImg from "/photoshoped7.jpg"

function Login() {

  const [login, {isLoading}] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate()


  const onFinish = async(values) => {
    try {
        const res = await login(values).unwrap();
        message.success(res.message);
        dispatch(setCredentials({...res}));
        navigate('/overview')
    } catch (error) {
        errorCheck(error);
    }
  }
  return (
    <div 
      className='flex items-center justify-center h-screen'
      style={{ backgroundImage: `url(${BgImg})` }}
    >
      <div className="bg-white mx-2 px-2 md:px-10 rounded-2xl">
        <div className='grid place-items-center p-10 container'>
          <Image
            width={200}
            src={Logo}
          />

          <h1 className='pt-5 font-semibold text-lg'>Welcome to zumera admin panel</h1>
        </div>

        <Form
          layout='vertical'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* <Form.Item
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item
            className='border'
            
          >
            <Button type="primary" htmlType="submit" loading={isLoading} className='w-full'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login