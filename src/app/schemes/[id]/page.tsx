/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useEffect, useState } from "react";
import SchemesDetailed from "@/components/schemesDetailed";

interface SchemeDetailsPageProps {
  params: { id: string };
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
      .then((data: any) => {
        // Map backend data to the structure expected by SchemesDetailed
        const mapped = {
          id: String(data.id),
          title: data.title,
          details: data.details,
          location: data.location,
          benefits: data.benefits,
          eligibility: data.eligibility,
          application_process: data.application_process,
          documents_required: data.documents_required,
          faqs: data.faqs,
          sourceUrl: data.source_url,
          tags: Array.isArray(data.tags) ? data.tags : [],
          created_at: data.created_at,
          updated_at: data.updated_at,
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
