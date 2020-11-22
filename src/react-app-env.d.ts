/// <reference types="react-scripts" />
/// <reference types="@emotion/react/types/css-prop" />
declare module '@material-ui/lab/dateAdapter/date-fns';
declare module '@material-ui/lab/LocalizationProvider';
declare module '@material-ui/lab/DatePicker';

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
}

type Resident = ResidentData & ResidentParams;

type OneToFiveIdx = 1 | 2 | 3 | 4 | 5;

type OneToThreeIdx = 1 | 2 | 3;

interface CustomAxisTickProps {
  x: number;
  y: number;
  payload: activePayload;
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

interface ResidentFamNewAccount {
  loginMethodIdx: 0;
  telephone: string;
}

interface ResidentFamExistingAccount {
  loginMethodIdx: 1;
  accountID: string;
}

type ResidentFamLoginMethod =
  | ResidentFamNewAccount
  | ResidentFamExistingAccount;

interface AccountListing {
  accountID: string;
  telephone: string;
  residents: {
    residentID: string;
    name: string;
  }[];
}

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
  account: ResidentFamExistingAccount;
}

interface SuccessAndAccountListings extends SuccessState {
  accounts: AccountListing[];
}

interface SuccessAndStats extends SuccessState {
  statsCollection: DocumentData[];
}

interface NotFoundState {
  state: 'not found';
  message?: string;
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

interface ClosedDialogFormState {
  state: 'closed';
}

interface WaitingOnInputFormState {
  state: 'waiting';
  substate?: string;
}

interface CorrectFormState {
  state: 'correct';
  message: string;
}

interface LoadingFormState {
  state: 'loading';
}

interface ServerErrorFormState {
  state: 'server error';
  message: string;
}

type FormState =
  | ClosedDialogFormState
  | WaitingOnInputFormState
  | CorrectFormState
  | LoadingFormState
  | ServerErrorFormState;

type FirebaseCollection = firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

interface UserAcc {
  uid: string;
  claims: {
    admin?: boolean;
    psy?: boolean;
  };
}
