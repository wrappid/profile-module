import {
  CoreTypographyBody1, 
  CoreCardHeader, 
  viewFormattedDate, 
  CoreTypographyBody2, 
  CoreTypographySubtitle2, 
  CoreClasses, 
  CoreStack
} from "@wrappid/core";

export default function ExperienceCard(props) {
  const { designation, organization, location, startDate, endDate } = props;

  return (
    <CoreCardHeader
      styleClasses={[CoreClasses.PADDING.P0]}  
      title={
        <>
          <CoreTypographyBody1 styleClasses={[CoreClasses.TEXT.TEXT_WEIGHT_BOLD, CoreClasses.MARGIN.MB1]}>{designation}</CoreTypographyBody1>
        </>
      }
      subheader={
        <CoreStack>
          <CoreTypographySubtitle2 styleClasses={[CoreClasses.MARGIN.MB0]} >
            {organization}</CoreTypographySubtitle2>

          <CoreTypographySubtitle2 styleClasses={[CoreClasses.MARGIN.MB0]} >
            {location}</CoreTypographySubtitle2>

          <CoreTypographyBody2 styleClasses={[CoreClasses.TEXT.TEXT_WEIGHT_MEDIUM, CoreClasses.MARGIN.MB3]} >

            {viewFormattedDate(startDate) + " - " + viewFormattedDate(endDate, "endDate")}
          </CoreTypographyBody2>
        </CoreStack>
      }
    />
  );
}
