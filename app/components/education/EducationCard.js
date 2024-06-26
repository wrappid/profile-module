import {
  CoreTypographyBody1, CoreTypographyBody2, CoreTypographySubtitle2, CoreCardHeader, viewFormattedDate, CoreClasses, CoreStack, CoreGrid 
} from "@wrappid/core";

export default function EducationCard(props) {
  const {
    degree, school, location, board, startDate, endDate 
  } = props;

  return (
    <CoreGrid>
      <CoreCardHeader
        styleClasses={[CoreClasses.PADDING.P0]}  
        title={ 
          <CoreTypographyBody1 styleClasses={[CoreClasses.TEXT.TEXT_WEIGHT_SEMIBOLD, CoreClasses.MARGIN.MB1]}>
            {degree}
          </CoreTypographyBody1>
        }
        subheader={
          <CoreStack>
            <CoreTypographySubtitle2 styleClasses={[CoreClasses.MARGIN.MB0]} >
              {school}</CoreTypographySubtitle2>

            <CoreTypographySubtitle2 styleClasses={[CoreClasses.MARGIN.MB0]}>
              {board + ", " + location}</CoreTypographySubtitle2>

            <CoreTypographyBody2 styleClasses={[CoreClasses.TEXT.TEXT_WEIGHT_MEDIUM, CoreClasses.MARGIN.MB3]} >
              {viewFormattedDate(startDate) + " - " + viewFormattedDate(endDate, "endDate")}
            </CoreTypographyBody2>
          </CoreStack>
        }
      />
    </CoreGrid>
  );
}
