import { fromToday } from "../utils/helpers";

export const projects = [
  {
    id: 1,
    title: "All-Safe task",
    description:
      "a full-featured project management dashboard similar to trello (but simplified).",
    createionData: fromToday(-3),
    tasks: [
      {
        id: 1,
        title: "initial project setup",
        description: "packages, structure, etc...",
        assignee: "amr",
        dueDate: fromToday(3),
      },
      {
        id: 2,
        title: "initial project setup",
        description: "packages, structure, etc...",
        assignee: "eng.amr",
        dueDate: fromToday(7),
      },
      {
        id: 3,
        title: "initial project setup",
        description: "packages, structure, etc...",
        assignee: "eng.amr",
        dueDate: fromToday(1),
      },
    ],
  },
];
