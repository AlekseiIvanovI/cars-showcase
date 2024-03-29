"use client"

import { fetchCars } from "@/utils";
import { HomeProps } from "@/types";
import { fuels, yearsOfProduction } from "@/constants";
import { CarCard, ShowMore, SearchBar, CustomFilter, Hero } from "@/components";

export default async function Home({ searchParams }: HomeProps) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar />

          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} />
            <CustomFilter title='year' options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}

// "use client"


// //DONT DELETE
// import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components'
// import { fuels, yearsOfProduction } from '@/constants';
// import { fetchCars } from '@/utils';
// import Image from 'next/image';
// import { useEffect, useState } from 'react';

// //server side approach
// //export default async function Home({ searchParams }) {

// export default function Home() {
//   //server side approach
//   // const allCars = await fetchCars({
//   //   manufacturer: searchParams.manufacturer || '',
//   //   year: searchParams.year || 2022,
//   //   fuel: searchParams.fuel || '',
//   //   limit: searchParams.limit || 10,
//   //   model: searchParams.model || '',
//   // });

//   const [allCars, setAllCars] = useState([]);
//   const [loading, setLoading] = useState(false);

//   //search states
//   const [manufacturer, setManufacturer] = useState("")
//   const [model, setModel] = useState("");

//   //filter states
//   const [fuel, setFuel] = useState("");

//   const [year, setYear] = useState(2022);

//   //pagination state
//   const [limit, setLimit] = useState(10);

//   const getCars = async () => {
//     setLoading(true);
//     try{
//       const result = await fetchCars({
//         manufacturer: manufacturer || '',
//         year: year || 2022,
//         fuel: fuel || '',
//         limit: limit || 10,
//         model: model || '',
//       });

//       setAllCars(result);
//     }catch(error){
//       console.log(error);
//     }finally{
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     console.log(fuel, year, limit, model)
//       getCars();
//   }, [manufacturer, model, fuel, year, limit])

//   const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;


//   return (
//     <main 
//     className="overflow-hidden">
//       <Hero />
//       <div className='mt-12 paddding-x padding-y max-width id="discover'>
//         <div className='home__text-container'>
//           <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
//           <p>Explore the cars you might like</p>
//         </div>
//         <div className='home__filters'>
//           <SearchBar setManufacturer={setManufacturer}
//             setModel={setModel}
//           />

//           <div className='home__filter-container'>
//             <CustomFilter title="fuel" options={fuels}
//             // @ts-ignore
//             setFilter={setFuel}

//             />
//             <CustomFilter title="year" options={yearsOfProduction}
//             // @ts-ignore
//             setFilter={setYear}
//             />
//           </div>
//         </div>
//           {allCars.length > 0 ? (
//             <section>
//               <div className='home__cars-wrapper'>
//                 {allCars?.map((car) => (
//                 <CarCard car={car}/>
//                 ))}
//               </div>

//                   {loading && (
//                     <div className='mt-16 w-full flex-center'>
//                       <Image 
//                       src="/loader.svg"
//                       alt="Loader"
//                       width={50}
//                       height={50}
//                       className="object-contain"
//                       />
//                     </div>
//                   )}

//               <ShowMore 
//                 pageNumber={limit / 10}
//                 isNext={limit > allCars.length}
//                 // @ts-ignore
//                 setLimit={setLimit}
//               />
//             </section>
//           ):(
//             <div className='home__error-container'
//             >
//               <h2 className='text-black text-xl 
//               font-bold'>Oops, no results</h2>
//               <p>{allCars?.message}</p>
//             </div>
//           )}

//       </div>
//     </main>
//   )
// }
