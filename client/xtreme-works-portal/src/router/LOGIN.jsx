import React from "react";
import { useState, useEffect } from "react";
import { axiosAPI } from "src/utility/axios";

import EmptyProps from "src/resources/xtreme-works/xwi_logo.png";

export default function Example() {

    const [formState, setFormState] = useState({
        email: "",
        password: ""
    })

    const onInputForm = (a) => {
        setFormState({
            ...formState,
            [a.target.name]: a.target.value
        })
    }

    const submitForm = async () =>{
        try {
            let approveData = await axiosAPI.post(`/authentication/sign-in`, {
                ...formState
            });
            console.log(approveData.data.jwt)
            console.log(approveData.data.message)
        } catch (err) {
            console.log(err.response.data.message)
        }
    }

    return (
        <React.Fragment>
            <div className="flex min-h-full flex-1">
                <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-blue-900">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div className="flex items-center justify-center">
                            <img
                                    alt="Xtreme Works, Inc"
                                    src={EmptyProps}
                                    className="h-10 w-auto"
                                />
                        </div>
                        <div className="mt-10">
                            <div>
                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                                        Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                autoComplete="email"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                onInput={onInputForm}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                                        Password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                required
                                                autoComplete="current-password"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                onInput={onInputForm}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <div className="text-sm/6">
                                            <a href="#" className="font-semibold text-white hover:text-gray-500">
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            onClick={submitForm}
                                            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                        className="absolute inset-0 size-full object-cover"
                    />
                </div>
            </div>
        </ React.Fragment>
    )
}
  