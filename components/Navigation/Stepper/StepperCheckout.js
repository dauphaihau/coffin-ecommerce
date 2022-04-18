import {useEffect, useState} from "react";
import {Text} from "../../index";
import {FirstStepCheckout, SecondStepCheckout, ThirdStepCheckout} from "./index";

const StepperCheckout = ({context}) => {
  const {step} = context

  const stepsContent = [
    {
      id: 1,
      heading: 'Cart',
      content: () => <FirstStepCheckout/>,
    },
    {
      id: 2,
      heading: 'Billing & address',
      content: () => <SecondStepCheckout/>
    },
    {
      id: 3,
      heading: 'Payment',
      content: () => <ThirdStepCheckout/>
    },
  ];

  const [currentStep, setCurrentStep] = useState(stepsContent[0]);

  useEffect(() => {
    const handleStepClick = (currentStep) => {
      const currentStepContent = stepsContent?.filter(item => item.id === currentStep);
      setCurrentStep(currentStepContent[0]);
    };
    handleStepClick(step)
    return () => {
    }
  }, [step])

  return (
    <div className='stepper'>
      <div className='stepper__steps'>
        {stepsContent?.map(item => {
          return (
            <div className='step flex border-none relative' key={item.id}>
              <div className='border-none text-center'>
                {step === item.id ?
                  <>
                    <i className="fa-solid fa-check text-xl mb-1"></i>

                    <Text sx='sm' color='[#738a88]' classes={`animate hover:text-gray-600 
                    ${step === item.id ? '!text-black' : ''} `}>
                      {item.heading}
                    </Text>
                  </>
                  :
                  <>
                    <i className="fa-solid fa-circle text-[10px] pt-3 mb-3"></i>
                    <Text sx='sm' color='[#738a88]' classes={`animate hover:text-gray-600 
                    ${step === item.id ? '!text-black' : ''} `}>
                      {item.heading}
                    </Text>
                  </>
                }

              </div>
              <div className=''></div>
            </div>
          )
        })}
      </div>
      <div className="p-[20px]">
        {currentStep.content().type(context)}
      </div>
    </div>
  );
}

export default StepperCheckout;