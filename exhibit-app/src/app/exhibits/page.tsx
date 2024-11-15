import { fetchExhibits } from "@/api/exhibitActions";
import ExhibitsList from "@/components/ExhibitList";
import React from "react";

const Stripe: React.FC<{ searchParams: Promise<{ page: number }> }> = async ({
  searchParams,
}) => {
  const { page: pageNumber } = await searchParams;
  const page = pageNumber || 1;

  try {
    const data = await fetchExhibits(page);
    return <ExhibitsList page={page} {...data} />;
  } catch (error) {
    console.error("Failed to fetch exhibits:", error);
    return <>Error: Failed to fetch exhibits</>;
  }
};

export default Stripe;
