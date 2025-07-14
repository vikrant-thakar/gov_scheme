/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useEffect, useState } from "react";
import SchemesDetailed from "@/components/schemesDetailed";

interface SchemeDetailsPageProps {
  params: { id: string };
}

// Backend scheme type
interface BackendScheme {
  id: number;
  name: string;
  description: string;
  category?: string;
  ministry?: string;
  target_groups?: string[];
  eligibility_criteria?: any;
  apply_link?: string;
}

export default function SchemeDetailsPage({ params }: SchemeDetailsPageProps) {
  const [scheme, setScheme] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    setLoading(true);
    fetch(`${apiUrl}/schemes/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data: BackendScheme) => {
        // Map backend data to the structure expected by SchemesDetailed
        const mapped = {
          id: String(data.id),
          title: data.name,
          details: data.description,
          location: data.category || "",
          tags: [data.ministry, ...(data.target_groups || [])].filter((tag): tag is string => Boolean(tag)),
          // Add more fields as needed for your design
          eligibility: data.eligibility_criteria ? JSON.stringify(data.eligibility_criteria) : undefined,
          sourceUrl: data.apply_link,
          // benefits, applicationProcess, documentsRequired, faqs, etc. can be added if available in backend
        };
        setScheme(mapped);
        setLoading(false);
      })
      .catch(() => {
        setScheme(null);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return <div className="text-center py-20 text-lg text-gray-200">Loading scheme details...</div>;

  return <SchemesDetailed scheme={scheme} />;
}

// import * as React from "react"
// import SchemesDetailed from "@/components/schemesDetailed";
// import { schemesDetails } from "@/data/schemes";
// // import { useSearchParams } from "next/navigation";
// // import { use } from "react";

// // ✅ Page component props
// export interface paramsType {
//   params: {
//     id: string;
//   };
// };

// // ✅ Component for the dynamic route
// export default function SchemeDetailsPage({ params }: paramsType) {
//   const id: object = React.use(params);

//   // console.log(searchParams);

//   // const id = searchParams.get("id");  // Get the `id` query parameter

//   // const scheme = undefined;

//   const scheme = schemesDetails.find(
//     (s) => s.id.toLowerCase() === params.id.toLowerCase()
//   );


//   return <SchemesDetailed scheme={scheme} />;
// }



// // import SchemesDetailed from "@/components/schemesDetailed";
// // import { schemesDetails } from "@/data/schemes";
// // import { useSearchParams } from "next/navigation";

// // interface SchemeDetailsPageProps {
// //   params: { id: string };
// // }

// // export default function SchemeDetailsPage({ params }: SchemeDetailsPageProps) {


// //   const searchParams = useSearchParams();
// //   const allParams = searchParams.getAll("red"); // Replace "yourKey" with the actual key you want to retrieve

// //   console.log(allParams);

// //   const scheme = schemesDetails.find(
// //     (s) => s.id.toLowerCase() === params.id.toLowerCase()
// //   );

// //   return <SchemesDetailed scheme={scheme} />;
// // }
