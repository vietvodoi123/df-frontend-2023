'use client'

import React from 'react'
import { Formik } from 'formik'
import InputElm from '@/app/ui/InputElm'
import ButtonPrimary from '@/app/ui/ButtonPrimary'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { closeModal } from '@/app/store/slice/modalSlice'
import zxcvbn from 'zxcvbn'
import { UserApi } from '@/api/UserApi'
import { notification } from 'antd'
import { passSchema } from '../../validate/uservalidate'

const UpdateUserPassword = () => {
  const dispatch = useDispatch()
  const checkPasswordStrength = (password: string): string => {
    const result = zxcvbn(password)
    // Trả về đánh giá mức độ mật khẩu từ 0 đến 4 (0 là yếu, 4 là mạnh)
    if (result.score === 0) {
      return 'Rất yếu'
    }
    if (result.score === 1) {
      return 'Yếu'
    }
    if (result.score === 2) {
      return 'Trung bình'
    }
    if (result.score === 3) {
      return 'Mạnh'
    }
    return 'Rất mạnh'
  }

  const handleLogin = (
    values: { oldPassword: string; newPassword: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    setSubmitting(true)
    console.log(values)

    const form = new FormData()
    form.append('oldPassword', values.oldPassword)
    form.append('newPassword', values.newPassword)
    UserApi.changePass(form)
      .then((res: ApiResponse<Message>) => {
        if ('data' in res) {
          notification.success({
            message: res.data.message,
          })
          dispatch(closeModal())
        }
      })
      .catch((err: ErrorResponse) => {
        notification.error({
          message: err.code,
          description: err.message,
        })
      })

    setSubmitting(false)
  }

  return (
    <Formik
      initialValues={{
        oldPassword: '',
        newPassword: '',
      }}
      validationSchema={passSchema}
      onSubmit={handleLogin}
    >
      {({
        values,
        handleChange,
        isSubmitting,
        handleSubmit,
        errors,
      }): JSX.Element => (
        <form
          className=" bg-[var(--backgroundElm)] top-[15%] modal py-p45px px-p20px border-[2px] border-solid rounded-md"
          onSubmit={handleSubmit}
        >
          <header className="flex justify-between items-center mb-m40">
            <h2 className=" text-[28px] font-bold">Update User</h2>
            <button
              id="close-button"
              className="btn"
              onClick={() => dispatch(closeModal())}
              aria-label="Close"
            >
              X
            </button>
          </header>
          <div>
            <div className="relative mb-m40">
              <InputElm
                name="oldPassword"
                setData={handleChange}
                type="password"
                error={errors.oldPassword}
                value={values.oldPassword}
              />
              {errors.oldPassword && (
                <div className="absolute bottom-[-30px] left-[20px] text-primary text-fs14">
                  {errors.oldPassword}
                </div>
              )}
            </div>
            <div className="relative mb-m50">
              <InputElm
                name="newPassword"
                setData={handleChange}
                type="password"
                error={errors.newPassword}
                value={values.newPassword}
              />
              <div className=" flex justify-between items-center absolute bottom-[-43px] left-[20px] text-primary text-fs14 w-[380px]">
                {errors.newPassword && <div>{errors.newPassword}</div>}
                <div className="ml-auto">
                  Mức độ mật khẩu: {checkPasswordStrength(values.newPassword)}
                </div>
              </div>
            </div>
            <ButtonPrimary
              text={
                isSubmitting ? (
                  <AiOutlineLoading3Quarters className=" animate-spin text-fs16" />
                ) : (
                  'Change'
                )
              }
              type="submit"
            />
          </div>
        </form>
      )}
    </Formik>
  )
}

export default UpdateUserPassword
