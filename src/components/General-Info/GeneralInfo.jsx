import { Badge } from '../ui/badge';
import Image from 'next/image';
import { TbCopy, TbCalendarDue } from "react-icons/tb";

const GeneralInfo = () => {
  return (
    <div className="fixed top-4 right-4 flex flex-col items-center space-y-5">
      <Badge variant="secondary"><Image src="/assets/fire.svg" width={20} height={20} />120</Badge>
      <Badge variant="secondary"><Image src="/assets/Zu.svg" width={20} height={20} />24</Badge>
      <div className='w-11 h-11 rounded-full bg-white flex items-center justify-center'>

        <TbCalendarDue className="text-[#001C46] text-2xl" />
      </div>
      <div className='w-11 h-11 rounded-full bg-white flex items-center justify-center'>

        <TbCopy className="text-[#001C46] text-2xl" />
      </div>
    </div>
  );
};

export default GeneralInfo;
