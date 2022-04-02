import {useUtil} from "../../context/utilContext";
import {Button} from "../index";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {userService} from "../../services";
import {toast} from "react-toastify";
import Input from "../Input/Input";

const Login = () => {

  const [registerForm, setRegisterForm] = useState(false)

  const {
    modalOpen, modalToggle, setUser, user
  } = useUtil();

  const {register, handleSubmit, reset, formState, control} = useForm();
  const {errors} = formState;
  const router = useRouter();
  

  // useEffect(() => {
  //   if (userService.userValue) {
  //     router.push('/');
  //   }
  // }, []);

  const onSubmit = (data) => {
    console.log('data-submit', data);
    return registerForm
      ? handleRegister(data)
      : handleLogin(data)
  };

  const handleLogin = (values) => {
    console.log('values', values)
    const {email, password} = values

    return userService.login(email, password)
      .then((res) => {
        setUser({...user, ...res})
        modalToggle();
        const returnUrl = router.query.returnUrl || '/';
        // router.push(returnUrl);
        // toast.success('login Successfully!');
      }).catch((e) => {
        console.log(e)
      })
      .catch(() => toast("Login failed", {
        position: toast.POSITION.BOTTOM_RIGHT
      }))
  }

  const handleRegister = (values) => {
    console.log('values', values)
    console.log('re')
    const {username, password} = values

    return userService.register(values)
      .then(() => {
        // router.push('/account/login')
        toast("Successfully register!", {
          position: toast.POSITION.BOTTOM_RIGHT
        })
      })
      .catch(() => toast("This didn't work", {
        position: toast.POSITION.BOTTOM_RIGHT
      }))
  }

  return (
    <div id="authentication-modal" tabIndex="-1" aria-hidden="true"
         className={`${!modalOpen && 'hidden'}
          overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0
           z-[200] w-full
            md:top-[20%] left-[39%] 
           h-modal md:h-full justify-center items-center`}>
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-end p-2">
            <button
              type="button"
              onClick={() => modalToggle()}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"

              data-modal-toggle="authentication-modal">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"/>
              </svg>
            </button>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8" action="#">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {registerForm ? 'Register' : 'Sign in to our platform'}
            </h3>
            {registerForm &&
              <Input name='name' label='Name' register={register} errors={errors}/>
            }
            <Input name='email' type='email' label='Your email' register={register} errors={errors}/>
            <Input name='password' type='password' label='Your password' register={register} errors={errors}/>

            <div className="flex justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="remember" aria-describedby="remember" type="checkbox"
                         className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                         required=""/>
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                </div>
              </div>
              <a href="#" className="text-sm text-black hover:underline dark:text-blue-500">Lost Password?</a>
            </div>

            <Button type="submit" className='w-full'>{!registerForm ? 'Login to your account' : 'Register'}</Button>

            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              {
                registerForm
                  ? <span className='mr-2'>Already have an account?</span>
                  : <span className='mr-2'>Not registered?</span>
              }
              <a href="#" className="text-black hover:underline dark:text-blue-500"
                 onClick={() => setRegisterForm(!registerForm)}
              >
                {registerForm ? 'Login' : 'Create account'}
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;