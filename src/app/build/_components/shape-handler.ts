import {
  Circle,
  FabricObject,
  IText,
  Line,
  Point,
  Rect,
  Triangle,
} from "fabric";
import { v4 as uuidv4 } from "uuid";

export const createSpecificShape = (shapeType: string, pointer: Point) => {
  switch (shapeType) {
    case "rectangle":
      return createRectangle(pointer);

    case "triangle":
      return createTriangle(pointer);

    case "circle":
      return createCircle(pointer);

    case "line":
      return createLine(pointer);

    case "text":
      return createText(pointer, "Tap to Type");

    default:
      return null;
  }
};

const createRectangle = (pointer: Point) => {
  const rect = new Rect({
    left: pointer.x,
    top: pointer.y,
    width: 100,
    height: 100,
    fill: "#aabbcc",
    objectId: uuidv4(),
  } as CustomFabricObject<Rect>);

  return rect;
};

const createTriangle = (pointer: Point) => {
  return new Triangle({
    left: pointer.x,
    top: pointer.y,
    width: 100,
    height: 100,
    fill: "#aabbcc",
    objectId: uuidv4(),
  } as CustomFabricObject<Triangle>);
};
const createCircle = (pointer: Point) => {
  return new Circle({
    left: pointer.x,
    top: pointer.y,
    radius: 100,
    fill: "#aabbcc",
    objectId: uuidv4(),
  });
};
const createLine = (pointer: Point) => {
  return new Line([pointer.x, pointer.y, pointer.x + 100, pointer.y + 100], {
    stroke: "#aabbcc",
    strokeWidth: 2,
    objectId: uuidv4(),
  });
};
const createText = (pointer: Point, text: string) => {
  return new IText(text, {
    left: pointer.x,
    top: pointer.y,
    fill: "#aabbcc",
    fontFamily: "Helvetica",
    fontSize: 36,
    fontWeight: "400",
    objectId: uuidv4(),
  });
};
interface CustomFabricObject<T extends FabricObject> extends FabricObject {
  objectId?: string;
}
