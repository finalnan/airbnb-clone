import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import TripsClient from "./TripsClient";
import getReservations from "../actions/getReservations";

const Trips = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0)
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subtitle="Look like you have not reserved."
        />
      </ClientOnly>
    );

  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default Trips;
