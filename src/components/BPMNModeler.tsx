import React, { useEffect, useRef } from "react";
import BpmnModeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js-properties-panel/dist/assets/properties-panel.css";

import * as PropertiesPanel from "bpmn-js-properties-panel";
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
} from "bpmn-js-properties-panel";

const INITIAL_DIAGRAM = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions 
  xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
  xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
  xmlns:modeler="http://camunda.org/schema/modeler/1.0"
  id="Definitions_1"
  targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1" name="Start Production">
      <bpmn:outgoing>Flow_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Activity_1" name="Initialize Production">
      <bpmn:incoming>Flow_1</bpmn:incoming>
      <bpmn:outgoing>Flow_2</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Activity_1" />
    <bpmn:endEvent id="Event_1" name="Production Complete">
      <bpmn:incoming>Flow_2</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Activity_1" targetRef="Event_1" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_1" bpmnElement="StartEvent_1">
        <dc:Bounds x="152" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="134" y="145" width="73" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1_di" bpmnElement="Activity_1">
        <dc:Bounds x="240" y="80" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1_di" bpmnElement="Event_1">
        <dc:Bounds x="392" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="373" y="145" width="74" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
        <di:waypoint x="188" y="120" />
        <di:waypoint x="240" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
        <di:waypoint x="340" y="120" />
        <di:waypoint x="392" y="120" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

interface BPMNModelerProps {
  className?: string;
}

export const BPMNModeler: React.FC<BPMNModelerProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const propertiesPanelRef = useRef<HTMLDivElement>(null);
  const modelerRef = useRef<BpmnModeler | null>(null);

  useEffect(() => {
    if (!containerRef.current || !propertiesPanelRef.current) return;

    const modeler = new BpmnModeler({
      container: containerRef.current,
      propertiesPanel: {
        parent: propertiesPanelRef.current,
      },
      additionalModules: [
        PropertiesPanel,
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
      ],
      keyboard: {
        bindTo: document,
      },
    });

    modelerRef.current = modeler;

    modeler.importXML(INITIAL_DIAGRAM).catch((err) => {
      console.error("Error importing BPMN diagram", err);
    });

    // Add event listener for saving the diagram
    const handleSave = async () => {
      try {
        const { xml } = await modeler.saveXML({ format: true });
        console.log("Diagram XML:", xml);
        alert("Diagram saved successfully! Check console for XML output.");
      } catch (err) {
        console.error("Error saving diagram:", err);
        alert("Error saving diagram. Check console for details.");
      }
    };

    containerRef.current.addEventListener("save-diagram", handleSave);

    return () => {
      containerRef.current?.removeEventListener("save-diagram", handleSave);
      modeler.destroy();
    };
  }, []);

  return (
    <div className="flex h-[100dvh]">
      <div ref={containerRef} className="flex-grow">
        {/* BPMN modeler will be rendered here */}
      </div>
      <div
        ref={propertiesPanelRef}
        className="w-96 border-l border-gray-200 overflow-auto"
      >
        {/* Properties panel will be rendered here */}
      </div>
    </div>
  );
};
