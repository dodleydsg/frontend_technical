import NodeComponent from "./nodeComponent";

export const LLMNode = ({ id, data }) => {
  const handles = [
    {
      type: "target",
      position: "Left",
      id: `${id}-system`,
      style: { top: `${100 / 3}%` },
    },
    {
      type: "target",
      position: "Left",
      id: `${id}-prompt`,
      style: { top: `${200 / 3}%` },
    },
    {
      type: "source",
      position: "Right",
      id: `${id}-response`,
      className: "hover:bg-blue-600 origin-center ease-in-out duration-200",
    },
  ];
  return (
    <NodeComponent
      id={id}
      handles={handles}
      name={"LLM"}
      extraStyles={"bg-yellow-300"}
    >
      <div>
        <span>This is a LLM.</span>
      </div>
    </NodeComponent>
  );
};
