import React from "react"
// import { useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

const Circulars = () => {
  // const navigate = useNavigate()
  // const { data } = useSelector((state) => state?.circulars)
  const data:any = []
  return (
    <div className="flex flex-col justify-center items-center gap-3 tracking-wide">
      <p className="text-center text-[25px] lg:text-[35px] font-bold">
        Circulars
      </p>
      <div className="border-2 border-my-green max-h-[300px] overflow-y-scroll bg-white/85 px-2 lg:px-5">
        {data && data?.length > 0 ? (
          data
            ?.map((e:any) => (
              <div
                key={e?._id}
                className="flex items-end justify-between border-b border-b-my-green last:border-none py-2 sm:min-w-[400px] gap-10"
              >
                <p
                  className="hover:underline text-lg lg:text-2xl cursor-pointer"
                  // onClick={() => navigate(`/${e?.file?.cloudinary_id}`)}
                >
                  {e?.name}
                </p>
                <p className="text-sm lg:text-base text-gray-500">
                  {e?.createdAt?.split("T")[0]}
                </p>
              </div>
            ))
            .reverse()
        ) : (
          <p className="px-20 py-10 text-xl font-medium">
            No Circulars to Show
          </p>
        )}
      </div>
    </div>
  )
}

export default Circulars
