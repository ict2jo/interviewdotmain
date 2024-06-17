"use client";
import { useOptions } from "../_lib/hooks/OptionContext";

function Progress() {
  const { page } = useOptions();
  return (
    <progress max="3" value={page} className="w-full bg-gray-500"></progress>
  );
}

export default Progress;
