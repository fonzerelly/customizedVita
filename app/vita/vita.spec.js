describe('vita', function() {
  'use strict';
  beforeEach(module('customizedVita.vita'));
  describe('VitaLoader', function () {
    beforeEach(inject(function(_VitaLoader_) {
      this.service = _VitaLoader_;
    }));
    it('should be defined', function () {
      expect(this.service).toBeDefined();
    });

    describe('loadVita', function() {
      beforeEach(inject(function ( _$httpBackend_) {
        this.$httpBackend = _$httpBackend_;
        this.url = '/mock_data/vita.json';
        this.requestHandler = this.$httpBackend.when(
          'GET',
          this.url
        );
        this.response = {
          version: '0.0.1',
          jobs: []
        };
        this.requestHandler.respond(this.response);
      }));

      afterEach(function () {
        this.$httpBackend.verifyNoOutstandingExpectation();
        this.$httpBackend.verifyNoOutstandingRequest();
      });

      it('should call vita.json', function() {
        this.$httpBackend.expectGET(this.url);
        this.service.loadVita();
        this.$httpBackend.flush();
      });
    });

  });
});

