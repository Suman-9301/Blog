import Link from "next/link";
import Image from "next/image";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";

async function getStrapiData(path: string){
    const baseUrl = "http://localhost:1337";
    try{
        const response = await fetch(baseUrl+path);
        const data = await response.json();
        return data;
    }catch(error){
        console.error(error);
    }
}
export default async function Blog() {

    const strapiData = await getStrapiData("/api/blogs?populate=*");

    const data = strapiData.data;
    return (
      <>
      
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">
                    {
                        data.map((item: { id: Key | null | undefined; attributes: { Image: { data: { attributes: { url: string; }; }; }; title: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; desc: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; createdAt: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; })=>{
                            return(
                                <div className="p-4 md:w-1/3" key={item.id}>
                        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden bg-white">
                        <Image className="lg:h-48 md:h-36 w-full object-cover object-center" src={"http://localhost:1337"+ item.attributes.Image.data.attributes.url} alt="blog"/>
                        <Link href={"/singleblog?id="+item.id}>
                        <div className="p-6">
                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{item.attributes.title}</h1>
                            <p className="leading-relaxed mb-3">{item.attributes.desc}</p>
                            <div className="flex items-center flex-wrap ">
                            <Link href={"/singleblog?id="+item.id} className="text-indigo-600 inline-flex items-center md:mb-2 lg:mb-0">Read More
                                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                                </svg>
                            </Link>

                            <span className="text-gray-400 inline-flex items-center leading-none text-sm ml-32 text-end">
                                {item.attributes.createdAt}
                            </span>
                            </div>
                        </div>
                        </Link>
                        </div>
                    </div>
                            )
                        })
                    }
                    
                </div>
            </div>
        </section>
      </>
    );
}
  

