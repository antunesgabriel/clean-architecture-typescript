type CreateRouteInput = {
  title: string;
  startPosition: LatLog;
  endPosition: LatLog;
  points?: LatLog[];
};

type CreateRouteOutput = {
  id: string;
  title: string;
  startPosition: LatLog;
  endPosition: LatLog;
  points: LatLog[];
};

type FindAllRouteOutput = Array<{
  id: string;
  title: string;
  startPosition: LatLog;
  endPosition: LatLog;
  points: LatLog[];
}>;
