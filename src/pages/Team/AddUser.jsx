import { Button, Form, Input, message, Select } from "antd"
import FormItem from "antd/es/form/FormItem"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCreateUserMutation } from "../../redux/slice/userApiSlice";
import { errorCheck } from "../../utils/utils";


function AddUser() {
    const Navigate = useNavigate()

    const [createUser] = useCreateUserMutation()
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const res = await createUser(values).unwrap();
            message.success(res.message);
            Navigate('/team');
        } catch (error) {
            errorCheck(error);
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div className="px-5">
            <div className="flex justify-between items-center my-5">
                <h1 className="text-2xl font-semibold">Add Team Member</h1>

                <Button type="primary" className="bg-[#8d0a1f] hover:!bg-[#8d0a20da]" onClick={() => Navigate(-1)}>
                    Go Back
                </Button>
            </div>

            <div className="bg-white p-5 rounded-lg">
                <Form
                    layout="vertical"
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-10"
                    onFinish={handleSubmit}
                >
                    <FormItem
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: 'Please input first name!' }]}
                    >
                        <Input />
                    </FormItem>

                    <FormItem
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: 'Please input last name!' }]}
                    >
                        <Input />
                    </FormItem>

                    <FormItem
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input email!' },
                            { type: 'email', message: 'Please enter valid email!' }
                        ]}
                    >
                        <Input />
                    </FormItem>

                    <FormItem
                        label="Role"
                        name="role"
                        rules={[{ required: true, message: 'Please select role!' }]}
                    >
                        <Select>
                            <Select.Option value="admin">Admin</Select.Option>
                            <Select.Option value="moderator">Moderator</Select.Option>
                            <Select.Option value="user">User</Select.Option>
                        </Select>
                    </FormItem>

                    <FormItem
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input password!' }]}
                    >
                        <Input.Password />
                    </FormItem>

                    <FormItem
                        label="Confirm Password"
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Please confirm password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </FormItem>

                    <FormItem className="col-span-full flex justify-end">
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            className="bg-[#8d0a1f] hover:!bg-[#8d0a20da]"
                            loading={loading}
                        >
                            Save
                        </Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    )
}

export default AddUser
