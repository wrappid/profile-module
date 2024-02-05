import {
  CoreTypographyBody1, CoreTypographyBody2, CoreTypographySubtitle2, CoreCardHeader, viewFormattedDate, CoreClasses, CoreStack 
} from "@wrappid/core";

export default function EducationCard(props) {
  const {
    degree, school, location, board, startDate, endDate 
  } = props;

  return (
    <CoreCardHeader
      title={
        <CoreTypographyBody1 styleClasses={[CoreClasses.TEXT.TEXT_WEIGHT_BOLD]}>
          {degree}
        </CoreTypographyBody1>
      }
      subheader={
        <CoreStack>
          <CoreTypographySubtitle2>{school}</CoreTypographySubtitle2>

          <CoreTypographySubtitle2>{board + ", " + location}</CoreTypographySubtitle2>

          <CoreTypographyBody2>
            {viewFormattedDate(startDate) + " - " + viewFormattedDate(endDate, "endDate")}
          </CoreTypographyBody2>
        </CoreStack>
      }
    />
  );
}
