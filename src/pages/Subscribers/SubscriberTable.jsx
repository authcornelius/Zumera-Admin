import { Table } from "antd"
import { useGetSubscriberQuery } from "../../redux/slice/subscriberInvestorApiSlice";
import { format } from "timeago.js";



function SubscriberTable() {
    const {data, isLoading} = useGetSubscriberQuery();

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
            dataIndex: "name"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Date",
            key: "date",
            render: (record) => format(record.createdAt),
        }
    ]


  return (
    <div className="px-5">
        <h1 className="font-bold text-lg my-5 px-2">Total Subscibers</h1>

        <div className="overflow-x-auto bg-white"> 
            <Table 
                columns={columns}
                dataSource={dataSource}
                loading={isLoading}
            />
        </div>
    </div>
  )
}

export default SubscriberTable