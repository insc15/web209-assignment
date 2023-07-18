import { Link } from "react-router-dom";
import Container from "./layout/container";
import Section from "./layout/section";
import { BsArrowRight } from 'react-icons/bs';

function Breadcrumb({title} : {title: string}) {
    return (
        <Section className="py-28 bg-[#f3f8f7]">
            <Container className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">{title}</h1>
                <div className="font-medium text-gray-400 flex items-center">
                    <Link to={'/'} className="hover:text-primary duration-150">Home</Link>
                    <BsArrowRight className="mx-2" />
                    <span className="text-primary">{title}</span>
                </div>
            </Container>
        </Section>
    );
}

export default Breadcrumb;