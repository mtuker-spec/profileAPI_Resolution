'use strict';
var mocha = require('mocha');
var chakram = require('chakram');
var request = chakram.request;
var expect = chakram.expect;

describe('Liveness test GET (HTTP verb)', function() {
    it("Should return HTTP 200 OK", function() {
        var response = request('get', 'http://api-gradle:8080', {
            'time': true
        });
        expect(response).to.have.status(200);
        return chakram.wait();
    });
    it("Should return {content-type: text/html}", function() {
        var response = request('get', 'http://api-gradle:8080', {
            'time': true
        });
        expect(response).to.have.header('content-type', 'text/html');
        return chakram.wait();
    });
    it("Should return {server: Payara Micro #badassfish}", function() {
        var response = request('get', 'http://api-gradle:8080', {
            'time': true
        });
        expect(response).to.have.header('server', 'Payara Micro #badassfish');
        return chakram.wait();
    });
    it("Should allow GET, POST, PUT and DELETE (HTTP verbs)", function() {
        var response = request('get', 'http://api-gradle:8080', {
            'time': true
        });
        expect(response).to.have.header('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
        return chakram.wait();
    });
});

describe('Test for /health', function() {
 it('Should return HTTP 200 OK', function() {
        var response = request('get', 'http://api-gradle:8080/health', {
            'time': true
        });
        expect(response).to.have.status(200);
        return chakram.wait();
    });

    it('Should fail returning HTTP 500 Internal Server Error', function() {
        var response = request('get', 'http://api-gradle:8080/health', {
            'time': true
        });
        expect(response).not.to.have.status(500);
        return chakram.wait();
    });

});

describe('Test for /api/api/current-user', function() {
    it('Should return HTTP 204 No Content', function() {
        var response = request('get', 'http://api-gradle:8080/api/api/current-user', {
            'time': true
        });
        expect(response).to.have.status(204);
        return chakram.wait();
    });
    it('Should fail returning HTTP 405 Method Not Allowed (PUT)', function() {
        var response = request('put', 'http://api-gradle:8080/api/api/current-user', {
            'time': true
        });
        expect(response).to.have.status(405);
        return chakram.wait();
    });
});

describe('Test for /api/api/info', function() {
    it('Should return {content-type: application/json}', function() {
        var response = request('get', 'http://api-gradle:8080/api/api/info', {
            'time': true
        });
        expect(response).to.have.header('content-type', 'application/json');
        return chakram.wait();
    });
    it('Should return HTTP 200 OK', function() {
        var response = request('get', 'http://api-gradle:8080/api/api/info', {
            'time': true
        });
        expect(response).to.have.status(200);
        return chakram.wait();
    });

});

describe('Test for /api/javaee8', function() {
    it('Should return "ping"', function() {
        var response = request('get', 'http://api-gradle:8080/api/javaee8', {
            'time': true
        });
        expect(response).to.have.json('ping');
        return chakram.wait();
    });


});

describe('Test for /api/profile/info', function() {
    it('Should return {content-type: application/json}', function() {
        var response = request('get', 'http://api-gradle:8080/api/profile/info', {
            'time': true
        });
        let data = {
            'javax.persistence.schema-generation.database.action': 'create',
            'hibernate.transaction.manager_lookup_class': 'org.hibernate.transaction.SunONETransactionManagerLookup',
            'eclipselink.target-server': 'Glassfish',
            'toplink.target-server': 'SunAS9'
        }

        expect(response).to.have.status(200);
        expect(response).to.have.json(data);
        return chakram.wait();
    });
    it('Should return HTTP 200 OK', function() {
        var response = request('get', 'http://api-gradle:8080/api/profile/info', {
            'time': true
        });
        expect(response).to.have.status(200);
        return chakram.wait();
    });

});

describe('Test for /api/profile', function() {
    it('Should return HTTP 200 OK', function() {
        var response = request('get', 'http://api-gradle:8080/api/profile', {
            'time': true
        });
        expect(response).to.have.status(200);
        return chakram.wait();
    });

});

describe('Test for /api/profile PUT (HTTP verb)', function() {
    let payload = {
        "id": 0
        }
    it('Should return HTTP 200 OK', function() {
        return chakram.put('http://api-gradle:8080/api/profile', payload)
            .then(response => {
                expect(response).to.have.status(200);
            });
    });

    it('Should return {content-type: application/json}', function() {
        return chakram.put('http://api-gradle:8080/api/profile', payload)
            .then(response => {
                expect(response).to.have.header('content-type', 'application/json');
            });
    });


    it('Should fail returning HTTP 400 Bad Request', function() {
        return chakram.put('http://api-gradle:8080/api/profile', undefined, {
                json: false,
                headers: {
                    "content-type": "text"
                }
            })
            .then(response => {
                expect(response).to.have.status(400);
            });
    });


    it('Should fail returning HTTP 500 Internal Server Error', function() {
        var response = request('put', 'http://api-gradle:8080/api/profile', {
            'time': true
        });
        expect(response).to.have.status(500);
        return chakram.wait();
    });

});

describe('Test for /api/profile POST (HTTP verb)', function() {
    it('Should return HTTP 201 Created', function() {
        let payload = {
            "id": 90911
        }
        return chakram.post('http://api-gradle:8080/api/profile', payload)
            .then(response => {
                expect(response).to.have.status(201);
                //expect(response).to.have.header('content-type', 'application/json');
            });
    });


    it('Should fail returning HTTP 400 Bad Request', function() {
        return chakram.post('http://api-gradle:8080/api/profile', undefined, {
                json: false,
                headers: {
                    "content-type": "text"
                }
            })
            .then(response => {
                expect(response).to.have.status(400);
            });

    });

    it('Should return {content-type: text/html}', function() {
        return chakram.post('http://api-gradle:8080/api/profile', undefined, {
                json: false,
                headers: {
                    "content-type": "text"
                }
            })
            .then(response => {
                expect(response).to.have.header('content-type', 'text/html');
            });

    });

});

describe('Test for /api/profile/{id} GET (HTTP verb)', function() {
    it('Should return HTTP 200 OK', function() {
        var response = request('get', 'http://api-gradle:8080/api/profile/1', {
            'time': true
        });

        expect(response).to.have.status(200);
        return chakram.wait();
    });

    it('Should fail returning HTTP 404 Not Found', function() {
        var response = request('get', 'http://api-gradle:8080/api/profile/-23574186.402438536', {
            'time': true
        });

        expect(response).to.have.status(404);
        return chakram.wait();
    });
});

    describe('Test for /api/profile/{id} DELETE (HTTP verb)', function() {
        it('Should return HTTP 200 OK', function() {
            var response = request('delete', 'http://api-gradle:8080/api/profile/90911', {
                'time': true
            });

            expect(response).to.have.status(200);
            return chakram.wait();
        });


        it('Should fail returning HTTP 404 Not Found', function() {
            var response = request('delete', 'http://api-gradle:8080/api/profile/-30258920.1', {
                'time': true
            });

            expect(response).to.have.status(404);
            return chakram.wait();
        });

    });