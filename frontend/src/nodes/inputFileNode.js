import NodeComponent from "./nodeComponent";

export const InputFileNode = ({ id, data }) => {
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
      name={"Input File"}
      handles={handles}
      extraStyles={"bg-zinc-300"}
    >
      <div>
        <label className="gap-2 flex items-center">
          Name:
          <input
            type="File"
            className="bg-transparent border-b border-b-zinc-600 p-1 outline-none focus:border-b-blue-600 focus:bg-blue-100"
          />
        </label>
      </div>
    </NodeComponent>
  );
};
