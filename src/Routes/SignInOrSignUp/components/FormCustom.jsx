import Form from 'react-bootstrap/Form';
import { Button, Carousel, InputGroup } from 'react-bootstrap';
import ImageCarousel from '../assets/images/macbook-image.jpg';
import { SIGNUP } from '../../../Helpers/Const.jsx';
import { Link } from 'react-router-dom';

function ExampleCarouselImage(props) {
    return props.text;
}

const FormCustom = ({
    type,
    title,
    sub_title,
    title_login_navigate,
    title_button_submit,
    pragraph_line,
    url_type,
}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <Carousel controls={false}>
                        <Carousel.Item
                            style={{
                                backgroundImage: `url(${ImageCarousel})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}
                        >
                            <ExampleCarouselImage text="First slide" />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>
                                    Nulla vitae elit libero, a pharetra augue
                                    mollis interdum.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item
                            style={{
                                backgroundImage: `url(${ImageCarousel})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}
                        >
                            <ExampleCarouselImage text="Second slide" />
                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item
                            style={{
                                backgroundImage: `url(${ImageCarousel})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}
                        >
                            <ExampleCarouselImage text="Third slide" />
                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>
                                    Praesent commodo cursus magna, vel
                                    scelerisque nisl consectetur.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className="col-md-6">
                    <div className="form-control-signup">
                        <h4>{title}</h4>
                        <p>
                            {sub_title}{' '}
                            <Link
                                to={url_type}
                                // onClick={redirectRoute}
                            >
                                {title_login_navigate}
                            </Link>
                        </p>
                        <Form>
                            {type === SIGNUP.TYPE && (
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="First name"
                                        className="form-input"
                                    />
                                    <Form.Control
                                        placeholder="Last name"
                                        className="form-input"
                                    />
                                </InputGroup>
                            )}

                            <Form.Control
                                placeholder="Email"
                                className="form-input"
                            />
                            <br />
                            <Form.Control
                                placeholder="Enter your password"
                                className="form-input"
                            />
                            <Form.Check
                                type="checkbox"
                                id="checkbox-1"
                                label={
                                    type === SIGNUP.TYPE ? (
                                        <>
                                            I agree to the{' '}
                                            <a href="#">Terms & conditions</a>
                                        </>
                                    ) : (
                                        'Remember me'
                                    )
                                }
                            />
                            <br />
                            <Button
                                variant="primary"
                                type="submit"
                                className="button-submit"
                            >
                                {title_button_submit}
                            </Button>
                        </Form>
                        <div className="line">&emsp;{pragraph_line}&emsp;</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormCustom;
