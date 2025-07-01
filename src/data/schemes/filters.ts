export type Filter = {
  label: string;
  type: "select" | "input";
};

export const filters: Filter[] = [
  { label: "State", type: "select" },
  { label: "Scheme Category", type: "select" },
  { label: "Gender", type: "select" },
  { label: "Age", type: "input" },
  { label: "Caste", type: "select" },
  { label: "Ministry Name", type: "select" },
  { label: "Residence", type: "select" },
  { label: "Minority", type: "select" },
  { label: "Differently Abled", type: "select" },
  { label: "Benefit Type", type: "select" },
  { label: "DBT Scheme", type: "select" },
  { label: "Marital Status", type: "select" },
  { label: "Disability Percentage", type: "input" },
  { label: "Below Poverty Line", type: "select" },
  { label: "Economic Distress", type: "select" },
  { label: "Government Employee", type: "select" },
  { label: "Employment Status", type: "select" },
  { label: "Student", type: "select" },
  { label: "Occupation", type: "select" },
  { label: "Application Mode", type: "select" },
  { label: "Scheme Type", type: "select" },
]; 