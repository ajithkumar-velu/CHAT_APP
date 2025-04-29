
const GetMyChatSkeleton = () => {
    return (
        <div>
            <div className='mt-3 flex flex-col gap-2 bg-base-300 overflow-y-auto w-full' >
                {Array(9).fill(null).map((user, idxx) => (

                    <div key={idxx} className='px-3 py-3 bg-base-200 rounded-xl flex items-center gap-2 hover:bg-base-100 cursor-pointer' >
                        <div className='size-12 rounded-full skeleton overflow-hidden' >
                            
                        </div>
                        <div className=' space-y-2'>
                            <p className='text-[17px] text-zinc-300 font-semibold skeleton h-3 w-32' ></p>
                            <p className='text-xs text-zinc-400 h-3 w-20 skeleton' ></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GetMyChatSkeleton