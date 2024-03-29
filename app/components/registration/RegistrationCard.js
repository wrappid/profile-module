import {
  CoreLabel,
  CoreTypographyBody2,
  CoreGrid,
  CoreLink
} from "@wrappid/core";
import { useSelector } from "react-redux";

export default function RegistrationCard(props) {
  const {
    regNo = "",
    regDate = "",
    degrees = "",
    departmentId,
    registrationDocument = "",
  } = props;

  const departments = useSelector(state => state?.common?.departments);

  // eslint-disable-next-line no-console
  console.log("PROFILE REGISTRAION CARD", props);

  return (
    <CoreGrid>
      <CoreLabel>Specialization</CoreLabel>

      <CoreTypographyBody2>
        {departments?.find(dept => dept?.id === departmentId)?.name || "Not Given"}
      </CoreTypographyBody2>

      <CoreLabel>Degrees</CoreLabel>

      <CoreTypographyBody2>
        {degrees || "Not given"}
      </CoreTypographyBody2>

      <CoreLabel>Registration Number</CoreLabel>

      <CoreTypographyBody2>{regNo || "Not given"}</CoreTypographyBody2>

      <CoreLabel>Registration Date</CoreLabel>

      <CoreTypographyBody2>
        {regDate ? regDate : "Not given"}
      </CoreTypographyBody2>

      <CoreLabel>Registration Document</CoreLabel>

      {registrationDocument ? (
        <CoreLink href={registrationDocument}>Download</CoreLink>
      ) : (
        <CoreTypographyBody2>{"Not given"}</CoreTypographyBody2>
      )}
    </CoreGrid>
  );
}
