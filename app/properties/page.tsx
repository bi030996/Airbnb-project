import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../action/getCurrentUser";
import PropertiesClient from "./PropertiesClient";
import getListings from "../action/getListings";

const PropertiesPage = async () =>{
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState 
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        )
    }

    const listings = await getListings({
        userId: currentUser.id
    });
    if(listings.length === 0){
        return (
            <ClientOnly>
                <EmptyState 
                    title="No properties found"
                    subtitle="Looks like you havent no properties"
                />
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <PropertiesClient 
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default PropertiesPage;