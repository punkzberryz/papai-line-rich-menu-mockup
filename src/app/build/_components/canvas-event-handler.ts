import {
  BasicTransformEvent,
  Canvas,
  FabricObject,
  FabricObjectProps,
  ObjectEvents,
  Path,
  SerializedObjectProps,
  TEvent,
  TPointerEvent,
  TPointerEventInfo,
} from "fabric";
import { createSpecificShape } from "./shape-handler";
import { ActiveElement, Attributes } from "./types";
import { DEFAULT_ACTIVE_ELEMENT } from "./canvas-app";
import { v4 as uuid4 } from "uuid";
// instantiate creation of custom fabric object/shape and add it to canvas
export const handleCanvasMouseDown = ({
  event,
  canvas,
  selectedShapeRef,
  isDrawing,
  shapeRef,
}: {
  event: TPointerEventInfo<TPointerEvent>;
  canvas: Canvas;
  selectedShapeRef: React.MutableRefObject<string | null>;
  isDrawing: React.MutableRefObject<boolean>;
  shapeRef: React.MutableRefObject<FabricObject | null>;
}) => {
  // get pointer coordinates
  const pointer = canvas.getViewportPoint(event.e);
  const target = canvas.findTarget(event.e);
  //set canvas drawing mode to false
  canvas.isDrawingMode = false;
  //if selected shape is freeform, set drawing mode to true and return

  if (selectedShapeRef.current === "freeform") {
    if (!canvas.freeDrawingBrush) return;
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 5;
    isDrawing.current = true;
    return;
  }

  canvas.isDrawingMode = false;
  // if target is the selected shape or active selection, set isDrawing to false

  if (
    target &&
    (target.type === selectedShapeRef.current ||
      target.type === "activeSelection")
  ) {
    isDrawing.current = false;
    // set active object to target
    canvas.setActiveObject(target);
    /**
     * setCoords() is used to update the controls of the object
     * setCoords: http://fabricjs.com/docs/fabric.Object.html#setCoords
     */
    target.setCoords();
  } else {
    isDrawing.current = true;
    if (selectedShapeRef.current)
      // create custom fabric object/shape and set it to shapeRef
      shapeRef.current = createSpecificShape(selectedShapeRef.current, pointer);
  }
  // if shapeRef is not null, add it to canvas

  if (shapeRef.current) {
    // add: http://fabricjs.com/docs/fabric.Canvas.html#add
    canvas.add(shapeRef.current);
  }
};

// handle mouse move event on canvas to draw shapes with different dimensions
export const handleCanvaseMouseMove = ({
  event,
  canvas,
  selectedShapeRef,
  isDrawing,
  shapeRef,
}: {
  event: TPointerEventInfo<TPointerEvent>;
  canvas: Canvas;
  selectedShapeRef: React.MutableRefObject<string | null>;
  isDrawing: React.MutableRefObject<boolean>;
  shapeRef: React.MutableRefObject<FabricObject | null>;
}) => {
  // if selected shape is freeform, return
  if (!isDrawing.current) return;
  if (selectedShapeRef.current === "freeform") return;

  canvas.isDrawingMode = false;

  // get pointer coordinates
  const pointer = canvas.getViewportPoint(event.e);

  // depending on the selected shape, set the dimensions of the shape stored in shapeRef in previous step of handelCanvasMouseDown
  // calculate shape dimensions based on pointer coordinates
  switch (selectedShapeRef?.current) {
    case "rectangle":
      shapeRef.current?.set({
        width: pointer.x - (shapeRef.current?.left || 0),
        height: pointer.y - (shapeRef.current?.top || 0),
      });
      break;

    case "circle":
      shapeRef.current?.set({
        radius: Math.abs(pointer.x - (shapeRef.current?.left || 0)) / 2,
      });
      break;

    case "triangle":
      shapeRef.current?.set({
        width: pointer.x - (shapeRef.current?.left || 0),
        height: pointer.y - (shapeRef.current?.top || 0),
      });
      break;

    case "line":
      shapeRef.current?.set({
        x2: pointer.x,
        y2: pointer.y,
      });
      break;

    case "image":
      shapeRef.current?.set({
        width: pointer.x - (shapeRef.current?.left || 0),
        height: pointer.y - (shapeRef.current?.top || 0),
      });

    default:
      break;
  }
  // render objects on canvas
  // renderAll: http://fabricjs.com/docs/fabric.Canvas.html#renderAll
  canvas.renderAll();
};
// handle mouse up event on canvas to stop drawing shapes
export const handleCanvasMouseUp = ({
  canvas,
  isDrawing,
  shapeRef,
  activeObjectRef,
  selectedShapeRef,
  setActiveElement,
}: {
  event: TPointerEventInfo<TPointerEvent>;
  canvas: Canvas;
  selectedShapeRef: React.MutableRefObject<string | null>;
  isDrawing: React.MutableRefObject<boolean>;
  shapeRef: React.MutableRefObject<FabricObject | null>;
  setActiveElement: (element: ActiveElement) => void;
  activeObjectRef: React.MutableRefObject<FabricObject | null>;
}) => {
  isDrawing.current = false;
  if (selectedShapeRef.current === "freeform") return;
  // set everything to null
  shapeRef.current = null;
  activeObjectRef.current = null;
  selectedShapeRef.current = null;

  // if canvas is not in drawing mode, set active element to default nav element after 700ms
  if (!canvas.isDrawingMode) {
    setTimeout(() => {
      setActiveElement(DEFAULT_ACTIVE_ELEMENT);
    }, 700);
  }
};

// update shape in storage when path is created when in freeform mode
export const handlePathCreated = ({
  event,
}: {
  event: TPointerEventInfo<TPointerEvent> & {
    path: FabricObject<Path> & { objectId?: string };
  };
}) => {
  // get path object
  const path = event.path;
  if (!path) return;

  // set unique id to path object
  path.set({
    objectId: uuid4(),
  });

  // sync shape in storage
  // syncShapeInStorage(path);
};
// check how object is moving on canvas and restrict it to canvas boundaries
export const handleCanvasObjectMoving = ({
  event,
}: {
  event: BasicTransformEvent<TPointerEvent> & {
    target: FabricObject;
  };
}) => {
  // get target object which is moving
  const target = event.target;
  if (!target) return;
  // target.canvas is the canvas on which the object is moving
  const canvas = target.canvas as Canvas;
  // set coordinates of target object
  target.setCoords();
  // restrict object to canvas boundaries (horizontal)
  if (target && target.left) {
    target.left = Math.max(
      0,
      Math.min(
        target.left,
        (canvas.width || 0) - (target.getScaledWidth() || target.width || 0)
      )
    );
  }
  // restrict object to canvas boundaries (vertical)
  if (target && target.top) {
    target.top = Math.max(
      0,
      Math.min(
        target.top,
        (canvas.height || 0) - (target.getScaledHeight() || target.height || 0)
      )
    );
  }
};
// set element attributes when element is selected
export const handleCanvasSelectionCreated = ({
  event,
  isEditingRef,
  setElementAttributes,
}: {
  event: Partial<TEvent<TPointerEvent>> & {
    selected: FabricObject<
      Partial<FabricObjectProps>,
      SerializedObjectProps,
      ObjectEvents
    >[];
  };
  isEditingRef: React.MutableRefObject<boolean>;
  setElementAttributes: React.Dispatch<React.SetStateAction<Attributes>>;
}) => {
  // if user is editing manually, return
  if (isEditingRef.current) return;
  // if no element is selected, return
  if (!event.selected) return;

  // get the selected element
  const selectedElement = event.selected[0] as FabricObject;
  // if only one element is selected, set element attributes
  if (selectedElement && event.selected.length === 1) {
    // calculate scaled dimensions of the object
    const scaledWidth = selectedElement?.scaleX
      ? selectedElement?.width! * selectedElement?.scaleX
      : selectedElement?.width;

    const scaledHeight = selectedElement?.scaleY
      ? selectedElement?.height! * selectedElement?.scaleY
      : selectedElement?.height;

    setElementAttributes({
      width: scaledWidth?.toFixed(0).toString() || "",
      height: scaledHeight?.toFixed(0).toString() || "",
      fill: selectedElement?.fill?.toString() || "",
      // @ts-ignore
      stroke: selectedElement?.stroke || "",
      // @ts-ignore
      fontSize: selectedElement?.fontSize || "",
      // @ts-ignore
      fontFamily: selectedElement?.fontFamily || "",
      // @ts-ignore
      fontWeight: selectedElement?.fontWeight || "",
    });
  }
};

// update element attributes when element is scaled
export const handleCanvasObjectScaling = ({
  event,
  setElementAttributes,
}: {
  event: BasicTransformEvent<TPointerEvent> & {
    target: FabricObject;
  };
  setElementAttributes: React.Dispatch<React.SetStateAction<Attributes>>;
}) => {
  const selectedElement = event.target;

  // calculate scaled dimensions of the object
  const scaledWidth = selectedElement?.scaleX
    ? selectedElement?.width! * selectedElement?.scaleX
    : selectedElement?.width;

  const scaledHeight = selectedElement?.scaleY
    ? selectedElement?.height! * selectedElement?.scaleY
    : selectedElement?.height;

  setElementAttributes((prev) => ({
    ...prev,
    width: scaledWidth?.toFixed(0).toString() || "",
    height: scaledHeight?.toFixed(0).toString() || "",
  }));
};
// resize canvas dimensions on window resize
export const handleResize = ({ canvas }: { canvas: Canvas | null }) => {
  const canvasElement = document.getElementById("canvas");
  if (!canvasElement) return;

  if (!canvas) return;

  canvas.setDimensions({
    width: canvasElement.clientWidth,
    height: canvasElement.clientHeight,
  });
};

// zoom canvas on mouse scroll
export const handleCanvasZoom = ({
  canvas,
  event,
}: {
  event: TPointerEventInfo<WheelEvent>;
  canvas: Canvas | null;
}) => {
  if (!canvas) return;
  const delta = event.e?.deltaY;
  let zoom = canvas.getZoom();

  // allow zooming to min 20% and max 100%
  const minZoom = 0.2;
  const maxZoom = 1;
  const zoomStep = 0.001;

  // calculate zoom based on mouse scroll wheel with min and max zoom
  zoom = Math.min(Math.max(minZoom, zoom + delta * zoomStep), maxZoom);

  // set zoom to canvas
  // zoomToPoint: http://fabricjs.com/docs/fabric.Canvas.html#zoomToPoint
  const pointer = canvas.getViewportPoint(event.e);
  pointer.x = event.e.offsetX;
  pointer.y = event.e.offsetY;
  canvas.zoomToPoint(pointer, zoom);

  event.e.preventDefault();
  event.e.stopPropagation();
};
