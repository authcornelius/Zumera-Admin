import '../styles/login.css'
import { Button, Form, Input, message } from "antd"
import Logo from '/logo.png'
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
        navigate('/dashboard')
    } catch (error) {
        errorCheck(error);
    }
  }
  return (
    <div 
      className=''
      style={{ backgroundImage: `url(${BgImg})` }}
    >
      <div className="flex items-center justify-center h-screen">
        <h1>Hello</h1>
      </div>


      
      {/* <div className="grid justify-center items-center lg:pt-10 2xl:pt-20">
        <img src={Logo} alt="" className=" w-40 justify-center" />
      </div> */}

      {/* <div className=" py-10">
        <h1 className="text-2xl text-blue-500 mb-3">Sign in</h1>
        <p>Enter your staff id and password to access account</p>
      </div> */}

      {/* <Form
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Enter your username"
          name="staff_id"
          rules={[
            {
              required: true,
              message: 'Please enter your username',
            },
          ]}
        >
          <Input placeholder="Username" className="py-3"/>
        </Form.Item>

        <Form.Item
          label="Enter your password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter your password!',
            },
          ]}
        >
          <Input.Password placeholder="Password" className="py-3"/>
        </Form.Item>

        <Form.Item>
          <Button loading={isLoading} type="primary" htmlType="submit" className="w-full !py-3 !h-auto">
            Submit
          </Button>
        </Form.Item>
      </Form> */}
    </div>
  )
}

export default Login