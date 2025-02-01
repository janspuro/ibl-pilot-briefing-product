import { BriefingResultReport } from "./briefing-result-report.interface";

export interface BriefingResultStation {
  name: string;
  reports: BriefingResultReport[];
}
