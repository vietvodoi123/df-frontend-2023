'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { Formik } from 'formik'
import InputElm from '@/app/ui/InputElm'
import ButtonPrimary from '@/app/ui/ButtonPrimary'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { UserApi } from '@/api/UserApi'
import { login } from '@/app/store/slice/userSlice'
import { notification } from 'antd'
import { TopicApi } from '@/api/TopicApi'
import { setTopic } from '@/app/store/slice/booksSlice'
import { loginSchema } from '@/app/validate/loginValidate'

const Login = ({ setTab }: { setTab: (value: number) => void }) => {
  const dispatch = useDispatch()
  const route = useRouter()

  const handleLogin = async (
    values: { email: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    setSubmitting(true)
    await UserApi.login(values)
      .then((e: ApiResponse<Auth>) => {
        if ('data' in e) {
          notification.success({
            message: 'Đăng nhập thành công!',
            description: `Xin chào ${e.data.email}`,
          })

          // lay topic
          TopicApi.getTopic()
            .then((res: ApiResponse<ITopic[]>) => {
              if ('data' in res) {
                console.log(res.data)

                dispatch(setTopic(res.data))
              }
            })
            .catch((err: ErrorResponse) => {
              notification.error({
                message: err.code,
                description: err.message ? err.message : err.error,
              })
            })
          dispatch(login({ ...e.data }))
          route.push('/home')
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
        password: '',
        email: '',
      }}
      validationSchema={loginSchema}
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
          className="modal top-[20%] py-p45px px-p20px border-[2px] border-solid rounded-md bg-white dark:bg-bgElm"
          onSubmit={handleSubmit}
        >
          <h1 className="text-fs24 text-center mb-m30">
            <span className=" text-fs54 text-primary font-bold">Book</span>store
          </h1>
          <div>
            <div className="relative mb-m40">
              <InputElm
                name="email"
                setData={handleChange}
                type="text"
                error={errors.email}
                value={values.email}
              />
              {errors.email && (
                <div className="absolute bottom-[-30px] left-[20px] text-primary text-fs14">
                  {errors.email}
                </div>
              )}
            </div>
            <div className="relative mb-m50 ">
              <InputElm
                value={values.password}
                name="password"
                setData={handleChange}
                error={errors.password}
                type="password"
              />
              {errors.password && (
                <div className="absolute bottom-[-30px] left-[20px] text-primary text-fs14">
                  {errors.password}
                </div>
              )}
            </div>
            <ButtonPrimary
              text={
                isSubmitting ? (
                  <AiOutlineLoading3Quarters className=" animate-spin text-fs16" />
                ) : (
                  'Login'
                )
              }
              type="submit"
            />
            <div className=" mt-m30 flex justify-between items-center text-fs14 opacity-80">
              <button onClick={() => setTab(1)} className=" cursor-pointer">
                Do not have an account?
              </button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  )
}

export default Login
