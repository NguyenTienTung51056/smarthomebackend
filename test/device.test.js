const chai = require('chai');
const chaiHttp = require('chai-http');
const app = 'https://smarthomebackend.vercel.app/'  // Assuming your app is exported from index.js
const expect = chai.expect;

chai.use(chaiHttp);

describe('Device API', () => {
  // Test case 1: Create a new device
  // it('should create a new device', (done) => {
  //   chai
  //     .request(app)
  //     .post('/devices')
  //     .send({
  //       "name": "Light test",
  //       "type": "Light test",
  //       "status": "off test"
  //     })
  //     .end((err, res) => {
  //       expect(res).to.have.status(200);
  //       expect(res.body).to.be.an('object');
  //       // Add additional assertions as needed
  //       // ...
  //       done();
  //     });
  // });

  // Test case 2: Update an existing device
  it('should update an existing device', (done) => {
    chai
      .request(app)
      .put('/devices/:id')  // Replace :id with a valid device ID
      .send({
        // Add the necessary device data for updating
        // ...
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        // Add additional assertions as needed
        // ...
        done();
      });
  });

  // Test case 3: Update device status
  it('should update device status', (done) => {
    chai
      .request(app)
      .patch('/devices/:id')  // Replace :id with a valid device ID
      .send({
        // Add the necessary data for updating device status
        // ...
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        // Add additional assertions as needed
        // ...
        done();
      });
  });

  // Test case 4: Get all devices
  it('should get all devices', (done) => {
    chai
      .request(app)
      .get('/devices')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        // Add additional assertions as needed
        // ...
        done();
      });
  });

  // Test case 5: Get a device by ID
  it('should get a device by ID', (done) => {
    chai
      .request(app)
      .get(`/devices/find/650b12012008afbe5b7095eb`)  // Replace :id with a valid device ID
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        // Add additional assertions as needed
        // ...
        done();
      });
  });

  // Add more test cases for other API endpoints
  // ...

  // Test case 6: Delete a device
  it('should delete a device', (done) => {
    chai
      .request(app)
      .delete('/devices/651fa74599c983aacdb848ea')  // Replace :id with a valid device ID
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        // Add additional assertions as needed
        // ...
        done();
      });
  });
  

  // Test case 7: Try to delete a non-existing device
  it('should return 404 when trying to delete a non-existing device', (done) => {
    chai
      .request(app)
      .delete('/devices/nonexistent')  // Replace nonexistent with a non-existing device ID
      .end((err, res) => {
        expect(res).to.have.status(404);
        // Add additional assertions as needed
        // ...
        done();
      });
  });

  // Test case 8: Attempt to create a device with invalid data
  it('should return 400 when creating a device with invalid data', (done) => {
    chai
      .request(app)
      .post('/devices')
      .send({
        // Add invalid device data
        // ...
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        // Add additional assertions as needed
        // ...
        done();
      });
  });

  // Test case 9: Attempt to update a device with invalid data
  it('should return 400 when updating a device with invalid data', (done) => {
    chai
      .request(app)
      .put('/devices/:id')  // Replace :id with a valid device ID
      .send({
        // Add invalid device data
        // ...
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        // Add additional assertions as needed
        // ...
        done();
      });
  });

  // Test case 10: Attempt to get a device by an invalid ID
  it('should return 400 when getting a device with an invalid ID', (done) => {
    chai
      .request(app)
      .get('/devices/invalidID')
      .end((err, res) => {
        expect(res).to.have.status(400);
        // Add additional assertions as needed
        // ...
        done();
      });
  });
});
