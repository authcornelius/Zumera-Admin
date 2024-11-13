import { Button, Form, Input, message, Select, Spin } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleCareerQuery, useUpdateSingleJobMutation } from "../../redux/slice/careerApiSlice";
import { useEffect, useState } from "react";


function ViewJob() {
    const Navigate = useNavigate();
    const params = useParams();
    const [form] = Form.useForm()
    const [isEditing, setIsEditing] = useState(false);
    
    const {data: jobData, isFetching} = useGetSingleCareerQuery(params.id);

    const [ updateSingleJob, { isLoading } ] = useUpdateSingleJobMutation();

    const handleSubmit = async (values) => {
        console.log(values);
        
        try {
            const payload = {
                id: params.id,
                [values.department]: {
                    title: values.title,
                    description: values.description,
                    requirements: values.requirements,
                    skill: values.skill
                }
            };
            console.log(payload);
            
            
            const res = await updateSingleJob(payload).unwrap();
            console.log(res);
            message.success(res.message)
            setIsEditing(false);
            Navigate(-1);
            
        } catch (error) {
            console.error('Failed to update job:', error);
        }
    };

    const getInitialValues = (jobData) => {
        const departmentKey = Object.keys(jobData)[0];
        const jobDetails = jobData[departmentKey];
        return {
            department: departmentKey.toLowerCase(),
            title: jobDetails.title,
            description: jobDetails.description,
            requirements: jobDetails.requirements,
            skill: jobDetails.skill
        };
    };

    useEffect(() => {
        // If editing existing job, set form values
        if (jobData) {
            const initialValues = getInitialValues(jobData);
            form.setFieldsValue(initialValues);
        }
    }, [jobData]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset form to original values
        if (jobData) {
            const initialValues = getInitialValues(jobData);
            form.setFieldsValue(initialValues);
        }
    };
    

  return (
    <Spin spinning={isFetching}>
        <div>
            <div className="flex justify-between items-center my-5">
                <h1 className="text-sm md:text-2xl font-semibold">View job</h1>

                <div className="space-x-2">
                    <Button type="primary" className="bg-[#8d0a1f] hover:!bg-[#8d0a20da]" onClick={() => Navigate(-1)}>
                        Go Back
                    </Button>
                </div>
            </div>

            <div>
                <Form
                    form={form}
                    layout="vertical"
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-5 lg:gap-x-10 gap-y-1 my-10 "
                    onFinish={handleSubmit}
                >
                    <FormItem
                        label="Title"
                        className="col-span-2 md:col-span-1"
                        name="title"
                        rules={
                            [{ 
                                required: true, 
                                message: 'Please input title!' 
                            }]
                        }    
                    >
                        <Input disabled={!isEditing} />
                    </FormItem>

                    <FormItem
                        label="Department"
                        className="col-span-2 md:col-span-1"
                        name="department"
                        rules={
                            [{
                                required: true,
                                message: 'Please input department!'
                            }]
                        }
                    >
                        <Select disabled={!isEditing} >
                            <Select.Option value="accounting-and-finance">Accounting and Finance</Select.Option>
                            <Select.Option value="architecture-and-designs">Architecture and Designs</Select.Option>
                            <Select.Option value="civil-engineering">Civil Engineering</Select.Option>
                            <Select.Option value="cooperate-attorneys">Cooperate Attorneys</Select.Option>
                            <Select.Option value="human-resources">Human Resource</Select.Option>
                            <Select.Option value="operations">Operations</Select.Option>
                            <Select.Option value="procurements">Procurements</Select.Option>
                            <Select.Option value="project-manager-executive">Project Manager Executive</Select.Option>
                            <Select.Option value="sales-executive">Sales Executive</Select.Option>
                        </Select>
                    </FormItem>

                    <FormItem
                        label="Qualities we look out for"
                        className="col-span-2 md:col-span-1"
                        name="skill"
                        rules={
                            [{
                                required: true,
                                message: 'Please input qualities we look out for!'
                            }]
                        }
                    >
                        <TextArea 
                            disabled={!isEditing}
                            className="!h-20" 
                            defaultValue="• "
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    const value = e.target.value;
                                    e.target.value = value + '\n• ';
                                }
                            }}
                            onFocus={(e) => {
                                if (!e.target.value) {
                                    e.target.value = '• ';
                                }
                            }}
                            onChange={(e) => {
                                if (!e.target.value) {
                                    e.target.value = '• ';
                                }
                            }}
                        />
                    </FormItem>

                    <FormItem
                        label="Requirements:"
                        className="col-span-2 md:col-span-1"
                        name="requirements"
                        rules={
                            [{
                                required: true,
                                message: 'Please input requirements!'
                            }]
                        }
                    >
                        <TextArea className="!h-20" disabled={!isEditing} />
                    </FormItem>

                    <FormItem
                        label="Description"
                        className="col-span-2"
                        name="description"
                        rules={
                            [{
                                required: true,
                                message: 'Please input description!'
                            }]
                        }
                    >
                        <TextArea className="!h-20" disabled={!isEditing} />
                    </FormItem>

                    <FormItem className="col-span-2 flex justify-end space-x-2">
                        {!isEditing ? (
                            <Button
                                type="primary" 
                                className="bg-[#8d0a1f] hover:!bg-[#8d0a20da]"
                                onClick={handleEdit}
                            >
                                Edit
                            </Button>
                        ) : (
                            <div className="flex space-x-4">
                                <Button
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="primary" 
                                    className="bg-[#8d0a1f] hover:!bg-[#8d0a20da]"
                                    htmlType="submit"
                                    loading={isLoading}
                                >
                                    Update
                                </Button>
                            </div>
                        )}
                    </FormItem>
                </Form>
            </div>
        </div>
    </Spin>
  )
}

export default ViewJob