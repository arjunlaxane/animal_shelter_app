import WelcomeLogo from '../image/image-2.jpg';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Welcome.css';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';
import './GiveAway.css';
import imgg from '../image/image-3.jpg';
import './Last.css';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import logo from '../image/image-1.jpg';

const idb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

const createCollectionInIndexDB = () => {
  if (!idb) {
    console.log(`Sorry, This browser doesn't support index DB`);
    return;
  }
  //creating db
  const request = idb.open('animal_Shelter', 1);
  request.onerror = event => {
    console.log('Error', event);
    console.log('An error occured with IndexDB');
  };

  request.onupgradeneeded = event => {
    const db = request.result;

    if (!db.objectStoreNames.contains('appdata')) {
      db.createObjectStore('appdata', {
        keyPath: 'id',
      });
    }
  };

  request.onsuccess = () => {
    console.log('Database Opened Successfully');
  };
};

const Welcome = () => {
  useEffect(() => {
    createCollectionInIndexDB();
    getAllData();
  }, []);

  const breedArray = [
    ' German Shephered',
    'Beagle',
    'Dabourman',
    'Golder Retriever',
  ];
  const petArray = ['Dog', 'Cat'];

  const [show, setShow] = useState(false);
  const [close, setClose] = useState(false);
  const [allAppData, setAllAppData] = useState([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [animal, setAnimal] = useState('');

  const [petType, setPetType] = useState(null);
  const [breed, setBreed] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseTable = () => setClose(false);
  const handleOpenTable = () => setClose(true);

  const handleCategory = category => {
    const res = allAppData.filter(cat => {
      return cat.petType === category;
    });
    setAnimal(res);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const openDB = idb.open('animal_Shelter', 1);

    //adding data
    if (name && email && phone) {
      openDB.onsuccess = () => {
        const db = openDB.result;
        const transaction_Data = db.transaction('appdata', 'readwrite');

        const appData = transaction_Data.objectStore('appdata'); //query will run on this

        const dataa = appData.put({
          id: allAppData.length + 1,
          name,
          email,
          phone,
          breed,
          petType,
        });
        dataa.onsuccess = () => {
          transaction_Data.oncomplete = () => {
            db.close();
          };
          getAllData();
          alert('Request accepted');
        };

        dataa.onerror = event => {
          console.log(event);
          alert('Request not accepted, Please try again');
        };
      };
    }
    return setShow(false);
  };

  const getAllData = () => {
    const openDB = idb.open('animal_Shelter', 1);
    openDB.onsuccess = () => {
      const db = openDB.result;
      const transaction_Data = db.transaction('appdata', 'readonly');

      const appData = transaction_Data.objectStore('appdata'); //query will run on this

      const allData = appData.getAll();

      allData.onsuccess = query => {
        setAllAppData(query.srcElement.result);
      };

      allData.onerror = query => {
        alert('Loading failed, Please try again');
      };

      transaction_Data.oncomplete = () => {
        db.close();
      };
    };
  };

  return (
    <>
      <div className="container_1">
        <div className="container_content">
          <div className="title-para">
            <h1 className="title">Welcome to the Animal Shelter</h1>
            <p>
              Glad that you care for the animals so much. We make sure that
              you'll not repent your decision of adopting your favorite pet !!{' '}
            </p>
          </div>
          <div className="container_image">
            <img src={WelcomeLogo} alt="dogandcatPic" />
          </div>
        </div>
        <div className="btns">
          <Button variant="danger" onClick={handleShow}>
            Adopt
          </Button>
          <Button
            onClick={handleOpenTable}
            style={{
              backgroundColor: 'rgb(212, 237, 241)',
              color: 'black',
              borderColor: 'black',
            }}
          >
            What all pets do we have ?
          </Button>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Adopt a pet</Modal.Title>
          </Modal.Header>
          <Modal.Body>What pet do you want to adopt ?</Modal.Body>

          <Dropdown className="drop_layout ms-4 m-3">
            <label htmlFor="pettype" className="labelStyle">
              Pet type <span>*</span>
            </label>
            <Dropdown.Toggle
              variant="light"
              id="pettype"
              className="ms-4 m-3"
              style={{ width: '20vmax' }}
            >
              {petType === null ? 'Select' : petType}
            </Dropdown.Toggle>

            <Dropdown.Menu
              className="ms-4 m-2"
              style={{ width: '20vmax', textAlign: 'center' }}
            >
              {petArray.map((val, index) => (
                <Dropdown.Item onClick={() => setPetType(val)} key={index}>
                  {val}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="drop_layout ms-4 m-3">
            <label htmlFor="breed" className="labelStyle">
              Breed <span>*</span>
            </label>
            <Dropdown.Toggle
              variant="light"
              id="breed"
              className="ms-4 m-2"
              style={{ width: '20vmax' }}
            >
              {breed === null ? 'Select' : breed}
            </Dropdown.Toggle>

            <Dropdown.Menu
              className="ms-4 m-3"
              style={{ width: '20vmax', textAlign: 'center' }}
            >
              {breedArray.map((val, index) => (
                <Dropdown.Item onClick={() => setBreed(val)} key={index}>
                  {val}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Form>
            <h2 className="ms-2 formTitle">Please fill in your details</h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="ms-4 labelStyle">
                Full Name<span>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Name"
                className="ms-4"
                style={{ width: '30vmax' }}
                onChange={e => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="ms-4 labelStyle">
                Email<span>*</span>
              </Form.Label>
              <Form.Control
                className="ms-4"
                style={{ width: '30vmax' }}
                type="email"
                placeholder="Enter your mail ID"
                onChange={e => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="ms-4 labelStyle">
                Phone<span>*</span>
              </Form.Label>
              <Form.Control
                className="ms-4"
                style={{ width: '30vmax' }}
                type="number"
                placeholder="Enter your contact"
                onChange={e => setPhone(e.target.value)}
                required
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="danger" onClick={handleSubmit}>
                 REQUEST
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* What all pets do u have */}
        <Modal show={close} onHide={handleCloseTable}>
          <Modal.Header closeButton>
            <Modal.Title>What all pets do we have</Modal.Title>
          </Modal.Header>
          <Modal.Title>
            <span className="ms-3 filter" onClick={() => handleCategory('Dog')}>
              Dogs
            </span>
            <span className="ms-1">|</span>
            <span className="ms-0 filter" onClick={() => handleCategory('Cat')}>
              Cats
            </span>
          </Modal.Title>

          {/* Table */}
          <Table bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Breed</th>
                <th>Age(Months)</th>
              </tr>
            </thead>
            <tbody>
              {animal.length > 0
                ? animal?.map(val => (
                    <tr key={val.id}>
                      <td>{val.name}</td>
                      <td>{val.email}</td>
                      <td>{val.phone}</td>
                    </tr>
                  ))
                : allAppData?.map(val => (
                    <tr key={val.id}>
                      <td>{val.name}</td>
                      <td>{val.email}</td>
                      <td>{val.phone}</td>
                    </tr>
                  ))}
            </tbody>
          </Table>
        </Modal>
      </div>
      <div className="container_2">
        <h1 className="title">
          We do take in pets if you can't take care of them
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste porro
          tempore animi vitae eaque ad esse molestias. Dolores facilis delectus
          ipsam obcaecati vitae voluptate nobis, numquam nesciunt praesentium
          atque ab. Vitae perspiciatis saepe quibusdam doloremque est error,
          alias enim? Fugit unde tenetur suscipit ducimus dolorem similique non
          officia, quae itaque!
        </p>
        <Button
          onClick={handleShow}
          style={{
            backgroundColor: 'rgb(212, 237, 241)',
            color: 'black',
            borderColor: 'black',
          }}
        >
          Give Away
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Give Away</Modal.Title>
          </Modal.Header>
          <Modal.Body>What pet do you want to give ?</Modal.Body>

          <Dropdown className="drop_layout ms-4 m-3">
            <label htmlFor="pettype" className="labelStyle">
              Pet type <span>*</span>
            </label>
            <Dropdown.Toggle
              variant="light"
              id="pettype"
              className="ms-4 m-3"
              style={{ width: '20vmax' }}
            >
              {petType === null ? 'Select' : petType}
            </Dropdown.Toggle>

            <Dropdown.Menu
              className="ms-4 m-2"
              style={{ width: '20vmax', textAlign: 'center' }}
            >
              {petArray.map((val, index) => (
                <Dropdown.Item onClick={() => setPetType(val)} key={index}>
                  {val}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="drop_layout ms-4 m-3">
            <label htmlFor="breed" className="labelStyle">
              Breed <span>*</span>
            </label>
            <Dropdown.Toggle
              variant="light"
              id="breed"
              className="ms-4 m-2"
              style={{ width: '20vmax' }}
            >
              {breed === null ? 'Select' : breed}
            </Dropdown.Toggle>

            <Dropdown.Menu
              className="ms-4 m-3"
              style={{ width: '20vmax', textAlign: 'center' }}
            >
              {breedArray.map((val, index) => (
                <Dropdown.Item onClick={() => setBreed(val)} key={index}>
                  {val}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Form>
            <h2 className="ms-2 formTitle">Please fill in your details</h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="ms-4 labelStyle">
                Full Name<span>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Name"
                className="ms-4"
                style={{ width: '30vmax' }}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="ms-4 labelStyle">
                Email<span>*</span>
              </Form.Label>
              <Form.Control
                className="ms-4"
                style={{ width: '30vmax' }}
                type="email"
                placeholder="Enter your mail ID"
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="ms-4 labelStyle">
                Phone<span>*</span>
              </Form.Label>
              <Form.Control
                className="ms-4"
                style={{ width: '30vmax' }}
                type="number"
                placeholder="Enter your contact"
                onChange={e => setPhone(e.target.value)}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="danger" onClick={handleSubmit}>
                REQUEST
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
      <div className="container_3">
        <img src={imgg} alt="dogandcatPic" />

        <p id="para_last">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quaerat
          cum placeat ducimus tenetur aspernatur tempora repellat vitae.
          Architecto sed iste eligendi, nihil repudiandae et explicabo a
          similique molestiae vero ullam beatae quos suscipit sunt ducimus minus
          ipsam? Odit ea illo beatae eveniet magnam quibusdam rem, laboriosam
          velit pariatur quis.
        </p>
      </div>
      <div className="footer_container">
        <div className="footer">
          <div className="animal_shelter">
            <div className="footer-title">
              <img src={logo} alt="logo" />
              <span>ANIMAL SHELTER</span>
            </div>
            <p>
              One of the best animal shelter places in india. We're recognised
              by the government. Please take a pledge to take care of these
              lovely pets !
            </p>
            <Button variant="danger" onClick={handleShow}>
              Adopt
            </Button>
          </div>

          <div className="getInTouch">
            <span>GET IN TOUCH</span>

            <div>
              <Link className="iconStyle">
                <FontAwesomeIcon icon={faLinkedin} />
              </Link>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ratione, itaque!
              </p>
            </div>

            <div>
              <Link className="iconStyle">
                <FontAwesomeIcon icon={faLinkedin} />
              </Link>
              <p>xyz@gmail.com</p>
            </div>

            <span>Follow Us</span>

            <div className="getInTouch-links">
              <Link className="iconStyle">
                <FontAwesomeIcon icon={faTwitter} />
              </Link>
              <Link className="iconStyle">
                <FontAwesomeIcon icon={faFacebook} />
              </Link>
              <Link className="iconStyle">
                <FontAwesomeIcon icon={faLinkedin} />
              </Link>
            </div>
          </div>

          <div className="quickLinks">
            <span>QUICK LINKS</span>
            <Link className="iconStyle">Home</Link>
            <Link className="iconStyle">Contact Us</Link>
          </div>
        </div>
        <div className="line"></div>

        <div className="copyRights">
          <div>
            <div>
              <p>Copyright@2023. Animal Shelter</p>
            </div>
            <div>
              <p>Privacy Policy</p>
              <p>Terms of Service</p>
              <p>Cookies Settings</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
