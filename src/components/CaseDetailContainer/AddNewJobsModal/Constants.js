export const initialVal = {
  job_no: "",
  case_id: "",
  type: "",
  url: "",
  schedule: "",
};
export const formFields = [
  {
    id: "1a",
    label: "Job No.",
    type: "text",
    name: "job_no",
    validation: {
      required: true,
      errorMessage: "Job Number is required.",
    },
  },
  {
    id: "1b",
    label: "Select Source Type",
    type: "select",
    name: "type",
    options: [
      { id: "option-source", value: "", label: "Source Type" },
      { id: "option-Url to pdf", value: "Url to pdf", label: " Url to pdf" },
    ],
    validation: {
      required: true,
      errorMessage: "Source Type is required.",
    },
  },
  {
    id: "3c",
    label: "URL Address",
    type: "text",
    name: "url",
    validation: {
      required: true,
      pattern:
        /^(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:www\.)?(?:[-a-z0-9]+\.)+[a-z]{2,}(?::\d{2,5})?(?:\/[^\s]*)?$/i,
      errorMessage: "URL is required.",
    },
  },
  {
    id: "4d",
    label: "Select Schedule",
    type: "select",
    name: "schedule",
    options: [
      { value: "", label: "Select Schedule" },
      { value: "one-time", label: "One-time" },
      { value: "hourly", label: "Hourly" },
      { value: "weekly", label: "Weekly" },
      { value: "monthly", label: "Monthly" },
    ],
    validation: {
      required: true,
      errorMessage: "Schedule is required.",
    },
  },
];
