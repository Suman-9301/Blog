async function getSingleStrapiData(path: string){
  const baseUrl = "http://localhost:1337";
  try{
      const response = await fetch(baseUrl+path);
      const data = await response.json();
      return data;
  }catch(error){
      console.error(error);
  }
}

export default async function   Singleblog({
  searchParams,
}:{
  searchParams:{
    id :number;
  };
}) {
  let url = "/api/blogs/"+searchParams.id+"?populate=*"
  const singleStrapiData = await getSingleStrapiData(url);
  const data = singleStrapiData.data;
  // console.log(url);

    return (
      <>
        <div className="p-4 md:w-1/3 m-auto" key={data.id}>
          <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden bg-white">
            <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={"http://localhost:1337"+ data.attributes.img.data.attributes.url} alt="blog"/>
            <div className="p-6">
                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{data.attributes.title}</h1>
                <p className="leading-relaxed mb-3">{data.attributes.desc}</p>
                <div className="flex items-center flex-wrap ">
                <span className="text-gray-400 inline-flex items-center leading-none text-sm ml-32 text-end">
                    {data.attributes.createdAt}
                </span>
                </div>
            </div>
          </div>
       </div>
      </>
    );
}
  

