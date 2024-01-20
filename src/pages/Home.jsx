import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../redux/queries/ProductApi";

const ProductCard = ({image, title, category, price, id}) => {
    return (
        <Link to={`/product/${id}`} className="lg:w-1/4 md:w-1/2 p-4 w-full">
        <a className="block relative h-48 rounded overflow-hidden">
            <img alt={`Image of ${title}`} className="object-cover text-xs object-center w-full h-full block" 
            src={image} />
        </a>
        <div className="mt-4 flex justify-between items-center">
           <div>
           <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">{category}</h3>
            <h2 className="text-gray-900 title-font text-m font-medium">{title}</h2>
            <p className="mt-1">&#8377;{price*83}</p>
           </div>
           <div>
            <button className="py-2 px-5 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-white">view</button>
           </div>
        </div>
    </Link>

    )
}


function Home() {
    const {data,  isLoading, isError } = useGetProductsQuery({});

    if (isLoading) {
        return <div>loading...</div>
    }

    if (isError) {
        return <div>Something went wrong</div>
    }


    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">

                       {
                        data.length>1 && data.filter((c) => {return c.id<=51}).map((c,i) => {
                          return  <ProductCard key={i} title={c.title} image={c.images[0]} 
                          category={c.category.name} price={c.price} id={c.id}/>
                        })
                       }

                    </div>
                </div>
            </section>


        </>
    )
}

export default Home;