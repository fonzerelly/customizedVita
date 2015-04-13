describe('cv-job-role', function () {
  'use strict';
  beforeEach(module('customizedVita.vita'));
  beforeEach(inject(function(_$rootScope_, _$compile_) {
    this.$rootScope = _$rootScope_;
    this.$compile = _$compile_;
  }));
  it('should combine job.title and job.employer in a header', function () {
    var scope = this.$rootScope.$new();
    scope.job = {
      title: 'title',
      employer: 'employer'
    };
    var elem = this.$compile('<cv-job-role job="job"></cv-job-role>')(scope);
    scope.$digest();
    expect(elem.find('h3').eq(0).text()).toEqual('title bei employer');
  });
});
