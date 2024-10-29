import NodeComponent from "./nodeComponent";
import { useState } from "react";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const handles = [
    {
      type: "source",
      position: "Right",
      id: `${id}-value`,
      class: "hover:bg-blue-600 origin-center ease-in-out duration-20",
    },
  ];

  return (
    <NodeComponent
      id={id}
      name={"Input"}
      handles={handles}
      extraStyles={"bg-zinc-300"}
    >
      <div>
        {inputType === "Text" ? (
          <label className="gap-2 flex items-center">
            <span>Name:</span>
            <input
              className="bg-transparent border-b border-b-zinc-600 p-1 outline-none focus:border-b-blue-600 focus:bg-blue-100"
              type="text"
              value={currName}
              onChange={handleNameChange}
            />
          </label>
        ) : (
          <label className="gap-2 flex items-center">
            <span>File:</span>
            <input
              className="bg-transparent border-b border-b-zinc-600 p-1 outline-none focus:border-b-blue-600 focus:bg-blue-100"
              type="file"
            />
          </label>
        )}
      </div>
      <div>
        <label className="flex gap-2 items-center">
          Type:
          <select
            className="bg-transparent"
            value={inputType}
            onChange={handleTypeChange}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </NodeComponent>
  );
};
