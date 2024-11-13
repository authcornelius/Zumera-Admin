import { Button, Form, Input, message, Select } from "antd"
import FormItem from "antd/es/form/FormItem"
import TextArea from "antd/es/input/TextArea"
import { useNavigate } from "react-router-dom"
import { useAddAccountingJobMutation, useAddArchitectureJobMutation, useAddCivilEngineeringJobMutation, useAddCooperateAttorneyJobMutation, useAddHrsJobMutation, useAddOperationsJobMutation, useAddProcurementJobMutation, useAddProjectManagerJobMutation, useAddSalesExecutiveJobMutation } from "../../redux/slice/careerApiSlice";
import { errorCheck } from "../../utils/utils";

function AddJob() {
    const Navigate = useNavigate();

    const [addArchitectureJob, { isLoading: architectureLoading }] = useAddArchitectureJobMutation();
    const [addAccountingJob, { isLoading: accountingLoading }] = useAddAccountingJobMutation();
    const [addCivilEngineeringJob, { isLoading: civilEngineeringLoading}] = useAddCivilEngineeringJobMutation();
    const [addHrsJob, { isLoading: hrLoading }] = useAddHrsJobMutation();
    const [addOperationsJob, { isLoading: operationsLoading }] = useAddOperationsJobMutation();
    const [addProcurementJob, { isLoading: procurementLoading }] = useAddProcurementJobMutation();
    const [addProjectManagerJob, { isLoading: projectManagerLoading }] = useAddProjectManagerJobMutation();
    const [addSalesExecutiveJob, { isLoading: salesExecutiveLoading }] = useAddSalesExecutiveJobMutation();
    const [addCooperateAttorneyJob, { isLoading: cooperateAttorneysLoading }] = useAddCooperateAttorneyJobMutation();


    const isSubmitting = architectureLoading || accountingLoading || civilEngineeringLoading || hrLoading || operationsLoading || procurementLoading || projectManagerLoading || salesExecutiveLoading || cooperateAttorneysLoading;

    const handleSubmit = async (values) => {
        const selectedDepartment = values.department;

        const { department, ...postData } = values;

        try {
            if (selectedDepartment === 'architecture-and-designs') {
                const res = await addArchitectureJob(postData).unwrap();
                message.success(res.message);
            } else if (selectedDepartment === 'accounting-and-finance') {
                const res = await addAccountingJob(postData).unwrap();
                message.success(res.message);
            } else if (selectedDepartment === 'civil-engineering') {
                const res = await addCivilEngineeringJob(postData).unwrap();
                message.success(res.message);
            } else if (selectedDepartment === 'human-resources') {
                const res = await addHrsJob(postData).unwrap();
                message.success(res.message);
            } else if (selectedDepartment === 'operations') {
                const res = await addOperationsJob(postData).unwrap();
                message.success(res.message);
            } else if (selectedDepartment === 'procurements') {
                const res = await addProcurementJob(postData).unwrap();
                message.success(res.message);
            } else if (selectedDepartment === 'project-manager-executive') {
                const res = await addProjectManagerJob(postData).unwrap();
                message.success(res.message);
            } else if (selectedDepartment === 'sales-executive') {
                const res = await addSalesExecutiveJob(postData).unwrap();
                message.success(res.message);
            } else if (selectedDepartment === 'cooperate-attorneys') {
                const res = await addCooperateAttorneyJob(postData).unwrap();
                message.success(res.message);
            } else {
                message.error('Invalid department selected.');
            }
            Navigate(-1);
        } catch (error) {
            errorCheck(error);
        }
    }

  return (
    <div className="px-5">
        <div className="flex justify-between items-center my-5">
            <h1 className="text-sm md:text-2xl font-semibold">Post new job</h1>

            <div className="space-x-2">
                <Button type="primary" className="bg-[#8d0a1f] hover:!bg-[#8d0a20da]" onClick={() => Navigate(-1)}>
                    Go Back
                </Button>
            </div>
        </div>

        <div>
            <Form
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
                    <Input />
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
                    <Select>
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
                    <TextArea className="!h-20" />
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
                    <TextArea className="!h-20" />
                </FormItem>

                <FormItem 
                    className="col-span-2 flex justify-end"
                >
                    <Button 
                        type="primary" 
                        className="bg-[#8d0a1f] hover:!bg-[#8d0a20da]"
                        htmlType="submit"
                        loading={isSubmitting}
                    >
                        Publish
                    </Button>
                </FormItem>
            </Form>
        </div>
    </div>
  )
}

export default AddJob