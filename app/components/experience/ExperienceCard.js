import {
  CoreTypographyBody1, 
  CoreCardHeader, 
  viewFormattedDate, 
  CoreTypographyBody2, 
  CoreTypographySubtitle2, 
  CoreClasses 
} from "@wrappid/core";

export default function ExperienceCard(props) {
  const { designation, organization, location, startDate, endDate } = props;

  return (
    <CoreCardHeader
      title={
        <>
          <CoreTypographyBody1 styleClasses={[CoreClasses.TEXT.TEXT_WEIGHT_BOLD]}>{designation}</CoreTypographyBody1>
        </>
      }
      subheader={
        <>
          <CoreTypographySubtitle2>{organization}</CoreTypographySubtitle2>

          <CoreTypographySubtitle2>{location}</CoreTypographySubtitle2>

          <CoreTypographyBody2>

            {viewFormattedDate(startDate) + " - " + viewFormattedDate(endDate, "endDate")}
          </CoreTypographyBody2>
        </>
      }
    />
  );
}
