import Image from 'next/image';
import { FaHome, FaSearch, FaCog } from 'react-icons/fa';
import { IoMdCopy } from "react-icons/io";
import { MdOutlineDashboard, MdOutlineQuiz  } from "react-icons/md";
import { RiBookLine } from "react-icons/ri";
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 h-[95vh] w-[80px] sm:w-[60px] md:w-[70px] bg-white flex flex-col items-center py-4 rounded-lg m-5 z-50">
      <Image src={"/assets/logo.svg"} width={36} height={36} alt="Logo" />
      <div className="mt-8 flex flex-col items-center gap-6">
        <MdOutlineDashboard
          className={`text-2xl ${pathname === '/' ? 'bg-purple-500 text-white p-1 rounded-full' : 'text-black'}`}
        />
        <RiBookLine
          className={`text-2xl ${pathname === '/book' ? 'text-purple-500' : 'text-black'}`}
        />
        <IoMdCopy
          className={`text-2xl ${pathname === '/copy' ? 'text-purple-500' : 'text-black'}`}
        />
        <MdOutlineQuiz
          className={`text-2xl ${pathname === '/quiz' ? 'text-purple-500' : 'text-black'}`}
        />
      </div>
    </div>
  );
};

export default Sidebar;
