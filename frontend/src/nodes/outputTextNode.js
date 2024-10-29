// outputNode.js

import { useState } from "react";
import NodeComponent from "./nodeComponent";

export const OutputTextNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const handles = [
    {
      type: "target",
      position: "Left",
      id: `${id}-value`,
    },
  ];

  return (
    <NodeComponent
      id={id}
      handles={handles}
      name={"Output Text Only"}
      extraStyles={"bg-zinc-900 text-zinc-300"}
    >
      <div>
        <label className="flex items-center">
          Name:
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="bg-transparent border-b border-b-zinc-600 p-1 outline-none focus:border-b-blue-600 focus:bg-zinc-800"
          />
        </label>
      </div>
    </NodeComponent>
  );
};
