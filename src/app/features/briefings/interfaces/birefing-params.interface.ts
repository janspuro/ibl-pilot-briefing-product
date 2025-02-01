import { ReportType } from "../enums/report-type.enum";

export interface BriefingParams {
  id: string; 
  reportTypes: ReportType[];        
  stations: string[];
  countries: string[];
}
