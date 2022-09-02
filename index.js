//Point (2d and 3d)
const create2dPoint = (x, y) => ({ x, y });
const create3dPoint = (x, y, z) => ({ x, y, z });

const point1 = create2dPoint(0, 0);
const point2 = create2dPoint(3, 2);
const point3 = create2dPoint(3, 0);
const point4 = create2dPoint(0, 2);

const point5 = create3dPoint(1, -2, 3);
const point6 = create3dPoint(2, 4, 5);
const point7 = create3dPoint(10, 7, 3);
const point8 = create3dPoint(6, 4, 5);

//Vector (2d and 3d)
const create2dVector = (p1, p2) => ({ x: p2.x - p1.x, y: p2.y - p1.y });
const vector1 = create2dVector(point1, point2);
const vector2 = create2dVector(point3, point4);

const create3dVector = (p1, p2) => ({
  x: p2.x - p1.x,
  y: p2.y - p1.y,
  z: p2.z - p1.z,
});
const vector3 = create3dVector(point5, point6);
const vector4 = create3dVector(point7, point8);

const get2dVectorLength = ({ x, y }) =>
  Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
const get3dVectorLength = ({ x, y, z }) =>
  Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));

const sum2dVectors = (v1, v2) => ({ x: v1.x + v2.x, y: v1.y + v2.y });
const sum3dVectors = (v3, v4) => ({
  x: v3.x + v4.x,
  y: v3.y + v4.y,
  z: v3.z + v4.z,
});

const subtract2dVectors = (v1, v2) => ({ x: v1.x - v2.x, y: v1.y - v2.y });
const subtract3dVectors = (v3, v4) => ({
  x: v3.x - v4.x,
  y: v3.y - v4.y,
  z: v3.z - v4.z,
});

//Length (2d and 3d)
const create2dLength = (p1, p2) => ({ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y });
const length1 = create2dLength(point1, point2);
const length2 = create2dLength(point3, point4);

const create3dLength = (p3, p4) => ({
  x1: p3.x,
  y1: p3.y,
  z1: p3.z,
  x2: p4.x,
  y2: p4.y,
  z2: p4.z,
});
const length3 = create3dLength(point5, point6);
const length4 = create3dLength(point7, point8);

const get2dLength = ({ x1, x2, y1, y2 }) =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
const get3dLength = ({ x1, x2, y1, y2, z1, z2 }) =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));

//Circle
const radius = get2dLength(length1);
const center = { x: length1.x1, y: length1.y1 };

const createCircle = ({ x, y }, radius) => ({ x, y, radius });
const getCircleSquare = ({ radius }) => Math.PI * Math.pow(radius, 2);
const getSphereVolume = ({ radius }) => (4 / 3) * Math.PI * Math.pow(radius, 3);

const circle = createCircle(center, radius);
const circle_square =
  Math.round(getCircleSquare(circle) * Math.pow(10, 2)) / Math.pow(10, 2);
const circle_volume =
  Math.round(getSphereVolume(circle) * Math.pow(10, 2)) / Math.pow(10, 2);

//Triangle
const height = 5;
const createTriangle = ({ x1, x2, y1, y2 }, { x, y }) => ({
  A: { x: x1, y: y1 },
  B: { x: x2, y: y2 },
  C: { x, y },
});
const isPointOnLength = (point, length) =>
  (point.x - length.x1) / (length.x2 - length.x1) ===
  (point.y - length.y1) / (length.y2 - length.y1);

const triangle = isPointOnLength(point3, length1)
  ? "Unable to create a triangle"
  : createTriangle(length1, point3);

const length_triangle1 = get2dLength(create2dLength(triangle.A, triangle.B));
const length_triangle2 = get2dLength(create2dLength(triangle.B, triangle.C));
const length_triangle3 = get2dLength(create2dLength(triangle.C, triangle.A));

const getSemiPerimeter = (l1, l2, l3) => (l1 + l2 + l3) / 2;
const getTriangleSquare = (semi_p, l1, l2, l3) =>
  Math.sqrt(semi_p * (semi_p - l1) * (semi_p - l2) * (semi_p - l3));
const getTriangleVolume = (square, height) => (1 / 3) * square * height;

const semi_perimeter = getSemiPerimeter(
  length_triangle1,
  length_triangle2,
  length_triangle3
);
const triangle_square =
  Math.round(
    getTriangleSquare(
      semi_perimeter,
      length_triangle1,
      length_triangle2,
      length_triangle3
    ) * Math.pow(10, 2)
  ) / Math.pow(10, 2);
const triangle_volume = getTriangleVolume(triangle_square, height);

//quadrilateral
const height_quadrilateral = 5;
const diagonal1 = length1;
const diagonal2 = length2;
const diagonal1_length = get2dLength(diagonal1);
const diagonal2_length = get2dLength(diagonal2);

const getMidPointLength = (length) => ({
  x: (length.x1 + length.x2) / 2,
  y: length.y1 + length.y2,
});
const createQuadrilateral = (d1, d2) => ({
  A: { x: d1.x1, y: d1.y1 },
  B: { x: d2.x1, y: d2.y1 },
  C: { x: d1.x2, y: d1.y2 },
  D: { x: d2.x2, y: d2.y2 },
});

const mid_point_diagonal1 = getMidPointLength(diagonal1);
const mid_point_diagonal2 = getMidPointLength(diagonal2);

const quadrilateral =
  JSON.stringify(mid_point_diagonal1) === JSON.stringify(mid_point_diagonal2) &&
  diagonal1_length === diagonal1_length
    ? createQuadrilateral(diagonal1, diagonal2)
    : "Unable to create shape";

const length_quadrilateral = get2dLength(
  create2dLength(quadrilateral.A, quadrilateral.B)
);
const width_quadrilateral = get2dLength(
  create2dLength(quadrilateral.B, quadrilateral.C)
);

const isSquare = (length, width) =>
  length_quadrilateral === width_quadrilateral;
const getAreaSquare = (length) => Math.pow(length, 2);
const getRectangleSquare = (length, width) => length * width;

const getVolumeCube = (length) => Math.pow(length, 3);
const getVolumeRectParallelepiped = (a, b, c) => a * b * c;

const square_quadrilateral = isSquare(length_quadrilateral, width_quadrilateral)
  ? getAreaSquare(length_quadrilateral)
  : getRectangleSquare(length_quadrilateral, width_quadrilateral);

const volume_quadrilateral = isSquare(length_quadrilateral, width_quadrilateral)
  ? getVolumeCube(length_quadrilateral)
  : getVolumeRectParallelepiped(
      length_quadrilateral,
      width_quadrilateral,
      height_quadrilateral
    );

