import logo from '../assets/logo.svg';
import Container from '../components/layout/container';
import Section from '../components/layout/section';

function Footer() {
    return (
        <Section className='bg-[#01110e] text-gray-300'>
            <Container className='flex'>
                <div className="w-1/4">
                    <img className='brightness-200 grayscale-[1] w-52' src={logo} alt="" />
                    <div className="my-8">
                        <p>Find a location nearest you.</p>
                        <p>See Our Store</p>
                    </div>
                    <div className="my-8">
                        <p className='mb-2'>+(84) - 1800 - 4635</p>
                        <p className='text-sm'>info@bookstore.com</p>
                    </div>
                </div>
                <div className="w-1/4">
                    <h3 className='font-semibold text-xl'>Contact Info</h3>
                    <div className="my-8">
                        <p>96665 Gorczany Terrace Lake Kennethside, UT 48852</p>
                    </div>
                    <div className="my-8">
                        <p>Monday - Friday: 9:00 - 20:00</p>
                        <p>Saturday: 9:00 - 22:00</p>
                    </div>
                </div>
                <div className="w-1/4">
                    <h3 className='font-semibold text-xl'>Explore</h3>
                    <div className="my-8 space-y-3">
                        <p>About Us</p>
                        <p>Category</p>
                        <p>Blog</p>
                        <p>FAQ</p>
                        <p>Contact</p>
                    </div>
                </div>
                <div className="w-1/4">
                    <h3 className='font-semibold text-xl'>Subscribe</h3>
                    <div className="my-8">
                        Enter your email address to get the latest Bookstore news, special events and student discounts.
                    </div>
                </div>
            </Container>
        </Section>
    );
}

export default Footer;