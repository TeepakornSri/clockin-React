import Joi from 'joi'
import { useState } from 'react';
import axios from '../../../config/axios'
import RegisterInput from './RegisterInput';
import InputErrorMessage from './InputErrorMessage';

const registerSchema = Joi.object({
    profileImage: Joi.required(),
    employeeId: Joi.string().trim().required(),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: Joi.string().email({ tlds: false }).required(),
    mobile: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required(),
    companyProfileId: Joi.number().required(),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{6,30}$/)
        .trim()
        .required(),

});
const validateregister = input => {
    const { error } = registerSchema.validate(input, { abortEarly: false })
    if (error) {
        const result = error.details.reduce((acc, el) => {
            const { message, path } = el
            acc[path[0]] = message
            return acc
        }, {})
        return result
    }
}

export default function RegisterFrom() {
    const [file, setFile] = useState(null)



    const [input, setInput] = useState({
        profileImage: '',
        employeeId: '',
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        companyProfileId: '',
        password: '',

    })

    const [error, setError] = useState({})

    const handleChangeInput = e => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }


    const handleSubmitRegister = async (e) => {
        try {
            e.preventDefault()
            const validationError = validateregister(input)
            const formData = new FormData()
            formData.append("profileImage", input.profileImage)
            formData.append("employeeId", input.employeeId)
            formData.append("firstName", input.firstName)
            formData.append("lastName", input.lastName)
            formData.append("email", input.email)
            formData.append("mobile", input.mobile)
            formData.append("companyProfileId", input.companyProfileId)
            formData.append("password", input.password)
            if (validationError) {
                console.log(validationError)
                return setError(validationError)
            }
            setError({})
            const response = await axios.post('/user/createAdmin', formData);
            if (response.status === 201) {
                alert('Registed');
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <form className="grid grid-cols-2 gap-x-3 gap-y-4 items-center pt-8 pb-6" onSubmit={handleSubmitRegister}>

            <div className=' w-[360px] h-[80px]'>
                <RegisterInput type='file'
                    onChange={e => {
                        if (e.target.files[0]) {
                            setFile(e.target.files[0])
                            setInput({ ...input, profileImage: e.target.files[0] })
                        }
                    }}
                    name='profileImage'
                    hasError={error.profileImage} />
            </div>
            <div className=' p-1 w-[360px] h-[80px]'>
                <RegisterInput placeholder="Employee Id"
                    value={input.employeeId}
                    onChange={handleChangeInput}
                    name='employeeId'
                    hasError={error.employeeId} />
            </div>
            <div className=' p-1 w-[360px] h-[80px]'>
                <RegisterInput placeholder=" First name"
                    value={input.firstName}
                    onChange={handleChangeInput}
                    name='firstName'
                    hasError={error.firstName} />
            </div>
            <div className=' p-1 w-[360px] h-[80px]'>
                <RegisterInput placeholder="Last Name"
                    value={input.lastName}
                    onChange={handleChangeInput}
                    name='lastName'
                    hasError={error.lastName} />
            </div>
            <div className=' p-1 w-[360px] h-[80px]'>
                <RegisterInput placeholder="Email"
                    value={input.email}
                    onChange={handleChangeInput}
                    name='email'
                    hasError={error.email} />
            </div>
            <div className='p-1 w-[360px] h-[80px]'>
                <RegisterInput placeholder="Phone Number"
                    value={input.mobile}
                    onChange={handleChangeInput}
                    name='mobile'
                    hasError={error.mobile} />
                {error.mobile && <InputErrorMessage message={error.mobile} />}
            </div>
            <div className=' p-1 w-[360px] h-[80px]'>
                <RegisterInput placeholder="companyProfileId"
                    value={input.companyProfileId}
                    onChange={handleChangeInput}
                    name='companyProfileId'
                    hasError={error.companyProfileId} />
            </div>
            <div className=' p-1 w-[360px] h-[80px]'>
                <RegisterInput placeholder="Password"
                    value={input.password}
                    onChange={handleChangeInput}
                    name='password'
                    hasError={error.password} />
                {error.password && <InputErrorMessage message={error.password} />}
            </div>
            <div className="mx-auto col-span-full">
                <button className="bg-blue-700 rounded-lg text-white px-3 py-1.5 text-lg font-bold min-w-[10rem]">
                    Sign Up
                </button>
            </div>
        </form>
    )
}
