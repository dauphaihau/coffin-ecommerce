import { Text } from "../index";
import { ReactNode } from "react";

interface PropsStepLabel {
  labels: [{
    id: number,
    heading: string,
    content: ReactNode,
  }],
  step: number,
}

const Stepper = ({children}) => {
  return (
    <div className='stepper'>
      <div className="stepper__steps">
        {children}
      </div>
    </div>
  );
}

const StepLabels = ({labels, step}: PropsStepLabel) => {
  return (
    <>
      {labels?.map(item => {
        if (item.id === 1) {
          return <div className='step' key={item.id}>
            <div className={`step-border ${step !== 1 ? '!border-black' : ''}`}></div>
            <div className='step-content'>
              <>
                {step !== 1
                  ? <i className="fa-solid fa-check step-content__icon"/>
                  : <i className="fa-solid fa-circle step-content__icon"/>
                }
                <Text classes={`step-content__text 
                    ${step === item.id ? '!text-black' : ''} `}>
                  {item.heading}
                </Text>
              </>
            </div>
          </div>
        }
        if (item.id === 2) {
          return <div className='step' key={item.id}>
            <div className={`step-border ${step === 3 ? '!border-black' : ''}`}></div>
            <div className='step-content'>
              <>
                {step === 1 ?
                  <i className="fa-solid fa-circle step-content__icon--gray"/>
                  : step === 3
                    ? <i className="fa-solid fa-check step-content__icon"/>
                    : <i className="fa-solid fa-circle step-content__icon"/>
                }
                <Text
                  classes={`step-content__text ${step === item.id ? '!text-black' : ''} `}>
                  {item.heading}
                </Text>
              </>
            </div>
          </div>
        } else {
          return <div className='step' key={item.id}>
            <div className='step-border'></div>
            <div className='step-content'>
              <>
                {step === item.id
                  ? <i className="fa-solid fa-circle step-content__icon"/>
                  : <i className="fa-solid fa-circle step-content__icon--gray"/>
                }
                <Text classes={`step-content__text
                    ${step === item.id ? '!text-black' : ''} `}>
                  {item.heading}
                </Text>
              </>
            </div>
          </div>
        }
      })}
    </>
  )
}

const StepContent = ({children}) => <>{children}</>;

Stepper.StepLabels = StepLabels;
Stepper.StepContent = StepContent;

export default Stepper;
