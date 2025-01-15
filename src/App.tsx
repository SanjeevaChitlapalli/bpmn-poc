import { BPMNModeler } from "./components/BPMNModeler";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">MES Production System</h1>

      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Production Process Flow</h2>
        <div className="flex gap-4 mb-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              const modeler = document.querySelector(".bpmn-modeler");
              if (modeler) {
                const event = new CustomEvent("save-diagram");
                modeler.dispatchEvent(event);
              }
            }}
          >
            Save Diagram
          </button>
        </div>
        <BPMNModeler className="h-[10000px] border border-gray-200 rounded bpmn-modeler" />
      </div>
    </div>
  );
}
export default App;
