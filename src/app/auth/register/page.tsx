'use client'

import Link from "next/link";
import React from "react";

import { useForm, SubmitHandler } from "react-hook-form"

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase";

import { useRouter } from "next/navigation";

type Inputs = {
    email:string;
    password:string;
}

const Register = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm<Inputs>();

    const onSubmit:SubmitHandler<Inputs> = async(data) => {
        // console.log(data)
         createUserWithEmailAndPassword(auth,data.email,data.password)
         .then((userCredential) => {
            const user = userCredential.user;
            // console.log(user);
            router.push('/auth/login')
         })
         .catch((error)=>{
            if(error.code === 'auth/email-already-in-use'){
                alert('このメールアドレスは既に使用されてます。');
            }else{
                alert(error.message)
            }
         })
    }


  return (
    <div className="container mx-auto min-h-screen flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white text-gray-700 rounded-lg shadow-md p-12 space-y-8 w-96 md:w-124">
        <h1 className="text-4xl font-medium mb-4">新規登録</h1>
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium block">
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="ichiro@example.com"
            className="border-2 w-full runded-md p-2 placeholder-gray-400"
            {...register('email',{
                required:'メールアドレスは必須です。',
                pattern:{value:/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                message:'不適切なメールアドレス'}
            })}
          />
          {errors.email && <span className="text-red-600">{errors.email.message}</span>}
        </div>
        <div className="mt-2 space-y-1">
          <label htmlFor="password" className="text-sm font-medium block">
            PassWord
          </label>
          <input
            type="password"
            id="password"
            placeholder="6文字以上,20文字以下で入力してください"
            className="border-2 w-full runded-md p-2 placeholder-gray-400 custom-placeholder"
            {...register('password',{
                required:'パスワードは必須です。',
                minLength:{value:6,message:'6文字以上で入力してください'},
                maxLength:{value:20,message:'20文字以内で入力してください'},
            })}
          />
          {errors.password && <span className='text-red-600'>{errors.password.message}</span>}
        </div>
        <div className="flex justify-end">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 duration-700 hover:scale-95 ">
            新規登録
          </button>
        </div>
        <div className="space-x-2">
          <span className="text-sm">既にアカウントをお持ちですか？</span>
          <Link href="/auth/login" className="text-sm text-blue-500">
            ログインページへ
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
