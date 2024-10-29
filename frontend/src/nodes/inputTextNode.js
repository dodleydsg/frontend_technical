import NodeComponent from "./nodeComponent";
import { useState } from "react";

export const InputTextNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "inputText_")
  );

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
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
      name={"Input Text"}
      handles={handles}
      extraStyles={"bg-zinc-300"}
    >
      <div>
        <label className="gap-2 flex items-center">
          Name:
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="bg-transparent border-b border-b-zinc-600 p-1 outline-none focus:border-b-blue-600 focus:bg-blue-100"
          />
        </label>
        <label className="flex gap-2 items-center">
          Type:
          <select className="bg-transparent">
            <option value="Text">Text</option>
          </select>
        </label>
      </div>
    </NodeComponent>
  );
};
