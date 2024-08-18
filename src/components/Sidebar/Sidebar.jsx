import Image from 'next/image';
import { FaHome, FaSearch, FaCog } from 'react-icons/fa';
import { IoMdCopy } from "react-icons/io";
import { MdOutlineDashboard, MdOutlineQuiz  } from "react-icons/md";
import { RiBookLine } from "react-icons/ri";
const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-[95vh] w-[80px]  gap-6 bg-white flex flex-col items-center py-4 rounded-lg m-5 z-50">
        <Image src={"/assets/logo.svg"} width={36} height={36}/>
      <div className="mb-8">
        <MdOutlineDashboard className="text-black text-2xl mb-6" />
        <RiBookLine className="text-black text-2xl mb-6" />
        <IoMdCopy className="text-black text-2xl mb-6" />
        <MdOutlineQuiz className="text-black text-2xl mb-6" />
      </div>
    </div>
  );
};

export default Sidebar;
