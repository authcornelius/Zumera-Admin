import { Table } from "antd"
import { useGetInvestorQuery } from "../../redux/slice/subscriberInvestorApiSlice";
import { format } from "timeago.js";
import { useState } from "react";



function InvestorTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const {data, isLoading} = useGetInvestorQuery(currentPage);

    const dataSource = data?.data;
    
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
        <h1 className="font-bold text-lg my-5 px-2">Total Investor</h1>

        <div className="overflow-x-auto bg-white"> 
            <Table 
                columns={columns}
                dataSource={dataSource}
                loading={isLoading}
                pagination={{
                    current: currentPage,
                    pageSize: 15,
                    total: data?.total,
                    onChange: (page) => setCurrentPage(page),
                    showSizeChanger: false
                }}
            />
        </div>
    </div>
  )
}

export default InvestorTable