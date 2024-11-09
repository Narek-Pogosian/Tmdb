import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";

function ScrollTopButton() {
  const [isScrolled, setIsScrolled] = useState(false);

  const scroll = useCallback(() => {
    if (window.scrollY > 700) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scroll);

    return () => window.removeEventListener("scroll", scroll);
  }, [scroll]);

  if (!isScrolled) return null;

  return (
    <Button
      className="fixed top-8 left-1/2 shadow-xl -translate-x-1/2"
      onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
    >
      Back Top
    </Button>
  );
}

export default ScrollTopButton;
