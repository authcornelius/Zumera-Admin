import { Button, Spin } from "antd"
import { BiEditAlt } from "react-icons/bi"
import { IoEyeSharp } from "react-icons/io5"
import { MdDelete } from "react-icons/md"
import { Link } from "react-router-dom"
import { useGetCareerQuery } from "../../redux/slice/careerApiSlice"
import { useState } from "react"
import DeleteModal from "./modal/deleteModal"

function CareerTable() {
    const {data: allJob, isLoading} = useGetCareerQuery()
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [selectedId, setSelectedId] = useState(null)
    const [selectedJob, setSelectedJob] = useState(null)
    

    // Function to get all jobs from different departments
    const getAllJobs = () => {

        if (!allJob) return []
        
        return Object.entries(allJob).flatMap(([department, jobs]) => 
            jobs.map(job => ({
                ...job,
                department: department.replace(/([A-Z])/g, ' $1').trim()
            }))
        )
    }

    const jobs = getAllJobs()

    if (isLoading) {
        return (
          <div className="flex justify-center items-center h-[70vh]">
            <Spin size='large' />
          </div>
        );
    }
    
    return (
        <Spin spinning={isLoading}>
            <div className="px-5">
                <div className="flex justify-between items-center my-5">
                    <h1 className="text-2xl font-semibold">Available Jobs</h1>

                    <Link to="/career/add-job">
                        <Button type="primary" className="bg-[#8d0a1f] hover:!bg-[#8d0a20da]">
                            Post Job
                        </Button>
                    </Link>
                </div>

                <div className="my-20">
                    {jobs.map((job) => (
                        <div key={job._id} className="bg-white my-5 py-5 md:p-5 rounded-lg">
                            <div className="md:flex md:justify-between items-center">
                                <div>
                                    <h1 className="text-xl font-semibold">{job.title}</h1>
                                    <p className="text-gray-500">{job.department}</p>
                                </div>

                                <div className="flex space-x-3 mt-5 md:mt-0">
                                    <Link to={`/career/edit-job/${job._id}`}>
                                        <div className="border border-[#8d0a1f] rounded-md p-2 cursor-pointer">
                                            <BiEditAlt className="text-[#8d0a1f]"/>
                                        </div>
                                    </Link>

                                    <div className="border border-[#8d0a1f] rounded-md p-2 cursor-pointer">
                                        <IoEyeSharp className="text-[#8d0a1f]"/>
                                    </div>

                                    <div 
                                        className="border border-[#8d0a1f] rounded-md p-2 cursor-pointer"
                                        onClick={() => {
                                            setDeleteModalOpen(true);
                                            setSelectedId(job._id);
                                            setSelectedJob({[job.department.replace(/\s/g, '')]: job});
                                        }}
                                    >
                                        <MdDelete className="text-[#8d0a1f]"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {deleteModalOpen && (
                    <DeleteModal
                        deleteModalOpen={deleteModalOpen}
                        setDeleteModalOpen={setDeleteModalOpen}
                        title="Delete Job Position"
                        id={selectedId}
                        jobData={selectedJob}
                    /> 
                )}
            </div>
        </Spin>
    )
}

export default CareerTable
