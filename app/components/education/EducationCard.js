import {
  CoreTypographyBody1, CoreTypographyBody2, CoreTypographySubtitle2, CoreCardHeader, viewFormattedDate, CoreClasses 
} from "@wrappid/core";

export default function EducationCard(props) {
  const {
    degree, school, location, board, startDate, endDate 
  } = props;

  return (
    <CoreCardHeader
      title={
        <>
          <CoreTypographyBody1 styleClasses={[CoreClasses.TEXT.TEXT_WEIGHT_BOLD]}>{degree}</CoreTypographyBody1>
        </>
      }
      subheader={
        <>
          <CoreTypographySubtitle2>{school}</CoreTypographySubtitle2>

          <CoreTypographySubtitle2>{board + ", " + location}</CoreTypographySubtitle2>

          <CoreTypographyBody2>
            {/* -- {startDate + " - " + (endDate, "endDate")} */}

            {viewFormattedDate(startDate) + " - " + viewFormattedDate(endDate, "endDate")}
          </CoreTypographyBody2>
        </>
      }
    />
  );
}
