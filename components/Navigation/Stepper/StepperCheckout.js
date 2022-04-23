import {useEffect, useState} from "react";
import {Text} from "../../index";
import {FirstStepCheckout, SecondStepCheckout, Stepper, ThirdStepCheckout} from "./index";

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
    <>
      <Stepper>
        <Stepper.StepLabels labels={stepsContent} step={step}/>
      </Stepper>
      <div>
        {currentStep.content().type(context)}
      </div>
    </>
  );
}

export default StepperCheckout;