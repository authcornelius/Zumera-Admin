import { Button } from 'antd'
import React from 'react'
import { BsPlus } from 'react-icons/bs'
import { Link } from 'react-router-dom'

function BlogTable() {
  return (
    <div>
        <div className='px-5 my-3 grid grid-cols-2'>
            <div>
              <h1 className='text-[#8d0a1f] font-medium text-lg'>Blog</h1>
            </div>

            <div className='flex justify-end'>
              <Link to="create-blog">
                  <Button 
                  type="primary"
                  icon={<BsPlus className='text-2xl p-0 m-0' />} 
                  className='bg-[#8d0a1f] hover:!bg-[#8d0a1f] px-5'
                  >
                    <span>Create Blog</span>
                  </Button>
              </Link>
            </div>
        </div>
    </div>
  )
}

export default BlogTable
