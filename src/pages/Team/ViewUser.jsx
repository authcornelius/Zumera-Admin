import { Button, Form, Input, message, Select, Spin } from "antd"
import FormItem from "antd/es/form/FormItem"
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleUserQuery, useUpdateUserMutation } from "../../redux/slice/userApiSlice";
import { useEffect, useState } from "react";

function ViewUser() {
    const Navigate = useNavigate()
    const params = useParams()
    const [form] = Form.useForm()
    const [isEditing, setIsEditing] = useState(false)
    const [loading, setLoading] = useState(false);
    
    const {data, isLoading} = useGetSingleUserQuery(params.id)
    const [updateUser] = useUpdateUserMutation()


    useEffect(() => {
        if(data) {
            form.setFieldsValue({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                role: data.role
            })
        }
    }, [data, form])
    
    
    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            const res = await updateUser({user_id: params.id, data: values}).unwrap()
            message.success(res.message)
            setIsEditing(false)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <Spin spinning={isLoading}>
            <div className="px-5">
                <div className="flex justify-between items-center my-5">
                    <h1 className="text-sm md:text-2xl font-semibold">View Team Member Detail</h1>

                    <div className="space-x-2">
                        <Button type="primary" className="bg-[#8d0a1f] hover:!bg-[#8d0a20da]" onClick={() => Navigate(-1)}>
                            Go Back
                        </Button>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-lg">
                    <Form
                        layout="vertical"
                        form={form}
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-10"
                        onFinish={handleSubmit}
                    >
                        <FormItem
                            label="First Name"
                            name="firstName"
                            rules={[{ required: true, message: 'Please input first name!' }]}
                        >
                            <Input disabled={!isEditing} />
                        </FormItem>

                        <FormItem
                            label="Last Name"
                            name="lastName"
                            rules={[{ required: true, message: 'Please input last name!' }]}
                        >
                            <Input disabled={!isEditing} />
                        </FormItem>

                        <FormItem
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please input email!' },
                                { type: 'email', message: 'Please enter valid email!' }
                            ]}
                        >
                            <Input disabled={!isEditing} />
                        </FormItem>

                        <FormItem
                            label="Role"
                            name="role"
                            rules={[{ required: true, message: 'Please select role!' }]}
                        >
                            <Select disabled={!isEditing}>
                                <Select.Option value="admin">Admin</Select.Option>
                                <Select.Option value="moderator">Moderator</Select.Option>
                                <Select.Option value="user">User</Select.Option>
                            </Select>
                        </FormItem>

                        <FormItem
                            label="Password"
                            name="password"
                            rules={[{ required: false, message: 'Please input password!' }]}
                        >
                            <Input.Password />
                        </FormItem>

                        <FormItem
                            label="Confirm Password"
                            name="confirmPassword"
                            dependencies={['password']}
                            rules={[
                                { required: false, message: 'Please confirm password!' },
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

                        <FormItem 
                            className="col-span-full flex justify-end"
                        >
                            <div className="space-x-2 flex">
                                <Button 
                                    type="primary" 
                                    className="bg-[#8d0a1f] hover:!bg-[#8d0a20da]"
                                    onClick={() => setIsEditing(!isEditing)}
                                >
                                    {isEditing ? 'Cancel' : 'Edit'}
                                </Button>

                                {isEditing && (
                                    <FormItem className="col-span-full flex justify-end">
                                        <Button 
                                            type="primary" 
                                            htmlType="submit" 
                                            className="bg-[#8d0a1f] hover:!bg-[#8d0a20da]"
                                            loading={loading}
                                        >
                                            Update
                                        </Button>
                                    </FormItem>
                                )}
                            </div>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </Spin>
    )
}

export default ViewUser
