describe('cv-job-time-span', function () {
  'use strict';
  var
  jsonify = _.compose(
    JSON.parse,
    JSON.stringify
  );

  beforeEach(module('customizedVita.vita'));
  beforeEach(inject(function(_$rootScope_, _$compile_, _$filter_) {
    this.$rootScope = _$rootScope_;
    this.$compile = _$compile_;
    this.$filter = _$filter_;
  }));
  it('should combine job.title and job.employer in a header', function () {
    var scope = this.$rootScope.$new();
    scope.job = {
      start: jsonify(new Date(2009, 2, 20)),
      end: jsonify(new Date(2010, 10, 28))
    };
    var elem = this.$compile('<cv-job-time-span job="job"></cv-job-time-span>')(scope);
    scope.$digest();

    var
    start = this.$filter('date')(scope.job.start, 'MMM / yy'),
    end = this.$filter('date')(scope.job.end, 'MMM / yy');

    expect(elem.find('div').eq(0).text()).toEqual(start + " - " + end);
  });
});
