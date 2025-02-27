export interface ChangeApplicationStatus {
  status: string;
  rejectionMessage: string;
  applicationId: string;
}


 export interface ChangeApplicationStatusResponse {
    statusCode: number;
    message: string;
  }