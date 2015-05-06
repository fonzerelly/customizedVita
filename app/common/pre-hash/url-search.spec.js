describe('UrlSeaerch', function () {
  'use strict';

  beforeEach(module('PreHash'));
  beforeEach(inject(function(_UrlSearch_) {
    this.service = _UrlSearch_;
  }));

  it("should be defined", function () {
    expect(this.service).toBeDefined();
  });

  describe("split", function () {
    it("should split a string by a separator", function () {
      expect(this.service.split("=", "a=b")).toEqual(['a','b']);
    });
  });

  describe("leave", function () {
    it("should leave count characters of string", function () {
      expect(this.service.leave(1, "?param=1")).toEqual("param=1");
    });
  });

  describe("splitUrlSearch", function () {
    it("should split search string into its components", function () {
      var
      urlSearch = "?a=1&a=2&b=3",
      paramList = [['a', '1'], ['a','2'], ['b','3']];
      expect(this.service.splitUrlSearch(urlSearch)).toEqual(paramList);
    });
    it("should return empty Array in case of empty string", function () {
      var
      urlSearch = "",
      paramList = [];
      expect(this.service.splitUrlSearch(urlSearch)).toEqual(paramList);
    });
    it("should return empty Array in case of '?' only", function () {
      var
      urlSearch = "?",
      paramList = [];
      expect(this.service.splitUrlSearch(urlSearch)).toEqual(paramList);
    });
    it("should return Array with undefined value, when value is missing", function () {
      var
      urlSearch = "?param",
      paramList = [['param']];

      expect(this.service.splitUrlSearch(urlSearch)).toEqual(paramList);
    });
    it("should throw on invalid search string", function() {
      var
      urlSearch = "?=val",
      paramList = [['', 'val']];
      expect(this.service.splitUrlSearch(urlSearch)).toEqual(paramList);
    });
  });

  describe("flattenPairList", function () {
    it("should convert a list of pairs to a list of their values", function () {
      var
      pairList = [['a', '1'], ['a', '2']],
      values = ['1', '2'];
      expect(this.service.flattenPairList('a', pairList)).toEqual(values);
    });

    it("should convert a list of a single pair to its value only", function () {
      var
      singlePair = [['b', '3']],
      value = '3';
      expect(this.service.flattenPairList('b', singlePair)).toEqual(value);
    });
  });

  describe("transformGroupedPairs", function () {
    it("should flatten the Pairs of a grouped object", function() {
      var
      groupedPairs = {
        'a': [['a', '1'], ['a', '2']],
        'b': [['b', '3']]
      },
      flattendGroupedPairs = {
        'a': ['1', '2'],
        'b': '3'
      };
      expect(this.service.transformGroupedPairs(groupedPairs)).toEqual(flattendGroupedPairs);
    });
  });

  describe("objectizeUrlSearch", function () {
    it("should convert search string to search object", function() {
      var
      urlSearch = "?a=1&a=2&b=3",
      searchObject = {
        'a': ['1','2'],
        'b': '3'
      };
      expect(this.service.objectizeUrlSearch(urlSearch)).toEqual(searchObject);
    });
    it("should return empty object if empty string got passed", function () {
      expect(this.service.objectizeUrlSearch("")).toEqual({});
    });
    it("should return empty object if only ? got passed", function () {
      expect(this.service.objectizeUrlSearch("?")).toEqual({});
    });
    it("should return param with undefined value if value is missing", function () {
      expect(this.service.objectizeUrlSearch("?param")).toEqual({"param": undefined});
    });
  });

  describe("serializeSearchObject", function () {
    it("should convert search object to search string", function () {
      var
      searchObject = {
        'a': ['1','2'],
        'b': '3'
      },
      urlSearch = "?a=1&a=2&b=3";
      expect(this.service.serializeSearchObject(searchObject)).toEqual(urlSearch);
    });
  });

  describe("serializeKeyValue", function (key, value) {
    it("should convert simple value to key=value string", function () {
      var
      key = 'b',
      value = '3',
      string = 'b=3';
      expect(this.service.serializeKeyValue(key, value)).toEqual(string);
    });
  });

  describe("serializeKeyArray", function (key, array) {
    it("should convert array value to key=val1&key=val2 string", function () {
      var
      key = 'a',
      array = ['1', '2'],
      string = 'a=1&a=2';
      expect(this.service.serializeKeyArray(key, array)).toEqual(string);
    });
  });
});
