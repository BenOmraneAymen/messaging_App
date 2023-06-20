import initials from "@/helpers/initials";


export default function ChatListItem({ groupName,status }: { groupName: string,status:string }) {

  let userStatusColor = status=="Online"? "green-500" : "red-500";

  return (
      <div className="flex flex-row lg:justify-between items-center justify-center my-1 p-2 rounded-lg hover:bg-slate-300 cursor-pointer">
        <div className="flex flex-row items-center ">
          {/* <img
            src="https://avatars.githubusercontent.com/u/55942632?v=4"
            alt="user"
            className={`w-10 h-10  sm:w-14 sm:h-14 md:h-16 md:w-16 self-center lg:w-10 lg:h-10 rounded-full lg:border-0 border-2 border-${userStatusColor}`}
          /> */}
          <div className={`flex items-center justify-center bg-primary-500 w-10 h-10  sm:w-14 sm:h-14 md:h-16 md:w-16 self-center lg:w-10 lg:h-10 rounded-full lg:border-0 border-2 border-${userStatusColor}`}>
            <span className="font-medium text-white dark:text-black ">{initials(groupName)}</span>
          </div>
          <div className="flex-col ml-2 hidden lg:flex ">
            <span className="text-sm font-semibold">{groupName}</span>
            <span className={`text-xs text-${userStatusColor} `}>{status}</span>
          </div>
        </div>
      </div>
  );
}
