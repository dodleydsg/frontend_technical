// submit.js
import { useStore } from "./store";

export const SubmitButton = () => {
  const edges = useStore((state) => state.edges);
  const nodes = useStore((state) => state.nodes);
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={async () => {
          try {
            const data = JSON.stringify({ edges, nodes });

            const response = await fetch(
              "http://localhost:8000/pipelines/parse",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: data,
              }
            );
            const responseData = await response.json();
            alert(
              `This submitted pipeline has ${responseData.num_edges} edges, ${
                responseData.num_nodes
              } nodes and is ${responseData.is_dag ? '' : "not"} a DAG (Directed Acyclic Graph)`
            );
          } catch (error) {}
        }}
        type="submit"
        className="py-3 px-6 text-white border-none bg-blue-600 rounded hover:bg-blue-800 transition-colors ease-out"
      >
        Submit
      </button>
    </div>
  );
};
