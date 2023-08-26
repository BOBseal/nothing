import { Chart, Search } from "@/components"

const dashboard = () => {
  return (
    <section className="w-screen h-screen dashboardBg-desktop bg-no-repeat bg-cover p-[20px]">
       <div className="h-full w-full flex flex-col gap-[20px] items-center">
          <Search styles="md:w-[600px]" />
          <Chart/>
       </div> 
    </section>
  )
}

export default dashboard
