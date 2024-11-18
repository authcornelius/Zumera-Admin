import { Button, Image, Spin } from 'antd'
import { BsPlus } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useGetAllBlogQuery } from '../../redux/slice/blogApiSlice'
import { BiEditAlt } from 'react-icons/bi';
import { IoEyeSharp } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';

function BlogTable() {

  const {data: allblog, isLoading} = useGetAllBlogQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Spin size='large' />
      </div>
    );
  }
  
  return (
    <Spin spinning={isLoading}>
      <div>
          <div className='px-5 my-3 grid grid-cols-2'>
              <div>
                <h1 className='font-medium text-lg md:text-2xl'>Blog</h1>
              </div>

              <div className='flex justify-end'>
                <Link to="/blog/create-blog-post">
                    <Button 
                      type="primary"
                      icon={<BsPlus className='text-2xl p-0 m-0' />} 
                      className='bg-[#8d0a1f] hover:!bg-[#8d0a1f] pr-5'
                    >
                      <span>Create Blog Post</span>
                    </Button>
                </Link>
              </div>
          </div>

          <div className='my-20'>
            {allblog?.map((blog) => (
              <div key={blog._id} className="bg-white my-5 py-5 md:p-5 rounded-lg">
                <div className="md:flex md:justify-between items-center px-5 md:px-0">
                    <div className='!w-full md:!w-52'>
                      <Image src={blog?.cloudinaryUrls[0]} className=' rounded-md' />
                    </div>

                    <div className="md:w-[500px] w-full my-3 font-semibold md:my-0 md:px-5">
                      <p className="text-gray-500">{blog.blogTitle.substring(0, 150)}...</p>
                    </div>

                  <div className="flex space-x-3 mt-5 md:mt-0">
                      <Link>
                          <div className="border border-[#8d0a1f] rounded-md p-2 cursor-pointer">
                              <BiEditAlt className="text-[#8d0a1f]"/>
                          </div>
                      </Link>

                      <div 
                        className="border border-[#8d0a1f] rounded-md p-2 cursor-pointer"
                        // onClick={() => {
                        //     setDeleteModalOpen(true);
                        //     setSelectedId(job._id);
                        //     setSelectedJob({[job.department.replace(/\s/g, '')]: job});
                        // }}
                      >
                        <MdDelete className="text-[#8d0a1f]"/>
                      </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>
    </Spin>
  )
}

export default BlogTable
