
const RecentSearch = ({setRecentHistory,recentHistory,setSelectedHistory}) => {
    const clearHistory = () => {
        localStorage.removeItem('q-history');
        setRecentHistory([]);
      }
  return (
    <div>
    <div className='flex flex-col md:flex-row justify-between gap-1 items-center border-b-2 dark:border-zinc-700 px-4 py-2'>
    <h2 className=' sm:text-sm md:text-xl'>Recent history</h2>
    <button onClick={clearHistory} className={recentHistory?.length ?'cursor-pointer':''}><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#d31212"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg></button>
    </div>
    
    <ul className='list-none max-h-[80dvh] overflow-auto'>
      {recentHistory?.map((item, index) => (
        <li
          key={index}
          className=' text-left px-4 text-zinc-7000 text-sm my-2 dark:text-zinc-400 cursor-pointer dark:hover:bg-zinc-700 hover:bg-red-200 dark:hover:text-zinc-200 truncate hover:text-zinc-900'
          onClick={() => {
            setSelectedHistory(item);
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  </div>
  )
}

export default RecentSearch