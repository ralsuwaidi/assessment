import { MembersTypes } from "../../../components/MembersList";

interface PluralSkillType {
  id: string;
  name: string;
  avatar: string;
  designation?: string;
  state?: string;
}

const pluralSkills: MembersTypes[] = [
  {
    id: 1,
    name: "Kotlin: App Data and Storage",
    avatar:
      "https://pluralsight2.imgix.net/assessments/images/icons/kotlin-c38e6fb2aa.png",
    designation: "Development",
  },
  {
    id: 2,
    name: "Application Security on Microsoft Azure",
    avatar:
      "https://pluralsight2.imgix.net/paths/images/group-policy-administration-ee0dacafe8.png",
    designation: "Development",
  },
  {
    id: 3,
    name: "Deploying SharePoint Server for On-premises and Hybrid Scenarios",
    avatar:
      "https://pluralsight2.imgix.net/assessments/images/icons/no-logo-jAtNDcyYi00ZWJ.png",
    designation: "IT Ops",
  },
];

export { pluralSkills };
