import getCurrentUser from "@/app/action/getCurrentUser";
import getListingById from "@/app/action/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/action/getReservation";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({params} : {params: IParams}) => {
    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();

    if(!listing){
        return(
            <ClientOnly>
                <EmptyState/>
            </ClientOnly>
        )
    }
    return(
        <ClientOnly>
            <ListingClient 
                listing = {listing}
                reservations={reservations}
                currentUser = {currentUser}
            />
        </ClientOnly>
    )
}

export default ListingPage;