import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";

function App() {

  return (
    <div
    className="h-screen"
      style={{
        background:
          "linear-gradient(45deg, #304fb3, #2a3c83, #212956, #16182d, #000000)",
      }}
    >
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
