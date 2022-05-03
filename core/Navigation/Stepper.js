import {Text} from "../index";

const Stepper = ({children}) => {
  return (
    <div className='stepper'>
      <div className="stepper__steps">
        {children}
      </div>
    </div>
  );
}

const StepLabels = ({labels, step}) => {
  return (
    <>
      {labels?.map(item => {
        if (item.id === 1) {
          return <div className='step' key={item.id}>
            <div className={step !== 1 && '!border-black'}></div>
            <div className='border-none text-center'>
              <>
                {step !== 1
                  ? <i className="fa-solid fa-check text-[10px] text-black pt-3 mb-3"/>
                  : <i className="fa-solid fa-circle text-[10px] text-black pt-3 mb-3"/>
                }
                <Text sx='sm' color='[#738a88]' classes={`animate hover:text-gray-600 
                    ${step === item.id ? '!text-black' : ''} `}>
                  {item.heading}
                </Text>
              </>
            </div>
          </div>
        }
        if (item.id === 2) {
          return <div className='step' key={item.id}>
            <div className={step === 3 && '!border-black'}></div>
            <div className='border-none text-center'>
              <>
                {step === 1 ?
                  <i className="fa-solid fa-circle text-[10px] text-gray-300 pt-3 mb-3"/>
                  : step === 3
                    ? <i className="fa-solid fa-check text-[10px] text-black pt-3 mb-3"/>
                    : <i className="fa-solid fa-circle text-[10px] text-black pt-3 mb-3"/>
                }
                <Text sx='sm' color='[#738a88]' classes={`animate hover:text-gray-600 ${step === item.id ? '!text-black' : ''} `}>
                  {item.heading}
                </Text>
              </>
            </div>
          </div>
        } else {
          return <div className='step' key={item.id}>
            <div></div>
            <div className='border-none text-center'>
              <>
                {step === item.id
                  ? <i className="fa-solid fa-circle text-[10px] text-black pt-3 mb-3"/>
                  : <i className="fa-solid fa-circle text-[10px] text-gray-300 pt-3 mb-3"/>
                }
                <Text sx='sm' color='[#738a88]' classes={`animate hover:text-gray-600 
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
