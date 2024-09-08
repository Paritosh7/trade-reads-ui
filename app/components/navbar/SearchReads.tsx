// "use client";

// import React, { useState } from "react";
// import { AutoComplete, Input } from "antd";
// import type { AutoCompleteProps } from "antd";

// const getRandomInt = (max: number, min = 0) =>
//   Math.floor(Math.random() * (max - min + 1)) + min;

// const searchResult = (query: string) =>
//   new Array(getRandomInt(5))
//     .join(".")
//     .split(".")
//     .map((_, idx) => {
//       const category = `${query}${idx}`;
//       return {
//         value: category,
//         label: (
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//             }}
//           >
//             <span>
//               Found {query} on{" "}
//               <a
//                 href={`https://s.taobao.com/search?q=${query}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {category}
//               </a>
//             </span>
//             <span>{getRandomInt(200, 100)} results</span>
//           </div>
//         ),
//       };
//     });

// const SearchReads = () => {
//   const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);

//   const handleSearch = (value: string) => {
//     setOptions(value ? searchResult(value) : []);
//   };

//   const onSelect = (value: string) => {
//     console.log("onSelect", value);
//   };

//   return (
//     <AutoComplete
//       className="w-full max-w-xl"
//       options={options}
//       onSelect={onSelect}
//       onSearch={handleSearch}
//     >
//       <Input.Search size="large" placeholder="input here" enterButton />
//     </AutoComplete>
//   );
// };

// export default SearchReads;

"use client";

import React, { useState } from "react";
import { AutoComplete, Input, Spin } from "antd";
import type { AutoCompleteProps } from "antd";
import apiService from "@/app/services/apiService";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchReads = () => {
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  // Function to fetch search results from the Django API
  const handleSearch = async (value: string) => {
    console.log("handleSearch : ", value);
    if (!value) {
      setOptions([]);
      return;
    }

    setLoading(true); // Show loading spinner

    try {
      const response = await apiService.get(`/api/books?q=${value}`);

      const data = await response.data;

      const searchOptions = data.map((book: any) => ({
        value: book.id,
        label: (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 0", // Add some padding for better spacing
            }}
          >
            <Image
              className="object-cover"
              width={50} // Fixed width for the image
              height={75} // Fixed height for the image
              alt={`${book.title}`}
              src={book.image_url}
              style={{
                flexShrink: 0, // Prevent image from shrinking
                borderRadius: "4px", // Optional: Add border radius
              }}
            />
            <div
              style={{
                flexGrow: 1, // Ensure the text container grows
                flexBasis: "0", // Allow text to grow properly
                whiteSpace: "nowrap", // Prevent text wrapping
                overflow: "hidden", // Hide overflowed text
                textOverflow: "ellipsis", // Show ellipsis for long titles
              }}
            >
              {book.title}
            </div>
          </div>
        ),
        title: book.title,
      }));

      setOptions(searchOptions); // Set options for AutoComplete
    } catch (error) {
      console.error("Error fetching search results: ", error);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  const onSelect = (bookId: string, option: any) => {
    setInputValue(option.title);
    router.push(`/books/${bookId}`);
  };

  return (
    <AutoComplete
      className="w-full max-w-xl"
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}
      value={inputValue}
      onChange={setInputValue}
      notFoundContent={loading ? <Spin size="small" /> : null}
    >
      <Input.Search size="large" placeholder="Search for books" enterButton />
    </AutoComplete>
  );
};

export default SearchReads;
