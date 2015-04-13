describe('cv-job-tasks', function () {
  'use strict';
  beforeEach(module('customizedVita.vita'));
  beforeEach(inject(function(_$rootScope_, _$compile_) {
    this.$rootScope = _$rootScope_;
    this.$compile = _$compile_;
  }));
  it('should render unordered list of tasks', function () {
    var scope = this.$rootScope.$new();
    scope.job = {
      tasks: [
        {
          description: "task 1"
        },
        {
          description: "task 2"
        }
      ]
    };
    var elem = this.$compile('<cv-job-tasks job="job"></cv-job-tasks>')(scope);
    scope.$digest();
    var renderedTasks = elem.find('li');
    expect(renderedTasks.length).toBe(2);
    expect(renderedTasks.eq(0).text()).toBe('task 1');
    expect(renderedTasks.eq(1).text()).toBe('task 2');
  });
});
