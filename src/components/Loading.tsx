import { useEffect, useState } from "react";

const Loading = () => {
  const [visible, setVisible] = useState(true);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[var(--background)/50]">
      <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
