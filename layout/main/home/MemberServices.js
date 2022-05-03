import {Button} from "../../../core/Button";

const MemberServices = () => {
    return (
      <div
        className="my-8 ipad:my-12 laptop:my-16 desktop:my-20 3xl:my-24 pb-5 laptop:pb-3.5 2xl:pb-5 pt-3 laptop:pt-1.5 2xl:pt-2 3xl:pt-3 text-center">
        <div className="max-w-md mx-auto mb-4 ipad:mb-5 desktop:mb-8 2xl:mb-10 3xl:mb-12">
          <h3
            className="text-heading text-lg ipad:text-xl laptop:text-2xl 2xl:text-3xl desktop:leading-10 font-bold mb-2 ipad:mb-3 laptop:mb-3.5">
            Talk To A Real Person
          </h3>
          <p className="text-body text-xs ipad:text-sm leading-6 ipad:leading-7">Are you on the fence?
            Have a question? Need a recommendation? Member Services is always here to help. Send us a message.</p>
        </div>
        <div
          className='mb-2.5 ipad:mb-0 desktop:mb-2 2xl:mb-4 3xl:mb-6 ipad:px-20 laptop:px-40 desktop:px-0 flex justify-center'>
          <img src="/images/people.png" width={700} alt="people"/>
        </div>
        <div className='px-6 laptop:px-0'>
          <Button>Chat With Member Services</Button>
        </div>
      </div>
    );
}

export default MemberServices;