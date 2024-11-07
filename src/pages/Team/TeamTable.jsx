import { Button, message, Modal, Table } from "antd"
import { useDeleteUserMutation, useGetUsersQuery } from "../../redux/slice/userApiSlice";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";


function TeamTable() {
    const [ deleteModal, setDeleteModal ] = useState(false)
    const {data, isLoading} = useGetUsersQuery();
    const [ selectedId, setSelectedId ] = useState(null)
    const [loading, setLoading] = useState(false);

    const [deleteUser] = useDeleteUserMutation();

    const dataSource = data;

    const columns = [
        {
            title: "S/N",
            key: "index",
            render: (_, record, index) => index + 1
        },
        {
            title: "Name",
            key: "name",
            render: (_, record) => (
                <span>{`${record.firstName} ${record.lastName}`}</span>
            )
        },        
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Action",
            key: "action",
            render: (record) => (
                <div className="flex space-x-3">
                    <Link to={`/team/${record._id}`}>
                        <Button type="primary" className="border-[#8d0a1f] bg-transparent hover:!border-[#8d0a20da] hover:!bg-transparent p-2">
                            <MdModeEdit size={20} className="text-[#8d0a1f]" />
                        </Button>
                    </Link>

                    <Button 
                        type="primary" 
                        className="border-[#8d0a1f] bg-transparent hover:!border-[#8d0a20da] hover:!bg-transparent p-2"
                        onClick={() =>{ 
                            setDeleteModal(true)
                            setSelectedId(record._id)
                        }}
                    >
                        <MdDelete size={20} className="text-[#8d0a1f]" />
                    </Button>
                </div>
            ),
        },
    ];

    const handleDelete = async () => {

        setLoading(true)
        try {
            const res = await deleteUser({user_id: selectedId}).unwrap();
            message.success(res.message);
            setDeleteModal(false)
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }

    
  return (
    <div className="px-5">
        <div className="flex justify-between items-center my-5">
            <h1 className="text-2xl font-semibold">Team</h1>

            <Link to="/team/add-user">
                <Button type="primary" className="bg-[#8d0a1f] hover:!bg-[#8d0a20da]">
                    Add Team
                </Button>
            </Link>
        </div>

        <div className="overflow-x-auto bg-white"> 
            <Table 
                columns={columns}
                dataSource={dataSource}
                loading={isLoading}
            />
        </div>

        {/* Add this Modal component after the Table: */}
        <Modal 
            title={<span className="font-bold">Remove Team Member</span>}
            open={deleteModal} 
            onCancel={() => setDeleteModal(false)}
            footer={[
                <Button key="cancel" onClick={() => setDeleteModal(false)}>
                    Cancel
                </Button>,

                <Button 
                    key="delete" 
                    type="primary" 
                    className="bg-[#8d0a1f] hover:!bg-[#8d0a20da]"
                    onClick={handleDelete}
                    loading={loading}
                >
                    Delete
                </Button>
            ]}
            centered
        >
            <p className="my-5">Are you sure you want to remove this team member?</p>
        </Modal>
    </div>
  )
}

export default TeamTable