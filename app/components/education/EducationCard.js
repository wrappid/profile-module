import {
  CoreTypographyBody1,
  CoreCardHeader
} from "@wrappid/core";

export default function educationCard(props) {
  const {
    degree, school, location, board, startDate, endDate 
  } = props;

  return (
    <CoreCardHeader
      title={
        <>
          <CoreTypographyBody1>{degree}</CoreTypographyBody1>
        </>
      }
      subheader={
        <>
          <CoreTypographyBody1>{school}</CoreTypographyBody1>

          <CoreTypographyBody1>{board + ", " + location}</CoreTypographyBody1>

          <CoreTypographyBody1>
            {(startDate) + " - " + (endDate, "endDate")}
                        
            {/* -- {viewFormattedDate(startDate) + " - " + viewFormattedDate(endDate, "endDate")} */}
          </CoreTypographyBody1>
        </>
      }
    />
  );
}
