'use client'

import { UserApi } from '@/api/UserApi'
import NotFound from '@/app/not-found'
import { setUpdate } from '@/app/store/slice/modalSlice'
import { notification } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiOutlineLeft } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { useDispatch } from 'react-redux'

function Page() {
  const dispatch = useDispatch()
  const [data, setData] = useState<MeData>()
  useEffect(() => {
    UserApi.getUser()
      .then((res: ApiResponse<MeData>) => {
        if ('data' in res) {
          setData(res.data)
        }
      })
      .catch((err: ErrorResponse) => {
        notification.error({
          message: err.code,
          description: err.message,
        })
      })
  }, [])
  if (!data) {
    return NotFound
  }
  return (
    <div className=" p-p50px mt-m50 leading-[1.5] w-[93%] mx-auto bg-white dark:bg-bgElm rounded-md shadow-md">
      <div className=" flex justify-between items-center mb-m30">
        <Link
          href="/home"
          className=" text-primary font-bold flex  items-center"
        >
          <AiOutlineLeft className="font-bold" /> <span className="">Back</span>
        </Link>
        <button
          onClick={() => {
            dispatch(setUpdate(data))
          }}
          className=" text-primary font-bold flex  items-center"
        >
          <BiEdit /> Update
        </button>
      </div>

      <Image
        src={data?.avatar ? data.avatar : '/user.png'}
        width={100}
        height={100}
        alt="avartar"
        className=" rounded-full mb-m30"
      />
      <div>
        <h1 className="text-[18px] mb-m20">
          Full Name: <b>{data?.fullName}</b>
        </h1>
        <p className="text-[18px]">
          Email: <b>{data?.email}</b>
        </p>
      </div>
    </div>
  )
}

export default Page
