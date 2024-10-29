// NodeComponent.js
import { Handle, Position } from "reactflow";

//extra styles
const NodeComponent = ({ id, name, children, handles, extraStyles }) => {
  return (
    <div
      className={`min-h-20 min-w-[200px] space-y-2 rounded p-4 ${extraStyles}`}
    >
      <div>
        <span className="font-bold uppercase">{name}</span>
      </div>
      {children}
      {handles.map((handle) => (
        <div>
          <Handle
            key={handle.id}
            type={handle.type}
            position={Position[handle.position]}
            id={`${id}-${handle.id}`}
            className={`w-3 h-3 ${handles.class}`}
            style={handle.style}
            {...handle.extraProps} //extra handle Props
          />
        </div>
      ))}
    </div>
  );
};

export default NodeComponent;
