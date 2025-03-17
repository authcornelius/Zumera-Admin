import { message, Modal } from 'antd';
import { Button } from 'antd';
import { useDeleteSingleCareerMutation, useGetSingleCareerQuery } from '../../../redux/slice/careerApiSlice';
import { errorCheck } from '../../../utils/utils';

function DeleteModal({ 
  deleteModalOpen, 
  setDeleteModalOpen, 
  title = 'Delete Confirmation',
  id,
  jobData
}) {

  console.log(id);
  
  const { data: singleJob } = useGetSingleCareerQuery(id);
  console.log(singleJob);
  

  const jobDetails = jobData?.ArchitectureAndDesigns || jobData?.CooperateAttorneys || jobData?.AccountingAndFinances || jobData?.CivilEngineerings || jobData?.Hrs || jobData?.Operations || jobData?.Procurements || jobData?.SalesExecutive;
  
  const [deleteSingleCareer, { isLoading }] = useDeleteSingleCareerMutation();


  const handleDelete = async () => {
    try {
      const res = await deleteSingleCareer({job_slug: id}).unwrap();
      message.success(res.message)
      setDeleteModalOpen(false);
    } catch (error) {
      errorCheck(error);
    }
  };

  return (
    <Modal
      title={title}
      open={deleteModalOpen}
      onCancel={() => setDeleteModalOpen(false)}
      footer={[
        <Button 
          key="cancel" 
          onClick={() => setDeleteModalOpen(false)}
          disabled={isLoading}
        >
          Cancel
        </Button>,
        <Button 
          key="delete" 
          type="primary" 
          danger 
          loading={isLoading}
          onClick={handleDelete}
        >
          Delete
        </Button>
      ]}
      centered
    >
      <p>`Are you sure you want to delete {<span className='font-semibold'>{jobDetails?.title}</span>}? This action cannot be <span className='font-semibold'>undone</span>.`</p>
    </Modal>
  );
}

export default DeleteModal;
