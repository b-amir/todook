"use client";

import { DatasetSwitch } from "./DatasetSwitch";
import { DeleteAllButton } from "./DeleteAllButton";

export function ControlBox() {
  return (
    <div className="flex items-center px-2 justify-between gap-6 bg-brgray-50/20 backdrop-blur-sm rounded-lg">
      <DatasetSwitch />
      <DeleteAllButton />
    </div>
  );
}
