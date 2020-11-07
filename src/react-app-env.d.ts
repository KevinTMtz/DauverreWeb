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

interface PostData {
  title: string;
  date: Date;
  content: string;
  imageUrl: string;
}

type Post = PostData & PostParams;

interface ResidentData {
  firstName: string;
  lastName: string;
  gender: string;
  isVisible: boolean;
  birthDate: Date;
  telephone: string;
}

type Resident = ResidentData & ResidentParams;

type OneToFiveIdx = 1 | 2 | 3 | 4 | 5;

type OneToThreeIdx = 1 | 2 | 3;

interface CustomaAxisTickProps {
  x: number;
  y: number;
  payload: any;
}

interface ReportData {
  date: Date;
  mood: OneToFiveIdx;
  health: OneToFiveIdx;
  sad: boolean;
  angry: boolean;
  rested: boolean;
  wellFed: boolean;
  lonely: boolean;
  comments: string;
}

type Report = ReportData & ReportParams;

interface SuccessState {
  state: 'success';
}

interface SuccessAndURL extends SuccessState {
  url: string;
}

interface SuccessAndPostData extends SuccessState {
  post: PostData;
}

interface SuccessAndReport extends SuccessState {
  report: Report;
}

interface SuccessAndResident extends SuccessState {
  resident: Resident;
}

interface NotFoundState {
  state: 'not found';
}

interface UnableToUploadFileState {
  state: 'not uploaded';
}

interface AuthenticationError {
  state: 'auth error';
  error: string;
}

interface ValidationErrorsState {
  state: 'validation errors';
  errors: string[];
}

interface FirebaseErrorState {
  state: 'firebase error';
  code: string;
  message: string;
}

type FirebaseCollection = firebase.firestore.CollectionReference<
  firebase.firestore.DocumentData
>;
