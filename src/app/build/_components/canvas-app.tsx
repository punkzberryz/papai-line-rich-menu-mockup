"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, FabricObject, TPointerEvent, TPointerEventInfo } from "fabric";
import { Settings } from "./settings";
import { Tools } from "./tools";
import { Toolbar } from "./toolbar/toolbar";
import { ActiveElement, Attributes } from "./types";
import {
  handleCanvaseMouseMove,
  handleCanvasMouseDown,
  handleCanvasMouseUp,
  handleCanvasObjectMoving,
  handleCanvasObjectScaling,
  handleCanvasSelectionCreated,
  handleCanvasZoom,
  handlePathCreated,
  handleResize,
} from "./canvas-event-handler";
export const CanvasApp = () => {
  const {
    activeElement,
    handleActiveElement,
    fabricRef,
    canvasRef,
    imageInputRef,
  } = useCanvasApp();
  return (
    <div>
      <Toolbar
        activeElement={activeElement}
        handleActiveElement={handleActiveElement}
        imageInputRef={imageInputRef}
        handleImageUpload={(e) => {}}
      />
      <div className="border-2 border-green-700 w-fit mx-auto">
        <canvas id="canvas" ref={canvasRef} />
      </div>
      <Tools canvas={fabricRef.current} />
      <Settings canvas={fabricRef.current} />
    </div>
  );
};

const useCanvasApp = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<Canvas | null>(null);

  const isDrawing = useRef(false);

  //shape that user is currently drawing
  const shapeRef = useRef<FabricObject | null>(null);
  //shape that is selected (to be drawn)
  const selectedShapeRef = useRef<string | null>(null);
  //reference to the active/selected object in the canvas
  const activeObjectRef = useRef<FabricObject | null>(null);
  const isEditingRef = useRef(false);
  //for image upload into canvas
  const imageInputRef = useRef<HTMLInputElement>(null);
  /**
   * activeElement is an object that contains the name, value and icon of the
   * active element in the navbar.
   */
  const [activeElement, setActiveElement] = useState<ActiveElement>({
    name: "",
    value: "",
    icon: "",
  });
  /**
   * elementAttributes is an object that contains the attributes of the selected
   * element in the canvas.
   *
   * We use this to update the attributes of the selected element when the user
   * is editing the width, height, color etc properties/attributes of the
   * object.
   */
  const [elementAttributes, setElementAttributes] = useState<Attributes>({
    width: "",
    height: "",
    fontSize: "",
    fontFamily: "",
    fontWeight: "",
    fill: "#aabbcc",
    stroke: "#aabbcc",
  });

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = new Canvas(canvasRef.current, {
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
    });
    canvas.backgroundColor = "#fff";
    canvas.renderAll();

    //listen for mouse down event, we will use this to draw shapes
    canvas.on("mouse:down", (event) =>
      handleCanvasMouseDown({
        event,
        canvas,
        selectedShapeRef,
        isDrawing,
        shapeRef,
      })
    );
    canvas.on("mouse:move", (event) =>
      handleCanvaseMouseMove({
        event,
        canvas,
        selectedShapeRef,
        isDrawing,
        shapeRef,
      })
    );
    canvas.on("mouse:up", (event) =>
      handleCanvasMouseUp({
        isDrawing,
        shapeRef,
        activeObjectRef,
        canvas,
        event,
        selectedShapeRef,
        setActiveElement,
      })
    );
    canvas.on("path:created", (event) => {
      handlePathCreated({
        event: event as any,
      });
    });
    canvas.on("object:moving", (event) =>
      handleCanvasObjectMoving({
        event,
      })
    );
    canvas.on("selection:created", (event) =>
      handleCanvasSelectionCreated({
        event,
        isEditingRef,
        setElementAttributes,
      })
    );

    canvas.on("object:scaling", (event) =>
      handleCanvasObjectScaling({
        event,
        setElementAttributes,
      })
    );

    /**
     * listen to the mouse wheel event on the canvas which is fired when
     * the user scrolls the mouse wheel on the canvas.
     *
     * Event inspector: http://fabricjs.com/events
     * Event list: http://fabricjs.com/docs/fabric.Canvas.html#fire
     */
    canvas.on("mouse:wheel", (event) => {
      handleCanvasZoom({
        event,
        canvas,
      });
    });

    /**
     * listen to the resize event on the window which is fired when the
     * user resizes the window.
     *
     * We're using this to resize the canvas when the user resizes the
     * window.
     */
    // window.addEventListener("resize", () => {
    //   handleResize({
    //     canvas: fabricRef.current,
    //   });
    // });

    fabricRef.current = canvas;
    return () => {
      canvas.dispose();
    };
  }, [canvasRef]);

  const handleActiveElement = (el: ActiveElement) => {
    setActiveElement(el);
    switch (el.value) {
      // delete all the shapes from the canvas
      case "reset":
        // clear the storage
        // deleteAllShapes();
        // clear the canvas
        fabricRef.current?.clear();
        // set "select" as the active element
        setActiveElement(DEFAULT_ACTIVE_ELEMENT);
        break;
    }
    selectedShapeRef.current = el.value;
  };

  return {
    fabricRef,
    canvasRef,
    activeElement,
    handleActiveElement,
    shapeRef,
    imageInputRef,
  };
};

const DEFAULT_WIDTH = 2500 / 2.5;
const DEFAULT_HEIGHT = 1686 / 2.5;

export const DEFAULT_ACTIVE_ELEMENT = {
  icon: "/assets/select.svg",
  name: "Select",
  value: "select",
};
