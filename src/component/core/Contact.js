import styled from "styled-components";
import IonIcon from "./IonIcon";
import CrossLink from "./CrossLink";

const StyledContact = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    gap: 10px;
`;

const StyledLink = styled(CrossLink)`
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.5);
        filter: brightness(1.5);
    }
`;

function ContactLink(props) {
    return (
        <StyledLink 
            href={props.href}>
            {props.placeholder}
            <IonIcon icon={props.icon} size="large"/>
        </StyledLink>
    );
}

function Contact(props) {
    return (
        <StyledContact>
            <ContactLink href="https://facebook.com/vuminh0809" icon="logo-facebook" />
            <ContactLink href="https://github.com/thuongton999" icon="logo-github" />
            <ContactLink href="https://www.instagram.com/vuminh0809/" icon="logo-instagram" />
            <ContactLink href="mailto:thuongton0809999@gmail.com" icon="mail-open" />
        </StyledContact>
    );
}

export default Contact;