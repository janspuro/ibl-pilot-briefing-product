import { ReportType } from "../enums/report-type.enum";
import { ReportRevision } from "../enums/report-revision.enum";

export interface BriefingReport {
  placeId?: string;
  queryType: ReportType;
  receptionTime: string;
  refs?: string[];
  reportTime?: string;
  reportType: string;
  revision?: ReportRevision;
  stationId: string;
  text: string;
  textHTML?: string;
  validFrom?: string;
  validTo?: string;
}
