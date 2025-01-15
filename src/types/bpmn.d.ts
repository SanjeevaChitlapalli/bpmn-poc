declare module "bpmn-js" {
  import { EventBus, Canvas } from "diagram-js";

  export default class BpmnJS {
    constructor(options?: any);

    on(event: string, callback: Function): void;
    off(event: string, callback: Function): void;

    importXML(xml: string): Promise<{ warnings: Array<any> }>;
    saveXML(): Promise<{ xml: string }>;

    get(type: "canvas"): Canvas;
    get(type: "eventBus"): EventBus;

    destroy(): void;
  }
}

declare module "bpmn-js-properties-panel";
declare module "bpmn-js-properties-panel/lib/provider/bpmn";
declare module "bpmn-js-properties-panel/lib/provider/camunda";