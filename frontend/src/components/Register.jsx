import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

const Register = () => {
  let date = new Date();
  let currentYear = date.getFullYear();

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    month: "",
    day: "",
    year: "",
  });

  //   destructure
  const { name, email, month, day, year } = formFields;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "Jun",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <>
      <div className="w-100 register d-flex justify-content-center align-items-center">
        <Card className="col-xl-4 col-lg-6 mx-auto p-5">
          <form className="">
            <img
              className="mx-auto d-block"
              width="50px"
              src="https://logos-world.net/wp-content/uploads/2023/08/X-Logo.png"
              alt=""
            />
            <Form.Control
              value={name}
              type="text"
              className="my-2 p-3"
              placeholder="Name"
            />
            <Form.Control
              value="email"
              type="email"
              className="my-2 p-3"
              placeholder="Email"
            />
            <h6 className="mt-5">Date of birth</h6>
            <p className="text-secondary">
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, a pet, or something else.
            </p>
            <div className="d-flex gap-4">
              <Form.Select value={month} className="p-4">
                {months?.map((month, index) => {
                  return (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  );
                })}
              </Form.Select>

              {/* day */}

              <Form.Select value={day} className="p-4">
                {Array.from({ length: 31 }).map((_, index) => {
                  return (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  );
                })}
              </Form.Select>

              <Form.Select value={year} className="p-4">
                {Array.from({ length: 121 }).map((_, index) => {
                  return (
                    <option key={index} value={currentYear - index}>
                      {currentYear - index}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
            <Button variant="secondary" className="w-100 rounded-pill mt-5 p-3">
              Next
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Register;
