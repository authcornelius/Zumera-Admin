import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload } from 'antd'
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPreviewData } from '../../redux/slice/blogSlice';

function AddBlog() {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [form] = Form.useForm();


    const handlePreview = (values) => {
        dispatch(setPreviewData(values));
        Navigate('/blog/preview-blog-post');
    };

  return (
    <div className='px-5'>
        <div className="flex justify-between items-center my-5">
            <h1 className="text-sm md:text-2xl font-semibold">Make a Blog Post</h1>

            <div className="space-x-2">
                <Button type="primary" className="bg-[#8d0a1f] hover:!bg-[#8d0a20da]" onClick={() => Navigate(-1)}>
                    Go Back
                </Button>
            </div>
        </div>

        <div>
            <Form
                form={form}
                layout='vertical'
                className='grid grid-col-1 md:grid-cols-3 gap-4'
                onFinish={handlePreview}
            >
                <FormItem
                    label="Title"
                    name="title"
                    className='col-span-full'
                    rules={
                        [{
                            required: true,
                            message: 'Blog title field is compulsory'
                        }]
                    }
                >
                    <Input />
                </FormItem>

                <FormItem
                    label="First Paragraph"
                    name="paragraph1"
                    rules={
                        [{
                            required: true,
                            message: 'First paragraph field is compulsory'
                        }]
                    }
                >
                    <TextArea className='!h-28' />
                </FormItem>

                <FormItem
                    label="Second Paragraph"
                    name="paragraph2"
                    rules={
                        [{
                            required: true,
                            message: 'Second paragraph field is compulsory'
                        }]
                    }
                >
                    <TextArea className='!h-28' />
                </FormItem>

                <FormItem
                    label="Third Paragraph"
                    name="paragraph3"
                    rules={
                        [{
                            required: true,
                            message: 'Third paragraph field is compulsory'
                        }]
                    }
                >
                    <TextArea className='!h-28' />
                </FormItem>

                <FormItem
                    label="First Image"
                    name="image1"
                    rules={
                        [{
                           required: true,
                           message: 'First image is compulsory' 
                        }]
                    }
                >
                    <Upload>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </FormItem>

                <FormItem
                    label="Second Image"
                    name="image2"
                >
                    <Upload>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </FormItem>

                <FormItem
                    label="Third Image"
                    name="image3"
                >
                    <Upload>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </FormItem>

                <FormItem
                    label="URL 1"
                    name="url1"
                    rules={
                        [{
                            type: 'url',
                            message: 'Please enter a valid URL'
                        }]
                    }
                >
                    <Input />
                </FormItem>

                <FormItem
                    label="URL 2"
                    name="url2"
                    rules={
                        [{
                            type: 'url',
                            message: 'Please enter a valid URL'
                        }]
                    }
                >
                    <Input />
                </FormItem>

                <FormItem
                    label="URL 3"
                    name="url3"
                    rules={
                        [{
                            type: 'url',
                            message: 'Please enter a valid URL'
                        }]
                    }
                >
                    <Input />
                </FormItem>

                <div className='col-span-full text-end flex justify-end space-x-4'>
                        <FormItem 
                            className="col-span-2 flex justify-end"
                        >
                            <Button 
                                type="primary" 
                                className="border-[#8d0a1f] hover:!border-[#8d0a20da] hover:!bg-transparent hover:!text-[#8d0a20da] bg-transparent text-[#8d0a20da]"
                                // htmlType="submit"
                                // loading={isSubmitting}
                            >
                                Cancel
                            </Button>
                        </FormItem>

                        <FormItem 
                            className="col-span-2 flex justify-end"
                        >
                            <Button 
                                type="primary" 
                                className="bg-[#8d0a1f] hover:!bg-[#8d0a20da]"
                                htmlType="submit"
                            >
                                Preview
                            </Button>
                        </FormItem>
                </div>
            </Form>
        </div>
    </div>
  )
}

export default AddBlog