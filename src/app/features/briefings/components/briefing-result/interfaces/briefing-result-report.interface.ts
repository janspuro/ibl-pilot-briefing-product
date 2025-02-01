import { SafeHtml } from "@angular/platform-browser";

import { BriefingReport } from "../../../interfaces/briefing-report.interface";

export interface BriefingResultReport extends Omit<BriefingReport, 'textHTML'> {
  textHTML: SafeHtml;
}
