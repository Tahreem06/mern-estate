import { Link } from "react-router-dom";
import {MdLocationOn} from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full sm:w-[330px]">
      <Link to={`/listing/${listing.type}/${listing._id}`}>
        <img
        src= {listing.imageUrls[0] || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRne1ckHipEPT4YqIzFtODnrVSNyuEUbpv2Ag&s"}
          alt={listing.name}
          className="h-[320px] w-full object-cover sm:h-[220px] hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-xl font-semibold text-slate-700">
            {listing.name}
          </p>
          <div className="flex items-center gap-1 ">
            <MdLocationOn className="h-4 w-4 text-green-700"/>
            <p className="text-sm text-gray-600 truncate w-full">{listing.address}</p>
          </div>
          
            <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>
            <p className="text-slate-500 mt-2 font-simibold">
             ${listing.offer ? listing.discountedPricetoLocalString('en-US') : listing.regularPricetoLocalString('en-US')}
             {listing.type === "rent" && " / month"}
             </p>
          <div className=" text-slate-700 flex gap-4">
            <div className="font-bold texxt-xs">
                {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : "1 Bedroom"}
            </div>
            <div className="font-bold texxt-xs">
                {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : "1 Bathroom"}
            </div>
          </div>

          
        </div>
      </Link>
    </div>
  );
}
