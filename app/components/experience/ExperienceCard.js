import { CoreTypographyBody1, CoreCardHeader } from "@wrappid/core";

export default function experienceCard(props) {
  const { designation, organization, location, startDate, endDate } = props;

  return (
    <CoreCardHeader
      title={
        <>
          <CoreTypographyBody1>{designation}</CoreTypographyBody1>
        </>
      }
      subheader={
        <>
          <CoreTypographyBody1>{organization}</CoreTypographyBody1>

          <CoreTypographyBody1>{location}</CoreTypographyBody1>

          <CoreTypographyBody1>
            {startDate + " - " + (endDate, "endDate")}

            {/* -- {viewFormattedDate(startDate) + " - " + viewFormattedDate(endDate, "endDate")} */}
          </CoreTypographyBody1>
        </>
      }
    />
  );
}
