import {
  CoreAvatar,
  CoreTypographyBody1,
  CoreCardHeader,
  CoreClasses,
  CoreIconText,
  __IconTypes
} from "@wrappid/core";

export default function clinicCard(props) {
  const {
    clinicLogo,
    fullName,
    phone,
    addLine1,
    addLine2,
    country,
    state,
    district,
    city,
    pin,
    landmark,
  } = props;

  const addressComponents = [];

  if (addLine1) addressComponents.push(addLine1);
  if (addLine2) addressComponents.push(addLine2);
  if (city) addressComponents.push(city);
  if (district) addressComponents.push(district);
  if (state) addressComponents.push(state);
  if (pin) addressComponents.push(`Pin-${pin}`);
  if (country) addressComponents.push(country);
  if (landmark) addressComponents.push(`Landmark: ${landmark}`);

  const formattedAddress = addressComponents.join(", ");

  const googleMapsUrl = `https://www.google.com/maps/place/${encodeURIComponent(
    formattedAddress
  )}`;

  return (
    <CoreCardHeader
      avatar={
        <CoreAvatar
          src={clinicLogo || "no_image.png"}
          styleClasses={[CoreClasses.DATA_DISPLAY.AVATAR_MEDIUM]}
        />
      }
      title={
        <>
          <CoreTypographyBody1>{fullName}</CoreTypographyBody1>

          {"\n"}

          <CoreTypographyBody1 variant="span">
            <CoreIconText
              link={true}
              type={__IconTypes.MATERIAL_OUTLINED_ICON}
              icon="phone"
              text={phone} />
          </CoreTypographyBody1>
        </>
      }
      subheader={
        <>
          <CoreTypographyBody1 varient="span">
            <CoreIconText
              link={true}
              type={__IconTypes.MATERIAL_OUTLINED_ICON}
              href={googleMapsUrl}
              icon="location_on"
              text={formattedAddress}/>
          </CoreTypographyBody1>
        </>
      }
    />
  );
}
