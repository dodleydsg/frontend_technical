// toolbar.js

import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="customInputTextOnly" label="Input Text Only" />
        <DraggableNode type="customInputFileOnly" label="Input File Only" />
        <DraggableNode type="customOutputPdfOnly" label="Output Pdf Only" />
        <DraggableNode type="customOutputTextOnly" label="Output Text Only" />
        <DraggableNode type="customOutputImageOnly" label="Output Image Only" />
      </div>
    </div>
  );
};
