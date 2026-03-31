import { useEffect, useState } from "react";

export default function FadeInOnLoad({ children }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div
      className={`transition-all duration-1000 ease-out transform
      ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
    >
      {children}
    </div>
  );
}
