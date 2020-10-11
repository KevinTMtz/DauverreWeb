/// <reference types="react-scripts" />

interface PostParams {
  postID: string;
}

interface ResidentParams {
  residentID: string;
}

interface ReportParams extends ResidentParams {
  reportID: string;
}
