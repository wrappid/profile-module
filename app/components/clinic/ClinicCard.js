import {
    CoreAvatar,
    CoreClasses,
    CoreIconText,
    __IconTypes,
    CoreGrid,
    CoreBox,
    CoreH6
} from "@wrappid/core";

export default function ClinicCard(props) {
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
        <CoreGrid>
            <CoreAvatar
                gridProps={{ gridSize: { md: 2, sm: 4, xs: 3 } }}  
                variant="square"
                src={clinicLogo}
                styleClasses={[CoreClasses.DATA_DISPLAY.AVATAR_LARGE]}
            />

            <CoreBox gridProps={{ gridSize: { md: 10, sm: 8, xs: 9 } }}>
                <CoreH6>{fullName}</CoreH6>

                <CoreIconText
                    link={true}
                    type={__IconTypes.MATERIAL_OUTLINED_ICON}
                    icon="phone"
                    text={phone} 
                />

                <CoreIconText
                    link={true}
                    type={__IconTypes.MATERIAL_OUTLINED_ICON}
                    href={googleMapsUrl}
                    icon="location_on"
                    text={formattedAddress}
                />
            </CoreBox>
        </CoreGrid>
    );
}
