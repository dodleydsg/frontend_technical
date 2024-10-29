import { useState, useEffect, useRef } from "react";
import NodeComponent from "./nodeComponent";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState(new Map()); // Track variables and their start index
  const [handles, setHandles] = useState([
    {
      position: "Right",
      id: `${id}-output`,
      type: "source",
      class: "hover:bg-blue-600 origin-center ease-in-out duration-200",
    },
  ]);
  const textAreaRef = useRef(null);

  useEffect(() => {
    // Convert `variables` to an array of handles when it changes
    const variableHandles = Array.from(variables).map((variable, i, arr) => ({
      position: "Left",
      id: `${id}-${variable[0]}`,
      style: { top: `${(i + 1) * (100 / (arr.length + 1))}%` },
      variable: variable,
    }));
    const defaultHandles = [
      {
        position: "Right",
        id: `${id}-output`,
      },
    ];

    setHandles([
      ...defaultHandles, // Spread to ensure a new array reference
      ...variableHandles,
    ]);
  }, [variables, id]); // Re-run when `variables`, `defaultHandles`, or `id` changes

  useEffect(() => {
    if (!currText) {
      setVariables(new Map());
    }
  }, [currText]);

  let minRows = 1,
    // maxRows = 10,
    minWidth = 100,
    maxWidth = 300;

  const variablePattern = /\{\{(\w+)\}\}/g;

  const range = 20;

  // Function to update variables based on added or removed parts of the text
  const updateVariablesOnChange = (newText, oldText, selectionStart) => {
    const updatedVariables = new Map(variables);

    // Detect the start and end of the modified text around the cursor position
    const start = Math.max(0, selectionStart - range);
    const end = Math.min(newText.length, selectionStart + range);

    // Extract possible variable pattern around the changed area
    const changedSection = newText.slice(start, end);
    const matches = [...changedSection.matchAll(variablePattern)];

    // Clear previous variables in the affected range
    for (const [varName, startIndex] of updatedVariables) {
      if (startIndex >= start && varName.length + startIndex <= end) {
        updatedVariables.delete(varName);
      }
    }

    // Add new matches found in the updated range
    for (const match of matches) {
      const varName = match[1];
      const varStartIndex = newText.indexOf(match[0], start); // Adjust start index relative to full text
      if (varStartIndex !== -1) updatedVariables.set(varName, varStartIndex);
    }

    setVariables(updatedVariables);
  };

  const resizeTextArea = () => {
    if (!textAreaRef.current) {
      return;
    }

    textAreaRef.current.style.height = "auto"; // will not work without this!
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    const cursorPosition = e.target.selectionStart;

    updateVariablesOnChange(newText, currText, cursorPosition);
    setCurrText(newText);
    resizeTextArea();
  };

  return (
    <NodeComponent
      id={id}
      name={"Text"}
      handles={handles}
      extraStyles={"bg-zinc-300"}
    >
      <div>
        <label className="flex flex-col gap-2 min-w-64">
          <div>Enter Text</div>
          <textArea
            ref={textAreaRef}
            rows={minRows}
            type="text"
            value={currText}
            onChange={handleTextChange}
            className={
              "bg-transparent border-b border-b-zinc-600 p-1 outline-none focus:border-b-blue-600 focus:bg-blue-100"
            }
            style={{
              overflow: "hidden",
              resize: "none", // Prevent manual resizing
              minWidth: `${minWidth}px`,
              maxWidth: `${maxWidth}px`,
              minHeight: `${minRows * 24}px`, // Default height based on minRows
            }}
          />
        </label>
      </div>
    </NodeComponent>
  );
};
