const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // Import your app

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET API endpoint', function () {
  this.timeout(6000);  // Set a timeout of 5 seconds
  it('should get all data', (done) => {
    chai
      .request('https://backend-ndccl9h9s-nguyentientung51056.vercel.app')
      .get('/devices')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

describe('GET API endpoint', function () {
  this.timeout(6000);  // Set a timeout of 5 seconds
  it('should get a specific resource', (done) => {
    chai
      .request("https://backend-ndccl9h9s-nguyentientung51056.vercel.app")
      .get('/devices/find/650b12012008afbe5b7095eb')  // Replace with a valid ID
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});


// Test handling non-existent resource
describe('GET /api/data/:nonExistentId', function () {
  this.timeout(6000);  // Set a timeout of 5 seconds
  it('should return 404 for non-existent resource', (done) => {
    const nonExistentId = '5f7a1c0b4e1d351394ae9d53'
    chai
      .request("https://backend-ndccl9h9s-nguyentientung51056.vercel.app")
      .get(`/devices/find/${nonExistentId}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

describe('GET /api/data/:invalidId', function () {
  this.timeout(6000);  // Set a timeout of 5 seconds
  it('should return 400 for invalid resource ID format', (done) => {
    const invalidId = 'invalid_id'; // Replace with an invalid resource ID
    chai
      .request("https://backend-ndccl9h9s-nguyentientung51056.vercel.app")
      .get(`/devices/find/${invalidId}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});





describe('Backend API', () => {
  let createdResourceId; // Variable to store the created resource ID

  // Test POST method to create a new resource
  describe('POST /devices', function () {
    this.timeout(6000);  // Set a timeout of 5 seconds
    it('should create a new resource', (done) => {
      const newData = { name: 'New Resource', type: "light" };
      chai
        .request("https://backend-ndccl9h9s-nguyentientung51056.vercel.app")
        .post('/devices')
        .send(newData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id'); // Assuming the response includes the ID
          createdResourceId = res.body._id; // Store the created resource ID
          done();
        });
    });
  });

  // Test PUT method to update the created resource
  describe('PUT /api/data/:id', function () {
    this.timeout(6000);  // Set a timeout of 5 seconds
    it('should update the created resource', (done) => {
      const updatedData = { name: 'Updated Resource' };
      chai
        .request("https://backend-ndccl9h9s-nguyentientung51056.vercel.app")
        .put(`/devices/${createdResourceId}`)
        .send(updatedData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('name').equal(updatedData.name);
          done();
        });
    });
  });

  // Test PATCH method to partially update the created resource
  describe('PATCH /api/data/:id', function () {
    this.timeout(6000);  // Set a timeout of 5 seconds
    it('should partially update the created resource', (done) => {
      const partialDataUpdate = { type: 'Partial Update' };
      chai
        .request("https://backend-ndccl9h9s-nguyentientung51056.vercel.app")
        .patch(`/devices/${createdResourceId}`)
        .send(partialDataUpdate)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('type').equal(partialDataUpdate.type);
          done();
        });
    });
  });

  describe('PUT /api/data/:id', function () {
    this.timeout(6000);  // Set a timeout of 5 seconds
    it('should return 400 for invalid request (invalid payload)', (done) => {
      const resourceId = createdResourceId; // Replace with a valid resource ID
      const invalidData = { invalidField: 'Invalid Field' }; // Invalid payload
      chai
        .request("https://backend-ndccl9h9s-nguyentientung51056.vercel.app")
        .put(`/devices/${resourceId}`)
        .send(invalidData)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('DELETE /api/data/:id', function () {
    this.timeout(6000);  // Set a timeout of 5 seconds
    it('should handle resource deletion failure with invalid resource ID', (done) => {
      const invalidResourceId = 'invalidId'; // Invalid resource ID (e.g., invalid format)
      chai
        .request("https://backend-ndccl9h9s-nguyentientung51056.vercel.app")
        .delete(`/devices/${invalidResourceId}`)
        .end((err, res) => {
          expect(res).to.have.status(500); // Replace with "https://backend-ndccl9h9s-nguyentientung51056.vercel.app"ropriate error status if needed
          done();
        });
    });
  });



  // Test DELETE method to delete the created resource
  describe('DELETE /api/data/:id', function () {
    this.timeout(6000);  // Set a timeout of 5 seconds
    it('should delete the created resource', (done) => {
      chai
        .request("https://backend-ndccl9h9s-nguyentientung51056.vercel.app")
        .delete(`/devices/${createdResourceId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equal('Device has been deleted...');
          done();
        });
    });
  });
});