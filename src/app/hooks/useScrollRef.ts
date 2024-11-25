import React, { useState } from "react";

export default function useScrollRef(
  ref: any,
  setLoading?: any,
  data?: any | undefined,
  isIncrease?: boolean | undefined
) {
  const [offsetVal, setoffsetVal] = useState(data ? data : 0);
  const handleScroll = () => {
    console.log("testScroll", data);
    if (ref.current) {
      const bottom = ref.current.getBoundingClientRect().bottom;
      console.log("testScroll1", data);
      if (bottom <= window.innerHeight) {
        console.log("testScroll2", data);
        if (isIncrease) {
          console.log("testScroll3", data);
          if (setLoading) {
            setLoading(true);
          }
          if (data) {
            setoffsetVal((prev: any) => ({
              start: prev.start + 5,
              end: prev.end + 5,
            }));
          } else {
            setoffsetVal((prev: number) => prev + 5);
          }
        }
      }
    }
  };
  return { offsetVal, handleScroll };
}
